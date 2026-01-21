"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent, ReactNode, useState } from "react";
import { VideoBackground } from "./VideoBackground";
import Link from "next/link";

interface BentoCardProps {
    icon: ReactNode;
    title: string;
    desc: string;
    specs?: string[];
    action: string;
    tag?: string;
    className?: string;
    videoUrl?: string;
    href?: string;
}

export function BentoCard({ icon, title, desc, specs, action, tag, className = "", videoUrl, href }: BentoCardProps) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        let { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    const CardContent = (
        <>
            {videoUrl && <VideoBackground src={videoUrl} isActive={isHovered} />}
            {/* Interactive Spotlight Effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            450px circle at ${mouseX}px ${mouseY}px,
                            rgba(168, 85, 247, 0.15),
                            transparent 80%
                        )
                    `,
                }}
            />

            {tag && (
                <div className="absolute top-6 right-6 text-[9px] font-mono text-cyan-400 bg-cyan-950/20 px-3 py-1 rounded-full border border-cyan-500/20 tracking-widest uppercase pointer-events-none">
                    {tag}
                </div>
            )}

            <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center mb-8 ring-1 ring-white/10 group-hover:ring-purple-500/30 transition-all group-hover:scale-110 duration-500 pointer-events-none">
                {icon}
            </div>

            <div className="flex-1 pointer-events-none">
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-200 transition-colors font-tech uppercase tracking-wider">
                    {title}
                </h3>

                <p className="text-sm text-zinc-500 leading-relaxed mb-8 max-w-md">
                    {desc}
                </p>

                {specs && (
                    <div className="flex flex-wrap gap-4 mb-8 text-[10px] font-mono text-zinc-600 border-t border-white/5 pt-6">
                        {specs.map((s, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <span className="w-1 h-1 bg-purple-500 rounded-full"></span>
                                {s}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="mt-auto pointer-events-none">
                <div className="text-[10px] font-bold tracking-[0.3em] text-zinc-400 uppercase group-hover:text-white transition-all cursor-pointer flex items-center gap-3 font-mono">
                    {action}
                    <div className="w-6 h-[1px] bg-zinc-800 group-hover:w-10 group-hover:bg-purple-500 transition-all duration-500"></div>
                </div>
            </div>
        </>
    );

    if (href) {
        return (
            <Link
                href={href}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`group relative flex flex-col h-full rounded-2xl border border-white/5 bg-[#0b0e14] p-8 transition-all hover:border-purple-500/50 active:scale-[0.98] overflow-hidden ${className}`}
            >
                {CardContent}
            </Link>
        );
    }

    return (
        <div
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`group relative flex flex-col h-full rounded-2xl border border-white/5 bg-[#0b0e14] p-8 transition-all hover:border-purple-500/50 overflow-hidden ${className}`}
        >
            {CardContent}
        </div>
    );
}
