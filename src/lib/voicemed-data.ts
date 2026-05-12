export type SubscriptionStatus = "trial" | "active" | "past_due" | "cancelled";
export type FamilyRole = "owner" | "caregiver" | "viewer";
export type BotChannel = "voice" | "chat" | "line";
export type BotTone = "warm" | "gentle" | "cheerful" | "formal";
export type AlertSeverity = "info" | "watch" | "urgent";
export type CarePlanType =
  | "daily_check_in"
  | "medication_reminder"
  | "loneliness_companion"
  | "blood_pressure_followup"
  | "diabetes_followup"
  | "custom";

export type FamilyAccount = {
  id: string;
  payerName: string;
  phone: string;
  email?: string;
  subscriptionStatus: SubscriptionStatus;
  planId: string;
  trialEndsAt?: string;
};

export type ElderProfile = {
  id: string;
  familyAccountId: string;
  name: string;
  nickname?: string;
  age: number;
  phone: string;
  relationship: string;
  livingSituation: "alone" | "with_spouse" | "with_family" | "care_home";
  healthNotes?: string;
  consentStatus: "pending" | "granted" | "revoked";
  address?: string;
  preferredCallTime?: string;
};

export type SubscriptionPlan = {
  id: string;
  name: string;
  priceThb: number;
  billingCycle: "monthly" | "yearly";
  callQuotaLabel: string;
  features: string[];
  highlighted?: boolean;
};

export type BotConfig = {
  id: string;
  elderProfileId: string;
  channel: BotChannel;
  tone: BotTone;
  callTimeWindows: string[];
  enabledCarePlans: CarePlanType[];
  familyReportEnabled: boolean;
  status: "active" | "paused" | "draft";
};

export type CareTemplate = {
  id: CarePlanType;
  name: string;
  description: string;
  questionCount: number;
  frequency: string;
  questions: string[];
  safeBoundary: string;
};

export type CallLog = {
  id: string;
  elderProfileId: string;
  channel: BotChannel;
  startedAt: string;
  durationSec: number;
  status: "completed" | "missed" | "failed" | "scheduled";
  summary: string;
  transcript: { speaker: "bot" | "elder"; text: string }[];
  mood?: "good" | "neutral" | "lonely" | "concerned";
  medicationMentioned?: boolean;
  familyShouldReview?: boolean;
};

export type FamilyAlert = {
  id: string;
  elderProfileId: string;
  severity: AlertSeverity;
  title: string;
  summary: string;
  createdAt: string;
  status: "new" | "reviewed" | "resolved";
};

export type DailySummary = {
  id: string;
  elderProfileId: string;
  date: string;
  headline: string;
  highlights: string[];
  nextAction: string;
};

export type BillingRecord = {
  id: string;
  accountId: string;
  date: string;
  amountThb: number;
  status: "paid" | "pending" | "failed";
  description: string;
};

export type ConsentRecord = {
  id: string;
  elderProfileId: string;
  consentType: "voice_call" | "family_report" | "health_reminder";
  status: "granted" | "pending" | "revoked";
  updatedAt: string;
};

export const roleLabels: Record<FamilyRole, string> = {
  owner: "เจ้าของบัญชี",
  caregiver: "ผู้ดูแลร่วม",
  viewer: "ผู้ดูอย่างเดียว",
};

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "basic",
    name: "Basic",
    priceThb: 300,
    billingCycle: "monthly",
    callQuotaLabel: "โทรวันละ 1 ครั้ง หรือรวมประมาณ 1 ชั่วโมง/เดือน",
    features: [
      "Voice bot โทรถามไถ่ทุกวัน",
      "สรุปส่งให้ครอบครัว",
      "แจ้งเตือนเรื่องยา",
      "รองรับผู้สูงอายุ 1 คน",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    priceThb: 590,
    billingCycle: "monthly",
    callQuotaLabel: "โทรได้หลายช่วงเวลา + Chatbot ผ่าน LINE",
    features: ["ทุกอย่างใน Basic", "Chatbot สำหรับครอบครัว", "รายงานรายสัปดาห์", "ปรับชุดคำถามได้"],
    highlighted: true,
  },
  {
    id: "family",
    name: "Family",
    priceThb: 990,
    billingCycle: "monthly",
    callQuotaLabel: "ดูแลผู้สูงอายุได้สูงสุด 3 คน",
    features: [
      "รองรับหลายโปรไฟล์",
      "ผู้ดูแลร่วมหลายคน",
      "แจ้งเตือนสำคัญแบบเร่งด่วน",
      "สรุปการดูแลรายเดือน",
    ],
  },
];

