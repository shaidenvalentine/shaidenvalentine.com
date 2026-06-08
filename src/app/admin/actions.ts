"use server";

import { revalidatePath } from "next/cache";
import { deleteRow, updateStatus, updateNotes, markAllRead } from "@/lib/store";

type Table = "leads" | "applications" | "feedback";
type Status = "new" | "replied" | "archived";
type Notable = "leads" | "applications";

export async function setStatusAction(table: Table, id: number, status: Status) {
  await updateStatus(table, id, status);
  revalidatePath(`/admin/${table}`);
  revalidatePath("/admin");
}

export async function deleteAction(table: Table, id: number) {
  await deleteRow(table, id);
  revalidatePath(`/admin/${table}`);
  revalidatePath("/admin");
}

export async function saveNotesAction(table: Notable, id: number, notes: string) {
  await updateNotes(table, id, notes);
  revalidatePath(`/admin/${table}`);
}

export async function markAllReadAction(table: Notable) {
  await markAllRead(table);
  revalidatePath(`/admin/${table}`);
  revalidatePath("/admin");
}
