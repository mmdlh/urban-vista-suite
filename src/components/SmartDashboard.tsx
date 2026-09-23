import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import type { EChartsOption } from "echarts";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Radio,
} from "lucide-react";

const palette = ["#32e6ff", "#2cf2a0", "#ffd166", "#ff6485", "#9b8cff"];
const axis = {
  axisLine: { lineStyle: { color: "rgba(128,210,230,.25)" } },
  axisLabel: { color: "rgba(220,248,255,.62)", fontSize: 10 },
  splitLine: { lineStyle: { color: "rgba(128,210,230,.09)" } },
};

function lineOption(title: string): EChartsOption {
  return {
    color: palette,
    tooltip: { trigger: "axis", backgroundColor: "rgba(4,20,32,.92)", borderColor: "#32e6ff", textStyle: { color: "#eaffff" } },
    legend: { top: 8, right: 8, textStyle: { color: "rgba(220,248,255,.72)" } },
    grid: { top: 48, left: 42, right: 18, bottom: 30 },
    xAxis: { type: "category", data: ["00", "04", "08", "12", "16", "20", "24"], ...axis },
    yAxis: { type: "value", ...axis },
    series: [
      { name: title, type: "line", smooth: true, symbol: "circle", symbolSize: 7, data: [52, 46, 68, 82, 74, 91, 65], lineStyle: { width: 3 }, areaStyle: { opacity: 0.18 } },
      { name: "昨日", type: "line", smooth: true, data: [45, 52, 60, 73, 70, 78, 58], lineStyle: { width: 2, type: "dashed" } },
    ],
  };
}

function barOption(): EChartsOption {
  return {
    color: palette,
    tooltip: { trigger: "axis" },
    grid: { top: 18, left: 42, right: 14, bottom: 28 },
    xAxis: { type: "category", data: ["B2", "B1", "1F", "3F", "8F", "12F"], ...axis },
    yAxis: { type: "value", ...axis },
    series: [{ type: "bar", data: [48, 62, 84, 73, 91, 68], barWidth: 14, itemStyle: { borderRadius: [6, 6, 0, 0], color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: "#32e6ff" }, { offset: 1, color: "rgba(44,242,160,.18)" }]) } }],
  };
}

function pieOption(): EChartsOption {
  return {
    color: palette,
    tooltip: { trigger: "item" },
    legend: { bottom: 2, textStyle: { color: "rgba(220,248,255,.66)", fontSize: 10 } },
    series: [{ type: "pie", radius: ["48%", "72%"], center: ["50%", "44%"], padAngle: 3, itemStyle: { borderRadius: 5 }, label: { color: "#dffbff", formatter: "{d}%" }, data: [{ value: 46, name: "空调" }, { value: 28, name: "照明" }, { value: 17, name: "动力" }, { value: 9, name: "其他" }] }],
  };
}

function radarOption(): EChartsOption {
  return {
    color: palette,
    tooltip: {},
    radar: { radius: "66%", splitNumber: 4, axisName: { color: "rgba(220,248,255,.75)" }, splitArea: { areaStyle: { color: ["rgba(50,230,255,.02)", "rgba(50,230,255,.07)"] } }, axisLine: { lineStyle: { color: "rgba(50,230,255,.24)" } }, splitLine: { lineStyle: { color: "rgba(50,230,255,.18)" } }, indicator: [{ name: "稳定", max: 100 }, { name: "效率", max: 100 }, { name: "寿命", max: 100 }, { name: "负荷", max: 100 }, { name: "维护", max: 100 }] },
    series: [{ type: "radar", data: [{ value: [92, 78, 86, 72, 88], name: "设备健康" }], areaStyle: { opacity: .25 }, lineStyle: { width: 2 } }],
  };
}

