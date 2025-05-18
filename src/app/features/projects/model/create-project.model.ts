import { CreateFileDTO } from "./file.model";
import { simpleResearchGroup } from "./simple-researchGroup.model";

export interface CreateProject {
  code: string;
  onwer: Member;
  name: string;
  image?: CreateFileDTO;
  type?: string;
  evidences: CreateEvidence[];
  description: string;
  creationDateTime?: Date;
  status: 'ACTIVE' | 'COMPLETED' | 'PAUSED';
  members: Member[];
  researchGroup: simpleResearchGroup[];
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
