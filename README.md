# OpenCode Session Switcher

A small OpenCode TUI plugin that adds a native sidebar session switcher.

It is intended for users who want quick session switching inside OpenCode without running a separate tmux sidebar or companion process.

## Features

- Native `sidebar_content` integration in OpenCode TUI.
- Shows recent non-subagent sessions in the sidebar.
- Highlights the current session with `>`.
- Filters out detected subagent sessions.
- Adds command palette actions for session management.
- Does not require tmux.

## Install

Clone this repository into your OpenCode plugins directory:

```sh
git clone https://github.com/lichzeta/opencode-session-switcher.git ~/.config/opencode/plugins/opencode-session-switcher
```

Then add it to your OpenCode TUI config:

```json
{
  "plugin": [
    "./plugins/opencode-session-switcher"
  ]
}
```

On Windows, use your OpenCode config directory instead. For example:

```text
D:\opencode\.config\opencode\plugins\opencode-session-switcher
```

## Commands

Search for `Session Switcher:` in the OpenCode command palette.

- `Session Switcher: Show Sessions`
- `Session Switcher: Switch Session`
- `Session Switcher: Rename Session`
- `Session Switcher: Delete Session`
- `Session Switcher: Filter Sessions`
- `Session Switcher: Refresh`

## Known Limitations

- Sidebar items are display-only. Current OpenCode sidebar slots do not provide a reliable clickable list interaction surface for this use case.
- This plugin does not jump or scroll the main conversation view to a message or turn.
- Subagent session filtering is heuristic. It checks common parent-session fields and title/agent markers.

## Development

The plugin is loaded directly from TypeScript/TSX by OpenCode.

```text
opencode-session-switcher/
├── package.json
├── index.tsx
└── src/
    ├── index.tsx
    ├── state.ts
    ├── sessionApi.ts
    ├── commands.tsx
    └── components/
        ├── Sidebar.tsx
        └── SessionPanel.tsx
```

Restart OpenCode after changing plugin files.
