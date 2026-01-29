"use client";

import { motion } from "framer-motion";
import { ExternalLink, Code2, Cpu, Globe, X } from "lucide-react";
import { TextScramble } from "./TextScramble";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import Image from "next/image";

interface ProjectCardProps {
    title: string;
    description: string;
    image: string;
    video?: string;
    tags: string[];
    link?: string;
    techStack: string[];
    clientId: string;
    imageFit?: "cover" | "contain";
    demoVideo?: string;
    aspectRatio?: string;
}

export function ProjectCard({
    title,
    description,
    image,
    video,
    tags,
    link,
    techStack,
    clientId,
    imageFit = "cover",
    demoVideo,
    aspectRatio = "aspect-[16/10]"
}: ProjectCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isModalOpen]);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                className="group relative bg-[#0a0c10]/60 backdrop-blur-md border border-white/[0.03] rounded-[2rem] overflow-hidden hover:border-cyan-500/20 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
            >
                {/* Handcrafted Grain & Grit */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

                {/* Technical Metadata Cluster - Top Left */}
                <div className="absolute top-5 left-6 z-30 flex flex-col gap-0.5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <span className="text-[7px] font-mono text-cyan-500/50 uppercase tracking-[0.25em]">Deployment_Sequence</span>
                    <span className="text-[9px] font-mono text-white/30 leading-none">ID-{clientId.split('-')[1] || clientId} // STABLE</span>
                </div>

                {/* Media Area */}
                <div
                    className={`relative ${aspectRatio} overflow-hidden cursor-zoom-in`}
                    onClick={() => setIsModalOpen(true)}
                >
                    <Image
                        src={image}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className={`${imageFit === "contain" ? "object-contain" : "object-cover"} transition-all duration-1000 group-hover:scale-105 group-hover:rotate-1 opacity-70 group-hover:opacity-30 grayscale-[0.2] group-hover:grayscale-0`}
                    />

                    {video && (
                        <video
                            src={video}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${isHovered ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-110 -rotate-1'}`}
                        />
                    )}

                    {/* Subtle Glow Overlay */}
                    <div className={`absolute inset-0 bg-cyan-500/[0.03] transition-opacity duration-1000 ${isHovered ? 'opacity-100' : 'opacity-0'} pointer-events-none z-10`}></div>

                    {/* Vignette Overlay */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#02040a] via-transparent to-[#02040a]/40 opacity-90"></div>

                    {/* Tech Stack Overlay (Bottom Left) */}
                    <div className="absolute bottom-4 left-4 flex gap-2 z-20">
                        {techStack.map((tech, i) => (
                            <span key={i} className="px-2 py-0.5 bg-black/60 backdrop-blur-md border border-white/10 rounded text-[9px] font-mono text-cyan-400">
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* External Link Overlay */}
                    {link && (
                        <motion.a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                            className="absolute top-4 right-4 p-2 bg-cyan-500 text-black rounded-lg shadow-lg hover:bg-cyan-400 transition-colors z-20"
                        >
                            <ExternalLink size={16} />
                        </motion.a>
                    )}
                </div>

                {/* Content Area */}
                <div className="p-8 relative z-10">
                    <div className="flex items-center gap-4 mb-5">
                        <div className="h-[1px] w-6 bg-zinc-800 group-hover:w-10 group-hover:bg-cyan-500 transition-all duration-700"></div>
                        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-[0.4em]">CASO_DE_ESTUDIO</span>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-all duration-500 font-tech uppercase tracking-wide">
                        <TextScramble text={title} triggerOnHover duration={0.8} />
                    </h3>

                    <p className="text-zinc-500 text-sm font-light leading-relaxed mb-10 line-clamp-3 group-hover:text-zinc-400 transition-colors">
                        {description}
                    </p>

                    {/* Status / Tags Footer */}
                    <div className="flex items-center justify-between border-t border-white/5 pt-4">
                        <div className="flex gap-3">
                            {tags.map((tag, i) => (
                                <span key={i} className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest flex items-center gap-1.5">
                                    <span className="w-1 h-1 rounded-full bg-zinc-800"></span>
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-500/70">
                            <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
                            DEPLOYED
                        </div>
                    </div>
                </div>

                {/* Decorative Corner */}
                <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none overflow-hidden">
                    <div className="absolute bottom-[-1px] right-[-1px] w-full h-full bg-gradient-to-tl from-cyan-500/20 to-transparent border-r border-b border-cyan-500/50"></div>
                </div>
            </motion.div>

            {/* Image Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsModalOpen(false)}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-10 cursor-zoom-out"
                    >
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[110]"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsModalOpen(false);
                            }}
                        >
                            <X size={32} />
                        </motion.button>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-6xl aspect-video h-[80vh] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0a0c10]"
                        >
                            {demoVideo ? (
                                <video
                                    src={demoVideo}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <Image
                                    src={image}
                                    alt={title}
                                    fill
                                    priority
                                    className="object-contain"
                                />
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
