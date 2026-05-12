import { createFileRoute } from "@tanstack/react-router";
import { CompatibilityBridge } from "@/components/CompatibilityBridge";

export const Route = createFileRoute("/patients/")({
  component: () => (
    <CompatibilityBridge
      title="Patient Queue ถูกเปลี่ยนเป็น Elder Profiles"
      description="VoiceMed B2C ใช้โปรไฟล์ผู้สูงอายุแทนคิวผู้ป่วยโรงพยาบาล"
      to="/elder-profiles"
      cta="ดูโปรไฟล์ผู้สูงอายุ"
    />
  ),
});
