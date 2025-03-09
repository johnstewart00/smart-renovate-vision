
import React, { useState, useRef } from "react";
import { uploadImage } from "@/utils/api";
import { toast } from "sonner";

interface ImageUploadProps {
  onChange: (file: File | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (file: File | null) => {
    if (!file) {
      setPreview(null);
      onChange(null);
      return;
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5MB");
      return;
    }

    try {
      setIsUploading(true);
      const previewUrl = await uploadImage(file);
      setPreview(previewUrl);
      onChange(file);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full mb-6">
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-2 text-foreground/80">
          Upload a photo of your space
        </label>
        
        {preview ? (
          <div className="relative rounded-lg overflow-hidden animate-scale-in">
            <img 
              src={preview} 
              alt="Preview" 
              className="w-full h-64 object-cover"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-3 right-3 bg-foreground/20 hover:bg-foreground/30 text-white rounded-full p-2 backdrop-blur-sm transition-colors duration-200"
              aria-label="Remove image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        ) : (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
              isDragging 
                ? 'border-primary bg-primary/5' 
                : 'border-border hover:border-primary/50 hover:bg-secondary/50'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleBrowseClick}
          >
            <div className="flex flex-col items-center">
              <svg
                className="w-12 h-12 text-muted-foreground mb-3"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"></path>
                <path d="m9 15 3-3 3 3"></path>
                <path d="M14 8 19 3"></path>
                <path d="M16 3h3v3"></path>
                <path d="M12 12v3"></path>
              </svg>
              {isUploading ? (
                <p className="text-sm text-muted-foreground">Uploading...</p>
              ) : (
                <>
                  <p className="text-sm font-medium mb-1">Drag and drop an image here, or click to browse</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG or WEBP (max 5MB)</p>
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                handleFileChange(file);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
