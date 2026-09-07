import React, { useState, useEffect } from "react";
import { Instagram } from "lucide-react";
import { base44 } from "@/api/base44Client";
import ScrollReveal from "@/components/ScrollReveal";
import InstagramCarousel from "@/components/instagram/InstagramCarousel";
import staticImages from "@/data/instagramImages";

const INSTAGRAM_URL = "https://instagram.com/convecta.pt";
const LOGO_URL = "/brand/convecta-avatar.jpg";

export default function InstagramSection() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await base44.entities.InstagramImage.list("sort_order", 20);
        setImages(data.length > 0 ? data.slice(0, 6) : staticImages.slice(0, 6));
      } catch {
        setImages(staticImages.slice(0, 6));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <section style={{ backgroundColor: "#1a1a1a" }} className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Profile header */}
        <ScrollReveal>
          <div className="max-w-2xl mx-auto mb-14">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
              {/* Avatar */}
              <div
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shrink-0"
                style={{ border: "2px solid rgba(254,233,109,0.4)" }}
              >
                <img src={LOGO_URL} alt="Convecta — software de marcações online para barbearias" loading="lazy" className="w-full h-full object-cover" />
              </div>

              {/* Name + stats + bio */}
              <div className="flex-1">
                <h2 className="font-heading text-xl lg:text-2xl text-white mb-1">
                  Convecta | Arquitetura de Conversão
                </h2>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-80 mb-4"
                  style={{ color: "#fee96d" }}
                >
                  <Instagram size={14} />
                  @convecta.pt
                </a>

                <div className="flex justify-center sm:justify-start gap-8 mb-4">
                  <div>
                    <span className="font-heading text-lg text-white">12</span>{" "}
                    <span className="text-xs text-white/40">posts</span>
                  </div>
                  <div>
                    <span className="font-heading text-lg text-white">2 606</span>{" "}
                    <span className="text-xs text-white/40">followers</span>
                  </div>
                  <div>
                    <span className="font-heading text-lg text-white">1</span>{" "}
                    <span className="text-xs text-white/40">following</span>
                  </div>
                </div>

                <p className="text-sm text-white/50 leading-relaxed">
                  Websites modernos para negócios locais.
                  <br />
                  Clareza, confiança e conversão.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-3xl mx-auto">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-square bg-white/5 animate-pulse rounded-sm" />
              ))}
            </div>
          ) : images.length > 0 ? (
            <InstagramCarousel images={images} />
          ) : (
            <div className="text-center text-white/40 py-12">
              Em breve novas publicações.
            </div>
          )}
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="text-center mt-10">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold uppercase tracking-wide border border-white/30 text-white rounded-sm hover:border-white hover:bg-white/5 transition-all"
            >
              <Instagram size={16} />
              Ver todos os posts
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}