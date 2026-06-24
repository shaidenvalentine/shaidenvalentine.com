import { listTasks, isConfigured } from "@/lib/events";
import { THRESHOLD_SLUG } from "@content/threshold";
import { PlanBoard } from "./PlanBoard";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PlanPage() {
  if (!isConfigured()) {
    return (
      <p className="body-sm max-w-[64ch]">
        Database not connected — connect Postgres in Vercel and the production checklist seeds itself here.
      </p>
    );
  }

  const tasks = await listTasks(THRESHOLD_SLUG);
  return <PlanBoard tasks={tasks} />;
}
