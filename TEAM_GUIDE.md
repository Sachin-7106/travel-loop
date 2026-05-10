# Traveloop – Team Git Split Guide

## Setup (ONE person does this first — ideally you)

```bash
# 1. Create repo on GitHub named "traveloop"
# 2. Clone it and copy all files in
git init
git add .
git commit -m "initial: traveloop project setup"
git remote add origin https://github.com/YOUR_USERNAME/traveloop.git
git push -u origin main
```

---

## Each Member: First-time setup

```bash
git clone https://github.com/YOUR_USERNAME/traveloop.git
cd traveloop
npm install
npm run dev       # test it runs on http://localhost:5173
```

---

## MEMBER 1 – Auth + Dashboard + Profile

### Files to work on:
- `src/pages/Login.jsx`         ← Screen 1: Login / Signup
- `src/pages/Dashboard.jsx`     ← Screen 2: Home / Dashboard
- `src/pages/Profile.jsx`       ← Screen 12: Profile & Settings

### Your git flow:
```bash
git checkout -b feature/member1-auth-dashboard
# make your changes
git add src/pages/Login.jsx src/pages/Dashboard.jsx src/pages/Profile.jsx
git commit -m "feat: login, dashboard and profile screens"
git push origin feature/member1-auth-dashboard
# Create pull request on GitHub → merge to main
```

---

## MEMBER 2 – Trip Management + Itinerary

### Files to work on:
- `src/pages/CreateTrip.jsx`        ← Screen 3: Create Trip
- `src/pages/MyTrips.jsx`           ← Screen 4: My Trips List
- `src/pages/ItineraryBuilder.jsx`  ← Screen 5: Itinerary Builder
- `src/pages/ItineraryView.jsx`     ← Screen 6: Itinerary View

### Your git flow:
```bash
git checkout -b feature/member2-trips-itinerary
# make your changes
git add src/pages/CreateTrip.jsx src/pages/MyTrips.jsx src/pages/ItineraryBuilder.jsx src/pages/ItineraryView.jsx
git commit -m "feat: trip creation, list and itinerary screens"
git push origin feature/member2-trips-itinerary
# Create pull request on GitHub → merge to main
```

---

## MEMBER 3 – Search + Budget

### Files to work on:
- `src/pages/CitySearch.jsx`      ← Screen 7: City Search
- `src/pages/ActivitySearch.jsx`  ← Screen 8: Activity Search
- `src/pages/Budget.jsx`          ← Screen 9: Budget & Cost Breakdown

### Your git flow:
```bash
git checkout -b feature/member3-search-budget
# make your changes
git add src/pages/CitySearch.jsx src/pages/ActivitySearch.jsx src/pages/Budget.jsx
git commit -m "feat: city search, activity search and budget screens"
git push origin feature/member3-search-budget
# Create pull request on GitHub → merge to main
```

---

## MEMBER 4 – Utilities + Shared

### Files to work on:
- `src/pages/PackingChecklist.jsx`  ← Screen 10: Packing Checklist
- `src/pages/SharedItinerary.jsx`   ← Screen 11: Shared/Public Itinerary
- `src/pages/TripNotes.jsx`         ← Screen 13: Trip Notes / Journal

### Your git flow:
```bash
git checkout -b feature/member4-utils-sharing
# make your changes
git add src/pages/PackingChecklist.jsx src/pages/SharedItinerary.jsx src/pages/TripNotes.jsx
git commit -m "feat: packing checklist, shared itinerary and trip notes"
git push origin feature/member4-utils-sharing
# Create pull request on GitHub → merge to main
```

---

## DO NOT TOUCH (core files — only you manage these)
- `src/App.jsx`
- `src/index.css`
- `src/context/AppContext.jsx`
- `src/components/Navbar.jsx`
- `package.json`, `vite.config.js`, `index.html`

---

## Final step – Deploy to Vercel (free, 1 click)
1. Go to https://vercel.com → Import Git Repository
2. Select your traveloop repo
3. Click Deploy → done! You get a live URL.
