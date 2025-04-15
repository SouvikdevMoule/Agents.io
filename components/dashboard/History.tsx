"use client"
import { UserContext } from '@/app/_context/userContext'
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react'
import React, { useContext, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, User, Loader2, MessageSquare, CalendarDays, Sparkles } from 'lucide-react';
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

function History() {
  const convex = useConvex();
  const userData = useContext(UserContext);
  const [discussions, setDiscussions] = useState<DiscussionRoom[]>([]);
  const [visibleItems, setVisibleItems] = useState(4);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

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
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  const loadMore = async () => {
    setIsLoadingMore(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setVisibleItems(prev => prev + 4);
    setIsLoadingMore(false);
  }

  const hasMore = visibleItems < discussions.length;

  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        delay: i * 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
    exit: { opacity: 0, y: -20, scale: 0.98, transition: { duration: 0.3 } },
  };

  // Badge animation variants
  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1], delay: 0.2 },
    },
  };

  // Skeleton loader component
  const SkeletonCard = () => (
    <div className="w-full bg-white rounded-lg md:rounded-xl shadow-xs border border-gray-100 p-4 animate-pulse">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-gray-200"></div>
        <div className="flex-1">
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="h-6 bg-gray-200 rounded w-20"></div>
      </div>
    </div>
  );

  return (
    <div className="w-full px-5 py-6 md:px-8 max-w-6xl mx-auto">
      {/* Header with entrance animation */}
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
            Your Discussion Sessions
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
        <div className="flex flex-col gap-4">
          {[...Array(4)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : discussions.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-12 md:py-16 border-2 border-dashed border-gray-200 rounded-xl md:rounded-2xl"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
          >
            <MessageSquare className="mx-auto h-10 w-10 md:h-12 md:w-12 text-gray-400" />
          </motion.div>
          <h3 className="mt-3 text-base md:text-lg font-medium text-gray-900">No discussion sessions found yet</h3>
          <p className="mt-1.5 text-gray-500 max-w-md mx-auto text-sm md:text-base">
            Your completed coaching sessions will appear here .
          </p>
        </motion.div>
      ) : (
        <div className="w-full flex flex-col items-center gap-4 md:gap-5">
          <AnimatePresence mode="wait">
            {discussions.slice(0, visibleItems).map((discussion, index) => (
              <motion.div
                key={discussion._id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full bg-white rounded-lg md:rounded-xl shadow-xs border border-gray-100 overflow-hidden relative"
                whileHover={{
                  translateY: -4,
                  boxShadow: "0 8px 16px -4px rgba(0, 0, 0, 0.1)",
                  transition: { duration: 0.2 },
                }}
              >
                {/* Background glow on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-indigo-50/0 to-indigo-50/20 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="p-4 relative z-10">
                  <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3 md:gap-4">
                    {/* Left side content */}
                    <div className="flex items-start gap-3 md:gap-4 min-w-0">
                      <motion.div
                        className="relative flex-shrink-0"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                          <User className="w-4 h-4 md:w-5 md:h-5 text-white" />
                        </div>
                      </motion.div>
                      <div className="min-w-0">
                        <h2 className="text-base md:text-lg font-semibold text-gray-900 truncate">
                          {discussion?.coachingoption}
                        </h2>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1">
                          <span className="inline-flex items-center gap-1 text-xs md:text-sm text-gray-500">
                            <User className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate max-w-[120px] md:max-w-none">{discussion?.expertname}</span>
                          </span>
                          <span className="text-gray-300 hidden md:inline">•</span>
                          <span className="inline-flex items-center gap-1 text-xs md:text-sm text-gray-500">
                            <CalendarDays className="w-3 h-3 flex-shrink-0" />
                            {formatDate(discussion?._creationTime)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right side content */}
                    <div className="flex flex-col lg:flex-row lg:items-center gap-2 md:gap-3">
                      <motion.div
                        variants={badgeVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex items-center gap-1.5"
                      >
                        {/* <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          discussion.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {discussion.status || 'Completed'}
                        </span> */}
                        <span className="px-2 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-medium flex items-center gap-1">
                          <MessageSquare className="w-3 h-3 flex-shrink-0" />
                          {discussion?.conversation?.length}
                        </span>
                      </motion.div>
                      
                      <Link href={`/view-details/${discussion._id}`} className="w-full">
                      <motion.button
                        className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-800 px-2.5 py-1 rounded-md hover:bg-indigo-50 transition-colors"
                        whileHover={{ x: 4, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        whileFocus={{ scale: 1.05 }}
                      >
                        Details
                        <ChevronRight className="w-4 h-4" />
                      </motion.button>
                      </Link>

                      
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {hasMore && (
            <motion.div 
              className="w-full flex justify-center mt-5 md:mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.button
                onClick={loadMore}
                className="px-5 py-2 bg-white border border-gray-200 rounded-lg shadow-xs hover:bg-gray-50 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors flex items-center gap-2"
                whileHover={{ y: -2, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.95 }}
                disabled={isLoadingMore}
              >
                {isLoadingMore ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    Load more
                    <motion.span 
                      className="text-xs bg-gray-100 px-1.5 py-0.5 rounded"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      {Math.min(4, discussions?.length - visibleItems)} more
                    </motion.span>
                  </>
                )}
              </motion.button>
            </motion.div>
          )}
        </div>
      )}
    </div>
  )
}

export default History