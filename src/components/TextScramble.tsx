"use client";

import { useEffect, useState, useCallback, useRef } from "react";

interface TextScrambleProps {
    text: string;
    autostart?: boolean;
    duration?: number;
    delay?: number;
    className?: string;
    triggerOnHover?: boolean;
}

const CYCLES_PER_LETTER = 2;
const SHUFFLE_SYMBOLS = "!<>-_\\/[]{}—=+*^?#";

export function TextScramble({
    text,
    autostart = true,
    delay = 0,
    className = "",
    triggerOnHover = false,
}: TextScrambleProps) {
    const [displayText, setDisplayText] = useState(text);
    const isAnimating = useRef(false);
    const iterationRef = useRef(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const frameRef = useRef<number | null>(null);

    const scramble = useCallback(() => {
        if (isAnimating.current) return;
        isAnimating.current = true;
        iterationRef.current = 0;

        const animate = () => {
            const scrambled = text
                .split("")
                .map((char, index) => {
                    if (index < iterationRef.current / CYCLES_PER_LETTER) {
                        return text[index];
                    }
                    if (char === " ") return " ";
                    return SHUFFLE_SYMBOLS[Math.floor(Math.random() * SHUFFLE_SYMBOLS.length)];
                })
                .join("");

            setDisplayText(scrambled);

            if (iterationRef.current < text.length * CYCLES_PER_LETTER) {
                iterationRef.current += 1;
                frameRef.current = requestAnimationFrame(animate);
            } else {
                setDisplayText(text);
                isAnimating.current = false;
            }
        };

        frameRef.current = requestAnimationFrame(animate);
    }, [text]);

    useEffect(() => {
        if (autostart) {
            timeoutRef.current = setTimeout(() => {
                scramble();
            }, delay * 1000);
        }

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
        };
    }, [autostart, delay, scramble]);

    return (
        <span
            className={`${className} cursor-default`}
            onMouseEnter={triggerOnHover ? scramble : undefined}
        >
            {displayText}
        </span>
    );
}
