"use client";
import React, { useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUser } from "@stackframe/stack";
import Image from "next/image";
import { Progress } from "../ui/progress";
import { UserContext } from "@/app/_context/userContext";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Calendar, Mail, User, Award, Badge } from "lucide-react";
import Link from "next/link";

function Profile({ children }: any) {
  const user = useUser();
  const userData = useContext(UserContext);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              User Profile
            </DialogTitle>
            <DialogDescription>
              <motion.div variants={itemVariants} className="space-y-6">
                {/* Profile Header */}
                <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-100/50 dark:bg-gray-800/50">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="relative"
                  >
                    <Image
                      src={user?.profileImageUrl || "/souvik.png"}
                      alt="Profile"
                      width={80}
                      height={80}
                      className="rounded-full border-4 border-white dark:border-gray-700 shadow-lg"
                    />
                    <motion.div
                      className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                  </motion.div>
                  <div>
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {user?.displayName || "User"}
                    </h1>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <Mail size={16} />
                      <span>{user?.primaryEmail}</span>
                    </div>
                  </div>
                </div>

                {/* Credits Section */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-medium text-gray-900 dark:text-white">
                      Credits
                      <p className="text-gray-500 text-lg"> {userData?.userData?.credits || 0} / 50,000</p>
                    </h2>
                  </div>
                  <Progress
                    value={(userData?.userData?.credits / 50000) * 100}
                    className="h-3 bg-gray-200 dark:bg-gray-700"
                    style={{
                      background: `linear-gradient(to right, #3b82f6 ${Math.min(
                        (userData?.userData?.credits / 50000) * 100,
                        100
                      )}%, #e5e7eb ${Math.min(
                        (userData?.userData?.credits / 50000) * 100,
                        100
                      )}%)`,
                    }}
                  />
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  variants={itemVariants}
                  className="flex justify-end gap-2"
                >
                  <Link href={"/handler/account-settings"}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:bg-blue-50 dark:hover:bg-gray-700"
                  >
                    Edit Profile
                  </Button>
                  </Link>
                  <Link href={"/credits"}>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  >
                    Upgrade Plan
                  </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </DialogDescription>
          </DialogHeader>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}

export default Profile;