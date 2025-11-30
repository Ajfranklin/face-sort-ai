import { X } from "lucide-react"

const UploadSlider = ({ files, onRemove }: { files: File[], onRemove: (index: number) => void }) => {
    return (
        <>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {files.map((file, index) => {
                    console.log(file)
                    return (
                        <div key={index} className="relative group">
                            <img
                                src={URL.createObjectURL(file)}
                                alt="preview"
                                className="w-full h-32 object-cover rounded-xl border"
                            />
                            <button
                                onClick={() =>
                                    onRemove(index)
                                }
                                className="absolute top-1 right-1 bg-white rounded-full p-1 shadow opacity-0  group-hover:opacity-100 transition">
                                <X size={16} />
                            </button>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default UploadSlider