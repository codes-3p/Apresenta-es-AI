import React from 'react';
import { Presentation, Slide } from '../types';
import { ChevronLeft, ChevronRight, Image as ImageIcon, CheckCircle2, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PresentationViewerProps {
  presentation: Presentation;
  onBack: () => void;
}

export default function PresentationViewer({ presentation, onBack }: PresentationViewerProps) {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const nextSlide = () => {
    if (currentSlide < presentation.slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const slide = presentation.slides[currentSlide];

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-display font-bold text-stone-900">{presentation.title}</h2>
          <p className="text-stone-500">{presentation.subtitle}</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={onBack}
            className="px-4 py-2 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 transition-all font-medium"
          >
            Editar Ideia
          </button>
          <button className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-all font-medium flex items-center gap-2">
            <Download size={18} />
            Exportar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1 space-y-2 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          {presentation.slides.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-full text-left p-4 rounded-xl transition-all border ${
                currentSlide === idx 
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm' 
                  : 'bg-white border-stone-100 text-stone-500 hover:border-stone-200'
              }`}
            >
              <div className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-60">Slide {idx + 1}</div>
              <div className="text-sm font-semibold truncate">{s.title}</div>
            </button>
          ))}
        </div>

        {/* Main Slide Area */}
        <div className="lg:col-span-3">
          <div className="relative aspect-video bg-white rounded-3xl shadow-2xl border border-stone-100 overflow-hidden flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex-grow p-12 flex flex-col"
              >
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-8 h-1 bg-indigo-500 rounded-full" />
                  <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest">Slide {currentSlide + 1} de {presentation.slides.length}</span>
                </div>

                <h3 className="text-4xl font-display font-bold text-stone-900 mb-8 leading-tight">
                  {slide.title}
                </h3>

                <ul className="space-y-4 flex-grow">
                  {slide.content.map((point, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3 text-lg text-stone-700"
                    >
                      <CheckCircle2 size={24} className="text-indigo-500 shrink-0 mt-0.5" />
                      {point}
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-8 p-4 bg-stone-50 rounded-2xl border border-stone-100 flex items-center gap-3">
                  <ImageIcon size={20} className="text-stone-400" />
                  <div className="text-sm text-stone-500 italic">
                    <span className="font-bold not-italic text-stone-700 mr-1">Sugestão Visual:</span>
                    {slide.visualSuggestion}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="absolute bottom-6 right-6 flex gap-2">
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="w-12 h-12 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-50 disabled:opacity-30 transition-all shadow-sm"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextSlide}
                disabled={currentSlide === presentation.slides.length - 1}
                className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white hover:bg-indigo-700 disabled:opacity-30 transition-all shadow-lg"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
