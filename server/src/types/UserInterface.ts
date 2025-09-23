export interface User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone?: string;
  education_level?: string;
  avatar_url?: string;
  referral_link?: string;
  id_job_family?: number;
  id_role?: number;
}
