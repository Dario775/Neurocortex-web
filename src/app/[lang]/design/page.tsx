import { Locale } from "../../../i18n-config";
import { getDictionary } from "../../../get-dictionary";
import { Sidebar } from "../../../components/Sidebar";
import { TopBar } from "../../../components/TopBar";
import { ShowcaseCard } from "../../../components/ShowcaseCard";
import { DataStreamBackground } from "../../../components/DataStreamBackground";
import { Reveal } from "../../../components/Reveal";
import { TextScramble } from "../../../components/TextScramble";
import { TechnicalOverlays } from "../../../components/TechnicalOverlays";
import { Palette, Zap, Eye, Layout } from "lucide-react";

export default async function DesignExperiencePage({
    params,
}: {
    params: Promise<{ lang: Locale }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    const projects = [
        {
            title: "Project Ghost: Sistema Visual",
            description: "Creación de una identidad visual moderna y fácil de usar, con componentes que se adaptan a cualquier pantalla.",
            image: "/projects/ghost-demo.png",
            tags: ["Diseño UI", "Sistema"],
            techStack: ["Figma", "Framer"],
            clientId: "GHS-101",
            link: "#"
        },
        {
            title: "Nexus One: Identidad de Marca",
            description: "Rediseño de marca para una empresa tecnológica, incluyendo logos, colores y guías de uso profesional.",
            image: "/projects/nexus-demo.png",
            tags: ["Marca", "Creatividad"],
            techStack: ["Illustrator", "After Effects"],
            clientId: "NXS-441",
            link: "#"
        },
        {
            title: "Aura: Página de Lanzamiento",
            description: "Diseño de un sitio web inmersivo para un producto exclusivo. Buscamos captar la atención del cliente desde el primer segundo.",
            image: "/projects/aura-demo.png",
            tags: ["Experiencia", "Web Inmersiva"],
            techStack: ["Next.js", "Three.js"],
            clientId: "AUR-309",
            link: "#"
        }
    ];

    return (
        <div className="flex min-h-screen bg-[#02040a] text-white font-sans selection:bg-pink-500/30">
            <TechnicalOverlays />
            <Sidebar dict={dict} />

            <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
                <TopBar dict={dict} />

                <main className="flex-1 mt-16 px-4 md:px-8 lg:px-12 pt-12 pb-24 relative overflow-hidden">
                    <DataStreamBackground />

                    {/* Header Section */}
                    <div className="relative z-10 mb-20">
                        <Reveal>
                            <span className="text-pink-400 font-mono text-[10px] tracking-[0.5em] uppercase mb-4 block">
                                {dict.design_exp?.subtitle || "CREATIVE_SUBSYSTEM / INTERFACE_v5.2"}
                            </span>
                            <h1 className="text-5xl md:text-7xl font-tech font-black uppercase mb-6 leading-none">
                                <TextScramble text={dict.design_exp?.title || "Diseño y Experiencia"} />
                            </h1>
                            <p className="text-zinc-500 max-w-2xl font-mono text-sm leading-relaxed mb-12">
                                {dict.design_exp?.description || "Donde la tecnología se vuelve humana. Creamos interfaces que no solo se ven bien, sino que guían al usuario instintivamente hacia la conversión."}
                            </p>
                        </Reveal>

                        {/* Metrics Bar */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-white/5 py-8 max-w-4xl">
                            <Reveal delay={0.1}>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-pink-500">
                                        <Palette size={14} />
                                        <span className="text-xs font-mono font-bold uppercase">Aura UX</span>
                                    </div>
                                    <p className="text-2xl font-tech tracking-tighter">Premium Feel</p>
                                </div>
                            </Reveal>
                            <Reveal delay={0.2}>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-cyan-500">
                                        <Eye size={14} />
                                        <span className="text-xs font-mono font-bold uppercase">Visual Impact</span>
                                    </div>
                                    <p className="text-2xl font-tech tracking-tighter">High Contrast</p>
                                </div>
                            </Reveal>
                            <Reveal delay={0.3}>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-purple-500">
                                        <Layout size={14} />
                                        <span className="text-xs font-mono font-bold uppercase">Responsive</span>
                                    </div>
                                    <p className="text-2xl font-tech tracking-tighter">Universal UI</p>
                                </div>
                            </Reveal>
                            <Reveal delay={0.4}>
                                <div className="space-y-1 text-emerald-500">
                                    <div className="flex items-center gap-2">
                                        <Zap size={14} />
                                        <span className="text-xs font-mono font-bold uppercase">Interactions</span>
                                    </div>
                                    <p className="text-2xl font-tech tracking-tighter">60 FPS Smooth</p>
                                </div>
                            </Reveal>
                        </div>
                    </div>

                    {/* Project Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                        {projects.map((project, index) => (
                            <Reveal key={index} delay={index * 0.1}>
                                <ShowcaseCard
                                    {...project}
                                    aspectRatio="video" // Design projects usually look good in video/16:9 too
                                />
                            </Reveal>
                        ))}
                    </div>

                    {/* Technical Footer Decoration */}
                    <div className="mt-32 border-t border-dashed border-zinc-800 pt-12 flex flex-col md:flex-row justify-between items-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                        <div className="flex items-center gap-12">
                            <div className="text-[10px] font-mono leading-tight">
                                <span className="text-zinc-600 block">PIXEL_PERFECT</span>
                                <span className="text-zinc-400">100% ACCURACY</span>
                            </div>
                            <div className="text-[10px] font-mono leading-tight">
                                <span className="text-zinc-600 block">RENDER_ENGINE</span>
                                <span className="text-zinc-400">HARDWARE_ACCEL</span>
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
