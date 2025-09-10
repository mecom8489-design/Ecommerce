import { NavLink } from "react-router-dom";
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
} from "lucide-react";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <>
      {/* Overlay (for mobile only) */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden transition-opacity ${
          sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white p-6 space-y-6 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 z-50`}
      >
        {/* Header with Close button (mobile only) */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          <button
            className="md:hidden p-2 rounded hover:bg-gray-800"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="space-y-3">
          <NavItem
            to="/admin"
            icon={<Home size={18} />}
            label="Dashboard"
            end
          />
          <NavItem
            to="/admin/orders"
            icon={<ShoppingCart size={18} />}
            label="Orders"
          />
          <NavItem
            to="/admin/products"
            icon={<Package size={18} />}
            label="Products"
          />
          <NavItem
            to="/admin/categories"
            icon={<Layers size={18} />}
            label="Categories"
          />
          <NavItem to="/admin/users" icon={<Users size={18} />} label="Users" />
          <NavItem
            to="/admin/coupons"
            icon={<Tag size={18} />}
            label="Coupons"
          />
          <NavItem
            to="/admin/shipping"
            icon={<Truck size={18} />}
            label="Shipping"
          />
          <NavItem
            to="/admin/payments"
            icon={<CreditCard size={18} />}
            label="Payments"
          />
          <NavItem
            to="/admin/reviews"
            icon={<Star size={18} />}
            label="Reviews"
          />
          <NavItem
            to="/admin/reports"
            icon={<BarChart3 size={18} />}
            label="Reports"
          />
          <NavItem
            to="/admin/support"
            icon={<Headphones size={18} />}
            label="Support"
          />
          <NavItem
            to="/admin/settings"
            icon={<Settings size={18} />}
            label="Settings"
          />
        </nav>
      </aside>
    </>
  );
}

function NavItem({ to, icon, label, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center space-x-2 px-2 py-2 rounded-md transition-colors ${
          isActive
            ? "text-yellow-400 font-semibold bg-gray-800"
            : "text-gray-300 hover:text-yellow-400 hover:bg-gray-800"
        }`
      }
    >
      {icon} <span>{label}</span>
    </NavLink>
  );
}
