"use client";

import { useEffect, useRef, useState } from "react";

interface VideoBackgroundProps {
    src: string;
    className?: string;
    isActive: boolean;
}

export function VideoBackground({ src, className = "", isActive }: VideoBackgroundProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            if (isActive) {
                videoRef.current.play().catch(() => {
                    // Autoplay might be blocked by browser until interaction
                });
            } else {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
        }
    }, [isActive]);

    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-1000 ${isActive ? "opacity-20" : "opacity-0"} ${className}`}>
            <video
                ref={videoRef}
                src={src}
                loop
                muted
                playsInline
                className="w-full h-full object-cover scale-110 blur-[2px]"
            />
            {/* Overlay to blend better */}
            <div className="absolute inset-0 bg-[#0b0e14]/60 backdrop-blur-[1px]"></div>
        </div>
    );
}
