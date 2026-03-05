export interface Slide {
  title: string;
  content: string[];
  visualSuggestion: string;
}

export interface Presentation {
  title: string;
  subtitle: string;
  slides: Slide[];
  theme: string;
}

export interface PresentationRequest {
  topic: string;
  audience: string;
  tone: string;
  slideCount: number;
}
