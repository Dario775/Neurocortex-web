import { clsx } from 'clsx';

export const Logo = ({ className, size = 40 }: { className?: string; size?: number }) => {
    return (
        <div className={clsx("relative flex items-center justify-center", className)} style={{ width: size, height: size }}>
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                className="overflow-visible"
            >
                <defs>
                    <linearGradient id="cyber-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00f0ff" />
                        <stop offset="100%" stopColor="#7928ca" />
                    </linearGradient>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Outer Hex Frame - Tech Style */}
                <path
                    d="M100 20 L170 60 V140 L100 180 L30 140 V60 Z"
                    fill="none"
                    stroke="url(#cyber-gradient)"
                    strokeWidth="2"
                    className="opacity-80"
                    strokeLinejoin="round"
                    filter="url(#glow)"
                />

                {/* Decorative Tech Bits on Hexagon */}
                <path d="M100 20 L110 25" stroke="#00f0ff" strokeWidth="3" />
                <path d="M100 180 L90 175" stroke="#7928ca" strokeWidth="3" />
                <circle cx="30" cy="60" r="2" fill="#00f0ff" />
                <circle cx="170" cy="140" r="2" fill="#7928ca" />

                {/* Inner Neural Network */}
                <g stroke="white" strokeWidth="1.5" opacity="0.9">
                    <line x1="100" y1="65" x2="65" y2="125" />
                    <line x1="100" y1="65" x2="135" y2="125" />
                    <line x1="65" y1="125" x2="135" y2="125" />
                    <line x1="100" y1="100" x2="100" y2="65" strokeOpacity="0.5" />

                    {/* Central Core Connection */}
                    <line x1="100" y1="100" x2="65" y2="125" strokeOpacity="0.5" />
                    <line x1="100" y1="100" x2="135" y2="125" strokeOpacity="0.5" />
                </g>

                {/* Nodes */}
                <circle cx="100" cy="65" r="4" fill="white" />
                <circle cx="65" cy="125" r="4" fill="white" />
                <circle cx="135" cy="125" r="4" fill="white" />

                {/* Core Pulse */}
                <circle cx="100" cy="100" r="6" fill="url(#cyber-gradient)">
                    <animate attributeName="r" values="6;8;6" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
                </circle>

                {/* Orbiting particle */}
                <g>
                    <circle cx="100" cy="20" r="3" fill="#00f0ff">
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 100 100"
                            to="360 100 100"
                            dur="10s"
                            repeatCount="indefinite"
                        />
                    </circle>
                </g>
            </svg>
        </div>
    );
};
