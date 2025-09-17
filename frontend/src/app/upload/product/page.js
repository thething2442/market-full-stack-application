'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import * as f from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import * as c from '@/components/ui/card';
import { useApi } from '@/hooks/use-api';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Product name must be at least 2 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  price: z.coerce.number().positive({ message: 'Price must be a positive number.' }),
  thumbnail: z.any(),
  photoModel1: z.any(),
  photoModel2: z.any(),
});

export default function UploadProductPage() {
  const { request, loading, error } = useApi();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      thumbnail: null,
      photoModel1: null,
      photoModel2: null,
    },
  });

  async function onSubmit(values) {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('price', values.price);
    if (values.thumbnail[0]) {
      formData.append('thumbnail', values.thumbnail[0]);
    }
    if (values.photoModel1[0]) {
      formData.append('photoModel1', values.photoModel1[0]);
    }
    if (values.photoModel2[0]) {
      formData.append('photoModel2', values.photoModel2[0]);
    }

    try {
      await request('/api/products', 'POST', formData);
      router.push('/'); // Redirect to home on success
    } catch (err) {
      // Error is already handled by the useApi hook
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <c.Card className="w-full max-w-2xl">
        <c.CardHeader>
          <c.CardTitle>Upload a New Product</c.CardTitle>
          <c.CardDescription>Fill out the form below to add a new product to the store.</c.CardDescription>
        </c.CardHeader>
        <c.CardContent>
          <f.Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <f.FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <f.FormItem>
                    <f.FormLabel>Product Name</f.FormLabel>
                    <f.FormControl>
                      <Input placeholder="e.g., Wireless Headphones" {...field} />
                    </f.FormControl>
                    <f.FormMessage />
                  </f.FormItem>
                )}
              />
              <f.FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <f.FormItem>
                    <f.FormLabel>Description</f.FormLabel>
                    <f.FormControl>
                      <Textarea placeholder="Describe the product in detail..." {...field} />
                    </f.FormControl>
                    <f.FormMessage />
                  </f.FormItem>
                )}
              />
              <f.FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <f.FormItem>
                    <f.FormLabel>Price</f.FormLabel>
                    <f.FormControl>
                      <Input type="number" placeholder="e.g., 99.99" {...field} />
                    </f.FormControl>
                    <f.FormMessage />
                  </f.FormItem>
                )}
              />
              <f.FormField
                control={form.control}
                name="thumbnail"
                render={({ field }) => (
                  <f.FormItem>
                    <f.FormLabel>Thumbnail Image</f.FormLabel>
                    <f.FormControl>
                      <Input type="file" {...form.register('thumbnail')} />
                    </f.FormControl>
                    <f.FormMessage />
                  </f.FormItem>
                )}
              />
              <f.FormField
                control={form.control}
                name="photoModel1"
                render={({ field }) => (
                  <f.FormItem>
                    <f.FormLabel>Model Photo 1</f.FormLabel>
                    <f.FormControl>
                      <Input type="file" {...form.register('photoModel1')} />
                    </f.FormControl>
                    <f.FormMessage />
                  </f.FormItem>
                )}
              />
              <f.FormField
                control={form.control}
                name="photoModel2"
                render={({ field }) => (
                  <f.FormItem>
                    <f.FormLabel>Model Photo 2</f.FormLabel>
                    <f.FormControl>
                      <Input type="file" {...form.register('photoModel2')} />
                    </f.FormControl>
                    <f.FormMessage />
                  </f.FormItem>
                )}
              />
              {error && <p className="text-sm font-medium text-destructive">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Uploading Product...' : 'Upload Product'}
              </Button>
            </form>
          </f.Form>
        </c.CardContent>
      </c.Card>
    </div>
  );
}