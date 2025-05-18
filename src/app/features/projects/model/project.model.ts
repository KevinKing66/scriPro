import { Member } from "./create-project.model";
import { FileModel } from "./file.model";
import { simpleResearchGroup } from "./simple-researchGroup.model";

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
  uuid: string;
  projectUuid: string;
  url: string;
  creationDateTime: Date;
  description: string;
  fileName: string;
  type: string;
}
