import { Comment, User } from "@/utils/hooks/usePosts";

export interface CommentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  comments: Comment[];
  currentUser: User;
  onAddComment?: (postId: string, text: string) => void;
  postId: string;
}
