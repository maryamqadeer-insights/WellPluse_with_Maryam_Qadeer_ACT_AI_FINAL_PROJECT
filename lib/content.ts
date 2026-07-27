import type { Goal } from "./health"

export const quotes: { text: string; author: string }[] = [
  { text: "Take care of your body. It's the only place you have to live.", author: "Jim Rohn" },
  { text: "Wellness is the natural state of a balanced mind and body.", author: "WellPulse" },
  { text: "Small steps every day add up to big transformations.", author: "WellPulse" },
  { text: "Progress, not perfection, is the goal.", author: "Unknown" },
  { text: "Your body hears everything your mind says. Stay positive.", author: "Naomi Judd" },
  { text: "The groundwork for all happiness is good health.", author: "Leigh Hunt" },
  { text: "Movement is medicine for creating change in your body.", author: "Carol Welch" },
]

export type NutritionTip = {
  category: "Breakfast" | "Lunch" | "Dinner" | "Snacks"
  title: string
  description: string
  calories: number
  macros: { protein: number; carbs: number; fat: number }
}

export const nutritionTips: NutritionTip[] = [
  {
    category: "Breakfast",
    title: "Greek Yogurt & Berry Bowl",
    description: "Greek yogurt topped with mixed berries, chia seeds and a drizzle of honey.",
    calories: 320,
    macros: { protein: 24, carbs: 38, fat: 8 },
  },
  {
    category: "Breakfast",
    title: "Veggie Oat Omelette",
    description: "Two-egg omelette with spinach, tomato and a side of overnight oats.",
    calories: 380,
    macros: { protein: 26, carbs: 40, fat: 12 },
  },
  {
    category: "Lunch",
    title: "Grilled Chicken Quinoa Bowl",
    description: "Lean grilled chicken, quinoa, roasted veg and a lemon-tahini dressing.",
    calories: 480,
    macros: { protein: 38, carbs: 45, fat: 14 },
  },
  {
    category: "Lunch",
    title: "Chickpea Mediterranean Salad",
    description: "Chickpeas, cucumber, cherry tomatoes, feta and olive oil.",
    calories: 420,
    macros: { protein: 18, carbs: 44, fat: 18 },
  },
  {
    category: "Dinner",
    title: "Baked Salmon & Greens",
    description: "Omega-rich salmon with steamed broccoli and sweet potato mash.",
    calories: 520,
    macros: { protein: 40, carbs: 38, fat: 20 },
  },
  {
    category: "Dinner",
    title: "Tofu Stir-Fry",
    description: "Crispy tofu with mixed peppers, broccoli and brown rice.",
    calories: 450,
    macros: { protein: 24, carbs: 52, fat: 14 },
  },
  {
    category: "Snacks",
    title: "Apple & Almond Butter",
    description: "Crisp apple slices with a tablespoon of almond butter.",
    calories: 200,
    macros: { protein: 6, carbs: 24, fat: 10 },
  },
  {
    category: "Snacks",
    title: "Hummus & Veggie Sticks",
    description: "Carrot and cucumber sticks with a scoop of hummus.",
    calories: 180,
    macros: { protein: 6, carbs: 20, fat: 9 },
  },
]

export type MealPlan = {
  goal: Goal
  name: string
  kcal: string
  meals: { time: string; name: string; kcal: number }[]
}

