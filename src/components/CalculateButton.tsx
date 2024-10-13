export const CalculateButton: React.FC<{ onClick: () => void, disabled: boolean }> = ({ onClick, disabled }) => (
    <button onClick={onClick} disabled={disabled} className={`p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-700 flex items-center ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <span className="material-icons mr-2"></span>Calculate
    </button>
  );