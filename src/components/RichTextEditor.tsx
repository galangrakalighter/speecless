import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  EditorContent,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";

const BRIDGE_URL =
  "https://goldenaromafood.com/bridge_pencilvania.php";

const BRIDGE_KEY = import.meta.env.VITE_BRIDGE_KEY as string;

interface UploadResponse {
  status: "success" | "error";
  message?: string;
  url?: string;
}

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  disabled?: boolean;
}

interface ToolbarButtonProps {
  label: string;
  title: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  label,
  title,
  active = false,
  disabled = false,
  onClick,
}) => (
  <button
    type="button"
    title={title}
    aria-label={title}
    aria-pressed={active}
    disabled={disabled}
    onClick={onClick}
    className={`min-w-9 rounded-lg border px-2.5 py-2 text-sm font-semibold transition ${
      active
        ? "border-blue-900 bg-blue-900 text-white"
        : "border-stone-300 bg-white text-stone-700 hover:bg-stone-100"
    } disabled:cursor-not-allowed disabled:opacity-40`}
  >
    {label}
  </button>
);

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingImage, setIsUploadingImage] =
    useState(false);
  const [uploadError, setUploadError] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4],
        },
      }),

      Underline,

      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),

      Image.configure({
        inline: false,
        allowBase64: false,
        HTMLAttributes: {
          class:
            "article-content-image",
        },
      }),

      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],

    content: value || "",

    editorProps: {
      attributes: {
        class:
          "min-h-[350px] px-5 py-4 text-base leading-7 text-stone-800 outline-none",
      },
    },

    onUpdate: ({ editor: currentEditor }) => {
      onChange(currentEditor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) {
      return;
    }

    const currentContent = editor.getHTML();
    const nextContent = value || "";

    if (currentContent !== nextContent) {
      editor.commands.setContent(nextContent, {
        emitUpdate: false,
      });
    }
  }, [editor, value]);

  useEffect(() => {
    if (!editor) {
      return;
    }

    editor.setEditable(!disabled);
  }, [disabled, editor]);

  const setLink = () => {
    if (!editor) {
      return;
    }

    const previousUrl =
      editor.getAttributes("link").href || "";

    const url = window.prompt(
      "Masukkan alamat tautan:",
      previousUrl,
    );

    if (url === null) {
      return;
    }

    if (url.trim() === "") {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .unsetLink()
        .run();

      return;
    }

    let normalizedUrl = url.trim();

    if (
      !/^https?:\/\//i.test(normalizedUrl) &&
      !normalizedUrl.startsWith("/") &&
      !normalizedUrl.startsWith("#")
    ) {
      normalizedUrl = `https://${normalizedUrl}`;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({
        href: normalizedUrl,
      })
      .run();
  };

  const uploadContentImage = async (file: File) => {
    if (!editor) {
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
    ];

    if (!allowedTypes.includes(file.type)) {
      throw new Error(
        "Gunakan gambar JPG, PNG, WebP, atau GIF.",
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      throw new Error(
        "Ukuran gambar maksimal 5 MB.",
      );
    }

    if (!BRIDGE_KEY) {
      throw new Error(
        "VITE_BRIDGE_KEY belum diatur.",
      );
    }

    const formData = new FormData();

    formData.append("action", "upload_image");
    formData.append("image", file);

    const response = await fetch(
      `${BRIDGE_URL}?key=${encodeURIComponent(BRIDGE_KEY)}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      },
    );

    const responseText = await response.text();

    let result: UploadResponse;

    try {
      result = JSON.parse(
        responseText,
      ) as UploadResponse;
    } catch {
      throw new Error(
        "Server tidak memberikan respons upload yang valid.",
      );
    }

    if (
      !response.ok ||
      result.status !== "success" ||
      !result.url
    ) {
      throw new Error(
        result.message || "Upload gambar gagal.",
      );
    }

    editor
      .chain()
      .focus()
      .setImage({
        src: result.url,
        alt: file.name,
        title: file.name,
      })
      .createParagraphNear()
      .run();
  };

  const handleImageSelected = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    event.target.value = "";

    if (!file) {
      return;
    }

    setUploadError("");
    setIsUploadingImage(true);

    try {
      await uploadContentImage(file);
    } catch (uploadException) {
      setUploadError(
        uploadException instanceof Error
          ? uploadException.message
          : "Upload gambar gagal.",
      );
    } finally {
      setIsUploadingImage(false);
    }
  };

  if (!editor) {
    return (
      <div className="h-[350px] animate-pulse rounded-xl bg-stone-100" />
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-stone-300 bg-white focus-within:border-blue-900 focus-within:ring-2 focus-within:ring-blue-100">
      <div className="flex flex-wrap gap-2 border-b border-stone-200 bg-stone-50 p-3">
        <ToolbarButton
          label="P"
          title="Paragraf"
          active={editor.isActive("paragraph")}
          disabled={disabled}
          onClick={() =>
            editor
              .chain()
              .focus()
              .setParagraph()
              .run()
          }
        />

        <ToolbarButton
          label="H2"
          title="Heading 2"
          active={editor.isActive("heading", {
            level: 2,
          })}
          disabled={disabled}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({ level: 2 })
              .run()
          }
        />

        <ToolbarButton
          label="H3"
          title="Heading 3"
          active={editor.isActive("heading", {
            level: 3,
          })}
          disabled={disabled}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({ level: 3 })
              .run()
          }
        />

        <span className="mx-1 w-px bg-stone-300" />

        <ToolbarButton
          label="B"
          title="Bold"
          active={editor.isActive("bold")}
          disabled={disabled}
          onClick={() =>
            editor.chain().focus().toggleBold().run()
          }
        />

        <ToolbarButton
          label="I"
          title="Italic"
          active={editor.isActive("italic")}
          disabled={disabled}
          onClick={() =>
            editor.chain().focus().toggleItalic().run()
          }
        />

        <ToolbarButton
          label="U"
          title="Underline"
          active={editor.isActive("underline")}
          disabled={disabled}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleUnderline()
              .run()
          }
        />

        <ToolbarButton
          label="S"
          title="Coret"
          active={editor.isActive("strike")}
          disabled={disabled}
          onClick={() =>
            editor.chain().focus().toggleStrike().run()
          }
        />

        <span className="mx-1 w-px bg-stone-300" />

        <ToolbarButton
          label="• List"
          title="Daftar"
          active={editor.isActive("bulletList")}
          disabled={disabled}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleBulletList()
              .run()
          }
        />

        <ToolbarButton
          label="1. List"
          title="Daftar bernomor"
          active={editor.isActive("orderedList")}
          disabled={disabled}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleOrderedList()
              .run()
          }
        />

        <ToolbarButton
          label="❝"
          title="Kutipan"
          active={editor.isActive("blockquote")}
          disabled={disabled}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleBlockquote()
              .run()
          }
        />

        <ToolbarButton
          label="—"
          title="Garis pemisah"
          disabled={disabled}
          onClick={() =>
            editor
              .chain()
              .focus()
              .setHorizontalRule()
              .run()
          }
        />

        <span className="mx-1 w-px bg-stone-300" />

        <ToolbarButton
          label="←"
          title="Rata kiri"
          active={editor.isActive({
            textAlign: "left",
          })}
          disabled={disabled}
          onClick={() =>
            editor
              .chain()
              .focus()
              .setTextAlign("left")
              .run()
          }
        />

        <ToolbarButton
          label="↔"
          title="Rata tengah"
          active={editor.isActive({
            textAlign: "center",
          })}
          disabled={disabled}
          onClick={() =>
            editor
              .chain()
              .focus()
              .setTextAlign("center")
              .run()
          }
        />

        <ToolbarButton
          label="→"
          title="Rata kanan"
          active={editor.isActive({
            textAlign: "right",
          })}
          disabled={disabled}
          onClick={() =>
            editor
              .chain()
              .focus()
              .setTextAlign("right")
              .run()
          }
        />

        <span className="mx-1 w-px bg-stone-300" />

        <ToolbarButton
          label="🔗"
          title="Tambahkan tautan"
          active={editor.isActive("link")}
          disabled={disabled}
          onClick={setLink}
        />

        <ToolbarButton
          label={
            isUploadingImage ? "Mengunggah..." : "🖼 Gambar"
          }
          title="Upload gambar ke dalam artikel"
          disabled={disabled || isUploadingImage}
          onClick={() =>
            imageInputRef.current?.click()
          }
        />

        <span className="mx-1 w-px bg-stone-300" />

        <ToolbarButton
          label="↶"
          title="Undo"
          disabled={
            disabled ||
            !editor.can().chain().focus().undo().run()
          }
          onClick={() =>
            editor.chain().focus().undo().run()
          }
        />

        <ToolbarButton
          label="↷"
          title="Redo"
          disabled={
            disabled ||
            !editor.can().chain().focus().redo().run()
          }
          onClick={() =>
            editor.chain().focus().redo().run()
          }
        />

        <input
          ref={imageInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleImageSelected}
          className="hidden"
        />
      </div>

      <EditorContent editor={editor} />

      {uploadError && (
        <div
          role="alert"
          className="border-t border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700"
        >
          {uploadError}
        </div>
      )}

      <div className="border-t border-stone-200 bg-stone-50 px-4 py-2 text-xs text-stone-500">
        Gunakan toolbar untuk memformat tulisan. Gambar di
        dalam artikel maksimal 5 MB.
      </div>
    </div>
  );
};

export default RichTextEditor;