export const familyAccounts: FamilyAccount[] = [
  {
    id: "fam-1",
    payerName: "คุณภัทร",
    phone: "089-111-2244",
    email: "phat@example.com",
    subscriptionStatus: "trial",
    planId: "standard",
    trialEndsAt: "2026-05-26",
  },
  {
    id: "fam-2",
    payerName: "คุณเมย์",
    phone: "081-887-1212",
    email: "may@example.com",
    subscriptionStatus: "active",
    planId: "family",
  },
  {
    id: "fam-3",
    payerName: "คุณนนท์",
    phone: "086-555-9012",
    subscriptionStatus: "active",
    planId: "basic",
  },
];

export const elderProfiles: ElderProfile[] = [
  {
    id: "elder-1",
    familyAccountId: "fam-1",
    name: "สมชาย วงศ์สุวรรณ",
    nickname: "คุณตาชาย",
    age: 76,
    phone: "081-234-5678",
    relationship: "คุณตา",
    livingSituation: "alone",
    healthNotes: "ความดันสูง ควรถามเรื่องยาและการวัดความดันแบบไม่ให้คำแนะนำการรักษา",
    consentStatus: "granted",
    address: "ลาดพร้าว กรุงเทพฯ",
    preferredCallTime: "08:30, 19:00",
  },
  {
    id: "elder-2",
    familyAccountId: "fam-1",
    name: "มาลี สมบูรณ์",
    nickname: "คุณยายมาลี",
    age: 72,
    phone: "089-876-5432",
    relationship: "คุณยาย",
    livingSituation: "with_spouse",
    healthNotes: "มักลืมกินยาบางวัน ชอบคุยเรื่องสวนและอาหาร",
    consentStatus: "granted",
    preferredCallTime: "09:00",
  },
  {
    id: "elder-3",
    familyAccountId: "fam-2",
    name: "จินดา เรืองศรี",
    nickname: "ป้าจิน",
    age: 68,
    phone: "062-345-6789",
    relationship: "คุณป้า",
    livingSituation: "alone",
    healthNotes: "รู้สึกเหงาบ่อย อยากมีคนโทรถามไถ่ช่วงเย็น",
    consentStatus: "pending",
    preferredCallTime: "18:30",
  },
  {
    id: "elder-4",
    familyAccountId: "fam-2",
    name: "อนันต์ พิทักษ์",
    nickname: "ลุงนันต์",
    age: 70,
    phone: "099-245-1280",
    relationship: "คุณลุง",
    livingSituation: "with_family",
    healthNotes: "เบาหวานชนิดที่ 2 ต้องการ reminder แบบอ่อนโยน",
    consentStatus: "granted",
    preferredCallTime: "07:45",
  },
  {
    id: "elder-5",
    familyAccountId: "fam-3",
    name: "วิภา แซ่ลิ้ม",
    nickname: "อาม่าวิภา",
    age: 79,
    phone: "080-701-4444",
    relationship: "อาม่า",
    livingSituation: "care_home",
    healthNotes: "ต้องการสรุปอารมณ์และการรับประทานอาหารให้ลูกหลาน",
    consentStatus: "granted",
    preferredCallTime: "10:00",
  },
];

