import { createFileRoute } from "@tanstack/react-router";
import { SmartDashboard } from "@/components/SmartDashboard";
export const Route = createFileRoute("/_dashboard/security")({
  head: () => ({ meta: [{ title: "安防态势｜智域楼宇" }, { name: "description", content: "园区安防事件、巡检与风险态势。" }, { property: "og:title", content: "安防态势｜智域楼宇" }, { property: "og:description", content: "园区安防事件、巡检与风险态势。" }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => <SmartDashboard variant="security" />,
});