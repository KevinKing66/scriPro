export interface Projects{
  code?: string;
  imageUrl?: string;
  name: string;
  evidences: Evidences[];
  description: string;
  creationDateTime: Date;
  updatedAt?: Date;
  status: 'ACTIVE' | 'COMPLETED' | 'PAUSED';
  members: {email: string, name: string}[];
  researchGroupId?: number;
}

export interface ResearchGroup {
  code: number;
  name: string;
  description: string;
  faculty?: string;
  creationDate: string;
  admin?: string;
  status: 'ACTIVE' | 'DESACTIVE';
  knowledgeArea?: string;
  contactEmail?: string;
  contactPhone?: string;
}

export interface Evidences {
  uuid: string;
  projectUuid: string;
  url: string;
  creationDateTime: Date;
  description: string;
  fileName: string;
  type: string;
}
