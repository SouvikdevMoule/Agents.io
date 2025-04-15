'use client'; // Required for client-side GSAP animations

import { Button } from '@/components/ui/button';
import { UserButton } from '@stackframe/stack';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { Expertlist } from '@/services/Option';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import Header from '@/components/main/Header';

export default function LandingPage() {
  // GSAP animations
  useEffect(() => {
    // Hero section
    gsap.fromTo(
      '.hero-content',
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
    );

    // Services cards
    gsap.fromTo(
      '.service-card',
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.25, ease: 'power3.out' }
    );

    // Features
    gsap.fromTo(
      '.feature-item',
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'back.out(1.7)' }
    );

    // Testimonials
    gsap.fromTo(
      '.testimonial-card',
      { x: -150, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, stagger: 0.3, ease: 'power3.out' }
    );

    // FAQ
    gsap.fromTo(
      '.faq-item',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
    );
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-futura">
      {/* Header */}
      <header className="flex justify-between items-center  bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-md sticky top- U z-20 border-b border-blue-500/20">
      <Header/>
      </header>

      {/* Hero Section */}
      <section
        className="relative text-center py-32 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1709502230748-61c00a2ae8f8?q=80&w=2560&auto=format&fit=crop')`, // Futuristic cityscape
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="hero-content relative z-10">
          <h2 className="text-5xl md:text-7xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">
            Learn the Future, Today
          </h2>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-gray-200">
            Master any topic with AI-driven lectures, immersive interviews, and holographic Q&A. Your journey starts now.
          </p>
          <Button
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-10 py-5 text-lg rounded-full hover:from-blue-600 hover:to-purple-600 glow"
            onMouseEnter={(e) =>
              gsap.to(e.currentTarget, { scale: 1.15, duration: 0.3, ease: 'power3.out' })
            }
            onMouseLeave={(e) =>
              gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: 'power3.out' })
            }
          >
            Launch Learning
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900 max-w-7xl mx-auto px-4">
        <h3 className="text-4xl font-bold text-center mb-12 text-blue-400">Why LearnSphere?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'AI-Powered Content',
              desc: 'Customized learning paths driven by advanced AI.',
              icon: '/lecture.png', // AI neural network
            },
            {
              title: 'Holographic Mentors',
              desc: 'Engage with virtual experts in immersive sessions.',
              icon: '/meditation.png', // Futuristic hologram
            },
            {
              title: 'Quantum Learning',
              desc: 'Interactive formats for rapid skill mastery.',
              icon: '/languages.png', // Quantum tech
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="feature-item bg-gray-900/50 backdrop-blur-md rounded-xl p-6 border border-blue-500/30"
            >
              <Image
                src={feature.icon}
                alt={feature.title}
                width={80}
                height={80}
                className="mx-auto mb-4 rounded-lg"
              />
              <h4 className="text-2xl font-semibold mb-2 text-blue-300">{feature.title}</h4>
              <p className="text-gray-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 bg-black">
        <h3 className="text-4xl font-bold text-center mb-12 text-purple-400">Our Services</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Expertlist.map((expert: any, index: any) => (
            <div
              key={index}
              className="service-card bg-gradient-to-br from-gray-900 to-blue-900/50 backdrop-blur-md rounded-xl p-6 border border-purple-500/30 glow-card"
              onMouseEnter={(e) =>
                gsap.to(e.currentTarget, {
                  scale: 1.08,
                  rotate: 3,
                  duration: 0.4,
                  ease: 'power3.out',
                })
              }
              onMouseLeave={(e) =>
                gsap.to(e.currentTarget, {
                  scale: 1,
                  rotate: 0,
                  duration: 0.4,
                  ease: 'power3.out',
                })
              }
            >
              <div className="flex items-center mb-4">
                <Image
                  src={expert.icon}
                  alt={expert.name}
                  width={50}
                  height={50}
                  className="mr-4 rounded-full"
                />
                <h4 className="text-2xl font-semibold text-purple-300">{expert.name}</h4>
              </div>
              <p className="text-gray-300 mb-6">{getServiceDescription(expert.name)}</p>
              <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 glow">
                Engage Now
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        className="py-20 max-w-7xl mx-auto px-4 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1553342385-111fd6b6ab5b?q=80&w=2560&auto=format&fit=crop')`, // Futuristic tech background
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <h3 className="text-4xl font-bold text-center mb-12 text-blue-400 relative z-10">
          Voices from the Future
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {[
            {
              name: 'Nova Quinn',
              feedback: 'Mock interviews felt like real VR simulations!',
              avatar: '/souvik.png', // Futuristic portrait
            },
            {
              name: 'Zane Holt',
              feedback: 'Lectures are like diving into a sci-fi database.',
              avatar: '/souvik.png', // Futuristic portrait
            },
            {
              name: 'Luna Ray',
              feedback: 'Meditation sessions are pure cosmic calm.',
              avatar: '/souvik.png', // Futuristic portrait
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card bg-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-blue-500/30"
            >
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                width={60}
                height={60}
                className="rounded-full mb-4"
              />
              <p className="text-gray-200 mb-4">"{testimonial.feedback}"</p>
              <p className="font-semibold text-blue-300">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black max-w-7xl mx-auto px-4">
        <h3 className="text-4xl font-bold text-center mb-12 text-pink-400">Neural Queries</h3>
        <div className="space-y-6">
          {[
            {
              question: 'What can I explore?',
              answer: 'Anything—coding, languages, or even cosmic mindfulness.',
            },
            {
              question: 'Is it for newbies?',
              answer: 'Yes! Our AI scales from beginner to galactic expert.',
            },
            {
              question: 'How do I begin?',
              answer: 'Plug in, choose a module, and teleport to learning.',
            },
          ].map((faq, index) => (
            <div
              key={index}
              className="faq-item bg-gray-900/50 backdrop-blur-md rounded-xl p-6 border border-pink-500/30 cursor-pointer"
              onClick={(e) =>
                gsap.to(e.currentTarget, {
                  scale: 1.05,
                  duration: 0.2,
                  yoyo: true,
                  repeat: 1,
                  ease: 'power3.out',
                })
              }
            >
              <h4 className="text-xl font-semibold mb-2 text-pink-300">{faq.question}</h4>
              <p className="text-gray-300">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center bg-gradient-to-r from-blue-900 to-purple-900">
        <h3 className="text-4xl font-bold mb-6 text-blue-400">Ready for the Future?</h3>
        <p className="text-xl max-w-xl mx-auto mb-8 text-gray-200">
          Join the next wave of learners in a universe of knowledge.
        </p>
        <Button
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-10 py-5 text-lg rounded-full hover:from-blue-600 hover:to-purple-600 glow"
          onMouseEnter={(e) =>
            gsap.to(e.currentTarget, { scale: 1.15, duration: 0.3, ease: 'power3.out' })
          }
          onMouseLeave={(e) =>
            gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: 'power3.out' })
          }
        >
          Join Now
        </Button>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-black text-center border-t border-blue-500/20">
        <p className="text-gray-300">© 3025 LearnSphere. All rights reserved.</p>
        <div className="mt-4 flex justify-center space-x-6">
          <a href="#" className="text-blue-400 hover:text-purple-400">
            Privacy Matrix
          </a>
          <a href="#" className="text-blue-400 hover:text-purple-400">
            Terms of Cosmos
          </a>
          <a href="#" className="text-blue-400 hover:text-purple-400">
            Contact Nexus
          </a>
        </div>
      </footer>
    </div>
  );
}

// Helper function for service descriptions
function getServiceDescription(name: any) {
  switch (name) {
    case 'Lecture On Topic':
      return 'Immerse in AI-crafted lectures with holographic examples.';
    case 'Mock Interview':
      return 'Simulate high-stakes interviews with real-time feedback.';
    case 'QNA Session':
      return 'Resolve queries with neural-speed precision.';
    case 'Language Skill':
      return 'Master languages with futuristic fluency modules.';
    case 'Analysis On Topic':
      return 'Dissect topics with quantum clarity and insights.';
    case 'Meditation Session':
      return 'Find cosmic calm in guided neural meditations.';
    default:
      return 'Explore learning reimagined for the future.';
  }
}