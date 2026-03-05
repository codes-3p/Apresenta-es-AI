import React from 'react';
import { PresentationRequest } from '../types';
import { Layout, Users, MessageSquare, List, Sparkles, Palette } from 'lucide-react';
import { cn } from '../lib/utils';

interface PresentationFormProps {
  onSubmit: (data: PresentationRequest) => void;
  isLoading: boolean;
}

const THEMES = [
  { id: 'modern-dark', name: 'Modern Dark', color: 'bg-stone-900' },
  { id: 'minimalist', name: 'Minimalist White', color: 'bg-white border border-stone-200' },
  { id: 'creative', name: 'Creative Gradient', color: 'bg-linear-to-r from-indigo-500 to-purple-500' },
  { id: 'corporate', name: 'Corporate Blue', color: 'bg-blue-700' },
];

export default function PresentationForm({ onSubmit, isLoading }: PresentationFormProps) {
  const [formData, setFormData] = React.useState<PresentationRequest>({
    topic: '',
    audience: '',
    tone: 'Profissional',
    slideCount: 8,
    theme: 'modern-dark',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form id="presentation-form" onSubmit={handleSubmit} className="space-y-8 max-w-3xl mx-auto p-10 bg-white rounded-[2.5rem] shadow-2xl border border-stone-100">
      <div className="space-y-3 text-center mb-10">
        <h2 className="text-4xl font-display font-bold text-stone-900 tracking-tight">Crie algo extraordinário</h2>
        <p className="text-stone-500 text-lg">Transforme sua visão em uma apresentação de alto impacto.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-bold text-stone-700 uppercase tracking-wider">
            <Layout size={16} className="text-indigo-600" />
            Qual o tema da sua apresentação?
          </label>
          <textarea
            id="topic-input"
            required
            rows={4}
            value={formData.topic}
            onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
            placeholder="Descreva seu tópico com detalhes para melhores resultados..."
            className="w-full px-5 py-4 rounded-2xl border border-stone-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-hidden transition-all resize-none text-lg"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-bold text-stone-700 uppercase tracking-wider">
              <Users size={16} className="text-indigo-600" />
              Para quem você vai falar?
            </label>
            <input
              id="audience-input"
              required
              value={formData.audience}
              onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
              placeholder="Ex: Diretoria, Clientes, Alunos..."
              className="w-full px-5 py-4 rounded-2xl border border-stone-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-hidden transition-all"
            />
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-bold text-stone-700 uppercase tracking-wider">
              <MessageSquare size={16} className="text-indigo-600" />
              Qual o tom desejado?
            </label>
            <select
              id="tone-select"
              value={formData.tone}
              onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
              className="w-full px-5 py-4 rounded-2xl border border-stone-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-hidden transition-all bg-white"
            >
              <option>Profissional e Executivo</option>
              <option>Inspirador e Visionário</option>
              <option>Educativo e Detalhado</option>
              <option>Criativo e Ousado</option>
              <option>Persuasivo e Direto</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-2 text-sm font-bold text-stone-700 uppercase tracking-wider">
            <Palette size={16} className="text-indigo-600" />
            Escolha um Estilo Visual
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {THEMES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setFormData({ ...formData, theme: t.id })}
                className={cn(
                  "flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all",
                  formData.theme === t.id 
                    ? "border-indigo-600 bg-indigo-50/50" 
                    : "border-stone-100 hover:border-stone-200"
                )}
              >
                <div className={cn("w-full aspect-video rounded-lg shadow-sm", t.color)} />
                <span className="text-xs font-bold text-stone-600">{t.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4 bg-stone-50 p-6 rounded-2xl border border-stone-100">
          <label className="flex items-center justify-between text-sm font-bold text-stone-700 uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <List size={16} className="text-indigo-600" />
              Extensão da Apresentação
            </div>
            <span className="text-indigo-600 font-mono">{formData.slideCount} Slides</span>
          </label>
          <input
            id="slide-count-range"
            type="range"
            min="5"
            max="15"
            step="1"
            value={formData.slideCount}
            onChange={(e) => setFormData({ ...formData, slideCount: parseInt(e.target.value) })}
            className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <div className="flex justify-between text-[10px] text-stone-400 font-bold uppercase tracking-widest">
            <span>Rápida</span>
            <span>Equilibrada</span>
            <span>Completa</span>
          </div>
        </div>
      </div>

      <button
        id="generate-presentation-btn"
        type="submit"
        disabled={isLoading}
        className={cn(
          "w-full py-5 rounded-2xl font-display font-bold text-xl transition-all flex items-center justify-center gap-3",
          isLoading 
            ? "bg-stone-100 text-stone-400 cursor-not-allowed" 
            : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-200 hover:scale-[1.01] active:scale-[0.99]"
        )}
      >
        {isLoading ? (
          <>
            <div className="w-6 h-6 border-3 border-stone-300 border-t-indigo-600 rounded-full animate-spin" />
            Arquitetando sua apresentação...
          </>
        ) : (
          <>
            <Sparkles size={24} />
            Gerar Apresentação Premium
          </>
        )}
      </button>
    </form>
  );
}
