import React, { useState, useRef, useEffect } from "react";
import { LANGUAGES, SNIPPETS, PISTON_EXECUTE } from "../constants";
import { IO } from "./IO";
import { EditorLayout } from "./EditorLayout";

export default function CodeEditor() {
  const [code, setCode] = useState(SNIPPETS.javascript);
  const [language, setLanguage] = useState("javascript");
  const [fontSize, setFontSize] = useState(14);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const isResizing = useRef(false);

  const onMouseDown = (e) => {
    e.preventDefault();
    isResizing.current = true;
  };
  const onMouseMove = (e) => {
    if (!isResizing.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    let newW = e.clientX - left;
    const min = width * 0.2;
    const max = width * 0.8;
    newW = Math.max(min, Math.min(max, newW));
    leftRef.current.style.flexBasis = `${newW}px`;
  };
  const onMouseUp = () => {
    isResizing.current = false;
  };
  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  useEffect(() => {
    setCode(SNIPPETS[language]);
  }, [language]);

  const handleRun = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setOutput("Running...");
    try {
      const res = await fetch(PISTON_EXECUTE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language,
          version: "*",
          files: [{ name: "main", content: code }],
          stdin: input,
        }),
      });
      const data = await res.json();
      setOutput(data.run?.output || "No output");
    } catch (err) {
      setOutput("Error: " + err.message);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#121212",
        overflow: "hidden",
      }}
    >
      <div
        ref={leftRef}
        style={{
          display: "flex",
          flexDirection: "column",
          flexBasis: "50%",
          minWidth: "200px",
          borderRight: "1px solid #333",
          backgroundColor: "#1a1a1a",
        }}
      >
        <div
          style={{
            padding: "0.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ color: "#ddd" }}>Editor</span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ color: "#ddd", fontSize: "0.85rem" }}>
              Font Size:
            </span>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={fontSize}
              onChange={(e) => setFontSize(+e.target.value)}
            >
              {[12, 14, 16, 18, 20, 24, 28, 32].map((sz) => (
                <option key={sz} value={sz}>
                  {sz}px
                </option>
              ))}
            </select>
            <span style={{ color: "#ddd", fontSize: "0.85rem" }}>
              Language:
            </span>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full min-w-[100px]  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {LANGUAGES.map((l) => (
                <option key={l.value} value={l.value}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div style={{ flex: 1, minHeight: 0 }}>
          <EditorLayout
            code={code}
            setCode={setCode}
            language={language}
            fontSize={fontSize}
          />
        </div>
        <div style={{ padding: "0.5rem", textAlign: "right" }}>
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="focus:outline-none text-white bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:ring-gray-500 font-medium rounded-lg text-sm px-5 min-w-[80px] h-8 py-2.5 mb-2"
          >
            {isRunning ? "Running..." : "Run"}
          </button>
        </div>
      </div>
      <div
        onMouseDown={onMouseDown}
        style={{ width: 4, cursor: "col-resize", backgroundColor: "#333" }}
      />
      <div
        style={{
          flexGrow: 1,
          padding: "0.5rem",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#1e1e1e",
          color: "#fff",
        }}
      >
        <IO input={input} setInput={setInput} output={output} />
      </div>
    </div>
  );
}
