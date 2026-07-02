// Carlisle vs Steven — game engine (pure logic, framework-agnostic).
//
// A Pac-Man-style maze arena where two hermit crabs scurry the corridors
// eating food crumbs. Grab a glowing shell and you turn "hungry" — for a few
// seconds you can chomp your rival and steal a fat point bonus. Higher score
// when the timer runs out wins. Everything here is deterministic given inputs,
// so it can be unit-checked (see scripts/verify-maze.mjs).

export type CrabId = "carlisle" | "steven";

export interface Dir {
  x: number;
  y: number;
}

// Shared movement state for anything that scurries the maze (crabs + Sasha).
export interface Mover {
  // Position in TILE units (integer = tile center). Resolution-independent;
  // the renderer multiplies by the current tile pixel size.
  c: number;
  r: number;
  dir: Dir;
  next: Dir; // queued direction (from input or AI)
  moving: boolean; // mid-corridor between two tile centers
  tCol: number; // target tile while moving
  tRow: number;
  facing: number; // radians, for rendering
}

export interface Crab extends Mover {
  id: CrabId;
  lastCol: number; // last tile whose pellet we processed
  lastRow: number;
  score: number;
  hungryUntil: number; // ms timestamp; > now === can eat rival
  spawnC: number;
  spawnR: number;
  isCPU: boolean;
  wiggle: number; // leg animation phase
  respawnFlash: number; // ms remaining of respawn flash
}

// The Raja Ampat crew crashing the arena.
//  - sasha: the beach monster in a lime Borat mankini, hunts whoever's winning
//  - josiah: mustachioed boy who chases the nearest crab
//  - stingray: the blue-spotted ray gliding the reef, stings on contact
export type MonsterKind = "sasha" | "josiah" | "stingray";

export interface Monster extends Mover {
  kind: MonsterKind;
  spawnC: number;
  spawnR: number;
  wiggle: number;
  cooldownUntil: number; // ms; can't tackle again until past this
  respawnFlash: number;
}

export type Cell = 0 | 1 | 2; // 0 empty, 1 crumb, 2 power shell

export interface GameState {
  cols: number;
  rows: number;
  wall: boolean[][]; // true === solid
  pellets: Cell[][]; // mutable food layer
  crumbsLeft: number;
  crabs: Record<CrabId, Crab>;
  monsters: Monster[];
  time: number; // ms elapsed in round
  duration: number; // ms total
  over: boolean;
  winner: CrabId | "draw" | null;
  mode: "solo" | "versus";
  difficulty: Difficulty;
}

export type Difficulty = "chill" | "normal" | "savage";

export const HUNGRY_MS = 6000;
export const ROUND_MS = 60_000;
const BASE_SPEED = 5.6; // tiles / second
const EAT_REACH = 0.72; // tile distance for a chomp

export const POINTS = {
  crumb: 1,
  shell: 5,
  chomp: 15,
  bonk: 10, // whacking Sasha while hungry
  tackle: 5, // points Sasha knocks off the leader
};

const SASHA_GRACE_MS = 1800; // head start before Sasha wakes up each round

// ---------------------------------------------------------------------------
// Maze generation — randomized DFS (a "perfect" maze is fully connected by
// construction) then braided to add loops so chases have escape routes. Only
// ever *removes* walls after carving, so connectivity is preserved. Every
// non-wall cell is therefore reachable from every other — no dead pockets.
// ---------------------------------------------------------------------------

type RNG = () => number;

