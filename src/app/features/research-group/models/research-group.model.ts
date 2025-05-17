export interface ResearchGroup {
  code: string;
  name: string;
  description: string;
  faculty?: string;
  creationDate: string;
  admin?: string;
  status: 'ACTIVE' | 'DESACTIVE';
  knowledgeArea?: string;
  contactEmail?: string;
  contactPhone?: string;
}
