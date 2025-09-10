import { Outlet } from "react-router-dom";
import Sidebar from "./AdminSidebar";
import Toolbar from "./AdminToolbar";

export default function AdminMain({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar sidebarOpen={true} />

      {/* Main section */}
      <div className="flex flex-col flex-1 ml-64">
        {/* Toolbar */}
        <div className="fixed top-0 left-64 right-0 z-40">
          <Toolbar userName="User" role="Admin" />
        </div>

        {/* Page content */}
        <main className="mt-16 p-6 overflow-y-auto flex-1">
          {children} {/* <-- this renders your dashboard content */}
          <Outlet /> {/* <-- keep this if you plan nested routes */}
        </main>
      </div>
    </div>
  );
}
