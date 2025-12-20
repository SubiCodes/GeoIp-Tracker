import React from "react";

interface AuthPagesProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthPagesProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
