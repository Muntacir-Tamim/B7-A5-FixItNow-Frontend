import { Clock3, Mail, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    value: "+880 1234-567890",
    description: "Mon - Sat, 9:00 AM - 6:00 PM",
  },
  {
    icon: Mail,
    title: "Email",
    value: "support@fixitnow.com",
    description: "We'll respond within 24 hours",
  },
  {
    icon: MapPin,
    title: "Office",
    value: "Dhaka, Bangladesh",
    description: "Visit us during business hours",
  },
  {
    icon: Clock3,
    title: "Working Hours",
    value: "9:00 AM - 6:00 PM",
    description: "Sunday - Thursday",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Contact Us
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Have questions or need assistance? We'd love to hear from you. Send
            us a message and our team will get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((item) => {
              const Icon = item.icon;

              return (
                <Card
                  key={item.title}
                  className="transition-shadow hover:shadow-lg"
                >
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>

                    <div>
                      <h3 className="font-semibold">{item.title}</h3>

                      <p className="mt-1 font-medium">{item.value}</p>

                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Contact Form */}
          <Card className="lg:col-span-2">
            <CardContent className="p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold">Send us a Message</h2>

                <p className="mt-2 text-muted-foreground">
                  Fill out the form below and we'll get back to you shortly.
                </p>
              </div>

              <form className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>

                    <Input
                      id="name"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>

                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>

                  <Input
                    id="subject"
                    placeholder="Enter subject"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>

                  <Textarea
                    id="message"
                    rows={7}
                    placeholder="Write your message here..."
                  />
                </div>

                <Button
                  size="lg"
                  className="w-full"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Google Map */}
      <section className="container mx-auto px-4 pb-20">
        <Card className="overflow-hidden shadow-lg">
          <CardContent className="p-0">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3746527.4526794753!2d90.3443647!3d23.506657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x873e6f297b14503f%3A0x97f78b950ef58dd6!2sAyan%20Sujon!5e0!3m2!1sen!2sbd!4v1785755377172!5m2!1sen!2sbd"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              className="w-full"
            />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}