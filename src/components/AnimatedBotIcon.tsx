"use client";

import { motion } from "framer-motion";

export function AnimatedBotIcon({ className = "" }: { className?: string }) {
    return (
        <motion.svg
            viewBox="0 0 100 100"
            className={className}
            style={{ overflow: "visible" }}
        >
            {/* Centro principal - Púrpura */}
            <motion.circle
                cx="50"
                cy="50"
                r="14"
                fill="url(#purpleGradient)"
                animate={{
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Anillo del centro */}
            <motion.circle
                cx="50"
                cy="50"
                r="18"
                fill="none"
                stroke="url(#purpleGradient)"
                strokeWidth="2"
                opacity={0.5}
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0.2, 0.5],
                }}
                transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Líneas de conexión */}
            {/* Arriba */}
            <motion.line
                x1="50"
                x2="50"
                stroke="url(#cyanGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ y1: 36, y2: 18 }}
                animate={{ y1: [36, 40, 36], y2: [18, 12, 18] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0 }}
            />

            {/* Arriba derecha */}
            <motion.line
                stroke="url(#cyanGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ x1: 60, y1: 40, x2: 76, y2: 24 }}
                animate={{ x1: [60, 56, 60], y1: [40, 44, 40], x2: [76, 82, 76], y2: [24, 18, 24] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            />

            {/* Derecha */}
            <motion.line
                y1="50"
                y2="50"
                stroke="url(#cyanGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ x1: 64, x2: 82 }}
                animate={{ x1: [64, 60, 64], x2: [82, 88, 82] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />

            {/* Abajo derecha */}
            <motion.line
                stroke="url(#cyanGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ x1: 60, y1: 60, x2: 76, y2: 76 }}
                animate={{ x1: [60, 56, 60], y1: [60, 56, 60], x2: [76, 82, 76], y2: [76, 82, 76] }}
                transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            />

            {/* Abajo */}
            <motion.line
                x1="50"
                x2="50"
                stroke="url(#cyanGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ y1: 64, y2: 82 }}
                animate={{ y1: [64, 60, 64], y2: [82, 88, 82] }}
                transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            />

            {/* Abajo izquierda */}
            <motion.line
                stroke="url(#cyanGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ x1: 40, y1: 60, x2: 24, y2: 76 }}
                animate={{ x1: [40, 44, 40], y1: [60, 56, 60], x2: [24, 18, 24], y2: [76, 82, 76] }}
                transition={{ duration: 2.3, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
            />

            {/* Izquierda */}
            <motion.line
                y1="50"
                y2="50"
                stroke="url(#cyanGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ x1: 36, x2: 18 }}
                animate={{ x1: [36, 40, 36], x2: [18, 12, 18] }}
                transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            />

            {/* Arriba izquierda */}
            <motion.line
                stroke="url(#cyanGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ x1: 40, y1: 40, x2: 24, y2: 24 }}
                animate={{ x1: [40, 44, 40], y1: [40, 44, 40], x2: [24, 18, 24], y2: [24, 18, 24] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.35 }}
            />

            {/* Nodos externos - cada uno con timing independiente */}

            {/* Arriba - Cyan */}
            <motion.circle
                cx="50" r="7"
                fill="url(#cyanGradient)"
                initial={{ cy: 10, scale: 1 }}
                animate={{ cy: [10, 5, 10], scale: [1, 1.15, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0 }}
            />

            {/* Arriba derecha - Purple */}
            <motion.circle
                r="7"
                fill="url(#purpleGradient)"
                initial={{ cx: 82, cy: 18, scale: 1 }}
                animate={{ cx: [82, 88, 82], cy: [18, 12, 18], scale: [1, 1.2, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            />

            {/* Derecha - Cyan */}
            <motion.circle
                cy="50" r="7"
                fill="url(#cyanGradient)"
                initial={{ cx: 90, scale: 1 }}
                animate={{ cx: [90, 96, 90], scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />

            {/* Abajo derecha - Purple */}
            <motion.circle
                r="7"
                fill="url(#purpleGradient)"
                initial={{ cx: 82, cy: 82, scale: 1 }}
                animate={{ cx: [82, 88, 82], cy: [82, 88, 82], scale: [1, 1.15, 1] }}
                transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            />

            {/* Abajo - Cyan */}
            <motion.circle
                cx="50" r="7"
                fill="url(#cyanGradient)"
                initial={{ cy: 90, scale: 1 }}
                animate={{ cy: [90, 96, 90], scale: [1, 1.2, 1] }}
                transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            />

            {/* Abajo izquierda - Purple */}
            <motion.circle
                r="7"
                fill="url(#purpleGradient)"
                initial={{ cx: 18, cy: 82, scale: 1 }}
                animate={{ cx: [18, 12, 18], cy: [82, 88, 82], scale: [1, 1.1, 1] }}
                transition={{ duration: 2.3, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
            />

            {/* Izquierda - Cyan */}
            <motion.circle
                cy="50" r="7"
                fill="url(#cyanGradient)"
                initial={{ cx: 10, scale: 1 }}
                animate={{ cx: [10, 4, 10], scale: [1, 1.15, 1] }}
                transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            />

            {/* Arriba izquierda - Purple */}
            <motion.circle
                r="7"
                fill="url(#purpleGradient)"
                initial={{ cx: 18, cy: 18, scale: 1 }}
                animate={{ cx: [18, 12, 18], cy: [18, 12, 18], scale: [1, 1.2, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.35 }}
            />

            {/* Gradientes */}
            <defs>
                <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#7928ca" />
                </linearGradient>
                <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00f0ff" />
                    <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
            </defs>
        </motion.svg>
    );
}