function shuffle<T>(arr: T[], rng: RNG): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function genMaze(cols: number, rows: number, rng: RNG = Math.random): boolean[][] {
  // cols & rows must be odd so rooms sit on odd coordinates.
  const wall: boolean[][] = Array.from({ length: rows }, () => Array<boolean>(cols).fill(true));

  const carve = (c: number, r: number) => {
    wall[r][c] = false;
    const dirs = shuffle(
      [
        [2, 0],
        [-2, 0],
        [0, 2],
        [0, -2],
      ],
      rng,
    );
    for (const [dc, dr] of dirs) {
      const nc = c + dc;
      const nr = r + dr;
      if (nc > 0 && nc < cols - 1 && nr > 0 && nr < rows - 1 && wall[nr][nc]) {
        wall[(r + nr) / 2][(c + nc) / 2] = false; // knock the wall between rooms
        carve(nc, nr);
      }
    }
  };
  carve(1, 1);

  // Braid: open some dead ends into loops. Perfect mazes are twisty and easy
  // to corner someone in; loops make the chase fun.
  for (let r = 1; r < rows - 1; r += 2) {
    for (let c = 1; c < cols - 1; c += 2) {
      const neighbours: Array<[number, number]> = [
        [c + 2, r],
        [c - 2, r],
        [c, r + 2],
        [c, r - 2],
      ];
      const open = neighbours.filter(
        ([nc, nr]) => nc > 0 && nc < cols - 1 && nr > 0 && nr < rows - 1 && !wall[(r + nr) / 2][(c + nc) / 2],
      );
      if (open.length <= 1 && rng() < 0.45) {
        const closed = neighbours.filter(
          ([nc, nr]) => nc > 0 && nc < cols - 1 && nr > 0 && nr < rows - 1 && wall[(r + nr) / 2][(c + nc) / 2],
        );
        if (closed.length) {
          const [nc, nr] = closed[Math.floor(rng() * closed.length)];
          wall[(r + nr) / 2][(c + nc) / 2] = false;
        }
      }
    }
  }
  return wall;
}

function makeCrab(id: CrabId, c: number, r: number, isCPU: boolean): Crab {
  return {
    id,
    c,
    r,
    dir: { x: 0, y: 0 },
    next: { x: 0, y: 0 },
    moving: false,
    tCol: c,
    tRow: r,
    lastCol: c,
    lastRow: r,
    score: 0,
    hungryUntil: 0,
    spawnC: c,
    spawnR: r,
    isCPU,
    facing: id === "carlisle" ? 0 : Math.PI,
    wiggle: 0,
    respawnFlash: 0,
  };
}

export interface NewGameOpts {
  cols?: number;
  rows?: number;
  mode: "solo" | "versus";
  difficulty: Difficulty;
  // Which crab the human controls in solo mode (the other becomes CPU).
  human: CrabId;
  chaos?: boolean; // spawn the trip crew of hazards (default true)
  rng?: RNG;
}

function toOdd(n: number): number {
  return n % 2 === 0 ? n + 1 : n;
}

function makeMonster(kind: MonsterKind, c: number, r: number): Monster {
  return {
    kind,
    c,
    r,
    dir: { x: 0, y: 0 },
    next: { x: 0, y: 0 },
    moving: false,
    tCol: c,
    tRow: r,
    facing: 0,
    spawnC: c,
    spawnR: r,
    wiggle: 0,
    cooldownUntil: SASHA_GRACE_MS,
    respawnFlash: 0,
  };
}

