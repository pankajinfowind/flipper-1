import { CustomerType } from '../../setup/customerType/api/CustomerType';

export class CustomizeInvoice {
id?:number;
company_name?: string;
address?: string;
contact?: string;
tax_number?: string;
logo?: string;
font_size?: number;
color?: string;
due_days?: number;
default_title?: string;
default_sub_title?: string;
default_footer?: string;
memo?: string;
items?: string;
units?: string;
price?: string;
amount?: string;
number?: string;
adherent?: string;
done_at?: string;
done_title?:string;
nom_signature_cachet?: string;
reception_title?: string;
reception_name?: string;
reception_tel?: string;
reception_date?: string;
customer_name?: string;
customer_number?: string;
customer_dob?: string;
customer_address?: string;
beneficiary?: string;
customer_type_name?: string;
hide_discount_table?: boolean;
hide_taxable_table?: boolean;
hide_total_summary_table?: boolean;
hide_reception_table?: boolean;
hide_visa?: boolean;
hide_logo?: boolean;
is_default?: boolean;
business_id?:number;
invoiceTypes?:Array<CustomerType>;

  constructor(params: Object = {}) {
    for (let name in params) {
      this[name] = params[name];
    }
  }
}
