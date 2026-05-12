import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, CreditCard, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-context";
import { subscriptionPlans } from "@/lib/voicemed-data";
import { voiceMedStore } from "@/lib/voicemed-store";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

function CheckoutPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState("standard");
  const [payerName, setPayerName] = useState("คุณภัทร");
  const [phone, setPhone] = useState("089-111-2244");
  const plan = subscriptionPlans.find((item) => item.id === selectedPlan) ?? subscriptionPlans[1];

  const startTrial = () => {
    if (!payerName.trim() || !phone.trim()) {
      toast.error("กรุณากรอกชื่อและเบอร์โทรสำหรับเดโม");
      return;
    }
    voiceMedStore.startTrial(selectedPlan);
    login("owner");
    toast.success("เริ่มทดลองใช้ฟรีแล้ว ไปตั้งค่า VoiceMed ต่อได้เลย");
    navigate({ to: "/onboarding" });
  };

  return (
    <main className="vm-public-shell px-5 py-8 md:px-10">
      <div className="mx-auto max-w-[1100px] space-y-8">
        <Link to="/pricing" className="vm-secondary-btn py-2">
          <ArrowLeft className="h-4 w-4" />
          กลับไปเลือกแพ็กเกจ
        </Link>

        <section className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-[2rem] vm-glass p-6 md:p-8">
            <span className="vm-pill">
              <Sparkles className="h-3.5 w-3.5" />
              Mock checkout
            </span>
            <h1 className="mt-5 text-4xl font-extrabold">เริ่มทดลองใช้ VoiceMed</h1>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              หน้านี้เป็น prototype checkout ยังไม่มีการตัดเงินจริง ใช้เพื่อจำลอง flow ซื้อ
              subscription และ onboarding
            </p>

            <div className="mt-8 space-y-5">
              <label className="block">
                <span className="text-sm font-bold">ชื่อผู้จ่าย / เจ้าของบัญชี</span>
                <input
                  value={payerName}
                  onChange={(event) => setPayerName(event.target.value)}
                  className="mt-2 w-full rounded-2xl border bg-white/80 px-4 py-3 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </label>
              <label className="block">
                <span className="text-sm font-bold">เบอร์โทร</span>
                <input
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  className="mt-2 w-full rounded-2xl border bg-white/80 px-4 py-3 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </label>
              <div>
                <p className="text-sm font-bold">เลือกแพ็กเกจ</p>
                <div className="mt-2 grid gap-3 md:grid-cols-3">
                  {subscriptionPlans.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedPlan(item.id)}
                      className={`rounded-2xl border p-4 text-left transition ${
                        item.id === selectedPlan
                          ? "border-primary bg-primary/10"
                          : "bg-white/70 hover:bg-white"
                      }`}
                    >
                      <p className="font-extrabold">{item.name}</p>
                      <p className="mt-2 text-2xl font-extrabold">฿{item.priceThb}</p>
                      <p className="text-xs text-muted-foreground">/ เดือน</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <aside className="rounded-[2rem] bg-slate-950 p-6 text-white md:p-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
              <CreditCard className="h-7 w-7" />
            </div>
            <h2 className="mt-5 text-2xl font-extrabold">สรุปรายการ</h2>
            <div className="mt-6 space-y-4 rounded-3xl bg-white/10 p-5">
              <div className="flex items-center justify-between">
                <span>{plan.name}</span>
                <strong>฿{plan.priceThb}</strong>
              </div>
              <div className="flex items-center justify-between text-white/70">
                <span>ทดลองใช้ฟรี 14 วัน</span>
                <span>฿0</span>
              </div>
              <div className="border-t border-white/20 pt-4">
                <p className="text-sm text-white/70">
                  หลังหมด trial ระบบ mock จะแสดงสถานะ subscription ตามแพ็กเกจ
                </p>
              </div>
            </div>
            <button onClick={startTrial} className="vm-primary-btn mt-6 w-full">
              เริ่มทดลองใช้ฟรี
            </button>
            <div className="mt-5 flex items-start gap-3 text-xs leading-6 text-white/60">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
              ไม่มีการเก็บเงินจริง ไม่มี API key และไม่มี payment gateway จริงใน MVP นี้
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
