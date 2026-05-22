/** @jsxImportSource @opentui/solid */
// @ts-nocheck

import type { TuiPluginApi } from "@opencode-ai/plugin/tui";
import type { Session } from "./state";

export async function fetchSessions(api: TuiPluginApi): Promise<Session[]> {
  try {
    const response = await api.client.session.list();
    const sessions = Array.isArray(response) ? response : response?.data ?? [];
    return sessions
      .map((s: any) => ({
        id: s.id,
        title: s.title || `Session ${s.id.slice(0, 8)}`,
        updatedAt: s.updatedAt || s.updated_at || s.lastActivityAt || s.time?.updated,
        parentId: s.parentID || s.parentId || s.parent_id,
        agent: s.agent || s.info?.agent,
      }))
      .filter((s: any) => !isSubagentSession(s));
  } catch (err) {
    console.error("[sidebar] Failed to fetch sessions:", err);
    return [];
  }
}

function isSubagentSession(session: any): boolean {
  const title = String(session.title || "").toLowerCase();
  const agent = String(session.agent || "").toLowerCase();
  return Boolean(session.parentId) || agent.includes("subagent") || title.includes(" subagent)");
}

export async function createSession(api: TuiPluginApi): Promise<Session | null> {
  try {
    const response = await api.client.session.create();
    const session = response?.data ?? response;
    return {
      id: session.id,
      title: session.title || `Session ${session.id.slice(0, 8)}`,
      updatedAt: Date.now(),
    };
  } catch (err) {
    console.error("[sidebar] Failed to create session:", err);
    return null;
  }
}

export async function renameSession(
  api: TuiPluginApi,
  sessionId: string,
  newTitle: string
): Promise<boolean> {
  try {
    await api.client.session.update({ sessionID: sessionId, title: newTitle });
    return true;
  } catch (err) {
    console.error("[sidebar] Failed to rename session:", err);
    return false;
  }
}

export async function deleteSession(
  api: TuiPluginApi,
  sessionId: string
): Promise<boolean> {
  try {
    await api.client.session.delete({ sessionID: sessionId });
    return true;
  } catch (err) {
    console.error("[sidebar] Failed to delete session:", err);
    return false;
  }
}

export async function getMostRecentSession(
  api: TuiPluginApi,
  excludeId?: string
): Promise<Session | null> {
  const sessions = await fetchSessions(api);
  const filtered = excludeId
    ? sessions.filter((s) => s.id !== excludeId)
    : sessions;

  if (filtered.length === 0) return null;

  return filtered.sort((a, b) => {
    if (a.updatedAt && b.updatedAt) return b.updatedAt - a.updatedAt;
    return 0;
  })[0];
}
