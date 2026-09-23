import { createFileRoute } from "@tanstack/react-router";
import { SmartDashboard } from "@/components/SmartDashboard";
export const Route = createFileRoute("/energy")({
  head: () => ({ meta: [{ title: "能源中心｜智域楼宇" }, { name: "description", content: "楼宇多能源协同、负荷与碳效分析。" }, { property: "og:title", content: "能源中心｜智域楼宇" }, { property: "og:description", content: "楼宇多能源协同、负荷与碳效分析。" }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => <SmartDashboard variant="energy" />,
});