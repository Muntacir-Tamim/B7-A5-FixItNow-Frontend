export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    id: "1",
    question: "How do I book a home service?",
    answer:
      "Browse available services, choose a technician, select your preferred date and time, and submit your booking request. Once the technician accepts your request, you can complete the payment securely.",
  },
  {
    id: "2",
    question: "Are all technicians verified?",
    answer:
      "Yes. Every technician goes through a verification process before joining FixItNow. Customer ratings and reviews are also displayed to help you choose with confidence.",
  },
  {
    id: "3",
    question: "When do I pay for my booking?",
    answer:
      "You only make a payment after the technician accepts your booking request. Payments are processed securely through supported online payment gateways.",
  },
  {
    id: "4",
    question: "Can I cancel a booking?",
    answer:
      "Yes. Bookings can be cancelled before the service status changes to In Progress. After work has started, cancellation is no longer available.",
  },
  {
    id: "5",
    question: "How do I become a technician?",
    answer:
      "Create an account as a Technician, complete your profile, add your services, upload verification details, and set your availability. After approval, you'll start receiving booking requests.",
  },
  {
    id: "6",
    question: "Can I leave a review after the service?",
    answer:
      "Absolutely. After a booking is marked as Completed, you'll be able to submit a rating and review to help other customers choose the right technician.",
  },
];