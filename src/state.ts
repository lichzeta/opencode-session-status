/** @jsxImportSource @opentui/solid */
// @ts-nocheck

export type Status = "idle" | "loading" | "ready" | "error";

export interface Session {
  id: string;
  title: string;
  updatedAt?: number;
}

export function createSidebarState(initialSessionId: string) {
  const [currentSessionId, setCurrentSessionId] = createLocalSignal(initialSessionId);
  const [searchQuery, setSearchQuery] = createLocalSignal("");
  const [sessions, setSessions] = createLocalSignal<Session[]>([]);
  const [sessionsStatus, setSessionsStatus] = createLocalSignal<Status>("idle");
  const [sessionsError, setSessionsError] = createLocalSignal<string>("");
  const [lastUpdatedAt, setLastUpdatedAt] = createLocalSignal<number>(0);

  return {
    currentSessionId,
    setCurrentSessionId,
    searchQuery,
    setSearchQuery,
    sessions,
    setSessions,
    sessionsStatus,
    setSessionsStatus,
    sessionsError,
    setSessionsError,
    lastUpdatedAt,
    setLastUpdatedAt,
  };
}

function createLocalSignal<T>(initial: T): [() => T, (next: T) => void] {
  let value = initial;
  return [
    () => value,
    (next: T) => {
      value = next;
    },
  ];
}

export function createDebounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): T {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return ((...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  }) as T;
}
