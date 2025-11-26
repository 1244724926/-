import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ChevronLeft, User, Phone } from 'lucide-react';

interface PhotoShowcaseProps {
  caption: string;
}

const VisaSmsContent = () => (
  <div className="w-full h-full bg-[#f2f2f7] font-sans flex flex-col text-left">
    {/* iOS Style Header */}
    <div className="bg-[#f9f9f9] border-b border-gray-300 pt-12 pb-3 px-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center text-blue-500 space-x-1">
        <ChevronLeft size={24} />
        <span className="text-lg bg-blue-500 text-white rounded-full px-2 text-xs py-0.5 min-w-[20px] text-center">15</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white mb-1">
          <User size={24} fill="white" />
        </div>
        <span className="text-[10px] text-gray-500">10691971000000172516 &gt;</span>
      </div>
      <div className="w-8"></div> {/* Spacer for balance */}
    </div>

    {/* Messages Area */}
    <div className="flex-1 p-4 space-y-6 overflow-hidden">
      
      {/* First Message */}
      <div className="flex flex-col items-start max-w-[85%]">
        <div className="bg-[#e5e5ea] p-3 rounded-2xl rounded-tl-sm text-black text-sm leading-relaxed">
          <p>韩国签证申请中心_大使馆正在进行审查。</p>
          <p>进行现状查询可在大使馆网站查询。</p>
          <p>- 申请者名 : SIHAN CHEN</p>
        </div>
      </div>

      {/* Timestamp */}
      <div className="text-center">
         <span className="text-xs text-gray-400">今天 16:11</span>
      </div>

      {/* Second Message (The Highlight) */}
      <div className="flex flex-col items-start max-w-[90%]">
        <div className="bg-[#e5e5ea] p-4 rounded-2xl rounded-tl-sm text-black text-sm leading-relaxed shadow-sm">
          <p className="font-bold mb-1">【北京尚签因私出入境服务】北京韩国签证申请中心_材料审查完毕，已到签证申请中心。</p>
          <p>- 申请者名 : SIHAN CHEN</p>
          <p className="mt-2">您的护照已经送至北京签证中心，请前往北京签证中心领取您的护照，若您已经申请快递方式领取，我们将尽快为您安排寄送。</p>
        </div>
      </div>

    </div>

    {/* Input Area (Visual only) */}
    <div className="bg-[#f9f9f9] px-4 py-3 border-t border-gray-300 flex items-center space-x-3">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
            <span className="text-xl">+</span>
        </div>
        <div className="flex-1 h-8 bg-white border border-gray-300 rounded-full px-3 flex items-center">
            <span className="text-gray-300 text-sm">信息 · 短信</span>
        </div>
        <div className="text-gray-400">
             <div className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center">
                <div className="w-0.5 h-3 bg-gray-400 rounded-full"></div>
             </div>
        </div>
    </div>
  </div>
);

const PhotoShowcase: React.FC<PhotoShowcaseProps> = ({ caption }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="w-full max-w-sm mx-auto my-12 relative group perspective-1000">
      
      {/* Decorative Frame Elements */}
      <div className="absolute -inset-4 bg-gradient-to-r from-rose-200 to-pink-200 rounded-[3rem] blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
      
      <motion.div 
        className="relative bg-black rounded-[2.5rem] shadow-2xl overflow-hidden border-[8px] border-gray-900 ring-1 ring-gray-700"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-20"></div>

        {/* Image Area Container */}
        <div 
          ref={containerRef}
          className="relative w-full aspect-[9/19.5] bg-gray-100 cursor-none overflow-hidden rounded-[2rem]"
          onMouseMove={handleMouseMove}
        >
            {/* Layer 1: Blurred/Hidden State */}
            <div className="absolute inset-0 w-full h-full filter blur-[2px] grayscale-[60%] brightness-[0.9] opacity-70 select-none pointer-events-none">
                <VisaSmsContent />
            </div>
            
            {/* Layer 2: Spotlight/Revealed State */}
            <div 
            className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none"
            style={{
                clipPath: `circle(100px at ${mousePos.x}px ${mousePos.y}px)`,
                transition: 'clip-path 0.08s ease-out'
            }}
            >
                <div className="w-full h-full filter contrast-105 brightness-105">
                    <VisaSmsContent />
                </div>
            </div>

            {/* Spotlight Ring */}
            <div 
                className="absolute pointer-events-none rounded-full border border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.3)] mix-blend-overlay"
                style={{
                    width: '200px',
                    height: '200px',
                    left: mousePos.x - 100,
                    top: mousePos.y - 100,
                    transition: 'left 0.08s ease-out, top 0.08s ease-out'
                }}
            />

            {/* Instruction Hint */}
            <motion.div 
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 3, duration: 1 }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-black/60 text-white text-[10px] px-3 py-1 rounded-full pointer-events-none backdrop-blur-md whitespace-nowrap z-30"
            >
            Move to read message
            </motion.div>
        </div>
      </motion.div>

      {/* Caption Section */}
      <motion.div 
        className="mt-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="inline-flex items-center space-x-2 text-rose-600 mb-3">
            <Sparkles size={16} className="animate-pulse" />
            <span className="uppercase tracking-widest text-xs font-semibold">Ready for Departure</span>
            <Sparkles size={16} className="animate-pulse" />
        </div>
        <h2 className="text-3xl font-cursive text-gray-800 leading-relaxed drop-shadow-sm px-4">
          {caption}
        </h2>
      </motion.div>
    </div>
  );
};

export default PhotoShowcase;