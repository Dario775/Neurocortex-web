"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

// Neural Network Paths - Very subtle white lines
function NeuralPaths() {
    const [nodes, setNodes] = useState<Array<{ x: number; y: number; id: string }>>([])
    const [connections, setConnections] = useState<Array<{ id: string; d: string; delay: number }>>([])

    useEffect(() => {
        const generatedNodes = Array.from({ length: 35 }, (_, i) => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            id: `node-${i}`
        }))

        const generatedConnections: Array<{ id: string; d: string; delay: number }> = []
        generatedNodes.forEach((node, i) => {
            const nearbyNodes = generatedNodes.filter((other, j) => {
                if (i === j) return false
                const distance = Math.sqrt(Math.pow(node.x - other.x, 2) + Math.pow(node.y - other.y, 2))
                return distance < 20 && Math.random() > 0.6
            })

            nearbyNodes.forEach(target => {
                generatedConnections.push({
                    id: `conn-${i}-${target.id}`,
                    d: `M${node.x},${node.y} L${target.x},${target.y}`,
                    delay: Math.random() * 10
                })
            })
        })

        setNodes(generatedNodes)
        setConnections(generatedConnections)
    }, [])

    return (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            {connections.map((conn) => (
                <motion.path
                    key={conn.id}
                    d={conn.d}
                    stroke="rgba(255,255,255,0.22)"
                    strokeWidth="0.1"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                        pathLength: [0, 1, 0],
                        opacity: [0, 0.22, 0]
                    }}
                    transition={{
                        duration: 8,
                        delay: conn.delay,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            ))}
            {nodes.map((node) => (
                <motion.circle
                    key={node.id}
                    cx={node.x}
                    cy={node.y}
                    r="0.25"
                    fill="rgba(255,255,255,0.22)"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                        scale: [0, 1, 1.2, 1],
                        opacity: [0, 0.22, 0.28, 0.22]
                    }}
                    transition={{
                        duration: 5,
                        delay: Math.random() * 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </svg>
    )
}

// Geometric Grid Paths - Ultra subtle
function GeometricPaths() {
    const [paths, setPaths] = useState<Array<{ id: string; d: string; delay: number }>>([])

    useEffect(() => {
        const gridSize = 12
        const generatedPaths = []

        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
                if (Math.random() > 0.7) {
                    generatedPaths.push({
                        id: `grid-${x}-${y}`,
                        d: `M${x * gridSize},${y * gridSize} L${(x + 1) * gridSize},${y * gridSize} L${(x + 1) * gridSize},${(y + 1) * gridSize} L${x * gridSize},${(y + 1) * gridSize} Z`,
                        delay: Math.random() * 6,
                    })
                }
            }
        }
        setPaths(generatedPaths)
    }, [])

    return (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            {paths.map((path) => (
                <motion.path
                    key={path.id}
                    d={path.d}
                    fill="none"
                    stroke="rgba(255,255,255,0.22)"
                    strokeWidth="0.1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                        pathLength: [0, 1, 0],
                        opacity: [0, 0.22, 0],
                    }}
                    transition={{
                        duration: 10,
                        delay: path.delay,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </svg>
    )
}

// Flow Paths - Delicate flowing lines
function FlowPaths() {
    const flowPaths = Array.from({ length: 6 }, (_, i) => {
        const offset = i * 15
        return {
            id: `flow-${i}`,
            d: `M-10,${15 + offset} Q30,${15 + offset - 8} 60,${15 + offset} T110,${15 + offset}`,
            delay: i * 0.8
        }
    })

    return (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            {flowPaths.map((path) => (
                <motion.path
                    key={path.id}
                    d={path.d}
                    fill="none"
                    stroke="rgba(255,255,255,0.22)"
                    strokeWidth="0.12"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                        pathLength: [0, 1, 0.8, 0],
                        opacity: [0, 0.22, 0.18, 0]
                    }}
                    transition={{
                        duration: 14,
                        delay: path.delay,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </svg>
    )
}

interface HeroBackgroundProps {
    className?: string
}

export function HeroBackground({ className = "" }: HeroBackgroundProps) {
    const [currentPattern, setCurrentPattern] = useState(0)
    const patterns = ['neural', 'geometric', 'flow']

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPattern((prev) => (prev + 1) % patterns.length)
        }, 12000)
        return () => clearInterval(interval)
    }, [patterns.length])

    const renderPattern = () => {
        switch (currentPattern) {
            case 0: return <NeuralPaths />
            case 1: return <GeometricPaths />
            case 2: return <FlowPaths />
            default: return <NeuralPaths />
        }
    }

    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            {/* Pattern Container */}
            <motion.div
                key={currentPattern}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 3 }}
                className="absolute inset-0"
            >
                {renderPattern()}
            </motion.div>

            {/* Very subtle gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#02040a] via-transparent to-[#02040a] opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#02040a] via-transparent to-[#02040a] opacity-30" />

            {/* Subtle floating orbs */}
            <motion.div
                className="absolute top-1/4 right-1/4 w-48 h-48 bg-purple-900/5 rounded-full blur-3xl"
                animate={{
                    y: [0, -20, 0],
                    x: [0, 15, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-1/3 left-1/4 w-56 h-56 bg-cyan-900/5 rounded-full blur-3xl"
                animate={{
                    y: [0, 15, 0],
                    x: [0, -10, 0],
                    scale: [1, 0.95, 1],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            />
        </div>
    )
}
