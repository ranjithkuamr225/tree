export interface FamilyMember {
  id: string;
  name: string;
  birthDate?: string;
  deathDate?: string;
  imageUrl?: string;
  bio?: string;
  parentIds: string[];
  spouseIds: string[];
  childrenIds: string[];
}

export interface FamilyData {
  members: Record<string, FamilyMember>;
  rootId: string;
}