import React from 'react';
import { View, StyleSheet } from 'react-native';

/**
 * BIONhub logo mark built with plain Views (no SVG dependency):
 * a rounded red square + white play triangle + gold hub dot.
 */
export default function LogoMark({ size = 32 }: { size?: number }) {
  const radius = size * 0.26;
  const triSize = size * 0.34; // play triangle visual size
  const dot = size * 0.24;

  return (
    <View
      style={[
        styles.square,
        { width: size, height: size, borderRadius: radius, backgroundColor: '#e50914' },
      ]}
    >
      {/* play triangle (right-pointing) made from borders */}
      <View
        style={{
          width: 0,
          height: 0,
          borderTopWidth: triSize * 0.62,
          borderBottomWidth: triSize * 0.62,
          borderLeftWidth: triSize,
          borderTopColor: 'transparent',
          borderBottomColor: 'transparent',
          borderLeftColor: '#ffffff',
          marginLeft: size * 0.06,
        }}
      />
      {/* gold hub dot */}
      <View
        style={{
          position: 'absolute',
          top: size * 0.12,
          right: size * 0.12,
          width: dot,
          height: dot,
          borderRadius: dot / 2,
          backgroundColor: '#ffd65b',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  square: { alignItems: 'center', justifyContent: 'center' },
});
