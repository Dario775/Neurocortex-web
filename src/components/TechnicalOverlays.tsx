"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function TechnicalOverlays() {
    const [coords, setCoords] = useState({ x: "34.6037 S", y: "58.3816 W" });

    // Simulate changing coordinates sutilmente
    useEffect(() => {
        const interval = setInterval(() => {
            const randomOffset = () => (Math.random() * 0.001).toFixed(4);
            setCoords({
                x: `${(34.6037 + Math.random() * 0.005).toFixed(4)} S`,
                y: `${(58.3816 + Math.random() * 0.005).toFixed(4)} W`,
            });
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
            {/* Global Scanline Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,3px_100%]"></div>

            {/* Moving Scanline */}
            <motion.div
                initial={{ y: "-100%" }}
                animate={{ y: "100%" }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 h-[100px] bg-gradient-to-b from-transparent via-cyan-500/[0.03] to-transparent"
            />

            {/* Corner Markers (Calibration Grids) */}
            <div className="absolute top-10 left-10 w-20 h-20 border-t border-l border-white/5 opacity-40">
                <div className="absolute top-0 left-0 w-2 h-2 bg-cyan-500/20"></div>
                <span className="absolute top-0 left-4 text-[7px] font-mono text-zinc-700 tracking-[0.3em] uppercase">Ref_001</span>
            </div>

            <div className="absolute top-10 right-10 w-20 h-20 border-t border-r border-white/5 opacity-40">
                <div className="absolute top-0 right-0 w-2 h-2 bg-purple-500/20"></div>
                <span className="absolute top-0 right-4 text-[7px] font-mono text-zinc-700 tracking-[0.3em] uppercase">Auth_Ver</span>
            </div>

            <div className="absolute bottom-10 left-10 w-20 h-20 border-b border-l border-white/5 opacity-40">
                <span className="absolute bottom-0 left-4 text-[7px] font-mono text-zinc-700 tracking-[0.3em] uppercase">Node_ {coords.x}</span>
            </div>

            <div className="absolute bottom-10 right-10 w-20 h-20 border-b border-r border-white/5 opacity-40">
                <span className="absolute bottom-0 right-4 text-[7px] font-mono text-zinc-700 tracking-[0.3em] uppercase">Loc_ {coords.y}</span>
            </div>

            {/* Vertical Legend Labels */}
            <div className="absolute top-1/2 left-6 -translate-y-1/2 flex flex-col gap-32 opacity-20 hidden xxl:flex">
                <span className="text-[7px] font-mono text-zinc-600 rotate-90 tracking-[0.5em] uppercase">Data_Stream_Link</span>
                <span className="text-[7px] font-mono text-zinc-600 rotate-90 tracking-[0.5em] uppercase">Encryption_Active</span>
            </div>

            {/* Subtle Center Crosshair (Visible but very faint) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 opacity-5">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white"></div>
                <div className="absolute left-1/2 top-0 w-[1px] h-full bg-white"></div>
            </div>

            {/* Floating Bits Label */}
            <div className="absolute top-[20%] right-[10%] opacity-10 hidden xl:block">
                <div className="flex flex-col gap-1 font-mono text-[7px] text-zinc-500">
                    <span>{">"} SYSTEM_VOLTAGE: 1.24V</span>
                    <span>{">"} NEURAL_SYNC: OPTIMAL</span>
                    <span>{">"} BUFFER_STATE: CLEAR</span>
                </div>
            </div>
        </div>
    );
}
