'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import * as f from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import * as c from '@/components/ui/card';
import { useHttpRequest } from '../../../hooks/use-http-request';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Product name must be at least 2 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  price: z.coerce.number().positive({ message: 'Price must be a positive number.' }),
});

export default function UploadProductPage() {
  const { request, loading, error } = useHttpRequest();
  const router = useRouter();
  const [thumbnail, setThumbnail] = useState(null);
  const [photoModel1, setPhotoModel1] = useState(null);
  const [photoModel2, setPhotoModel2] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
    },
  });

  async function onSubmit(values) {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('price', values.price);
    if (thumbnail) {
      formData.append('thumbnail', thumbnail);
    }
    if (photoModel1) {
      formData.append('photoModel1', photoModel1);
    }
    if (photoModel2) {
      formData.append('photoModel2', photoModel2);
    }

    try {
      await request('/api/products', 'POST', formData);
      router.push('/'); // Redirect to home on success
    } catch (err) {
      // Error is already handled by the useHttpRequest hook
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
              <f.FormItem>
                <f.FormLabel>Thumbnail Image</f.FormLabel>
                <f.FormControl>
                  <Input type="file" onChange={(e) => setThumbnail(e.target.files[0])} />
                </f.FormControl>
              </f.FormItem>
              <f.FormItem>
                <f.FormLabel>Model Photo 1</f.FormLabel>
                <f.FormControl>
                  <Input type="file" onChange={(e) => setPhotoModel1(e.target.files[0])} />
                </f.FormControl>
              </f.FormItem>
              <f.FormItem>
                <f.FormLabel>Model Photo 2</f.FormLabel>
                <f.FormControl>
                  <Input type="file" onChange={(e) => setPhotoModel2(e.target.files[0])} />
                </f.FormControl>
              </f.FormItem>
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
