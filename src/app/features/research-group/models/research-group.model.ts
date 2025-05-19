import { Member } from "../../projects/model/create-project.model";

export interface ResearchGroup {
  _id?: string;
  code: string;
  name: string;
  description: string;
  faculty?: string;
  creationDate?: string;
  admin?: Member;
  status: 'ACTIVE' | 'DESACTIVE';
  knowledgeArea?: string;
  contactEmail?: string;
  contactPhone?: string;
}
