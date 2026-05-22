/** @jsxImportSource @opentui/solid */
// @ts-nocheck

import type { SidebarState } from "../state";

interface SessionPanelProps {
  state: SidebarState;
}

export function SessionPanel(props: SessionPanelProps) {
  const VIEWPORT_SIZE = 8;

  const filteredSessions = () => {
    const query = props.state.searchQuery().toLowerCase();
    if (!query) return props.state.sessions();
    return props.state.sessions().filter((s) =>
      s.title.toLowerCase().includes(query)
    );
  };

  const status = props.state.sessionsStatus();
  const sessions = filteredSessions();
  const currentId = props.state.currentSessionId();
  const currentIndex = Math.max(0, sessions.findIndex((s) => s.id === currentId));
  const viewportStart = Math.max(0, Math.min(currentIndex - 2, sessions.length - VIEWPORT_SIZE));
  const visibleSessions = sessions.slice(viewportStart, viewportStart + VIEWPORT_SIZE);

  return (
    <box flexDirection="column">
      {status === "loading" && <text>Loading...</text>}
      {status === "error" && (
        <text>Error: {props.state.sessionsError()}</text>
      )}

      {props.state.searchQuery() && (
        <text dimColor>filter: {props.state.searchQuery()}</text>
      )}

      {viewportStart > 0 && <text>  ...</text>}

      {visibleSessions.map((session) => (
        <text
          bold={session.id === currentId}
        >
          {session.id === currentId ? "> " : "  "}
          {session.title.slice(0, 25)}
        </text>
      ))}

      {viewportStart + VIEWPORT_SIZE < sessions.length && <text>  ...</text>}

      <text dimColor>
        {sessions.length}/{props.state.sessions().length} sessions
      </text>
    </box>
  );
}
