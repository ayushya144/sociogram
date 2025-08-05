"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import Image from "next/image";
import { CommentDrawerProps } from "./utils/types";

export default function CommentDrawer({
  isOpen,
  onClose,
  comments,
  currentUser,
  onAddComment,
  postId,
}: CommentDrawerProps) {
  const [newComment, setNewComment] = useState("");
  const [lastCommentId, setLastCommentId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();

    if (newComment.trim() && onAddComment) {
      onAddComment(postId, newComment.trim());
      setNewComment("");
      // Set flag to scroll to top after new comment is added
      setLastCommentId(`comment-${Date.now()}`);
    }
  };

  // Auto-scroll to top when new comment is added
  useEffect(() => {
    if (lastCommentId && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
      setLastCommentId(null);
    }
  }, [comments, lastCommentId]);

  const formatTimestamp = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;

    if (diff < 60000) return "Just now";
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return `${Math.floor(diff / 86400000)}d ago`;
  };

  // Close drawer on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Handle drag to close
  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setIsDragging(false);
    const threshold = 100; // pixels to drag down to close
    const velocity = info.velocity.y;

    if (info.offset.y > threshold || velocity > 500) {
      onClose();
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  // Prevent drag when scrolling in comments
  const handleScroll = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  // Sort comments by timestamp (newest first)
  const sortedComments = [...comments].sort(
    (a, b) => b.timestamp - a.timestamp
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Drawer */}
          <motion.div
            ref={drawerRef}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
            }}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            className="fixed bottom-0 left-0 right-0 h-[70vh] bg-white dark:bg-gray-800 rounded-t-3xl z-50 shadow-2xl flex flex-col cursor-grab active:cursor-grabbing"
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
              <div className="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
            </div>

            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">
                Comments ({comments.length})
              </h3>
            </div>

            {/* Comments List - Scrollable */}
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto px-4 py-2 min-h-0"
            >
              <motion.div
                className="space-y-4"
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
                {sortedComments.map((comment, index) => (
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
                    // Add special animation for newest comment
                    initial={
                      index === 0 && lastCommentId
                        ? {
                            opacity: 0,
                            y: -20,
                            scale: 0.95,
                          }
                        : false
                    }
                    animate={
                      index === 0 && lastCommentId
                        ? {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                          }
                        : false
                    }
                    transition={
                      index === 0 && lastCommentId
                        ? {
                            duration: 0.3,
                            ease: [0.4, 0.0, 0.2, 1],
                          }
                        : undefined
                    }
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
            </div>

            {/* Add Comment Form - Sticky Bottom */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex-shrink-0 bg-white dark:bg-gray-800">
              <motion.form
                onSubmit={handleSubmitComment}
                className="flex items-center space-x-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.2,
                  delay: 0.3,
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
                    className="w-full text-base border border-gray-200 dark:border-gray-600 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
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
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
