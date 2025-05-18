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

  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      if (isPlaying) {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }
    }, 100);

    return () => clearInterval(interval);
  }, [story.id, isPlaying]);

  useEffect(() => {
    if (progress >= 100) {
      onNext();
    }
  }, [progress, onNext]);

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

      <img
        src={story.imageUrl}
        alt={`Story by ${story.username}`}
        className={styles.storyImage}
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