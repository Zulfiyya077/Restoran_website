"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Logo from './Logo';
import PlexusBackground from './PlexusBackground';

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

    return (
        <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image with Blur & Dark Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/menu/3014609.jpg"
                    alt="Quzetti Restaurant"
                    fill
                    className="object-cover blur-[4px] brightness-[0.4] scale-105"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-quzetti-green" />
                <PlexusBackground />
            </div>

            {/* Ambient Light (Static) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-quzetti-gold/5 blur-[120px] rounded-full opacity-10" />
            </div>

            <motion.div
                style={{ y, opacity, scale }}
                className="relative z-10 text-center px-6"
            >
                <div className="mb-12 flex justify-center">
                    <Logo width={300} height={300} className="drop-shadow-[0_0_50px_rgba(203,178,106,0.25)]" />
                </div>

                <div>
                    <div className="w-24 h-px bg-gradient-to-r from-transparent via-quzetti-gold to-transparent mx-auto mb-6" />
                    <p className="text-quzetti-gold/90 font-medium tracking-[0.6em] text-xs md:text-base uppercase">
                        TRADITIONAL & MODERN CUISINE
                    </p>
                </div>

                <div className="mt-16">
                    <button
                        onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                        className="group relative px-10 py-4 overflow-hidden rounded-full border border-quzetti-gold/30 hover:border-quzetti-gold transition-colors duration-500"
                    >
                        <div className="absolute inset-0 bg-quzetti-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        <span className="relative z-10 text-quzetti-gold group-hover:text-quzetti-green font-bold tracking-[0.3em] text-xs uppercase transition-colors duration-500">
                            MENYUNA BAX
                        </span>
                    </button>

                    <div className="mt-12 flex flex-col items-center gap-4 opacity-30">
                        <span className="text-quzetti-gold text-[10px] font-bold tracking-[0.5em] uppercase">Kəşf Et</span>
                        <div className="w-px h-12 bg-gradient-to-b from-quzetti-gold to-transparent" />
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
