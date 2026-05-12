import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  BellRing,
  Bot,
  CheckCircle2,
  HeartHandshake,
  MessageCircleHeart,
  Mic2,
  PhoneCall,
  Play,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-context";
import { APP_VERSION } from "@/lib/patch-log";
import { subscriptionPlans } from "@/lib/voicemed-data";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

const useCases = [
  {
    title: "ลูกหลานทำงานยุ่ง",
    text: "ให้ VoiceMed โทรถามไถ่แทนทุกวัน และส่งสรุปกลับมาให้ดูง่าย ๆ",
  },
  {
    title: "ผู้สูงอายุอยู่คนเดียว",
    text: "มีเพื่อนคุยด้วยเสียงที่ช่วยลดความเหงาและสังเกตสัญญาณที่ครอบครัวควรรู้",
  },
  { title: "เตือนกินยาแบบไม่กดดัน", text: "ถามอย่างอ่อนโยนว่ากินยาหรือยัง โดยไม่แนะนำปรับยาเอง" },
];

const steps = [
  "เลือกแพ็กเกจ",
  "เพิ่มข้อมูลคุณตาคุณยาย",
  "ตั้งเวลา Voice bot / Chatbot",
  "รับสรุปและแจ้งเตือน",
];

function LandingPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const openDemo = () => {
    login("owner");
    toast.success("เข้าสู่เดโม VoiceMed Family Platform");
    navigate({ to: "/dashboard" });
  };

  return (
    <main className="vm-public-shell">
      <PublicNav onDemo={openDemo} />

      <section className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-[1440px] items-center gap-10 px-5 py-12 md:px-10 lg:grid-cols-[1fr_0.9fr]">
        <div className="space-y-8">
          <div className="vm-pill">
            <Sparkles className="h-3.5 w-3.5" />
            VoiceMed {APP_VERSION} · คอลด้วยความรัก
          </div>
          <div className="space-y-5">
            <h1 className="max-w-4xl text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
              ทำงานอย่างหมดห่วง เพราะ{" "}
              <span className="vm-gradient-text">VoiceMed อยู่เคียงข้างคุณตาคุณยาย</span>
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              AI Voice Companion ที่โทรถามไถ่ เตือนเรื่องสำคัญ รับฟังความรู้สึก
              และส่งรายงานให้ครอบครัวดูแลผู้สูงอายุได้ง่ายขึ้น โดยไม่ต้องมีความรู้เทคนิค
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/pricing" className="vm-primary-btn">
              เลือกแพ็กเกจ
              <ArrowRight className="h-4 w-4" />
            </Link>
            <button onClick={openDemo} className="vm-secondary-btn">
              <Play className="h-4 w-4" />
              เข้าดูเดโมแพลตฟอร์ม
            </button>
          </div>
          <div className="grid max-w-2xl grid-cols-3 gap-3">
            {[
              ["14 วัน", "ทดลองใช้ฟรี"],
              ["1 สาย/วัน", "เริ่มต้น Basic"],
              ["Botnoi", "Voice + Chat"],
            ].map(([value, label]) => (
              <div key={label} className="vm-glass-soft rounded-2xl p-4">
                <p className="text-2xl font-extrabold text-foreground">{value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <HeroPhone />
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-10 md:px-10">
        <div className="rounded-[2rem] vm-glass p-6 md:p-8">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="vm-pill">How it works</span>
              <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">
                Flow การดูแลที่ออกแบบให้ครอบครัวใช้ได้ทันที
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-muted-foreground">
              ใช้ Voice bot เป็นหลัก และมี Chatbot ช่วยจัดการคำถาม แผนดูแล ประวัติ
              และแจ้งเตือนผ่านแพลตฟอร์ม
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step} className="rounded-3xl border bg-white/70 p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-extrabold text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-5 text-lg font-bold">{step}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {index === 0 && "เริ่มจากแพ็กเกจรายเดือนที่เหมาะกับครอบครัว"}
                  {index === 1 && "เพิ่มเบอร์โทร ช่วงเวลา และข้อมูลที่ควรรู้แบบสั้น ๆ"}
                  {index === 2 && "เลือกโทนเสียง คำถาม และรอบการโทร/แชท"}
                  {index === 3 && "ดูสรุป log และ alert โดยไม่ต้องเปิดระบบซับซ้อน"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-10 md:px-10">
        <div className="grid gap-5 lg:grid-cols-3">
          {useCases.map((item, index) => (
            <article key={item.title} className="vm-glass-soft rounded-[2rem] p-6">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-primary shadow-lg">
                {[HeartHandshake, MessageCircleHeart, BellRing][index] &&
                  (() => {
                    const Icon = [HeartHandshake, MessageCircleHeart, BellRing][index];
                    return <Icon className="h-7 w-7" />;
                  })()}
              </div>
              <h3 className="text-xl font-extrabold">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-10 md:px-10">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[2rem] vm-glass p-6 md:p-8">
            <span className="vm-pill">Botnoi-powered</span>
            <h2 className="mt-4 text-3xl font-extrabold">
              จัดการ Voice bot และ Chatbot ได้จากแพลตฟอร์มเดียว
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              ตั้งเวลาโทร เลือกชุดคำถาม ปรับโทนสนทนา ดู log และแจ้งเตือนครอบครัวผ่าน dashboard
              ที่ออกแบบให้คนทั่วไปเข้าใจง่าย
            </p>
            <div className="mt-6 grid gap-3">
              {[
                "Voice bot โทรถามไถ่",
                "Chatbot สำหรับครอบครัว",
                "รายงานสรุปและแจ้งเตือน",
                "ขอบเขตความปลอดภัย ไม่วินิจฉัยหรือสั่งยา",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/70 p-3">
                  <CheckCircle2 className="h-5 w-5 text-teal" />
                  <span className="text-sm font-bold">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] vm-glass p-6 md:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-extrabold">แพ็กเกจเริ่มต้น</h2>
              <Link to="/pricing" className="text-sm font-bold text-primary hover:underline">
                ดูทั้งหมด
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {subscriptionPlans.map((plan) => (
                <PricingMiniCard key={plan.id} plan={plan} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-10 md:px-10">
        <div className="rounded-[2rem] bg-slate-950 p-8 text-white md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-bold text-fuchsia-200">Ready to start</p>
              <h2 className="mt-3 text-4xl font-extrabold md:text-6xl">
                ให้ VoiceMed ช่วยโทรด้วยความห่วงใย ตั้งแต่วันนี้
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70">
                MVP นี้เป็น prototype subscription flow พร้อม mock payment และหลังบ้านสำหรับจัดการ
                Voice bot / Chatbot
              </p>
            </div>
            <Link to="/checkout" className="vm-primary-btn bg-white">
              ทดลองใช้ฟรี 14 วัน
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function PublicNav({ onDemo }: { onDemo: () => void }) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/50 bg-white/55 backdrop-blur-2xl">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 md:px-10">
        <Link to="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl vm-orb" />
          <div>
            <p className="text-lg font-extrabold vm-gradient-text">VoiceMed</p>
            <p className="text-[11px] font-bold text-muted-foreground">AI Voice Companion</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-bold text-muted-foreground md:flex">
          <a href="#how">Flow</a>
          <Link to="/pricing">Pricing</Link>
          <Link to="/patch-log">Updates</Link>
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={onDemo} className="vm-secondary-btn hidden py-2 sm:inline-flex">
            เดโม
          </button>
          <Link to="/checkout" className="vm-primary-btn py-2">
            เริ่มต้น
          </Link>
        </div>
      </div>
    </header>
  );
}

function HeroPhone() {
  return (
    <div className="relative mx-auto w-full max-w-lg">
      <div className="absolute -left-8 top-16 h-28 w-28 rounded-full bg-fuchsia-300/40 blur-3xl" />
      <div className="absolute -right-8 bottom-20 h-32 w-32 rounded-full bg-blue-300/50 blur-3xl" />
      <div className="vm-glass rounded-[2.3rem] p-5">
        <div className="vm-phone mx-auto max-w-[310px] p-4">
          <div className="mx-auto mb-4 h-6 w-28 rounded-full bg-slate-950" />
          <div className="rounded-[1.7rem] bg-gradient-to-b from-blue-50 to-white p-5">
            <div className="mx-auto mb-6 h-32 w-32 rounded-full vm-orb" />
            <p className="text-sm font-bold text-primary">VoiceMed กำลังโทรหา</p>
            <h3 className="mt-2 text-2xl font-extrabold">คุณตาชาย</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              “กินข้าวแล้วหรือยังคะ วันนี้กินยาตามเวลาไหมคะ”
            </p>
            <div className="mt-6 grid grid-cols-3 gap-2">
              {[Mic2, PhoneCall, Bot].map((Icon, index) => (
                <div
                  key={index}
                  className="flex h-12 items-center justify-center rounded-2xl bg-white shadow-sm"
                >
                  <Icon className="h-5 w-5 text-primary" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white/70 p-4">
            <p className="text-2xl font-extrabold">09:00</p>
            <p className="text-xs text-muted-foreground">โทรรอบถัดไป</p>
          </div>
          <div className="rounded-2xl bg-white/70 p-4">
            <p className="text-2xl font-extrabold">อบอุ่น</p>
            <p className="text-xs text-muted-foreground">โทนสนทนา</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PricingMiniCard({ plan }: { plan: (typeof subscriptionPlans)[number] }) {
  return (
    <div
      className={`rounded-3xl border bg-white/70 p-5 ${plan.highlighted ? "ring-2 ring-primary" : ""}`}
    >
      <p className="text-sm font-extrabold">{plan.name}</p>
      <p className="mt-3 text-3xl font-extrabold">฿{plan.priceThb}</p>
      <p className="text-xs text-muted-foreground">/ เดือน</p>
      <p className="mt-3 min-h-10 text-xs leading-5 text-muted-foreground">{plan.callQuotaLabel}</p>
      <Link
        to="/checkout"
        search={{ plan: plan.id }}
        className="mt-4 flex rounded-xl bg-primary px-4 py-2 text-center text-xs font-bold text-white"
      >
        เลือกแพ็กเกจ
      </Link>
    </div>
  );
}
