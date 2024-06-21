import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@/auth";
const f = createUploadthing();

const handleAuth = async () => {
  const session = await auth();
  const user = session?.user;
  if (!user) throw new Error("Unauthorized");
  return { user };
};
export const ourFileRouter = {
  foto_penduduk: f({ image: { maxFileSize: "16MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {console.log("Upload complete")}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
