import { Member } from "./create-project.model";

export interface CreateProject {
  imageUrl?: string;
  name?: string;
  type?: string;
  description?: string;
  creationDateTime?: Date;
  status?: 'ACTIVE' | 'COMPLETED' | 'PAUSED';
  members?: Member[];
  researchGroupId?: Member;
  adminId?: Member;
}
