import { useState, useEffect } from "react";
import { X } from "lucide-react";

export const Notification = ({success, message}: {success: boolean, message: string}) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsVisible(false);
        }, 5000);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div className={`fixed top-4 right-4 p-4 rounded-lg ${
            success ? 'bg-green-100 text-green-700 border border-green-400' : 
            'bg-red-100 text-red-700 border border-red-400'
        } ${!isVisible ? 'hidden' : ''}`}>
            <button className="absolute top-2 right-2" onClick={() => setIsVisible(false)}>
                <X size={16} />
            </button>
            <p>{message}</p>
        </div>
    );
};  