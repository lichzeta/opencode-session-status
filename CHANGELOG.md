# Changelog

## 0.3.0

- Rename the project to `opencode-session-status`.
- Update package metadata and install paths for the new status-focused name.
- Rename the command prefix to `Session Status`.

## 0.2.0

- Reposition the project as a compact session status footer.
- Rename the package and plugin id to `opencode-session-status-footer`.
- Remove session switching, rename, delete, and filter commands that overlap with OpenCode's built-in session picker.
- Keep a single refresh command.
- Move status rendering from `sidebar_footer` to `sidebar_title` so it is less tied to optional sidebar panels.

## 0.1.1

- Move the sidebar display from `sidebar_content` to `sidebar_footer` so OpenCode's built-in todo list can keep using the main sidebar area.
- Keep the footer display compact at one to two lines.
- Keep session switching in the command palette.
- Remove the unused sidebar session list component.

## 0.1.0

- Initial release.
- Adds a native OpenCode TUI sidebar session switcher.
- Adds command palette actions for switching, filtering, renaming, deleting, and refreshing sessions.
- Filters out detected subagent sessions from the main session list.
