# OpenCode Session Status Footer

A small OpenCode TUI plugin that shows compact session status in the sidebar footer.

This plugin does not replace OpenCode's built-in `/session` flow. It only keeps the current session title and non-subagent session count visible in the sidebar footer without taking over the main sidebar area used by Todo, files, MCP, LSP, and other built-in panels.

## 中文说明

OpenCode Session Status Footer 是一个轻量 OpenCode TUI 插件，用来在右侧 sidebar footer 中显示当前 session 状态。

它不替代 OpenCode 内置的 `/session` 功能，也不占用右侧 sidebar 主体区域。右侧主体区域仍然留给 Todo list、Files、MCP、LSP 等内置面板。

## Features

- Native `sidebar_footer` integration in OpenCode TUI.
- Shows the current session title in one line.
- Shows the non-subagent session count in one line.
- Filters detected subagent sessions from the count.
- Adds a command palette action to refresh the footer status.
- Does not require tmux or a companion process.

## 功能

- 原生集成 OpenCode TUI 的 `sidebar_footer`。
- 用一行显示当前 session 标题。
- 用一行显示非 subagent session 数量。
- 自动过滤检测到的 subagent session。
- 提供一个命令面板动作刷新 footer 状态。
- 不需要 tmux，也不需要额外启动进程。

## Install

Clone this repository into your OpenCode plugins directory:

```sh
git clone https://github.com/lichzeta/opencode-session-switcher.git ~/.config/opencode/plugins/opencode-session-status-footer
```

Then add it to your OpenCode TUI config:

```json
{
  "plugin": [
    "./plugins/opencode-session-status-footer"
  ]
}
```

If you clone into a different directory name, use that path in the `plugin` entry.

On Windows, use your OpenCode config directory instead. For example:

```text
D:\opencode\.config\opencode\plugins\opencode-session-status-footer
```

## 安装

把仓库克隆到 OpenCode 插件目录：

```sh
git clone https://github.com/lichzeta/opencode-session-switcher.git ~/.config/opencode/plugins/opencode-session-status-footer
```

然后在 OpenCode TUI 配置中启用：

```json
{
  "plugin": [
    "./plugins/opencode-session-status-footer"
  ]
}
```

如果你使用了不同的本地目录名，请在 `plugin` 配置中使用对应路径。

Windows 用户请使用自己的 OpenCode 配置目录，例如：

```text
D:\opencode\.config\opencode\plugins\opencode-session-status-footer
```

## Commands

Search for `Session Status Footer:` in the OpenCode command palette.

- `Session Status Footer: Refresh`

Use OpenCode's built-in `/session` command or session picker for creating, switching, renaming, and deleting sessions.

## 命令

在 OpenCode 命令面板中搜索 `Session Status Footer:`。

- `Session Status Footer: Refresh`

创建、切换、重命名和删除 session 请继续使用 OpenCode 内置的 `/session` 或 session picker。

## Known Limitations

- The footer is display-only.
- This plugin does not provide session switching.
- This plugin does not jump or scroll the main conversation view to a message or turn.
- Subagent session filtering is heuristic. It checks common parent-session fields and title/agent markers.

## 已知限制

- Footer 只用于展示。
- 插件不提供 session 切换功能。
- 插件不能让主对话区跳转或滚动到某条消息/某个轮次。
- Subagent session 过滤是启发式的，会检查常见的 parent session 字段、agent 标记和标题标记。

## Development

The plugin is loaded directly from TypeScript/TSX by OpenCode.

```text
opencode-session-status-footer/
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

Restart OpenCode after changing plugin files.

## 开发

插件由 OpenCode 直接从 TypeScript/TSX 文件加载。修改插件文件后，需要重启 OpenCode。
