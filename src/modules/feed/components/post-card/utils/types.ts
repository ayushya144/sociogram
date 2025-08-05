import { Comment, User } from "@/utils/hooks/usePosts";

export interface Post {
  id: string;
  author: User;
  image: string;
  caption: string;
  likes: string[];
  comments: Comment[];
  timestamp: number;
}

export interface PostCardProps {
  post: Post;
  currentUserId: string;
  onLikeToggle?: (postId: string, userId: string) => void;
  onAddComment?: (postId: string, text: string) => void;
}
