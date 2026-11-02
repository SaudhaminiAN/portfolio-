export interface EducationItem {
  degree: string;
  field?: string;
  institution: string;
  status: string;
  period?: string;
  description: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  type: string;
  skills: string[];
}
