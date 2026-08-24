import {
  Search,
  UserCheck,
  CalendarClock,
  CreditCard,
  BadgeCheck,
} from "lucide-react";

import { LucideIcon } from "lucide-react";

export interface BookingStep {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const bookingSteps: BookingStep[] = [
  {
    id: 1,
    title: "Search Service",
    description: "Browse trusted home services near you.",
    icon: Search,
  },
  {
    id: 2,
    title: "Choose Technician",
    description: "Compare ratings and hire the best professional.",
    icon: UserCheck,
  },
  {
    id: 3,
    title: "Pick Time Slot",
    description: "Select your preferred date and available time.",
    icon: CalendarClock,
  },
  {
    id: 4,
    title: "Book & Pay",
    description: "Confirm your booking with secure online payment.",
    icon: CreditCard,
  },
  {
    id: 5,
    title: "Job Completed",
    description: "Track the job and leave a review afterwards.",
    icon: BadgeCheck,
  },
];