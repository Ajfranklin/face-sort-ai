import { AlertTriangle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";


type alertProps = {
    title: string,
    message: string,
    action: 'success' | 'failure',
    onClose: () => void
}

const Alert = ({ title, message, action, onClose }: alertProps) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
            <div className="bg-white px-3 pt-8 pb-3 rounded-xl shadow-lg w-80 text-center animate-fadeIn">
                <div className={`border ${action == 'success' ? 'border-green-600' : 'border-yellow-500'} relative p-4 pt-8 rounded-xl`}>
                    <div className={`absolute top-0 border border-lg ${action == 'success' ? 'border-green-600' : 'border-yellow-500'} bg-white p-2 rounded-full transform -translate-x-1/2 -translate-y-1/2 left-1/2`}>
                        {action == 'success' ?
                            (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: [0, 1.1, 1], rotate: [0, -5, 5, 0] }}
                                    transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1.2 }}
                                    className="text-green-600"
                                >
                                    <CheckCircle size={32} />
                                </motion.div>
                            ) :
                            (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: [0, 1.1, 1], rotate: [0, -5, 5, 0] }}
                                    transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1.2 }}
                                    className="text-yellow-500"
                                >
                                    <AlertTriangle size={32} />
                                </motion.div>
                            )
                        }
                    </div>
                    <h2 className={`text-bold text-lg ${action == 'success' ? 'text-green-600' : 'text-yellow-500'}`}>{title}</h2>
                    <p className="text-sm whitespace-pre-line">{message}</p>

                    <button
                        onClick={onClose}
                        className={`mt-4 cursor-pointer px-4 w-full py-2 text-white ${action == 'success' ? 'bg-green-600' : 'bg-yellow-500'} rounded-lg hover:bg-white border border-transparent ${action == 'success' ? 'hover:text-green-600 hover:border-green-600' : 'hover:text-yellow-500 hover:border-yellow-500'} hover: `}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Alert