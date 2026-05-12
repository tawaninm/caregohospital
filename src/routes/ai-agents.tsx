import { createFileRoute } from "@tanstack/react-router";
import { CompatibilityBridge } from "@/components/CompatibilityBridge";

export const Route = createFileRoute("/ai-agents")({
  component: () => (
    <CompatibilityBridge
      title="AI Agent Center ถูกเปลี่ยนเป็น Bot Settings"
      description="VoiceMed ใช้หน้านี้สำหรับจัดการ Botnoi Voicebot, Chatbot, โทนสนทนา และชุดคำถาม"
      to="/bot-settings"
      cta="ไปที่ Bot Settings"
    />
  ),
});