function Chart({ option, className = "" }: { option: EChartsOption; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const chart = echarts.init(ref.current);
    chart.setOption({ backgroundColor: "transparent", animationDuration: 900, ...option });
    const resize = () => chart.resize();
    window.addEventListener("resize", resize);
    const observer = new ResizeObserver(resize);
    observer.observe(ref.current);
    return () => { observer.disconnect(); window.removeEventListener("resize", resize); chart.dispose(); };
  }, [option]);
  return <div ref={ref} className={`chart ${className}`} />;
}

type Variant = "overview" | "energy" | "equipment" | "security" | "environment" | "space" | "access";
const content: Record<Variant, { eyebrow: string; title: string; subtitle: string; metrics: Array<[string, string, string, boolean]>; line: string; table: string; rows: string[][] }> = {
  overview: { eyebrow: "CAMPUS DIGITAL TWIN · 07:42", title: "运营总览", subtitle: "园区运行态势一屏统览", metrics: [["在线设备", "2,486", "+3.2%", true], ["今日能耗", "18.6 MWh", "-8.4%", false], ["空间利用率", "82.4%", "+5.1%", true], ["待处理告警", "12", "3 紧急", false]], line: "实时负荷", table: "实时事件", rows: [["A塔 12F", "空调机组振动偏高", "注意", "2分钟前"], ["地下车库 B2", "照明回路自动恢复", "正常", "8分钟前"], ["C座东门", "访客通行已授权", "正常", "12分钟前"]] },
  energy: { eyebrow: "ENERGY INTELLIGENCE", title: "能源中心", subtitle: "多能源协同与碳效追踪", metrics: [["综合能耗", "18,642 kWh", "-8.4%", false], ["光伏发电", "3,280 kWh", "+12.7%", true], ["今日碳排", "7.42 t", "-6.2%", false], ["节能收益", "¥ 8,920", "+9.8%", true]], line: "峰谷负荷", table: "分项用能排名", rows: [["A塔中央空调", "6,420 kWh", "34.4%", "优"], ["公共照明", "3,186 kWh", "17.1%", "良"], ["电梯系统", "2,074 kWh", "11.1%", "良"]] },
  equipment: { eyebrow: "ASSET PULSE", title: "设备运维", subtitle: "全生命周期健康管理", metrics: [["设备总数", "2,486", "+18 本月", true], ["健康指数", "92.6", "+1.8", true], ["进行中工单", "24", "6 加急", false], ["平均修复", "38 min", "-12%", false]], line: "故障趋势", table: "关键设备状态", rows: [["CH-01 冷水机组", "运行 68%", "健康", "刚刚"], ["AHU-1208 空调箱", "振动 4.2", "关注", "3分钟前"], ["ELV-A03 电梯", "待机", "健康", "5分钟前"]] },
  security: { eyebrow: "SECURITY COMMAND", title: "安防态势", subtitle: "全域感知与事件联动", metrics: [["在线点位", "684", "99.7%", true], ["今日事件", "36", "-18.2%", false], ["巡检完成", "94%", "+4.0%", true], ["高风险", "2", "处理中", false]], line: "事件密度", table: "安防事件流", rows: [["南广场", "周界徘徊识别", "核验中", "1分钟前"], ["A塔消防通道", "通道占用解除", "已关闭", "6分钟前"], ["地下车库", "车辆逆行预警", "已派单", "9分钟前"]] },
  environment: { eyebrow: "ENVIRONMENT SENSE", title: "环境监测", subtitle: "空气、温湿度与舒适度洞察", metrics: [["综合舒适度", "93.2", "+2.4", true], ["平均温度", "23.6°C", "舒适", true], ["平均 CO₂", "612 ppm", "优", true], ["异常点位", "4", "-3", false]], line: "温湿度变化", table: "环境传感器", rows: [["A塔 8F 开放区", "23.4°C / 48%", "优", "在线"], ["B塔 3F 会议室", "25.8°C / 61%", "关注", "在线"], ["裙房中庭", "22.9°C / 45%", "优", "在线"]] },
  space: { eyebrow: "SPACE PERFORMANCE", title: "空间管理", subtitle: "从面积到使用效能的精细运营", metrics: [["可用工位", "328", "+42", true], ["实时在席", "76.8%", "+6.1%", true], ["会议室利用", "68.4%", "+3.6%", true], ["闲置面积", "1,240㎡", "-9.2%", false]], line: "空间热度", table: "空间使用状态", rows: [["A塔 12F 协作区", "86%", "活跃", "142 人"], ["B塔 6F 会议中心", "72%", "适中", "18 场"], ["C塔 3F 灵活办公", "48%", "宽松", "64 人"]] },
  access: { eyebrow: "SMART ACCESS", title: "智慧通行", subtitle: "无感通行与访客流量调度", metrics: [["今日通行", "12,684", "+8.7%", true], ["在园访客", "326", "+24", true], ["平均耗时", "1.8 s", "-0.3s", false], ["异常拦截", "18", "已处置", false]], line: "通行流量", table: "异常通行记录", rows: [["A塔北闸机", "尾随行为识别", "已拦截", "2分钟前"], ["车库 2号入口", "未授权车辆", "人工核验", "7分钟前"], ["B塔访客闸机", "凭证已过期", "已关闭", "11分钟前"]] },
};

