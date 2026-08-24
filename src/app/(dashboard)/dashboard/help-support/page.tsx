"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  CalendarCheck,
  CreditCard,
  UserRound,
  Wrench,
  MessageCircle,
  Mail,
  Phone,
  ChevronDown,
  FileQuestion,
  LifeBuoy,
  ArrowRight,
  Clock3,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Badge } from "@/components/ui/badge";

const helpCategories = [
  {
    title: "Bookings & Services",
    description:
      "Get help with booking technicians, changing schedules, and service requests.",
    icon: CalendarCheck,
  },
  {
    title: "Payments & Refunds",
    description: "Questions about payments, invoices, refunds, and checkout.",
    icon: CreditCard,
  },
  {
    title: "Account & Profile",
    description:
      "Manage your account, profile information, password, and security.",
    icon: UserRound,
  },
  {
    title: "Technician Issues",
    description:
      "Report problems or concerns related to a technician or service.",
    icon: Wrench,
  },
];

const faqs = [
  {
    question: "How do I book a service?",
    answer:
      "Browse available services, select the service you need, choose a qualified technician, select an available time slot, and continue to checkout to complete your booking.",
  },
  {
    question: "Can I cancel my booking?",
    answer:
      "Yes. You can cancel a booking from your Bookings page as long as the booking has not progressed to an active service stage. Cancellation eligibility may depend on the booking status.",
  },
  {
    question: "How can I reschedule a service?",
    answer:
      "Open your booking details and check whether rescheduling is available for that booking. If you cannot reschedule it yourself, contact our support team for assistance.",
  },
  {
    question: "When do I need to pay?",
    answer:
      "Payment is completed through the checkout process after selecting your service and technician. Your booking status and payment status will be visible from your dashboard.",
  },
  {
    question: "How do I request a refund?",
    answer:
      "Contact FixItNow support with your booking information and explain the reason for the refund request. Our support team will review your request according to the applicable refund policy.",
  },
  {
    question: "What should I do if a technician does not arrive?",
    answer:
      "First, check your booking details and scheduled time. If the technician does not arrive or you cannot contact them, contact FixItNow support so we can investigate the issue.",
  },
  {
    question: "Can I leave a review for my technician?",
    answer:
      "Yes. After your service has been completed, you can submit a review from the relevant booking or review section of your dashboard.",
  },
  {
    question: "How do I change my account information?",
    answer:
      "Go to Dashboard → Settings → Profile. From there you can update your name, phone number, address, and other supported account information.",
  },
];

const supportRequests = [
  {
    id: "SUP-1024",
    subject: "Booking cancellation issue",
    status: "IN_PROGRESS",
    date: "Aug 9, 2026",
  },
  {
    id: "SUP-1018",
    subject: "Payment confirmation",
    status: "RESOLVED",
    date: "Aug 6, 2026",
  },
];

