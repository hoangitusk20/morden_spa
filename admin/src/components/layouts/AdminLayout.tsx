import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Home,
  Users,
  Clipboard,
  PanelLeftClose,
  PanelLeftOpen,
  User,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/authSlice";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigationItems = [
    { name: "Dashboard", href: "/", icon: <Home className="w-5 h-5" /> },
    {
      name: "Services",
      href: "/services",
      icon: <Clipboard className="w-5 h-5" />,
    },
    {
      name: "Bookings",
      href: "/bookings",
      icon: <Calendar className="w-5 h-5" />,
    },
    { name: "Staff", href: "/staff", icon: <Users className="w-5 h-5" /> },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    // Dispatch logout action
    dispatch(logout());
    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-white dark:bg-sidebar border-r border-border transition-all duration-300 flex flex-col",
          isSidebarCollapsed ? "w-[70px]" : "w-[250px]"
        )}
      >
        {/* Logo Area */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          {!isSidebarCollapsed && (
            <div className="text-xl font-semibold text-spa-700">SpaAdmin</div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          >
            {isSidebarCollapsed ? (
              <PanelLeftOpen className="w-5 h-5" />
            ) : (
              <PanelLeftClose className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2">
          <ul className="space-y-1">
            {navigationItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                    isActive(item.href)
                      ? "bg-spa-100 text-spa-700 font-medium"
                      : "text-gray-700 hover:bg-spa-50 hover:text-spa-700"
                  )}
                >
                  {item.icon}
                  {!isSidebarCollapsed && <span>{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-border">
          <div
            className={cn(
              "flex items-center gap-3",
              isSidebarCollapsed ? "justify-center" : ""
            )}
          >
            <div className="h-8 w-8 rounded-full bg-spa-100 flex items-center justify-center text-spa-700">
              <User className="h-4 w-4" />
            </div>
            {!isSidebarCollapsed && (
              <div>
                <p className="font-medium text-sm">Admin User</p>
                <p className="text-xs text-muted-foreground">admin@spa.com</p>
              </div>
            )}
          </div>

          {/* Logout Button */}
          <Button
            variant="ghost"
            className={cn(
              "w-full mt-2 text-red-500 hover:text-red-700 hover:bg-red-50",
              isSidebarCollapsed ? "justify-center px-0" : ""
            )}
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            {!isSidebarCollapsed && <span>Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-muted/30 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
