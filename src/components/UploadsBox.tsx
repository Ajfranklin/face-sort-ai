import { Trash, EyeIcon } from "lucide-react"
import ImageViewer from "./ImageViewer";
import useBreakpoint from "../hooks/useBreakpoint";

const UploadsBox = ({ files, onRemove }: { files: File[], onRemove: (index: number) => void }) => {
    const imagesToShowMap = {
        xs: 4,
        sm: 6,
        md: 8,
        lg: 10,        
    };
    const breakpoint = useBreakpoint();
    const previewFiles = files.slice(0, imagesToShowMap[breakpoint]-1)

    return (
        <>       
            <div className="flex mt-6 justify-between">
                <h2><span className="font-bold">{files.length}</span> <span className="text-gray-500">uploads</span></h2>
                <p className="m-0 flex items-center justify-center gap-1 cursor-pointer hover:text-blue-600"><EyeIcon size={16}/> <span className="text-sm">View All</span></p>
            </div>     
            <div className="mt-3 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
                {previewFiles.map((file, index) => {                                       
                    return (
                        <div key={index} className="relative cursor-pointer flex items center justify-center rounded-xl border border-gray-500 border-dashed group">
                            <div className="h-full flex items center justify-center p-1">
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt="preview"
                                    className="rounded-xl object-contain"
                                />
                            </div>
                            <button
                                onClick={() =>
                                    onRemove(index)
                                }
                                className="absolute -top-1 cursor-pointer -right-1 bg-red-500 rounded-full p-1 shadow opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition">
                                <Trash className="text-white" size={14} />
                            </button>
                        </div>
                    )
                })}
                {files.length >= imagesToShowMap[breakpoint] && (
                    <>
                        <div className="cursor-pointer flex items-center justify-center rounded-xl border border-gray-500 border-dashed group">
                            <div>
                                <h1 className="font-bold">+<span className="text-md">{files.length - imagesToShowMap[breakpoint]}</span></h1>  
                                <p className="m-0 text-gray-500 text-sm text-center">More</p>    
                            </div>                   
                        </div>
                    </>
                )
                }
            </div>
        </>
    )
}

export default UploadsBox