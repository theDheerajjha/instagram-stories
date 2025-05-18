import { useState, useEffect, useCallback } from 'react';
import { Story, StoriesState } from '../types/Story';
import { stories as mockStories } from '../data/stories';

const STORY_DURATION = 5000; // 5 seconds

export const useStories = () => {
  const [state, setState] = useState<StoriesState>({
    stories: [],
    currentStoryIndex: 0,
    isPlaying: true,
    isLoading: true,
  });

  useEffect(() => {
    // Simulate API fetch
    const fetchStories = async () => {
      setState(prev => ({ ...prev, isLoading: true }));
      // Simulating network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setState(prev => ({
        ...prev,
        stories: mockStories,
        isLoading: false,
      }));
    };

    fetchStories();
  }, []);

  useEffect(() => {
    let timer: number;

    if (state.isPlaying && !state.isLoading && state.stories.length > 0) {
      timer = window.setTimeout(() => {
        if (state.currentStoryIndex < state.stories.length - 1) {
          setState(prev => ({
            ...prev,
            currentStoryIndex: prev.currentStoryIndex + 1,
          }));
        }
      }, STORY_DURATION);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [state.currentStoryIndex, state.isPlaying, state.isLoading, state.stories.length]);

  const goToNextStory = useCallback(() => {
    setState(prev => {
      if (prev.currentStoryIndex < prev.stories.length - 1) {
        return {
          ...prev,
          currentStoryIndex: prev.currentStoryIndex + 1,
        };
      }
      return prev;
    });
  }, []);

  const goToPreviousStory = useCallback(() => {
    setState(prev => {
      if (prev.currentStoryIndex > 0) {
        return {
          ...prev,
          currentStoryIndex: prev.currentStoryIndex - 1,
        };
      }
      return prev;
    });
  }, []);

  const pauseStory = useCallback(() => {
    setState(prev => ({ ...prev, isPlaying: false }));
  }, []);

  const playStory = useCallback(() => {
    setState(prev => ({ ...prev, isPlaying: true }));
  }, []);

  return {
    stories: state.stories,
    currentStory: state.stories[state.currentStoryIndex],
    currentStoryIndex: state.currentStoryIndex,
    isPlaying: state.isPlaying,
    isLoading: state.isLoading,
    goToNextStory,
    goToPreviousStory,
    pauseStory,
    playStory,
  };
}; 