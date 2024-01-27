import React from "react"
import { Project } from "@/db/schema"
import Document from "@tiptap/extension-document"
import Paragraph from "@tiptap/extension-paragraph"
import TaskItem from "@tiptap/extension-task-item"
import TaskList from "@tiptap/extension-task-list"
import Text from "@tiptap/extension-text"
import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

type Props = {
  project: Project
}

function Editor({ project }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Document,
      Paragraph,
      Text,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
    ],
    content: `<p>${project.description}</p>`,
    editorProps: {
      attributes: {
        class:
          "mt-20 p-2 min-h-56 border prose prose-sm sm:prose lg:prose-lg mx-auto focus:outline-none",
      },
    },
  })

  return (
    <>
      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{
            duration: 100,
          }}
        >
          <button
            onClick={() => {
              // get current selected text
              const { from, to } = editor.state.selection
              const range = { from, to }
              const text = editor.state.doc.textBetween(from, to)
              console.log(text)
            }}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            bold
          </button>
        </BubbleMenu>
      )}

      <EditorContent editor={editor}></EditorContent>
    </>
  )
}

export default Editor
