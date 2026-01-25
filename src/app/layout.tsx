import type { Metadata } from "next";
import { Geist, Geist_Mono, Rajdhani } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const rajdhani = Rajdhani({
    variable: "--font-rajdhani",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: {
        default: "Neurocortex | Desarrollo Web & Apps Móviles",
        template: "%s | Neurocortex",
    },
    description:
        "Agencia de desarrollo de software. Creamos sitios web, aplicaciones móviles, plataformas SaaS y diseño UI/UX. Soluciones digitales a medida para tu empresa.",
    keywords: [
        "desarrollo web",
        "aplicaciones móviles",
        "software a medida",
        "diseño UI/UX",
        "desarrollo de apps",
        "programación",
        "Flutter",
        "React",
        "Next.js",
        "Argentina",
    ],
    authors: [{ name: "Neurocortex" }],
    creator: "Neurocortex",
    publisher: "Neurocortex",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    openGraph: {
        type: "website",
        locale: "es_AR",
        url: "https://neurocortex.com.ar",
        siteName: "Neurocortex",
        title: "Neurocortex | Desarrollo Web & Apps Móviles",
        description:
            "Agencia de desarrollo de software. Creamos sitios web, aplicaciones móviles, plataformas SaaS y diseño UI/UX.",
        images: [
            {
                url: "/icon.png?v=12",
                width: 512,
                height: 512,
                alt: "Neurocortex - Desarrollo de Software",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Neurocortex | Desarrollo Web & Apps Móviles",
        description:
            "Agencia de desarrollo de software. Sitios web, apps móviles, SaaS y diseño UI/UX.",
        images: ["/icon.png?v=12"],
    },
    alternates: {
        canonical: "https://neurocortex.com.ar",
        languages: {
            "es-AR": "https://neurocortex.com.ar/es",
            "en-US": "https://neurocortex.com.ar/en",
            "pt-BR": "https://neurocortex.com.ar/pt",
        },
    },
    icons: {
        icon: [
            { url: "/icon.png?v=12" },
        ],
        apple: "/apple-icon.png?v=12",
    },
};

import { SmoothScroll } from "@/components/SmoothScroll";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${rajdhani.variable} antialiased`}
                suppressHydrationWarning
            >
                <SmoothScroll>
                    {children}
                </SmoothScroll>
            </body>
        </html>
    );
}
