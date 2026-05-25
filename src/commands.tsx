/** @jsxImportSource @opentui/solid */
// @ts-nocheck

import type { TuiPluginApi } from "@opencode-ai/plugin/tui";

export function registerCommands(
  api: TuiPluginApi,
  refreshSessions: () => Promise<void>
) {
  const command = {
    title: "Session Status: Refresh",
    value: "session-status-refresh",
    description: "Refresh session status",
    run: () => refreshSessions(),
  };

  const apiAny = api as any;

  if (typeof apiAny.keymap?.registerLayer === "function") {
    return apiAny.keymap.registerLayer({
      commands: [
        {
          namespace: "palette",
          name: "session.status.refresh",
          title: command.title,
          category: "Session Status",
          description: command.description,
          slashName: command.value,
          run: command.run,
        },
      ],
      bindings: [],
    });
  }

  if (typeof apiAny.command?.register === "function") {
    return apiAny.command.register(() => [
      {
        title: command.title,
        value: command.value,
        description: command.description,
        category: "Session Status",
        slash: { name: command.value },
        onSelect: command.run,
      },
    ]);
  }

  api.ui.toast({
    message: "Session status commands are not supported by this TUI host",
    variant: "warning",
  });
}
