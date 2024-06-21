"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

import { createPengantarSkck } from "@/actions/surat/pengantar-skck";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  pendudukId: z.string().min(1),
  no_surat: z.string().min(1),
  keperluan: z.string().min(1),
});

export const PengantarSkckForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pendudukId: "",
      no_surat: "",
      keperluan: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      values.pendudukId = btoa(values.pendudukId);
      values.no_surat = btoa(values.no_surat);
      values.keperluan = values.keperluan.toUpperCase();
      startTransition(() => {
        createPengantarSkck(values).then((response) => {
          if (response.data === null) {
            toast.error(response.message);
          } else {
            toast.success(response.message);
            router.refresh();
          }
        });
      });
    } catch (err: any) {
      toast.error(err.response.data);
    }
  };
  return (
    <nav className="w-full flex justify-between items-center">
      <>
        <h1 className="font-bold text-xl text-sky-700">SURAT PENGANTAR SKCK</h1>

        <AlertDialog>
          <AlertDialogTrigger className="bg-black text-white p-2 rounded-lg font-[500] px-4" onClick={() => router.refresh()}>
            Buat Surat
          </AlertDialogTrigger>
          <AlertDialogContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-center">Buat Pengantar SKCK</AlertDialogTitle>
                  <FormLabel className="text-start">Nomor Surat</FormLabel>
                  <FormField
                    control={form.control}
                    name="no_surat"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input className="mb-5" disabled={isSubmitting} placeholder="012/Reg/Test/2023" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormLabel className="text-start">NIK</FormLabel>
                  <FormField
                    control={form.control}
                    name="pendudukId"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input className="mb-5" disabled={isSubmitting} placeholder="34**************" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormLabel className="text-start">Keperluan</FormLabel>
                  <FormField
                    control={form.control}
                    name="keperluan"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input className="mb-5" disabled={isSubmitting} placeholder="Tambahkan Keperluan" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Batal</AlertDialogCancel>
                  <AlertDialogAction type="submit" disabled={!isValid || isSubmitting || isPending}>
                    Buat surat
                  </AlertDialogAction>
                </AlertDialogFooter>
              </form>
            </Form>
          </AlertDialogContent>
        </AlertDialog>
      </>
    </nav>
  );
};
