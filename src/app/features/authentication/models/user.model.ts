export interface User{
  email: string;
  code: string;
  name: string;
  lastName: string;
  password: string;
  role: 'STUDENT' | 'TEACHER' | 'ADMIN';
  researchGroupId?: number;
  status: 'ACTIVE' | 'INACTIVE';
  docNum: string;
  docType: string;
  phone?: string;
}

export interface Role{
  code: string;
  name: string;
  status?: 'ACTIVE' | 'INACTIVE';
  permissions?: string[];
}
