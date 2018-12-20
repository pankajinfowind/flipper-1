export interface Customer {
  full_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  user_id: string;
  updated_at?: string;
  created_at: string;
  id?: number;
  created_by?: string;
  insurance_number?: string;
  insurance_type?: string;
  insurance_percentage?: string;
  date_of_birth?: string;
  insurance_expiration_date?: string;
  organization?: string;
  cstomer_no?: string;
  customer_insurance_number?: string;
  create_by?: string;
  misc?: string; // to be used in case you want to add anything
}
