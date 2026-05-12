import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Bell,
  Bot,
  CalendarClock,
  HeartHandshake,
  MessageCircleHeart,
  PhoneCall,
  Plus,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useSyncExternalStore } from "react";
import { APP_VERSION } from "@/lib/patch-log";
import { subscriptionPlans } from "@/lib/voicemed-data";
import { getAlertTone, getElderName, voiceMedStore } from "@/lib/voicemed-store";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const navigate = useNavigate();
  const account = useSyncExternalStore(
    voiceMedStore.subscribe,
    voiceMedStore.getCurrentAccount,
    voiceMedStore.getCurrentAccount,
  );
  const elders = useSyncExternalStore(
    voiceMedStore.subscribe,
    voiceMedStore.getElderProfiles,
    voiceMedStore.getElderProfiles,
  );
  const alerts = useSyncExternalStore(
    voiceMedStore.subscribe,
    voiceMedStore.getFamilyAlerts,
    voiceMedStore.getFamilyAlerts,
  ).filter((alert) => alert.status !== "resolved");
  const calls = useSyncExternalStore(
    voiceMedStore.subscribe,
    voiceMedStore.getCallLogs,
    voiceMedStore.getCallLogs,
  );
  const summaries = voiceMedStore.getDailySummaries();
  const plan = subscriptionPlans.find((item) => item.id === account.planId);
  const completedCalls = calls.filter((call) => call.status === "completed").length;
  const scheduledCalls = calls.filter(
    (call) => call.status === "scheduled" || call.status === "missed",
  ).length;

  return (
    <div className="vm-page">
      <section className="overflow-hidden rounded-[2rem] vm-glass p-6 md:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <span className="vm-pill">
              <HeartHandshake className="h-3.5 w-3.5" />
              VoiceMed Family Platform {APP_VERSION}
            </span>
            <h1 className="mt-5 text-4xl font-extrabold md:text-6xl">
              วันนี้ VoiceMed ดูแลใครให้ครอบครัวแล้วบ้าง
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
              รวมสถานะการโทร สรุปความรู้สึก การเตือนยา และเรื่องที่ครอบครัวควรดูต่อ
              โดยไม่ใช้คำวินิจฉัยหรือคำแนะนำการรักษาแทนบุคลากรทางการแพทย์
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link to="/elder-profiles" className="vm-primary-btn">
                <Plus className="h-4 w-4" />
                เพิ่ม/จัดการผู้สูงอายุ
              </Link>
              <Link to="/bot-settings" className="vm-secondary-btn">
                <Bot className="h-4 w-4" />
                ตั้งค่า Bot
              </Link>
            </div>
          </div>
          <div className="rounded-[2rem] bg-slate-950 p-6 text-white">
            <p className="text-sm font-bold text-white/60">Subscription</p>
            <p className="mt-2 text-4xl font-extrabold">{plan?.name ?? "Standard"}</p>
            <p className="mt-2 text-sm text-white/70">
              สถานะ: {account.subscriptionStatus === "trial" ? "ทดลองใช้ฟรี" : "ใช้งานอยู่"}
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <DarkMetric label="ผู้สูงอายุ" value={elders.length} />
              <DarkMetric label="Alert เปิดอยู่" value={alerts.length} />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          icon={Users}
          label="โปรไฟล์ที่ดูแล"
          value={elders.length}
          detail="คนในครอบครัว"
        />
        <MetricCard
          icon={PhoneCall}
          label="โทรสำเร็จ"
          value={completedCalls}
          detail="รายการล่าสุด"
        />
        <MetricCard
          icon={CalendarClock}
          label="รอติดตาม"
          value={scheduledCalls}
          detail="missed / scheduled"
        />
        <MetricCard
          icon={Bell}
          label="แจ้งเตือนใหม่"
          value={alerts.filter((alert) => alert.status === "new").length}
          detail="ต้องดูต่อ"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <div className="rounded-[2rem] vm-glass p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-extrabold">โปรไฟล์ผู้สูงอายุ</h2>
              <p className="text-sm text-muted-foreground">
                คลิกเพื่อดูรายละเอียด แผนดูแล และ call log
              </p>
            </div>
            <Link to="/elder-profiles" className="text-sm font-bold text-primary hover:underline">
              ดูทั้งหมด
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {elders.slice(0, 4).map((elder) => {
              const config = voiceMedStore.getBotConfigForElder(elder.id);
              const latestCall = calls.find((call) => call.elderProfileId === elder.id);
              return (
                <button
                  key={elder.id}
                  onClick={() =>
                    navigate({ to: "/elder-profiles/$elderId", params: { elderId: elder.id } })
                  }
                  className="rounded-3xl border bg-white/70 p-5 text-left transition hover:-translate-y-0.5 hover:bg-white hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-lg font-extrabold text-primary">
                        {elder.nickname?.slice(0, 1) ?? elder.name.slice(0, 1)}
                      </div>
                      <div>
                        <p className="font-extrabold">{elder.nickname ?? elder.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {elder.relationship} · {elder.age} ปี
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full bg-teal/10 px-2 py-1 text-[10px] font-bold text-teal">
                      {config?.status ?? "draft"}
                    </span>
                  </div>
                  <p className="mt-4 line-clamp-2 text-sm leading-6 text-muted-foreground">
                    {elder.healthNotes}
                  </p>
                  <div className="mt-4 rounded-2xl bg-secondary/70 p-3 text-xs text-muted-foreground">
                    ล่าสุด: {latestCall?.summary ?? "ยังไม่มีบันทึกการโทร"}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] vm-glass p-5">
            <h2 className="text-2xl font-extrabold">แจ้งเตือนที่ควรดู</h2>
            <div className="mt-4 space-y-3">
              {alerts.slice(0, 4).map((alert) => (
                <button
                  key={alert.id}
                  onClick={() => navigate({ to: "/alerts" })}
                  className="w-full rounded-2xl border bg-white/70 p-4 text-left hover:bg-white"
                >
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${getAlertTone(alert)}`}
                  >
                    {alert.severity}
                  </span>
                  <p className="mt-2 font-bold">{alert.title}</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {getElderName(alert.elderProfileId)} · {alert.summary}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] vm-glass p-5">
            <h2 className="text-2xl font-extrabold">สรุปล่าสุด</h2>
            <div className="mt-4 space-y-3">
              {summaries.map((summary) => (
                <div key={summary.id} className="rounded-2xl border bg-white/70 p-4">
                  <p className="text-sm font-bold">{getElderName(summary.elderProfileId)}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{summary.headline}</p>
                  <Link
                    to="/call-history"
                    className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary"
                  >
                    ดูประวัติ
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  detail: string;
}) {
  return (
    <div className="rounded-[2rem] vm-glass-soft p-5">
      <div className="flex items-center justify-between">
        <Icon className="h-6 w-6 text-primary" />
        <ShieldCheck className="h-4 w-4 text-teal" />
      </div>
      <p className="mt-5 text-4xl font-extrabold">{value}</p>
      <p className="mt-1 text-sm font-bold">{label}</p>
      <p className="text-xs text-muted-foreground">{detail}</p>
    </div>
  );
}

function DarkMetric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-white/10 p-4">
      <p className="text-3xl font-extrabold">{value}</p>
      <p className="text-xs text-white/60">{label}</p>
    </div>
  );
}
