import { useReducer, useEffect } from "react";
import { posts as initialPosts, currentUser } from "../data/posts";

// Types
export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Comment {
  id: string;
  user: User;
  text: string;
  timestamp: number;
}

export interface Post {
  id: string;
  author: User;
  image: string;
  caption: string;
  likes: string[];
  comments: Comment[];
  timestamp: number;
}

// Action types
type PostsAction =
  | { type: "TOGGLE_LIKE"; postId: string; userId: string }
  | { type: "ADD_COMMENT"; postId: string; comment: Comment }
  | { type: "LOAD_FROM_STORAGE"; posts: Post[] };

// Reducer function
function postsReducer(state: Post[], action: PostsAction): Post[] {
  switch (action.type) {
    case "TOGGLE_LIKE": {
      return state.map((post) => {
        if (post.id === action.postId) {
          const isLiked = post.likes.includes(action.userId);
          const newLikes = isLiked
            ? post.likes.filter((id) => id !== action.userId)
            : [...post.likes, action.userId];

          return {
            ...post,
            likes: newLikes,
          };
        }
        return post;
      });
    }

    case "ADD_COMMENT": {
      return state.map((post) => {
        if (post.id === action.postId) {
          return {
            ...post,
            comments: [...post.comments, action.comment],
          };
        }
        return post;
      });
    }

    case "LOAD_FROM_STORAGE": {
      return action.posts;
    }

    default:
      return state;
  }
}

// LocalStorage utilities
const STORAGE_KEY = "sociogram_posts";

const saveToLocalStorage = (posts: Post[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch (error) {
    console.warn("Failed to save to localStorage:", error);
  }
};

const loadFromLocalStorage = (): Post[] | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.warn("Failed to load from localStorage:", error);
  }
  return null;
};

// Custom hook
export function usePosts() {
  const [posts, dispatch] = useReducer(postsReducer, initialPosts);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedPosts = loadFromLocalStorage();
    if (storedPosts) {
      dispatch({ type: "LOAD_FROM_STORAGE", posts: storedPosts });
    }
  }, []);

  // Save to localStorage whenever posts change
  useEffect(() => {
    saveToLocalStorage(posts);
  }, [posts]);

  const toggleLike = (postId: string, userId: string) => {
    dispatch({ type: "TOGGLE_LIKE", postId, userId });
  };

  const addComment = (postId: string, text: string) => {
    const comment: Comment = {
      id: `comment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      user: currentUser,
      text: text.trim(),
      timestamp: Date.now(),
    };

    dispatch({ type: "ADD_COMMENT", postId, comment });
  };

  const resetToInitial = () => {
    dispatch({ type: "LOAD_FROM_STORAGE", posts: initialPosts });
  };

  return {
    posts,
    toggleLike,
    addComment,
    resetToInitial,
    currentUser,
  };
}
