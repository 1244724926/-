import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart } from 'lucide-react';
import CustomCursor from './components/CustomCursor';
import PhotoShowcase from './components/PhotoShowcase';

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const yBackground = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacityHero = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-rose-50 relative overflow-hidden">
      {/* Background Ambience */}
      <motion.div 
        style={{ y: yBackground }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-rose-200 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-float" />
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-pink-200 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-purple-200 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-float" style={{ animationDelay: '4s' }} />
      </motion.div>

      <CustomCursor />

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen py-20 px-4">
        
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16 relative"
          style={{ opacity: opacityHero }}
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="mb-8 inline-block"
            >
                <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center mx-auto text-rose-500 animate-pulse-slow">
                    <Heart fill="currentColor" size={32} />
                </div>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-gray-800 mb-6 tracking-tight">
              <span className="block mb-2 text-rose-400 font-cursive text-5xl md:text-7xl">
                我永远都
              </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-purple-600">
                陪着你哦
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 font-light font-sans tracking-widest uppercase">
              宝宝 ～
            </p>
        </motion.div>

        {/* Interactive Image Section */}
        <section className="w-full">
            <PhotoShowcase caption="韩国见 宝贝 撒浪嘿哟" />
        </section>

        {/* Footer Decoration */}
        <footer className="mt-20 text-center text-rose-300 text-sm font-sans space-y-2">
            <div className="flex justify-center space-x-4">
                <span className="w-1 h-1 bg-rose-300 rounded-full"></span>
                <span className="w-1 h-1 bg-rose-300 rounded-full"></span>
                <span className="w-1 h-1 bg-rose-300 rounded-full"></span>
            </div>
            <p>Made with Love</p>
        </footer>

      </main>
    </div>
  );
};

export default App;
