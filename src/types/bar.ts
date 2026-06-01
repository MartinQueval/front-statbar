export const NoteCategory = {
  DRINK: 'DRINK',
  AFFORDABILITY: 'AFFORDABILITY',
  VIBES: 'VIBES',
  DECORATION: 'DECORATION',
} as const;

export type NoteCategory = (typeof NoteCategory)[keyof typeof NoteCategory];

export const NOTE_CATEGORIES: NoteCategory[] = [
  NoteCategory.DRINK,
  NoteCategory.AFFORDABILITY,
  NoteCategory.VIBES,
  NoteCategory.DECORATION,
];

export const NOTE_CATEGORY_LABELS: Record<NoteCategory, string> = {
  [NoteCategory.DRINK]: 'Boissons',
  [NoteCategory.AFFORDABILITY]: 'Tarifs',
  [NoteCategory.VIBES]: 'Ambiance',
  [NoteCategory.DECORATION]: 'Déco',
};

export interface Note {
  category: NoteCategory;
  value: number;
}

export interface Bar {
  _id: string;
  name: string;
  lat: number;
  lng: number;
  note: Note[];
  moy: number;
  createdAt?: string;
  updatedAt?: string;
}

export type BarInput = Omit<Bar, '_id' | 'moy' | 'createdAt' | 'updatedAt'>;
