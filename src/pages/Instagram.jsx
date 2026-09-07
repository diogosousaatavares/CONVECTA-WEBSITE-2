import React, { useState, useEffect } from "react";
import { Instagram as InstagramIcon } from "lucide-react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import ScrollReveal from "@/components/ScrollReveal";
import InstagramCarousel from "@/components/instagram/InstagramCarousel";
import InstagramAdmin from "@/components/instagram/InstagramAdmin";
import CtaSection from "@/components/CtaSection";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import staticImages from "@/data/instagramImages";
import AmbientParticles from "@/components/AmbientParticles";

const INSTAGRAM_URL = "https://instagram.com/convecta.pt";

export default function Instagram() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const isAdmin = useIsAdmin();

  const loadImages = async () => {
    try {
      const data = await base44.entities.InstagramImage.list("sort_order", 100);
      setImages(data.length > 0 ? data : staticImages);
    } catch {
      setImages(staticImages);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <div>
      {/* Hero — Profile layout */}
      <section style={{ backgroundColor: "#1a1a1a" }} className="pt-32 pb-16 lg:pt-40 lg:pb-20 relative overflow-hidden">
        <AmbientParticles count={6} />
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16"
          >
            {/* Left: Profile */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex justify-center md:justify-start mb-5">
                <div
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shrink-0"
                  style={{ border: "2px solid rgba(254,233,109,0.4)" }}
                >
                  <img src="/brand/convecta-avatar.jpg" alt="Convecta — software de marcações online para barbearias" loading="lazy" className="w-full h-full object-cover" />
                </div>
              </div>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-lg font-medium mb-4 transition-colors hover:opacity-80"
                style={{ color: "#fee96d" }}
              >
                <InstagramIcon size={18} />
                @convecta.pt
              </a>
              <p className="text-sm text-white/50 max-w-xs mb-6 mx-auto md:mx-0">
                Websites modernos para negócios locais. Clareza, confiança e conversão.
              </p>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wide rounded-sm transition-all hover:scale-105"
                style={{ backgroundColor: "#fee96d", color: "#1a1a1a" }}
              >
                <InstagramIcon size={16} />
                Seguir no Instagram
              </a>
            </div>

            {/* Right: Stats */}
            <div className="flex gap-8 md:gap-10">
              <div className="text-center">
                <p className="font-heading text-2xl lg:text-3xl text-white">
                  {images.length || 12}
                </p>
                <p className="text-xs text-white/40 uppercase tracking-wider mt-1">Posts</p>
              </div>
              <div className="text-center">
                <p className="font-heading text-2xl lg:text-3xl text-white">2 606</p>
                <p className="text-xs text-white/40 uppercase tracking-wider mt-1">Seguidores</p>
              </div>
              <div className="text-center">
                <p className="font-heading text-2xl lg:text-3xl text-white">1</p>
                <p className="text-xs text-white/40 uppercase tracking-wider mt-1">Seguindo</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section style={{ backgroundColor: "#1a1a1a" }} className="pb-24 lg:pb-32">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="aspect-square bg-white/5 animate-pulse rounded-sm" />
              ))}
            </div>
          ) : images.length > 0 ? (
            <InstagramCarousel images={images} />
          ) : (
            <div className="text-center text-white/40 py-16">
              <InstagramIcon size={48} className="mx-auto mb-4 opacity-30" />
              <p>Em breve novas publicações.</p>
            </div>
          )}

          {isAdmin && <InstagramAdmin images={images} onRefresh={loadImages} />}
        </div>
      </section>

      {/* CTA */}
      <CtaSection
        title="Gostas do que vês? Vê o que podemos fazer pelo teu negócio."
        buttonText="Falar Connosco"
      />
    </div>
  );
}