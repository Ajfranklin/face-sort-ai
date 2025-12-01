import { X } from "lucide-react";

const Modal = ({onClose, title }: {onClose: ()=> void, title: string}) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">            
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn"
                onClick={onClose}
            />            
            <div className="relative bg-white rounded-2xl shadow-xl w-11/12 max-w-md p-6 animate-scaleIn">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <button onClick={onClose} className="hover:text-red-500 transition">
                        <X size={20} />
                    </button>
                </div>                                
            </div>
        </div>
    );
}

export default Modal;