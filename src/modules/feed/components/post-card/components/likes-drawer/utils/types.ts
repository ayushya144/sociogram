// Likes Drawer Component
export interface LikesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  likes: string[];
  currentUserId: string;
}
