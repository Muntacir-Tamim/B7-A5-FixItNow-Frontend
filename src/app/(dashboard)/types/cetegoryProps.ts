export interface Category {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  createdAt: string;
  updatedAt: string;
  _count?: { services: number };
}

export interface CategoryProps {
  category: Category;
}