export const mealPlans: MealPlan[] = [
  {
    goal: "lose",
    name: "Lean & Energized",
    kcal: "~1,500 kcal",
    meals: [
      { time: "Breakfast", name: "Greek yogurt & berry bowl", kcal: 320 },
      { time: "Lunch", name: "Grilled chicken quinoa bowl", kcal: 480 },
      { time: "Snack", name: "Apple & almond butter", kcal: 200 },
      { time: "Dinner", name: "Baked salmon & greens", kcal: 500 },
    ],
  },
  {
    goal: "maintain",
    name: "Balanced Living",
    kcal: "~2,000 kcal",
    meals: [
      { time: "Breakfast", name: "Veggie oat omelette", kcal: 400 },
      { time: "Lunch", name: "Mediterranean chickpea salad", kcal: 500 },
      { time: "Snack", name: "Hummus & veggie sticks", kcal: 220 },
      { time: "Dinner", name: "Tofu stir-fry with brown rice", kcal: 550 },
    ],
  },
  {
    goal: "gain",
    name: "Strong & Nourished",
    kcal: "~2,600 kcal",
    meals: [
      { time: "Breakfast", name: "Oats, banana & peanut butter", kcal: 620 },
      { time: "Lunch", name: "Chicken, rice & avocado bowl", kcal: 720 },
      { time: "Snack", name: "Protein shake & nuts", kcal: 420 },
      { time: "Dinner", name: "Steak, potatoes & greens", kcal: 780 },
    ],
  },
  {
    goal: "tone",
    name: "Sculpt & Glow",
    kcal: "~1,800 kcal",
    meals: [
      { time: "Breakfast", name: "Protein smoothie bowl", kcal: 380 },
      { time: "Lunch", name: "Salmon poke bowl", kcal: 520 },
      { time: "Snack", name: "Cottage cheese & berries", kcal: 200 },
      { time: "Dinner", name: "Turkey lettuce wraps", kcal: 500 },
    ],
  },
]

export type YogaPose = {
  name: string
  sanskrit: string
  duration: string
  benefit: string
  level: "Beginner" | "Intermediate"
  tags: Goal[]
}

export const yogaPoses: YogaPose[] = [
  {
    name: "Child's Pose",
    sanskrit: "Balasana",
    duration: "1–3 min",
    benefit: "Calms the mind and gently stretches the lower back.",
    level: "Beginner",
    tags: ["maintain", "tone", "lose", "gain"],
  },
  {
    name: "Cat-Cow",
    sanskrit: "Marjaryasana",
    duration: "1–2 min",
    benefit: "Improves spine mobility and eases tension.",
    level: "Beginner",
    tags: ["maintain", "tone"],
  },
  {
    name: "Warrior II",
    sanskrit: "Virabhadrasana II",
    duration: "30–60 sec",
    benefit: "Builds lower-body strength and stamina.",
    level: "Intermediate",
    tags: ["tone", "gain", "lose"],
  },
  {
    name: "Bridge Pose",
    sanskrit: "Setu Bandhasana",
    duration: "30–60 sec",
    benefit: "Strengthens glutes and supports hormonal balance.",
    level: "Beginner",
    tags: ["tone", "lose"],
  },
  {
    name: "Cobra Pose",
    sanskrit: "Bhujangasana",
    duration: "20–40 sec",
    benefit: "Opens the chest and strengthens the back.",
    level: "Beginner",
    tags: ["tone", "gain"],
  },
  {
    name: "Downward Dog",
    sanskrit: "Adho Mukha",
    duration: "1–2 min",
    benefit: "Full-body stretch that energizes and tones.",
    level: "Intermediate",
    tags: ["lose", "tone", "maintain"],
  },
]

export type WorkoutVideo = {
  id: string // youtube id
  title: string
  channel: string
  duration: string
  category: "Cardio" | "Strength" | "Yoga" | "HIIT"
}

export const workoutVideos: WorkoutVideo[] = [
  { id: "ml6cT4AZdqI", title: "30-Min Full Body HIIT", channel: "Sun & Movement", duration: "30 min", category: "HIIT" },
  { id: "UBMk30rjy0o", title: "20-Min Morning Yoga Flow", channel: "Yoga With Adriene", duration: "20 min", category: "Yoga" },
  { id: "gC_L9qAHVJ8", title: "Low Impact Cardio", channel: "Home Fitness", duration: "25 min", category: "Cardio" },
  { id: "2pLT-olgUJs", title: "Beginner Full Body Strength", channel: "Move Strong", duration: "15 min", category: "Strength" },
  { id: "VaoV1PrYft4", title: "10-Min Ab Workout", channel: "Core Studio", duration: "10 min", category: "Strength" },
  { id: "50kH47ZztHs", title: "Relaxing Evening Stretch", channel: "Calm Flow", duration: "18 min", category: "Yoga" },
]

