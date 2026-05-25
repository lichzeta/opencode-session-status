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
    <box flexDirection="row">
      <text bold>{currentSession()?.title?.slice(0, 22) || "No session"}</text>
      <text dimColor> ({props.state.sessions().length})</text>
    </box>
  );
}
