import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Bot, CheckCircle2, HeartHandshake, UserRoundPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { BotTone } from "@/lib/voicemed-data";
import { voiceMedStore } from "@/lib/voicemed-store";

export const Route = createFileRoute("/onboarding")({
  component: OnboardingPage,
});

function OnboardingPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("สมชาย วงศ์สุวรรณ");
  const [nickname, setNickname] = useState("คุณตาชาย");
  const [age, setAge] = useState("76");
  const [phone, setPhone] = useState("081-234-5678");
  const [relationship, setRelationship] = useState("คุณตา");
  const [preferredCallTime, setPreferredCallTime] = useState("08:30");
  const [tone, setTone] = useState<BotTone>("warm");

  const finish = () => {
    if (!name.trim() || !phone.trim()) {
      toast.error("กรุณากรอกชื่อและเบอร์โทรผู้สูงอายุ");
      return;
    }
    const elder = voiceMedStore.addElderProfile({
      name,
      nickname,
      age: Number(age) || 70,
      phone,
      relationship,
      livingSituation: "alone",
      healthNotes: "ตั้งค่าจาก onboarding: ถามไถ่ประจำวัน เตือนยา และส่งสรุปให้ครอบครัว",
      preferredCallTime,
    });
    const config = voiceMedStore.getBotConfigForElder(elder.id);
    if (config) voiceMedStore.updateBotTone(config.id, tone);
    toast.success("ตั้งค่า VoiceMed เบื้องต้นสำเร็จ");
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="vm-page">
      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] vm-glass p-6 md:p-8">
          <span className="vm-pill">
            <HeartHandshake className="h-3.5 w-3.5" />
            First setup
          </span>
          <h1 className="mt-5 text-4xl font-extrabold">ตั้งค่า VoiceMed ให้คุณตาคุณยาย</h1>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            กรอกข้อมูลเท่าที่จำเป็น เลือกโทนสนทนาและเวลาที่อยากให้ Voice bot โทรหา
          </p>
          <div className="mt-8 grid gap-4">
            {[
              "ไม่ต้องมีความรู้เทคนิค",
              "ปรับคำถามได้ภายหลัง",
              "สรุปให้ครอบครัวอ่านง่าย",
              "ไม่วินิจฉัยหรือสั่งยา",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/70 p-3">
                <CheckCircle2 className="h-5 w-5 text-teal" />
                <span className="text-sm font-bold">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] vm-glass p-6 md:p-8">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="ชื่อ-นามสกุล" value={name} onChange={setName} />
            <Field label="ชื่อเล่น/คำเรียก" value={nickname} onChange={setNickname} />
            <Field label="อายุ" value={age} onChange={setAge} />
            <Field label="เบอร์โทรผู้สูงอายุ" value={phone} onChange={setPhone} />
            <Field label="ความสัมพันธ์" value={relationship} onChange={setRelationship} />
            <Field
              label="เวลาโทรที่ต้องการ"
              value={preferredCallTime}
              onChange={setPreferredCallTime}
            />
          </div>

          <div className="mt-6">
            <p className="text-sm font-bold">โทนสนทนา</p>
            <div className="mt-3 grid gap-3 md:grid-cols-4">
              {[
                ["warm", "อบอุ่น"],
                ["gentle", "อ่อนโยน"],
                ["cheerful", "สดใส"],
                ["formal", "สุภาพ"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  onClick={() => setTone(value as BotTone)}
                  className={`rounded-2xl border p-3 text-sm font-bold ${
                    tone === value ? "border-primary bg-primary/10 text-primary" : "bg-white/70"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <button onClick={finish} className="vm-primary-btn mt-8 w-full">
            <Bot className="h-4 w-4" />
            สร้างโปรไฟล์และไปแดชบอร์ด
          </button>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="flex items-center gap-2 text-sm font-bold">
        <UserRoundPlus className="h-4 w-4 text-primary" />
        {label}
      </span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-2xl border bg-white/80 px-4 py-3 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
      />
    </label>
  );
}
