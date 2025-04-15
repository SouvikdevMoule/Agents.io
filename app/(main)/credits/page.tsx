"use client";
import { UserContext } from '@/app/_context/userContext';
import { useUser } from '@stackframe/stack';
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { FaCoins, FaCheckCircle, FaCrown, FaRocket, FaGem } from 'react-icons/fa';

function Page() {
  const userData = useContext(UserContext);
  console.log("User Data:", userData);

  // Fallback data if userData is undefined
  const credits = userData?.userData?.credits || 50000;
  const name = userData?.userData?.name || "User";

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardHover = {
    scale: 1.03,
    y: -10,
    transition: { type: "spring", stiffness: 300 }
  };

  // Plan data
  const plans = [
    {
      name: "Starter",
      credits: 10000,
      price: "$9.99",
      features: ["10,000 Credits", "Standard Support", "Basic Features"],
      icon: <FaCoins className="text-amber-400" />,
      popular: false,
      gradient: "from-amber-500 to-amber-600"
    },
    {
      name: "Pro",
      credits: 50000,
      price: "$29.99",
      features: ["50,000 Credits", "Priority Support", "Advanced Features", "Early Access"],
      icon: <FaRocket className="text-purple-400" />,
      popular: true,
      gradient: "from-purple-500 to-indigo-600"
    },
    {
      name: "Enterprise",
      credits: 100000,
      price: "$49.99",
      features: ["100,000 Credits", "24/7 Support", "All Features", "VIP Access", "Dedicated Manager"],
      icon: <FaGem className="text-teal-400" />,
      popular: false,
      gradient: "from-teal-500 to-emerald-600"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 w-full h-full">
        {/* Replace SparklesCore with a valid component or remove it */}
        {/* Example: Replace with a placeholder div */}
        <div
          id="tsparticlesfullpage"
          className="w-full h-full"
          style={{
            background: "transparent",
            minHeight: "100%",
            maxHeight: "100%",
          }}
        />
      </div>
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent from-20% to-black/70 to-70% pointer-events-none" />

      <motion.div
        className="max-w-6xl w-full relative z-10"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* Header Section */}
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-purple-300 to-teal-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Welcome, <span className="text-white">{name}!</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Upgrade your experience with premium plans
          </motion.p>
        </motion.div>

        {/* Credits Display */}
        <motion.div
          variants={fadeInUp}
          className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 mb-12 shadow-2xl border border-white/10 relative overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <FaCoins className="text-amber-300 text-4xl mr-3 z-10 relative" />
                <div className="absolute inset-0 bg-amber-300 rounded-full blur-md opacity-30 -z-10" />
              </div>
              <h2 className="text-2xl font-semibold text-white">Your Credit Balance</h2>
            </div>
            <motion.p 
              className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-yellow-500 mb-2"
              animate={{ 
                scale: [1, 1.05, 1],
                textShadow: ["0 0 8px rgba(251, 191, 36, 0)", "0 0 16px rgba(251, 191, 36, 0.5)", "0 0 8px rgba(251, 191, 36, 0)"]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {credits.toLocaleString()}
            </motion.p>
            <p className="text-gray-300">Credits available</p>
          </div>
        </motion.div>

        {/* Plans Section */}
        <motion.h2 
          variants={fadeInUp} 
          className="text-4xl font-bold text-white mb-8 text-center"
        >
          Choose Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Plan</span>
        </motion.h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className={`relative rounded-2xl p-8 shadow-xl border border-white/10 bg-gradient-to-b ${plan.gradient}/10 to-black/50 backdrop-blur-sm overflow-hidden`}
              whileHover={cardHover}
              transition={{ duration: 0.3 }}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-4 py-1 rounded-bl-lg rounded-tr-lg flex items-center">
                  <FaCrown className="mr-2" /> POPULAR
                </div>
              )}
              
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center mb-2">
                    <div className="text-2xl mr-3">{plan.icon}</div>
                    <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                  </div>
                  <p className="text-gray-300">Perfect for {plan.name === "Starter" ? "beginners" : plan.name === "Pro" ? "power users" : "businesses"}</p>
                </div>
              </div>
              
              <div className="mb-8">
                <p className="text-5xl font-bold text-white mb-2">{plan.price}</p>
                <p className="text-gray-300">{plan.credits.toLocaleString()} Credits</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <FaCheckCircle className="text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-gray-200">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <motion.button
                className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/20'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
                whileTap={{ scale: 0.95 }}
                whileHover={{ 
                  y: -2,
                  boxShadow: plan.popular ? "0 10px 25px -5px rgba(192, 132, 252, 0.4)" : "0 5px 15px -5px rgba(255, 255, 255, 0.1)"
                }}
              >
                Get {plan.name}
              </motion.button>
              
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${plan.gradient}`} />
            </motion.div>
          ))}
        </div>
        
        {/* Footer note */}
        <motion.div 
          variants={fadeInUp}
          className="text-center mt-12 text-gray-400 text-sm"
        >
          Need a custom plan? <a href="#" className="text-purple-300 hover:text-purple-200 underline">Contact us</a>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Page;