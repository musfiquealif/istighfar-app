# Dhikr Ring (formerly the Istighfar app)

## What this is
A tap counter for istighfar (أَسْتَغْفِرُ ٱللَّٰهَ), styled like Apple Fitness rings. Tap anywhere on the Day screen to count. Installable as a home-screen web app (PWA).

The owner is a beginner, not a developer. Explain steps simply, and give exact click-by-click instructions for anything done outside the code (GitHub, Vercel, Supabase dashboards).

## Hosting and deploy
- Code lives in the GitHub repo `istighfar-app`. Vercel auto-deploys on every push to the main branch.
- Static site, no build step. Vercel Framework Preset: Other.
- Vercel Deployment Protection must stay off for Production so friends can open the app.

## Files
- `index.html`: the whole app (HTML, CSS and JS in one file). Plain JS, no framework.
- `sw.js`: service worker, network-first with cache fallback. Bump the cache name (`istighfar-v2` → `istighfar-v3` ...) when changing caching behaviour.
- `manifest.json`: PWA manifest (name, icons, standalone display).
- `icons/`: `icon-180.png` (apple-touch-icon), `icon-192.png`, `icon-512.png`. Logo: a mint ring (#2de2a6) with a crescent, on near-black (#0a0e0d).

## Features so far
- Tabs: Day, Week, Month, Friends.
- Day: big ring toward a daily goal, tap anywhere to +1, Undo, editable goal (type a number, default 100), streak, all-time total.
- Week: 7 mini rings, bar chart, average, best day, goals reached. Weeks start on Saturday.
- Month: calendar of rings, monthly totals, arrows to go back in time.
- Light and dark mode via CSS variables on `:root`.
- Counts stored locally in `localStorage` key `istighfar-v1` as `{days: {"YYYY-MM-DD": count}, goal}`.
- Friends tab (Supabase): email/password sign-up with a username, online sync of daily counts (merge keeps the higher count per day), groups with 6-character join codes, leaderboard for Today/Week/Month, leave group, sign out.

## Supabase
- Project URL: `https://rfnxlolvnkgqwpsbcbzg.supabase.co`
- The publishable key is in `index.html` (safe to be public). Never put the service_role or secret key in code.
- Region: Singapore. "Confirm email" is meant to be off.
- Tables: `profiles(id, username)`, `daily_counts(user_id, day, count)`, `groups(id, name, code, owner)`, `group_members(group_id, user_id)`. Row level security is on for all four.
- RPC functions (security definer): `create_group(gname)`, `join_group(gcode)`, `leaderboard(gid, d1, d2)` returning `username, total`. Friends only see totals, and only inside groups they share.
- The live sign-up and groups flow has not been tested end to end yet. Test it first and fix any errors.

## Roadmap (owner's plan)
1. Finish and test friends + leaderboard.
2. Rename to DhikrRing (new logo, domain; check that the name and domain are free).
3. Native app for the App Store and Google Play (for example by wrapping with Capacitor). iPhone needs a native app for Bluetooth. Apple developer account costs $99/year.
4. Physical DhikrRing: a Bluetooth ring that counts istighfar and syncs to the app. Start testing with an existing Bluetooth tasbih ring. Web Bluetooth only works on Android Chrome.

Other ideas discussed: backup/export of counts, more dhikr types (SubhanAllah, Alhamdulillah, etc.).
