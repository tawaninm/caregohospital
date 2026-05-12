import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  Bell,
  Bot,
  CreditCard,
  FileClock,
  HeartHandshake,
  Home,
  LogOut,
  MessageCircleHeart,
  Settings,
  Sparkles,
  UserRoundPlus,
  Users,
  X,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { APP_VERSION } from "@/lib/patch-log";

const navItems = [
  { title: "แดชบอร์ด", url: "/dashboard", icon: Home },
  { title: "โปรไฟล์ผู้สูงอายุ", url: "/elder-profiles", icon: Users },
  { title: "Bot Settings", url: "/bot-settings", icon: Bot },
  { title: "แผนการดูแล", url: "/care-plans", icon: HeartHandshake },
  { title: "ประวัติการโทร", url: "/call-history", icon: MessageCircleHeart },
  { title: "แจ้งเตือน", url: "/alerts", icon: Bell },
  { title: "รายงาน", url: "/reports", icon: BarChart3 },
  { title: "Billing", url: "/billing", icon: CreditCard },
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "อัปเดต", url: "/patch-log", icon: FileClock },
];

interface Props {
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

export function AppSidebar({ mobileOpen = false, setMobileOpen }: Props) {
  const currentPath = useRouterState({ select: (state) => state.location.pathname });
  const navigate = useNavigate();
  const { userName, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/30 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen?.(false)}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-72 shrink-0 flex-col border-r border-white/60 bg-white/72 text-sidebar-foreground shadow-[24px_0_80px_rgba(37,99,235,0.10)] backdrop-blur-2xl transition-transform duration-300 md:static md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/60 px-5 py-5">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl vm-orb">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-lg font-extrabold vm-gradient-text">VoiceMed</p>
              <p className="text-xs font-semibold text-muted-foreground">
                Family AI Care {APP_VERSION}
              </p>
            </div>
          </Link>
          <button
            onClick={() => setMobileOpen?.(false)}
            className="rounded-xl p-2 hover:bg-muted md:hidden"
            aria-label="ปิดเมนู"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navItems.map((item) => {
            const active = currentPath === item.url || currentPath.startsWith(`${item.url}/`);
            const Icon = item.icon;
            return (
              <Link
                key={item.url}
                to={item.url}
                onClick={() => setMobileOpen?.(false)}
                className={`sidebar-nav-item ${active ? "sidebar-nav-item-active" : ""}`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span className="flex-1">{item.title}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/60 p-4">
          <div className="rounded-2xl border bg-white/70 p-4 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <UserRoundPlus className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">{userName || "คุณภัทร"}</p>
                <p className="text-xs text-muted-foreground">เจ้าของบัญชีครอบครัว</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border bg-white/70 px-3 py-2 text-sm font-bold text-muted-foreground hover:bg-white hover:text-primary"
            >
              <LogOut className="h-4 w-4" />
              ออกจากเดโม
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
