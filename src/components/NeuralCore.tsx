"use client";

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Cpu, Share2, Zap, Shield } from "lucide-react";
import { useEffect, useState } from "react";

export function NeuralCore() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring configuration for smooth motion
    const springConfig = { damping: 20, stiffness: 150 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXRelative = (e.clientX - rect.left) / width - 0.5;
        const mouseYRelative = (e.clientY - rect.top) / height - 0.5;

        mouseX.set(mouseXRelative);
        mouseY.set(mouseYRelative);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <div
            className="hidden xl:flex relative w-[500px] h-[500px] items-center justify-center perspective-1000 group cursor-crosshair"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Ambient Background Glows */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute -inset-10 bg-cyan-500/5 rounded-full blur-[80px] animate-[pulse_4s_ease-in-out_infinite]"></div>

            {/* Main Interactive Container */}
            <motion.div
                style={{
                    rotateX: rotateX,
                    rotateY: rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="relative w-full h-full flex items-center justify-center transition-all duration-500 group-hover:scale-105"
            >
                {/* Rotating Tech Rings */}
                <div className="absolute inset-0 border-[1px] border-white/[0.03] rounded-full animate-[spin_25s_linear_infinite]"></div>
                <div className="absolute inset-10 border-[1.5px] border-cyan-500/10 rounded-full animate-[spin_20s_linear_infinite_reverse] border-dashed"></div>
                <div className="absolute inset-20 border-[1px] border-purple-500/10 rounded-full animate-[spin_15s_linear_infinite]"></div>

                {/* Floating Orbiting Icons */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 z-10"
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 bg-zinc-900 border border-white/10 rounded-lg text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                        <Share2 className="w-4 h-4" />
                    </div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 p-2 bg-zinc-900 border border-white/10 rounded-lg text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                        <Zap className="w-4 h-4" />
                    </div>
                </motion.div>

                {/* Central CPU Core */}
                <div className="relative z-20 w-48 h-48 bg-zinc-900/60 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 flex items-center justify-center shadow-2xl group-hover:border-cyan-500/50 transition-colors duration-1000">
                    {/* Inner Core Glow */}
                    <div className="absolute inset-4 bg-gradient-to-br from-cyan-600/10 to-purple-600/10 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

                    {/* Pulsing Light Bar */}
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>

                    <Cpu className="w-20 h-20 text-white group-hover:text-cyan-400 transition-all duration-700 relative z-10" />

                    {/* Status Info (Ghost) */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-zinc-950 border border-white/10 rounded-full flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-[7px] font-mono text-zinc-500 tracking-[0.2em] uppercase">Core_Verified</span>
                    </div>
                </div>

                {/* Data Ripples (Motion) */}
                <AnimatePresence>
                    {[1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 2, opacity: 0 }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: i * 1,
                                ease: "easeOut"
                            }}
                            className="absolute inset-0 border border-cyan-500/20 rounded-full pointer-events-none"
                        />
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
