interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export default function Modal({ isOpen, onClose, children, title, className = '' }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl ${className}`}>
        {title && (
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">{title}</h3>
        )}
        {children}
      </div>
    </div>
  );
} 