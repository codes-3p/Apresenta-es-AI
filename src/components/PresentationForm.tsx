import React from 'react';
import { PresentationRequest } from '../types';
import { Layout, Users, MessageSquare, List, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

interface PresentationFormProps {
  onSubmit: (data: PresentationRequest) => void;
  isLoading: boolean;
}

export default function PresentationForm({ onSubmit, isLoading }: PresentationFormProps) {
  const [formData, setFormData] = React.useState<PresentationRequest>({
    topic: '',
    audience: '',
    tone: 'Profissional',
    slideCount: 7,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form id="presentation-form" onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-8 bg-white rounded-3xl shadow-2xl border border-stone-100">
      <div className="space-y-2 text-center mb-8">
        <h2 className="text-3xl font-display font-bold text-stone-900">O que vamos apresentar hoje?</h2>
        <p className="text-stone-500">Dê uma ideia e a IA cuida da estrutura.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-stone-700">
            <Layout size={16} className="text-indigo-500" />
            Tópico ou Ideia Central
          </label>
          <textarea
            id="topic-input"
            required
            rows={3}
            value={formData.topic}
            onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
            placeholder="Ex: O futuro da energia renovável no Brasil ou Plano de marketing para uma nova cafeteria..."
            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-hidden transition-all resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-stone-700">
              <Users size={16} className="text-indigo-500" />
              Público-alvo
            </label>
            <input
              id="audience-input"
              required
              value={formData.audience}
              onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
              placeholder="Ex: Investidores, Estudantes..."
              className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-hidden transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-stone-700">
              <MessageSquare size={16} className="text-indigo-500" />
              Tom de Voz
            </label>
            <select
              id="tone-select"
              value={formData.tone}
              onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-hidden transition-all bg-white"
            >
              <option>Profissional</option>
              <option>Inspirador</option>
              <option>Educativo</option>
              <option>Descontraído</option>
              <option>Persuasivo</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-stone-700">
            <List size={16} className="text-indigo-500" />
            Número de Slides: {formData.slideCount}
          </label>
          <input
            id="slide-count-range"
            type="range"
            min="3"
            max="15"
            value={formData.slideCount}
            onChange={(e) => setFormData({ ...formData, slideCount: parseInt(e.target.value) })}
            className="w-full h-2 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
        </div>
      </div>

      <button
        id="generate-presentation-btn"
        type="submit"
        disabled={isLoading}
        className={cn(
          "w-full py-4 rounded-2xl font-display font-bold text-lg transition-all flex items-center justify-center gap-2",
          isLoading 
            ? "bg-stone-100 text-stone-400 cursor-not-allowed" 
            : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-indigo-200"
        )}
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-stone-300 border-t-indigo-600 rounded-full animate-spin" />
            Criando sua apresentação...
          </>
        ) : (
          <>
            <Sparkles size={20} />
            Gerar Apresentação
          </>
        )}
      </button>
    </form>
  );
}