export function newGame(opts: NewGameOpts): GameState {
  const cols = opts.cols ?? 13;
  const rows = opts.rows ?? 19;
  const rng = opts.rng ?? Math.random;
  const wall = genMaze(cols, rows, rng);

  const pellets: Cell[][] = Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => (wall[r][c] ? 0 : 1)) as Cell[],
  );

  // Spawns: opposite corners.
  const carlisle = makeCrab("carlisle", 1, 1, opts.mode === "solo" && opts.human !== "carlisle");
  const steven = makeCrab("steven", cols - 2, rows - 2, opts.mode === "solo" && opts.human !== "steven");

  // Power shells at the far rooms + mid-edges.
  const midR = rows % 4 === 1 ? Math.floor(rows / 2) : Math.floor(rows / 2) - (Math.floor(rows / 2) % 2 === 0 ? 1 : 0);
  const oddMid = midR % 2 === 0 ? midR + 1 : midR;
  const shells: Array<[number, number]> = [
    [cols - 2, 1],
    [1, rows - 2],
    [1, oddMid],
    [cols - 2, oddMid],
  ];
  for (const [c, r] of shells) {
    if (!wall[r][c]) pellets[r][c] = 2;
  }

  // Clear pellets under both spawns.
  pellets[carlisle.r][carlisle.c] = 0;
  pellets[steven.r][steven.c] = 0;

  // The crew barges into the middle of the maze.
  const monsters: Monster[] = [];
  if (opts.chaos ?? true) {
    const mc = toOdd(Math.floor(cols / 2));
    const mr = toOdd(Math.floor(rows / 2));
    const spots: Array<[MonsterKind, number, number]> = [
      ["sasha", mc, mr],
      ["josiah", mc, Math.max(1, mr - 2)],
      ["stingray", mc, Math.min(rows - 2, mr + 2)],
    ];
    for (const [kind, c, r] of spots) {
      if (wall[r][c]) continue; // rooms sit on odd coords, so these are open
      monsters.push(makeMonster(kind, c, r));
      pellets[r][c] = 0;
    }
  }

  let crumbsLeft = 0;
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) if (pellets[r][c] === 1) crumbsLeft++;

  return {
    cols,
    rows,
    wall,
    pellets,
    crumbsLeft,
    crabs: { carlisle, steven },
    monsters,
    time: 0,
    duration: ROUND_MS,
    over: false,
    winner: null,
    mode: opts.mode,
    difficulty: opts.difficulty,
  };
}

// ---------------------------------------------------------------------------
// Movement & rules
// ---------------------------------------------------------------------------

function open(s: GameState, c: number, r: number): boolean {
  if (c < 0 || r < 0 || c >= s.cols || r >= s.rows) return false;
  return !s.wall[r][c];
}

function chooseDir(s: GameState, m: Mover, ci: number, ri: number): Dir | null {
  // Prefer the queued direction, then keep going straight.
  if ((m.next.x || m.next.y) && open(s, ci + m.next.x, ri + m.next.y)) return m.next;
  if ((m.dir.x || m.dir.y) && open(s, ci + m.dir.x, ri + m.dir.y)) return m.dir;
  return null;
}

function stepMover(s: GameState, m: Mover, dist: number) {
  let guard = 0;
  while (dist > 1e-6 && guard++ < 12) {
    if (!m.moving) {
      const ci = Math.round(m.c);
      const ri = Math.round(m.r);
      m.c = ci;
      m.r = ri;
      const d = chooseDir(s, m, ci, ri);
      if (!d) {
        m.dir = { x: 0, y: 0 };
        break;
      }
      m.dir = d;
      m.tCol = ci + d.x;
      m.tRow = ri + d.y;
      m.moving = true;
    }
    const dx = m.tCol - m.c;
    const dy = m.tRow - m.r;
    const rem = Math.hypot(dx, dy);
    if (rem <= dist) {
      m.c = m.tCol;
      m.r = m.tRow;
      dist -= rem;
      m.moving = false;
    } else {
      m.c += (dx / rem) * dist;
      m.r += (dy / rem) * dist;
      dist = 0;
    }
  }
  if (m.dir.x || m.dir.y) m.facing = Math.atan2(m.dir.y, m.dir.x);
}

function eatAt(s: GameState, crab: Crab, now: number) {
  const c = Math.round(crab.c);
  const r = Math.round(crab.r);
  if (c === crab.lastCol && r === crab.lastRow) return;
  crab.lastCol = c;
  crab.lastRow = r;
  const cell = s.pellets[r]?.[c];
  if (cell === 1) {
    s.pellets[r][c] = 0;
    s.crumbsLeft--;
    crab.score += POINTS.crumb;
  } else if (cell === 2) {
    s.pellets[r][c] = 0;
    crab.score += POINTS.shell;
    crab.hungryUntil = now + HUNGRY_MS;
  }
}

