import { Story } from '../types/Story';

// Your story
export const myStory: Story = {
  id: 'my-story',
  imageUrl: 'https://picsum.photos/800/1200?random=0',
  username: 'Your story',
  timestamp: 'Just now',
  seen: false,
  userAvatar: 'https://i.pravatar.cc/150?img=12',
  isMyStory: true
};

export const stories: Story[] = [
  myStory,
  {
    id: '1',
    imageUrl: 'https://picsum.photos/800/1200?random=1',
    username: 'john_doe',
    timestamp: '2h ago',
    seen: false,
    userAvatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    imageUrl: 'https://picsum.photos/800/1200?random=2',
    username: 'emma_watson',
    timestamp: '3h ago',
    seen: false,
    userAvatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: '3',
    imageUrl: 'https://picsum.photos/800/1200?random=3',
    username: 'mike_wilson',
    timestamp: '5h ago',
    seen: false,
    userAvatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: '4',
    imageUrl: 'https://picsum.photos/800/1200?random=4',
    username: 'sarah_parker',
    timestamp: '6h ago',
    seen: false,
    userAvatar: 'https://i.pravatar.cc/150?img=4',
  },
  {
    id: '5',
    imageUrl: 'https://picsum.photos/800/1200?random=5',
    username: 'alex_turner',
    timestamp: '8h ago',
    seen: false,
    userAvatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: '6',
    imageUrl: 'https://picsum.photos/800/1200?random=6',
    username: 'lisa_white',
    timestamp: '10h ago',
    seen: false,
    userAvatar: 'https://i.pravatar.cc/150?img=6',
  },
  {
    id: '7',
    imageUrl: 'https://picsum.photos/800/1200?random=7',
    username: 'david_brown',
    timestamp: '12h ago',
    seen: false,
    userAvatar: 'https://i.pravatar.cc/150?img=7',
  },
  {
    id: '8',
    imageUrl: 'https://picsum.photos/800/1200?random=8',
    username: 'olivia_green',
    timestamp: '14h ago',
    seen: false,
    userAvatar: 'https://i.pravatar.cc/150?img=8',
  },
  {
    id: '9',
    imageUrl: 'https://picsum.photos/800/1200?random=9',
    username: 'james_black',
    timestamp: '16h ago',
    seen: false,
    userAvatar: 'https://i.pravatar.cc/150?img=9',
  },
  {
    id: '10',
    imageUrl: 'https://picsum.photos/800/1200?random=10',
    username: 'sophia_lee',
    timestamp: '18h ago',
    seen: false,
    userAvatar: 'https://i.pravatar.cc/150?img=10',
  }
]; 