import { createFileRoute } from "@tanstack/react-router";
import { CompatibilityBridge } from "@/components/CompatibilityBridge";

export const Route = createFileRoute("/appointments")({
  component: () => (
    <CompatibilityBridge
      title="Appointment Reminder ถูกย้ายไป Bot Settings"
      description="ตั้งเวลาการโทรและ reminder ของ VoiceMed ได้จากหน้า Bot Settings"
      to="/bot-settings"
      cta="ตั้งค่ารอบโทร"
    />
  ),
});
