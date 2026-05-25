/** @jsxImportSource @opentui/solid */
// @ts-nocheck

import type { TuiPluginApi } from "@opencode-ai/plugin/tui";

export function registerCommands(
  api: TuiPluginApi,
  refreshSessions: () => Promise<void>
) {
  const command = {
    title: "Session Status Footer: Refresh",
    value: "session-status-footer-refresh",
    description: "Refresh session footer status",
    run: () => refreshSessions(),
  };

  const apiAny = api as any;

  if (typeof apiAny.keymap?.registerLayer === "function") {
    return apiAny.keymap.registerLayer({
      commands: [
        {
          namespace: "palette",
          name: "session.status.footer.refresh",
          title: command.title,
          category: "Session Status Footer",
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
        category: "Session Status Footer",
        slash: { name: command.value },
        onSelect: command.run,
      },
    ]);
  }

  api.ui.toast({
    message: "Session status footer commands are not supported by this TUI host",
    variant: "warning",
  });
}
