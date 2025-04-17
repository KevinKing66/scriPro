export interface Projects{
  uuid?: string;
  imageUrl?: string;
  name: string;
  evidences: Evidences[];
  description: string;
  creationDateTime: Date;
  updatedAt?: Date;
  status: 'ACTIVE' | 'INACTIVE' | 'PAUSED';
  members: {code: string, name: string}[];
  researchGroupId?: number;
}

export interface ResearchGroup {
  id: number;
  name: string;
  description: string;
  faculty: string;
  creationDate: string;
  coordinatorId: number;
  status: 'ACTIVE' | 'INACTIVE' | 'PAUSED';
  knowledgeArea: string;
  contactEmail: string;
  contactPhone?: string;
  url?: string;
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
