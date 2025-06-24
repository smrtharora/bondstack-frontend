export function Select({ value, onValueChange, children }) {
  return <div>{children}</div>;
}

export function SelectTrigger({ className = "", children }) {
  return <div className={`border rounded px-3 py-2 w-full ${className}`}>{children}</div>;
}

export function SelectValue({ placeholder }) {
  return <span>{placeholder}</span>;
}

export function SelectContent({ children }) {
  return <div>{children}</div>;
}

export function SelectItem({ value, children }) {
  return <div data-value={value}>{children}</div>;
}
