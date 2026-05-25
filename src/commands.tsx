/** @jsxImportSource @opentui/solid */
// @ts-nocheck

import type { TuiPluginApi } from "@opencode-ai/plugin/tui";
import type { SidebarState } from "./state";
import { fetchSessions, createSession, renameSession, deleteSession, getMostRecentSession } from "./sessionApi";

export function registerCommands(
  api: TuiPluginApi,
  state: SidebarState,
  refreshSessions: () => Promise<void>
) {
  const commands = [
    {
      title: "Session Switcher: Show Sessions",
      value: "session-switcher-show-sessions",
      description: "Show sessions in a selectable dialog",
      run: () => handleSwitch(api, state),
    },
    {
      title: "Session Switcher: Switch Session",
      value: "session-switcher-switch",
      description: "Switch to another session",
      run: () => handleSwitch(api, state),
    },
    {
      title: "Session Switcher: Rename Session",
      value: "session-switcher-rename",
      description: "Rename current session",
      run: () => handleRename(api, state, refreshSessions),
    },
    {
      title: "Session Switcher: Delete Session",
      value: "session-switcher-delete",
      description: "Delete current session",
      run: () => handleDelete(api, state),
    },
    {
      title: "Session Switcher: Filter Sessions",
      value: "session-switcher-filter",
      description: "Filter sessions by name",
      run: () => handleFilter(api, state),
    },
    {
      title: "Session Switcher: Refresh",
      value: "session-switcher-refresh",
      description: "Refresh sessions",
      run: () => handleRefresh(refreshSessions),
    },
  ];

  const apiAny = api as any;

  if (typeof apiAny.keymap?.registerLayer === "function") {
    return apiAny.keymap.registerLayer({
      commands: commands.map((command) => ({
        namespace: "palette",
        name: command.value.replace(/-/g, "."),
        title: command.title,
        category: "Session Switcher",
        description: command.description,
        slashName: command.value,
        run: command.run,
      })),
      bindings: [],
    });
  }

  if (typeof apiAny.command?.register === "function") {
    return apiAny.command.register(() =>
      commands.map((command) => ({
        title: command.title,
        value: command.value,
        description: command.description,
        category: "Session Switcher",
        slash: { name: command.value },
        onSelect: command.run,
      }))
    );
  }

  api.ui.toast({ message: "Session switcher commands are not supported by this TUI host", variant: "warning" });
}

async function handleSwitch(api: TuiPluginApi, state: SidebarState) {
  const allSessions = await fetchSessions(api);
  const query = state.searchQuery().toLowerCase();
  const sessions = query
    ? allSessions.filter((session) => session.title.toLowerCase().includes(query))
    : allSessions;

  if (sessions.length === 0) {
    api.ui.toast({ message: "No sessions available", variant: "warning" });
    return;
  }

  api.ui.dialog.replace(() => (
    <api.ui.DialogSelect
      title="Switch Session"
      options={sessions.map((s) => ({
        title: s.title,
        value: s.id,
      }))}
      onSelect={(option) => {
        api.ui.dialog.clear();
        state.setCurrentSessionId(option.value);
        api.route.navigate("session", { sessionID: option.value });
        api.renderer?.requestRender?.();
      }}
    />
  ));
}

async function handleRename(api: TuiPluginApi, state: SidebarState, refreshSessions: () => Promise<void>) {
  const currentSession = state.sessions().find((s) => s.id === state.currentSessionId());

  api.ui.dialog.replace(() => (
    <api.ui.DialogPrompt
      title="Rename Session"
      placeholder="Enter new title..."
      value={currentSession?.title || ""}
      onConfirm={async (value: string) => {
        api.ui.dialog.clear();
        if (value) {
          const success = await renameSession(api, state.currentSessionId(), value);
          if (success) {
            api.ui.toast({ message: "Session renamed", variant: "success" });
            await refreshSessions();
          } else {
            api.ui.toast({ message: "Failed to rename", variant: "error" });
          }
        }
      }}
      onCancel={() => api.ui.dialog.clear()}
    />
  ));
}

async function handleDelete(api: TuiPluginApi, state: SidebarState) {
  const currentSession = state.sessions().find((s) => s.id === state.currentSessionId());

  api.ui.dialog.replace(() => (
    <api.ui.DialogConfirm
      title="Delete Session"
      message={`Delete "${currentSession?.title}"?`}
      onConfirm={async () => {
        api.ui.dialog.clear();
        const success = await deleteSession(api, state.currentSessionId());
        if (success) {
          // Switch to most recent other session
          const nextSession = await getMostRecentSession(api, state.currentSessionId());
          if (nextSession) {
            api.route.navigate("session", { sessionID: nextSession.id });
          } else {
            // Create new session if none left
            const newSession = await createSession(api);
            if (newSession) {
              api.route.navigate("session", { sessionID: newSession.id });
            }
          }
        } else {
          api.ui.toast({ message: "Failed to delete", variant: "error" });
        }
      }}
      onCancel={() => api.ui.dialog.clear()}
    />
  ));
}

async function handleFilter(api: TuiPluginApi, state: SidebarState) {
  api.ui.dialog.replace(() => (
    <api.ui.DialogPrompt
      title="Filter Sessions"
      placeholder="Search..."
      value={state.searchQuery()}
      onConfirm={(value: string) => {
        api.ui.dialog.clear();
        state.setSearchQuery(value);
        api.renderer?.requestRender?.();
      }}
      onCancel={() => api.ui.dialog.clear()}
    />
  ));
}

async function handleRefresh(
  refreshSessions: () => Promise<void>
) {
  await refreshSessions();
}
