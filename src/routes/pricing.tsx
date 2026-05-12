import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { subscriptionPlans } from "@/lib/voicemed-data";

export const Route = createFileRoute("/pricing")({
  component: PricingPage,
});

function PricingPage() {
  return (
    <main className="vm-public-shell px-5 py-8 md:px-10">
      <div className="mx-auto max-w-[1200px] space-y-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="vm-secondary-btn py-2">
            <ArrowLeft className="h-4 w-4" />
            กลับหน้าแรก
          </Link>
          <span className="vm-pill">VoiceMed Pricing</span>
        </div>

        <section className="rounded-[2rem] vm-glass p-8 text-center md:p-12">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl vm-orb">
            <Sparkles className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold md:text-6xl">เลือกแพ็กเกจที่เหมาะกับครอบครัว</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
            เริ่มจากการโทรถามไถ่พื้นฐาน ไปจนถึงการดูแลหลายโปรไฟล์ พร้อม Voice bot, Chatbot, รายงาน
            และแจ้งเตือนสำหรับครอบครัว
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          {subscriptionPlans.map((plan) => (
            <article
              key={plan.id}
              className={`relative rounded-[2rem] border bg-white/70 p-6 shadow-[0_20px_70px_rgba(37,99,235,0.10)] backdrop-blur-xl ${
                plan.highlighted ? "ring-2 ring-primary" : ""
              }`}
            >
              {plan.highlighted && (
                <span className="absolute right-5 top-5 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">
                  แนะนำ
                </span>
              )}
              <h2 className="text-2xl font-extrabold">{plan.name}</h2>
              <div className="mt-5">
                <span className="text-5xl font-extrabold">฿{plan.priceThb}</span>
                <span className="text-sm text-muted-foreground"> / เดือน</span>
              </div>
              <p className="mt-3 min-h-12 text-sm leading-6 text-muted-foreground">
                {plan.callQuotaLabel}
              </p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/checkout"
                search={{ plan: plan.id }}
                className={
                  plan.highlighted ? "vm-primary-btn mt-7 w-full" : "vm-secondary-btn mt-7 w-full"
                }
              >
                เริ่มทดลองใช้ฟรี
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </section>

        <section className="rounded-[2rem] bg-slate-950 p-8 text-white">
          <h2 className="text-3xl font-extrabold">หมายเหตุเรื่องความปลอดภัย</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-white/70">
            VoiceMed เป็น AI Companion + Monitoring Layer ไม่ใช่แพทย์ ไม่วินิจฉัยโรค ไม่สั่งยา
            และไม่แนะนำให้เริ่ม หยุด เพิ่ม หรือลดขนาดยา หากมีอาการรุนแรง
            ควรติดต่อบุคลากรทางการแพทย์หรือช่องทางฉุกเฉินที่เหมาะสม
          </p>
        </section>
      </div>
    </main>
  );
}
