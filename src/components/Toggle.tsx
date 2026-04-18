import { useState } from "react";

const Toggle = ({ value, onChange }) => {
  const [on, setOn] = useState(false);
  return (
    <div>
      <label className="text-xs text-gray-400 mb-2 block">Tax</label>
      <div className="flex items-center gap-3">
        <span
          className={`text-sm ${on ? "text-gray-400" : "font-medium text-gray-700"}`}
        >
          Taxable
        </span>
        <button
          type="button"
          onClick={() => setOn(!on)}
          className={`relative w-10 h-5 rounded-full transition-colors ${
            on ? "bg-green-500" : "bg-gray-200"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
              on ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
        <span
          className={`text-sm ${on ? "font-medium text-gray-700" : "text-gray-400"}`}
        >
          Tax Exempt
        </span>
      </div>

      {/* Tax Rate input — only when taxable */}
      {!on && (
        <div className="mt-3">
          <label className="text-xs text-gray-400 mb-1.5 block">
            Tax Rate <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <input
              type="number"
              step="0.0001"
              min="0"
              max="1"
              placeholder="0.0825"
              value={value}
              onChange={onChange}
              className={` pr-8`}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
              %
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Enter as decimal · TX: 0.0825 · NM: 0.05125
          </p>
        </div>
      )}
    </div>
  );
};

export default Toggle;
