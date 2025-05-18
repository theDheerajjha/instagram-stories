export interface Story {
  id: string;
  imageUrl: string;
  username: string;
  timestamp: string;
  seen: boolean;
  userAvatar?: string;
  isMyStory?: boolean;
}

export interface StoriesState {
  stories: Story[];
  currentStoryIndex: number;
  isPlaying: boolean;
  isLoading: boolean;
} 