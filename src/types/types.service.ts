// Matches backend Prisma Service model + computed fields from service.service.ts
export interface IService {
  id: string;
  title: string;
  description: string;
  price: number;
  location?: string;
  status: "ACTIVE" | "INACTIVE";
  categoryId: string;
  technicianProfileId: string;
  createdAt: string;
  updatedAt: string;
  category?: {
    id: string;
    name: string;
    icon?: string;
    description?: string;
  };
  technicianProfile?: {
    id: string;
    profilePhoto?: string;
    bio?: string;
    user?: {
      id: string;
      name: string;
      email: string;
      phone?: string;
    };
  };
  // Computed fields if returned by backend (from getAllServices)
  averageRating?: number;
  totalReviews?: number;
}

// Booking slot type - from technician availability
export interface IBookingSlot {
  id: string;
  technicianProfileId: string;
  date: string;
  startsAt: string;
  endsAt: string;
  isAvailable: boolean;
  note?: string;
  createdAt: string;
  updatedAt: string;
}

// Booking details type - matches backend Booking model
export interface BookingDetailsProps {
  id: string;
  customerId: string;
  technicianProfileId: string;
  serviceId: string;
  scheduledDate: string;
  scheduledTime: string;
  address: string;
  note?: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  service?: {
    id: string;
    title: string;
    description: string;
    price: number;
    thumbnail?: string;
  };
  technicianProfile?: {
    id: string;
    profilePhoto?: string;
    bio?: string;
    user?: {
      name: string;
      email: string;
      phone?: string;
    };
  };
  customer?: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  };
  payment?: {
    id: string;
    status: string;
    amount: number;
    provider: string;
  } | null;
  review?: {
    id: string;
    rating: number;
    comment: string;
  } | null;
}
