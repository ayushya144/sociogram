"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { CommentSectionProps } from "./utils/types";

export default function CommentSection({
  comments,
  currentUser,
  onAddComment,
  postId,
}: CommentSectionProps) {
  const [newComment, setNewComment] = useState("");

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();

    if (newComment.trim() && onAddComment) {
      onAddComment(postId, newComment.trim());
      setNewComment("");
    }
  };

  const formatTimestamp = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;

    if (diff < 60000) return "Just now";
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return `${Math.floor(diff / 86400000)}d ago`;
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{
          duration: 0.25,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="border-t border-gray-100 dark:border-gray-700 pt-4 mt-4"
      >
        {/* Comments List */}
        <motion.div
          className="space-y-3 mb-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.05,
                delayChildren: 0.1,
              },
            },
          }}
        >
          {comments.map((comment) => (
            <motion.div
              key={comment.id}
              className="flex items-start space-x-3"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.2,
                    ease: [0.4, 0.0, 0.2, 1],
                  },
                },
              }}
            >
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full relative ring-2 ring-gray-100 dark:ring-gray-600">
                  <Image
                    src={comment.user.avatar}
                    alt={comment.user.name}
                    fill
                    className="rounded-full object-cover h-full w-full"
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl px-4 py-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold text-sm text-gray-900 dark:text-white">
                      {comment.user.name}
                    </span>
                    <span className="text-gray-400 dark:text-gray-500 text-xs">
                      {formatTimestamp(comment.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                    {comment.text}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Add Comment Form */}
        <motion.form
          onSubmit={handleSubmitComment}
          className="flex items-center space-x-3 pt-4 border-t border-gray-100 dark:border-gray-700"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.2,
            delay: 0.15,
            ease: [0.4, 0.0, 0.2, 1],
          }}
        >
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full relative ring-2 ring-gray-100 dark:ring-gray-600">
              <Image
                src={currentUser.avatar}
                alt={currentUser.name}
                fill
                className="rounded-full object-cover h-full w-full"
              />
            </div>
          </div>
          <div className="flex-1 relative">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full text-sm border border-gray-200 dark:border-gray-600 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
          <motion.button
            type="submit"
            disabled={!newComment.trim()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.1 }}
            className="text-blue-500 dark:text-blue-400 font-semibold text-sm px-4 py-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 disabled:text-gray-400 dark:disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors duration-200"
          >
            Post
          </motion.button>
        </motion.form>
      </motion.div>
    </AnimatePresence>
  );
}
