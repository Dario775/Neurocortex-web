import { Locale } from "../../../i18n-config";
import { getDictionary } from "../../../get-dictionary";
import { Sidebar } from "../../../components/Sidebar";
import { TopBar } from "../../../components/TopBar";
import { ProjectCard } from "../../../components/ProjectCard";
import { DataStreamBackground } from "../../../components/DataStreamBackground";
import { Reveal } from "../../../components/Reveal";
import { TextScramble } from "../../../components/TextScramble";
import { TechnicalOverlays } from "../../../components/TechnicalOverlays";
import { Globe, Shield, Zap, Database } from "lucide-react";

export default async function WebDevelopmentPage({
    params,
}: {
    params: Promise<{ lang: Locale }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    const projects = [
        {
            title: "Logitas: Optimización de Logística",
            description: "Mejoramos la eficiencia de una red de transporte europea. Logramos reducir los tiempos de entrega en un 22% mediante un sistema inteligente que analiza el tráfico en tiempo real.",
            image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2070",
            video: "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-at-night-23512-large.mp4",
            tags: ["Logística", "Eficiencia"],
            techStack: ["React", "Go", "Cloud"],
            clientId: "LOG-028",
            link: "#"
        },
        {
            title: "Vortex: Banca Digital Moderna",
            description: "Desarrollamos la plataforma principal para un nuevo banco digital. Nos enfocamos en crear un sistema de inversión fácil de usar y con los más altos estándares de seguridad actuales.",
            image: "https://images.unsplash.com/photo-1611974714851-48206139d73e?auto=format&fit=crop&q=80&w=2070",
            video: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-circuit-board-1542-large.mp4",
            tags: ["Finanzas", "Seguridad"],
            techStack: ["Next.js", "Rust", "Base de Datos"],
            clientId: "VTX-882",
            link: "#"
        },
        {
            title: "Aether: Tienda de Lujo 3D",
            description: "Creamos una experiencia de compra única para una marca de relojes premium. Los clientes pueden ver cada detalle del producto en 3D desde su navegador, tal como si lo tuvieran en sus manos.",
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1999",
            video: "https://assets.mixkit.co/videos/preview/mixkit-abstract-movement-of-digital-lights-9336-large.mp4",
            tags: ["E-commerce", "Diseño 3D"],
            techStack: ["Three.js", "Next.js"],
            clientId: "ATH-441",
            link: "#"
        }
    ];

    return (
        <div className="flex min-h-screen bg-[#02040a] text-white font-sans selection:bg-cyan-500/30">
            <TechnicalOverlays />
            <Sidebar dict={dict} />

            <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
                <TopBar dict={dict} />

                <main className="flex-1 mt-16 px-4 md:px-8 lg:px-12 pt-12 pb-24 relative overflow-hidden">
                    <DataStreamBackground />

                    {/* Header Section */}
                    <div className="relative z-10 mb-12 md:mb-20">
                        <Reveal>
                            <span className="text-cyan-400 font-mono text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.5em] uppercase mb-3 md:mb-4 block">
                                {dict.web_dev?.subtitle || "ARCHIVE / PROJECTS_LIST_v2.0"}
                            </span>
                            <h1 className="text-4xl md:text-7xl font-tech font-black uppercase mb-4 md:mb-6 leading-none">
                                <TextScramble text={dict.web_dev?.title || "Desarrollo Web"} />
                            </h1>
                            <p className="text-zinc-500 max-w-2xl font-mono text-xs md:text-sm leading-relaxed mb-8 md:mb-12">
                                {dict.web_dev?.description || "Sistemas robustos, interfaces que enamoran y código de alto rendimiento."}
                            </p>
                        </Reveal>

                        {/* Metrics Bar */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 border-y border-white/5 py-6 md:py-8 max-w-4xl">
                            <Reveal delay={0.1}>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-cyan-500">
                                        <Zap size={14} />
                                        <span className="text-xs font-mono font-bold uppercase">Performance</span>
                                    </div>
                                    <p className="text-2xl font-tech tracking-tighter">99/100</p>
                                </div>
                            </Reveal>
                            <Reveal delay={0.2}>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-purple-500">
                                        <Shield size={14} />
                                        <span className="text-xs font-mono font-bold uppercase">Security</span>
                                    </div>
                                    <p className="text-2xl font-tech tracking-tighter">Military Grade</p>
                                </div>
                            </Reveal>
                            <Reveal delay={0.3}>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-emerald-500">
                                        <Database size={14} />
                                        <span className="text-xs font-mono font-bold uppercase">Scalability</span>
                                    </div>
                                    <p className="text-2xl font-tech tracking-tighter">Unlimited</p>
                                </div>
                            </Reveal>
                            <Reveal delay={0.4}>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-pink-500">
                                        <Globe size={14} />
                                        <span className="text-xs font-mono font-bold uppercase">Global Reach</span>
                                    </div>
                                    <p className="text-2xl font-tech tracking-tighter">Edge Ready</p>
                                </div>
                            </Reveal>
                        </div>
                    </div>

                    {/* Project Grid - Asymmetric Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
                        {projects.map((project, index) => (
                            <Reveal
                                key={index}
                                delay={index * 0.15}
                                className={index === 0 ? "lg:col-span-12" : "lg:col-span-6"}
                            >
                                <ProjectCard {...project} />
                            </Reveal>
                        ))}
                    </div>

                    {/* Technical Footer Decoration */}
                    <div className="mt-20 md:32 border-t border-dashed border-zinc-800 pt-8 md:pt-12 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                        <div className="flex flex-wrap justify-center md:justify-start items-center gap-6 md:gap-12 text-center md:text-left">
                            <div className="text-[9px] md:text-[10px] font-mono leading-tight">
                                <span className="text-zinc-600 block uppercase tracking-widest mb-1">System_Kernel</span>
                                <span className="text-zinc-400 font-bold">v2.4.0-STABLE</span>
                            </div>
                            <div className="text-[9px] md:text-[10px] font-mono leading-tight">
                                <span className="text-zinc-600 block uppercase tracking-widest mb-1">Encryption_Layer</span>
                                <span className="text-zinc-400 font-bold">AES-256 GCM</span>
                            </div>
                        </div>
                        <div className="flex gap-3 md:gap-4">
                            <div className="w-8 md:w-12 h-[1px] bg-zinc-800"></div>
                            <div className="w-8 md:w-12 h-[1px] bg-zinc-800"></div>
                            <div className="w-8 md:w-12 h-[1px] bg-zinc-800"></div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
