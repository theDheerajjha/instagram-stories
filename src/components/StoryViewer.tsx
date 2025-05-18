import React, { useEffect, useState } from 'react';
import styles from '../styles/Stories.module.css';
import { Story } from '../types/Story';

interface StoryViewerProps {
  story: Story;
  totalStories: number;
  currentIndex: number;
  onNext: () => void;
  onPrevious: () => void;
  onClose: () => void;
  isPlaying: boolean;
  onPause: () => void;
  onPlay: () => void;
}

export const StoryViewer: React.FC<StoryViewerProps> = ({
  story,
  totalStories,
  currentIndex,
  onNext,
  onPrevious,
  onClose,
  isPlaying,
  onPause,
  onPlay,
}) => {
  const [progress, setProgress] = useState<number>(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    setProgress(0);
    setImageLoaded(false);
    setImageError(false);
  }, [story.id]);

  useEffect(() => {
    let timer: number;

    if (isPlaying && imageLoaded && !imageError) {
      timer = window.setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            return 100;
          }
          return prev + 2;
        });
      }, 100);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [story.id, isPlaying, imageLoaded, imageError]);

  useEffect(() => {
    if (progress >= 100) {
      onNext();
    }
  }, [progress, onNext]);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    onPause();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;

    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        onNext();
      } else {
        onPrevious();
      }
    }

    setTouchStart(null);
    onPlay();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
  };

  return (
    <div className={styles.storyViewer}>
      <button className={styles.backButton} onClick={onClose}>
        ←
      </button>

      <div className={styles.storyProgress}>
        {Array.from({ length: totalStories }).map((_, index) => (
          <div key={index} className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{
                width: index < currentIndex ? '100%' : 
                      index === currentIndex ? `${progress}%` : '0%'
              }}
            />
          </div>
        ))}
      </div>

      <div className={styles.storyHeader}>
        <div className={styles.userInfo}>
          <img
            src={story.userAvatar || story.imageUrl}
            alt={story.username}
            className={styles.userAvatar}
          />
          <div className={styles.userMeta}>
            <div className={styles.username}>{story.username}</div>
            <div className={styles.timestamp}>{story.timestamp}</div>
          </div>
        </div>
        <div className={styles.storyActions}>
          <button className={styles.actionButton} onClick={isPlaying ? onPause : onPlay}>
            {isPlaying ? '⏸️' : '▶️'}
          </button>
        </div>
      </div>

      {!imageLoaded && !imageError && (
        <div className={styles.loading}>
          <div className={styles.spinner} />
          Loading story...
        </div>
      )}

      {imageError && (
        <div className={styles.error} onClick={() => setImageError(false)}>
          Couldn't load story. Tap to retry.
        </div>
      )}

      <img
        src={story.imageUrl}
        alt={`Story by ${story.username}`}
        className={`${styles.storyImage} ${imageLoaded ? styles.fadeIn : ''}`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{ display: imageLoaded ? 'block' : 'none' }}
      />

      <div 
        className={styles.navigationButtons}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      >
        <button
          className={styles.navButton}
          onClick={(e) => {
            e.stopPropagation();
            onPrevious();
          }}
        />
        <button
          className={styles.navButton}
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
        />
      </div>
    </div>
  );
}; 