export const careTemplates: CareTemplate[] = [
  {
    id: "daily_check_in",
    name: "ถามไถ่ประจำวัน",
    description: "โทรถามสารทุกข์สุขดิบแบบเรียบง่าย เหมาะกับผู้สูงอายุทั่วไป",
    questionCount: 5,
    frequency: "ทุกวัน",
    questions: [
      "วันนี้เป็นอย่างไรบ้าง",
      "กินข้าวแล้วหรือยัง",
      "นอนหลับดีไหม",
      "อยากให้ลูกหลานทราบเรื่องอะไรไหม",
      "อยากคุยเรื่องอะไรเป็นพิเศษไหม",
    ],
    safeBoundary: "สรุปความรู้สึกและสิ่งที่ควรให้ครอบครัวทราบ ไม่วินิจฉัย",
  },
  {
    id: "medication_reminder",
    name: "เตือนการกินยา",
    description: "ถามแบบไม่กดดันว่ากินยาตามเวลาหรือมีอุปสรรคอะไรไหม",
    questionCount: 4,
    frequency: "ตามมื้อยา",
    questions: [
      "วันนี้กินยาตามเวลาหรือยัง",
      "มียาตัวไหนลืมหรือไม่แน่ใจไหม",
      "มีอาการไม่สบายหลังทานยาไหม",
      "ต้องการให้แจ้งลูกหลานเรื่องยาไหม",
    ],
    safeBoundary: "ห้ามแนะนำเริ่ม หยุด เพิ่ม หรือลดขนาดยา",
  },
  {
    id: "loneliness_companion",
    name: "เพื่อนคุยแก้เหงา",
    description: "บทสนทนาอุ่นใจภายใต้แนวคิดคอลด้วยความรัก",
    questionCount: 6,
    frequency: "ทุกเย็น",
    questions: [
      "วันนี้มีเรื่องดี ๆ อะไรเกิดขึ้นบ้าง",
      "อยากเล่าอะไรให้ลูกหลานฟังไหม",
      "ได้ออกไปเดินหรือทำกิจกรรมอะไรไหม",
      "ตอนนี้รู้สึกเหงาหรือกังวลไหม",
    ],
    safeBoundary: "หากมีสัญญาณเสี่ยงด้านใจ ให้แจ้งครอบครัวและแนะนำติดต่อผู้เชี่ยวชาญ",
  },
  {
    id: "blood_pressure_followup",
    name: "ติดตามความดัน",
    description: "บันทึกค่าที่ผู้สูงอายุวัดเองและส่งต่อให้ครอบครัวดู",
    questionCount: 4,
    frequency: "วันละ 1 ครั้ง",
    questions: [
      "วันนี้วัดความดันหรือยัง",
      "ค่าที่วัดได้ประมาณเท่าไร",
      "มีอาการเวียนหัว แน่นหน้าอก หรือเหนื่อยผิดปกติไหม",
      "ต้องการให้แจ้งลูกหลานไหม",
    ],
    safeBoundary: "แจ้งว่าอาการรุนแรงควรติดต่อช่องทางฉุกเฉินที่เหมาะสม",
  },
  {
    id: "diabetes_followup",
    name: "ติดตามเบาหวาน",
    description: "ติดตามอาหาร ยา และค่าน้ำตาลที่ผู้สูงอายุบอกเอง",
    questionCount: 4,
    frequency: "วันละ 1 ครั้ง",
    questions: [
      "วันนี้ทานอาหารเป็นอย่างไร",
      "วัดน้ำตาลหรือยัง",
      "กินยาหรือฉีดอินซูลินตามเดิมหรือไม่",
      "มีอาการหน้ามืด เหงื่อออก หรืออ่อนเพลียไหม",
    ],
    safeBoundary: "ห้ามให้คำแนะนำการปรับยา ให้ส่งต่อครอบครัวหรือบุคลากรทางการแพทย์",
  },
];

