import React from 'react';
import { Layout, Sparkles, ArrowRight, Presentation as PresentationIcon, Share2, Zap, Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import PresentationForm from './components/PresentationForm';
import PresentationViewer from './components/PresentationViewer';
import { Presentation, PresentationRequest } from './types';
import { generatePresentation } from './services/geminiService';

export default function App() {
  const [presentation, setPresentation] = React.useState<Presentation | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [view, setView] = React.useState<'landing' | 'form' | 'results'>('landing');

  const handleFormSubmit = async (data: PresentationRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await generatePresentation(data);
      setPresentation(result);
      setView('results');
    } catch (err) {
      setError('Ocorreu um erro ao gerar sua apresentação. Tente novamente.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass px-6 py-4 flex items-center justify-between">
        <div 
          id="logo"
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => setView('landing')}
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg">
            <PresentationIcon size={24} />
          </div>
          <span className="text-xl font-display font-bold tracking-tight">Presenti<span className="text-indigo-600">AI</span></span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <a href="#" className="hover:text-indigo-600 transition-colors">Funcionalidades</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Templates</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Preços</a>
        </div>

        <button 
          id="nav-cta"
          onClick={() => setView('form')}
          className="px-5 py-2.5 rounded-full bg-stone-900 text-white text-sm font-bold hover:bg-stone-800 transition-all active:scale-95"
        >
          Criar Apresentação
        </button>
      </nav>

      <main className="container mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {view === 'landing' && (
            <motion.section
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center text-center max-w-4xl mx-auto py-20"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-8">
                <Sparkles size={14} />
                A Nova Era das Apresentações
              </div>
              
              <h1 className="text-5xl md:text-7xl font-display font-bold text-stone-900 leading-tight mb-8">
                De ideias para slides <br />
                <span className="text-indigo-600">em segundos.</span>
              </h1>
              
              <p className="text-xl text-stone-500 mb-12 max-w-2xl leading-relaxed">
                O PresentiAI usa inteligência artificial para estruturar seus pensamentos em apresentações profissionais, permitindo que você foque no que importa: sua mensagem.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  id="hero-start-button"
                  onClick={() => setView('form')}
                  className="px-8 py-4 rounded-2xl bg-indigo-600 text-white font-display font-bold text-lg shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-2"
                >
                  Começar a criar
                  <ArrowRight size={20} />
                </button>
                <button
                  id="hero-demo-button"
                  className="px-8 py-4 rounded-2xl bg-white border border-stone-200 text-stone-700 font-display font-bold text-lg hover:bg-stone-50 transition-all"
                >
                  Ver exemplos
                </button>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 w-full">
                {[
                  { icon: <Zap className="text-amber-500" />, title: "Instantâneo", desc: "Gere um roteiro completo em menos de 10 segundos." },
                  { icon: <Palette className="text-indigo-500" />, title: "Design Inteligente", desc: "Sugestões visuais para cada slide automaticamente." },
                  { icon: <Share2 className="text-emerald-500" />, title: "Fácil de Compartilhar", desc: "Exporte e apresente diretamente do seu navegador." }
                ].map((item, i) => (
                  <div key={i} className="p-8 rounded-3xl bg-white border border-stone-100 shadow-sm text-left hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-2xl bg-stone-50 flex items-center justify-center mb-6">
                      {item.icon}
                    </div>
                    <h3 className="font-display font-bold text-stone-800 text-lg mb-2">{item.title}</h3>
                    <p className="text-stone-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {view === 'form' && (
            <motion.section
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="py-12"
            >
              <PresentationForm onSubmit={handleFormSubmit} isLoading={isLoading} />
              {error && (
                <p className="text-rose-500 text-center mt-6 font-medium bg-rose-50 p-4 rounded-xl max-w-md mx-auto">{error}</p>
              )}
            </motion.section>
          )}

          {view === 'results' && presentation && (
            <motion.section
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <PresentationViewer 
                presentation={presentation} 
                onBack={() => setView('form')} 
              />
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-12 mt-20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <PresentationIcon size={18} />
            </div>
            <span className="font-display font-bold">PresentiAI</span>
          </div>
          <p className="text-stone-400 text-sm">© 2024 PresentiAI. Transformando ideias em impacto.</p>
          <div className="flex gap-6 text-stone-400">
            <a href="#" className="hover:text-indigo-600 transition-colors">Termos</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacidade</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Suporte</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
