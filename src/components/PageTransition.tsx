"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const shutterVariants: any = {
    initial: {
        scaleY: 0,
    },
    animate: {
        scaleY: 0,
        transition: {
            duration: 0.5,
            ease: "circOut",
        },
    },
    exit: {
        scaleY: 1,
        transition: {
            duration: 0.5,
            ease: "circIn",
        },
    },
};

const contentVariants: any = {
    initial: {
        opacity: 0,
        y: 20,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.5,
            duration: 0.8,
            ease: "easeOut",
        },
    },
};

export function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div key={pathname} className="relative">
                {/* Content Fade In */}
                <motion.div
                    variants={contentVariants}
                    initial="initial"
                    animate="animate"
                >
                    {children}
                </motion.div>

                {/* Shutter Overlays */}
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="fixed inset-0 z-[100] bg-[#0a0a0b] border-x border-white/5 origin-top pointer-events-none"
                        initial={{ scaleY: 1 }}
                        animate={{ scaleY: 0 }}
                        transition={{
                            duration: 0.8,
                            ease: "easeInOut",
                            delay: i * 0.1,
                        }}
                        style={{
                            left: `${i * 20}%`,
                            width: "20.5%",
                        }}
                    />
                ))}

                {/* Technical Loading Label */}
                <motion.div
                    className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] pointer-events-none flex flex-col items-center gap-4"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                >
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-cyan-500 animate-pulse"></div>
                        <span className="text-cyan-400 font-mono text-[10px] tracking-[0.6em] uppercase">
                            Synchronizing_Neural_Link
                        </span>
                    </div>
                    <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
                        <motion.div
                            className="absolute inset-0 bg-cyan-500"
                            initial={{ x: "-100%" }}
                            animate={{ x: "0%" }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                        />
                    </div>
                </motion.div>

                {/* Digital Noise / Scanline on Transition */}
                <motion.div
                    className="fixed inset-0 z-[102] bg-cyan-500/5 mix-blend-overlay pointer-events-none border-t border-cyan-500/20"
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{
                        opacity: [0, 0.2, 0],
                        scaleY: [0, 1, 0]
                    }}
                    transition={{ duration: 0.6 }}
                />
            </motion.div>
        </AnimatePresence>
    );
}
