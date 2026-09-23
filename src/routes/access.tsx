import { createFileRoute } from "@tanstack/react-router";
import { SmartDashboard } from "@/components/SmartDashboard";
export const Route = createFileRoute("/_dashboard/access")({
  head: () => ({ meta: [{ title: "智慧通行｜智域楼宇" }, { name: "description", content: "园区通行流量、访客与闸机状态管理。" }, { property: "og:title", content: "智慧通行｜智域楼宇" }, { property: "og:description", content: "园区通行流量、访客与闸机状态管理。" }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => <SmartDashboard variant="access" />,
});