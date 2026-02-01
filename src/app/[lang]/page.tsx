import Link from "next/link";
import { Locale } from "../../i18n-config";
import { getDictionary } from "../../get-dictionary";
import { Sidebar } from "../../components/Sidebar";
import { TopBar } from "../../components/TopBar";
import { Globe, Smartphone, Layers, Palette, Rocket, Shield, Database, Cpu } from "lucide-react";
import { Logo } from "../../components/Logo";
import { ContactForm } from "../../components/ContactForm";
import { ChatWidget } from "../../components/ChatWidget";
import { HeroBackground } from "../../components/HeroBackground";




import { SystemStatus } from "../../components/SystemStatus";
import { Reveal } from "../../components/Reveal";
import { BentoCard } from "../../components/BentoCard";
import { TechnicalOverlays } from "../../components/TechnicalOverlays";
import { NeuralCore } from "../../components/NeuralCore";
import { TextScramble } from "../../components/TextScramble";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="flex min-h-screen bg-[#02040a] text-white font-sans selection:bg-purple-500/30">
      <TechnicalOverlays />
      <Sidebar dict={dict} />

      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <TopBar dict={dict} />

        <main className="flex-1 mt-16 px-4 md:px-8 lg:px-12 pt-8 lg:pt-12 pb-0 relative overflow-hidden flex flex-col gap-16">
          <HeroBackground />

          {/* Hero Section */}
          <div id="hero" className="max-w-6xl pt-10 relative z-10 flex flex-col xl:flex-row gap-12 items-center justify-between min-h-[500px]">
            <div className="flex-1 relative space-y-8 z-20">

              <div className="space-y-4">
                <h4 className="text-cyan-400 font-mono text-xs tracking-[0.4em] font-bold uppercase">
                  <TextScramble text={dict.hero.label} delay={0.2} />
                </h4>
                <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] font-tech uppercase">
                  <span className="block text-white">
                    {dict.hero.title.split('\n')[0]}
                  </span>
                  <span className="text-cyan-400">
                    {dict.hero.title.split('\n')[1] || 'DIGITAL PRODUCTS'}
                  </span>
                </h2>
              </div>
              <Reveal delay={0.4}>
                <p className="text-zinc-400 text-lg max-w-xl leading-relaxed border-l-2 border-zinc-800 pl-6">
                  {dict.hero.description}
                </p>
              </Reveal>

              <Reveal delay={0.6}>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                  <a href="#contact" className="bg-white text-black px-6 py-3 md:px-10 md:py-4 rounded font-bold text-xs md:text-sm tracking-widest hover:bg-cyan-400 hover:scale-105 hover:shadow-[0_0_40px_rgba(34,211,238,0.3)] transition-all duration-300 uppercase text-center">
                    {dict.hero.cta_primary}
                  </a>
                  <a href="#services" className="border border-white/10 text-white px-6 py-3 md:px-10 md:py-4 rounded font-bold text-xs md:text-sm tracking-widest hover:bg-white/5 hover:border-purple-500/50 hover:scale-105 transition-all duration-300 uppercase text-center">
                    {dict.hero.cta_secondary}
                  </a>
                </div>
              </Reveal>
            </div>

            <NeuralCore />

            {/* Floating Status Panel - Fixed position relative to core */}
            <div className="hidden xl:block absolute right-[-280px] top-1/2 -translate-y-1/2 scale-90">
              <SystemStatus />
            </div>
          </div>

          {/* Services Grid */}
          <div id="services" className="space-y-12">
            <div className="flex items-center gap-4">
              <div className="h-4 w-4 grid grid-cols-2 gap-0.5">
                <div className="bg-purple-500 rounded-[1px]"></div>
                <div className="bg-purple-500/50 rounded-[1px]"></div>
                <div className="bg-purple-500/50 rounded-[1px]"></div>
                <div className="bg-purple-500 rounded-[1px]"></div>
              </div>
              <h3 className="text-sm font-bold tracking-widest uppercase text-zinc-100 font-tech">
                <TextScramble text={dict.services.title} triggerOnHover />
              </h3>
              <div className="ml-auto h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent mx-8"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
              <Reveal delay={0.1} yOffset={50} className="h-full">
                <BentoCard
                  icon={<Globe className="w-6 h-6 text-cyan-400" />}
                  title={dict.services.vision.title}
                  desc={dict.services.vision.description}
                  specs={[dict.services.vision.spec_1, dict.services.vision.spec_2]}
                  action={dict.services.vision.action}
                  tag="Web System"
                  videoUrl="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-circuit-board-1616-large.mp4"
                  href={`/${lang}/web-development`}
                />
              </Reveal>
              <Reveal delay={0.2} yOffset={50} className="h-full">
                <BentoCard
                  icon={<Smartphone className="w-6 h-6 text-purple-400" />}
                  title={dict.services.nlp.title}
                  desc={dict.services.nlp.description}
                  specs={[dict.services.nlp.spec_1, dict.services.nlp.spec_2]}
                  action={dict.services.nlp.action}
                  tag="App Subsystem"
                  videoUrl="https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-matrix-9337-large.mp4"
                  href={`/${lang}/mobile-apps`}
                />
              </Reveal>
              <Reveal delay={0.3} yOffset={50} className="h-full">
                <BentoCard
                  icon={<Layers className="w-6 h-6 text-emerald-400" />}
                  title={dict.services.predictive.title}
                  desc={dict.services.predictive.description}
                  action={dict.services.predictive.action}
                  tag="Platform Engine"
                  videoUrl="https://assets.mixkit.co/videos/preview/mixkit-network-lines-and-dots-in-the-dark-9338-large.mp4"
                  href={`/${lang}/platforms`}
                />
              </Reveal>
              <Reveal delay={0.4} yOffset={50} className="h-full">
                <BentoCard
                  icon={<Palette className="w-6 h-6 text-pink-400" />}
                  title={dict.services.automation.title}
                  desc={dict.services.automation.description}
                  action={dict.services.automation.action}
                  tag="Creative Unit"
                  videoUrl="https://assets.mixkit.co/videos/preview/mixkit-abstract-movement-of-digital-lights-9336-large.mp4"
                  href={`/${lang}/design`}
                />
              </Reveal>
            </div>
          </div>

          <Reveal yOffset={40}>
            {/* Neural Impact Network (Partners/Logos) */}
            <div id="network" className="bg-zinc-900/10 border border-dashed border-zinc-800/50 rounded-2xl p-10 mt-12 transition-all hover:border-zinc-700/50 group relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white font-tech uppercase tracking-wider">
                    <TextScramble text={dict.network.title} triggerOnHover />
                  </h3>
                  <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">{dict.network.subtitle}</p>
                </div>
                <div className="flex flex-wrap gap-12 items-center opacity-60 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="flex items-center gap-2 text-zinc-400 font-bold text-lg hover:text-cyan-400 transition-colors cursor-default"><Rocket className="w-5 h-5 text-cyan-500" /> NEXT.JS</div>
                  <div className="flex items-center gap-2 text-zinc-400 font-bold text-lg hover:text-purple-400 transition-colors cursor-default"><Database className="w-5 h-5 text-purple-500" /> POSTGRESQL</div>
                  <div className="flex items-center gap-2 text-zinc-400 font-bold text-lg hover:text-emerald-400 transition-colors cursor-default"><Cpu className="w-5 h-5 text-emerald-500" /> TYPESCRIPT</div>
                  <div className="flex items-center gap-2 text-zinc-400 font-bold text-lg hover:text-pink-400 transition-colors cursor-default"><Shield className="w-5 h-5 text-pink-500" /> SECURITY</div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal yOffset={80}>
            {/* Contact Section */}
            <div id="contact" className="relative">
              <ContactForm dict={dict} />
            </div>
          </Reveal>

          <ChatWidget />

          <footer id="footer" className="border-t border-white/5 pt-16 mt-16 pb-[64px] relative">
            <div className="text-zinc-900 font-black text-[120px] md:text-[180px] tracking-tighter opacity-[0.03] select-none font-tech absolute bottom-16 left-1/2 -translate-x-1/2 pointer-events-none hidden md:block whitespace-nowrap uppercase">
              Neurocortex
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-16 text-sm relative z-10">
              <div className="max-w-xs space-y-6">
                <div className="flex items-center gap-3">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg blur opacity-10 group-hover:opacity-20 transition duration-500"></div>
                    <Logo size={32} />
                  </div>
                  <span className="font-bold tracking-[0.2em] text-lg font-tech uppercase text-white">
                    NEURO<span className="text-purple-400">CORTEX</span>
                  </span>
                </div>
                <div className="space-y-2 border-l border-white/10 pl-4">
                  <p className="text-zinc-500 font-mono text-[9px] tracking-[0.15em] leading-relaxed uppercase">{dict.footer.desc_1}</p>
                  <p className="text-zinc-500 font-mono text-[9px] tracking-[0.15em] leading-relaxed uppercase">{dict.footer.desc_2}</p>
                </div>
              </div>

              <div className="flex gap-20 md:mr-32 text-zinc-500 uppercase text-[9px] font-mono tracking-[0.2em]">
                <div className="space-y-6">
                  <h4 className="font-bold text-zinc-100 font-tech tracking-[0.25em] text-[11px] flex items-center gap-2 underline underline-offset-8 decoration-purple-500/50">
                    <TextScramble text={dict.footer.platform.title} triggerOnHover />
                  </h4>
                  <ul className="space-y-3">
                    <li><Link href={`/${lang}/web-development`} className="hover:text-cyan-400 transition-colors">{dict.footer.platform.link_1}</Link></li>
                    <li><Link href={`/${lang}/platforms`} className="hover:text-cyan-400 transition-colors">{dict.footer.platform.link_2}</Link></li>
                    <li><Link href="#" className="hover:text-cyan-400 transition-colors">{dict.footer.platform.link_3}</Link></li>
                  </ul>
                </div>
                <div className="space-y-6">
                  <h4 className="font-bold text-zinc-100 font-tech tracking-[0.25em] text-[11px] flex items-center gap-2 underline underline-offset-8 decoration-cyan-500/50">
                    <TextScramble text={dict.footer.company.title} triggerOnHover />
                  </h4>
                  <ul className="space-y-3">
                    <li><a href="#" className="hover:text-purple-400 transition-colors">{dict.footer.company.link_1}</a></li>
                    <li><a href="#" className="hover:text-purple-400 transition-colors">{dict.footer.company.link_2}</a></li>
                    <li><a href="#" className="hover:text-purple-400 transition-colors">{dict.footer.company.link_3}</a></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-[64px] border-t border-white/5 flex items-center justify-center z-20 bg-[#02040a]/50 backdrop-blur-sm">
              <span className="text-zinc-500 font-mono text-[9px] tracking-[0.3em] uppercase">
                {dict.footer.copyright}
              </span>
            </div>
          </footer>
        </main >
      </div >
    </div >
  );
}


