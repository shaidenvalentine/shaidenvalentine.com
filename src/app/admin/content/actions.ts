"use server";

import { revalidatePath } from "next/cache";
import {
  insertIdea,
  updateIdeaStatus,
  deleteIdea,
  setCarouselStatus,
  type IdeaStatus,
  type CarouselStatus,
} from "@/lib/store";

function revalidateCarousels() {
  revalidatePath("/admin/content");
  revalidatePath("/carousels");
  revalidatePath("/");
}

export async function setCarouselStatusAction(slug: string, status: CarouselStatus) {
  await setCarouselStatus(slug, status);
  revalidateCarousels();
}

export async function deleteCarouselAction(slug: string) {
  await setCarouselStatus(slug, "deleted");
  revalidateCarousels();
}

export async function submitIdeaAction(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const idea = String(formData.get("idea") ?? "").trim();
  if (!title || !idea) return;
  await insertIdea({ title, idea });
  revalidatePath("/admin/content");
  revalidatePath("/admin");
}

export async function setIdeaStatusAction(id: number, status: IdeaStatus) {
  await updateIdeaStatus(id, status);
  revalidatePath("/admin/content");
}

export async function deleteIdeaAction(id: number) {
  await deleteIdea(id);
  revalidatePath("/admin/content");
  revalidatePath("/admin");
}
