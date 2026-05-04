import React from "react";
import JoditEditor from "jodit-react";

interface TextEditorProps {
  editorState: string;
  handleContentChange: (content: string) => void;
}

const editorConfig: any = {
  minHeight: 300,
  maxlength: 10,

  uploader: {
    insertImageAsBase64URI: true
  },

  enter: "div",
  direction: "ltr",

  activeButtonsInReadOnly: ["source", "fullsize", "print", "about"],

  disablePlugins: ["paste", "stat"],

  askBeforePasteHTML: true,

  buttons:
    "bold,italic,underline,strikethrough,eraser,ul,ol,font,fontsize,paragraph,lineHeight,superscript,subscript,classSpan,file,image,video,table,source,fullsize,about,outdent,indent,print,cut,selectall"
};

const Text_Editor: React.FC<TextEditorProps> = ({
  editorState,
  handleContentChange
}) => {
  return (
    <JoditEditor
      value={editorState}
      config={editorConfig}
      onBlur={(newContent: string) => handleContentChange(newContent)}
    />
  );
};

export default Text_Editor;