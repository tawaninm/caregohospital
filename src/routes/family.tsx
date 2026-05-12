import { createFileRoute } from "@tanstack/react-router";
import { CompatibilityBridge } from "@/components/CompatibilityBridge";

export const Route = createFileRoute("/family")({
  component: () => (
    <CompatibilityBridge
      title="Family Notification รวมอยู่ใน Alerts"
      description="การแจ้งเตือนครอบครัวและ caregiver log อยู่ในหน้า Alerts และ Elder Profiles"
      to="/alerts"
      cta="ไปที่ Alerts"
    />
  ),
});
