"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import * as z from "zod";
import { Penduduk } from "@prisma/client";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import Image from "next/image";
import { editDataPenduduk } from "@/actions/penduduk/penduduk-actions";

import { Button } from "@/components/ui/button";

import { FileUpload } from "@/components/uploadFoto/upload-foto";

interface Props {
  initialData: Penduduk;
  nik: string;
}

const formSchema = z.object({
  image_url: z.string(),
});

export const EditFoto = ({ initialData, nik }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      startTransition(() => {
        editDataPenduduk(nik, values).then((response) => {
          if (response.data === null) {
            toast.error(response.message);
          } else {
            toast.success(response.message);
            toggleEdit();
            router.refresh();
          }
        });
      });
    } catch {
      toast.error("Gagal mengedit");
    }
  };
  return (
    <div className="mt-6 border h-90 w-72 bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Foto
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Batal</>}
          {!isEditing && !initialData.image_url && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Tambah Foto
            </>
          )}
          {!isEditing && initialData.image_url && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Foto
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.image_url ? (
          <div className="flex items-center justify-center h-80 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image alt="Upload" fill className="object-cover rounded-md" src={initialData.image_url} />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="foto_penduduk"
            onchange={(url) => {
              if (url) {
                onSubmit({ image_url: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">16:9 aspect ratio recommended</div>
        </div>
      )}
    </div>
  );
};
