import { Member } from "./create-project.model";
import { CreateFileDTO } from "./file.model";
import { simpleResearchGroup } from "./simple-researchGroup.model";

export interface CreateProject {
  image?: CreateFileDTO;
  name?: string;
  type?: string;
  description?: string;
  creationDateTime?: Date;
  status?: 'ACTIVE' | 'COMPLETED' | 'PAUSED';
  members?: Member[];
  researchGroups?: simpleResearchGroup[];
  adminId?: Member;
}
