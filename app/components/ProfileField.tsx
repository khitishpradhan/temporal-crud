interface ProfileFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  type?: 'text' | 'tel' | 'textarea';
  rows?: number;
  editMode?: boolean;
  onChange?: (value: string) => void;
  gradientFrom?: string;
  gradientTo?: string;
  borderColor?: string;
  labelColor?: string;
}

export default function ProfileField({
  label,
  value,
  placeholder = '',
  type = 'text',
  rows = 4,
  editMode = false,
  onChange,
  gradientFrom = 'from-blue-50',
  gradientTo = 'to-purple-50',
  borderColor = 'border-blue-100',
  labelColor = 'text-blue-600'
}: ProfileFieldProps) {
  if (editMode) {
    return (
      <div>
        <label className="block text-gray-700 font-semibold mb-3">{label}</label>
        {type === 'textarea' ? (
          <textarea
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            rows={rows}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white resize-none"
            placeholder={placeholder}
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white"
            placeholder={placeholder}
          />
        )}
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} p-6 rounded-2xl border ${borderColor}`}>
      <div className={`${labelColor} text-sm font-medium mb-2`}>{label}</div>
      <div className="text-gray-900 text-xl font-semibold">
        {value || 'Not set'}
      </div>
    </div>
  );
} 