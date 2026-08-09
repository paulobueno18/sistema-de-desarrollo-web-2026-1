export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 relative border border-amber-100">
        <div className="flex justify-between items-center mb-4 border-b border-amber-100 pb-3">
          <h3 className="text-xl font-bold text-amber-950">{title}</h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-amber-900 font-bold text-xl transition"
          >
            ✕
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};