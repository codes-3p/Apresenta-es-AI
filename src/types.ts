export type LayoutType = 'hero' | 'split' | 'grid' | 'bullets' | 'quote' | 'data';

export interface Slide {
  title: string;
  subtitle?: string;
  content: string[];
  keyTakeaway?: string;
  visualKeywords: string; // Used to fetch relevant images
  layoutType: LayoutType;
  iconName?: string;
}

export interface Presentation {
  title: string;
  subtitle: string;
  author: string;
  slides: Slide[];
  theme: 'modern-dark' | 'minimalist' | 'creative' | 'corporate';
  accentColor: string;
}

export interface PresentationRequest {
  topic: string;
  audience: string;
  tone: string;
  slideCount: number;
  theme: string;
}