export default function CustomerHelpSupportPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaqs = faqs.filter((faq) => {
    const search = searchTerm.toLowerCase();

    return (
      faq.question.toLowerCase().includes(search) ||
      faq.answer.toLowerCase().includes(search)
    );
  });

  return (
    <div className="min-h-full bg-background">
      <div className="mx-auto w-full max-w-7xl space-y-8 p-4 sm:p-6 lg:p-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Help & Support
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Find answers, get help with your bookings, or contact our support
            team.
          </p>
        </div>

        <Card className="overflow-hidden border-primary/20">
          <CardContent className="relative p-6 sm:p-8 lg:p-10">
            <div className="absolute right-0 top-0 -z-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <LifeBuoy className="h-7 w-7 text-primary" />
              </div>

              <h2 className="mt-5 text-2xl font-bold sm:text-3xl">
                How can we help?
              </h2>

              <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
                Search our help center or browse the topics below to find the
                information you need.
              </p>

              <div className="relative mx-auto mt-6 max-w-2xl">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for answers..."
                  className="h-12 rounded-xl pl-12 pr-4 shadow-sm"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <section>
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Browse Help Topics</h2>

            <p className="text-sm text-muted-foreground">
              Find help based on what you need.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {helpCategories.map((category) => {
              const Icon = category.icon;

              return (
                <Card
                  key={category.title}
                  className="group cursor-pointer transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                >
                  <CardContent className="p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>

                    <h3 className="mt-4 font-semibold">{category.title}</h3>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {category.description}
                    </p>

                    <div className="mt-4 flex items-center text-sm font-medium text-primary">
                      View help
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
          {/* FAQ */}
          <Card>
            <CardHeader>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <FileQuestion className="h-5 w-5 text-primary" />
                </div>

                <div>
                  <CardTitle>Frequently Asked Questions</CardTitle>

                  <CardDescription className="mt-1">
                    Find quick answers to common questions.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {filteredFaqs.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem key={faq.question} value={`faq-${index}`}>
                      <AccordionTrigger className="text-left text-sm font-medium hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>

                      <AccordionContent className="text-sm leading-6 text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="py-10 text-center">
                  <Search className="mx-auto h-8 w-8 text-muted-foreground" />

                  <h3 className="mt-3 font-medium">No results found</h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Try searching with different keywords.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* CONTACT SUPPORT */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Still need help?</CardTitle>

              <CardDescription>
                Our support team is here to help you.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              {/* Chat */}
              <Button
                className="h-auto w-full justify-start gap-3 p-4"
                variant="outline"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <MessageCircle className="h-4 w-4 text-primary" />
                </div>

                <div className="text-left">
                  <p className="font-medium">Live Chat</p>

                  <p className="text-xs text-muted-foreground">
                    Chat with our support team
                  </p>
                </div>
              </Button>

              {/* Email */}
              <Button
                className="h-auto w-full justify-start gap-3 p-4"
                variant="outline"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="h-4 w-4 text-primary" />
                </div>

                <div className="text-left">
                  <p className="font-medium">Email Support</p>

                  <p className="text-xs text-muted-foreground">
                    support@fixitnow.com
                  </p>
                </div>
              </Button>

              <Button
                className="h-auto w-full justify-start gap-3 p-4"
                variant="outline"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <Phone className="h-4 w-4 text-primary" />
                </div>

                <div className="text-left">
                  <p className="font-medium">Call Support</p>

                  <p className="text-xs text-muted-foreground">
                    +880 1XXX-XXXXXX
                  </p>
                </div>
              </Button>

              <div className="mt-4 rounded-lg bg-muted/50 p-4">
                <div className="flex gap-3">
                  <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />

                  <div>
                    <p className="text-sm font-medium">Support Hours</p>

                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      Saturday – Thursday
                      <br />
                      9:00 AM – 9:00 PM
                    </p>
                  </div>
                </div>
              </div>

              <Button className="w-full gap-2">
                Contact Support
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>My Support Requests</CardTitle>

                <CardDescription>
                  Track your previous support conversations.
                </CardDescription>
              </div>

              <Button variant="outline" className="w-full sm:w-auto">
                View All Requests
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            {supportRequests.length > 0 ? (
              <div className="space-y-3">
                {supportRequests.map((request) => (
                  <div
                    key={request.id}
                    className="flex flex-col gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/40 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <MessageCircle className="h-4 w-4 text-muted-foreground" />
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-sm font-medium">
                            {request.subject}
                          </h3>

                          <Badge
                            variant={
                              request.status === "RESOLVED"
                                ? "secondary"
                                : "default"
                            }
                            className="text-[10px]"
                          >
                            {request.status === "IN_PROGRESS"
                              ? "In Progress"
                              : "Resolved"}
                          </Badge>
                        </div>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {request.id} • {request.date}
                        </p>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full sm:w-auto"
                    >
                      View Request
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <MessageCircle className="mx-auto h-8 w-8 text-muted-foreground" />

                <p className="mt-3 font-medium">No support requests</p>

                <p className="mt-1 text-sm text-muted-foreground">
                  You haven't submitted any support requests yet.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-orange-500/30 bg-orange-500/5">
          <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-semibold">Need urgent home service?</h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Browse available technicians and find a professional for your
                service.
              </p>
            </div>

            <Button asChild className="w-full sm:w-auto">
              <Link href="/find-technicians">
                Find a Technician
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
