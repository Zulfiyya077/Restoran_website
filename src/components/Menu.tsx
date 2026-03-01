"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ChevronRight, ArrowRight } from 'lucide-react';

const categories = [
    "Bütün", "Başlanğıc", "Şorbalar", "Salatlar", "Kabablar", "Əsas yeməklər", "Suşi", "Desert", "Bar"
];

const menuItems = [
    // Başlanğıc
    { name: "Blinçik ət ilə", price: "4.50", category: "Başlanğıc", image: "/images/menu/blinchik.png" },
    { name: "Zeytun çeşidləri", price: "4.00", category: "Başlanğıc", image: "/images/menu/zeytun.png" },
    { name: "Pendir asorti", price: "7.00", category: "Başlanğıc", image: "/images/menu/pendir.png" },
    { name: "Turşu çeşidləri", price: "7.00", category: "Başlanğıc", image: "/images/menu/pendir.png" },
    { name: "Tərəvəz buketi", price: "5.00", category: "Başlanğıc", image: "/images/menu/zeytun.png" },
    { name: "Humus", price: "4.50", category: "Başlanğıc", image: "/images/menu/blinchik.png" },
    { name: "Cacıq", price: "3.00", category: "Başlanğıc", image: "/images/menu/zeytun.png" },

    // Şorbalar
    { name: "Düşbərə", price: "6.00", category: "Şorbalar", image: "/images/menu/kebab.png" },
    { name: "Mərci", price: "4.00", category: "Şorbalar", image: "/images/menu/kebab.png" },
    { name: "Dovğa", price: "4.00", category: "Şorbalar", image: "/images/menu/kebab.png" },
    { name: "Toyuq şorbası", price: "5.00", category: "Şorbalar", image: "/images/menu/kebab.png" },

    // Kabablar
    { name: "Toyuq ətindən lülə", price: "7.50", category: "Kabablar", image: "/images/menu/kebab.png" },
    { name: "Toyuq flesindən kabab", price: "5.50", category: "Kabablar", image: "/images/menu/kebab.png" },
    { name: "Quzu tikə kabab", price: "10.50", category: "Kabablar", image: "/images/menu/kebab.png" },
    { name: "Quzu ətindən lülə", price: "10.00", category: "Kabablar", image: "/images/menu/kebab.png" },

    // Əsas yeməklər
    { name: "Kiyev kotleti", price: "8.90", category: "Əsas yeməklər", image: "/images/menu/kebab.png" },
    { name: "Göbələkli qaymaqlı toyuq", price: "9.80", category: "Əsas yeməklər", image: "/images/menu/kebab.png" },
    { name: "Can əti qaymaqlı sousda", price: "18.90", category: "Əsas yeməklər", image: "/images/menu/kebab.png" },
    { name: "Şabalıqlı can əti", price: "18.90", category: "Əsas yeməklər", image: "/images/menu/kebab.png" },
    { name: "Nar qovurma can əti ilə", price: "16.90", category: "Əsas yeməklər", image: "/images/menu/kebab.png" },

    // Suşi
    { name: "Spicy Salmon Roll", price: "14.00", category: "Suşi", image: "/images/menu/dessert.png" },
    { name: "Californiya Roll", price: "12.00", category: "Suşi", image: "/images/menu/dessert.png" },
    { name: "Hot Salmon Roll", price: "14.00", category: "Suşi", image: "/images/menu/dessert.png" },
    { name: "Dragon Roll", price: "13.00", category: "Suşi", image: "/images/menu/dessert.png" },
    { name: "Philadelphia Roll", price: "13.00", category: "Suşi", image: "/images/menu/dessert.png" },
    { name: "Maguro Nigiri", price: "13.00", category: "Suşi", image: "/images/menu/dessert.png" },

    // Desert
    { name: "Dondurma", price: "3.50", category: "Desert", image: "/images/menu/dessert.png" },
    { name: "Nağıl tort", price: "7.50", category: "Desert", image: "/images/menu/dessert.png" },
    { name: "Ballı tort", price: "7.80", category: "Desert", image: "/images/menu/dessert.png" },
    { name: "Abşeron tortu", price: "8.00", category: "Desert", image: "/images/menu/dessert.png" },
    { name: "Profitrol", price: "8.50", category: "Desert", image: "/images/menu/dessert.png" },
    { name: "Apple cobbler", price: "8.90", category: "Desert", image: "/images/menu/dessert.png" },
    { name: "Şokolad Vulkan", price: "9.50", category: "Desert", image: "/images/menu/dessert.png" },

    // Bar
    { name: "Bananlı Milkshake", price: "6.50", category: "Bar", image: "/images/menu/dessert.png" },
    { name: "Manqo-Marakuya Limonad", price: "5.90", category: "Bar", image: "/images/menu/dessert.png" },
    { name: "Manqo-banan Smuzi", price: "6.50", category: "Bar", image: "/images/menu/dessert.png" },
    { name: "Çay armudu stəkanda", price: "2.00", category: "Bar", image: "/images/menu/dessert.png" },
];

