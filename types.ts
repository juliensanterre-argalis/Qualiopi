export interface IndicatorData {
  id: number;
  criterionId: number;
  criterionName: string;
  name: string;
  type: string; // Commun / Spécifique
  specifics: {
    of: boolean;
    bc: boolean;
    vae: boolean;
    cfa: boolean;
  };
  expectedLevel: string;
  argalisHelp: string;
  proofExamples: string;
  specificObligations: string;
  subcontracting: string;
  nonCompliance: string;
  auditObservation?: string; 
  links?: { label: string; url: string }[]; 
}

export type ViewState = 
  | { type: 'static'; page: 'presentation' | 'of' | 'organigram' | 'synthesis' | 'dashboard' }
  | { type: 'indicator'; id: number };