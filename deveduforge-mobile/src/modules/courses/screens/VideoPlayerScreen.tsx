import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { X, Play, Pause, Maximize2, RotateCcw } from 'lucide-react-native';
import { colors } from '../../../shared/constants/colors';
import { typography } from '../../../shared/constants/typography';
import { spacing } from '../../../shared/constants/spacing';
import { radius } from '../../../shared/constants/radius';
import type { CourseStackParamList } from '../../../core/navigation/navigation.types';

type ScreenRoute = RouteProp<CourseStackParamList, 'VideoPlayerScreen'>;

export const VideoPlayerScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ScreenRoute>();
  const { videoUrl, title } = route.params;

  const player = useVideoPlayer(videoUrl ? { uri: videoUrl } : null, (p) => {
    p.timeUpdateEventInterval = 0.25;
    p.play();
  });

  const [currentTime, setCurrentTime] = useState(0);
  const [lastPosition, setLastPosition] = useState(0);

  useEffect(() => {
    const sub = player.addListener('timeUpdate', (e) => {
      setCurrentTime(e.currentTime);
      if (e.currentTime > 0) setLastPosition(e.currentTime);
    });
    return () => sub.remove();
  }, [player]);

  const duration = player.duration;

  const isPlaying = player.playing;
  const position = currentTime * 1000;
  const durationMs = duration * 1000;
  const progress = durationMs > 0 ? position / durationMs : 0;

  const formatTime = (seconds: number) => {
    const totalSeconds = Math.floor(seconds);
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
  };

  const handleClose = () => {
    navigation.goBack();
  };

  const handleSeekBack = () => {
    const newTime = Math.max(0, currentTime - 15);
    player.currentTime = newTime;
  };

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <VideoView
          player={player}
          style={styles.video}
          contentFit="contain"
          nativeControls={false}
        />

        <View style={styles.controlsOverlay}>
          <View style={styles.topControls}>
            <Pressable style={styles.closeButton} onPress={handleClose}>
              <X size={22} color="#FFFFFF" />
            </Pressable>
            <Text style={styles.titleText} numberOfLines={1}>
              {title || 'Vidéo'}
            </Text>
            <Pressable style={styles.controlIconButton}>
              <Maximize2 size={18} color="#FFFFFF" />
            </Pressable>
          </View>

          <View style={styles.centerControls}>
            <Pressable
              style={styles.controlIconButton}
              onPress={handleSeekBack}
            >
              <RotateCcw size={20} color="#FFFFFF" />
            </Pressable>
            <Pressable
              style={styles.playButton}
              onPress={togglePlayPause}
            >
              {isPlaying ? (
                <Pause size={28} color="#FFFFFF" />
              ) : (
                <Play size={28} color="#FFFFFF" style={styles.playIcon} />
              )}
            </Pressable>
          </View>

          <View style={styles.bottomControls}>
            <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
            </View>
            <Text style={styles.timeText}>{formatTime(duration)}</Text>
          </View>
        </View>
      </View>

      {title && (
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>{title}</Text>
          <Pressable
            style={styles.resumeButton}
            onPress={() => player.play()}
          >
            <Play size={16} color={colors.brand.orange} />
            <Text style={styles.resumeText}>
              {lastPosition > 0
                ? `Reprendre à ${formatTime(lastPosition)}`
                : 'Lire la vidéo'}
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.overlay,
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#000000',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  controlsOverlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  topControls: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: Platform.OS === 'ios' ? spacing.huge : spacing.lg,
    paddingBottom: spacing.sm,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  titleText: {
    ...typography.body,
    color: '#FFFFFF',
    fontWeight: '600',
    flex: 1,
  },
  controlIconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xl,
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    marginLeft: 3,
  },
  bottomControls: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    gap: spacing.sm,
  },
  timeText: {
    ...typography.bodySmall,
    color: '#FFFFFF',
    fontFamily: 'SourceCodePro-Regular',
    fontSize: 12,
  },
  progressTrack: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.brand.orange,
    borderRadius: 2,
  },
  infoSection: {
    padding: spacing.xl,
  },
  infoTitle: {
    ...typography.h2,
    color: colors.neutral.surface,
    marginBottom: spacing.md,
  },
  resumeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(230,81,0,0.1)',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
    gap: spacing.sm,
  },
  resumeText: {
    ...typography.body,
    color: colors.brand.orange,
    fontWeight: '600',
  },
});
