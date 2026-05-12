import { createFileRoute } from "@tanstack/react-router";
import { CompatibilityBridge } from "@/components/CompatibilityBridge";

export const Route = createFileRoute("/ai-followup")({
  component: () => (
    <CompatibilityBridge
      title="AI Follow-up ถูกเปลี่ยนเป็น Call History"
      description="VoiceMed แสดงประวัติการโทร/แชท transcript และ summary สำหรับครอบครัว"
      to="/call-history"
      cta="ดู Call History"
    />
  ),
});
