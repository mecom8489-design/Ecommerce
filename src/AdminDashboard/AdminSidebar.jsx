import { NavLink, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Users,
  Package,
  BarChart3,
  Tag,
  Truck,
  Star,
  Settings,
  Layers,
  Headphones,
  CreditCard,
  Home,
  X,
  ShieldCheck,
  LogOut,
} from "lucide-react";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/home");
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden transition-opacity ${
          sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white text-black p-6 space-y-6 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 z-50 border-r border-gray-200`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            {/* Icon as logo */}
            <ShieldCheck className="w-7 h-7 text-blue-600" />
            <h2 className="text-2xl font-bold text-blue-600">Admin Panel</h2>
          </div>
          <button
            className="md:hidden p-2 rounded hover:bg-gray-100"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-6 h-6 text-black" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          <NavItem to="/admin" icon={<Home size={18} />} label="Dashboard" end />
          <NavItem to="/admin/orders" icon={<ShoppingCart size={18} />} label="Orders" />
          <NavItem to="/admin/products" icon={<Package size={18} />} label="Products" />
          <NavItem to="/admin/categories" icon={<Layers size={18} />} label="Categories" />
          <NavItem to="/admin/users" icon={<Users size={18} />} label="Users" />
          {/* <NavItem to="/admin/coupons" icon={<Tag size={18} />} label="Coupons" /> */}
          <NavItem to="/admin/shipping" icon={<Truck size={18} />} label="Shipping" />
          <NavItem to="/admin/payments" icon={<CreditCard size={18} />} label="Payments" />
          <NavItem to="/admin/reviews" icon={<Star size={18} />} label="Reviews" />
          <NavItem to="/admin/reports" icon={<BarChart3 size={18} />} label="Reports" />
          <NavItem to="/admin/support" icon={<Headphones size={18} />} label="Support" />
          <NavItem to="/admin/settings" icon={<Settings size={18} />} label="Settings" />

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center w-full text-left space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-red-500 hover:bg-gray-100 rounded-md transition"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </nav>
      </aside>
    </>
  );
}

// NavItem Component
function NavItem({ to, icon, label, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          isActive
            ? "text-blue-600 bg-blue-50"
            : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}
