import React from "react";

export function IO({ input, setInput, output }) {
  return (
    <>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          marginBottom: "0.5rem",
        }}
      >
        <label style={{ color: "#ddd", marginBottom: "0.25rem" }}>Input</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            flex: 1,
            backgroundColor: "#2b2b2b",
            color: "#eee",
            padding: "0.5rem",
            border: "1px solid #444",
            borderRadius: "4px",
            fontFamily: "monospace",
            fontSize: "0.9rem",
            resize: "vertical",
          }}
        />
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <label style={{ color: "#ddd", marginBottom: "0.25rem" }}>Output</label>
        <textarea
          value={output}
          readOnly
          style={{
            flex: 1,
            backgroundColor: "#2b2b2b",
            color: "#eee",
            padding: "0.5rem",
            border: "1px solid #444",
            borderRadius: "4px",
            fontFamily: "monospace",
            fontSize: "0.9rem",
            resize: "vertical",
          }}
        />
      </div>
    </>
  );
}
