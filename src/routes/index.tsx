import { createFileRoute } from "@tanstack/react-router";
import { SmartDashboard } from "@/components/SmartDashboard";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "运营总览｜智域楼宇" }, { name: "description", content: "智慧楼宇园区运营态势与核心指标总览。" },
    { property: "og:title", content: "运营总览｜智域楼宇" }, { property: "og:description", content: "智慧楼宇园区运营态势与核心指标总览。" },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

function Index() {
  return <SmartDashboard variant="overview" />;
}
