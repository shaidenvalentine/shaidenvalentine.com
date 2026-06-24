"use client";

import { useMemo, useState, useTransition } from "react";
import type { TaskRow, TaskStatus } from "@/lib/events";
import { TASK_CATEGORIES } from "@content/thresholdTasks";
import { addTaskAction, updateTaskAction, setTaskStatusAction, deleteTaskAction } from "../actions";

// Per-category accent — a small colored dot keeps the agenda scannable.
const CAT_COLOR: Record<string, string> = {
  Venue: "#C9A874",
  Guests: "#8FB3C9",
  Payments: "#7BB87A",
  Activities: "#C98F6A",
  Entertainment: "#B57ABF",
  Content: "#C9C074",
  Food: "#C97A8F",
  Production: "#9A8FC9",
  Logistics: "#7AC9C0",
  "Post-event": "#9A958C",
  General: "#9A958C",
};
const catColor = (c: string) => CAT_COLOR[c] ?? "#9A958C";

function monthKey(iso: string | null) {
  if (!iso) return "zzzz-no-date";
  return iso.slice(0, 7);
}
function monthLabel(iso: string | null) {
  if (!iso) return "No date set";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}
function dayLabel(iso: string | null) {
  if (!iso) return "—";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}
function isOverdue(t: TaskRow) {
  return t.status !== "done" && t.due_on != null && new Date(t.due_on + "T00:00:00").getTime() < Date.now();
}

