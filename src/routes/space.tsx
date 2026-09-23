import { createFileRoute } from "@tanstack/react-router";
import { SmartDashboard } from "@/components/SmartDashboard";
export const Route = createFileRoute("/space")({
  head: () => ({ meta: [{ title: "空间管理｜智域楼宇" }, { name: "description", content: "楼宇工位、会议室与空间利用效率管理。" }, { property: "og:title", content: "空间管理｜智域楼宇" }, { property: "og:description", content: "楼宇工位、会议室与空间利用效率管理。" }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => <SmartDashboard variant="space" />,
});