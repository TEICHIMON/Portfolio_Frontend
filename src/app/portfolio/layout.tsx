import React from "react";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <h1 className="text-8xl font-bold text-gray-800 mb-8">Our Works</h1>
      {children}
    </div>
  );
};
export default Layout;