export type PCOSSymptom = {
  id: string
  label: string
  weight: number
}

export const pcosSymptoms: PCOSSymptom[] = [
  { id: "irregular", label: "Irregular or missed periods", weight: 2 },
  { id: "weight", label: "Unexplained weight gain", weight: 1 },
  { id: "acne", label: "Persistent acne or oily skin", weight: 1 },
  { id: "hair-growth", label: "Excess facial or body hair", weight: 2 },
  { id: "hair-loss", label: "Thinning hair on scalp", weight: 1 },
  { id: "fatigue", label: "Ongoing fatigue or low energy", weight: 1 },
  { id: "cravings", label: "Strong sugar cravings", weight: 1 },
  { id: "mood", label: "Mood swings or anxiety", weight: 1 },
  { id: "fertility", label: "Difficulty conceiving", weight: 2 },
  { id: "skin-tags", label: "Skin darkening or skin tags", weight: 1 },
]

export function pcosResult(score: number, max: number) {
  const ratio = score / max
  if (ratio >= 0.5)
    return {
      level: "Higher likelihood" as const,
      tone: "high" as const,
      message:
        "Your responses suggest several symptoms associated with PCOS. This is not a diagnosis — please consult a gynecologist or endocrinologist for proper evaluation.",
    }
  if (ratio >= 0.25)
    return {
      level: "Moderate signs" as const,
      tone: "warn" as const,
      message:
        "You have some symptoms that can be linked to PCOS. Consider tracking your cycle and discussing these with a healthcare provider.",
    }
  return {
    level: "Low likelihood" as const,
    tone: "healthy" as const,
    message:
      "Few PCOS-related symptoms were reported. Keep up your healthy habits, and always reach out to a professional if things change.",
  }
}

export const chatbotReplies: { keywords: string[]; reply: string }[] = [
  {
    keywords: ["bmi", "weight", "fat"],
    reply:
      "Your BMI is a quick snapshot of weight relative to height. Head to the Dashboard to see your animated BMI gauge and a plan tuned to your range.",
  },
  {
    keywords: ["water", "hydrate", "drink"],
    reply:
      "Great question! Aim for roughly 35ml of water per kg of bodyweight. Use the Water Tracker to log each glass — I'll cheer you on!",
  },
  {
    keywords: ["step", "walk", "cardio"],
    reply: "Walking is fantastic. Try to hit 8,000–10,000 steps a day. Log them in the Step Tracker to watch your calories burned rise.",
  },
  {
    keywords: ["meal", "eat", "food", "nutrition", "diet"],
    reply: "Check the Meal Plans and Nutrition tabs for balanced ideas tailored to your goal. Protein + veggies at every meal is a winning formula!",
  },
  {
    keywords: ["yoga", "stretch", "flexib"],
    reply: "Yoga is perfect for mobility and stress relief. Visit the Yoga section for a flow matched to your fitness goal.",
  },
  {
    keywords: ["pcos", "period", "hormone"],
    reply: "You can use the PCOS Symptom Checker for a gentle self-assessment. Remember, it's informational only — a doctor can give you a real diagnosis.",
  },
  {
    keywords: ["sad", "tired", "stress", "motivat"],
    reply: "You've got this! Every small step counts. Take a breath, sip some water, and maybe try a short yoga flow. I'm here whenever you need a boost.",
  },
]

export function botReply(message: string): string {
  const lower = message.toLowerCase()
  for (const entry of chatbotReplies) {
    if (entry.keywords.some((k) => lower.includes(k))) return entry.reply
  }
  return "I'm your WellPulse assistant! Ask me about BMI, water, steps, meals, yoga, or PCOS and I'll point you in the right direction."
}
