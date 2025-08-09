import { Company } from '../data';

export type CompanySize = 'Very Small' | 'Small' | 'Medium' | 'Big' | 'Very Big';

export const getCompanySize = (company: Company): CompanySize => {
  if (company.employeeCount > 20000 && company.revenue > 10000) {
    return 'Very Big';
  }
  if (company.employeeCount > 5000 && company.revenue > 1000) {
    return 'Big';
  }
  if (company.employeeCount > 500 && company.revenue > 50) {
    return 'Medium';
  }
  if (company.employeeCount > 20 && company.revenue > 2) {
    return 'Small';
  }
  return 'Very Small';
};
