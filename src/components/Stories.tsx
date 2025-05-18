import React, { useState } from 'react';
import { useStories } from '../hooks/useStories';
import { StoryViewer } from './StoryViewer';
import styles from '../styles/Stories.module.css';

export const Stories: React.FC = () => {
  const {
    stories,
    currentStory,
    currentStoryIndex,
    isPlaying,
    isLoading,
    goToNextStory,
    goToPreviousStory,
    pauseStory,
    playStory,
  } = useStories();

  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const handleStoryClick = (index: number) => {
    setIsViewerOpen(true);
  };

  const handleCloseViewer = () => {
    setIsViewerOpen(false);
    pauseStory();
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading stories...</div>;
  }

  return (
    <div className={styles.storiesContainer}>
      <div className={styles.storyList}>
        {stories.map((story, index) => (
          <div
            key={story.id}
            className={styles.storyPreview}
            onClick={() => handleStoryClick(index)}
          >
            <img
              src={story.imageUrl}
              alt={`${story.username}'s story`}
              className={styles.storyPreviewImage}
            />
          </div>
        ))}
      </div>

      {isViewerOpen && currentStory && (
        <StoryViewer
          story={currentStory}
          totalStories={stories.length}
          currentIndex={currentStoryIndex}
          onNext={goToNextStory}
          onPrevious={goToPreviousStory}
          onClose={handleCloseViewer}
          isPlaying={isPlaying}
        />
      )}
    </div>
  );
}; 