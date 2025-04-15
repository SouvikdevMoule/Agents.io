"use client"
import { useUser } from '@stackframe/stack'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Expertlist } from '@/services/Option'
import { motion } from 'framer-motion'
import UserModal from './UserModal'
import Profile from './Profile'
import { Sparkles, ChevronRight } from 'lucide-react'

function FeatureAssistants() {
    const user = useUser()
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    // Background particle animation
    const particleVariants = {
        animate: (i: number) => ({
            y: [0, 20, 0],
            opacity: [0.3, 0.8, 0.3],
            transition: {
                duration: 3 + Math.random() * 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2 + i * 0.1
            }
        })
    }

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
                delay: Math.random() * 0.3
            }
        },
        hover: { 
            y: -10,
            scale: 1.03,
            boxShadow: "0 20px 30px rgba(251, 191, 36, 0.2)",
            transition: { duration: 0.4, ease: "easeOut" }
        }
    }

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
                ease: "easeInOut"
            }
        }
    }

    return (
        <div className='min-h-screen p-6 sm:p-8 overflow-hidden relative '>
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

            {/* Welcome Section */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 w-full flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white/5 backdrop-blur-lg rounded-2xl p-6 mb-10 border border-white/10 shadow-lg"
            >
                <div className="mb-4 sm:mb-0">
                    <motion.h3 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className='text-yellow-300 font-medium tracking-wide uppercase text-sm'
                    >
                        Your Premium Assistants
                    </motion.h3>
                    <motion.h2 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className='text-3xl font-bold text-white mt-1'
                    >
                        Welcome, <span className="text-yellow-300">{user?.displayName}</span>
                    </motion.h2>
                </div>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                >
                    <Profile>
                        <Button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-blue-900 font-bold px-6 py-3 rounded-full shadow-lg shadow-yellow-400/20 border border-yellow-300/30 flex items-center">
                            <Sparkles className="w-4 h-4 mr-2" />
                            Profile
                        </Button>
                    </Profile>
                </motion.div>
            </motion.div>

            {/* Assistants Grid */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 cursor-pointer">
                {Expertlist.map((item, index) => (
                    <motion.div
                        key={index}
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
                        
                        <UserModal coachingoption={item}>
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex items-center mb-6">
                                    <motion.img 
                                        src={item.icon} 
                                        alt={item.name}
                                        animate={hoveredIndex === index ? { 
                                            scale: 1.1,
                                            rotate: [0, 5, -5, 0],
                                            transition: { duration: 1.5, repeat: Infinity }
                                        } : {}}
                                        className="w-16 h-16 rounded-full mr-4 object-cover border-2 border-yellow-300/50 shadow-md"
                                        transition={{ duration: 0.4 }}
                                    />
                                    <div className="flex flex-col items-start">
                                        <motion.h3 
                                            className='text-xl font-bold text-white group-hover:text-yellow-300'
                                            transition={{ duration: 0.3 }}
                                        >
                                            {item?.name}
                                        </motion.h3>
                                        <motion.p 
                                            className="text-blue-200 text-sm mt-1 group-hover:text-yellow-200"
                                        >
                                            Expert Assistant
                                        </motion.p>
                                    </div>
                                </div>
                                
                                <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                                    <span className="text-sm text-blue-200">View details</span>
                                    <motion.div
                                        whileHover={{ x: 5 }}
                                        className="text-yellow-300"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </motion.div>
                                </div>
                            </div>
                        </UserModal>
                    </motion.div>
                ))}
            </div>

            {/* Floating CTA at bottom */}
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
    )
}

export default FeatureAssistants