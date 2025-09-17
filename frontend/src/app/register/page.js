'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import * as f from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import * as c from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useApi } from '@/hooks/use-api';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.email({
    message: 'Please enter a valid email.',
  }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character." }),
});

export default function RegisterPage() {
  const router = useRouter();
  const { request, loading, error, setData } = useApi();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  async function onSubmit(values) {
    try {
      await request('/api/register', 'POST', values);

      const signInResponse = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (signInResponse.error) {
        throw new Error(signInResponse.error);
      }
      
      router.push('/');
      router.refresh();

    } catch (error) {
      setData(null); // Clear data on error
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <c.Card className="w-full max-w-md">
        <c.CardHeader>
          <c.CardTitle>Create an Account</c.CardTitle>
        </c.CardHeader>
        <c.CardContent>
          <f.Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <f.FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <f.FormItem>
                    <f.FormLabel>Name</f.FormLabel>
                    <f.FormControl>
                      <Input placeholder="Your Name" {...field} />
                    </f.FormControl>
                    <f.FormMessage />
                  </f.FormItem>
                )}
              />
              <f.FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <f.FormItem>
                    <f.FormLabel>Email</f.FormLabel>
                    <f.FormControl>
                      <Input placeholder="your.email@example.com" {...field} />
                    </f.FormControl>
                    <f.FormMessage />
                  </f.FormItem>
                )}
              />
              <f.FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <f.FormItem>
                    <f.FormLabel>Password</f.FormLabel>
                    <f.FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </f.FormControl>
                    <f.FormMessage />
                  </f.FormItem>
                )}
              />
              {error && <p className="text-sm font-medium text-destructive">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
          </f.Form>
        </c.CardContent>
      </c.Card>
    </div>
  );
}