
import { IconType } from "react-icons";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

export interface FooterLink {
  label: string;
  href: string;
}

export interface SocialLink {
  icon: IconType;
  href: string;
}

export const companyLinks: FooterLink[] = [
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Find Technicians", href: "/find-technicians" },
  { label: "How It Works", href: "/how-it-works" },
];

export const supportLinks: FooterLink[] = [
  { label: "Help Center", href: "/help" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export const socialLinks: SocialLink[] = [
  {
    icon: FaFacebookF,
    href: "https://facebook.com",
  },
  {
    icon: FaXTwitter,
    href: "https://x.com",
  },
  {
    icon: FaInstagram,
    href: "https://instagram.com",
  },
  {
    icon: FaLinkedinIn,
    href: "https://linkedin.com",
  },
  {
    icon: FaGithub,
    href: "https://github.com",
  },
];