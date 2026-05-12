import { createFileRoute } from "@tanstack/react-router";
import { CompatibilityBridge } from "@/components/CompatibilityBridge";

export const Route = createFileRoute("/patients/$patientId")({
  component: () => (
    <CompatibilityBridge
      title="Patient Detail ถูกเปลี่ยนเป็น Elder Profile Detail"
      description="ข้อมูลผู้สูงอายุ แผนดูแล Bot settings และ call log อยู่ในระบบ VoiceMed ใหม่"
      to="/elder-profiles"
      cta="ไปที่ Elder Profiles"
    />
  ),
});
