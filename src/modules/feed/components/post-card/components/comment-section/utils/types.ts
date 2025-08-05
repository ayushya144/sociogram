import { Comment, User } from "@/utils/hooks/usePosts";

export interface CommentSectionProps {
  comments: Comment[];
  currentUser: User;
  onAddComment?: (postId: string, text: string) => void;
  postId: string;
}
