"use client";

import { motion } from "framer-motion";
import { Activity, Zap, Shield, Cpu } from "lucide-react";
import { useEffect, useState } from "react";

export function SystemStatus() {
    const [stats, setStats] = useState({
        latency: 4,
        load: 12,
        activeThreads: 128
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setStats({
                latency: Math.floor(Math.random() * 3) + 3,
                load: Math.floor(Math.random() * 5) + 10,
                activeThreads: 120 + Math.floor(Math.random() * 20)
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="hidden xl:flex flex-col gap-4 relative pointer-events-none select-none"
        >
            {/* Connection Node */}
            <div className="flex items-center gap-4">
                <div className="relative">
                    <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                    <div className="absolute inset-0 w-3 h-3 bg-cyan-500 rounded-full animate-ping opacity-50"></div>
                </div>
                <div className="h-[1px] w-12 bg-gradient-to-r from-cyan-500 to-transparent"></div>
                <span className="text-[10px] font-mono text-cyan-500 tracking-[0.3em] uppercase whitespace-nowrap">
                    Live_Connection_Established
                </span>
            </div>

            {/* Metrics Glass Card */}
            <div className="bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-xl p-4 flex flex-col gap-4 min-w-[200px] shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <div className="flex items-center gap-2">
                        <Activity className="w-3 h-3 text-purple-500" />
                        <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Neural_Sync</span>
                    </div>
                    <span className="text-[9px] font-mono text-purple-400">99.9%</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <span className="text-[8px] font-mono text-zinc-500 uppercase">Latency</span>
                        <div className="flex items-end gap-1">
                            <span className="text-sm font-bold text-white font-tech">{stats.latency}</span>
                            <span className="text-[8px] font-mono text-zinc-600 mb-0.5">ms</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[8px] font-mono text-zinc-500 uppercase">Neural_Load</span>
                        <div className="flex items-end gap-1">
                            <span className="text-sm font-bold text-white font-tech">{stats.load}</span>
                            <span className="text-[8px] font-mono text-zinc-600 mb-0.5">%</span>
                        </div>
                    </div>
                </div>

                {/* Animated Waveform */}
                <div className="h-4 flex items-end gap-0.5 overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-1 bg-cyan-500/30 rounded-full"
                            animate={{
                                height: [
                                    Math.random() * 10 + 2,
                                    Math.random() * 16 + 2,
                                    Math.random() * 10 + 2
                                ]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.05
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Quick Access Pills */}
            <div className="flex flex-col gap-2">
                {[
                    { icon: Zap, label: "Core_Power", value: "Optimal", color: "text-amber-500" },
                    { icon: Shield, label: "Encryption", value: "AES-512", color: "text-emerald-500" },
                    { icon: Cpu, label: "Node_Status", value: "Online", color: "text-cyan-500" }
                ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white/[0.01] hover:bg-white/[0.03] transition-colors border border-white/5 rounded-full px-3 py-1.5 w-fit">
                        <item.icon className={`w-2.5 h-2.5 ${item.color}`} />
                        <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">{item.label}</span>
                        <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
                        <span className={`text-[8px] font-mono ${item.color} uppercase`}>{item.value}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
