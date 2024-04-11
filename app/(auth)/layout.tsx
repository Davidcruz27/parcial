import React from "react";

function LayoutAuth({ children }: { children: React.ReactNode }) {
  return <div className="flex justify-center items-center h-screen bg-white">{children}</div>;
}

export default LayoutAuth;
