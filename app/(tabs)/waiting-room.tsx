import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  Modal,
  ActivityIndicator,
  ImageStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MotiView, MotiText } from "moti";
import { useRouter } from "expo-router";
import { WebView } from "react-native-webview";
import {
  ChevronLeft,
  BookOpen,
  Gamepad2,
  X,
  Maximize2,
  Clock,
  Compass,
  Layers,
  Flame,
} from "lucide-react-native";

const { width } = Dimensions.get("window");

// Premium Free & Fully Readable Lifestyle Magazine Data Source
const LIFESTYLE_MAGAZINES = [
  {
    id: "mag-vogue",
    title: "Vogue Magazine Collective",
    category: "Fashion, Culture & Style",
    description:
      "Immerse yourself in world-class design trends, high-fashion editorials, and seasonal lifestyle aesthetics.",
    coverUrl:
      "https://images.unsplash.com/photo-1537832816519-689ad163238b?auto=format&fit=crop&w=800&q=80",
    readUrl: "https://www.magzter.com/magazines/lifestyle",
  },
  {
    id: "mag-arch",
    title: "Architectural Digest",
    category: "Design & Modern Living",
    description:
      "Take an international look inside exceptionally engineered spaces, structural art, and luxury home design.",
    coverUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    readUrl: "https://www.dezeen.com",
  },
  {
    id: "mag-travel",
    title: "National Geographic Traveler",
    category: "Expeditions & Cuisine",
    description:
      "Your passport to hidden coastal hideaways, exquisite global culinary spots, and immersive travel diaries.",
    coverUrl:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
    readUrl:
      "https://www.magzter.com/magazines/travel?srsltid=AfmBOop7u4CiWyxZnPLbpKVAhe6xE30BRip5QeFCBQMZvYymaDxoDEu0",
  },
];

