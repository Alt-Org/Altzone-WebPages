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
  name: string;
  members: Member[];
  createdAt: string;
  updatedAt: string;
  locale: string;
}

export interface Team {
  id: number;
  name: string; // Pitää olla string, ei funktio
  team?: string; // Voit jättää tämän optional-ominaisuudeksi, jos se ei ole pakollinen
  departments?: Department[]; // Jos tiimillä on osastoja, tämä voi olla olemassa
  members?: Member[]; // Lisää tämä, jos tiimillä voi olla jäseniä ilman osastoja
  createdAt: string;
  updatedAt: string;
  locale: string;
}
