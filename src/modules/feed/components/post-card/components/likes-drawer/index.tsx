import { users } from "@/utils/data/posts";
import { motion } from "framer-motion";
import { LikesDrawerProps } from "./utils/types";
import Image from "next/image";

const LikesDrawer = ({
  isOpen,
  onClose,
  likes,
  currentUserId,
}: LikesDrawerProps) => {
  const getUserById = (userId: string) => {
    return users.find((user) => user.id === userId);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className={`fixed inset-0 bg-black/50 z-50 ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: isOpen ? 0 : "100%" }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 rounded-t-3xl z-50 shadow-2xl max-h-[70vh] overflow-hidden"
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
        </div>

        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">
            Likes ({likes.length})
          </h3>
        </div>

        {/* Likes List */}
        <div className="overflow-y-auto max-h-[60vh]">
          {likes.map((userId) => {
            const user = getUserById(userId);
            if (!user) return null;

            return (
              <motion.div
                key={userId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="rounded-full ring-2 ring-gray-100 dark:ring-gray-600"
                />
                <div className="ml-3 flex-1">
                  <p className="font-semibold text-sm text-gray-900 dark:text-white">
                    {user.name}
                  </p>
                  {userId === currentUserId && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      You
                    </p>
                  )}
                </div>
                {userId === currentUserId && (
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    • You
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LikesDrawer;
