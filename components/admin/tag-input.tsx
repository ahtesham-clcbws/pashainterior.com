"use client";

import { useState, KeyboardEvent } from "react";
import { X, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  label?: string;
}

export function TagInput({ tags, onChange, placeholder = "Add tag...", label }: TagInputProps) {
  const [input, setInput] = useState("");

  const addTag = () => {
    const trimmedInput = input.trim();
    if (trimmedInput && !tags.includes(trimmedInput)) {
      onChange([...tags, trimmedInput]);
      setInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter((t) => t !== tagToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    } else if (e.key === "," || e.key === " ") {
      // Allow comma or space to add tags
      if (input.trim()) {
        e.preventDefault();
        addTag();
      }
    } else if (e.key === "Backspace" && !input && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-[10px] uppercase tracking-widest text-muted-foreground block font-medium">
          {label}
        </label>
      )}
      <div className="flex flex-wrap gap-2 p-3 bg-white/5 border border-white/10 rounded-xl focus-within:border-brand-blue/50 transition-all min-h-12.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 px-2 py-1 bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs rounded-md group animate-in fade-in zoom-in duration-200"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="hover:text-white transition-colors"
            >
              <X size={12} />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addTag}
          placeholder={tags.length === 0 ? placeholder : ""}
          className="flex-1 bg-transparent border-none outline-none text-sm text-white min-w-30 placeholder:text-white/10"
        />
      </div>
      <p className="text-[9px] text-white/20 italic">Press Enter, Space, or Comma to add tags.</p>
    </div>
  );
}
