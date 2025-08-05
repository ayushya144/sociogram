export const currentUser = {
  id: "u123",
  name: "Ayush",
  avatar: "https://i.pravatar.cc/150?img=3",
};

export const posts = [
  {
    id: "p1",
    author: {
      id: "u1",
      name: "Alice",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop&crop=center",
    caption: "First post!",
    likes: ["u123"],
    comments: [
      {
        id: "c1",
        user: {
          id: "u2",
          name: "Bob",
          avatar: "https://i.pravatar.cc/150?img=2",
        },
        text: "Nice!",
        timestamp: Date.now(),
      },
    ],
    timestamp: Date.now() - 86400000, // 1 day ago
  },
  {
    id: "p2",
    author: {
      id: "u2",
      name: "Bob",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop&crop=center",
    caption: "Beautiful sunset today! 🌅",
    likes: ["u123", "u1"],
    comments: [
      {
        id: "c2",
        user: {
          id: "u1",
          name: "Alice",
          avatar: "https://i.pravatar.cc/150?img=1",
        },
        text: "Stunning!",
        timestamp: Date.now() - 3600000,
      },
      {
        id: "c3",
        user: {
          id: "u123",
          name: "Ayush",
          avatar: "https://i.pravatar.cc/150?img=3",
        },
        text: "Where is this?",
        timestamp: Date.now() - 1800000,
      },
    ],
    timestamp: Date.now() - 7200000, // 2 hours ago
  },
  {
    id: "p3",
    author: {
      id: "u3",
      name: "Charlie",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop&crop=center",
    caption: "Coffee and code ☕️💻",
    likes: ["u123", "u1", "u2"],
    comments: [
      {
        id: "c4",
        user: {
          id: "u123",
          name: "Ayush",
          avatar: "https://i.pravatar.cc/150?img=3",
        },
        text: "The perfect combination!",
        timestamp: Date.now() - 7200000,
      },
    ],
    timestamp: Date.now() - 1800000, // 30 minutes ago
  },
];
