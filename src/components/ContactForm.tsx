"use client";

import { Send, Terminal, ChevronDown, Sparkles, ShieldCheck, Activity } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ContactForm({ dict }: { dict: any }) {
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('sending');

        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.get('name'),
                    email: formData.get('email'),
                    project_type: formData.get('project_type'),
                    message: formData.get('message'),
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                form.reset();
            } else {
                setStatus('error');
                console.error('Error:', data.error);
            }
        } catch (error) {
            setStatus('error');
            console.error('Network error:', error);
        }
    };

    return (
        <section id="contact" className="max-w-5xl mx-auto py-24 px-6 relative">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-purple-500/5 blur-[120px] pointer-events-none rounded-full"></div>

            <div className="flex flex-col lg:flex-row gap-16 items-start relative z-10">
                {/* Left Side: Info & Aesthetic */}
                <div className="lg:w-1/3 space-y-8">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 text-cyan-400 border border-cyan-500/20 bg-cyan-500/5 px-4 py-1.5 rounded-full">
                            <Activity className="w-3 h-3 animate-pulse" />
                            <span className="text-[10px] font-mono tracking-[0.2em] font-bold uppercase">{dict.contact.title}</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black font-tech text-white leading-tight uppercase">
                            {dict.cta_banner.title.split(' ')[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">{dict.cta_banner.title.split(' ').slice(1).join(' ')}</span>
                        </h2>
                        <p className="text-zinc-500 font-mono text-xs tracking-wider leading-relaxed border-l-2 border-white/5 pl-6">
                            {dict.contact.subtitle}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 pt-4">
                        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex items-center gap-4 group hover:border-cyan-500/30 transition-colors">
                            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 group-hover:scale-110 transition-transform">
                                <Sparkles className="w-5 h-5 text-cyan-400" />
                            </div>
                            <div>
                                <h4 className="text-[10px] font-bold text-white uppercase tracking-widest">Respuesta Rápida</h4>
                                <p className="text-[9px] text-zinc-600 font-mono tracking-wider">MÁXIMO 24 HORAS</p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex items-center gap-4 group hover:border-purple-500/30 transition-colors">
                            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20 group-hover:scale-110 transition-transform">
                                <ShieldCheck className="w-5 h-5 text-purple-400" />
                            </div>
                            <div>
                                <h4 className="text-[10px] font-bold text-white uppercase tracking-widest">Privacidad Total</h4>
                                <p className="text-[9px] text-zinc-600 font-mono tracking-wider">DATOS ENCRIPTADOS</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Technical Form */}
                <div className="flex-1 w-full">
                    <div className="bg-[#0b0e14] border border-white/10 rounded-2xl overflow-hidden relative group">
                        {/* Terminal Header */}
                        <div className="bg-white/5 px-6 py-3 border-b border-white/10 flex items-center justify-between">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/40"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/40"></div>
                            </div>
                            <div className="text-[9px] font-mono text-zinc-500 tracking-[0.3em] uppercase flex items-center gap-2">
                                <Terminal className="w-3 h-3" />
                                COMMS_CHANNEL_SECURE
                            </div>
                        </div>

                        {/* Grain Texture Overlay */}
                        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

                        <div className="p-8 md:p-12 relative">
                            <AnimatePresence mode="wait">
                                {status === 'success' ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-16 flex flex-col items-center"
                                    >
                                        <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-8 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                                            <Send className="w-8 h-8 text-emerald-500" />
                                        </div>
                                        <h3 className="text-2xl font-black text-white font-tech mb-3 tracking-widest uppercase">DATOS TRANSMITIDOS</h3>
                                        <p className="text-zinc-500 font-mono text-xs tracking-wider mb-10 max-w-xs uppercase leading-relaxed">
                                            Tu mensaje ha sido encriptado y enviado exitosamente a nuestro núcleo central.
                                        </p>

                                        <button
                                            onClick={() => setStatus('idle')}
                                            className="px-6 py-3 rounded border border-white/10 text-[10px] font-bold text-zinc-400 hover:text-white hover:border-cyan-500/50 transition-all font-mono uppercase tracking-[0.2em]"
                                        >
                                            REINTENTAR COMUNICACIÓN
                                        </button>
                                    </motion.div>
                                ) : status === 'error' ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-16 flex flex-col items-center"
                                    >
                                        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-8 border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.1)]">
                                            <Terminal className="w-8 h-8 text-red-500" />
                                        </div>
                                        <h3 className="text-2xl font-black text-white font-tech mb-3 tracking-widest uppercase">ERROR DE TRANSMISIÓN</h3>
                                        <p className="text-zinc-500 font-mono text-xs tracking-wider mb-10 max-w-xs uppercase leading-relaxed">
                                            No se pudo enviar el mensaje. Por favor verifica tu conexión e intenta de nuevo.
                                        </p>

                                        <button
                                            onClick={() => setStatus('idle')}
                                            className="px-6 py-3 rounded border border-white/10 text-[10px] font-bold text-zinc-400 hover:text-white hover:border-red-500/50 transition-all font-mono uppercase tracking-[0.2em]"
                                        >
                                            REINTENTAR ENVÍO
                                        </button>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="group relative">
                                                <label className="text-[9px] font-mono font-bold text-zinc-500 mb-3 block tracking-[0.2em] group-focus-within:text-cyan-400 transition-colors uppercase">
                                                    {dict.contact.form.name}
                                                </label>
                                                <input
                                                    required
                                                    name="name"
                                                    type="text"
                                                    className="w-full bg-white/[0.02] border border-white/10 rounded-lg p-4 text-sm text-white focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-500/[0.02] transition-all placeholder:text-zinc-800 font-mono"
                                                    placeholder="IDENTIDAD REQUERIDA"
                                                />
                                                <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-cyan-400 group-focus-within:w-full transition-all duration-500 shadow-[0_0_8px_rgba(34,211,238,0.5)]"></div>
                                            </div>

                                            <div className="group relative">
                                                <label className="text-[9px] font-mono font-bold text-zinc-500 mb-3 block tracking-[0.2em] group-focus-within:text-purple-400 transition-colors uppercase">
                                                    {dict.contact.form.email}
                                                </label>
                                                <input
                                                    required
                                                    name="email"
                                                    type="email"
                                                    className="w-full bg-white/[0.02] border border-white/10 rounded-lg p-4 text-sm text-white focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/[0.02] transition-all placeholder:text-zinc-800 font-mono"
                                                    placeholder="CANAL_DE_RESPUESTA@EMAIL.COM"
                                                />
                                                <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-purple-400 group-focus-within:w-full transition-all duration-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]"></div>
                                            </div>
                                        </div>

                                        <div className="group relative">
                                            <label className="text-[9px] font-mono font-bold text-zinc-500 mb-3 block tracking-[0.2em] group-focus-within:text-cyan-400 transition-colors uppercase">
                                                {dict.contact.form.type}
                                            </label>
                                            <div className="relative">
                                                <select name="project_type" className="w-full bg-white/[0.02] border border-white/10 rounded-lg p-4 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-all appearance-none cursor-pointer font-mono uppercase tracking-wider">
                                                    <option className="bg-[#0b0e14] text-white">Aplicación Móvil</option>
                                                    <option className="bg-[#0b0e14] text-white">Plataforma Web</option>
                                                    <option className="bg-[#0b0e14] text-white">E-Commerce</option>
                                                    <option className="bg-[#0b0e14] text-white">Sitio Corporativo</option>
                                                    <option className="bg-[#0b0e14] text-white">Otro_Específicos</option>
                                                </select>
                                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 pointer-events-none group-hover:text-cyan-400 transition-colors" />
                                            </div>
                                        </div>

                                        <div className="group relative">
                                            <label className="text-[9px] font-mono font-bold text-zinc-500 mb-3 block tracking-[0.2em] group-focus-within:text-emerald-400 transition-colors uppercase">
                                                {dict.contact.form.message}
                                            </label>
                                            <textarea
                                                required
                                                name="message"
                                                className="w-full bg-white/[0.02] border border-white/10 rounded-lg p-5 text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/[0.02] transition-all resize-none min-h-[160px] placeholder:text-zinc-800 font-mono"
                                                placeholder="DESCRIBE_TU_VISIÓN_AQUÍ..."
                                            ></textarea>
                                            <div className="absolute bottom-4 left-4 text-[8px] font-mono text-zinc-800 tracking-tighter">
                                                LOG_BUFFER_ACTIVE
                                            </div>
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.98 }}
                                            disabled={status === 'sending'}
                                            className="w-full relative overflow-hidden bg-white text-black font-tech font-bold py-5 rounded-lg flex items-center justify-center gap-4 transition-all duration-300 hover:tracking-[0.3em] hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed uppercase text-xs tracking-[0.2em]"
                                        >
                                            {status === 'sending' ? (
                                                <span className="flex items-center gap-2">
                                                    <Activity className="w-4 h-4 animate-spin text-black" />
                                                    PROCESANDO_TRANSMISIÓN
                                                </span>
                                            ) : (
                                                <>
                                                    {dict.contact.form.submit}
                                                    <Send className="w-4 h-4" />
                                                </>
                                            )}
                                        </motion.button>

                                        <div className="flex justify-between items-center px-1">
                                            <span className="text-[7px] font-mono text-zinc-800 tracking-[0.5em] uppercase">Security Level: High</span>
                                            <span className="text-[7px] font-mono text-zinc-800 tracking-[0.5em] uppercase">E2E_Encrypted_Protocol</span>
                                        </div>
                                    </form>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
