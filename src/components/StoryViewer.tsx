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
}

export const StoryViewer: React.FC<StoryViewerProps> = ({
  story,
  totalStories,
  currentIndex,
  onNext,
  onPrevious,
  onClose,
  isPlaying,
}) => {
  const [progress, setProgress] = useState<number>(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

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

  return (
    <div className={`${styles.storyViewer} ${styles.fadeIn}`}>
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
        <div className={styles.username}>{story.username}</div>
        <div className={styles.timestamp}>{story.timestamp}</div>
      </div>

      {!imageLoaded && !imageError && (
        <div className={styles.loading}>Loading...</div>
      )}

      {imageError && (
        <div className={styles.error}>
          Failed to load image. Tap to try again.
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

      <div className={styles.navigationButtons}>
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