"use client"
import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import Image from 'next/image';
import { Expertavatar } from '@/services/Option';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/app/_context/userContext';
import { useUser } from '@stackframe/stack';

function UserModal({ children, coachingoption }: any) {
  // Enhanced animation variants
  const contentVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.4,
        ease: [0.25, 0.8, 0.25, 1],
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9, 
      y: 50, 
      transition: { 
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 15,
      },
    },
  };

  const avatarVariants = {
    hidden: { scale: 0, opacity: 0, rotate: -10 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
      },
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)',
      transition: {
        duration: 0.3,
        ease: "easeOut"
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    }
  };

  const inputVariants = {
    hover: {
      scale: 1.02,
      boxShadow: '0 5px 15px rgba(99, 102, 241, 0.2)',
    },
    focus: {
      scale: 1.02,
      borderColor: '#4f46e5',
      boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)',
    }
  };
  const [selectedExpert, setSelectedExpert] =useState<any>();
  const [topic, setTopic] =useState<any>();
  const [loading, setLoading] =useState(false);
  const [openModal, setOpenModal] =useState(false);
  const navigation = useRouter()
  const createRoom = useMutation(api.DiscussionRoom.CreateNewRoom)
  const userData = useContext(UserContext)


  const OnClickNext = async ()=> {
    setLoading(true);

      const result = await createRoom({ 
        coachingoption: coachingoption?.name,
        topic : topic,
        expertname: selectedExpert,
        user: userData?.userData?._id,
      });
      console.log(result)
      setOpenModal(false);
    setLoading(false);
    navigation.push(`/room/${result}`)
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <AnimatePresence>
        <DialogContent className="cursor-pointer sm:max-w-md w-full bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-100/50 p-6 backdrop-blur-sm">
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative"
          >
            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
            
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-900 mb-4 relative">
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                  {coachingoption.name}
                </span>
                <motion.span
                  className="absolute -top-2 -right-2 w-3 h-3 bg-indigo-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </DialogTitle>

              <motion.div variants={containerVariants}>
                {/* Input Section */}
                <motion.div variants={itemVariants} className="mb-8">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text ">
                    Enter Your Topic
                  </h3>
                  <motion.div
                    
                    whileHover="hover"
                    whileFocus="focus"
                    transition={{ duration: 0.2 }}
                  >
                    <Textarea 
                      placeholder="Type your topic here..."
                      onChange={(e) => setTopic(e.target.value)}
                    />
                  </motion.div>
                </motion.div>

                {/* Avatar Grid */}
                <motion.div
                  className="grid grid-cols-3 gap-4"
                  variants={containerVariants}
                >
                  {Expertavatar.map((item, index) => (
                    <motion.div
                      key={index}
                      variants={avatarVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className={`group relative flex flex-col items-center p-3 
                        bg-gradient-to-br from-blue-50 to-indigo-50 
                        rounded-xl cursor-pointer 
                        shadow-md hover:shadow-lg
                        transition-all duration-300
                        ${selectedExpert === item.name ? 'border-2 border-indigo-500' : 'border-2 border-gray-200'}
                        ${selectedExpert !== item.name ? 'hover:border-indigo-300' : ''}
                        border-2 border-blue-400
                        hover:border-indigo-200`}
                        onClick={() => setSelectedExpert(item.name)}
                    >
                      {/* Glow effect */}
                      <motion.div
                        className="absolute inset-0 bg-indigo-500/10 rounded-xl"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 0.2 }}
                        transition={{ duration: 0.2 }}
                      />
                      
                      <motion.div
                        whileHover={{ rotate: 10, y: -5 }}
                        transition={{ duration: 0.3 }}
                        className="relative"
                      >
                        <Image
                          src={item.icon}
                          alt={item.name}
                          height={48}
                          width={48}
                          className="object-contain rounded-full h-[48px] w-[48px] bg-black border-2 border-blue-200/50 shadow-sm group-hover:shadow-lg transition-all duration-300"
                        />
                        <motion.div
                          className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-20"
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                      <motion.h1
                        className="mt-2 text-sm font-medium text-gray-800 group-hover:text-indigo-700"
                        initial={{ y: 5, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {item.name}
                      </motion.h1>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </DialogHeader>
          </motion.div>
          <div className="flex  gap-4 justify-end">
            <DialogClose className='bg-gray-200 px-2 rounded-lg hover:bg-gray-400'>Cancel</DialogClose>
            <Button disabled={(!topic || !selectedExpert || loading)} onClick={OnClickNext}>{loading && <Loader2 className='animate-spin' />}  Next</Button>
          </div>
        </DialogContent>
      </AnimatePresence>
    </Dialog>
  );
}

export default UserModal;
