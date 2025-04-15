"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Expertavatar } from "@/services/Option";
import { UserButton, useUser } from "@stackframe/stack";
import { useMutation, useQuery } from "convex/react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState, useRef, useContext } from "react";
import { motion } from "framer-motion";
import { AiGeneratedFeedbackAndNotes, AiModel, TextToSpeech } from "@/services/GlobalServices";
import ChatBox from "@/components/room/ChatBox";
import { toast } from "sonner";
import { UserContext } from "@/app/_context/userContext";
import Webcam from "react-webcam";

function Page() {
  const { roomid } = useParams();
  const [feedback, setFeedback] = useState<any>(false);
  const [expert, setExpert] = useState<any>();
  const [coonectaudio, setConnectAudio] = useState(false);
  const [transcripts, setTranscripts] = useState<string[]>([]);
  const [audiourl, setAudiourl] = useState<any>();
  const DiscussionRoom = useQuery(api.DiscussionRoom.GetDiscussionRoom, { id: roomid as any });

  const transcriptContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (transcriptContainerRef.current) {
      transcriptContainerRef.current.scrollTop = transcriptContainerRef.current.scrollHeight;
    }
  }, [transcripts]);

  useEffect(() => {
    if (DiscussionRoom) {
      const Expert = Expertavatar.find((item: any) => item.name === DiscussionRoom?.expertname);
      setExpert(Expert);
    }
  }, [DiscussionRoom]);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const avatarVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.5, type: "spring" } },
    hover: { scale: 1.15, rotate: 10, transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      boxShadow: "0px 6px 20px rgba(59, 130, 246, 0.5)",
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.95 },
  };

  const glowVariants = {
    animate: {
      boxShadow: [
        "0 0 10px rgba(59, 130, 246, 0.5)",
        "0 0 20px rgba(59, 130, 246, 0.7)",
        "0 0 10px rgba(59, 130, 246, 0.5)",
      ],
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
    },
  };


  const recorder = useRef<any>(null);
  const silenceTimeout = useRef<NodeJS.Timeout | null>(null);


  const ConnectToServer = async () => {
    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
      try {
        if (!('webkitSpeechRecognition' in window)) {
          alert("Your browser doesn't support speech recognition. Try Chrome or Edge.");
          return;
        }

        // @ts-ignore
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = async (event: any) => {
          let finalTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              finalTranscript  = event.results[i][0].transcript.trim();

              if (finalTranscript) {
                // Add user's speech to transcripts with a prefix
                setTranscripts(prev => [...prev, `You: ${finalTranscript}`]);
                

                try {
                  const aiRes  = await AiModel({
                    topic: DiscussionRoom?.topic,
                    coachingoption: DiscussionRoom?.coachingoption,
                    text: finalTranscript
                  });

                  try {
                    const url = await TextToSpeech({
                      text: aiRes,
                      expertname: DiscussionRoom?.expertname
                    });
                    setAudiourl(url);
                     setTranscripts(prev => [...prev, `AI: ${aiRes}`]);
                     
                  } catch (error) {
                    console.error("Text-to-speech error:", error);
                    setTranscripts(prev => [...prev, "AI: [Response received but audio failed]"]);
                  }
                } catch (error) {
                  console.error("Error processing AI response:", error);
                  setTranscripts(prev => [...prev, "AI: Sorry, there was an error processing the response."]);
                }
              }
            }
          }
        };

        recognition.onerror = (event: any) => {
          console.error('Speech recognition error', event.error);
          setTranscripts(prev => [...prev, `Error: Speech recognition failed - ${event.error}`]);
        };

        recognition.onend = () => {
          setConnectAudio(false);
        };

        recognition.start();
        setConnectAudio(true);
        recorder.current = recognition;

      } catch (err) {
        console.error("Error accessing speech recognition:", err);
        setTranscripts(prev => [...prev, "Error: Failed to start speech recognition"]);
      }
    }
  };

  // const disconnect = (e: any) => {
  //   e.preventDefault();
  //   if (recorder.current) {
  //     recorder.current.stop();
  //     recorder.current = null;
  //     setConnectAudio(false);
  //     setTranscripts(prev => [...prev, "System: Audio disconnected"]);
  //     UpdateConversation({ id: roomid as any, conversation: transcripts });
  //     setFeedback(true)
  //   }
  // };
    const {userData, setUserData} : any = useContext(UserContext);
    const navigation = useRouter()
    // Import the UpdateUserCredits mutation
const UpdateUserCredits = useMutation(api.users.UpdateUserCredits);

