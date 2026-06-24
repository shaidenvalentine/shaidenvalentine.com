"use server";

import { revalidatePath } from "next/cache";
import {
  updateRsvpStatus,
  recordPayment,
  assignRoom,
  updateAdminNote,
  markFlag,
  deleteRsvp,
  updateEventConfig,
  type RsvpStatus,
  type EventConfigInput,
} from "@/lib/events";
import { THRESHOLD_SLUG } from "@content/threshold";

function revalidateEvents() {
  revalidatePath("/admin/events");
  revalidatePath("/admin/events/guests");
  revalidatePath("/admin/events/rooms");
  revalidatePath("/admin/events/rollups");
}

export async function setStatusAction(id: number, status: RsvpStatus) {
  await updateRsvpStatus(id, status);
  revalidateEvents();
}

export async function recordPaymentAction(id: number, kind: "deposit" | "balance", amount: number) {
  if (!Number.isFinite(amount) || amount <= 0) return;
  await recordPayment(id, kind, Math.round(amount));
  revalidateEvents();
}

export async function assignRoomAction(id: number, room: string) {
  await assignRoom(id, room.trim());
  revalidateEvents();
}

export async function saveAdminNoteAction(id: number, note: string) {
  await updateAdminNote(id, note.trim());
  revalidateEvents();
}

export async function markFlagAction(id: number, flag: "details_sent" | "reminder_sent", on: boolean) {
  await markFlag(id, flag, on);
  revalidateEvents();
}

export async function deleteRsvpAction(id: number) {
  await deleteRsvp(id);
  revalidateEvents();
}

export async function saveConfigAction(config: EventConfigInput) {
  await updateEventConfig(THRESHOLD_SLUG, config);
  revalidateEvents();
  revalidatePath("/admin/events/config");
  revalidatePath("/threshold");
}
