export interface FormData {
  name: string;
  style: string;
  keywords?: string;
  purpose?: string;
  elements?: string[];
  preference?: string;
}

export interface GeneratedName {
  name: string;
  explanation: string;
}
