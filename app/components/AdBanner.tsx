import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Image, Text, Animated, FlatList, TouchableOpacity, Linking } from 'react-native';

const { width } = Dimensions.get('window');
// Margins are perfectly optimized for resource-efficient mobile layouts
const CAROUSEL_WIDTH = width - 32; 
const CAROUSEL_HEIGHT = 80; // Increased height slightly to give images maximum breathing room

const SLIDESHOW_AD_DATA = [
  {
    id: '1',
    image: 'https://cdn.chemistdirect.co.uk/img/brand_pages/Centrum/New/Centrum-Banner.jpg?66058,39153',
    url: 'https://www.nike.com',
    title: 'ADVERTISEMENTS'
  },
  {
    id: '2',
    image: 'https://abartacocacola.com/wp-content/uploads/contact-banner.jpg',
    url: 'https://www.coca-cola.com',
    title: 'ADVERTISEMENTS'
  },
  {
    id: '3',
    image: 'https://casperanimations.wordpress.com/wp-content/uploads/2021/05/netflix-4.jpg',
    url: 'https://www.netflix.com',
    title: 'ADVERTISEMENTS'
  },
  {
    id: '4',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Showmax_Logo.png',
    url: 'https://www.showmax.com',
    title: 'ADVERTISEMENTS'
  },
  {
    id: '5',
    image: 'https://www.checkers.co.za/assets/images/about-checkers.png',
    url: 'https://www.checkers.co.za',
    title: 'ADVERTISEMENTS'
  }
];

export default function AdBannerSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);

  // Auto-scrolling carousel loop configuration
  useEffect(() => {
    const timer = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= SLIDESHOW_AD_DATA.length) {
        nextIndex = 0;
      }
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    }, 5000); // Transitions to next ad slide every 5 seconds

    return () => clearInterval(timer);
  }, [currentIndex]);

  const renderAdItem = ({ item }: { item: typeof SLIDESHOW_AD_DATA[0] }) => (
    <TouchableOpacity 
      activeOpacity={0.9} 
      onPress={() => Linking.openURL(item.url)}
      style={styles.bannerContainer}
    >
      {/* resizeMode="contain" guarantees the entire asset is visible without clipping edge boundaries */}
      <Image source={{ uri: item.image }} style={styles.adImage} resizeMode="contain" />
      <View style={styles.infoOverlay}>
        <Text style={styles.infoText}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.outerContainer}>
      <FlatList
        ref={flatListRef}
        data={SLIDESHOW_AD_DATA}
        renderItem={renderAdItem}
        keyExtractor={(item) => item.id}
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
    backgroundColor: '#0b0f19', // Dark premium placeholder background to beautifully match transparent branding logs
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  adImage: {
    width: '100%',
    height: '100%',
  },
  infoOverlay: {
    position: 'absolute',
    bottom: 4,
    right: 6,
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  infoText: {
    color: '#94A3B8',
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 0.5,
  }
});