import { useState, useRef } from "react";
import { Upload, X, Loader2 } from "lucide-react";

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFiles = (files: FileList | null) => {
    if(files){      
      const arr = Array.from(files);      
      setFiles((prev) => [...prev, ...arr]);      
    }
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">      
      <header className="w-full bg-white shadow-sm py-4 px-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">FaceSort AI</h1>     
      </header>
      
      <section className="text-center py-12 px-6">
        <h2 className="text-4xl font-bold mb-3">
          AI-Powered Face Grouping System
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Upload images and let AI automatically detect and group people.
        </p>
      </section>
      
      <div className="max-w-3xl mx-auto w-full px-6">
        <div
          className={`border-2 select-none border-dashed rounded-2xl p-10 transition-all cursor-pointer 
          ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"}`}
          onDragOver={(e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDrop}   
          onClick={() => fileInputRef.current?.click()}       
        >
          <input
            id="file-input"
            type="file"
            ref={fileInputRef}
            multiple
            accept="image/*,.zip,.rar,.7z,.tar,.gz,.tgz"
            className="hidden"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFiles(e.target.files)}
          />

          <div className="flex flex-col items-center">
            <Upload size={48} className="text-gray-500 mb-3" />
            <p className="font-medium text-lg text-center">Drag & Drop Images or Archives Here</p>
            <p className="text-gray-500 text-sm mt-1 text-center">
              or click to browse — supports JPG, PNG, .zip, .rar, .7z, .tar, .gz, .tgz
            </p>
          </div>
        </div>
        
        {files.length > 0 && (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {files.map((file, index) => (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="w-full h-32 object-cover rounded-xl border"
                />
                <button
                  onClick={() =>
                    setFiles((prev) => prev.filter((_, i) => i !== index))
                  }
                  className="absolute top-1 right-1 bg-white rounded-full p-1 shadow opacity-0 
                  group-hover:opacity-100 transition"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
        
        {files.length > 0 && (
          <div className="flex gap-4 mt-8">
            <button
              onClick={() => setIsLoading(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-medium 
              hover:bg-blue-700 transition shadow"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin" />
                  Processing…
                </div>
              ) : (
                "Start Analysis"
              )}
            </button>

            <button
              onClick={() => setFiles([])}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl text-lg font-medium 
              hover:bg-gray-300 transition"
            >
              Clear All
            </button>
          </div>
        )}
      </div>        
    </div>
  );
}
