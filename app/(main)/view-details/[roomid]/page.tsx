"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Avatar,
  Button,
} from "@nextui-org/react";
import {
  Award,
  Bookmark,
  Clock,
  MessageSquare,
  User,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";

function DiscussionRoomPage() {
  const { roomid } = useParams();
  const discussionRoom = useQuery(api.DiscussionRoom.GetDiscussionRoom, {
    id: roomid as any,
  });
  const [expandedFeedback, setExpandedFeedback] = React.useState<number | null>(
    null
  );

  if (!discussionRoom) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  // Format creation time
  const creationDate = new Date(discussionRoom._creationTime);
  const formattedDate = creationDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Split feedback into sections
  const feedbackSections = (discussionRoom.feedback ?? "")
    .split("\n\n")
    .filter((section) => section.trim());

  const toggleFeedback = (index: number) => {
    setExpandedFeedback(expandedFeedback === index ? null : index);
  };

  // Define a fallback image in case expertname is unexpected
  const getExpertImage = (expertName: string | undefined) => {
    if (!expertName) return "/fallback.png"; // Fallback image
    return expertName === "Eva" ? "/eva.jpeg" : expertName === "Josh" ? "/john.png" : expertName === "Danny" ? "/danny.png" : expertName === "Souvik" ? "/souvik.png" : "/danny.png"; // Add more conditions as needed
  };
  // Utility function to detect and wrap URLs in <a> tags
const renderTextWithLinks = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s<>"']+)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {part}
        </a>
      );
    }
    return <span key={index}>{part}</span>;
  });
};

  return (
<motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full p-8 bg-blue-100"
    >
      {/* Header Section */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-8 text-center"
      >
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            {discussionRoom.topic} Discussion
          </h1>
        </motion.div>
        <motion.div
          className="flex justify-center items-center gap-2 text-default-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Clock className="animate-pulse" />
          <span>{formattedDate}</span>
          <motion.span
            className="flex items-center gap-1 ml-4 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Sparkles size={16} />
            <span>AI Analysis</span>
          </motion.span>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Expert Info */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          className="lg:col-span-1 h-fit"
        >
          <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 relative overflow-hidden">
              <motion.div
                className="absolute -right-10 -top-10 w-32 h-32 bg-blue-400 rounded-full opacity-20"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              <motion.div
                className="absolute -right-5 -bottom-5 w-20 h-20 bg-blue-300 rounded-full opacity-20"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              />
              <div className="flex flex-col items-center text-white relative z-10">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-full overflow-hidden border-4 border-white"
                >
                  <Image
                    src={getExpertImage(discussionRoom.expertname)}
                    alt={`${discussionRoom.expertname}'s profile picture`}
                    className="w-24 h-24 rounded-full z-20"
                    width={96}
                    height={96}
                    isBlurred
                    fallbackSrc="/fallback.png"
                  />
                </motion.div>
                <motion.h2
                  className="text-2xl font-bold"
                  whileHover={{ scale: 1.02 }}
                >
                  {discussionRoom?.expertname || "Unknown Expert"}
                </motion.h2>
                <p className="text-blue-100">AI Expert</p>
              </div>
            </CardHeader>
            <CardBody className="p-6 bg-blue-200">
              <div className="space-y-4">
                <motion.div
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <Award className="text-blue-500 text-xl" />
                  <div>
                    <h3 className="font-semibold">Coaching Option</h3>
                    <p className="text-default-500">
                      {discussionRoom?.coachingoption}
                    </p>
                  </div>
                </motion.div>
                <Divider />
                <motion.div
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <Bookmark className="text-blue-500 text-xl" />
                  <div>
                    <h3 className="font-semibold">Topic</h3>
                    <p className="text-default-500">{discussionRoom?.topic}</p>
                  </div>
                </motion.div>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        {/* Middle Column - Conversation */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring", damping: 10 }}
          className="lg:col-span-2"
        >
          <Card className="shadow-lg h-full hover:shadow-xl transition-shadow duration-300 bg-blue-200">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 p-6">
              <div className="flex items-center gap-2">
                <MessageSquare className="text-white text-xl" />
                <h2 className="text-xl font-bold text-white">Conversation</h2>
              </div>
            </CardHeader>
            <CardBody className="p-6 space-y-6 max-h-[500px] overflow-y-auto">
              <AnimatePresence>
                {discussionRoom?.conversation?.map((message: any, index: any) => {
                  const isUser = message.startsWith("You:");
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: isUser ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: isUser ? 20 : -20 }}
                      transition={{
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 100,
                      }}
                      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                    >
                      <motion.div
                        className={`max-w-[80%] rounded-2xl p-4 ${
                          isUser
                            ? "bg-blue-500 text-white rounded-br-none"
                            : "bg-gray-100 text-default-900 rounded-bl-none"
                        }`}
                        whileHover={{ scale: isUser ? 1.02 : 1.02 }}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {isUser ? (
                            <User className="text-white" />
                          ) : (
                            <Avatar
                              src={`https://ui-avatars.com/api/?name=${discussionRoom?.expertname}&background=random`}
                              className="w-6 h-6"
                            />
                          )}
                          <span className="font-semibold">
                            {isUser ? "You" : discussionRoom.expertname}
                          </span>
                        </div>
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.1 + 0.2 }}
                        >
                          {renderTextWithLinks(message.split(": ")[1] || "")}
                        </motion.p>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </CardBody>
          </Card>
        </motion.div>

        {/* Right Column - Feedback */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 80 }}
          className="lg:col-span-3"
        >
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 p-6">
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.01 }}
              >
                <Sparkles className="text-white" />
                <h2 className="text-xl font-bold text-white">
                  Expert Feedback & Analysis
                </h2>
              </motion.div>
            </CardHeader>
            <CardBody className="p-6">
              <div className="space-y-6">
                {feedbackSections.map((section, index) => {
                  let title = section.split("\n")[0];
                  let content = section.split("\n").slice(1).join("\n");

                  // Special styling for the first section (Key Takeaways)
                  if (index === 0) {
                    return (
                      <motion.div
                        key={index}
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="bg-green-50 p-6 rounded-xl border border-green-200 relative overflow-hidden"
                        whileHover={{ y: -3 }}
                      >
                        <motion.div
                          className="absolute -right-10 -top-10 w-32 h-32 bg-green-300 rounded-full opacity-10"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 6, repeat: Infinity }}
                        />
                        <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                          <Sparkles className="text-green-600" />
                          {renderTextWithLinks(title)}
                        </h3>
                        <p className="text-green-900 whitespace-pre-line">
                          {renderTextWithLinks(content)}
                        </p>
                      </motion.div>
                    );
                  }

                  // Check if section is Pros/Cons/Neutral
                  const isPros = title.includes("Pros:");
                  const isCons = title.includes("Cons:");
                  const isNeutral = title.includes("Neutral/Debated Aspects:");

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className={`p-5 rounded-lg border ${
                        isPros
                          ? "bg-blue-50 border-blue-200 hover:bg-blue-100"
                          : isCons
                          ? "bg-red-50 border-red-200 hover:bg-red-100"
                          : isNeutral
                          ? "bg-purple-50 border-purple-200 hover:bg-purple-100"
                          : "bg-default-50 border-default-200 hover:bg-default-100"
                      } transition-colors duration-200`}
                    >
                      <button
                        className="w-full flex justify-between items-center"
                        onClick={() => toggleFeedback(index)}
                      >
                        <h3
                          className={`font-bold mb-3 text-left flex items-center gap-2 ${
                            isPros
                              ? "text-blue-800"
                              : isCons
                              ? "text-red-800"
                              : isNeutral
                              ? "text-purple-800"
                              : "text-default-800"
                          }`}
                        >
                          {isPros && (
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                          )}
                          {isCons && (
                            <span className="w-2 h-2 rounded-full bg-red-500"></span>
                          )}
                          {isNeutral && (
                            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                          )}
                          {renderTextWithLinks(title)}
                        </h3>
                        {expandedFeedback === index ? (
                          <ChevronUp className="text-default-500" />
                        ) : (
                          <ChevronDown className="text-default-500" />
                        )}
                      </button>

                      <AnimatePresence>
                        {(expandedFeedback === index ||
                          expandedFeedback === null) && (
                          <motion.ul
                            className="space-y-2"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            {content.split("\n- ").map((point, i) =>
                              point.trim() ? (
                                <motion.li
                                  key={i}
                                  className="flex items-start gap-2 py-1"
                                  whileHover={{ x: 5 }}
                                >
                                  <span
                                    className={`mt-1 ${
                                      isPros
                                        ? "text-blue-500"
                                        : isCons
                                        ? "text-red-500"
                                        : isNeutral
                                        ? "text-purple-500"
                                        : "text-default-500"
                                    }`}
                                  >
                                    •
                                  </span>
                                  <span
                                    className={`${
                                      isPros
                                        ? "text-blue-900"
                                        : isCons
                                        ? "text-red-900"
                                        : isNeutral
                                        ? "text-purple-900"
                                        : "text-default-900"
                                    }`}
                                  >
                                    {renderTextWithLinks(point)}
                                  </span>
                                </motion.li>
                              ) : null
                            )}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </CardBody>
            <CardFooter className="bg-green-50 p-6">
              <motion.p
                className="text-green-800 italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                {renderTextWithLinks(
                  `This analysis was generated by ${discussionRoom.expertname} based on your conversation about ${discussionRoom.topic}.`
                )}
              </motion.p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default DiscussionRoomPage;