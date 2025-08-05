"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import CommentDrawer from "./components/comment-drawer";
import { users } from "../../../../utils/data/posts";
import { Comment, User } from "@/utils/hooks/usePosts";
import LikesDrawer from "./components/likes-drawer";

interface Post {
  id: string;
  author: User;
  image: string;
  caption: string;
  likes: string[];
  comments: Comment[];
  timestamp: number;
}

interface PostCardProps {
  post: Post;
  currentUserId: string;
  onLikeToggle?: (postId: string, userId: string) => void;
  onAddComment?: (postId: string, text: string) => void;
}

export default function PostCard({
  post,
  currentUserId,
  onLikeToggle,
  onAddComment,
}: PostCardProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLikesDrawerOpen, setIsLikesDrawerOpen] = useState(false);
  const isLiked = post.likes.includes(currentUserId);

  const handleLike = () => {
    if (onLikeToggle) {
      onLikeToggle(post.id, currentUserId);
    }
  };

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const openLikesDrawer = () => {
    setIsLikesDrawerOpen(true);
  };

  const closeLikesDrawer = () => {
    setIsLikesDrawerOpen(false);
  };

  const formatTimestamp = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;

    if (diff < 60000) return "Just now";
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    if (diff < 604800000) return `${Math.floor(diff / 86400000)}d ago`;
    if (diff < 2592000000) return `${Math.floor(diff / 604800000)}w ago`;
    return `${Math.floor(diff / 2592000000)}mo ago`;
  };

  // Get user data by ID
  const getUserById = (userId: string) => {
    return users.find((user) => user.id === userId);
  };

  // Format likes text with clickable "others"
  const formatLikesText = () => {
    if (post.likes.length === 0) return "";
    if (post.likes.length === 1) {
      const user = getUserById(post.likes[0]);
      return `Liked by ${user?.name || "Unknown"}`;
    }
    if (post.likes.length === 2) {
      const user1 = getUserById(post.likes[0]);
      const user2 = getUserById(post.likes[1]);
      return `Liked by ${user1?.name || "Unknown"} and ${
        user2?.name || "Unknown"
      }`;
    }
    if (post.likes.length === 3) {
      const user1 = getUserById(post.likes[0]);
      const user2 = getUserById(post.likes[1]);
      return (
        <>
          Liked by {user1?.name || "Unknown"}, {user2?.name || "Unknown"} and{" "}
          <button
            onClick={openLikesDrawer}
            className="text-gray-900 dark:text-white hover:underline font-semibold"
          >
            1 other
          </button>
        </>
      );
    }
    const user1 = getUserById(post.likes[0]);
    const user2 = getUserById(post.likes[1]);
    return (
      <>
        Liked by {user1?.name || "Unknown"}, {user2?.name || "Unknown"} and{" "}
        <button
          onClick={openLikesDrawer}
          className="text-gray-900 dark:text-white hover:underline font-semibold"
        >
          {post.likes.length - 2} others
        </button>
      </>
    );
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl mb-6 shadow-sm overflow-hidden transition-colors duration-200"
      >
        {/* Post Header */}
        <div className="flex items-center p-4 sm:p-5">
          <div className="relative">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={40}
              height={40}
              className="rounded-full ring-2 ring-gray-100 dark:ring-gray-600"
            />
          </div>
          <div className="ml-3 flex-1">
            <p className="font-semibold text-sm text-gray-900 dark:text-white">
              {post.author.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {formatTimestamp(post.timestamp)}
            </p>
          </div>
        </div>

        {/* Post Image */}
        <div className="relative">
          <Image
            src={post.image}
            alt="Post"
            width={600}
            height={600}
            className="w-full object-cover"
          />
        </div>

        {/* Post Actions */}
        <div className="p-4 sm:p-5">
          {/* Action Buttons */}
          <div className="flex items-center space-x-4 mb-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLike}
              className={`flex items-center space-x-1 ${
                isLiked ? "text-red-500" : "text-gray-600 dark:text-gray-400"
              } hover:text-red-500 transition-colors duration-200`}
            >
              <motion.svg
                className="w-6 h-6"
                fill={isLiked ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={isLiked ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </motion.svg>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={openDrawer}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </motion.button>
          </div>

          {/* Likes */}
          {post.likes.length > 0 && (
            <motion.div
              className="mb-3"
              animate={{ opacity: [0.7, 1] }}
              transition={{ duration: 0.2 }}
            >
              <p className="font-semibold text-sm text-gray-900 dark:text-white">
                {formatLikesText()}
              </p>
            </motion.div>
          )}

          {/* Caption */}
          <div className="mb-3">
            <span className="font-semibold text-sm mr-2 text-gray-900 dark:text-white">
              {post.author.name}
            </span>
            <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {post.caption}
            </span>
          </div>

          {/* Comment Previews */}
          {post.comments.length > 0 && (
            <div className="border-t border-gray-100 dark:border-gray-700 pt-3 mb-3">
              {post.comments
                .slice()
                .sort((a, b) => b.timestamp - a.timestamp)
                .slice(0, 2)
                .map((comment) => (
                  <div key={comment.id} className="mb-1">
                    <span className="font-semibold text-sm mr-2 text-gray-900 dark:text-white">
                      {comment.user.name}
                    </span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {comment.text}
                    </span>
                  </div>
                ))}
              {post.comments.length > 2 && (
                <button
                  onClick={openDrawer}
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
                >
                  View all {post.comments.length} comments
                </button>
              )}
            </div>
          )}

          {/* Add Comment Button */}
          <button
            onClick={openDrawer}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
          >
            Add a comment...
          </button>
        </div>
      </motion.div>

      {/* Comment Drawer */}
      <CommentDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        comments={post.comments}
        currentUser={getUserById(currentUserId)!}
        onAddComment={onAddComment}
        postId={post.id}
      />

      {/* Likes Drawer */}
      <LikesDrawer
        isOpen={isLikesDrawerOpen}
        onClose={closeLikesDrawer}
        likes={post.likes}
        currentUserId={currentUserId}
      />
    </>
  );
}
