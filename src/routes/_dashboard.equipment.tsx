import { createFileRoute } from "@tanstack/react-router";
import { SmartDashboard } from "@/components/SmartDashboard";
export const Route = createFileRoute("/_dashboard/equipment")({
  head: () => ({ meta: [{ title: "设备运维｜智域楼宇" }, { name: "description", content: "楼宇设备健康、故障与工单状态管理。" }, { property: "og:title", content: "设备运维｜智域楼宇" }, { property: "og:description", content: "楼宇设备健康、故障与工单状态管理。" }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => <SmartDashboard variant="equipment" />,
});