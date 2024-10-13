export const RevenueInput: React.FC<{ value: number | "", onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ value, onChange }) => (
    <div className="relative w-1/3">
      <span className="absolute left-3 top-1/2 bold transform text-3xl -translate-y-1/2 text-blue-500">£</span>
        <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder="Enter revenue amount"
            className="w-full pl-8 p-2 text-md border text-center border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            aria-label="Revenue amount"
        />
    </div>
);