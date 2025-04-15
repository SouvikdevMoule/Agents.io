"use client";
import { UserContext } from '@/app/_context/userContext';
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import React, { useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Sparkles, User, CalendarDays, MessageSquare } from 'lucide-react';
import Link from 'next/link';

interface DiscussionRoom {
  _id: string;
  _creationTime: number;
  coachingoption: string;
  expertname: string;
  topic?: string;
  status?: string;
  conversation: any[];
}

function Feedback() {
  const convex = useConvex();
  const userData = useContext(UserContext);
  const [discussions, setDiscussions] = useState<DiscussionRoom[]>([]);
  const [visibleItems, setVisibleItems] = useState(4);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (userData) {
      GetallData();
    }
  }, [userData]);

  const GetallData = async () => {
    try {
      setIsLoading(true);
      const res = await convex.query(api.DiscussionRoom.GetAllDiscussionRooms, { user: userData?.userData?._id });
      setDiscussions(res as DiscussionRoom[]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const loadMore = async () => {
    setIsLoadingMore(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setVisibleItems(prev => prev + 4);
    setIsLoadingMore(false);
  };

  const hasMore = visibleItems < discussions.length;

  // Background particle animation
  const particleVariants = {
    animate: (i: number) => ({
      y: [0, 20, 0],
      opacity: [0.3, 0.8, 0.3],
      transition: {
        duration: 3 + Math.random() * 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: Math.random() * 2 + i * 0.1,
      },
    }),
  };

  // Card animation
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: Math.random() * 0.3,
      },
    },
    hover: {
      y: -10,
      scale: 1.03,
      boxShadow: "0 20px 30px rgba(251, 191, 36, 0.2)",
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  // Glow animation for selected card
  const glowVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 0.3,
      scale: 1,
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse" as "reverse",
        ease: "easeInOut",
      },
    },
  };

  // Skeleton loader component
  const SkeletonCard = () => (
    <div className="w-full bg-white/5 backdrop-blur-sm rounded-xl p-6 animate-pulse border border-white/10">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full bg-gray-200/10"></div>
        <div className="flex-1">
          <div className="h-5 bg-gray-200/10 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200/10 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-6 sm:p-8 overflow-hidden relative ">
      {/* Animated background particles */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={particleVariants}
            animate="animate"
            className="absolute rounded-full bg-yellow-400"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white/5 backdrop-blur-lg rounded-2xl p-6 mb-10 border border-white/10 shadow-lg"
      >
        <div className="mb-4 sm:mb-0">

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl font-bold text-white mt-1"
          >
           Your Feedback Sessions
          </motion.h2>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-blue-900 font-bold px-6 py-3 rounded-full shadow-lg shadow-yellow-400/20 border border-yellow-300/30 flex items-center">
            <Sparkles className="w-4 h-4 mr-2" />
            {discussions?.length} {discussions?.length === 1 ? 'Session' : 'Sessions'}
          </button>
        </motion.div>
      </motion.div>

      {isLoading ? (
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(4)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : discussions?.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center py-16 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-lg"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
          >
            <MessageSquare className="mx-auto h-12 w-12 text-yellow-300" />
          </motion.div>
          <h3 className="mt-3 text-lg font-medium text-white">No feedback sessions yet</h3>
          <p className="mt-1.5 text-blue-200 max-w-md mx-auto">
            Your completed coaching sessions will appear here with feedback.
          </p>
        </motion.div>
      ) : (
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 cursor-pointer">
          <AnimatePresence mode="wait">
            {discussions?.slice(0, visibleItems).map((discussion, index) => (
              <motion.div
                key={discussion._id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="relative bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-lg overflow-hidden group hover:border-yellow-300/30 transition-all"
              >
                {/* Glow effect */}
                {hoveredIndex === index && (
                  <motion.div
                    variants={glowVariants}
                    animate="visible"
                    className="absolute inset-0 bg-yellow-400/20 rounded-xl pointer-events-none"
                  />
                )}

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center mb-6">
                    <motion.div
                      animate={
                        hoveredIndex === index
                          ? {
                              scale: 1.1,
                              rotate: [0, 5, -5, 0],
                              transition: { duration: 1.5, repeat: Infinity },
                            }
                          : {}
                      }
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center mr-4 border-2 border-yellow-300/50 shadow-md"
                      transition={{ duration: 0.4 }}
                    >
                      <User className="w-8 h-8 text-blue-900" />
                    </motion.div>
                    <div className="flex flex-col items-start">
                      <motion.h3
                        className="text-xl font-bold text-white group-hover:text-yellow-300"
                        transition={{ duration: 0.3 }}
                      >
                        {discussion?.topic || 'Untitled Session'}
                      </motion.h3>
                      <motion.p className="text-blue-200 text-sm mt-1 group-hover:text-yellow-200">
                        with {discussion?.expertname}
                      </motion.p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-blue-200 group-hover:text-yellow-200">
                      <CalendarDays className="w-4 h-4" />
                      {formatDate(discussion?._creationTime)}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-blue-200 group-hover:text-yellow-200">
                      <MessageSquare className="w-4 h-4" />
                      {discussion?.conversation?.length} Messages
                    </div>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        discussion?.status === 'Active'
                          ? 'bg-green-500/20 text-green-300'
                          : 'bg-blue-500/20 text-blue-300'
                      }`}
                    >
                      {discussion?.status || 'Completed'}
                    </span>
                  </div>

                  <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-sm text-blue-200 group-hover:text-yellow-200">View details</span>
                    <Link href={`/view-details/${discussion._id}`}>
                      <motion.div whileHover={{ x: 5 }} className="text-yellow-300">
                        <ChevronRight className="w-5 h-5" />
                      </motion.div>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {hasMore && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="relative z-10 flex justify-center mt-8"
        >
          <motion.button
            onClick={loadMore}
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(251, 191, 36, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-blue-900 font-bold rounded-full shadow-lg shadow-yellow-400/20 border border-yellow-300/30 flex items-center gap-2"
            disabled={isLoadingMore}
          >
            {isLoadingMore ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>
                Loading...
              </>
            ) : (
              <>
                Load More
                <span className="text-xs bg-blue-900/50 px-2 py-1 rounded">
                  {Math.min(4, discussions.length - visibleItems)} more
                </span>
              </>
            )}
          </motion.button>
        </motion.div>
      )}

      {/* Floating CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="fixed bottom-6 right-6 z-20"
      >
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(251, 191, 36, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          className="p-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 rounded-full font-bold shadow-xl shadow-yellow-400/30 flex items-center justify-center"
        >
          <Sparkles className="w-6 h-6" />
        </motion.button>
      </motion.div>
    </div>
  );
}

export default Feedback;