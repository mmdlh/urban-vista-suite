import { createFileRoute } from "@tanstack/react-router";
import { SmartDashboard } from "@/components/SmartDashboard";
export const Route = createFileRoute("/environment")({
  head: () => ({ meta: [{ title: "环境监测｜智域楼宇" }, { name: "description", content: "楼宇空气质量、温湿度与舒适度监测。" }, { property: "og:title", content: "环境监测｜智域楼宇" }, { property: "og:description", content: "楼宇空气质量、温湿度与舒适度监测。" }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => <SmartDashboard variant="environment" />,
});