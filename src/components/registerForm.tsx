'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { ArrowRightIcon } from '@radix-ui/react-icons';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.'
  }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().refine((val) => /^\d+$/.test(val), {
    message: 'Phone number should contain only digits'
  })
});

export function RegisterForm() {
  const [activeTab, setActiveTab] = useState('details');
  const [isPaymentTabDisabled, setIsPaymentTabDisabled] = useState(true);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: ''
    }
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    setIsPaymentTabDisabled(false);
    setActiveTab('payment');
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="w-full justify-start ">
        <TabsTrigger value="details">Enter Your Details</TabsTrigger>
        <TabsTrigger disabled={isPaymentTabDisabled ? true : false} value="payment">
          Payment
        </TabsTrigger>
      </TabsList>
      <TabsContent value="details">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
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
                    <FormLabel>Phone No</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end mt-5">
              <Button type="submit">
                Next <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </form>
        </Form>
      </TabsContent>
      <TabsContent value="payment">Change your password here.</TabsContent>
    </Tabs>
  );
}
