"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Play, Maximize2 } from "lucide-react";
import Image from "next/image";

interface ShowcaseCardProps {
    title: string;
    description: string;
    image: string;
    demoVideo?: string;
    embedUrl?: string;
    tags: string[];
    techStack: string[];
    link?: string;
    aspectRatio?: "video" | "square" | "portrait";
}

export function ShowcaseCard({
    title,
    description,
    image,
    demoVideo,
    embedUrl,
    tags,
    techStack,
    link,
    aspectRatio = "video"
}: ShowcaseCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => { document.body.style.overflow = "auto"; };
    }, [isOpen]);

    // Aspect ratio mapping
    const aspectClasses = {
        video: "aspect-video",
        square: "aspect-square",
        portrait: "aspect-[9/16]"
    };

    return (
        <>
            <motion.div
                layoutId={`card-container-${title}`}
                className="relative bg-zinc-900/50 border border-white/5 rounded-3xl overflow-hidden cursor-pointer group"
                onClick={() => setIsOpen(true)}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
            >
                {/* Image Container */}
                <motion.div
                    layoutId={`media-${title}`}
                    className={`relative w-full ${aspectClasses[aspectRatio] || "aspect-video"} overflow-hidden bg-zinc-900`}
                >
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 flex items-center gap-2 text-sm font-medium">
                            <Maximize2 size={16} />
                            <span>Ver Detalles</span>
                        </div>
                    </div>
                </motion.div>

                {/* Content - Compact View */}
                <div className="p-5">
                    <motion.h3
                        layoutId={`title-${title}`}
                        className="text-lg font-bold text-white mb-2"
                    >
                        {title}
                    </motion.h3>
                    <p className="text-zinc-400 text-sm line-clamp-2 mb-4">{description}</p>

                    <div className="flex flex-wrap gap-2">
                        {tags.slice(0, 2).map((tag, i) => (
                            <span key={i} className="text-[10px] uppercase font-mono tracking-wider bg-white/5 px-2 py-1 rounded text-zinc-300">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* EXPANDED MODAL VIEW */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                        />

                        {/* Expanded Card */}
                        <motion.div
                            layoutId={`card-container-${title}`}
                            className="relative w-full max-w-5xl bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 z-50 p-2 bg-black/50 backdrop-blur-md rounded-full text-white/70 hover:text-white hover:bg-black/70 transition-all"
                            >
                                <X size={20} />
                            </button>

                            {/* Left Side: Media */}
                            <motion.div
                                layoutId={`media-${title}`}
                                className={`relative w-full md:w-2/3 bg-black flex items-center justify-center ${demoVideo || embedUrl ? "" : "p-8"}`}
                            >
                                {embedUrl ? (
                                    <div className="w-full h-full relative aspect-video bg-black/50 flex flex-col items-center justify-center gap-6 p-8 text-center group/launch">
                                        {/* Background Image with Blur */}
                                        <div className="absolute inset-0 opacity-30 blur-sm">
                                            <Image
                                                src={image}
                                                alt={title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        <h3 className="relative text-2xl font-bold text-white z-10 max-w-md">
                                            Interactúa con el prototipo en pantalla completa
                                        </h3>

                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                window.open(embedUrl, 'StitchPrototype', 'toolbar=0,location=0,menubar=0,width=1400,height=900');
                                            }}
                                            className="relative z-10 flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform cursor-pointer"
                                        >
                                            <Play className="fill-black" size={20} />
                                            Lanzar Simulador
                                        </button>

                                        <p className="relative z-10 text-zinc-400 text-sm">
                                            Se abrirá en una ventana independiente
                                        </p>
                                    </div>
                                ) : demoVideo ? (
                                    <div className="w-full h-full relative aspect-video bg-black">
                                        <video
                                            src={demoVideo}
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                ) : (
                                    <div className="relative w-full h-full min-h-[400px]">
                                        <Image
                                            src={image}
                                            alt={title}
                                            fill
                                            className="object-contain"
                                            priority
                                        />
                                    </div>
                                )}
                            </motion.div>

                            {/* Right Side: Details */}
                            <div className="w-full md:w-1/3 p-8 flex flex-col bg-zinc-900/50 backdrop-blur-sm border-l border-white/5 overflow-y-auto">
                                <motion.h3
                                    layoutId={`title-${title}`}
                                    className="text-3xl font-bold text-white mb-4 leading-tight"
                                >
                                    {title}
                                </motion.h3>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-xs font-mono uppercase text-zinc-500 mb-2 tracking-widest">Sobre el proyecto</h4>
                                        <p className="text-zinc-300 leading-relaxed text-sm">
                                            {description}
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-xs font-mono uppercase text-zinc-500 mb-2 tracking-widest">Tecnologías</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {techStack.map((tech, i) => (
                                                <span key={i} className="px-3 py-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg text-xs font-semibold">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-xs font-mono uppercase text-zinc-500 mb-2 tracking-widest">Categoría</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {tags.map((tag, i) => (
                                                <span key={i} className="px-3 py-1 bg-white/5 text-zinc-300 border border-white/5 rounded text-xs">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {link && link !== "#" && (
                                        <div className="pt-4 mt-auto">
                                            <a
                                                href={link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center gap-2 w-full bg-white text-black py-4 rounded-xl font-bold hover:bg-zinc-200 transition-colors"
                                            >
                                                Visitar Sitio <ExternalLink size={18} />
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
