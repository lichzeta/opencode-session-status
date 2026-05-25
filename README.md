# OpenCode Session Status

Compact session status for OpenCode TUI.

Displays the current session title and non-subagent session count in the sidebar title area.

## 中文

OpenCode TUI 的轻量 session 状态插件。

在侧边栏标题区域显示当前 session 标题和非 subagent session 数量。

## Install

```sh
git clone https://github.com/lichzeta/opencode-session-status.git ~/.config/opencode/plugins/opencode-session-status
```

Add it to your OpenCode TUI config:

```json
{
  "plugin": [
    "./plugins/opencode-session-status"
  ]
}
```

Windows example:

```text
D:\opencode\.config\opencode\plugins\opencode-session-status
```

## Commands

- `Session Status: Refresh`

## Development

```text
opencode-session-status/
|-- package.json
|-- index.tsx
`-- src/
    |-- index.tsx
    |-- state.ts
    |-- sessionApi.ts
    |-- commands.tsx
    `-- components/
        `-- Sidebar.tsx
```
