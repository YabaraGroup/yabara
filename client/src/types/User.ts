export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  avatar_url?: string;
  account_type: 'talent' | 'company' | 'admin';
  id_company?: number;
  identification?: string;
  phone?: string;
  education_level?: 'none' | 'high_school' | 'bachelor' | 'master' | 'doctorate';
  referral_link?: string;
}
