import React, { useState, useEffect } from "react";
import { Instagram as InstagramIcon } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import InstagramCarousel from "@/components/instagram/InstagramCarousel";
import CtaSection from "@/components/CtaSection";
import staticImages from "@/data/instagramImages";
import AmbientParticles from "@/components/AmbientParticles";
import Seo from "@/components/Seo";
import { SITE } from "@/lib/seo";

const INSTAGRAM_URL = SITE.instagram;

export default function Instagram() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  // As fotos vivem em /public/instagram e em data/instagramImages. Trocar uma
  // e trocar o ficheiro; deixou de haver painel de administracao no site.
  useEffect(() => {
    setImages(staticImages);
    setLoading(false);
  }, []);

  return (
    <div>
      <Seo
        titulo="A Convecta no Instagram"
        descricao="Bastidores, novidades da app e as barbearias que já marcam online com a Convecta. Segue @convecta.pt."
        caminho="/instagram"
        noindex
      />
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
                {SITE.instagramHandle}
              </a>
              <p className="text-sm text-white/50 max-w-xs mb-6 mx-auto md:mx-0">
                Marcações online e gestão para barbearias. Os teus clientes marcam sozinhos; tu só cortas. Experimenta a demonstração — o link está na bio.
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

            {/* Os numeros de seguidores mudam todos os dias; escritos aqui
                ficavam sempre errados. O Instagram mostra-os. */}
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

        </div>
      </section>

      {/* CTA */}
      <CtaSection
        title="Vê a Convecta a funcionar, não só em fotografias."
        buttonText="Experimentar a demonstração"
        href={SITE.demoCliente}
        secondaryText="ou fala connosco"
      />
    </div>
  );
}