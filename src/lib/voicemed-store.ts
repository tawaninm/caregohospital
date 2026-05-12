import {
  billingRecords,
  botConfigs,
  callLogs,
  careTemplates,
  consentRecords,
  dailySummaries,
  elderProfiles,
  familyAccounts,
  familyAlerts,
  subscriptionPlans,
  type BotConfig,
  type BotTone,
  type ElderProfile,
  type FamilyAlert,
} from "./voicemed-data";

let _familyAccounts = structuredClone(familyAccounts);
let _elderProfiles = structuredClone(elderProfiles);
let _botConfigs = structuredClone(botConfigs);
let _familyAlerts = structuredClone(familyAlerts);
let _callLogs = structuredClone(callLogs);
const _listeners = new Set<() => void>();

const STORAGE_KEY = "voicemed_store_v020";

function emit() {
  _listeners.forEach((listener) => listener());
}

function saveToStorage() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        familyAccounts: _familyAccounts,
        elderProfiles: _elderProfiles,
        botConfigs: _botConfigs,
        familyAlerts: _familyAlerts,
        callLogs: _callLogs,
      }),
    );
  } catch {
    // localStorage can be unavailable in preview/SSR contexts.
  }
}

function loadFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed.familyAccounts)) _familyAccounts = parsed.familyAccounts;
    if (Array.isArray(parsed.elderProfiles)) _elderProfiles = parsed.elderProfiles;
    if (Array.isArray(parsed.botConfigs)) _botConfigs = parsed.botConfigs;
    if (Array.isArray(parsed.familyAlerts)) _familyAlerts = parsed.familyAlerts;
    if (Array.isArray(parsed.callLogs)) _callLogs = parsed.callLogs;
  } catch {
    // Ignore corrupted prototype storage.
  }
}

function commit() {
  _familyAccounts = [..._familyAccounts];
  _elderProfiles = [..._elderProfiles];
  _botConfigs = [..._botConfigs];
  _familyAlerts = [..._familyAlerts];
  _callLogs = [..._callLogs];
  saveToStorage();
  emit();
}

function uid(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

if (typeof window !== "undefined") {
  loadFromStorage();
}

export const voiceMedStore = {
  subscribe(listener: () => void) {
    _listeners.add(listener);
    return () => _listeners.delete(listener);
  },

  getFamilyAccounts() {
    return _familyAccounts;
  },
  getCurrentAccount() {
    return _familyAccounts[0];
  },
  getSubscriptionPlans() {
    return subscriptionPlans;
  },
  getElderProfiles() {
    return _elderProfiles;
  },
  getElderProfile(id: string) {
    return _elderProfiles.find((elder) => elder.id === id);
  },
  getCareTemplates() {
    return careTemplates;
  },
  getBotConfigs() {
    return _botConfigs;
  },
  getBotConfigForElder(elderId: string) {
    return _botConfigs.find((config) => config.elderProfileId === elderId);
  },
  getCallLogs() {
    return _callLogs;
  },
  getCallLogsForElder(elderId: string) {
    return _callLogs.filter((log) => log.elderProfileId === elderId);
  },
  getFamilyAlerts() {
    return _familyAlerts;
  },
  getOpenAlerts() {
    return _familyAlerts.filter((alert) => alert.status !== "resolved");
  },
  getUnreadCount() {
    return _familyAlerts.filter((alert) => alert.status === "new").length;
  },
  getDailySummaries() {
    return dailySummaries;
  },
  getBillingRecords() {
    return billingRecords;
  },
  getConsentRecords() {
    return consentRecords;
  },

  markAlertReviewed(alertId: string) {
    const alert = _familyAlerts.find((item) => item.id === alertId);
    if (alert && alert.status === "new") {
      alert.status = "reviewed";
      commit();
    }
  },
  resolveAlert(alertId: string) {
    const alert = _familyAlerts.find((item) => item.id === alertId);
    if (alert) {
      alert.status = "resolved";
      commit();
    }
  },
  addElderProfile(profile: Omit<ElderProfile, "id" | "familyAccountId" | "consentStatus">) {
    const currentAccount = _familyAccounts[0];
    const elder: ElderProfile = {
      ...profile,
      id: uid("elder"),
      familyAccountId: currentAccount.id,
      consentStatus: "pending",
    };
    _elderProfiles = [elder, ..._elderProfiles];
    _botConfigs = [
      {
        id: uid("bot"),
        elderProfileId: elder.id,
        channel: "voice",
        tone: "warm",
        callTimeWindows: [profile.preferredCallTime || "09:00"],
        enabledCarePlans: ["daily_check_in"],
        familyReportEnabled: true,
        status: "draft",
      },
      ..._botConfigs,
    ];
    commit();
    return elder;
  },
  updateBotConfig(configId: string, patch: Partial<BotConfig>) {
    const config = _botConfigs.find((item) => item.id === configId);
    if (config) {
      Object.assign(config, patch);
      commit();
    }
  },
  updateBotTone(configId: string, tone: BotTone) {
    voiceMedStore.updateBotConfig(configId, { tone });
  },
  startTrial(planId: string) {
    const currentAccount = _familyAccounts[0];
    currentAccount.planId = planId;
    currentAccount.subscriptionStatus = "trial";
    currentAccount.trialEndsAt = "2026-05-26";
    commit();
  },
  switchPlan(planId: string) {
    const currentAccount = _familyAccounts[0];
    currentAccount.planId = planId;
    currentAccount.subscriptionStatus = "active";
    commit();
  },
};

export function getElderName(elderId: string) {
  return _elderProfiles.find((elder) => elder.id === elderId)?.nickname ?? "ผู้สูงอายุ";
}

export function getAlertTone(alert: FamilyAlert) {
  if (alert.severity === "urgent") return "border-rose-200 bg-rose-50 text-rose-700";
  if (alert.severity === "watch") return "border-amber-200 bg-amber-50 text-amber-700";
  return "border-sky-200 bg-sky-50 text-sky-700";
}
