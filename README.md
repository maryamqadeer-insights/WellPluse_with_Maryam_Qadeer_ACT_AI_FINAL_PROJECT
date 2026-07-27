# WellPluse_with_Maryam_Qadeer_ACT_AI_FINAL_PROJECT
# WellPulse – Track. Thrive. Transform.

## 🌿 Overview

**WellPulse** is a modern, AI-inspired health and fitness web application designed to help users monitor their health, build healthier habits, and receive personalized wellness recommendations. The application provides an intuitive onboarding experience, BMI analysis, step and calorie tracking, nutrition guidance, workout recommendations, PCOS wellness support, and an interactive chatbot—all within a clean and responsive interface.

Developed by **Maryam Qadeer**, WellPulse demonstrates modern frontend development using **Next.js**, **React**, **Tailwind CSS**, **shadcn/ui**, and **Lucide React Icons**.


#  Features

## 1. Progressive User Onboarding

The application starts with a two-step onboarding process.

### Personal Information

Users provide:

* Full Name
* Email Address
* Password
* Biological Gender
* Height (Feet & Inches)
* Weight (kg)
* Age
* Activity Level

All required fields are validated before continuing.


## 2. Automatic BMI Calculator

After onboarding, WellPulse automatically calculates the user's Body Mass Index (BMI).

### BMI Formula

BMI = Weight (kg) ÷ Height² (m)

The application displays:

* BMI Value
* BMI Category
* Animated BMI Gauge
* Color-coded health indicator
* Personalized health recommendation

### BMI Categories

| BMI         | Category    |
| ----------- | ----------- |
| Below 18.5  | Underweight |
| 18.5 – 24.9 | Healthy     |
| 25 – 29.9   | Overweight  |
| 30+         | Obese       |

Based on the BMI, WellPulse recommends one of the following goals:

* Weight Loss
* Muscle Gain
* Healthy Living



# Dashboard

After confirming a health goal, users enter the dashboard.

The dashboard displays:

* Welcome message
* Current BMI
* Selected Goal
* Height
* Weight
* Activity Level
* Daily Progress Summary


# Step & Calorie Tracker

Users can manually enter their daily walking steps.

The application automatically calculates calories burned using:

Calories Burned = Steps × 0.04 kcal

Features include:

* Daily step counter
* Calories burned
* Progress bar
* Circular goal indicator
* Remaining steps calculation

Default daily goal:

10,000 Steps



#  AI Health Plan

WellPulse provides an AI-inspired personalized wellness plan based on the selected fitness goal.

The section contains five tabs:

## Nutrition

Displays:

* Daily Calories
* Protein
* Carbohydrates
* Healthy Fats

Values automatically adjust according to the selected goal.



## Meal Plans

Includes recommendations for:

* Breakfast
* Lunch
* Dinner
* Healthy Snacks

Meals consist of nutritious foods such as:

* Oats
* Eggs
* Greek Yogurt
* Brown Rice
* Chicken Breast
* Fish
* Fresh Vegetables
* Fruits
* Nuts
* Smoothies


## Lifestyle Tips

Daily wellness recommendations include:

* Drink enough water
* Sleep 7–8 hours
* Daily walking
* Stress management
* Meditation
* Sunlight exposure
* Deep breathing exercises
* Healthy routine



## Yoga

Recommended yoga poses include:

* Butterfly Pose
* Cat-Cow Pose
* Cobra Pose
* Child's Pose
* Mountain Pose
* Tree Pose
* Bridge Pose
* Surya Namaskar

Each card includes:

* Benefits
* Recommended duration
* Difficulty level


## Workout

Workout recommendations vary according to the selected goal.

### Weight Loss

* Walking
* HIIT
* Cycling
* Jump Rope

### Muscle Gain

* Push Day
* Pull Day
* Legs
* Full Body Strength Training

### Healthy Living

* Yoga
* Pilates
* Stretching
* Mobility Exercises


# YouTube Workout Library

WellPulse includes embedded YouTube workout videos.

Videos are dynamically displayed according to the selected fitness goal.

Examples include:

* Fat Burning Workouts
* Walking Sessions
* HIIT
* Strength Training
* Yoga
* Stretching
* Meditation

Each video card includes:

* Embedded Player
* Video Title
* Channel Name
* Watch on YouTube Button
* Share Button


#  PCOS Wellness Module

A dedicated section supports users experiencing symptoms commonly associated with PCOS.

Users can select symptoms such as:

* Hirsutism
* Weight Gain
* Hair Fall
* Irregular Periods
* Menstrual Cycle >35 Days
* Menstrual Cycle <21 Days

Based on the selected symptoms, WellPulse provides recommendations for:

* Healthy Diet
* Exercise
* Yoga
* Lifestyle Changes
* Foods to Eat
* Foods to Avoid
* Hydration
* Sleep
* Stress Management
* Medical Consultation Reminder



#  Water Tracker

The water tracker encourages users to stay hydrated.

Features include:

* Eight interactive glasses
* Daily hydration progress
* Progress ring
* Reset button


# Weight History

Users can record their weight regularly.

Features:

* Add current weight
* Weight history timeline
* Visual progress chart


# AI Chat Assistant

A floating chatbot is available on every page.

The chatbot provides simulated responses to common questions such as:

* How can I lose weight?
* What foods help with PCOS?
* How much water should I drink?
* Best breakfast ideas
* Beginner workouts

The chatbot includes:

* Typing animation
* Auto-scroll
* Modern chat interface



#  Motivation

WellPulse includes a daily motivational quote section.

Users can generate new inspirational quotes using the "Random Quote" button.



#  User Interface

The application follows a premium wellness design.

Highlights include:

* Emerald Green theme
* Glassmorphism cards
* Soft shadows
* Rounded corners
* Responsive layouts
* Smooth animations
* Progress bars
* Animated gauges
* Mobile-first design



#  Technologies Used

* Next.js 15 (App Router)
* React 19
* JavaScript (ES6+)
* Tailwind CSS
* shadcn/ui
* Lucide React Icons


#  Responsive Design

The application is optimized for:

* Mobile Phones
* Tablets
* Laptops
* Desktop Computers

Supported screen sizes include:

* 320 px
* 375 px
* 425 px
* 768 px
* 1024 px
* 1280 px
* 1440 px


#  Project Structure

```text
app/
└── page.js

public/

README.md
package.json
next.config.js
tailwind.config.js
```


#  Getting Started

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Start production server

```bash
npm start
```


# Future Enhancements

* User authentication
* Cloud database integration
* AI API integration (OpenAI/Gemini)
* Wearable device synchronization
* Google Fit & Apple Health integration
* Dark mode functionality
* Progress analytics dashboard
* Appointment reminders
* Push notifications
* PDF health reports
* Multi-language support




This is a [Next.js](https://nextjs.org) project bootstrapped with [v0](https://v0.app).

## Built with v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below -- start new chats to make changes, and v0 will push commits directly to this repo. Every merge to `main` will automatically deploy.

[Continue working on v0 →](https://v0.app/chat/projects/prj_gL0OwAxgzi7wHkf3yPxKjKiatQcA)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.

# Developer

**Maryam Qadeer**

**Project:** WellPulse – Track. Thrive. Transform.

This project was developed to showcase modern web development practices while promoting healthier lifestyles through an engaging, responsive, and user-friendly wellness platform.

