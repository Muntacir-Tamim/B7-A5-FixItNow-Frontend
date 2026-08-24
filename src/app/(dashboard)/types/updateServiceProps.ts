export interface UpdateServiceProps {
  serviceId: string;
  categoryId?: string;
  title?: string;
  description?: string;
  price?: number;
  priceType?:  "FIXED" | "HOURLY";
  estimatedDuration?: number;
  thumbnail?: string;
  isAvailable?: boolean;
}
