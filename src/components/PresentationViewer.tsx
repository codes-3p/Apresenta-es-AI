import React from 'react';
import { Presentation, Slide, LayoutType } from '../types';
import { ChevronLeft, ChevronRight, Download, ArrowLeft, Info, Quote, BarChart3, Layers, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

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

  // Helper to get image URL from keywords
  const getImageUrl = (keywords: string) => {
    const seed = encodeURIComponent(keywords.split(' ')[0] || 'business');
    return `https://picsum.photos/seed/${seed}/1200/800`;
  };

  const themeStyles = {
    'modern-dark': 'bg-stone-950 text-white',
    'minimalist': 'bg-white text-stone-900',
    'creative': 'bg-linear-to-br from-indigo-900 via-purple-900 to-rose-900 text-white',
    'corporate': 'bg-slate-900 text-white',
  }[presentation.theme] || 'bg-white text-stone-900';

  const accentColor = presentation.accentColor || '#6366f1';

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Header */}
      <div className="glass sticky top-0 z-50 px-8 py-4 flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 rounded-full hover:bg-stone-100 transition-colors text-stone-500"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-lg font-display font-bold text-stone-900 leading-tight">{presentation.title}</h2>
            <p className="text-xs text-stone-500 font-medium">{presentation.subtitle} • Por {presentation.author}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-all font-bold text-sm flex items-center gap-2 shadow-lg shadow-indigo-100">
            <Download size={16} />
            Baixar PPTX
          </button>
        </div>
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-3 space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto pr-4 custom-scrollbar">
          <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-4">Estrutura da Apresentação</div>
          {presentation.slides.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={cn(
                "w-full text-left p-4 rounded-2xl transition-all border group relative overflow-hidden",
                currentSlide === idx 
                  ? 'bg-white border-indigo-200 shadow-md ring-1 ring-indigo-100' 
                  : 'bg-white/50 border-stone-100 text-stone-500 hover:bg-white hover:border-stone-200'
              )}
            >
              {currentSlide === idx && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600" />
              )}
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold opacity-50">0{idx + 1}</span>
                <LayoutIcon type={s.layoutType} size={12} className="opacity-40" />
              </div>
              <div className={cn("text-xs font-bold truncate", currentSlide === idx ? "text-indigo-600" : "text-stone-700")}>
                {s.title}
              </div>
            </button>
          ))}
        </div>

        {/* Main Slide Stage */}
        <div className="lg:col-span-9">
          <div className={cn(
            "relative aspect-video rounded-[2rem] shadow-2xl overflow-hidden border border-stone-200/50",
            themeStyles
          )}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute inset-0 p-16 flex flex-col"
              >
                <SlideRenderer slide={slide} accentColor={accentColor} imageUrl={getImageUrl(slide.visualKeywords)} />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Overlay */}
            <div className="absolute bottom-10 right-10 flex gap-3 z-10">
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 disabled:opacity-10 transition-all"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                onClick={nextSlide}
                disabled={currentSlide === presentation.slides.length - 1}
                className="w-14 h-14 rounded-full bg-white text-stone-900 flex items-center justify-center hover:bg-stone-100 disabled:opacity-10 transition-all shadow-xl"
              >
                <ChevronRight size={28} />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 h-1.5 bg-white/10 w-full">
              <motion.div 
                className="h-full bg-indigo-500"
                initial={{ width: 0 }}
                animate={{ width: `${((currentSlide + 1) / presentation.slides.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Slide Meta Info */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-stone-400 uppercase tracking-widest mb-3">
                <Info size={14} className="text-indigo-500" />
                Insight Estratégico
              </div>
              <p className="text-stone-700 font-medium italic">"{slide.keyTakeaway}"</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-stone-400 uppercase tracking-widest mb-3">
                <Monitor size={14} className="text-indigo-500" />
                Sugestão de Design
              </div>
              <p className="text-stone-600 text-sm">Use o layout <span className="font-bold text-indigo-600 uppercase">{slide.layoutType}</span> com imagens focadas em <span className="italic">"{slide.visualKeywords}"</span>.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LayoutIcon({ type, size, className }: { type: LayoutType, size: number, className?: string }) {
  switch (type) {
    case 'hero': return <Zap size={size} className={className} />;
    case 'split': return <Layers size={size} className={className} />;
    case 'grid': return <BarChart3 size={size} className={className} />;
    case 'bullets': return <List size={size} className={className} />;
    case 'quote': return <Quote size={size} className={className} />;
    case 'data': return <Monitor size={size} className={className} />;
    default: return <Layout size={size} className={className} />;
  }
}

function SlideRenderer({ slide, accentColor, imageUrl }: { slide: Slide, accentColor: string, imageUrl: string }) {
  switch (slide.layoutType) {
    case 'hero':
      return (
        <div className="flex flex-col items-center justify-center text-center h-full space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="w-20 h-2 bg-indigo-500 rounded-full mb-4" 
          />
          <h1 className="text-6xl font-display font-bold leading-tight max-w-4xl">
            {slide.title}
          </h1>
          <p className="text-2xl opacity-70 max-w-2xl font-light">
            {slide.subtitle || slide.content[0]}
          </p>
        </div>
      );
    
    case 'split':
      return (
        <div className="grid grid-cols-2 gap-16 h-full items-center">
          <div className="space-y-8">
            <h2 className="text-5xl font-display font-bold leading-tight">{slide.title}</h2>
            <ul className="space-y-6">
              {slide.content.map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-xl opacity-80">
                  <div className="w-2 h-2 rounded-full mt-3 shrink-0" style={{ backgroundColor: accentColor }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-full rounded-[2rem] overflow-hidden shadow-2xl">
            <img src={imageUrl} alt="Visual" className="absolute inset-0 w-full h-full object-cover" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
          </div>
        </div>
      );

    case 'grid':
      return (
        <div className="flex flex-col h-full">
          <h2 className="text-4xl font-display font-bold mb-12 text-center">{slide.title}</h2>
          <div className="grid grid-cols-3 gap-8 flex-grow">
            {slide.content.slice(0, 3).map((item, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl flex flex-col justify-center text-center space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center mx-auto mb-4">
                  <Zap size={24} className="text-indigo-400" />
                </div>
                <p className="text-lg font-medium leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      );

    case 'quote':
      return (
        <div className="flex flex-col items-center justify-center h-full text-center max-w-4xl mx-auto">
          <Quote size={80} className="opacity-20 mb-8 text-indigo-400" />
          <h2 className="text-5xl font-display font-bold italic leading-tight mb-8">
            "{slide.title}"
          </h2>
          <div className="w-16 h-1 bg-indigo-500 rounded-full mb-6" />
          <p className="text-2xl opacity-60">{slide.content[0]}</p>
        </div>
      );

    default:
      return (
        <div className="flex flex-col h-full">
          <h2 className="text-5xl font-display font-bold mb-12">{slide.title}</h2>
          <div className="grid grid-cols-1 gap-8">
            {slide.content.map((item, i) => (
              <div key={i} className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-4xl font-display font-bold opacity-20">0{i + 1}</div>
                <p className="text-xl opacity-90">{item}</p>
              </div>
            ))}
          </div>
        </div>
      );
  }
}
