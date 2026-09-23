import { createFileRoute } from "@tanstack/react-router";
import { SmartBuildingShell } from "@/components/SmartBuildingShell";

export const Route = createFileRoute("/_dashboard")({ component: SmartBuildingShell });