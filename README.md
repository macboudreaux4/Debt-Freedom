# Debt Freedom

A personal debt payoff tracker and financial planning tool. Track your 19-month journey to consumer debt freedom with detailed budget management, monthly check-ins, and interactive financial planning tools.

**Features:**
- 📊 **19-Month Payoff Tracker** – Visual progress toward debt freedom (Dec 2027)
- 💰 **Budget Breakdown** – Track household spending by category
- 📝 **Monthly Check-Ins** – Log actual income, spending, and buffer usage
- 🎯 **Financial Planning** – Milestone tracker, windfall calculator, what-if scenarios
- 🌙 **Dark/Light Mode** – Easy on the eyes anytime
- 📱 **Mobile Optimized** – Works perfectly on iPhone (add to home screen)
- 💾 **Privacy-First** – All data saved locally (no backend, no servers)

## Quick Start

### Option 1: Open Directly
1. Download or clone this repo
2. Open `index.html` in your browser
3. Start tracking!

### Option 2: Host Online (Recommended for iPhone)
1. Deploy to **Vercel**, **Netlify**, or **GitHub Pages**
2. Open the hosted URL in **Safari** on iPhone
3. Tap Share → Add to Home Screen
4. Works like a native app!

## File Structure

```
Debt-Freedom/
├── README.md                    # This file
├── index.html                   # Main app entry point
├── src/
│   ├── constants.js            # Debt data, budget categories, colors
│   ├── utils.js                # Helper functions (formatting, calculations)
│   └── components/
│       ├── App.jsx             # Main app wrapper
│       ├── Confetti.jsx        # Celebration animation
│       ├── Card.jsx            # Reusable card component
│       ├── Row.jsx             # Reusable row layout
│       ├── MiniStat.jsx        # Small stat display
│       ├── DebtCard.jsx        # Individual debt card
│       └── tabs/
│           ├── DashTab.jsx     # Overview tab
│           ├── TrackTab.jsx    # 19-month tracker
│           ├── BudgetTab.jsx   # Budget editor
│           ├── CheckinTab.jsx  # Monthly check-in
│           └── FreedomTab.jsx  # Planning tools
└── .gitignore                   # Git ignore rules
```

## How It Works

### Three Financial Phases

**Phase 1: Interest Only** (Jun–Sep 2026)
- SoFi loan aggressive payoff
- Discover 2 at minimum payment ($403/mo)
- Snowball: ~$2,258/mo extra

**Phase 2: Principal & Interest** (Dec 2026–Jun 2027)
- 107k home note switches to P&I ($2,600/mo)
- Budget tightens; snowball variable
- Final consumer debts fall quickly

**Phase 3: Sprint** (Jul–Dec 2027)
- All consumer debts gone by December
- Aggressive final push
- Celebrate debt freedom!

### Key Numbers

- **Total Starting Debt:** $174,254
- **Consumer Debt (excl. home note):** $67,254
- **107k Home Note:** $107,000 @ 7.75%
- **Monthly Income:** $11,000 (default)
- **Freedom Date:** December 31, 2027

### Five Tabs

1. **Overview** – Countdown, debt summary, monthly check-in status
2. **Tracker** – 19-month projection with debt balances per month
3. **Budget** – Edit income, household expenses, sinking funds
4. **Check-In** – Log monthly actuals (income, spending, buffer usage)
5. **Freedom** – Milestones, post-debt roadmap, planning tools

## Data & Storage

- ✅ **No backend** – All data stored in browser's localStorage
- ✅ **No tracking** – Completely private
- ✅ **No dependencies** – React via CDN, no npm install needed
- ⚠️ **Backup manually** – Export/import via Settings tab (or copy localStorage)

**Storage Key:** `dfv3` (versioned for future updates)

## Customization

Edit `src/constants.js` to adjust:
- Your debts and payoff targets
- Budget categories and amounts
- Sinking fund items
- Theme colors

## Tips for Success

1. **Biweekly Payments** – Pay half monthly amount every 2 weeks = 13 payments/year (see Freedom tab)
2. **Discover 2 Alert** – Promo ends Jul 2027; keep paying $403/mo or face 27% interest
3. **Emergency Buffer** – Maintain $1,500 minimum (edit in Overview)
4. **Windfall Rule** – 80% to current debt, 10% buffer, 10% guilt-free spending
5. **Check-Ins** – Monthly logging shows actual vs. projected; adjusts snowball dynamically

## Building for Production

To minimize and optimize for deployment:

```bash
# If you add a build step (optional)
npm install --save-dev @vitejs/plugin-react vite
```

Or use hosted CDN versions (already included):
- React 18.2.0
- Babel 7.23.2

## Browser Support

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari (recommended for iPhone)
- ✅ Edge

## Future Enhancements

- [ ] Data export/import (JSON, CSV)
- [ ] Charts and graphs (balances over time)
- [ ] Notifications (promo ends, milestones)
- [ ] 6-month roadmap post-freedom (emergency fund, investing, etc.)
- [ ] Dark mode toggle persistence

## Notes

- **Hardcoded Projections:** The 19-month plan assumes consistent $11k income and fixed minimum payments. Adjust budget if income changes.
- **Version 3:** Previous versions stored data under different keys. Migration may be needed if upgrading.
- **Home Note (107k):** Continues past consumer debt freedom through June 2031 (~$2,600/mo P&I).

## License

Personal use. Feel free to fork and adapt for your own debt payoff plan!

---

**Made with 💚 to crush debt and build wealth.**
