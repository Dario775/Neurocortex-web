"use client";

import { clsx } from 'clsx';

export const Logo = ({ className, size = 40 }: { className?: string; size?: number }) => {
    return (
        <div className={clsx("relative flex items-center justify-center", className)} style={{ width: size, height: size }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src="/neurocortex-logo.png?v=12"
                alt="Neurocortex Logo"
                width={size}
                height={size}
                className="object-contain"
            />
        </div>
    );
};
