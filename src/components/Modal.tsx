type ModalProps = {
    isOpen: boolean;
    title: string;
    children: React.ReactNode;
    onClose: () => void;
};

export default function Modal({ isOpen, title, children, onClose }: ModalProps) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 animate-fadeIn">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 relative">
                <h3 className="text-2xl font-bold mb-6 text-center text-gray-700">{title}</h3>
                <div>{children}</div>
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
                    onClick={onClose}
                    aria-label="Cerrar"
                >
                    ✖️
                </button>
            </div>
        </div>
    );
}