// Inside the Page component, update the disconnect function
const disconnect = async (e: any) => {
  e.preventDefault();
  if (recorder.current) {
    recorder.current.stop();
    recorder.current = null;
    setConnectAudio(false);
    setTranscripts(prev => [...prev, "System: Audio disconnected"]);

    // Calculate the total length of transcripts
    const transcriptLength = transcripts.join("").length;

    try {
      // Update conversation in the database
      await UpdateConversation({ id: roomid as any, conversation: transcripts });

      // Update user credits in the database
      const currentCredits = userData?.credits || 0;
      const newCredits = Math.max(0, currentCredits - transcriptLength); // Prevent negative credits

      await UpdateUserCredits({
        _id: userData._id, // Assuming userData contains the user's _id
        credits: newCredits,
      });

      // Update local userData context
      setUserData((prev: any) => ({
        ...prev,
        credits: newCredits,
      }));

      toast("Credits updated successfully!");
    } catch (error) {
      console.error("Error updating credits or conversation:", error);
      toast("Failed to update credits. Please try again.");
    }

    setFeedback(true);
  }
};


  const UpdateConversation = useMutation(api.DiscussionRoom.UpdateConversation);
  const updateFeedback = useMutation(api.DiscussionRoom.UpdateFeedback);

  const GeneratedFeedbackAndNotes = async () => {
   try{
    const result = await AiGeneratedFeedbackAndNotes({
      coachingoption: DiscussionRoom?.coachingoption,
      conversation: transcripts})
      console.log(result)
      await updateFeedback({ id: roomid as any, feedback: result });
      toast("Feedback and notes generated successfully!");
      navigation.push("/dashboard")
   }
    catch(error){
      console.error("Error generating feedback:", error);
      toast("Failed to generate feedback. Please try again.");
    }
  }


  return (
    <motion.div
      className="flex flex-col gap-6 min-h-screen w-[95%] mx-auto p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <div className="flex flex-col gap-3 sticky top-0 z-10 bg-blue-400 backdrop-blur-md p-4 rounded-xl shadow-sm">
        <motion.h1
          className="text-2xl  font-semibold text-white"
          variants={childVariants}
        >
          {DiscussionRoom?.coachingoption}
        </motion.h1>
        <motion.h2
          className="text-base font-normal text-white flex items-center gap-2"
          variants={childVariants}
        >
          Session with {DiscussionRoom?.expertname}
        </motion.h2>
      </div>

      {/* Main Content Area */}
      <div className="w-full flex-1 flex flex-col lg:flex-row gap-8">
        {/* Expert Section */}
        <motion.div
          className="w-full lg:w-2/3 relative bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl shadow-xl overflow-hidden"
          variants={childVariants}
          whileHover={{ scale: 1.01, boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="flex flex-col justify-center items-center h-full bg-gradient-to-br from-blue-100 to-cyan-100 p-6 border-blue-500 border-2 rounded-2xl">
            {expert && (
              <motion.div
                variants={avatarVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
              >
                <Image
                  src={expert?.icon}
                  alt="Expert Avatar"
                  width={100}
                  height={100}
                  className="rounded-full border-4 border-white shadow-2xl h-[80px] w-[80px] sm:h-[100px] sm:w-[100px]"
                />
              </motion.div>
            )}
            <motion.p
              className="mt-8 text-xl sm:text-2xl font-bold text-gray-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.6, duration: 0.5 } }}
            >
              {DiscussionRoom?.expertname}
            </motion.p>
            <p className="text-sm text-gray-500 mt-2">Certified Expert</p>
          </div>

          <motion.div
            className="w-[30%] sm:w-[20%] bg-white h-32 sm:h-40 absolute flex flex-col justify-center items-center bottom-6 right-6 rounded-2xl shadow-lg border border-gray-50"
            variants={glowVariants}
            animate="animate"
          >
            <UserButton />
            <p className="text-sm text-gray-600 mt-4 font-medium">You</p>
          </motion.div>
        </motion.div>

        {/* Chat Section */}
        <motion.div
          className="w-full lg:w-1.1/3  backdrop-blur-md shadow-xl bg-blue-200 border-2 border-blue-400 rounded-2xl flex flex-col p-6 max-h-[70vh]"
          variants={childVariants}
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex-1 overflow-y-auto">
            <ChatBox conversation={transcripts} />
          </div>
          <audio
            src={audiourl}
            autoPlay
            controls
            className="mt-4 w-full rounded-lg"
          />
        </motion.div>
      </div>

      {/* Transcription Display Section */}
      {/* <motion.div
    className="w-full min-h-[20vh] max-h-[30vh] rounded-2xl shadow-xl bg-gradient-to-r from-blue-600 to-cyan-600 p-6 overflow-y-auto"
    variants={childVariants}
  >
    <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">
      Live Conversation Transcript
    </h3>
    {transcripts.length > 0 ? (
      <div className="flex flex-col gap-3">
        {transcripts.map((text, index) => (
          <motion.p
            key={index}
            className="text-white/90 text-sm sm:text-base bg-white/10 p-3 rounded-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            {text}
          </motion.p>
        ))}
      </div>
    ) : (
      <p className="text-white/70 italic text-sm sm:text-base">
        No transcripts yet. Start speaking after connecting audio.
      </p>
    )}
  </motion.div> */}

      {/* Footer Section */}
      <motion.div
        className="w-full flex flex-col lg:flex-row gap-6 justify-between items-center py-6"
        variants={childVariants}
      >
        <div className="w-full lg:w-3/4 flex justify-center items-center">
          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
            {coonectaudio ? (
              <Button
                onClick={disconnect}
                className="bg-red-500 hover:bg-red-600 text-white rounded-full px-6 py-3 text-base font-semibold transition-all duration-300"
              >
                Disconnect
              </Button>
            ) : (
              <Button
                onClick={ConnectToServer}
                className="bg-sky-600 hover:bg-sky-700 text-white rounded-full px-6 py-3 text-base font-semibold transition-all duration-300"
              >
                Connect to Audio
              </Button>
            )}
          </motion.div>
        </div>
        {feedback ? <Button onClick={GeneratedFeedbackAndNotes}>Generate Feedback/Notes</Button> : <motion.h1
          className="w-full lg:w-1/4 text-gray-600 italic text-sm text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.8, duration: 0.5 } }}
        >
          Post-session, receive personalized feedback and insights.
        </motion.h1>}

      </motion.div>
    </motion.div>

  );
}

export default Page;