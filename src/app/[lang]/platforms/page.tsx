import { Locale } from "../../../i18n-config";
import { getDictionary } from "../../../get-dictionary";
import { Sidebar } from "../../../components/Sidebar";
import { TopBar } from "../../../components/TopBar";
import { ProjectCard } from "../../../components/ProjectCard";
import { DataStreamBackground } from "../../../components/DataStreamBackground";
import { Reveal } from "../../../components/Reveal";
import { TextScramble } from "../../../components/TextScramble";
import { TechnicalOverlays } from "../../../components/TechnicalOverlays";
import { Layers, Zap, Shield, Database } from "lucide-react";

export default async function OnlinePlatformsPage({
    params,
}: {
    params: Promise<{ lang: Locale }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    const projects = [
        {
            title: "EduCore: Aula Virtual SaaS",
            description: "Plataforma educativa para colegios y universidades, capaz de manejar miles de alumnos conectados al mismo tiempo sin caídas.",
            image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=1974",
            video: "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-at-night-23512-large.mp4",
            tags: ["Educación", "Escalabilidad"],
            techStack: ["React", "Cloud"],
            clientId: "EDU-772",
            link: "#"
        },
        {
            title: "MarketFlow: Mercado de Ventas",
            description: "Sistema para gestionar ventas automáticas, pagos y envíos para negocios grandes.",
            image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=2070",
            video: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-circuit-board-1542-large.mp4",
            tags: ["Ventas", "Automatización"],
            techStack: ["Node.js", "Redis"],
            clientId: "MKF-441",
            link: "#"
        },
        {
            title: "FinSync: Sistema de Gestión",
            description: "Herramienta completa para manejar las cuentas, facturas y personal de tu empresa en un solo lugar.",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2026",
            video: "https://assets.mixkit.co/videos/preview/mixkit-abstract-movement-of-digital-lights-9336-large.mp4",
            tags: ["Administración", "Finanzas"],
            techStack: ["TypeScript", "Docker"],
            clientId: "FIN-309",
            link: "#"
        }
    ];

    return (
        <div className="flex min-h-screen bg-[#02040a] text-white font-sans selection:bg-emerald-500/30">
            <TechnicalOverlays />
            <Sidebar dict={dict} />

            <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
                <TopBar dict={dict} />

                <main className="flex-1 mt-16 px-4 md:px-8 lg:px-12 pt-12 pb-24 relative overflow-hidden">
                    <DataStreamBackground />

                    {/* Header Section */}
                    <div className="relative z-10 mb-20">
                        <Reveal>
                            <span className="text-emerald-400 font-mono text-[10px] tracking-[0.5em] uppercase mb-4 block">
                                {dict.platforms?.subtitle || "PLATFORM_LAYER / DISTRIBUTED_v2.5"}
                            </span>
                            <h1 className="text-5xl md:text-7xl font-tech font-black uppercase mb-6 leading-none">
                                <TextScramble text={dict.platforms?.title || "Plataformas Online"} />
                            </h1>
                            <p className="text-zinc-500 max-w-2xl font-mono text-sm leading-relaxed mb-12">
                                {dict.platforms?.description || "Infraestructuras digitales de alta disponibilidad. Diseñamos sistemas que no solo funcionan, sino que escalan orgánicamente con tu demanda comercial."}
                            </p>
                        </Reveal>

                        {/* Metrics Bar */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-white/5 py-8 max-w-4xl">
                            <Reveal delay={0.1}>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-emerald-500">
                                        <Zap size={14} />
                                        <span className="text-xs font-mono font-bold uppercase">Uptime Score</span>
                                    </div>
                                    <p className="text-2xl font-tech tracking-tighter">99.99% Guaranteed</p>
                                </div>
                            </Reveal>
                            <Reveal delay={0.2}>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-cyan-500">
                                        <Shield size={14} />
                                        <span className="text-xs font-mono font-bold uppercase">Data Protection</span>
                                    </div>
                                    <p className="text-2xl font-tech tracking-tighter">End-to-End</p>
                                </div>
                            </Reveal>
                            <Reveal delay={0.3}>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-purple-500">
                                        <Database size={14} />
                                        <span className="text-xs font-mono font-bold uppercase">Cloud Engine</span>
                                    </div>
                                    <p className="text-2xl font-tech tracking-tighter">AWS/Google Multi-Region</p>
                                </div>
                            </Reveal>
                            <Reveal delay={0.4}>
                                <div className="space-y-1 text-pink-500">
                                    <div className="flex items-center gap-2">
                                        <Layers size={14} />
                                        <span className="text-xs font-mono font-bold uppercase">API Integration</span>
                                    </div>
                                    <p className="text-2xl font-tech tracking-tighter">Microservices</p>
                                </div>
                            </Reveal>
                        </div>
                    </div>

                    {/* Project Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 relative z-10">
                        {projects.map((project, index) => (
                            <Reveal key={index} delay={index * 0.1}>
                                <ProjectCard {...project} />
                            </Reveal>
                        ))}
                    </div>

                    {/* Technical Footer Decoration */}
                    <div className="mt-32 border-t border-dashed border-zinc-800 pt-12 flex flex-col md:flex-row justify-between items-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                        <div className="flex items-center gap-12">
                            <div className="text-[10px] font-mono leading-tight">
                                <span className="text-zinc-600 block">KUBERNETES_CLUSTER</span>
                                <span className="text-zinc-400">NODE_AUTO_SCALE</span>
                            </div>
                            <div className="text-[10px] font-mono leading-tight">
                                <span className="text-zinc-600 block">TRAFFIC_MANAGEMENT</span>
                                <span className="text-zinc-400">LOAD_BALANCER_L7</span>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-12 h-[1px] bg-zinc-800"></div>
                            <div className="w-12 h-[1px] bg-zinc-800"></div>
                            <div className="w-12 h-[1px] bg-zinc-800"></div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
