"use client";
import { UserContext } from '@/app/_context/userContext';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, User, BookHeadphones, ChevronRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

function Page() {
  const userData = useContext(UserContext);
  const user = userData?.userData?._id;
  const discussionRooms = useQuery(api.DiscussionRoom.GetAllDiscussionRoomsByUser, {
    user: user as any,
  });

  if (!discussionRooms) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center p-6">
      <motion.div
        animate={{ 
          rotate: [0, 10, -10, 0],
          transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
        }}
        className="text-center"
      >
        <BookHeadphones className="w-12 h-12 text-yellow-300 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-white">Loading your discussions</h2>
        <p className="text-blue-200 mt-2">We're preparing your feedback rooms</p>
      </motion.div>
    </div>
  );

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, rotate: -2 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotate: 0, 
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15 
      } 
    },
    hover: { 
      y: -10,
      boxShadow: "0 20px 30px rgba(251, 191, 36, 0.2)",
      transition: { 
        type: "spring", 
        stiffness: 300 
      } 
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900 p-6 sm:p-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, 20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
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

      {/* Header */}
      <motion.div 
        className="max-w-7xl mx-auto mb-12 text-center relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-white mb-4"
          whileHover={{ 
            scale: 1.02,
            textShadow: "0 0 10px rgba(251, 191, 36, 0.5)",
            transition: { duration: 0.3 }
          }}
        >
          Your <span className="text-yellow-300">Feedback</span> Rooms
        </motion.h1>
        <p className="text-xl text-blue-200 max-w-2xl mx-auto">
          Review your past discussions and expert feedback
        </p>
      </motion.div>

      {/* Rooms Grid */}
      <motion.div 
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {discussionRooms.map((room, index) => (
          <Link key={room._id} href={`/view-details/${room._id}`} className="block">
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="relative h-full group"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-yellow-400 rounded-2xl opacity-0 group-hover:opacity-10 blur-md transition-opacity duration-300"></div>
              
              {/* Card */}
              <div className="relative h-full bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 shadow-lg group-hover:shadow-xl group-hover:border-yellow-300/30 transition-all duration-300 p-1">
                <div className="h-full bg-gradient-to-b from-blue-900/80 to-indigo-900/80 rounded-xl p-6 flex flex-col">
                  {/* Badge */}
                  <div className="mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-300 text-xs font-semibold uppercase tracking-wider border border-yellow-300/20">
                      <BookHeadphones className="w-4 h-4 mr-2" />
                      {room.coachingoption}
                    </span>
                  </div>

                  {/* Topic */}
                  <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-yellow-300 transition-colors">
                    {room.topic}
                  </h3>

                  {/* Expert */}
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-blue-700/30 rounded-full mr-3 border border-blue-400/20">
                      <User className="w-5 h-5 text-blue-300" />
                    </div>
                    <div>
                      <p className="text-xs text-blue-300">Expert</p>
                      <p className="font-medium text-white">{room.expertname}</p>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center">
                      <CalendarDays className="w-5 h-5 text-blue-300 mr-2" />
                      <span className="text-sm text-blue-200">
                        {formatDate(room._creationTime)}
                      </span>
                    </div>
                    <motion.div
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                      className="text-yellow-300"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>

      {/* Empty State */}
      {discussionRooms.length === 0 && (
        <motion.div 
          className="max-w-md mx-auto text-center py-16 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-yellow-400/10 p-6 rounded-full inline-block mb-6 border border-yellow-300/20">
            <BookHeadphones className="w-10 h-10 text-yellow-300" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No feedback rooms yet</h3>
          <p className="text-blue-200 mb-6">Start a new discussion to receive expert feedback</p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(251, 191, 36, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 rounded-lg font-bold shadow-lg hover:shadow-yellow-400/30 transition-all flex items-center mx-auto"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Create New Discussion
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}

export default Page;