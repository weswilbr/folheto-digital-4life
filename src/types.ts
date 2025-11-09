export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image?: string;
  benefits?: string[];
  category?: string;
}

export interface FlyerData {
  id: string;
  title: string;
  subtitle?: string;
  company: {
    name: string;
    logo?: string;
    contact?: {
      phone?: string;
      email?: string;
      website?: string;
      address?: string;
    };
  };
  products: Product[];
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  template: 'modern' | 'classic' | 'minimal' | 'vibrant';
  createdAt: string;
  updatedAt: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
  type: 'modern' | 'classic' | 'minimal' | 'vibrant';
}
