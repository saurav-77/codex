import React, { useRef, useEffect } from "react";
import { Editor, useMonaco } from "@monaco-editor/react";

export function EditorLayout({ code, setCode, language, fontSize }) {
  const editorRef = useRef(null);
  const monaco = useMonaco();

  function handleEditorMount(editor) {
    editorRef.current = editor;
    editor.focus();
  }

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.updateOptions({ fontSize });
      if (monaco) {
        monaco.editor.setModelLanguage(editorRef.current.getModel(), language);
      }
    }
  }, [fontSize, language, monaco]);

  return (
    <Editor
      value={code}
      onChange={(v) => setCode(v || "")}
      onMount={handleEditorMount}
      height="100%"
      theme="vs-dark"
      language={language}
    />
  );
}