function respawn(crab: Crab) {
  crab.c = crab.spawnC;
  crab.r = crab.spawnR;
  crab.dir = { x: 0, y: 0 };
  crab.next = { x: 0, y: 0 };
  crab.moving = false;
  crab.tCol = crab.spawnC;
  crab.tRow = crab.spawnR;
  crab.lastCol = crab.spawnC;
  crab.lastRow = crab.spawnR;
  crab.hungryUntil = 0;
  crab.respawnFlash = 900;
}

function respawnMonster(m: Monster) {
  m.c = m.spawnC;
  m.r = m.spawnR;
  m.dir = { x: 0, y: 0 };
  m.next = { x: 0, y: 0 };
  m.moving = false;
  m.tCol = m.spawnC;
  m.tRow = m.spawnR;
  m.respawnFlash = 900;
}

const DIFF_SPEED: Record<Difficulty, number> = { chill: 0.82, normal: 1, savage: 1.14 };
const MONSTER_SPEED: Record<MonsterKind, number> = { sasha: 0.9, josiah: 0.96, stingray: 0.72 };

export interface Events {
  crumb?: boolean;
  shell?: boolean;
  chomp?: boolean;
  tackle?: boolean; // Sasha/Josiah caught a crab
  sting?: boolean; // the stingray zapped a crab
  bonk?: boolean; // a hungry crab whacked a boy
}

// Advance the simulation. dtMs is frame delta, nowMs a monotonic clock.
export function update(s: GameState, dtMs: number, nowMs: number): Events {
  const ev: Events = {};
  if (s.over) return ev;
  const dt = Math.min(dtMs, 50) / 1000; // clamp to avoid tunneling on lag spikes

  for (const crab of [s.crabs.carlisle, s.crabs.steven]) {
    // CPU decides its next turn while sitting on a tile center.
    if (crab.isCPU && !crab.moving) decideCPU(s, crab, nowMs);

    let speed = BASE_SPEED;
    if (crab.hungryUntil > nowMs) speed *= 1.08; // hungry crabs hustle
    if (crab.isCPU) speed *= DIFF_SPEED[s.difficulty];

    const before = { score: crab.score, hungry: crab.hungryUntil > nowMs };
    stepMover(s, crab, speed * dt);
    eatAt(s, crab, nowMs);
    crab.wiggle += dt * (crab.dir.x || crab.dir.y ? 14 : 3);
    if (crab.respawnFlash > 0) crab.respawnFlash = Math.max(0, crab.respawnFlash - dtMs);

    if (crab.score !== before.score) {
      const gained = crab.score - before.score;
      if (gained >= POINTS.shell && !before.hungry && crab.hungryUntil > nowMs) ev.shell = true;
      else ev.crumb = true;
    }
  }

  // Chomp check.
  const a = s.crabs.carlisle;
  const b = s.crabs.steven;
  const dist = Math.hypot(a.c - b.c, a.r - b.r);
  if (dist < EAT_REACH) {
    const aHungry = a.hungryUntil > nowMs;
    const bHungry = b.hungryUntil > nowMs;
    if (aHungry && !bHungry) {
      a.score += POINTS.chomp;
      respawn(b);
      ev.chomp = true;
    } else if (bHungry && !aHungry) {
      b.score += POINTS.chomp;
      respawn(a);
      ev.chomp = true;
    }
  }

  // The trip crew — Sasha, Josiah, and the blue-spotted stingray.
  if (s.time > SASHA_GRACE_MS) {
    for (const m of s.monsters) {
      if (!m.moving) decideMonster(s, m, nowMs);
      stepMover(s, m, BASE_SPEED * MONSTER_SPEED[m.kind] * dt);
      m.wiggle += dt * (m.dir.x || m.dir.y ? 16 : 3);
      if (m.respawnFlash > 0) m.respawnFlash = Math.max(0, m.respawnFlash - dtMs);
      if (m.cooldownUntil > nowMs) continue;

      for (const crab of [a, b]) {
        if (Math.hypot(m.c - crab.c, m.r - crab.r) >= EAT_REACH) continue;
        if (crab.hungryUntil > nowMs) {
          crab.score += POINTS.bonk; // powered-up crab bosses the hazard
          respawnMonster(m);
          m.cooldownUntil = nowMs + 1500;
          ev.bonk = true;
        } else {
          crab.score = Math.max(0, crab.score - POINTS.tackle);
          respawn(crab); // knocked back to your corner
          m.cooldownUntil = nowMs + 1400;
          if (m.kind === "stingray") ev.sting = true;
          else ev.tackle = true;
        }
        break;
      }
    }
  }

  s.time += dtMs;
  if (s.time >= s.duration || s.crumbsLeft <= 0) endGame(s);
  return ev;
}