function Metric({ item }: { item: [string, string, string, boolean] }) {
  const [label, value, trend, positive] = item;
  return <article className="glass metric-card"><div className="metric-top"><span>{label}</span><Radio size={15} /></div><strong>{value}</strong><small className={positive ? "trend-positive" : "trend-warn"}>{positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}{trend}</small></article>;
}

function Panel({ title, tag, children, className = "" }: { title: string; tag?: string; children: React.ReactNode; className?: string }) {
  return <section className={`glass panel ${className}`}><header><h2>{title}</h2>{tag && <span className="panel-tag">{tag}</span>}</header>{children}</section>;
}

function DataTable({ title, rows }: { title: string; rows: string[][] }) {
  return <Panel title={title} tag="实时"><div className="data-table">{rows.map((row, i) => <div className="table-row" key={row[0]}><span className="status-dot" data-status={i === 1 ? "warn" : "ok"} /><div><strong>{row[0]}</strong><small>{row[1]}</small></div><b>{row[2]}</b><time>{row[3]}</time></div>)}</div></Panel>;
}

export function SmartDashboard({ variant }: { variant: Variant }) {
  const page = content[variant];
  return <div className={`page page-${variant}`}>
    <header className="page-heading"><div><p>{page.eyebrow}</p><h1>{page.title}</h1><span>{page.subtitle}</span></div><div className="live-chip"><i />实时数据接入</div></header>
    <div className="metric-grid">{page.metrics.map((item) => <Metric key={item[0]} item={item} />)}</div>
    <div className="dashboard-grid">
      <Panel title={page.line} tag="24H" className="panel-line"><Chart option={lineOption(page.line)} /></Panel>
      <Panel title={variant === "equipment" ? "设备健康画像" : variant === "security" ? "风险能力画像" : "运行能力画像"} className="panel-radar"><Chart option={radarOption()} /></Panel>
      <Panel title={variant === "space" ? "楼层利用率" : "楼层运行指数"} className="panel-bar"><Chart option={barOption()} /></Panel>
      <Panel title={variant === "energy" ? "能源构成" : variant === "access" ? "访客构成" : "系统构成"} className="panel-pie"><Chart option={pieOption()} /></Panel>
      <DataTable title={page.table} rows={page.rows} />
      <Panel title="运行态势" tag="LIVE" className="status-panel"><div className="status-list"><div><CheckCircle2 /><span>核心系统稳定</span><strong>99.98%</strong></div><div><Clock3 /><span>自动策略执行</span><strong>128 次</strong></div><div><AlertTriangle /><span>待确认事项</span><strong>4 项</strong></div></div></Panel>
    </div>
  </div>;
}