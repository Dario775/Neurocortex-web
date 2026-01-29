import { Locale } from "../../../i18n-config";
import { getDictionary } from "../../../get-dictionary";
import { Sidebar } from "../../../components/Sidebar";
import { TopBar } from "../../../components/TopBar";
import { ProjectCard } from "../../../components/ProjectCard";
import { ShowcaseCard } from "../../../components/ShowcaseCard";
import { DataStreamBackground } from "../../../components/DataStreamBackground";
import { Reveal } from "../../../components/Reveal";
import { TextScramble } from "../../../components/TextScramble";
import { TechnicalOverlays } from "../../../components/TechnicalOverlays";
import { Smartphone, Zap, Shield, Cpu } from "lucide-react";

export default async function MobileAppsPage({
    params,
}: {
    params: Promise<{ lang: Locale }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    const projects = [
        {
            title: "NeuroFit: Control de Salud",
            description: "Una aplicación móvil que te permite seguir tus métricas de salud en tiempo real de forma fácil y rápida.",
            image: "/projects/neurofit-v3.png",
            tags: ["Salud", "App Nativa"],
            techStack: ["React Native", "Firebase"],
            clientId: "FIT-902",
            link: "#"
        },
        {
            title: "SmartMarket: Compras Inteligentes",
            description: "Tu supermercado en el bolsillo. Escanea productos, acumula puntos y accede a ofertas personalizadas.",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=2070",
            tags: ["Retail", "Fidelización"],
            techStack: ["Flutter", "Node.js"],
            clientId: "MKT-882",
            link: "#"
        },
        {
            title: "FleetNav: Gestión de Rutas",
            description: "Ayudamos a las empresas de transporte a organizar sus recorridos de forma inteligente para ahorrar tiempo y combustible.",
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=2070",
            tags: ["Logística", "Inteligencia Artificial"],
            techStack: ["Swift", "Kotlin"],
            clientId: "LOG-102",
            link: "#"
        }
    ];

    return (
        <div className="flex min-h-screen bg-[#02040a] text-white font-sans selection:bg-purple-500/30">
            <TechnicalOverlays />
            <Sidebar dict={dict} />

            <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
                <TopBar dict={dict} />

                <main className="flex-1 mt-16 px-4 md:px-8 lg:px-12 pt-12 pb-24 relative overflow-hidden">
                    <DataStreamBackground />

                    {/* Header Section */}
                    <div className="relative z-10 mb-12 md:mb-20">
                        <Reveal>
                            <span className="text-purple-400 font-mono text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.5em] uppercase mb-3 md:mb-4 block">
                                {dict.mobile?.subtitle || "MOBILE_SUBSYSTEM / DEPLOYMENTS_v4.0"}
                            </span>
                            <h1 className="text-4xl md:text-7xl font-tech font-black uppercase mb-4 md:mb-6 leading-none">
                                <TextScramble text={dict.mobile?.title || "Apps Móviles"} />
                            </h1>
                            <p className="text-zinc-500 max-w-2xl font-mono text-xs md:text-sm leading-relaxed mb-8 md:mb-12">
                                {dict.mobile?.description || "Experiencias nativas y multiplataforma diseñadas para la máxima fluidez."}
                            </p>
                        </Reveal>

                        {/* Metrics Bar */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 border-y border-white/5 py-6 md:py-8 max-w-4xl">
                            <Reveal delay={0.1}>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-purple-500">
                                        <Zap size={14} />
                                        <span className="text-xs font-mono font-bold uppercase">React Native / Flutter</span>
                                    </div>
                                    <p className="text-2xl font-tech tracking-tighter">Multi-Platform</p>
                                </div>
                            </Reveal>
                            <Reveal delay={0.2}>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-cyan-500">
                                        <Shield size={14} />
                                        <span className="text-xs font-mono font-bold uppercase">Biometric Auth</span>
                                    </div>
                                    <p className="text-2xl font-tech tracking-tighter">Encrypted</p>
                                </div>
                            </Reveal>
                            <Reveal delay={0.3}>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-emerald-500">
                                        <Cpu size={14} />
                                        <span className="text-xs font-mono font-bold uppercase">Battery Opt</span>
                                        <span className="text-xs font-mono font-bold uppercase"></span>
                                    </div>
                                    <p className="text-2xl font-tech tracking-tighter">0.5% Load</p>
                                </div>
                            </Reveal>
                            <Reveal delay={0.4}>
                                <div className="space-y-1 text-pink-500">
                                    <div className="flex items-center gap-2">
                                        <Smartphone size={14} />
                                        <span className="text-xs font-mono font-bold uppercase">Store Ready</span>
                                    </div>
                                    <p className="text-2xl font-tech tracking-tighter table-fixed">Certified</p>
                                </div>
                            </Reveal>
                        </div>
                    </div>

                    {/* Project Grid - Showcase Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                        {projects.map((project, index) => (
                            <Reveal
                                key={index}
                                delay={index * 0.15}
                                className="col-span-1"
                            >
                                <ShowcaseCard
                                    {...project}
                                    aspectRatio="video"
                                />
                            </Reveal>
                        ))}
                    </div>

                    {/* Technical Footer Decoration */}
                    <div className="mt-20 md:32 border-t border-dashed border-zinc-800 pt-8 md:pt-12 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                        <div className="flex flex-wrap justify-center md:justify-start items-center gap-6 md:gap-12 text-center md:text-left">
                            <div className="text-[9px] md:text-[10px] font-mono leading-tight">
                                <span className="text-zinc-600 block uppercase tracking-widest mb-1">Network_Interface</span>
                                <span className="text-zinc-400 font-bold uppercase tracking-tight">5G / LTE Optimized</span>
                            </div>
                            <div className="text-[9px] md:text-[10px] font-mono leading-tight">
                                <span className="text-zinc-600 block uppercase tracking-widest mb-1">API_Gateway</span>
                                <span className="text-zinc-400 font-bold uppercase tracking-tight">GraphQL_v3</span>
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
