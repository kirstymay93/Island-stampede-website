import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { Video } from 'expo-av';

type Props = {
  source: any; // require(...) or URL string
  poster?: any;
  style?: any;
};

export default function HeroVideo({ source, poster, style }: Props) {
  if (Platform.OS === 'web') {
    // Web: use native HTML5 video element wrapped in a div
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return (
      <div style={{ width: '100%', height: '100%', overflow: 'hidden', ...style }}>
        <video
          src={typeof source === 'string' ? source : source?.uri || ''}
          poster={poster?.uri || poster}
          autoPlay
          muted
          loop
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <Video
        source={source}
        useNativeControls={false}
        shouldPlay
        isLooping
        isMuted
        resizeMode="cover"
        style={styles.video}
        posterSource={poster}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', height: 400, overflow: 'hidden' },
  video: { width: '100%', height: '100%' },
});
