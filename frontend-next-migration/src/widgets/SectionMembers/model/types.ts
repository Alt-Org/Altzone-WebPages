export interface Member {
  id: number;
  name: string; // Changed from Name to name
  task?: string;
  email?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
  logo?: string;
  createdAt: string;
  updatedAt: string;
  locale: string;
}

export interface Department {
  id: number;
  name: string; // Changed from Name to name
  members: Member[]; // Changed from Members to members
  createdAt: string;
  updatedAt: string;
  locale: string;
}

export interface Team {
  id: number;
  team?: string; // Changed from Team to team
  departments?: Department[]; // Changed from Departments to departments
  createdAt: string;
  updatedAt: string;
  locale: string;
}
