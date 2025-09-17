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

  const loginApi = useApi(async (values) => {
    const result = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (result.error) {
      throw new Error(result.error || 'Something went wrong');
    }
    router.push('/');
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values) {
    try {
      await loginApi.execute(values);
    } catch (error) {
      // Error is already set by useApi hook, no need to set it again here
      // You can add additional error handling specific to the form if needed
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
              {loginApi.error && <p className="text-sm font-medium text-destructive">{loginApi.error}</p>}
              <Button type="submit" className="w-full" disabled={loginApi.loading}>
                {loginApi.loading ? 'Signing In...' : 'Sign In'}
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