export default function WaitingRoomScreen() {
  const router = useRouter();

  // Interactive Sandbox Web Shell State
  const [webViewModal, setWebViewModal] = useState<{
    visible: boolean;
    url: string;
    title: string;
  }>({
    visible: false,
    url: "",
    title: "",
  });

  const [webLoading, setWebLoading] = useState(false);

  const openWebView = (url: string, title: string) => {
    setWebViewModal({
      visible: true,
      url,
      title,
    });
    setWebLoading(true);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* ATOM: STICKY UTILITY BAR */}
      <View style={styles.topStickyActionNav}>
        <TouchableOpacity
          style={styles.circleActionBtn}
          onPress={() => router.back()}
          activeOpacity={0.8}
        >
          <ChevronLeft size={22} color="#FFF" />
        </TouchableOpacity>

        <View style={styles.liveRadarCluster}>
          <MotiView
            from={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 1.6, opacity: 0 }}
            transition={{ type: "timing", duration: 1800, loop: true }}
            style={styles.liveRadarPulseRing}
          />
          <View style={styles.liveRadarDotCore} />
          <Text style={styles.liveRadarLabelText}>ROUTE RADAR ACTIVE</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentLayout}
      >
        {/* MOLECULE: PREMIUM VISUAL HERO BANNED BLOCK */}
        <View style={styles.heroWrapperFrame}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1684323750753-ddeb888f825a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            style={styles.heroBackgroundImageElement}
          />
          <View style={styles.heroOverlayGradientMesh} />

          <View style={styles.heroTextContentStack}>
            <MotiView
              from={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "timing", duration: 500 }}
              style={styles.heroPillBadgeRow}
            >
              <Compass size={12} color="#FDE047" />
              <Text style={styles.heroPillBadgeText}>MOBI LOUNGE</Text>
            </MotiView>

            {/* Slide in from left to right effect with explicit translation */}
            <MotiText
              from={{ opacity: 0, translateX: -50 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ type: "timing", duration: 750, delay: 150 }}
              style={styles.heroMainHeadingText}
            >
              Welcome to the Waiting Room 📰 🎮
            </MotiText>

            {/* Staggered complementary description slide-in animation */}
            <MotiText
              from={{ opacity: 0, translateX: -35 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ type: "timing", duration: 750, delay: 300 }}
              style={styles.heroSubDescriptionText}
            >
              Welcome to our digital lounge! While waiting for your ride, make yourself at home—feel free to read
              through our premium lifestyle magazines or challenge the retro
              arcade high scores on the Pac-Man game below. 👾
            </MotiText>
          </View>
        </View>

        {/* ORGANISM: LARGE-SCALE MAGAZINE BLOCK (ATOMIC DESIGN) */}
        <View style={styles.loungeSectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionTitleBox}>
              <Layers size={20} color="#FDE047" />
              <Text style={styles.sectionTitle}>Digital Premium Lounge</Text>
            </View>
            <View style={styles.neonBadgeContainer}>
              <Text style={styles.neonBadgeText}>VIP UNLOCKED</Text>
            </View>
          </View>

          <Text style={styles.sectionSecondaryMetaText}>
            Flip through premium global lifestyle catalogs and publications
            directly inside your session wrapper.
          </Text>

          {LIFESTYLE_MAGAZINES.map((mag, idx) => (
            <MotiView
              key={mag.id}
              from={{ opacity: 0, translateY: 35 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: "timing", delay: idx * 120 }}
              style={styles.magazineShowcaseCard}
            >
              <View style={styles.brutalistShadowLayer} />
              <View style={styles.magazineCardMainBody}>
                {/* LARGE CENTERED COVER CONFIGURATION */}
                <View style={styles.magazineCoverFrameBox}>
                  <Image
                    source={{ uri: mag.coverUrl }}
                    style={styles.magazineLargeImageElement}
                  />
                  <View style={styles.magazineImageCategoryTag}>
                    <Text style={styles.magazineCategoryTagText}>
                      {mag.category.toUpperCase()}
                    </Text>
                  </View>
                </View>

                {/* BOTTOM HALF METADATA BLOCK */}
                <View style={styles.magazineDataBlock}>
                  <Text style={styles.magazineTitleText}>{mag.title}</Text>
                  <Text style={styles.magazineDescriptionText}>
                    {mag.description}
                  </Text>

                  <TouchableOpacity
                    style={styles.actionBrutalistButton}
                    onPress={() => openWebView(mag.readUrl, mag.title)}
                    activeOpacity={0.9}
                  >
                    <BookOpen size={16} color="#000" />
                    <Text style={styles.actionButtonText}>READ MAGAZINE</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </MotiView>
          ))}
        </View>

        {/* ORGANISM: RETRO GAME CARD INTERFACE LAYOUT */}
        <View
          style={[
            styles.loungeSectionContainer,
            { marginTop: 10, marginBottom: 50 },
          ]}
        >
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionTitleBox}>
              <Gamepad2 size={20} color="#00FFFF" />
              <Text style={styles.sectionTitle}>MobiRetro Pixel Arcade</Text>
            </View>
            <View
              style={[
                styles.neonBadgeContainer,
                { backgroundColor: "#00FFFF" },
              ]}
            >
              <Text style={[styles.neonBadgeText, { color: "#000" }]}>
                8-BIT CLASSIC
              </Text>
            </View>
          </View>

          <Text style={styles.sectionSecondaryMetaText}>
            Smash international high scores natively inside the screen wrapper
            with complete hardware-optimized performance.
          </Text>

          <MotiView
            from={{ opacity: 0, translateY: 30 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", delay: 200 }}
            style={styles.magazineShowcaseCard}
          >
            <View
              style={[
                styles.brutalistShadowLayer,
                { backgroundColor: "#00FFFF" },
              ]}
            />
            <View
              style={[styles.magazineCardMainBody, { borderColor: "#00FFFF" }]}
            >
              <View style={styles.magazineCoverFrameBox}>
                <Image
                  source={{
                    uri: "https://m.media-amazon.com/images/I/71IH4Pvl7rL._AC_UF894,1000_QL80_.jpg",
                  }}
                  style={styles.magazineArcadeImageElement}
                />
                <View
                  style={[
                    styles.magazineImageCategoryTag,
                    { backgroundColor: "#00FFFF" },
                  ]}
                >
                  <View style={styles.inlineFlexRowGap}>
                    <Flame size={10} color="#000" />
                    <Text
                      style={[
                        styles.magazineCategoryTagText,
                        { color: "#000" },
                      ]}
                    >
                      MOST PLAYED
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.magazineDataBlock}>
                <Text style={[styles.magazineTitleText, { color: "#FDE047" }]}>
                  Pac-Man Retro Classic
                </Text>

                <View style={styles.metaStatHorizontalRow}>
                  <Clock size={12} color="#94A3B8" />
                  <Text style={styles.metaStatRowText}>
                    Infinite Play Session • Integrated Sandbox
                  </Text>
                </View>

                <TouchableOpacity
                  style={[
                    styles.actionBrutalistButton,
                    { backgroundColor: "#00FFFF", borderColor: "#000" },
                  ]}
                  onPress={() =>
                    openWebView("https://freepacman.org", "Pac-Man Arcade")
                  }
                  activeOpacity={0.9}
                >
                  <Gamepad2 size={16} color="#000" />
                  <Text style={styles.actionButtonText}>PLAY GAME NOW</Text>
                </TouchableOpacity>
              </View>
            </View>
          </MotiView>
        </View>
      </ScrollView>

      {/* WINDOW TEMPLATE: ISOLATED MODAL INTERACTIVE WEBVIEW SANDBOX CONTAINER */}
      <Modal
        visible={webViewModal.visible}
        animationType="slide"
        presentationStyle="overFullScreen"
        transparent={false}
        onRequestClose={() =>
          setWebViewModal({ visible: false, url: "", title: "" })
        }
      >
        <View style={styles.modalViewportWrapper}>
          <SafeAreaView style={styles.modalControlHeaderFrame} edges={["top"]}>
            <View style={styles.modalHeaderFlexRow}>
              <View style={styles.modalMetadataGroup}>
                <Maximize2
                  size={16}
                  color="#FDE047"
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.modalScreenTitleText} numberOfLines={1}>
                  {webViewModal.title}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.modalDismissActionButton}
                onPress={() =>
                  setWebViewModal({ visible: false, url: "", title: "" })
                }
                activeOpacity={0.7}
              >
                <X size={18} color="#FFF" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>

          <View style={styles.webViewCoreEngineContainer}>
            {webViewModal.url ? (
              <WebView
                source={{ uri: webViewModal.url }}
                style={styles.webViewSystemComponent}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                allowsInlineMediaPlayback={true}
                scalesPageToFit={true}
                onLoadStart={() => setWebLoading(true)}
                onLoadEnd={() => setWebLoading(false)}
                renderLoading={() => (
                  <View style={styles.fallbackLoadingIndicatorLayer}>
                    <ActivityIndicator size="large" color="#FDE047" />
                    <Text style={styles.loadingProgressSubLabel}>
                      Allocating Controller Streams...
                    </Text>
                  </View>
                )}
              />
            ) : null}

            {webLoading && (
              <View style={styles.fallbackLoadingIndicatorLayer}>
                <ActivityIndicator size="large" color="#00FFFF" />
              </View>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
  },
  topStickyActionNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#0F172A",
    borderBottomWidth: 1.5,
    borderColor: "#1E293B",
    zIndex: 10,
  },
  circleActionBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#1E293B",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#334155",
  },
  liveRadarCluster: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E293B",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#334155",
  },
  liveRadarPulseRing: {
    position: "absolute",
    left: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#22C55E",
  },
  liveRadarDotCore: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#22C55E",
    marginRight: 8,
  },
  liveRadarLabelText: {
    fontSize: 10,
    fontWeight: "900",
    color: "#94A3B8",
    letterSpacing: 0.5,
  },
  scrollContentLayout: {
    paddingBottom: 30,
  },
  heroWrapperFrame: {
    width: width,
    height: 290,
    position: "relative",
    justifyContent: "flex-end",
    backgroundColor: "#1E293B",
  },
  heroBackgroundImageElement: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  } as ImageStyle,
  heroOverlayGradientMesh: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15, 23, 42, 0.85)",
  },
  heroTextContentStack: {
    paddingHorizontal: 24,
    paddingBottom: 28,
  },
  heroPillBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "rgba(253, 224, 71, 0.15)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(253, 224, 71, 0.3)",
    gap: 6,
    marginBottom: 12,
  },
  heroPillBadgeText: {
    color: "#FDE047",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1,
  },
  heroMainHeadingText: {
    fontSize: 25,
    fontWeight: "900",
    color: "#FFF",
    letterSpacing: -0.3,
    lineHeight: 32,
  },
  heroSubDescriptionText: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 8,
    lineHeight: 18,
  },
  loungeSectionContainer: {
    backgroundColor: "#1E293B",
    borderRadius: 24,
    padding: 20,
    borderWidth: 2,
    borderColor: "#000",
    marginHorizontal: 16,
    marginTop: 20,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  sectionTitleBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sectionTitle: {
    color: "#FFF",
    fontWeight: "900",
    fontSize: 16,
    letterSpacing: 0.3,
  },
  neonBadgeContainer: {
    backgroundColor: "#15803D",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "#000",
  },
  neonBadgeText: {
    fontSize: 9,
    fontWeight: "900",
    color: "#FFF",
    letterSpacing: 0.5,
  },
  sectionSecondaryMetaText: {
    color: "#94A3B8",
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 20,
  },
  magazineShowcaseCard: {
    position: "relative",
    marginBottom: 24,
  },
  brutalistShadowLayer: {
    position: "absolute",
    top: 5,
    left: 5,
    right: -5,
    bottom: -5,
    backgroundColor: "#FDE047",
    borderRadius: 20,
    zIndex: 1,
    borderWidth: 2,
    borderColor: "#000",
  },
  magazineCardMainBody: {
    backgroundColor: "#0F172A",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#000",
    zIndex: 2,
    overflow: "hidden",
  },
  magazineCoverFrameBox: {
    width: "100%",
    height: 180,
    position: "relative",
    backgroundColor: "#1E293B",
  },
  magazineLargeImageElement: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  } as ImageStyle,
  magazineArcadeImageElement: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  } as ImageStyle,
  magazineImageCategoryTag: {
    position: "absolute",
    bottom: 12,
    left: 12,
    backgroundColor: "#1E293B",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "#000",
  },
  magazineCategoryTagText: {
    color: "#FDE047",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  magazineDataBlock: {
    padding: 16,
  },
  magazineTitleText: {
    color: "#FFF",
    fontWeight: "900",
    fontSize: 17,
    letterSpacing: 0.2,
  },
  magazineDescriptionText: {
    color: "#94A3B8",
    fontSize: 12,
    marginTop: 6,
    lineHeight: 18,
  },
  metaStatHorizontalRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 6,
  },
  metaStatRowText: {
    color: "#64748B",
    fontSize: 11,
    fontWeight: "700",
  },
  actionBrutalistButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FDE047",
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#000",
    gap: 8,
    marginTop: 14,
  },
  actionButtonText: {
    color: "#000",
    fontWeight: "900",
    fontSize: 12,
    letterSpacing: 0.4,
  },
  inlineFlexRowGap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  modalViewportWrapper: {
    flex: 1,
    backgroundColor: "#0F172A",
  },
  modalControlHeaderFrame: {
    backgroundColor: "#1E293B",
    borderBottomWidth: 2,
    borderColor: "#000",
  },
  modalHeaderFlexRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  modalMetadataGroup: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  modalScreenTitleText: {
    color: "#FFF",
    fontWeight: "900",
    fontSize: 16,
    letterSpacing: 0.3,
  },
  modalDismissActionButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#EF4444",
    borderWidth: 2,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  webViewCoreEngineContainer: {
    flex: 1,
    backgroundColor: "#000",
    position: "relative",
  },
  webViewSystemComponent: {
    flex: 1,
    backgroundColor: "#000",
  },
  fallbackLoadingIndicatorLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#0F172A",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  loadingProgressSubLabel: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "800",
  },
});
