"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

interface LogoProps {
    className?: string;
    width?: number;
    height?: number;
}

export default function Logo({ className, width = 180, height = 180 }: LogoProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={className}
        >
            <Image
                src="/images/quzetti.png"
                alt="Quzetti Logo"
                width={width}
                height={height}
                className="object-contain"
                priority
            />
        </motion.div>
    );
}
