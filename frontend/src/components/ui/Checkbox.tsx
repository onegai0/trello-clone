interface CheckboxProps {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
}

export default function Checkbox({ checked, onChange }: CheckboxProps) {
    return (
        <label className="flex items-center gap-2 cursor-pointer"  translate="no">
            <input
                type="checkbox"
                className="hidden peer"
                checked={checked}
                onChange={(e) => onChange?.(e.target.checked)}
            />

            <div className="
     size-4 border-[2px] rounded
    border-gray-400

    transition-colors duration-200

    peer-hover:border-amber-400
    peer-checked:bg-amber-500
    peer-checked:border-amber-500

    flex items-center justify-center
  ">
                <svg
                    className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                >
                    <path d="M5 13l4 4L19 7" />
                </svg>
            </div>
        </label>
    );
}