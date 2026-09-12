# Game maintenance

- Keep interface copy plain and useful. No promotional taglines, aphorisms, or repeated title treatments. Preserve intentional dialogue and story prose.
- The home/restart screen shows the large title once. Keep the small title during gameplay.
- Preserve mobile-first play, mute by default, uninterrupted music between scenes, and the game viewport without vertical scrolling. The separate change-history document may scroll for reading.
- Before each published change, bump the game version and add a factual entry at the start of `dist/releases.js`. Use 0.x.0 for prototype releases; the current display is derived from the first entry. Do not renumber existing entries.
- Keep the public history spoiler-light. Record what shipped, not promises or unverified claims.
- This release version is separate from the saved-game schema key; do not erase compatible progress when bumping the release.
