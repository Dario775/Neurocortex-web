import Image from 'next/image';
import { clsx } from 'clsx';

export const Logo = ({ className, size = 40 }: { className?: string; size?: number }) => {
    return (
        <div className={clsx("relative flex items-center justify-center", className)} style={{ width: size, height: size }}>
            <Image
                src="/neurocortex-logo.png"
                alt="Neurocortex Logo"
                width={size}
                height={size}
                className="object-contain"
                priority
            />
        </div>
    );
};
