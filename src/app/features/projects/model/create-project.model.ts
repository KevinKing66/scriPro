export interface CreateProject {
  code: string;
  imageUrl?: string;
  name: string;
  type?: string;
  evidences: CreateEvidence[];
  description: string;
  creationDateTime?: Date;
  status: 'ACTIVE' | 'COMPLETED' | 'PAUSED';
  members: Member[];
  researchGroupId: Member;
  adminId: Member;
}

export interface CreateEvidence {
  key?: string;
  content: string;
  type: string;
  creationDateTime?: Date;
  description: string;
  participants?: Member[];
}

export interface Member {
  _id?: string;
  name: string;
  email: string;
}