export default function Menu() {
    const [activeCategory, setActiveCategory] = useState("Bütün");
    const [showFullMenu, setShowFullMenu] = useState(false);

    const filteredItems = activeCategory === "Bütün"
        ? menuItems
        : menuItems.filter(item => item.category === activeCategory);

    // Initial view shows only featured items (first 6) if not expanded
    const itemsToDisplay = showFullMenu ? filteredItems : filteredItems.slice(0, 6);

    return (
        <section id="menu" className="py-24 px-6 md:px-12 bg-quzetti-green min-h-screen relative">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <span className="text-quzetti-gold uppercase tracking-[0.5em] text-xs font-bold mb-4 block">
                        Təamlarımızın Dünyası
                    </span>
                    <h2 className="text-4xl md:text-6xl font-serif font-bold gold-gradient mb-8">
                        Özəl Menyumuz
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-quzetti-gold to-transparent mx-auto" />
                </div>

                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-3 mb-16">
                    {categories.map((cat, idx) => (
                        <button
                            key={cat}
                            onClick={() => {
                                setActiveCategory(cat);
                                setShowFullMenu(false); // Reset expansion when category changes to keep it clean
                            }}
                            className={cn(
                                "px-8 py-3 rounded-full border border-quzetti-gold/20 transition-all duration-500 text-sm font-medium",
                                activeCategory === cat
                                    ? "bg-quzetti-gold text-quzetti-green font-bold shadow-[0_0_20px_rgba(203,178,106,0.3)]"
                                    : "text-white/60 hover:text-white hover:border-quzetti-gold/50"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Menu Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence>
                        {itemsToDisplay.map((item, idx) => {
                            const rowIndex = Math.floor(idx / 3);
                            const xOffset = rowIndex % 2 === 0 ? 100 : -100;

                            return (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 1, y: 0 }}
                                    className="glass rounded-[2rem] border border-quzetti-gold/10 hover:border-quzetti-gold/40 transition-all group overflow-hidden flex flex-col h-full shadow-xl"
                                >
                                    {/* Image Section */}
                                    <div className="relative h-64 w-full overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-quzetti-green via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
                                        <div className="absolute top-4 right-6">
                                            <div className="bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] text-quzetti-gold font-bold uppercase tracking-widest">
                                                {item.category}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-8 flex flex-col flex-grow relative">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-2xl font-serif font-bold text-white group-hover:text-quzetti-gold transition-colors leading-tight">
                                                {item.name}
                                            </h3>
                                            <div className="flex flex-col items-end">
                                                <span className="text-quzetti-gold font-bold text-xl">
                                                    {item.price}
                                                </span>
                                                <span className="text-[10px] text-quzetti-gold/50 font-bold -mt-1 uppercase tracking-tighter">AZN</span>
                                            </div>
                                        </div>
                                        <div className="w-full h-px bg-white/5 mb-6 group-hover:bg-quzetti-gold/20 transition-colors" />
                                        <p className="text-white/40 text-sm leading-relaxed flex-grow italic group-hover:text-white/60 transition-colors">
                                            Eksklüziv Quzetti resepti ilə hazırlanan, təbiətin və müasir culinaryanın harmoniyası.
                                        </p>

                                        {/* Hover Arrow Indicator */}
                                        <div className="mt-8 flex justify-end">
                                            <motion.div
                                                initial={{ opacity: 0, x: -10 }}
                                                whileHover={{ opacity: 1, x: 0 }}
                                                className="text-quzetti-gold flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] uppercase"
                                            >
                                                Ətraflı Bax <ArrowRight size={14} />
                                            </motion.div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

                {!showFullMenu && filteredItems.length > 6 && (
                    <div className="mt-20 text-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowFullMenu(true)}
                            className="px-12 py-5 bg-quzetti-gold text-quzetti-green font-black uppercase tracking-[0.4em] text-sm rounded-full shadow-[0_10px_40px_rgba(203,178,106,0.2)] hover:shadow-[0_15px_60px_rgba(203,178,106,0.4)] transition-all flex items-center gap-4 mx-auto"
                        >
                            TAM MENYUYA BAX
                            <ChevronRight size={20} />
                        </motion.button>
                    </div>
                )}
            </div>
        </section>
    );
}
