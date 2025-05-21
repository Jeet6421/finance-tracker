import React from "react";

// Base Card component with optional custom styling
export const Card = ({ children, className = "" }) => (
  <div className={`bg-white shadow-lg rounded-lg overflow-hidden ${className}`}>
    {children}
  </div>
);

// Card content section
export const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);
