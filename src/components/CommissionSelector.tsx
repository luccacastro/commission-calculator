export const CommissionSelector: React.FC<{ value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void }> = ({ value, onChange }) => (
    <div className="relative w-1/4">
      <select value={value} onChange={onChange} className="p-2 w-full border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
        <option value="placeholder">Commission Models</option>
        <option value="default">Default</option>
        <option value="premium">Premium</option>
      </select>
      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600">
        ▼
      </span>
    </div>
  );