function endGame(s: GameState) {
  s.over = true;
  const a = s.crabs.carlisle.score;
  const b = s.crabs.steven.score;
  s.winner = a === b ? "draw" : a > b ? "carlisle" : "steven";
}

// ---------------------------------------------------------------------------
// CPU brain — BFS foraging, chasing when hungry, fleeing when hunted.
// ---------------------------------------------------------------------------

const STEP_DIRS: Dir[] = [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
];

// Breadth-first search for the first step toward the nearest tile matching
// `goal`. Returns a direction, or null if nothing matches.
function bfsStep(s: GameState, sc: number, sr: number, goal: (c: number, r: number) => boolean): Dir | null {
  if (goal(sc, sr)) return null;
  const key = (c: number, r: number) => r * s.cols + c;
  const prev = new Map<number, number>();
  const queue: Array<[number, number]> = [[sc, sr]];
  const seen = new Set<number>([key(sc, sr)]);
  let found: [number, number] | null = null;
  while (queue.length) {
    const [c, r] = queue.shift()!;
    if (goal(c, r)) {
      found = [c, r];
      break;
    }
    for (const d of STEP_DIRS) {
      const nc = c + d.x;
      const nr = r + d.y;
      if (!open(s, nc, nr)) continue;
      const k = key(nc, nr);
      if (seen.has(k)) continue;
      seen.add(k);
      prev.set(k, key(c, r));
      queue.push([nc, nr]);
    }
  }
  if (!found) return null;
  // Walk back to the tile adjacent to the start to recover the first move.
  let ck = key(found[0], found[1]);
  const startK = key(sc, sr);
  let stepC = found[0];
  let stepR = found[1];
  while (prev.get(ck) !== undefined && prev.get(ck) !== startK) {
    ck = prev.get(ck)!;
    stepC = ck % s.cols;
    stepR = Math.floor(ck / s.cols);
  }
  return { x: Math.sign(stepC - sc), y: Math.sign(stepR - sr) };
}

function fleeDir(s: GameState, mv: Mover, threatC: number, threatR: number): Dir | null {
  const ci = Math.round(mv.c);
  const ri = Math.round(mv.r);
  let best: Dir | null = null;
  let bestD = -Infinity;
  for (const d of STEP_DIRS) {
    if (!open(s, ci + d.x, ri + d.y)) continue;
    // avoid a straight reverse unless it's the only exit
    const reverse = d.x === -mv.dir.x && d.y === -mv.dir.y && (mv.dir.x || mv.dir.y);
    const nd = Math.hypot(ci + d.x - threatC, ri + d.y - threatR) - (reverse ? 0.6 : 0);
    if (nd > bestD) {
      bestD = nd;
      best = d;
    }
  }
  return best;
}

