import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import io, { Socket } from "socket.io-client";

interface Message {
  rideId: string;
  senderId: string;
  text: string;
  timestamp?: Date;
}

interface ChatProps {
  rideId: string;
  currentUserId: string;
}

// 1. Safe Global Base URL Definition
const BASE_URL = process.env.EXPO_PUBLIC_API_URL || "https://mobisplit-backend-production.up.railway.app";

// 2. Point both Socket and API to use it dynamically
const SOCKET_URL = BASE_URL;
const API_BASE = `${BASE_URL}/api`;

export default function RideChatScreen({ rideId, currentUserId }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    socket.current = io(SOCKET_URL);

    if (socket.current) {
      // 🪙 JOIN ISOLATED ROOM: Must match backend `chat_${rideId}`
      socket.current.emit("join:chat", { rideId });

      socket.current.on("chat:receive_message", (msg: Message) => {
        setMessages((prev) => [...prev, msg]);
      });
    }

    return () => {
      socket.current?.disconnect();
    };
  }, [rideId]);

  const sendMessage = () => {
    if (inputText.trim() && socket.current) {
      const messageData = {
        rideId, // 🪙 Critical: Pass rideId so backend knows which room to broadcast to
        senderId: currentUserId,
        text: inputText.trim(),
      };
      socket.current.emit("chat:send_message", messageData);
      setInputText("");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Trip Chat</Text>
      </View>
      // 🪙 1. Optimized FlatList for 4GB RAM & Room Isolation
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={10} // 🪙 Prevents memory spikes
        maxToRenderPerBatch={10} // 🪙 Limits batch processing
        windowSize={5} // 🪙 Keeps memory footprint small
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageBubble,
              item.senderId === currentUserId
                ? styles.myMessage
                : styles.theirMessage,
            ]}
          >
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
          placeholderTextColor="#64748B"
          style={styles.input}
          multiline
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
          <Text style={styles.sendBtnText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F172A" },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#1E293B",
    alignItems: "center",
  },
  headerTitle: { color: "#FFF", fontSize: 18, fontWeight: "900" },
  messageBubble: {
    padding: 12,
    borderRadius: 15,
    marginHorizontal: 15,
    marginVertical: 5,
    maxWidth: "80%",
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#1E40AF",
    borderBottomRightRadius: 2,
  },
  theirMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#1E293B",
    borderBottomLeftRadius: 2,
  },
  messageText: { color: "#FFF", fontSize: 15 },
  inputContainer: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#1E293B",
    alignItems: "center",
    paddingBottom: Platform.OS === "ios" ? 30 : 15,
  },
  input: {
    flex: 1,
    color: "#FFF",
    backgroundColor: "#0F172A",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 100,
  },
  sendBtn: {
    backgroundColor: "#FDE047",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  sendBtnText: { color: "#000", fontWeight: "900" },
});
