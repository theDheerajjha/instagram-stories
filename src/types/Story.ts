export interface Story {
  id: string;
  imageUrl: string;
  username: string;
  timestamp: string;
  viewed: boolean;
}

export interface StoriesState {
  stories: Story[];
  currentStoryIndex: number;
  isPlaying: boolean;
  isLoading: boolean;
} 