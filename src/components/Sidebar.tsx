"use client";

import { Home, Settings, Users, Mail, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { Logo } from "./Logo";
import { motion } from "framer-motion";
import { NeuralNetworkBackground } from "./NeuralNetworkBackground";

interface SidebarProps {
    dict: {
        sidebar: {
            dashboard: string;
            neural_core: string;
            security: string;
            api: string;
            status: {
                core_temp: string;
                neural_load: string;
                stable: string;
            };
        };
    };
}

export function Sidebar({ dict }: SidebarProps) {
    const pathname = usePathname();
    const params = useParams();
    const lang = params?.lang || 'es';

    const menuItems = [
        { icon: Home, label: dict.sidebar.dashboard, href: `/${lang}/#hero`, id: "01" },
        { icon: Settings, label: dict.sidebar.neural_core, href: `/${lang}/#services`, id: "02" },
        { icon: Users, label: dict.sidebar.security, href: `/${lang}/#network`, id: "03" },
        { icon: Mail, label: dict.sidebar.api, href: `/${lang}/#contact`, id: "04" },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-[#02040a] border-r border-white/5 flex-col z-40 hidden md:flex overflow-hidden">
            {/* Background Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

            {/* Top Glow Decorator */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>

            {/* Logo Section */}
            <div className="p-8 relative">
                <Link href={`/${lang}/`} className="flex items-center gap-4 group">
                    <div className="relative">
                        <div className="absolute -inset-2 bg-purple-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                        <Logo size={40} />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold tracking-[0.2em] text-sm font-tech text-white">
                            NEURO<span className="text-purple-400">CORTEX</span>
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse"></div>
                            <span className="text-[9px] text-zinc-500 font-mono tracking-[0.2em] uppercase">
                                v2.4.0 Stable
                            </span>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Section Tag */}
            <div className="px-8 flex items-center gap-2 mb-4">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
                <span className="text-[8px] font-mono text-zinc-700 tracking-[0.3em] uppercase">Navigation</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-8">
                <ul className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-4 px-4 py-3 rounded-lg text-xs font-mono transition-all duration-300 group relative
                                    ${isActive
                                            ? "bg-white/5 text-white"
                                            : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02]"
                                        }`}
                                >
                                    {/* Active Indicator bar */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTabSidebar"
                                            className="absolute left-0 w-[2px] h-6 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)] rounded-r-full"
                                        />
                                    )}

                                    <div className="relative">
                                        <Icon className={`w-4 h-4 transition-transform duration-500 group-hover:scale-110 ${isActive ? "text-cyan-400" : ""}`} />
                                        {isActive && <div className="absolute inset-0 blur-sm bg-cyan-400/30"></div>}
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="tracking-[0.1em] uppercase">{item.label}</span>
                                        <span className="text-[8px] text-zinc-700 font-mono tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                                            SECURE_ACCESS_0{item.id}
                                        </span>
                                    </div>

                                    <ChevronRight
                                        className={`w-3 h-3 ml-auto opacity-0 -translate-x-2 transition-all duration-500 group-hover:opacity-40 group-hover:translate-x-0 ${isActive ? "opacity-100 text-cyan-400 translate-x-0" : ""}`}
                                    />
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {/* Status Visualization */}
                <div className="px-4 space-y-6">
                    <div className="space-y-3">
                        <div className="flex justify-between text-[8px] font-mono text-zinc-600 uppercase tracking-widest">
                            <span>Core Integrity</span>
                            <span className="text-emerald-500">98%</span>
                        </div>
                        <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "98%" }}
                                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                            />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Footer / Node ID Card */}
            <div className="mt-auto p-6 border-t border-white/5 bg-white/[0.01] relative overflow-hidden group">
                {/* Neural Network Background in Sidebar Footer */}
                <div className="absolute inset-0 opacity-40 group-hover:opacity-70 transition-opacity duration-700">
                    <NeuralNetworkBackground />
                </div>

                <div className="bg-zinc-900/40 backdrop-blur-md rounded-xl p-4 border border-white/5 relative z-10 overflow-hidden group/card hover:border-cyan-500/30 transition-colors">
                    <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-cyan-500/5 blur-2xl rounded-full group-hover/card:bg-cyan-500/10 transition-colors"></div>

                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                            <div className="w-4 h-4 rounded-sm border-[1px] border-cyan-500/50 animate-pulse"></div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-tech text-white tracking-widest uppercase">Node Access</span>
                            <span className="text-[8px] font-mono text-zinc-600 uppercase">Status: AUTHORIZED</span>
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex flex-col gap-1.5 px-1 relative z-10">
                    <div className="flex justify-between text-[7px] font-mono text-zinc-700 tracking-[0.2em] uppercase">
                        <span>{dict.sidebar.status.core_temp}</span>
                        <span className="text-emerald-800">Optimal</span>
                    </div>
                    <div className="flex justify-between text-[7px] font-mono text-zinc-700 tracking-[0.2em] uppercase">
                        <span>Neuro Link</span>
                        <span className="text-cyan-800">Active</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}
