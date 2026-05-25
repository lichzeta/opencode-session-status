/** @jsxImportSource @opentui/solid */
// @ts-nocheck

import { createSidebarState, createDebounce } from "./state";
import { fetchSessions } from "./sessionApi";
import { registerCommands } from "./commands.tsx";
import { Sidebar } from "./components/Sidebar";

export const id = "opencode-session-status-footer";

export async function tui(api) {
  const route = api.route?.current;
  const initialSessionId =
    route?.name === "session" ? route.params?.sessionID : "";

  const state = createSidebarState(initialSessionId);

  async function refreshSessions() {
    state.setSessionsStatus("loading");
    try {
      const sessions = await fetchSessions(api);
      state.setSessions(sessions);
      state.setSessionsStatus("ready");
      state.setLastUpdatedAt(Date.now());
      api.renderer?.requestRender?.();
    } catch (err) {
      state.setSessionsStatus("error");
      state.setSessionsError(String(err));
      api.renderer?.requestRender?.();
    }
  }

  api.slots.register({
    order: 170,
    slots: {
      sidebar_footer: (_ctx, value) => {
        const sessionId = value?.session_id || state.currentSessionId();

        if (sessionId && sessionId !== state.currentSessionId()) {
          state.setCurrentSessionId(sessionId);
          api.renderer?.requestRender?.();
        }

        return (
          <Sidebar state={state} />
        );
      },
    },
  });

  registerCommands(api, refreshSessions);

  await refreshSessions();

  const refreshSessionsDebounced = createDebounce(refreshSessions, 300);

  api.event.on("session.updated", () => {
    refreshSessionsDebounced();
  });
}

export default { id, tui };
