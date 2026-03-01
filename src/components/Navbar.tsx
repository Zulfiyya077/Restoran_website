"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from './Logo';

interface NavbarProps {
    onNavClick?: () => void;
}

export default function Navbar({ onNavClick }: NavbarProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Ana Səhifə', href: '#' },
        { name: 'Menyu', href: '#menu' },
        { name: 'Haqqımızda', href: '#about' },
    ];

    const handleLinkClick = (e: React.MouseEvent, href: string) => {
        if (href.startsWith('#')) {
            e.preventDefault();
        }

        if (onNavClick) onNavClick();
        setIsMobileMenuOpen(false);

        // If it's a home link or just a hash, scroll to top
        if (href === '#' || href === '') {
            requestAnimationFrame(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        } else if (href.startsWith('#')) {
            const element = document.querySelector(href);
            if (element) {
                requestAnimationFrame(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                });
            }
        }
    };

    return (
        <nav className={cn(
            "fixed top-0 left-0 w-full z-50 transition-all duration-500 py-3",
            isScrolled ? "bg-quzetti-green/90 backdrop-blur-xl border-b border-quzetti-gold/10 py-2 shadow-2xl" : "bg-transparent"
        )}>
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
                <div onClick={(e) => handleLinkClick(e, '#')} className="cursor-pointer">
                    <Logo width={90} height={90} className="hover:scale-105 transition-transform duration-300" />
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-12">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleLinkClick(e, link.href)}
                            className="text-white/70 hover:text-quzetti-gold text-xs font-bold uppercase tracking-[0.3em] transition-all hover:tracking-[0.5em]"
                        >
                            {link.name}
                        </a>
                    ))}
                    <a
                        href="#reservation"
                        onClick={(e) => handleLinkClick(e, '#reservation')}
                        className="px-8 py-3 bg-quzetti-gold text-quzetti-green text-xs font-black uppercase tracking-widest rounded-full hover:bg-quzetti-gold-light transition-all shadow-lg hover:shadow-quzetti-gold/20"
                    >
                        MASA AYIR
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-quzetti-gold"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-quzetti-green/95 backdrop-blur-3xl overflow-hidden border-b border-quzetti-gold/20"
                    >
                        <div className="px-6 py-12 flex flex-col gap-8 text-center">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleLinkClick(e, link.href)}
                                    className="text-white text-lg font-serif font-bold tracking-widest hover:text-quzetti-gold"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <a
                                href="#reservation"
                                onClick={(e) => handleLinkClick(e, '#reservation')}
                                className="mt-4 px-8 py-4 bg-quzetti-gold text-quzetti-green font-bold rounded-xl"
                            >
                                MASA AYIR
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
