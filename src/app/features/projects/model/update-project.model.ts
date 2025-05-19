import { CreateEvidence, Member } from "./create-project.model";
import { CreateFileDTO } from "./file.model";
import { simpleResearchGroup } from "./simple-researchGroup.model";

export interface UpdateProject {
  code?: string | undefined;
  name?: string | undefined;
  image?: CreateFileDTO;
  members?: Member[] | undefined;
  evidences?: CreateEvidence[];
  description?: string | undefined;
  status?: 'ACTIVE' | 'COMPLETED' | 'PAUSED' | undefined;
  researchGroups?: simpleResearchGroup | undefined;
}
