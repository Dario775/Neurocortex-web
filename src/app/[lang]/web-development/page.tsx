import { Locale } from "../../../i18n-config";
import { getDictionary } from "../../../get-dictionary";
import { Sidebar } from "../../../components/Sidebar";
import { TopBar } from "../../../components/TopBar";
import { ShowcaseCard } from "../../../components/ShowcaseCard";
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
            title: "SmartLogistics Core",
            description: "Arquitectura de optimización de rutas y flotas en tiempo real. Diseñada para reducir costos operativos mediante análisis de datos geoespaciales.",
            image: "/projects/logitas-v2.png",
            tags: ["Logística", "Algoritmos"],
            techStack: ["React", "Go", "Cloud"],
            clientId: "SYS-LOG-01",
            link: "#"
        },
        {
            title: "FinTech Secure Vault",
            description: "Infraestructura bancaria de alta seguridad. Encriptación de extremo a extremo, cumplimiento de normativas financieras y auditoría en tiempo real.",
            image: "/projects/vortex-v2.png",
            tags: ["Finanzas", "Ciberseguridad"],
            techStack: ["Next.js", "Rust", "PostgreSQL"],
            clientId: "SYS-FIN-02",
            link: "#"
        },
        {
            title: "Immersive Commerce Engine",
            description: "Motor de comercio electrónico con visualización 3D interactiva. Aumenta la conversión permitiendo al usuario inspeccionar productos al detalle.",
            image: "/projects/aether-v2.png",
            tags: ["E-commerce", "WebGL"],
            techStack: ["Three.js", "Next.js"],
            clientId: "SYS-COM-03",
            link: "#"
        },
        {
            title: "Corporate Identity Hub",
            description: "Plataforma CMS headless escalable para corporaciones globales. Gestión de contenido distribuida y renderizado estático para máxima velocidad.",
            image: "/projects/lozano-v2.png",
            tags: ["CMS", "Performance"],
            techStack: ["Next.js", "Tailwind CSS"],
            clientId: "SYS-CORP-04",
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

                    {/* Project Grid - Showcase Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                        {projects.map((project, index) => (
                            <Reveal
                                key={index}
                                delay={index * 0.15}
                                className="col-span-1"
                            >
                                <ShowcaseCard
                                    {...project}
                                    aspectRatio="video" // Standard ratio for web projects
                                />
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
