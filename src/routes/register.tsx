import { createFileRoute } from "@tanstack/react-router";
import { CompatibilityBridge } from "@/components/CompatibilityBridge";

export const Route = createFileRoute("/register")({
  component: () => (
    <CompatibilityBridge
      title="Registration ถูกเปลี่ยนเป็น Onboarding"
      description="เพิ่มครอบครัวและโปรไฟล์ผู้สูงอายุผ่าน flow onboarding ใหม่"
      to="/onboarding"
      cta="เริ่ม Onboarding"
    />
  ),
});
