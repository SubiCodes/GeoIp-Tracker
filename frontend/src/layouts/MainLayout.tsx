import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Example: Navbar or Sidebar can go here */}
      <header className="w-full bg-white shadow p-4 mb-4">
        <h1 className="text-xl font-bold">GeoIP Tracker</h1>
      </header>
      <main className="flex-1 w-full max-w-5xl mx-auto px-4">
        {children}
      </main>
      {/* Example: Footer can go here */}
      <footer className="w-full bg-white shadow p-4 mt-4 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} GeoIP Tracker
      </footer>
    </div>
  );
};

export default MainLayout;
