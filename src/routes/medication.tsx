import { createFileRoute } from "@tanstack/react-router";
import { CompatibilityBridge } from "@/components/CompatibilityBridge";

export const Route = createFileRoute("/medication")({
  component: () => (
    <CompatibilityBridge
      title="Medication Follow-up รวมอยู่ใน Care Plans"
      description="VoiceMed เตือนการกินยาแบบปลอดภัย ไม่แนะนำปรับยาเอง และส่งให้ครอบครัวดูต่อ"
      to="/care-plans"
      cta="ดูแผนเตือนยา"
    />
  ),
});
