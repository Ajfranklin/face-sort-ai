import { useState, useRef } from "react";
import { Upload, Loader2 } from "lucide-react";
import Alert from "../components/Alert";
import UploadsBox from "../components/UploadsBox";
import uploadService from "../services/uploadService";
import Modal from "../components/Modal";
import { extractZip } from "../utils/unzip";

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [alert, setAlert] = useState<React.ComponentProps<typeof Alert> | null>(null)
  const [modal, setModal] = useState<React.ComponentProps<typeof Modal> | null>(null)
  const [uploadProgress, setUploadProgress] = useState<Number>(0);
  const [response, setResponse] = useState<Awaited<ReturnType<typeof uploadService>> | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const allowedExtensions = ["jpg", "jpeg", "png", "zip"];  

  const updateFiles = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index) )
  }

  const handleFiles = async (files: FileList | null) => {
    if(files){      
      const arr = Array.from(files); 
      let validfiles:File[] = []
      let hasInvalidFiles = false
      for (const x of arr) {       
        let ext: string = x.name.split(".").at(-1) ?? ""
        if(!allowedExtensions.includes(ext)) hasInvalidFiles = true          
        else {
            if(ext != 'zip') validfiles.push(x)
            else {
              let result = await extractZip(x)   
              console.log(result)           
              result['images'].forEach((x: File) => {                
                validfiles.push(x)
              })
              if(result['hasInvalidFiles']) hasInvalidFiles = true
            }
        }
      }     
      if(hasInvalidFiles){
        setAlert({
          title: 'Invaild format!!',
          message: "Some uploaded files seems to be on invalid format, It has been skipped automatically.", 
          action: "failure", 
          onClose: () => setAlert(null)}
        )
      }      
      setFiles((prev) => [...prev, ...validfiles]);           
    }
  };

  const uploadFiles = async () => {
    try {
      const data = await uploadService(files, (percent: number) => {
        setUploadProgress(percent);
      });

      setResponse(data); 
    } catch (err) {      
      console.error(err);
    }
  }

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  return (    
    <div className="min-h-screen bg-gray-50 flex flex-col">      
      { alert && <Alert {...alert}/>}
      { modal && <Modal {...modal}/> }
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
            accept="image/*,.zip"
            className="hidden"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFiles(e.target.files)}
          />

          <div className="flex flex-col items-center">
            <Upload size={48} className="text-gray-500 mb-3" />
            <p className="font-medium text-lg text-center">Drag & Drop Images or Archives Here</p>
            <p className="text-gray-500 text-sm mt-1 text-center">
              or click to browse — supports JPG, PNG, .zip
            </p>
          </div>
        </div>
        
        {files.length > 0 && (
          <UploadsBox onRemove={updateFiles} files={files} />          
        )}
        
        {files.length > 0 && (
          <div className="flex gap-4 mt-8">
            <button
              onClick={() => uploadFiles()}
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
