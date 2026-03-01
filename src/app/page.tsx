"use client";

import { motion, AnimatePresence } from 'framer-motion';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Menu from "@/components/Menu";
import Reservation from "@/components/Reservation";
import Logo from "@/components/Logo";
import { Instagram, Facebook, Globe, MapPin, Phone as PhoneIcon, Mail, ExternalLink, Play, Image as ImageIcon } from 'lucide-react';
import { useState, useEffect, useTransition } from 'react';

export default function Home() {
  const [showAboutDetail, setShowAboutDetail] = useState(false);
  const [showContactDetail, setShowContactDetail] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  // Scroll to top when view changes
  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 20);
    return () => clearTimeout(timer);
  }, [showAboutDetail, showContactDetail]);

  // Simulate initial loading for skeletons
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const resetViews = () => {
    setIsLoading(true);
    startTransition(() => {
      setShowAboutDetail(false);
      setShowContactDetail(false);
    });
    setTimeout(() => setIsLoading(false), 800);
  };

  const handleShowAbout = () => {
    setIsLoading(true);
    startTransition(() => {
      setShowAboutDetail(true);
    });
    setTimeout(() => setIsLoading(false), 800);
  };

  const handleShowContact = () => {
    setIsLoading(true);
    startTransition(() => {
      setShowContactDetail(true);
    });
    setTimeout(() => setIsLoading(false), 800);
  };

  return (
    <main className="relative bg-quzetti-green min-h-screen overflow-x-hidden">
      <Navbar onNavClick={resetViews} />
      <AnimatePresence>
        {!showAboutDetail && !showContactDetail ? (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Hero />
            {isLoading ? <SkeletonMenu /> : <Menu />}
            <Reservation />


            {/* About Section */}
            <section id="about" className="py-32 px-6 md:px-12 relative overflow-hidden">
              {/* Dynamic Background */}
              <div className="absolute top-0 left-0 w-full h-full bg-black/10 -z-10" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                className="absolute -top-64 -left-64 w-[500px] h-[500px] border border-quzetti-gold/5 rounded-full pointer-events-none"
              />

              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="relative"
                >
                  <div className="relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl group">
                    <div className="absolute inset-0 bg-gradient-to-t from-quzetti-green/60 to-transparent z-10 transition-opacity group-hover:opacity-40" />
                    <img
                      src="/images/hero.png"
                      alt="Quzetti Interior"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]"
                    />
                    <div className="absolute bottom-12 left-12 z-20">
                      <div className="bg-quzetti-gold text-quzetti-green px-6 py-2 rounded-full font-black text-xs tracking-widest uppercase">
                        Eksklüziv Məkan
                      </div>
                    </div>
                  </div>
                  {/* Decorative Gold Frame */}
                  <div className="absolute -inset-4 border border-quzetti-gold/20 rounded-[3.5rem] -z-10 translate-x-4 translate-y-4" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                >
                  <span className="text-quzetti-gold uppercase tracking-[0.5em] text-xs font-bold mb-6 block">Bizim Hekayəmiz</span>
                  <h2 className="text-5xl md:text-7xl font-serif font-bold gold-gradient mb-10 leading-tight">
                    Ənənəvi və Müasir <br /> Mətbəxin Vəhdəti
                  </h2>
                  <div className="space-y-8 text-white/70 text-lg leading-relaxed font-light mb-12">
                    <p>
                      Quzetti olaraq biz Azərbaycanın zəngin kulinariya ənənələrini müasir yanaşma ilə birləşdiririk.
                      Hər bir təam xüsusi diqqət və sevgi ilə hazırlanır, hər bir müştərimiz isə bizim üçün əziz qonaqdır.
                    </p>
                    <p>
                      Bakıxanov qəsəbəsinin mərkəzində yerləşən restoranımız həm ailəvi şam yeməkləri, həm də özəl tədbirləriniz üçün
                      ideal mühit təklif edir. Ramazan ayında xüsusi iftar menyularımızla xidmətinizdəyik.
                    </p>
                  </div>
                  <motion.button
                    onClick={handleShowAbout}
                    whileHover={{ scale: 1.05, x: 10 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-4 bg-quzetti-gold text-quzetti-green font-black uppercase tracking-[0.2em] text-sm rounded-full shadow-xl hover:shadow-quzetti-gold/20 transition-all"
                  >
                    Daha Ətraflı
                  </motion.button>
                </motion.div>
              </div>
            </section>

          </motion.div>
        ) : showAboutDetail ? (
          <motion.div
            key="detailed-about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-40 pb-24 px-6 md:px-12 bg-quzetti-green min-h-screen"
          >
            <div className="max-w-5xl mx-auto">

              <h1 className="text-6xl md:text-8xl font-serif font-bold gold-gradient mb-16 leading-tight text-center md:text-left">Haqqımızda Ətraflı</h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
                <div className="space-y-8 text-white/80 text-xl leading-relaxed">
                  <p>Quzetti Restoranı olaraq biz qonaqpərvərliyi bir sənətə çeviririk. Hər küncümüzdə incəlik, hər boşqabımızda isə rəngarəng dadlar gizlənir.</p>
                  <p>Restoranımızın interyeri həm klassik Azərbaycan elementlərini, həm də müasir dizayn trendlərini özündə birləşdirir. Bakıxanov qəsəbəsində (keçmiş Razin) yerləşən məkanımız sizin üçün unikal bir atmosfer yaradır.</p>
                </div>
                <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-quzetti-gold/20 flex items-center justify-center bg-black/40 group">
                  <div className="text-center">
                    <Play className="text-quzetti-gold w-16 h-16 mx-auto mb-4 group-hover:scale-125 transition-transform duration-500" />
                    <span className="text-white/40 uppercase tracking-[0.3em] text-xs font-bold">Tanıtım Videosu Gələcək</span>
                  </div>
                </div>
              </div>

              <div className="mb-24">
                <h2 className="text-3xl font-serif font-bold text-white mb-10 border-b border-quzetti-gold/20 pb-4">Qalereyamız</h2>
                {isLoading ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="aspect-square bg-white/5 rounded-2xl animate-pulse" />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="aspect-square bg-white/5 rounded-2xl flex items-center justify-center border border-white/5 hover:border-quzetti-gold/40 transition-colors">
                        <ImageIcon className="text-white/10" size={32} />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Google Maps Section */}
              <div className="mt-32">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
                  <div>
                    <span className="text-quzetti-gold uppercase tracking-[0.5em] text-[10px] font-bold mb-4 block">Məkanımız</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">Xəritədə Biz</h2>
                  </div>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    href="https://maps.google.com"
                    target="_blank"
                    className="flex items-center gap-3 px-8 py-3 rounded-full border border-quzetti-gold/30 text-quzetti-gold hover:bg-quzetti-gold hover:text-quzetti-green transition-all font-bold text-xs tracking-widest uppercase"
                  >
                    Google Maps-də Aç <ExternalLink size={16} />
                  </motion.a>
                </div>

                <div className="h-[500px] w-full rounded-[3rem] overflow-hidden border border-quzetti-gold/10 shadow-[0_30px_100px_rgba(0,0,0,0.5)] transition-all duration-1000">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.2612723!2d49.94!3d40.42!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDI1JzEyLjAiTiA0OcKwNTYnMjQuMCJF!5e0!3m2!1sen!2saz!4v1710000000000!5m2!1sen!2saz"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="detailed-contact"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-40 pb-32 px-6 md:px-12 bg-quzetti-green min-h-screen"
          >
            <div className="max-w-5xl mx-auto">

              <h1 className="text-7xl md:text-9xl font-serif font-bold gold-gradient mb-20 leading-tight">Bizimlə <br /> Əlaqə</h1>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { icon: MapPin, title: "Ünvan", content: "Bakı, Bakıxanov qəsəbəsi, Sülh küçəsi 44" },
                  { icon: PhoneIcon, title: "Telefon", content: "+994 50 123 45 67" },
                  { icon: Mail, title: "E-poçt", content: "info@quzetti.az" }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-12 glass rounded-[3rem] border border-quzetti-gold/10 text-center flex flex-col items-center"
                  >
                    <div className="w-16 h-16 bg-quzetti-gold/10 rounded-2xl flex items-center justify-center mb-8">
                      <item.icon className="text-quzetti-gold" size={28} />
                    </div>
                    <h3 className="text-quzetti-gold font-serif text-2xl mb-4">{item.title}</h3>
                    <p className="text-white/60 text-lg">{item.content}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer id="contact" className="py-24 px-6 relative bg-black/40 border-t border-quzetti-gold/10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-quzetti-gold/30 to-transparent" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 items-start mb-20 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start">
              <Logo width={160} height={160} className="mb-6" />
              <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                Bakının ən ləzzətli və modern restoranı. Bizimlə hər anınız unudulmaz olacaq.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <h3 className="text-quzetti-gold font-serif font-bold text-xl uppercase tracking-widest">Əlaqə</h3>
              <div className="space-y-4">
                <p className="text-white/60 text-sm leading-loose">
                  Bakıxanov qəsəbəsi, <br />
                  Bakı, Azərbaycan
                </p>
                <a href="tel:+994506160405" className="flex items-center gap-3 text-white/40 hover:text-quzetti-gold transition-colors group">
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-quzetti-gold/30 transition-colors">
                    <PhoneIcon size={14} className="text-quzetti-gold" />
                  </div>
                  <span className="text-sm font-bold tracking-widest">+994 50 616 04 05</span>
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <h3 className="text-quzetti-gold font-serif font-bold text-xl uppercase tracking-widest">Sosial Media</h3>
              <div className="flex justify-center md:justify-start gap-4">
                {[
                  { name: 'Instagram', icon: Instagram },
                  { name: 'Facebook', icon: Facebook },
                  { name: 'TikTok', icon: Globe }
                ].map((social) => (
                  <motion.a
                    key={social.name}
                    href="#"
                    whileHover={{ y: -5, backgroundColor: 'rgba(203,178,106,0.1)' }}
                    className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center text-quzetti-gold hover:border-quzetti-gold transition-colors"
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-white/20 text-[10px] font-bold tracking-[0.3em] uppercase">
              © {new Date().getFullYear()} Quzetti Restaurant. Bütün hüquqlar qorunur.
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-white/20 text-[10px] font-bold hover:text-quzetti-gold transition-colors">GİZLİLİK SİYASETİ</a>
              <a href="#" className="text-white/20 text-[10px] font-bold hover:text-quzetti-gold transition-colors">XİDMƏT ŞƏRTLƏRİ</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

function SkeletonMenu() {
  return (
    <section className="py-24 px-6 bg-quzetti-green">
      <div className="max-w-7xl mx-auto">
        <div className="h-12 w-48 bg-white/5 rounded-xl mb-12 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-80 bg-white/5 rounded-[2rem] animate-pulse" />
          ))}
        </div>
      </div>
    </section>
  );
}
