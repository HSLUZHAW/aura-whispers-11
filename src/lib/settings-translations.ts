import { Lang } from "./language";

export interface SettingsTranslations {
  // Headers & Sections
  settings: string;
  yourProfile: string;
  
  // Profile Section
  profileSection: string;
  nameLabel: string;
  ageLabel: string;
  
  // Cycle Section
  cycleSection: string;
  cycleLengthLabel: string;
  periodLengthLabel: string;
  lastPeriodLabel: string;
  days: string;
  
  // Lifestyle Section
  lifestyleSection: string;
  contraceptiveLabel: string;
  fitnessGoalLabel: string;
  sleepQualityLabel: string;
  stressLevelLabel: string;
  nutritionHabitsLabel: string;
  relationshipStatusLabel: string;
  
  // Contraceptive options
  contraceptiveOptions: string[];
  
  // Fitness goals
  fitnessGoalOptions: string[];
  
  // Sleep quality
  sleepQualityOptions: string[];
  
  // Stress levels
  stressLevelOptions: string[];
  
  // Nutrition habits
  nutritionHabitsOptions: string[];
  
  // Relationship status
  relationshipStatusOptions: string[];
  
  // App Settings Section
  appSettingsSection: string;
  languageLabel: string;
  deutsch: string;
  english: string;
  partnerInsightsLabel: string;
  partnerInsightsDescription: string;
  
  // Account Section
  accountSection: string;
  emailLabel: string;
  signOutButton: string;
  
  // General
  saveButton: string;
}

const DE_TRANSLATIONS: SettingsTranslations = {
  // Headers & Sections
  settings: "Einstellungen",
  yourProfile: "Dein Profil",
  
  // Profile Section
  profileSection: "Profil",
  nameLabel: "Name",
  ageLabel: "Alter",
  
  // Cycle Section
  cycleSection: "Zyklus",
  cycleLengthLabel: "Zyklus Länge (Tage)",
  periodLengthLabel: "Blutung Länge (Tage)",
  lastPeriodLabel: "Letzter Blutungsbeginn",
  days: "Tage",
  
  // Lifestyle Section
  lifestyleSection: "Lebensstil",
  contraceptiveLabel: "Verhütungsmethode",
  fitnessGoalLabel: "Fitness Ziel",
  sleepQualityLabel: "Schlafqualität",
  stressLevelLabel: "Stresslevel",
  nutritionHabitsLabel: "Ernährungsgewohnheiten",
  relationshipStatusLabel: "Beziehungsstatus",
  
  // Contraceptive options
  contraceptiveOptions: [
    "Keine Verhütung",
    "Antibabypille",
    "Hormonale Spirale (IUS)",
    "Kupferspirale (IUD)",
    "Implantat",
    "Verhütungsring",
    "Hormonales Pflaster",
    "Spritze",
    "Barrieremethoden",
    "Permanente Verhütung",
    "Andere",
  ],
  
  // Fitness goals
  fitnessGoalOptions: [
    "Keine",
    "Grundfitness",
    "Gewicht verlieren",
    "Muskelaufbau",
    "Ausdauer",
    "Flexibilität",
    "Kraft",
  ],
  
  // Sleep quality
  sleepQualityOptions: [
    "Sehr schlecht",
    "Schlecht",
    "Okay",
    "Gut",
    "Sehr gut",
  ],
  
  // Stress levels
  stressLevelOptions: [
    "Sehr niedrig",
    "Niedrig",
    "Mittel",
    "Hoch",
    "Sehr hoch",
  ],
  
  // Nutrition habits
  nutritionHabitsOptions: [
    "Omnivore",
    "Vegetarisch",
    "Vegan",
    "Pescetarisch",
    "Glutenfrei",
    "Laktosefrei",
    "Andere",
  ],
  
  // Relationship status
  relationshipStatusOptions: [
    "Single",
    "In einer Beziehung",
    "Verheiratet",
    "Lieber nicht sagen",
  ],
  
  // App Settings Section
  appSettingsSection: "App-Einstellungen",
  languageLabel: "Sprache",
  deutsch: "Deutsch",
  english: "English",
  partnerInsightsLabel: "Partner-Einblicke",
  partnerInsightsDescription: "Teile vereinfachte Zyklusinformationen mit deinem Partner.",
  
  // Account Section
  accountSection: "Konto",
  emailLabel: "E-Mail",
  signOutButton: "Abmelden",
  
  // General
  saveButton: "Speichern",
};

const EN_TRANSLATIONS: SettingsTranslations = {
  // Headers & Sections
  settings: "Settings",
  yourProfile: "Your profile",
  
  // Profile Section
  profileSection: "Profile",
  nameLabel: "Name",
  ageLabel: "Age",
  
  // Cycle Section
  cycleSection: "Cycle",
  cycleLengthLabel: "Cycle length (days)",
  periodLengthLabel: "Period length (days)",
  lastPeriodLabel: "Last period start",
  days: "days",
  
  // Lifestyle Section
  lifestyleSection: "Lifestyle",
  contraceptiveLabel: "Contraceptive method",
  fitnessGoalLabel: "Fitness goal",
  sleepQualityLabel: "Sleep quality",
  stressLevelLabel: "Stress level",
  nutritionHabitsLabel: "Nutrition habits",
  relationshipStatusLabel: "Relationship status",
  
  // Contraceptive options
  contraceptiveOptions: [
    "No contraception",
    "Birth control pill",
    "Hormonal IUD",
    "Copper IUD",
    "Implant",
    "Vaginal ring",
    "Hormonal patch",
    "Injection",
    "Barrier methods",
    "Permanent contraception",
    "Other",
  ],
  
  // Fitness goals
  fitnessGoalOptions: [
    "None",
    "General fitness",
    "Lose weight",
    "Build muscle",
    "Endurance",
    "Flexibility",
    "Strength",
  ],
  
  // Sleep quality
  sleepQualityOptions: [
    "Very poor",
    "Poor",
    "Okay",
    "Good",
    "Very good",
  ],
  
  // Stress levels
  stressLevelOptions: [
    "Very low",
    "Low",
    "Medium",
    "High",
    "Very high",
  ],
  
  // Nutrition habits
  nutritionHabitsOptions: [
    "Omnivore",
    "Vegetarian",
    "Vegan",
    "Pescatarian",
    "Gluten-free",
    "Lactose-free",
    "Other",
  ],
  
  // Relationship status
  relationshipStatusOptions: [
    "Single",
    "In a relationship",
    "Married",
    "Prefer not to say",
  ],
  
  // App Settings Section
  appSettingsSection: "App Settings",
  languageLabel: "Language",
  deutsch: "Deutsch",
  english: "English",
  partnerInsightsLabel: "Partner insights",
  partnerInsightsDescription: "Allow simplified cycle insights to be shared.",
  
  // Account Section
  accountSection: "Account",
  emailLabel: "Email",
  signOutButton: "Sign out",
  
  // General
  saveButton: "Save changes",
};

export function getSettingsTranslations(lang: Lang): SettingsTranslations {
  return lang === "de" ? DE_TRANSLATIONS : EN_TRANSLATIONS;
}
