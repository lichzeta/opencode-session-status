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
    console.error("[session-status] Failed to fetch sessions:", err);
    return [];
  }
}

function isSubagentSession(session: any): boolean {
  const title = String(session.title || "").toLowerCase();
  const agent = String(session.agent || "").toLowerCase();
  return Boolean(session.parentId) || agent.includes("subagent") || title.includes(" subagent)");
}
