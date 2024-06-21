import Image from "next/image";
import React from "react";

import { FormatCamelCase, FormatStripString } from "@/lib/formats/format-string";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface Props {
  image: string;
  nama?: string;
  jabatan: string;
}

export const DataCard = ({ image, nama, jabatan }: Props) => {
  return (
    <Card className="flex flex-col max-h-96">
      <div className="bg-neutral-200 rounded-lg">
        <AspectRatio ratio={4 / 5}>
          <Image src={image} fill alt="foto" className="object-cover rounded-md" />
        </AspectRatio>
      </div>
      <div className="flex flex-col text-sm justify-between items-center h-[72px] py-2 px-2">
        <h1 className="text-center font-semibold">{nama && FormatCamelCase(nama)}</h1>
        <p className="text-center text-sm text-muted-foreground">{FormatStripString(jabatan)}</p>
      </div>
    </Card>
  );
};
