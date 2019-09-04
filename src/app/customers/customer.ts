import { CustomerType } from '../setup/customerType/api/CustomerType';

export interface Customer {
  full_name?: string;
  email?: string;
  customer_id?: number;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  user_id?: string;
  updated_at?: string;
  created_at?: string;
  id?: number;
  created_by?: string;
  insurance_number?: string;
  insurance_type?: string;
  insurance_percentage?: string;
  date_of_birth?: string;
  insurance_expiration_date?: string;
  organization?: string;
  cstomer_no?: string;
  department?:string;
  beneficiary?:string;
  customer_insurance_number?: string;
  create_by?: string;
  misc?: string;
  customer_type?:CustomerType;
  customer_no?:string;
  title?:string;
  gender?:string;
  status?:string;
  company?:string;
  state?:string;
  street_address_2?:string;
  street_address_3?:string;
  zip_code?:string;
  business_id?:number;
  branch_id?:number;
  customer_type_id?:number;
  dob?:Date;
  customer_created?: {
    cstomer_no: string;
    full_name: string;
    email: string;
    phone: string;
    updated_at: string;
    created_at: string;
    id: number;
  } // to be used in case you want to add anything
}
