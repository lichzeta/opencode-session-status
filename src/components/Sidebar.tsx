/** @jsxImportSource @opentui/solid */
// @ts-nocheck

import type { SidebarState } from "../state";

interface SidebarProps {
  state: SidebarState;
}

export function Sidebar(props: SidebarProps) {
  const currentSession = () =>
    props.state.sessions().find((session) => session.id === props.state.currentSessionId());

  return (
    <box flexDirection="column" height="100%">
      <text bold>Session Switcher</text>
      <text>{currentSession()?.title?.slice(0, 25) || "No session"}</text>
      <text dimColor>{props.state.sessions().length} sessions</text>
    </box>
  );
}
