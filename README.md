# OpenCode Session Switcher

A small OpenCode TUI plugin that adds a native sidebar session switcher.

It is intended for users who want quick session switching inside OpenCode without running a separate tmux sidebar or companion process.

## 中文说明

OpenCode Session Switcher 是一个 OpenCode TUI 插件，用来在右侧 sidebar 中显示和切换 session。

这个插件的目标很简单：不依赖 tmux、不需要额外启动进程，直接随 OpenCode TUI 加载，提供一个轻量的 session 切换器。

它不会尝试做消息轮次跳转或主对话区滚动，因为当前 OpenCode TUI 插件 API 没有暴露可靠的 `scrollToMessage` / `jumpToTurn` 能力。

## Features

- Native `sidebar_content` integration in OpenCode TUI.
- Shows recent non-subagent sessions in the sidebar.
- Highlights the current session with `>`.
- Filters out detected subagent sessions.
- Adds command palette actions for session management.
- Does not require tmux.

## 功能

- 原生集成 OpenCode TUI 的 `sidebar_content`。
- 在右侧 sidebar 显示 session 列表。
- 使用 `>` 标记当前 session。
- 自动过滤检测到的 subagent session。
- 通过命令面板切换、过滤、重命名、删除和刷新 session。
- 不需要 tmux。

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

## 安装

把仓库克隆到 OpenCode 插件目录：

```sh
git clone https://github.com/lichzeta/opencode-session-switcher.git ~/.config/opencode/plugins/opencode-session-switcher
```

然后在 OpenCode TUI 配置中启用：

```json
{
  "plugin": [
    "./plugins/opencode-session-switcher"
  ]
}
```

Windows 用户请使用自己的 OpenCode 配置目录，例如：

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

## 命令

在 OpenCode 命令面板中搜索 `Session Switcher:`。

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

## 已知限制

- Sidebar 中的列表项目前只用于展示。当前 OpenCode sidebar slot 对这种场景没有可靠的点击列表交互能力。
- 插件不能让主对话区跳转或滚动到某条消息/某个轮次。
- Subagent session 过滤是启发式的，会检查常见的 parent session 字段、agent 标记和标题标记。

## Development

The plugin is loaded directly from TypeScript/TSX by OpenCode.

```text
opencode-session-switcher/
|-- package.json
|-- index.tsx
`-- src/
    |-- index.tsx
    |-- state.ts
    |-- sessionApi.ts
    |-- commands.tsx
    `-- components/
        |-- Sidebar.tsx
        `-- SessionPanel.tsx
```

Restart OpenCode after changing plugin files.

## 开发

插件由 OpenCode 直接从 TypeScript/TSX 文件加载。修改插件文件后，需要重启 OpenCode。
