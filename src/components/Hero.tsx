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

            {/* Dynamic Ambient Light */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <motion.div
                    animate={{
                        opacity: [0.1, 0.15, 0.1],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-quzetti-gold/5 blur-[120px] rounded-full"
                />
            </div>

            <motion.div
                style={{ y, opacity, scale }}
                className="relative z-10 text-center px-6"
            >
                <div className="mb-12 flex justify-center">
                    <Logo width={300} height={300} className="drop-shadow-[0_0_50px_rgba(203,178,106,0.25)]" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    <div className="w-24 h-px bg-gradient-to-r from-transparent via-quzetti-gold to-transparent mx-auto mb-6" />
                    <p className="text-quzetti-gold/90 font-medium tracking-[0.6em] text-xs md:text-base uppercase">
                        TRADITIONAL & MODERN CUISINE
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 2 }}
                    className="mt-16"
                >
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
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-px h-12 bg-gradient-to-b from-quzetti-gold to-transparent"
                        />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
