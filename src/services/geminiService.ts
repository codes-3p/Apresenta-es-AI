import { GoogleGenAI, Type } from "@google/genai";
import { Presentation, PresentationRequest } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generatePresentation(req: PresentationRequest): Promise<Presentation> {
  const prompt = `
    Você é um Designer de Apresentações de Elite e Especialista em Storytelling, comparável aos melhores criadores do Presenti.ai.
    Sua missão é criar uma apresentação PROFUNDA, RICA e VISUALMENTE IMPACTANTE sobre: "${req.topic}".

    DIRETRIZES DE CONTEÚDO:
    - Não seja superficial. Pesquise conceitos profundos relacionados ao tema.
    - Público: ${req.audience}
    - Tom: ${req.tone}
    - Tema Visual: ${req.theme}

    ESTRUTURA DE CADA SLIDE:
    Cada slide deve ter uma das seguintes estruturas (layoutType):
    1. 'hero': Título grande, pouco texto, focado em impacto inicial.
    2. 'split': Texto de um lado, imagem/conceito do outro.
    3. 'grid': 3 ou 4 pontos curtos organizados em grade.
    4. 'bullets': Lista detalhada de tópicos.
    5. 'quote': Uma citação poderosa ou afirmação central.
    6. 'data': Focado em insights, métricas ou lógica.

    REQUISITOS TÉCNICOS:
    - visualKeywords: Forneça 2-3 palavras-chave em INGLÊS para busca de imagens (ex: "cybersecurity technology", "minimalist nature").
    - keyTakeaway: Uma frase curta que resume o valor do slide.
    - content: Mínimo de 3 pontos densos e informativos por slide.

    Responda em Português do Brasil seguindo o esquema JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview", // Using Pro for deeper reasoning
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            subtitle: { type: Type.STRING },
            author: { type: Type.STRING },
            theme: { type: Type.STRING },
            accentColor: { type: Type.STRING, description: "Hex color code that matches the theme" },
            slides: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  subtitle: { type: Type.STRING },
                  content: { 
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  keyTakeaway: { type: Type.STRING },
                  visualKeywords: { type: Type.STRING },
                  layoutType: { 
                    type: Type.STRING, 
                    enum: ['hero', 'split', 'grid', 'bullets', 'quote', 'data'] 
                  },
                  iconName: { type: Type.STRING, description: "Lucide icon name like 'Zap', 'Shield', 'TrendingUp'" }
                },
                required: ["title", "content", "visualKeywords", "layoutType"]
              }
            }
          },
          required: ["title", "subtitle", "slides", "theme", "accentColor", "author"]
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    return JSON.parse(text);
  } catch (error) {
    console.error("Error generating presentation:", error);
    // Fallback to flash if pro fails or is unavailable
    return generateWithFlash(req);
  }
}

async function generateWithFlash(req: PresentationRequest): Promise<Presentation> {
  // Similar logic but with gemini-3-flash-preview as fallback
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Gere uma apresentação rica sobre ${req.topic} para ${req.audience}. Use JSON.`,
    // ... (rest of the schema)
  });
  return JSON.parse(response.text || "{}");
}
