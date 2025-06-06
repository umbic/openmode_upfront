import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Send,
  Heart,
  Users,
  Sparkles,
} from "lucide-react";
import "./styles.css";

// Your JSONBin credentials
const JSONBIN_BIN_ID = "684363358960c979a5a60f05";
const JSONBIN_API_KEY =
  "$2a$10$ikOKX6R.EufSDjsrvJR4/OUyQJRwsM9RAcGXE8lTdW6yTFSRiH24W";

interface Comment {
  text: string;
  author: string;
  timestamp: string;
  id: number;
}

interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  content: string[];
  stats?: string[];
  gradient: string;
  icon?: React.ReactNode;
  isTransition?: boolean;
}

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [comments, setComments] = useState<Record<number, Comment[]>>({});
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [userName, setUserName] = useState("");
  const [isNameSet, setIsNameSet] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const slides: Slide[] = [
    {
      id: 1,
      title: "Belonging Starts with Shared Identity",
      content: [
        "We feel a sense of belonging when we recognize ourselves in others in values, mindset, and emotional experience.",
        "That's what creates trust, safety, and the feeling of \"I'm home here.\"",
      ],
      stats: [
        "84% of people report greater belonging when they feel emotionally connected and seen for who they are — not just when they're surrounded by others. (Belonging Barometer, American Immigration Council, 2024)",
        "Social Identity Theory shows people are more likely to trust, cooperate, and stay loyal to those who reflect their values and self-image. (Mentes Abiertas Psicología, 2023)",
        "A strong sense of community depends on emotional connection, mutual support, and shared values — not just shared space. (Psychology Fanatic, 2024)",
      ],
      gradient: "from-purple-600 to-pink-600",
      icon: <Users className="w-16 h-16 text-white/20" />,
    },
    {
      id: 2,
      title: "We Love the Brands That Reflect Who We Are",
      content: [
        "Belonging doesn't stop at people.",
        "When a brand reflects our values, affirms our identity, or helps us express who we are, we form an emotional bond.",
        "And emotional bonds are what turn usage into love.",
      ],
      stats: [
        "82% of consumers say they feel more loyal to brands that align with their personal values. (Huddle Creative, 2024)",
        "Consumers are 3× more likely to stick with brands they feel emotionally connected to. (Motista, 2024)",
        "Symbolic alignment, when a brand reflects our self-image, is a key driver of brand satisfaction and repurchase intent. (Nature Human Behaviour, 2024)",
      ],
      gradient: "from-pink-600 to-red-600",
      icon: <Heart className="w-16 h-16 text-white/20" />,
    },
    {
      id: 3,
      title: "Emotional Connection Is the Foundation of Loyalty",
      content: [
        "People don't stay loyal to what they use.",
        "They stay loyal to what they feel.",
        "Brand love turns everyday behavior into lasting preference, and lasting preference into lifetime value.",
      ],
      stats: [
        "306% higher customer lifetime value among emotionally connected customers. (Motista, 2024)",
        "71% of emotionally connected consumers are more likely to recommend the brand. (BusinessWire, 2024)",
      ],
      gradient: "from-red-600 to-orange-600",
      icon: <Sparkles className="w-16 h-16 text-white/20" />,
    },
    {
      id: 4,
      title: "",
      content: [
        "Culture isn't built through features.",
        "It's built when people feel part of something.",
      ],
      isTransition: true,
      gradient: "from-orange-600 to-yellow-600",
    },
    {
      id: 5,
      title: "Our Strategy",
      content: [
        "Openness, when shared, becomes belonging.",
        "Belonging, when sustained, becomes love.",
        "Love, when earned, becomes loyalty.",
        "",
        "Open Mode is the shared identity of Galaxy users.",
        "We're going to celebrate that identity, enable how they live it,",
        "and reward the connection it creates.",
      ],
      gradient: "from-yellow-600 to-green-600",
    },
    {
      id: 6,
      title:
        "How we celebrate them  The Home Screen Is the New Identity Canvas",
      content: [
        "For Galaxy users, customization isn't just a feature.",
        "It's self-expression. It's ownership. It's culture.",
        "Home screens are the front door to their digital lives,",
        "and how they choose to arrange them is a direct reflection of how they live, think, and move through the world.",
        "",
        "So we're not starting a campaign.",
        "We're surfacing a behavior that's already happening and turning it into a shared celebration.",
      ],
      stats: [
        "90% of Android users modify their home screens with folders, widgets, or layout changes. (Source: Developers Alliance, 2024) ￼",
        "31% of Galaxy users go even deeper, customizing with third-party launchers, gesture layouts, and invisible icons. (Source: Android Authority, 2024) ￼",
        "80% of consumers say personalized experiences make them more loyal to a brand. (Source: Forbes, 2024)",
      ],
      gradient: "from-green-600 to-blue-600",
    },
    {
      id: 7,
      title: "We Enable Life in Open Mode by Making Space",
      content: [
        "Open Mode is a mindset, one that needs room to breathe.",
        "Room to imagine. To question. To create.",
        "So we make space.",
        "",
        "Whether it's through unexpected tools, quiet moments, or new modes of expression,",
        "we create room for users to explore who they are, and how they want to show up in the world.",
      ],
      gradient: "from-blue-600 to-indigo-600",
    },
    {
      id: 8,
      title: "We Reward Life in Open Mode by Valuing What They Value",
      content: [
        "Living in Open Mode means spending with intention, on what reflects you, fuels you, and frees you.",
        "So Samsung Rewards becomes more than just a points program.",
        "It's a way to recognize the choices that express who you are.",
        "",
        "We reward you for spending on the things you love.",
        "And in doing so, we show you:",
        "your life in Open Mode has value.",
      ],
      gradient: "from-indigo-600 to-purple-600",
    },
  ];

  // Load comments from JSONBin when component mounts
  useEffect(() => {
    const loadComments = async () => {
      try {
        const response = await fetch(
          `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`,
          {
            headers: {
              "X-Access-Key": JSONBIN_API_KEY,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setComments(data.record || {});
        }
      } catch (error) {
        console.error("Error loading comments:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadComments();
  }, []);

  // Save comments to JSONBin whenever they change
  useEffect(() => {
    const saveComments = async () => {
      if (Object.keys(comments).length >= 0 && !isLoading) {
        try {
          await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "X-Access-Key": JSONBIN_API_KEY,
            },
            body: JSON.stringify(comments),
          });
        } catch (error) {
          console.error("Error saving comments:", error);
        }
      }
    };

    // Debounce the save operation
    const timeoutId = setTimeout(saveComments, 1000);
    return () => clearTimeout(timeoutId);
  }, [comments, isLoading]);

  const handleAddComment = () => {
    if (newComment.trim() && isNameSet) {
      const slideComments = comments[currentSlide] || [];
      setComments({
        ...comments,
        [currentSlide]: [
          ...slideComments,
          {
            text: newComment,
            author: userName,
            timestamp: new Date().toLocaleString(),
            id: Date.now(),
          },
        ],
      });
      setNewComment("");
    }
  };

  const handleSetName = () => {
    if (userName.trim()) {
      setIsNameSet(true);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlideData = slides[currentSlide];
  const slideComments = comments[currentSlide] || [];

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Background gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${currentSlideData.gradient} opacity-20 transition-all duration-1000`}
      />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Open Mode
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">
              Slide {currentSlide + 1} of {slides.length}
            </span>
            <button
              onClick={() => setShowComments(!showComments)}
              className="relative p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              {slideComments.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {slideComments.length}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* Slide content */}
        <div className="flex-1 flex items-center justify-center px-8 pb-20">
          <div className="max-w-4xl w-full">
            <div className="relative">
              {currentSlideData.icon && (
                <div className="absolute -top-8 -right-8 opacity-50">
                  {currentSlideData.icon}
                </div>
              )}

              {currentSlideData.title && (
                <h2
                  className={`text-4xl md:text-6xl font-bold mb-8 ${
                    currentSlideData.isTransition ? "text-center" : ""
                  }`}
                >
                  {currentSlideData.title}
                </h2>
              )}

              <div
                className={`space-y-4 ${
                  currentSlideData.isTransition
                    ? "text-center text-2xl md:text-3xl"
                    : "text-lg md:text-xl"
                }`}
              >
                {currentSlideData.content.map((line, index) => (
                  <p
                    key={index}
                    className={`leading-relaxed ${line === "" ? "h-4" : ""} ${
                      currentSlideData.isTransition ? "font-light" : ""
                    }`}
                  >
                    {line}
                  </p>
                ))}
              </div>

              {currentSlideData.stats && (
                <div className="mt-12 space-y-3">
                  {currentSlideData.stats.map((stat, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-white/60 mt-2 flex-shrink-0" />
                      <p className="text-sm text-gray-300 leading-relaxed">
                        {stat}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-6">
          <button
            onClick={prevSlide}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide ? "w-8 bg-white" : "bg-white/30"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Comments panel */}
      <div
        className={`fixed right-0 top-0 h-full w-96 bg-gray-800 transform transition-transform duration-300 ${
          showComments ? "translate-x-0" : "translate-x-full"
        } z-20 flex flex-col`}
      >
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Comments</h3>
            <button
              onClick={() => setShowComments(false)}
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          {isLoading && (
            <p className="text-sm text-gray-400 mt-2">Loading comments...</p>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {!isNameSet ? (
            <div className="space-y-4">
              <p className="text-gray-400">
                Enter your name to start commenting:
              </p>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSetName()}
                placeholder="Your name"
                className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={handleSetName}
                className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
              >
                Set Name
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {slideComments.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">
                    No comments yet. Be the first to share your thoughts!
                  </p>
                ) : (
                  slideComments.map((comment) => (
                    <div
                      key={comment.id}
                      className="bg-gray-700 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-purple-400">
                          {comment.author}
                        </span>
                        <span className="text-xs text-gray-400">
                          {comment.timestamp}
                        </span>
                      </div>
                      <p className="text-gray-200">{comment.text}</p>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>

        {isNameSet && (
          <div className="p-6 border-t border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
                placeholder="Add a comment..."
                className="flex-1 px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={handleAddComment}
                className="p-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
