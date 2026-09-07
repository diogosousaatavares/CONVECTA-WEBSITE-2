import React, { useState } from "react";
import { Upload, Trash2, ArrowUp, ArrowDown, Settings } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function InstagramAdmin({ images, onRefresh }) {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    setUploading(true);
    try {
      const uploaded = [];
      for (const file of files) {
        const { file_url } = await base44.integrations.Core.UploadFile({ file });
        uploaded.push({
          image_url: file_url,
          sort_order: images.length + uploaded.length,
        });
      }
      await base44.entities.InstagramImage.bulkCreate(uploaded);
      onRefresh();
    } catch (err) {
      console.error("Erro ao enviar imagens:", err);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleDelete = async (id) => {
    await base44.entities.InstagramImage.delete(id);
    onRefresh();
  };

  const handleReorder = async (index, direction) => {
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= images.length) return;
    const current = images[index];
    const swap = images[swapIndex];
    await base44.entities.InstagramImage.bulkUpdate([
      { id: current.id, sort_order: swap.sort_order },
      { id: swap.id, sort_order: current.sort_order },
    ]);
    onRefresh();
  };

  return (
    <div className="mt-12">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider border border-white/20 text-white/60 rounded-sm hover:border-mustard hover:text-mustard transition-all"
      >
        <Settings size={14} />
        {open ? "Fechar Gestão" : "Gerir Imagens"}
      </button>

      {open && (
        <div
          className="mt-6 p-6 border border-white/10 rounded-sm"
          style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
        >
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-wide">
              Gerir Galeria
            </h4>
            <label
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm cursor-pointer transition-all hover:scale-105"
              style={{ backgroundColor: "#fee96d", color: "#1a1a1a" }}
            >
              <Upload size={14} />
              {uploading ? "A enviar..." : "Adicionar Imagens"}
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {images.map((img, index) => (
              <div
                key={img.id}
                className="relative group aspect-square rounded-sm overflow-hidden border border-white/10"
              >
                <img
                  src={img.image_url}
                  alt="Publicação Convecta no Instagram"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-dark/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleReorder(index, "up")}
                      disabled={index === 0}
                      className="p-1.5 bg-white/10 hover:bg-mustard hover:text-dark rounded-sm transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-white"
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button
                      onClick={() => handleReorder(index, "down")}
                      disabled={index === images.length - 1}
                      className="p-1.5 bg-white/10 hover:bg-mustard hover:text-dark rounded-sm transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-white"
                    >
                      <ArrowDown size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(img.id)}
                      className="p-1.5 bg-white/10 hover:bg-red-500 hover:text-white rounded-sm transition-colors text-white"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <span className="text-xs text-white/40">#{index + 1}</span>
                </div>
              </div>
            ))}
          </div>

          {images.length === 0 && (
            <p className="text-center text-white/30 text-sm py-8">
              Ainda não há imagens. Adiciona a primeira.
            </p>
          )}
        </div>
      )}
    </div>
  );
}