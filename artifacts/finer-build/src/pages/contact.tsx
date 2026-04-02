import { PageWrapper } from "@/components/layout/PageWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail, MapPin, Phone, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(8, "Valid phone number is required"),
  email: z.string().email("Valid email is required"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Please provide more details"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const CONTACT_INFO = [
  {
    icon: Phone,
    label: "Phone",
    value: "0400 000 000",
    href: "tel:0400000000",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@finerbuild.com.au",
    href: "mailto:info@finerbuild.com.au",
  },
  {
    icon: MapPin,
    label: "Service Area",
    value: "Greater Melbourne & Surrounds",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon-Fri 7am-5pm | Sat 8am-12pm",
  },
];

export default function Contact() {
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Inquiry Sent",
        description: "Thank you for reaching out. We will get back to you shortly.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    },
  });

  function onSubmit(data: ContactFormValues) {
    mutation.mutate(data);
  }

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <SectionLabel>Contact</SectionLabel>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[1.05]">
              Let's <span className="italic text-accent">talk.</span>
            </h1>
            <p className="max-w-lg text-muted-foreground text-lg mt-6">
              Ready to start your project? Reach out and we'll get back to you within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          {/* Contact Info */}
          <motion.div
            className="lg:col-span-4 flex flex-col gap-10"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col gap-8">
              {CONTACT_INFO.map((item, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 flex items-center justify-center bg-card border border-border group-hover:border-accent/50 transition-colors duration-300 shrink-0">
                    <item.icon className="w-4 h-4 text-accent" strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className="block text-[0.6rem] font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-1">
                      {item.label}
                    </span>
                    {item.href ? (
                      <a href={item.href} className="text-foreground hover:text-accent transition-colors duration-300">
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-foreground">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative line */}
            <div className="accent-line" />

            <p className="text-sm text-muted-foreground leading-relaxed">
              We service all of Greater Melbourne including the Eastern Suburbs,
              Inner West, Northern Suburbs, and the Mornington Peninsula.
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            className="lg:col-span-8 bg-card border border-border p-8 md:p-12"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h2 className="text-2xl font-serif mb-8">Send an Inquiry</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John Doe"
                            className="h-12 bg-background border-border focus:border-accent transition-colors"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
                          Phone Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="0400 000 000"
                            className="h-12 bg-background border-border focus:border-accent transition-colors"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          className="h-12 bg-background border-border focus:border-accent transition-colors"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
                        Service Required
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12 bg-background border-border">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="border-border bg-card">
                          <SelectItem value="stick-framing">Stick Built Framing</SelectItem>
                          <SelectItem value="prefab-framing">Pre-Fab Framing</SelectItem>
                          <SelectItem value="renovations">Renovations</SelectItem>
                          <SelectItem value="decks">Decks & Pergolas</SelectItem>
                          <SelectItem value="materials">Material Supply</SelectItem>
                          <SelectItem value="other">Other / Custom</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
                        Project Details
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your project, location, and timeline..."
                          className="min-h-[140px] bg-background border-border focus:border-accent transition-colors resize-y"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full flex items-center justify-center gap-2 text-[0.7rem] font-semibold tracking-[0.12em] uppercase bg-accent text-accent-foreground px-8 py-4 hover:bg-accent/90 transition-colors duration-300 disabled:opacity-50"
                >
                  {mutation.isPending ? "Sending..." : (
                    <>Submit Inquiry <ArrowRight size={14} /></>
                  )}
                </button>
              </form>
            </Form>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
