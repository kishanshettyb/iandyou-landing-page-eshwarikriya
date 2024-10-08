'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { PhoneInput } from '@/components/ui/phone-input';
import { isValidPhoneNumber } from 'react-phone-number-input';
import Image from 'next/image';
import PaymentButton from './payment-button';
import Modal from './modal';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.'
  }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().refine(isValidPhoneNumber, { message: 'Invalid phone number' })
});

export function RegisterForm() {
  const [activeTab, setActiveTab] = useState('details');
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

  // State to store form values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isPaymentTabDisabled, setIsPaymentTabDisabled] = useState(true);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: ''
    }
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log('values' + values);
    setFormData(values);
    setIsPaymentTabDisabled(false);
    setActiveTab('payment');
  }

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      description="Enter below details to register"
      triggerVariant="default"
      triggerLabel="Register"
      title="Register Now"
    >
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
              <div className="space-y-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start">
                      <FormLabel className="text-left">Mobile Number (Whatsapp)</FormLabel>
                      <FormControl className="w-full">
                        <PhoneInput
                          defaultCountry="IN"
                          placeholder="Enter a phone number"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        You will get update on your Whatsapp{' '}
                        <Image
                          className="w-[20px] h-[20px] inline-block"
                          width={20}
                          height={20}
                          src="/whatsapp.svg"
                          alt="whatsapp"
                        />
                      </FormDescription>
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
                        <Input placeholder="Email" {...field} />
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
        <TabsContent value="payment">
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-md font-semi-bold mb-4">Eashwari Kriya Workshop</p>
            <div className="border  rounded-lg">
              <div className="p-3 flex justify-between   ">
                <div>
                  <p className="text-sm">Total Payable:</p>
                </div>
                <div>
                  <p className="text-sm">3,000/-</p>
                </div>
              </div>
            </div>
            <div>
              <PaymentButton
                closeModal={closeModal}
                name={formData.name}
                email={formData.email}
                phone={formData.phone}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Modal>
  );
}
