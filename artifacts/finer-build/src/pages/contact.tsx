import { PageWrapper } from "@/components/layout/PageWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/button";
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
  SelectValue 
} from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(8, "Valid phone number is required"),
  email: z.string().email("Valid email is required"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Please provide more details"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

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
    }
  });

  // Mock mutation for form submission
  const mutation = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      // Simulate network delay
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
    }
  });

  function onSubmit(data: ContactFormValues) {
    mutation.mutate(data);
  }

  return (
    <PageWrapper>
      <section className="pt-20 pb-12 md:pb-24 border-b border-border">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <SectionLabel>Get in Touch</SectionLabel>
          <h1 className="text-5xl md:text-7xl font-serif leading-[1.1]">
            Start your <span className="italic text-muted-foreground">project.</span>
          </h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          <div className="lg:col-span-5 flex flex-col gap-12">
            <div>
              <h2 className="text-3xl font-serif mb-6">Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Reach out to discuss your upcoming residential construction, framing, or renovation project in Greater Melbourne.
              </p>
              
              <div className="flex flex-col gap-8">
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-accent mt-1" strokeWidth={1.5} />
                  <div>
                    <span className="block text-xs font-semibold tracking-widest uppercase mb-1">Phone</span>
                    <a href="tel:0400000000" className="text-lg hover:text-accent transition-colors">0400 000 000</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-accent mt-1" strokeWidth={1.5} />
                  <div>
                    <span className="block text-xs font-semibold tracking-widest uppercase mb-1">Email</span>
                    <a href="mailto:info@finerbuild.com.au" className="text-lg hover:text-accent transition-colors">info@finerbuild.com.au</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-accent mt-1" strokeWidth={1.5} />
                  <div>
                    <span className="block text-xs font-semibold tracking-widest uppercase mb-1">Service Area</span>
                    <span className="text-lg">Greater Melbourne & Surrounds</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-accent mt-1" strokeWidth={1.5} />
                  <div>
                    <span className="block text-xs font-semibold tracking-widest uppercase mb-1">Hours</span>
                    <span className="text-lg">Mon - Fri: 7:00 AM - 5:00 PM</span><br/>
                    <span className="text-lg">Sat: 8:00 AM - 12:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-muted/30 p-8 md:p-12 border border-border">
            <h2 className="text-2xl font-serif mb-8">Send an Inquiry</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-widest">Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" className="h-12 bg-background border-border rounded-none" {...field} />
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
                        <FormLabel className="text-xs uppercase tracking-widest">Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="0400 000 000" className="h-12 bg-background border-border rounded-none" {...field} />
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
                      <FormLabel className="text-xs uppercase tracking-widest">Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" className="h-12 bg-background border-border rounded-none" {...field} />
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
                      <FormLabel className="text-xs uppercase tracking-widest">Service Required</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12 bg-background border-border rounded-none">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-none border-border">
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
                      <FormLabel className="text-xs uppercase tracking-widest">Project Details</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your project, location, and timeline..." 
                          className="min-h-[150px] bg-background border-border rounded-none resize-y" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  variant="gold" 
                  size="lg" 
                  className="w-full mt-4"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Sending..." : "Submit Inquiry"}
                </Button>
              </form>
            </Form>
          </div>

        </div>
      </section>
    </PageWrapper>
  );
}