export function PlanBoard({ tasks }: { tasks: TaskRow[] }) {
  const [pending, start] = useTransition();
  const [catFilter, setCatFilter] = useState<string>("all");
  const [hideDone, setHideDone] = useState(false);
  const [editing, setEditing] = useState<number | null>(null);
  const [adding, setAdding] = useState(false);

  const done = tasks.filter((t) => t.status === "done").length;
  const overdue = tasks.filter(isOverdue).length;
  const next = tasks
    .filter((t) => t.status !== "done" && t.due_on && new Date(t.due_on).getTime() >= Date.now())
    .sort((a, b) => (a.due_on! < b.due_on! ? -1 : 1))[0];
  const pct = tasks.length ? Math.round((done / tasks.length) * 100) : 0;

  const filtered = tasks.filter((t) => {
    if (catFilter !== "all" && t.category !== catFilter) return false;
    if (hideDone && t.status === "done") return false;
    return true;
  });

  const groups = useMemo(() => {
    const map = new Map<string, TaskRow[]>();
    for (const t of filtered) {
      const k = monthKey(t.due_on);
      if (!map.has(k)) map.set(k, []);
      map.get(k)!.push(t);
    }
    return [...map.entries()].sort(([a], [b]) => (a < b ? -1 : 1));
  }, [filtered]);

  function cycleStatus(t: TaskRow) {
    const next: Record<TaskStatus, TaskStatus> = { todo: "doing", doing: "done", done: "todo" };
    start(() => setTaskStatusAction(t.id, next[t.status]));
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Summary */}
      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl glass p-6">
          <span className="label-mono">Progress</span>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="display-2 text-[var(--color-ink)]">{done}</span>
            <span className="label-mono text-[var(--color-ink-muted)]">/ {tasks.length} done · {pct}%</span>
          </div>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[var(--glass-fill-strong)]">
            <div className="h-full rounded-full bg-[var(--color-brass)] transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>
        <div className="rounded-3xl glass p-6">
          <span className="label-mono">Overdue</span>
          <div className="mt-3 display-2" style={{ color: overdue ? "var(--color-brass)" : "var(--color-ink)" }}>
            {overdue}
          </div>
          <span className="label-mono mt-2 block text-[var(--color-ink-muted)]">past their deadline</span>
        </div>
        <div className="rounded-3xl glass p-6">
          <span className="label-mono">Next deadline</span>
          {next ? (
            <>
              <div className="mt-3 text-sm text-[var(--color-ink)]">{next.title}</div>
              <span className="label-mono mt-2 block text-[var(--color-brass)]">{dayLabel(next.due_on)}</span>
            </>
          ) : (
            <div className="mt-3 body-sm">Nothing scheduled.</div>
          )}
        </div>
      </section>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setAdding((a) => !a)}
          className="rounded-full bg-[var(--color-brass)] px-5 py-2.5 text-sm font-medium text-[var(--color-bg)] transition hover:brightness-110"
        >
          {adding ? "Close" : "+ Add task"}
        </button>
        <button
          type="button"
          onClick={() => setHideDone((h) => !h)}
          className="rounded-full glass px-4 py-2 text-sm text-[var(--color-ink-muted)] transition hover:text-[var(--color-ink)]"
        >
          {hideDone ? "Show done" : "Hide done"}
        </button>
        <div className="ml-auto flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setCatFilter("all")}
            className={`rounded-full px-3 py-1 text-xs transition ${
              catFilter === "all" ? "bg-[var(--glass-fill-strong)] text-[var(--color-ink)]" : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
            }`}
          >
            All
          </button>
          {TASK_CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCatFilter(c)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs transition ${
                catFilter === c ? "bg-[var(--glass-fill-strong)] text-[var(--color-ink)]" : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
              }`}
            >
              <span aria-hidden className="inline-block h-2 w-2 rounded-full" style={{ background: catColor(c) }} />
              {c}
            </button>
          ))}
        </div>
      </div>

      {adding && <AddForm pending={pending} onDone={() => setAdding(false)} start={start} />}

      {/* Agenda grouped by month */}
      {groups.length === 0 ? (
        <p className="body-sm">No tasks match this filter.</p>
      ) : (
        <div className="flex flex-col gap-8">
          {groups.map(([key, items]) => (
            <section key={key}>
              <div className="mb-3 flex items-baseline justify-between border-b border-[var(--color-line)] pb-2">
                <h2 className="display-3 text-[var(--color-ink)]">{monthLabel(items[0].due_on)}</h2>
                <span className="label-mono text-[var(--color-ink-muted)]">
                  {items.filter((t) => t.status === "done").length}/{items.length}
                </span>
              </div>
              <ul className="flex flex-col gap-2">
                {items.map((t) => (
                  <TaskItem
                    key={t.id}
                    t={t}
                    pending={pending}
                    editing={editing === t.id}
                    onEdit={() => setEditing(editing === t.id ? null : t.id)}
                    onCycle={() => cycleStatus(t)}
                    start={start}
                    closeEdit={() => setEditing(null)}
                  />
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

function StatusDot({ status, onClick }: { status: TaskStatus; onClick: () => void }) {
  const cls =
    status === "done"
      ? "bg-[var(--color-brass)] border-[var(--color-brass)] text-[var(--color-bg)]"
      : status === "doing"
        ? "border-[var(--color-brass)] text-[var(--color-brass)]"
        : "border-[var(--color-line-strong)] text-transparent hover:border-[var(--color-brass)]";
  return (
    <button
      type="button"
      onClick={onClick}
      title="Click to cycle: to-do → doing → done"
      className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[11px] transition ${cls}`}
    >
      {status === "done" ? "✓" : status === "doing" ? "•" : ""}
    </button>
  );
}

function TaskItem({
  t,
  pending,
  editing,
  onEdit,
  onCycle,
  start,
  closeEdit,
}: {
  t: TaskRow;
  pending: boolean;
  editing: boolean;
  onEdit: () => void;
  onCycle: () => void;
  start: (cb: () => void) => void;
  closeEdit: () => void;
}) {
  const overdue = isOverdue(t);
  return (
    <li className="rounded-2xl glass p-4">
      <div className="flex items-start gap-3">
        <StatusDot status={t.status} onClick={onCycle} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className={`text-sm ${t.status === "done" ? "text-[var(--color-ink-whisper)] line-through" : "text-[var(--color-ink)]"}`}>
              {t.title}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] text-[var(--color-ink-muted)]">
              <span aria-hidden className="inline-block h-2 w-2 rounded-full" style={{ background: catColor(t.category) }} />
              {t.category}
            </span>
          </div>
          {t.notes && !editing && (
            <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-ink-muted)]">{t.notes}</p>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className={`label-mono whitespace-nowrap ${overdue ? "text-[var(--color-brass)]" : "text-[var(--color-ink-muted)]"}`}>
            {dayLabel(t.due_on)}
          </span>
          <button type="button" onClick={onEdit} className="text-xs text-[var(--color-ink-muted)] transition hover:text-[var(--color-brass)]">
            {editing ? "Close" : "Edit"}
          </button>
        </div>
      </div>

      {editing && (
        <EditForm t={t} pending={pending} start={start} closeEdit={closeEdit} />
      )}
    </li>
  );
}

