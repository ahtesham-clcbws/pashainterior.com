"use client";

import { useRef, useEffect, useState } from "react";
import { Bold, Italic, List, ListOrdered, Type } from "lucide-react";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

export function RichTextEditor({ value, onChange, label, placeholder }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Update editor content when value changes externally (initial load)
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCommand = (command: string, value: string = "") => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-[10px] uppercase tracking-widest text-muted-foreground block font-medium">
          {label}
        </label>
      )}
      <div 
        className={cn(
          "bg-white/5 border rounded-xl overflow-hidden transition-all duration-300",
          isFocused ? "border-brand-blue/50 ring-1 ring-brand-blue/20" : "border-white/10"
        )}
      >
        {/* Toolbar */}
        <div className="flex items-center gap-1 p-2 border-b border-white/5 bg-white/2">
          <ToolbarButton 
            onClick={() => execCommand("bold")} 
            icon={<Bold size={14} />} 
            title="Bold" 
          />
          <ToolbarButton 
            onClick={() => execCommand("italic")} 
            icon={<Italic size={14} />} 
            title="Italic" 
          />
          <div className="w-px h-4 bg-white/10 mx-1" />
          <ToolbarButton 
            onClick={() => execCommand("insertUnorderedList")} 
            icon={<List size={14} />} 
            title="Bullet List" 
          />
          <ToolbarButton 
            onClick={() => execCommand("insertOrderedList")} 
            icon={<ListOrdered size={14} />} 
            title="Numbered List" 
          />
          <div className="w-px h-4 bg-white/10 mx-1" />
          <ToolbarButton 
            onClick={() => execCommand("formatBlock", "<h3>")} 
            icon={<Type size={14} />} 
            title="Heading" 
          />
        </div>

        {/* Editor Area */}
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            handleInput();
          }}
          className="p-4 min-h-37.5 outline-none text-sm text-white/80 prose prose-invert prose-sm max-w-none 
                     [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 
                     [&_h3]:text-brand-blue [&_h3]:font-heading [&_h3]:mt-4 [&_h3]:mb-2"
        />
        {!value && !isFocused && (
          <div className="absolute top-22 left-4 pointer-events-none text-white/10 text-sm italic">
            {placeholder || "Enter description..."}
          </div>
        )}
      </div>
    </div>
  );
}

function ToolbarButton({ onClick, icon, title }: { onClick: () => void; icon: React.ReactNode; title: string }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      title={title}
      className="p-2 hover:bg-white/10 rounded-md text-white/40 hover:text-brand-blue transition-all"
    >
      {icon}
    </button>
  );
}
