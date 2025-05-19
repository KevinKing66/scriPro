import { Member } from "./create-project.model";
import { FileModel } from "./file.model";
import { simpleResearchGroup } from "./simple-researchGroup.model";
import { Participant } from '../../../../../../../backend/scri-pro/dist/evidences/entities/evidence.entity';

export interface Project{
  _id: string;
  code: string;
  owner: Member;
  image?: FileModel;
  name: string;
  evidences: Evidences[];
  description: string;
  creationDateTime: Date;
  updatedAt?: Date;
  status: 'ACTIVE' | 'COMPLETED' | 'PAUSED';
  members: Member[];
  researchGroups?: simpleResearchGroup[];
}

export interface Evidences {
  key?: string;
  url: string;
  creationDateTime: Date;
  description: string;
  content: string;
  type: string;
  participants?: Participant[];
}
