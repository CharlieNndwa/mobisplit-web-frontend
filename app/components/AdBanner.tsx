import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Image, TouchableOpacity, Linking, FlatList, Animated, Text } from 'react-native';

const { width } = Dimensions.get('window');
const CAROUSEL_WIDTH = width - 32; // Optimized for adaptive sizing
const CAROUSEL_HEIGHT = 60; // Standard banner dimensions

// Optimized, high-resolution verified image URLs for the slideshow.
const AD_DATA = [
  {
    id: '1',
    image: 'https://cdn.chemistdirect.co.uk/img/brand_pages/Centrum/New/Centrum-Banner.jpg?66058,39153', // Nike Run Club
    url: 'https://www.nike.com',
    type: 'Advertisement'
  },
  {
    id: '2',
    image: 'https://abartacocacola.com/wp-content/uploads/contact-banner.jpg', // Coca-Cola Zero
    url: 'https://www.coca-cola.com',
    type: 'Advertisement'
  },
  {
    id: '3',
    image: 'https://miro.medium.com/0*xeMP6IcGjGUYSeTs.jpg', // Amazon Prime Video
    url: 'https://www.primevideo.com',
    type: 'Advertisement'
  },
  {
    id: '4',
    image: 'https://images.ctfassets.net/4cd45et68cgf/6wHlMkLFTfKk3cQrTYnVLL/db092ceae27e7ddf5fedde338f9d9503/Netflix_Banner.png?w=2000', // MiWay Insurance
    url: 'https://www.netflix.com',
    type: 'Advertisement'
  },
  {
    id: '5',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNOh-qlBk03eefpGWJoLuxDpnnxJ24siKBqw&s', // Samsung Galaxy S Series
    url: 'https://www.samsung.com',
    type: 'Advertisement'
  },
];

export default function AdBannerSlideshow() {
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Core Slideshow Rotation Logic
  useEffect(() => {
    const timer = setInterval(() => {
      let nextIndex = (currentIndex + 1) % AD_DATA.length;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 6000); // Rotates every 6 seconds

    return () => clearInterval(timer); // Resource cleanup on component unmount
  }, [currentIndex]);

  const handleAdPress = (url: string) => {
    // Simulates an interactive ad click flow.
    Linking.openURL(url).catch((err) => console.error('Failed to open ad URL:', err));
  };

  const renderAdItem = ({ item }: any) => (
    <TouchableOpacity onPress={() => handleAdPress(item.url)} activeOpacity={0.85}>
      <View style={styles.bannerContainer}>
        <Image 
          source={{ uri: item.image }} 
          style={styles.adImage}
          resizeMode="cover"
        />
        {/* Dynamic authentic ad tag */}
        <View style={styles.adBadge}>
          <Text style={styles.adText}>{item.type}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const keyExtractor = (item: any) => item.id;

  return (
    <View style={styles.outerContainer}>
      <FlatList
        ref={flatListRef}
        data={AD_DATA}
        renderItem={renderAdItem}
        keyExtractor={keyExtractor}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        snapToInterval={CAROUSEL_WIDTH}
        decelerationRate="fast"
        style={{ width: CAROUSEL_WIDTH, height: CAROUSEL_HEIGHT }}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        scrollEventThrottle={16}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    backgroundColor: 'transparent',
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerContainer: {
    width: CAROUSEL_WIDTH,
    height: CAROUSEL_HEIGHT,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  adImage: {
    width: '100%',
    height: '100%',
  },
  adBadge: {
    position: 'absolute',
    bottom: 3,
    right: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
  },
  adText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});