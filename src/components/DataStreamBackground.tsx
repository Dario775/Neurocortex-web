"use client";

import React, { useEffect, useRef } from "react";

export function DataStreamBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;

        // Characters to use in the stream
        const chars = "01010101ABCDEFあいうえお010101".split("");
        const fontSize = 14;
        let columns = Math.floor(canvas.width / fontSize);
        let drops: number[] = [];

        const init = () => {
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.offsetWidth;
                canvas.height = parent.offsetHeight;
            }
            columns = Math.floor(canvas.width / fontSize);
            drops = new Array(columns).fill(1).map(() => Math.floor(Math.random() * -100));
        };

        const draw = () => {
            // Slower trail for more subtle effect
            ctx.fillStyle = "rgba(2, 4, 10, 0.1)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "rgba(0, 240, 255, 0.15)"; // Very subtle cian
            ctx.font = fontSize + "px monospace";

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const animate = () => {
            draw();
            animationFrameId = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            init();
        };

        window.addEventListener("resize", handleResize);
        init();
        animate();

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{ mixBlendMode: "screen" }}
        />
    );
}
