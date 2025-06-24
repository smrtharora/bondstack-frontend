
import React, { useState } from "react";

export function Tabs({ children, defaultValue }) {
  const [value, setValue] = useState(defaultValue);

  return (
    <div>
      {React.Children.map(children, (child) => {
        if (child.type.displayName === "TabsList") {
          return React.cloneElement(child, { value, setValue });
        }
        if (child.type.displayName === "TabsContent") {
          return child.props.value === value ? child : null;
        }
        return child;
      })}
    </div>
  );
}

export function TabsList({ children, value, setValue, className = "" }) {
  return (
    <div className={`flex space-x-2 ${className}`}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { isActive: child.props.value === value, onClick: () => setValue(child.props.value) })
      )}
    </div>
  );
}
TabsList.displayName = "TabsList";

export function TabsTrigger({ children, value, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded ${isActive ? "bg-blue-600 text-white" : "bg-gray-200 text-black"}`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ children }) {
  return <div className="mt-4">{children}</div>;
}
TabsContent.displayName = "TabsContent";