// Each hazard hunts differently: Sasha goes for whoever's winning, Josiah for
// the nearest crab, and the stingray just glides the reef. A hungry crab can
// boss any of them, so the boys keep their distance from powered-up crabs.
function decideMonster(s: GameState, m: Monster, now: number) {
  const a = s.crabs.carlisle;
  const b = s.crabs.steven;
  const ci = Math.round(m.c);
  const ri = Math.round(m.r);
  const aHungry = a.hungryUntil > now;
  const bHungry = b.hungryUntil > now;
  const nearest = Math.hypot(ci - a.c, ri - a.r) < Math.hypot(ci - b.c, ri - b.r) ? a : b;
  const targetTile = (t: Crab) => bfsStep(s, ci, ri, (c, r) => c === Math.round(t.c) && r === Math.round(t.r));
  const randomStep = () => {
    const opts = STEP_DIRS.filter((d) => open(s, ci + d.x, ri + d.y));
    return opts.length ? opts[Math.floor(Math.random() * opts.length)] : null;
  };

  let dir: Dir | null = null;

  if (m.kind === "stingray") {
    // glide the reef — mostly wander, occasionally drift toward a crab
    if (Math.random() < 0.3) dir = targetTile(nearest);
    if (!dir) {
      const opts = STEP_DIRS.filter((d) => open(s, ci + d.x, ri + d.y));
      const forward = opts.filter((d) => !(d.x === -m.dir.x && d.y === -m.dir.y));
      const pool = forward.length ? forward : opts;
      dir = pool.length ? pool[Math.floor(Math.random() * pool.length)] : null;
    }
    if (dir) m.next = dir;
    return;
  }

  if (aHungry && bHungry) {
    dir = fleeDir(s, m, nearest.c, nearest.r);
  } else {
    let target = m.kind === "sasha" ? (a.score >= b.score ? a : b) : nearest;
    if ((target === a ? aHungry : bHungry)) target = target === a ? b : a; // don't chase a powered-up crab
    dir = Math.random() < 0.08 ? randomStep() : targetTile(target);
  }
  if (dir) m.next = dir;
}

function decideCPU(s: GameState, crab: Crab, now: number) {
  const other = crab.id === "carlisle" ? s.crabs.steven : s.crabs.carlisle;
  const ci = Math.round(crab.c);
  const ri = Math.round(crab.r);
  const meHungry = crab.hungryUntil > now;
  const otherHungry = other.hungryUntil > now;
  const gap = Math.hypot(ci - other.c, ri - other.r);

  // A touch of chaos so the CPU isn't a robot on rails (less on savage).
  const chaos = s.difficulty === "savage" ? 0.05 : s.difficulty === "normal" ? 0.12 : 0.2;

  let dir: Dir | null = null;
  if (Math.random() < chaos) {
    const opts = STEP_DIRS.filter((d) => open(s, ci + d.x, ri + d.y));
    dir = opts.length ? opts[Math.floor(Math.random() * opts.length)] : null;
  } else if (meHungry && !otherHungry) {
    dir = bfsStep(s, ci, ri, (c, r) => c === Math.round(other.c) && r === Math.round(other.r));
  } else if (otherHungry && !meHungry && gap < 6) {
    dir = bfsStep(s, ci, ri, (c, r) => s.pellets[r][c] === 2) ?? fleeDir(s, crab, other.c, other.r);
  } else {
    dir =
      bfsStep(s, ci, ri, (c, r) => s.pellets[r][c] === 2 && gap > 3 && Math.random() < 0.5) ??
      bfsStep(s, ci, ri, (c, r) => s.pellets[r][c] >= 1) ??
      bfsStep(s, ci, ri, (c, r) => c === Math.round(other.c) && r === Math.round(other.r));
  }
  if (dir) crab.next = dir;
}

// Set a human crab's queued direction (ignored if it walks into a wall — the
// crab keeps its current heading until the turn becomes possible).
export function setDirection(crab: Crab, dir: Dir) {
  crab.next = dir;
}
