export interface Logo {
  data: {
    attributes: {
      url: string;
    };
  } | null;
}
export interface Member {
  id: number;
  name: string;
  task?: string;
  email?: string;
  logo?: string | null;
  website?: string;
  github?: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
  createdAt: string;
  updatedAt: string;
  locale: string;
}

export interface Department {
  id: number;
  name: string;
  members: Member[];
}

export interface Team {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  locale: string;
  members: Member[];
  departments: Department[];
}
