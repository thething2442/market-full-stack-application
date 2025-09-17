'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import * as f from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import * as c from '@/components/ui/card';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { useApi } from '@/hooks/use-api';

const formSchema = z.object({
  email: z.email({
    message: 'Please enter a valid email.',
  }),
  password: z.string().min(1, {
    message: 'Password is required.',
  }),
});

export default function LoginPage() {
  const router = useRouter();
  const { loading, setLoading, error, setError } = useApi();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values) {
    setLoading(true);
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (result.error) {
        throw new Error(result.error || 'Something went wrong');
      }

      router.push('/');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <c.Card className="w-full max-w-md">
        <c.CardHeader>
          <c.CardTitle>Sign In</c.CardTitle>
        </c.CardHeader>
        <c.CardContent>
          <f.Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
          </f.Form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>
        </c.CardContent>
      </c.Card>
    </div>
  );
}