export const botConfigs: BotConfig[] = [
  {
    id: "bot-1",
    elderProfileId: "elder-1",
    channel: "voice",
    tone: "warm",
    callTimeWindows: ["08:30", "19:00"],
    enabledCarePlans: ["daily_check_in", "medication_reminder", "blood_pressure_followup"],
    familyReportEnabled: true,
    status: "active",
  },
  {
    id: "bot-2",
    elderProfileId: "elder-2",
    channel: "voice",
    tone: "gentle",
    callTimeWindows: ["09:00"],
    enabledCarePlans: ["daily_check_in", "medication_reminder"],
    familyReportEnabled: true,
    status: "active",
  },
  {
    id: "bot-3",
    elderProfileId: "elder-3",
    channel: "line",
    tone: "cheerful",
    callTimeWindows: ["18:30"],
    enabledCarePlans: ["loneliness_companion", "daily_check_in"],
    familyReportEnabled: true,
    status: "draft",
  },
  {
    id: "bot-4",
    elderProfileId: "elder-4",
    channel: "voice",
    tone: "formal",
    callTimeWindows: ["07:45"],
    enabledCarePlans: ["diabetes_followup", "medication_reminder"],
    familyReportEnabled: true,
    status: "active",
  },
];

export const callLogs: CallLog[] = [
  {
    id: "call-1",
    elderProfileId: "elder-1",
    channel: "voice",
    startedAt: "2026-05-12 08:31",
    durationSec: 276,
    status: "completed",
    summary: "คุณตาชายกินข้าวเช้าและกินยาตามเดิมแล้ว วัดความดันได้ 128/82 และฝากบอกว่าคิดถึงหลาน",
    transcript: [
      { speaker: "bot", text: "สวัสดีค่ะคุณตาชาย วันนี้กินข้าวเช้าแล้วหรือยังคะ" },
      { speaker: "elder", text: "กินแล้วลูก กินยาแล้วด้วย" },
      { speaker: "bot", text: "ดีมากเลยค่ะ วันนี้วัดความดันหรือยังคะ" },
      { speaker: "elder", text: "วัดแล้ว 128 กับ 82 ฝากบอกหลานด้วยว่าคิดถึง" },
    ],
    mood: "good",
    medicationMentioned: true,
  },
  {
    id: "call-2",
    elderProfileId: "elder-2",
    channel: "voice",
    startedAt: "2026-05-12 09:02",
    durationSec: 198,
    status: "completed",
    summary:
      "คุณยายมาลีบอกว่าลืมยามื้อเย็นเมื่อวานหนึ่งครั้ง ระบบแจ้งให้ครอบครัวตรวจสอบอย่างอ่อนโยน",
    transcript: [
      { speaker: "bot", text: "วันนี้กินยาครบไหมคะ" },
      { speaker: "elder", text: "เมื่อวานเย็นน่าจะลืมไปหนึ่งเม็ด" },
      {
        speaker: "bot",
        text: "รับทราบค่ะ ระบบจะสรุปให้ลูกหลานช่วยดูต่อ โดยไม่เปลี่ยนแปลงการใช้ยานะคะ",
      },
    ],
    mood: "neutral",
    medicationMentioned: true,
    familyShouldReview: true,
  },
  {
    id: "call-3",
    elderProfileId: "elder-3",
    channel: "line",
    startedAt: "2026-05-11 18:31",
    durationSec: 420,
    status: "completed",
    summary:
      "ป้าจินรู้สึกเหงาช่วงเย็น อยากให้หลานโทรหาวันหยุด ระบบส่งแจ้งเตือนเชิงความรู้สึกให้ครอบครัวแล้ว",
    transcript: [
      { speaker: "bot", text: "วันนี้มีเรื่องอะไรอยากเล่าให้หลานฟังไหมคะ" },
      { speaker: "elder", text: "ช่วงเย็นมันเงียบ ๆ อยากให้หลานโทรมาบ้าง" },
    ],
    mood: "lonely",
    familyShouldReview: true,
  },
  {
    id: "call-4",
    elderProfileId: "elder-4",
    channel: "voice",
    startedAt: "2026-05-12 07:45",
    durationSec: 0,
    status: "missed",
    summary: "โทรไม่รับ 1 ครั้ง ระบบจะลองอีกครั้งในช่วงเวลาที่ตั้งไว้",
    transcript: [],
    mood: "neutral",
  },
  {
    id: "call-5",
    elderProfileId: "elder-5",
    channel: "voice",
    startedAt: "2026-05-12 10:00",
    durationSec: 162,
    status: "completed",
    summary: "อาม่าวิภาทานอาหารได้ปกติ แต่อยากให้ลูกหลานเห็นรูปอาหารที่ศูนย์ดูแลส่งมา",
    transcript: [
      { speaker: "bot", text: "วันนี้ทานอาหารได้ไหมคะ" },
      { speaker: "elder", text: "ได้จ้ะ อาหารอร่อย อยากให้ลูกเห็นด้วย" },
    ],
    mood: "good",
  },
];

