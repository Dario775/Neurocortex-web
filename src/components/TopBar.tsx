"use client";

import { ArrowRight, Check, Menu, X, Wifi, Activity, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";

interface TopBarProps {
    dict: {
        nav: {
            system_status: string;
            metrics: {
                sync: string;
                latency: string;
                neurons: string;
            };
            user_info: {
                node_id: string;
                auth: string;
            };
            cta_button: string;
        };
        sidebar: {
            dashboard: string;
            neural_core: string;
            security: string;
            api: string;
        };
    };
}

export function TopBar({ dict }: TopBarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [ping, setPing] = useState(14);
    const pathname = usePathname();
    const router = useRouter();
    const params = useParams();
    const lang = (params?.lang as string) || 'es';

    const languages = [
        { code: 'en', label: 'EN' },
        { code: 'es', label: 'ES' },
        { code: 'pt', label: 'PT' }
    ];

    // Simulate network jitter
    useEffect(() => {
        const interval = setInterval(() => {
            setPing(Math.floor(Math.random() * (18 - 12 + 1)) + 12);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const handleLangChange = (lang: string) => {
        const segments = pathname.split('/');
        segments[1] = lang;
        router.push(segments.join('/'));
        setIsMenuOpen(false);
    };

    return (
        <header className="fixed top-0 left-0 md:left-64 right-0 h-16 bg-[#02040a]/70 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-4 md:px-8 z-50">
            {/* Grain Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

            {/* Bottom Glow */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>

            {/* Mobile Menu Toggle */}
            <div className="flex items-center gap-4 md:hidden relative z-10">
                <button
                    className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors border border-transparent hover:border-white/10"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Stats / Metrics Area (Desktop) */}
            <div className="hidden md:flex items-center gap-10 relative z-10">
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <Activity className="w-3 h-3 text-cyan-400" />
                        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-[0.2em]">{dict.nav.metrics.sync}</span>
                    </div>
                    <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className="text-sm font-bold text-white tracking-widest font-tech">UPTIME 99.9%</span>
                        <span className="text-[8px] font-mono text-emerald-500 opacity-60">STABLE</span>
                    </div>
                </div>

                <div className="h-8 w-[1px] bg-white/5"></div>

                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <Wifi className="w-3 h-3 text-purple-400" />
                        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-[0.2em]">LATENCY MS</span>
                    </div>
                    <div className="flex items-baseline gap-1.5 mt-0.5">
                        <motion.span
                            key={ping}
                            initial={{ opacity: 0.5 }}
                            animate={{ opacity: 1 }}
                            className="text-sm font-bold text-white tracking-widest font-tech"
                        >
                            {ping}MS
                        </motion.span>
                        <div className="flex gap-[1px]">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className={`w-[2px] h-[6px] ${i <= 3 ? 'bg-cyan-500' : 'bg-zinc-800'}`}></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side controls */}
            <div className="flex items-center gap-6 relative z-10">
                {/* Hardware-style Language Switcher */}
                <div className="hidden lg:flex items-center gap-1 bg-zinc-900/50 p-1 rounded-lg border border-white/5">
                    {languages.map((l) => (
                        <button
                            key={l.code}
                            onClick={() => handleLangChange(l.code)}
                            className={`px-3 py-1 rounded-md text-[9px] font-mono transition-all relative overflow-hidden group ${lang === l.code
                                ? "bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                                : "text-zinc-600 hover:text-zinc-300 hover:bg-white/5"
                                }`}
                        >
                            {lang === l.code && (
                                <motion.div layoutId="langSwitch" className="absolute inset-0 bg-white -z-10" />
                            )}
                            {l.label}
                        </button>
                    ))}
                </div>

                <div className="h-8 w-[1px] bg-white/5 hidden md:block"></div>

                {/* Node Status */}
                <div className="hidden md:flex flex-col items-end">
                    <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-[0.2em]">{dict.nav.user_info.node_id} AUTH</span>
                    <div className="flex items-center gap-2 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]"></div>
                        <span className="text-[10px] font-mono text-cyan-400 tracking-wider">SECURE LINK</span>
                    </div>
                </div>

                {/* Primary CTA */}
                <Link
                    href={`/${lang}/#contact`}
                    className="flex items-center gap-3 bg-white text-black px-6 py-2.5 rounded font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-cyan-400 hover:scale-105 transition-all duration-500 shadow-xl group"
                >
                    <Plus className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform duration-500" />
                    <span className="hidden sm:inline">{dict.nav.cta_button}</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-16 left-0 right-0 bg-[#02040a] border-b border-white/10 p-8 md:hidden flex flex-col gap-8 shadow-2xl z-50 backdrop-blur-2xl"
                    >
                        {/* Mobile Metrics */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                                <span className="text-[8px] font-mono text-zinc-500 uppercase block mb-1">Status</span>
                                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">System Online</span>
                            </div>
                            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                                <span className="text-[8px] font-mono text-zinc-500 uppercase block mb-1">Latency</span>
                                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">{ping}ms</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-[0.3em] px-2">Navigation</span>
                            <Link href={`/${lang}/#hero`} className="p-4 text-xs font-mono text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all border border-white/5" onClick={() => setIsMenuOpen(false)}>
                                01 // {dict.sidebar.dashboard.toUpperCase()}
                            </Link>
                            <Link href={`/${lang}/#services`} className="p-4 text-xs font-mono text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all border border-white/5" onClick={() => setIsMenuOpen(false)}>
                                02 // {dict.sidebar.neural_core.toUpperCase()}
                            </Link>
                            <Link href={`/${lang}/web-development`} className="p-4 text-xs font-mono text-zinc-500 hover:text-cyan-400 hover:bg-white/5 rounded-xl transition-all border border-white/5 ml-4" onClick={() => setIsMenuOpen(false)}>
                                -- WEB_DEV
                            </Link>
                            <Link href={`/${lang}/mobile-apps`} className="p-4 text-xs font-mono text-zinc-500 hover:text-cyan-400 hover:bg-white/5 rounded-xl transition-all border border-white/5 ml-4" onClick={() => setIsMenuOpen(false)}>
                                -- MOBILE_APPS
                            </Link>
                            <Link href={`/${lang}/#contact`} className="p-4 text-xs font-mono text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all border border-white/5" onClick={() => setIsMenuOpen(false)}>
                                03 // {dict.sidebar.api.toUpperCase()}
                            </Link>
                        </div>

                        <div className="pt-6 border-t border-white/5">
                            <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-[0.3em] px-2 mb-4 block">Communication Language</span>
                            <div className="flex gap-2">
                                {languages.map((l) => (
                                    <button
                                        key={l.code}
                                        onClick={() => handleLangChange(l.code)}
                                        className={`flex-1 py-3 rounded-lg font-mono text-xs border transition-all ${lang === l.code
                                            ? "bg-cyan-500/10 border-cyan-500/50 text-white shadow-[0_0_20px_rgba(34,211,238,0.1)]"
                                            : "bg-white/5 border-transparent text-zinc-500"
                                            }`}
                                    >
                                        {l.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
