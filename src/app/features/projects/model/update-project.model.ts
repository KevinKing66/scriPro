import { Member } from "./create-project.model";
import { CreateFileDTO } from "./file.model";
import { simpleResearchGroup } from "./simple-researchGroup.model";
import { CreateEvidenceDto } from '../../../../../../../backend/scri-pro/src/evidences/dto/create-evidence.dto';

export interface UpdateProject {
  code?: string | undefined;
  name?: string | undefined;
  image?: CreateFileDTO;
  members?: Member[] | undefined;
  evidences?: CreateEvidenceDto[];
  description?: string | undefined;
  status?: 'ACTIVE' | 'COMPLETED' | 'PAUSED' | undefined;
  researchGroups?: { code: string; name: string } | undefined;
}
