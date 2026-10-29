export enum CodeCategory {
  All = 'all',
  Engine = 'engine',
  AirFuel = 'air-fuel',
  Electrical = 'electrical',
  Temperature = 'temperature',
}

export enum DetailKind {
  Code = 'code',
  Guide = 'guide',
}

export interface TroubleCode {
  code: string;
  title: string;
  category: Exclude<CodeCategory, CodeCategory.All>;
  summary: string;
  meaning: string;
  causes: string[];
  checks: string[];
  warning: string;
}

export interface GuideSection {
  heading: string;
  body: string;
}

export interface FieldGuide {
  id: string;
  icon: string;
  title: string;
  type: string;
  summary: string;
  time: string;
  search: string;
  sections: GuideSection[];
}

export interface SymptomItem {
  index: string;
  icon: string;
  title: string;
  subtitle: string;
  query: string;
}

export interface SearchResultItem {
  kind: DetailKind;
  id: string;
  badge: string;
  title: string;
  summary: string;
  meta: string;
}

export interface DetailSelection {
  kind: DetailKind;
  id: string;
}
