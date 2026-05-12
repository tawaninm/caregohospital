import { createFileRoute } from "@tanstack/react-router";
import { CompatibilityBridge } from "@/components/CompatibilityBridge";

export const Route = createFileRoute("/cases")({
  component: () => (
    <CompatibilityBridge
      title="Case Management ถูกเปลี่ยนเป็น Family Alerts"
      description="VoiceMed ใช้ alert และ care task ให้ครอบครัวตรวจสอบต่อ แทน workflow โรงพยาบาล"
      to="/alerts"
      cta="ดู Alerts"
    />
  ),
});
