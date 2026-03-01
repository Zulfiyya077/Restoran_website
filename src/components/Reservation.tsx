"use client";

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';
import { Calendar, Users, Clock, Send, CheckCircle2, Phone, User } from 'lucide-react';
import Image from 'next/image';

export default function Reservation() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

    const [formData, setFormData] = useState({ name: '', phone: '', date: '', guests: '2', time: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
        }, 2000);
    };

    return (
        <section ref={containerRef} id="reservation" className="relative py-32 px-6 md:px-12 bg-quzetti-green overflow-hidden">
            {/* Parallax Background Reveal */}
            <div className="absolute inset-0 z-0">
                <motion.div style={{ y }} className="absolute inset-0 h-[120%] -top-[10%]">
                    <Image
                        src="/images/menu/3014609.jpg"
                        alt="Background"
                        fill
                        className="object-cover brightness-[0.2] blur-[2px]"
                    />
                </motion.div>
                {/* Overlays for depth and readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-quzetti-green via-transparent to-quzetti-green" />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-quzetti-gold/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-quzetti-gold/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-serif font-bold text-quzetti-gold mb-4"
                    >
                        Masa Rezerv Edin
                    </motion.h2>
                    <p className="text-white/60 font-medium tracking-widest uppercase text-sm">
                        Eksklüziv dad təcrübəsi üçün yerinizi indidən ayırın
                    </p>
                </div>

                <div className="glass p-8 md:p-12 rounded-[2rem] border border-quzetti-gold/20 shadow-2xl relative">
                    <AnimatePresence mode="wait">
                        {!isSuccess ? (
                            <motion.form
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                onSubmit={handleSubmit}
                                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                            >
                                <div className="space-y-2">
                                    <label className="text-quzetti-gold text-xs font-bold uppercase tracking-widest">Ad Soyad</label>
                                    <div className="relative">
                                        <User className="absolute left-6 top-1/2 -translate-y-1/2 text-quzetti-gold/50" size={18} />
                                        <input
                                            required
                                            type="text"
                                            placeholder="Adınız və Soyadınız"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-16 pr-6 py-4 text-white focus:outline-none focus:border-quzetti-gold transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-quzetti-gold text-xs font-bold uppercase tracking-widest">Mobil Nömrə</label>
                                    <div className="relative">
                                        <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-quzetti-gold/50" size={18} />
                                        <input
                                            required
                                            type="tel"
                                            placeholder="+994 (__) ___-__-__"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-16 pr-6 py-4 text-white focus:outline-none focus:border-quzetti-gold transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-quzetti-gold text-xs font-bold uppercase tracking-widest">Tarix</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-quzetti-gold/50" size={18} />
                                        <input
                                            required
                                            type="date"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-16 pr-6 py-4 text-white focus:outline-none focus:border-quzetti-gold transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-quzetti-gold text-xs font-bold uppercase tracking-widest">Qonaq Sayı</label>
                                    <div className="relative">
                                        <Users className="absolute left-6 top-1/2 -translate-y-1/2 text-quzetti-gold/50" size={18} />
                                        <select className="w-full bg-white/5 border border-white/10 rounded-xl pl-16 pr-6 py-4 text-white focus:outline-none focus:border-quzetti-gold transition-colors appearance-none">
                                            <option className="bg-quzetti-green">2 Nəfərlik</option>
                                            <option className="bg-quzetti-green">4 Nəfərlik</option>
                                            <option className="bg-quzetti-green">6 Nəfərlik</option>
                                            <option className="bg-quzetti-green">VİP Zal (10+)</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-quzetti-gold text-xs font-bold uppercase tracking-widest">Saat</label>
                                    <div className="relative">
                                        <Clock className="absolute left-6 top-1/2 -translate-y-1/2 text-quzetti-gold/50" size={18} />
                                        <input
                                            required
                                            type="time"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-16 pr-6 py-4 text-white focus:outline-none focus:border-quzetti-gold transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-end">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        disabled={isSubmitting}
                                        className="w-full py-4 bg-quzetti-gold text-quzetti-green font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-quzetti-gold-light transition-all disabled:opacity-50"
                                    >
                                        {isSubmitting ? (
                                            <div className="w-6 h-6 border-2 border-quzetti-green/30 border-t-quzetti-green rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <Send size={18} />
                                                TƏSDİQLƏ
                                            </>
                                        )}
                                    </motion.button>
                                </div>
                            </motion.form>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-12"
                            >
                                <div className="mb-6 flex justify-center">
                                    <div className="relative">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-24 h-24 bg-quzetti-gold rounded-full flex items-center justify-center"
                                        >
                                            <CheckCircle2 className="text-quzetti-green" size={48} />
                                        </motion.div>
                                    </div>
                                </div>
                                <h3 className="text-3xl font-serif font-bold text-white mb-4">Müraciətiniz Qəbul Olundu!</h3>
                                <p className="text-white/60 mb-8">Tezliklə menecerimiz sizinlə əlaqə saxlayacaq.</p>
                                <button
                                    onClick={() => setIsSuccess(false)}
                                    className="px-8 py-3 border border-quzetti-gold text-quzetti-gold rounded-lg hover:bg-quzetti-gold hover:text-quzetti-green transition-all"
                                >
                                    Yeni Rezervasiya
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
