import { Link, Outlet } from "@tanstack/react-router";
import {
  Activity,
  Building2,
  Cctv,
  DoorOpen,
  Gauge,
  LayoutGrid,
  Leaf,
  Wrench,
} from "lucide-react";

const navigation = [
  { to: "/", label: "运营总览", icon: Gauge },
  { to: "/energy", label: "能源中心", icon: Leaf },
  { to: "/equipment", label: "设备运维", icon: Wrench },
  { to: "/security", label: "安防态势", icon: Cctv },
  { to: "/environment", label: "环境监测", icon: Activity },
  { to: "/space", label: "空间管理", icon: LayoutGrid },
  { to: "/access", label: "智慧通行", icon: DoorOpen },
] as const;

export function SmartBuildingShell() {
  return (
    <div className="app-canvas">
      <header className="topbar">
        <Link to="/" className="brand" aria-label="智域楼宇运营中心">
          <span className="brand-mark"><Building2 size={22} /></span>
          <span><strong>智域楼宇</strong><small>SMART BUILDING OS</small></span>
        </Link>
        <nav className="nav-scroller" aria-label="一级菜单">
          {navigation.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact: to === "/" }}
              className="nav-link"
              activeProps={{ className: "nav-link nav-link-active" }}
              title={label}
            >
              <Icon size={17} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
        <div className="system-live"><i />系统在线</div>
      </header>
      <main className="dashboard-main"><Outlet /></main>
    </div>
  );
}