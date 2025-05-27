export interface FileModel {
    key?: string;
    content?: string;
    url?: string;
    type?: string
}

export interface CreateFileDTO {
  content: string;
}
