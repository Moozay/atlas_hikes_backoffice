import { useRef, useState } from "react";
import { X, Upload, Loader2, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

async function getSignature() {
  const res = await fetch("/api/upload/sign", {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to get upload signature");
  return res.json() as Promise<{
    timestamp: number;
    signature: string;
    apiKey: string;
    cloudName: string;
    folder: string;
  }>;
}

async function uploadToCloudinary(file: File): Promise<string> {
  const { timestamp, signature, apiKey, cloudName, folder } = await getSignature();

  const form = new FormData();
  form.append("file", file);
  form.append("api_key", apiKey);
  form.append("timestamp", String(timestamp));
  form.append("signature", signature);
  form.append("folder", folder);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: form }
  );

  const data = await res.json();
  if (!res.ok) {
    const msg = data?.error?.message ?? `Upload failed (HTTP ${res.status})`;
    throw new Error(msg);
  }

  // Insert transformation params after /upload/ for auto quality, format (WebP), and max width
  const url: string = data.secure_url;
  const uploadIdx = url.indexOf("/upload/");
  if (uploadIdx === -1) return url;
  return url.slice(0, uploadIdx + 8) + "q_auto,f_auto,w_1600/" + url.slice(uploadIdx + 8);
}

export function ImageUploader({ images, onChange, maxImages = 10 }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const remaining = maxImages - images.length;
    if (remaining <= 0) {
      setError(`Maximum ${maxImages} images allowed.`);
      return;
    }
    const toUpload = Array.from(files).slice(0, remaining);
    setUploading(true);
    setError(null);
    try {
      const urls = await Promise.all(toUpload.map(uploadToCloudinary));
      onChange([...images, ...urls]);
    } catch (err: any) {
      setError(err?.message ?? "Upload failed. Please try again.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function remove(idx: number) {
    onChange(images.filter((_, i) => i !== idx));
  }

  return (
    <div className="space-y-3">
      {/* Existing images grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {images.map((url, idx) => (
            <div key={url} className="relative group aspect-video rounded-lg overflow-hidden border border-border/50 bg-muted">
              <img
                src={url}
                alt={`Tour image ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => remove(idx)}
                className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              {idx === 0 && (
                <span className="absolute bottom-1 left-1 text-[10px] font-semibold bg-black/60 text-white px-1.5 py-0.5 rounded">
                  Cover
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Drop zone */}
      {images.length < maxImages && (
        <div
          className={cn(
            "border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors",
            dragOver
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-muted/50"
          )}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            handleFiles(e.dataTransfer.files);
          }}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="text-sm">Uploading…</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                {images.length === 0 ? (
                  <ImageIcon className="w-5 h-5" />
                ) : (
                  <Upload className="w-5 h-5" />
                )}
              </div>
              <div>
                <span className="text-sm font-medium text-foreground">Click to upload</span>
                <span className="text-sm text-muted-foreground"> or drag and drop</span>
              </div>
              <span className="text-xs text-muted-foreground">
                JPG, PNG, WebP — max {maxImages - images.length} more
              </span>
            </div>
          )}
        </div>
      )}

      {error && <p className="text-xs text-destructive">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
