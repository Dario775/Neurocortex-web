import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#02040a] text-white flex items-center justify-center p-8">
            <div className="text-center max-w-md">
                {/* 404 Number */}
                <div className="text-[120px] md:text-[180px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 select-none">
                    404
                </div>

                {/* Message */}
                <h1 className="text-2xl md:text-3xl font-bold mb-4 font-tech uppercase tracking-wide">
                    Página no encontrada
                </h1>

                <p className="text-zinc-400 mb-8 font-mono text-sm">
                    La página que buscas no existe o fue movida.
                </p>

                {/* Back button */}
                <Link
                    href="/es"
                    className="inline-flex items-center gap-2 bg-white text-black px-8 py-3.5 rounded font-bold text-sm tracking-wide hover:bg-cyan-400 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all duration-300 uppercase"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Volver al inicio
                </Link>

                {/* Decorative elements */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-900/10 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-900/10 rounded-full blur-[100px] pointer-events-none"></div>
            </div>
        </div>
    );
}
