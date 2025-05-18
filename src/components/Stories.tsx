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
    setCurrentStoryIndex,
  } = useStories();

  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const handleStoryClick = (index: number) => {
    setCurrentStoryIndex(index);
    setIsViewerOpen(true);
    playStory();
  };

  const handleCloseViewer = () => {
    setIsViewerOpen(false);
    pauseStory();
  };

  const handleAddStoryClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Here you would typically open a file picker or camera
    console.log('Add story clicked');
  };

  if (isLoading) {
    return <div className={styles.storiesSection}>
      <div className={styles.storyList}>
        <div className={styles.storySkeleton} />
        <div className={styles.storySkeleton} />
        <div className={styles.storySkeleton} />
        <div className={styles.storySkeleton} />
      </div>
    </div>;
  }

  if (isViewerOpen && currentStory) {
    return (
      <div className={styles.fullScreenViewer}>
        <StoryViewer
          story={currentStory}
          totalStories={stories.length}
          currentIndex={currentStoryIndex}
          onNext={goToNextStory}
          onPrevious={goToPreviousStory}
          onClose={handleCloseViewer}
          isPlaying={isPlaying}
          onPause={pauseStory}
          onPlay={playStory}
        />
      </div>
    );
  }

  const myStory = stories.find(story => story.isMyStory);
  const otherStories = stories.filter(story => !story.isMyStory);

  return (
    <div className={styles.storiesSection}>
      <div className={styles.storyList}>
        {/* Your Story */}
        <div 
          className={styles.storyItem} 
          onClick={() => myStory ? handleStoryClick(0) : handleAddStoryClick}
        >
          <div className={styles.storyRing} style={{ background: myStory ? undefined : '#dbdbdb' }}>
            <div className={styles.storyPreview}>
              <img
                src={myStory?.userAvatar || "https://i.pravatar.cc/150?img=12"}
                alt="Your story"
                className={styles.storyPreviewImage}
              />
              {!myStory && <div className={styles.addStoryButton}>+</div>}
            </div>
          </div>
          <span className={styles.username}>Your story</span>
        </div>

        {/* Other Stories */}
        {otherStories.map((story, index) => (
          <div
            key={story.id}
            className={styles.storyItem}
            onClick={() => handleStoryClick(index + 1)} // +1 because of myStory at index 0
          >
            <div className={`${styles.storyRing} ${story.seen ? styles.seen : ''}`}>
              <div className={styles.storyPreview}>
                <img
                  src={story.userAvatar || story.imageUrl}
                  alt={`${story.username}'s story`}
                  className={styles.storyPreviewImage}
                />
              </div>
            </div>
            <span className={styles.username}>{story.username}</span>
          </div>
        ))}
      </div>
    </div>
  );
}; 