function EditForm({
  t,
  pending,
  start,
  closeEdit,
}: {
  t: TaskRow;
  pending: boolean;
  start: (cb: () => void) => void;
  closeEdit: () => void;
}) {
  const [title, setTitle] = useState(t.title);
  const [category, setCategory] = useState(t.category);
  const [due, setDue] = useState(t.due_on ?? "");
  const [notes, setNotes] = useState(t.notes ?? "");
  const [confirmDel, setConfirmDel] = useState(false);

  return (
    <div className="mt-3 grid gap-3 border-t border-[var(--color-line)] pt-3">
      <input value={title} onChange={(e) => setTitle(e.target.value)} className={fieldCls} />
      <div className="grid gap-3 sm:grid-cols-2">
        <select value={category} onChange={(e) => setCategory(e.target.value)} className={`${fieldCls} appearance-none bg-[var(--color-bg-elevated)]`}>
          {TASK_CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <input type="date" value={due} onChange={(e) => setDue(e.target.value)} className={fieldCls} />
      </div>
      <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} placeholder="Notes" className={`${fieldCls} resize-y`} />
      <div className="flex items-center justify-between">
        <button
          type="button"
          disabled={pending}
          onClick={() =>
            start(async () => {
              await updateTaskAction(t.id, { title, category, due_on: due || null, notes });
              closeEdit();
            })
          }
          className="rounded-full bg-[var(--color-brass)] px-4 py-1.5 text-xs font-medium text-[var(--color-bg)] disabled:opacity-50"
        >
          Save
        </button>
        {confirmDel ? (
          <span className="flex items-center gap-2 text-xs">
            <button
              type="button"
              disabled={pending}
              onClick={() => start(() => deleteTaskAction(t.id))}
              className="rounded-full bg-[var(--color-brass)] px-3 py-1.5 font-medium text-[var(--color-bg)]"
            >
              Confirm delete
            </button>
            <button type="button" onClick={() => setConfirmDel(false)} className="text-[var(--color-ink-muted)]">Cancel</button>
          </span>
        ) : (
          <button type="button" onClick={() => setConfirmDel(true)} className="text-xs text-[var(--color-ink-muted)] transition hover:text-[var(--color-brass)]">
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

function AddForm({
  pending,
  onDone,
  start,
}: {
  pending: boolean;
  onDone: () => void;
  start: (cb: () => void) => void;
}) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<string>(TASK_CATEGORIES[0]);
  const [due, setDue] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <div className="grid gap-3 rounded-3xl glass p-5">
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What needs doing?" className={fieldCls} autoFocus />
      <div className="grid gap-3 sm:grid-cols-2">
        <select value={category} onChange={(e) => setCategory(e.target.value)} className={`${fieldCls} appearance-none bg-[var(--color-bg-elevated)]`}>
          {TASK_CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <input type="date" value={due} onChange={(e) => setDue(e.target.value)} className={fieldCls} />
      </div>
      <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} placeholder="Notes (optional)" className={`${fieldCls} resize-y`} />
      <div>
        <button
          type="button"
          disabled={pending || !title.trim()}
          onClick={() =>
            start(async () => {
              await addTaskAction({ title, category, due_on: due || undefined, notes: notes || undefined });
              onDone();
            })
          }
          className="rounded-full bg-[var(--color-brass)] px-5 py-2 text-sm font-medium text-[var(--color-bg)] disabled:opacity-50"
        >
          Add to plan
        </button>
      </div>
    </div>
  );
}

const fieldCls =
  "w-full rounded-xl border border-[var(--color-line-strong)] bg-[var(--glass-fill)] px-3 py-2 text-sm text-[var(--color-ink)] outline-none transition focus:border-[var(--color-brass)]";
