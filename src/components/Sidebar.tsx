/** @jsxImportSource @opentui/solid */
// @ts-nocheck

import type { SidebarState } from "../state";
import { SessionPanel } from "./SessionPanel";

interface SidebarProps {
  state: SidebarState;
}

export function Sidebar(props: SidebarProps) {
  return (
    <box flexDirection="column" height="100%">
      <text bold>Sessions</text>
      <SessionPanel state={props.state} />
    </box>
  );
}
