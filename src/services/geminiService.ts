import { GoogleGenAI, Type } from "@google/genai";
import { Presentation, PresentationRequest } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generatePresentation(req: PresentationRequest): Promise<Presentation> {
  const prompt = `
    Atue como um designer de apresentações e especialista em storytelling.
    Crie uma estrutura de apresentação detalhada sobre o tópico: "${req.topic}".
    
    Contexto adicional:
    - Público-alvo: ${req.audience}
    - Tom de voz: ${req.tone}
    - Número de slides desejado: ${req.slideCount}

    Para cada slide, forneça um título claro, uma lista de 3 a 5 pontos-chave (bullets) e uma sugestão de elemento visual (ex: gráfico, imagem de alta qualidade, diagrama).
    
    A resposta deve ser em Português do Brasil e seguir estritamente o esquema JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            subtitle: { type: Type.STRING },
            theme: { type: Type.STRING },
            slides: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  content: { 
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  visualSuggestion: { type: Type.STRING }
                },
                required: ["title", "content", "visualSuggestion"]
              }
            }
          },
          required: ["title", "subtitle", "slides", "theme"]
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    return JSON.parse(text);
  } catch (error) {
    console.error("Error generating presentation:", error);
    throw error;
  }
}