export const familyAlerts: FamilyAlert[] = [
  {
    id: "alert-1",
    elderProfileId: "elder-2",
    severity: "watch",
    title: "ลืมยามื้อเย็น 1 ครั้ง",
    summary: "VoiceMed ไม่แนะนำการเปลี่ยนยา แต่แนะนำให้ครอบครัวช่วยตรวจสอบตารางยา",
    createdAt: "2026-05-12 09:08",
    status: "new",
  },
  {
    id: "alert-2",
    elderProfileId: "elder-3",
    severity: "watch",
    title: "สัญญาณความเหงาช่วงเย็น",
    summary: "ป้าจินอยากให้หลานโทรหาในวันหยุด ควรติดตามด้านความรู้สึกเพิ่มเติม",
    createdAt: "2026-05-11 18:40",
    status: "new",
  },
  {
    id: "alert-3",
    elderProfileId: "elder-4",
    severity: "info",
    title: "โทรไม่รับ 1 ครั้ง",
    summary: "ระบบจะโทรซ้ำตามช่วงเวลาที่ตั้งค่าไว้",
    createdAt: "2026-05-12 07:46",
    status: "reviewed",
  },
  {
    id: "alert-4",
    elderProfileId: "elder-1",
    severity: "urgent",
    title: "พบคำบอกเล่าอาการที่ควรให้คนดูแลตรวจสอบ",
    summary: "หากอาการรุนแรง ควรติดต่อบุคลากรทางการแพทย์หรือช่องทางฉุกเฉินที่เหมาะสม",
    createdAt: "2026-05-10 20:12",
    status: "resolved",
  },
];

export const dailySummaries: DailySummary[] = [
  {
    id: "sum-1",
    elderProfileId: "elder-1",
    date: "2026-05-12",
    headline: "อารมณ์ดี กินยาและวัดความดันแล้ว",
    highlights: ["กินข้าวเช้าแล้ว", "กินยาตามเดิม", "ฝากบอกว่าคิดถึงหลาน"],
    nextAction: "ส่งข้อความตอบกลับหรือโทรหาช่วงเย็น",
  },
  {
    id: "sum-2",
    elderProfileId: "elder-2",
    date: "2026-05-12",
    headline: "มีเรื่องยาให้ครอบครัวช่วยดู",
    highlights: [
      "ลืมยามื้อเย็นเมื่อวาน",
      "ไม่มีอาการรุนแรงที่เล่าให้ระบบฟัง",
      "ต้องการ reminder ที่อ่อนโยน",
    ],
    nextAction: "ตรวจสอบกล่องยาและตารางยา",
  },
];

export const billingRecords: BillingRecord[] = [
  {
    id: "bill-1",
    accountId: "fam-1",
    date: "2026-05-12",
    amountThb: 0,
    status: "pending",
    description: "ทดลองใช้ฟรี 14 วัน - Standard",
  },
  {
    id: "bill-2",
    accountId: "fam-2",
    date: "2026-05-01",
    amountThb: 990,
    status: "paid",
    description: "Family Plan รายเดือน",
  },
];

export const consentRecords: ConsentRecord[] = [
  {
    id: "consent-1",
    elderProfileId: "elder-1",
    consentType: "voice_call",
    status: "granted",
    updatedAt: "2026-05-01",
  },
  {
    id: "consent-2",
    elderProfileId: "elder-1",
    consentType: "family_report",
    status: "granted",
    updatedAt: "2026-05-01",
  },
  {
    id: "consent-3",
    elderProfileId: "elder-3",
    consentType: "voice_call",
    status: "pending",
    updatedAt: "2026-05-11",
  },
];
