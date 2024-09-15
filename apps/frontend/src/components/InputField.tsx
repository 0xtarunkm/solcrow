export default function InputField({
  label,
  type,
}: {
  label: string;
  type: string;
}) {
  return (
    <div className="flex flex-col">
      {/* label */}
      <div className="font-semibold">* {label}(required)</div>
      <input
        type={`${type}`}
        className="border border-black outline-none px-1 py-3 rounded-sm"
      />
    </div>
  );
}
