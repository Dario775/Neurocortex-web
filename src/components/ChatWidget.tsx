"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, User, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedBotIcon } from "./AnimatedBotIcon";

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Array<{ role: 'user' | 'bot', content: string }>>([
        { role: 'bot', content: 'Iniciando sistema... ¿En qué puedo ayudarte hoy con tu proyecto?' }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setInput("");
        setIsTyping(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMsg,
                    history: messages.slice(-5).filter(m => m.role !== 'bot' || !m.content.startsWith('Iniciando'))
                })
            });

            const data = await response.json();

            if (data.error) throw new Error(data.error);

            setMessages(prev => [...prev, {
                role: 'bot',
                content: data.text || "Hubo un error en la transmisión. Intenta de nuevo."
            }]);

        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, {
                role: 'bot',
                content: "Error de conexión con la API de IA. Verifica tu configuración o intenta más tarde."
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="mb-4 w-[350px] md:w-[380px] h-[550px] bg-[#02040a]/95 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_0_50px_-10px_rgba(0,240,255,0.2)] flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-white/10 bg-white/[0.03] flex items-center justify-between relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 pointer-events-none"></div>
                            <div className="flex items-center gap-3 relative z-10">
                                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center relative overflow-hidden">
                                    <Bot className="w-5 h-5 text-cyan-400" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-white font-tech tracking-wider uppercase">Neuro Assistant</h3>
                                    <div className="flex items-center gap-1.5 leading-none">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                                        <span className="text-[9px] text-emerald-500/80 font-mono tracking-widest">SYSTEM ONLINE</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-zinc-500 hover:text-white transition-colors relative z-10 p-1 hover:bg-white/5 rounded-lg"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div
                            className="flex-1 overflow-y-auto p-4 space-y-6 scroll-lock-isolation relative"
                            data-lenis-prevent
                        >
                            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''} relative z-10`}
                                >
                                    <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center mt-1 border ${msg.role === 'user' ? 'bg-purple-500/10 border-purple-500/30 text-purple-400' : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'}`}>
                                        {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                    </div>
                                    <div className={`
                                        p-3 rounded-xl text-sm max-w-[85%] leading-relaxed relative overflow-hidden group
                                        ${msg.role === 'user'
                                            ? 'bg-purple-600/15 border border-purple-500/30 text-purple-50 shadow-[0_4px_12px_rgba(168,85,247,0.1)] rounded-tr-none'
                                            : 'bg-zinc-900/40 backdrop-blur-md border border-white/10 text-zinc-200 shadow-[0_4px_12px_rgba(34,211,238,0.05)] rounded-tl-none'}
                                    `}>
                                        <div className={`absolute top-0 ${msg.role === 'user' ? 'right-0' : 'left-0'} w-1 h-1 bg-white/20`}></div>
                                        <div className="relative z-10">{msg.content}</div>
                                        <div className={`mt-2 text-[7px] font-mono ${msg.role === 'user' ? 'text-purple-400/50' : 'text-cyan-400/50'} uppercase tracking-[0.2em] border-t border-white/5 pt-1.5`}>
                                            {msg.role === 'user' ? 'SOURCE: AUTH_CLIENT' : 'NEURO_CORE_LOG_0' + (idx + 1)}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex gap-3 relative z-10"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mt-1">
                                        <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" />
                                    </div>
                                    <div className="bg-zinc-900/40 backdrop-blur-sm border border-white/10 px-4 py-3 rounded-xl rounded-tl-none flex gap-1.5 items-center">
                                        <motion.div
                                            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 1, 0.3] }}
                                            transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                                            className="w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                                        />
                                        <motion.div
                                            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 1, 0.3] }}
                                            transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                                            className="w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                                        />
                                        <motion.div
                                            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 1, 0.3] }}
                                            transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                                            className="w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                                        />
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-black/40 backdrop-blur-md">
                            <div className="relative group">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Escribe tu consulta..."
                                    className="w-full bg-zinc-900/50 border border-white/10 rounded-xl pl-5 pr-12 py-3.5 text-sm text-white focus:outline-none focus:border-cyan-500/50 shadow-inner transition-all focus:shadow-[0_0_25px_-5px_rgba(0,240,255,0.15)] placeholder:text-zinc-600"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim()}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-gradient-to-tr from-cyan-600 to-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] rounded-lg flex items-center justify-center text-white transition-all disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                                >
                                    <Send className="w-4 h-4 ml-0.5" />
                                </button>
                            </div>
                            <div className="mt-2.5 flex items-center justify-between px-1">
                                <p className="text-[7px] text-zinc-600 font-mono uppercase tracking-[0.2em]">Neurocortex Interface v2.4</p>
                                <div className="flex gap-1">
                                    <div className="w-1 h-1 rounded-full bg-cyan-500/20"></div>
                                    <div className="w-1 h-1 rounded-full bg-cyan-500/20"></div>
                                    <div className="w-1 h-1 rounded-full bg-cyan-500/20"></div>
                                </div>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative flex items-center justify-center transition-all duration-300 z-50 bg-transparent border-none outline-none cursor-pointer"
                style={{ width: "80px", height: "80px" }}
            >
                {isOpen ? (
                    <motion.div
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="w-14 h-14 rounded-2xl bg-[#0f121b] border border-white/10 flex items-center justify-center text-white shadow-[0_0_30px_-5px_rgba(0,240,255,0.4)] backdrop-blur-xl group hover:border-cyan-500/50"
                    >
                        <X className="w-6 h-6 group-hover:text-cyan-400 transition-colors" />
                    </motion.div>
                ) : (
                    <div className="relative drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                        <AnimatedBotIcon className="w-20 h-20" />
                    </div>
                )}
            </motion.button>
        </div>
    );
}
