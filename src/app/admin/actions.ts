"use server";

import { revalidatePath } from "next/cache";
import { deleteRow, updateStatus } from "@/lib/store";

type Table = "leads" | "applications" | "feedback";
type Status = "new" | "replied" | "archived";

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
