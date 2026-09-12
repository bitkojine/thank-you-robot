# Game maintenance

- Keep interface copy plain and useful. No promotional taglines, aphorisms, or repeated title treatments. Preserve intentional dialogue and story prose.
- The home/restart screen shows the large title once. Keep the small title during gameplay.
- Preserve mobile-first play, mute by default, uninterrupted music between scenes, and the game viewport without vertical scrolling. The separate change-history document may scroll for reading.
- Follow Semantic Versioning 2.0.0 and VERSIONING.md. Compatible bug fixes (including paths, audio, translations, layout and copy corrections) increment PATCH, e.g. 0.9.1 → 0.9.2. New compatible features increment MINOR and reset PATCH, e.g. 0.9.2 → 0.10.0. Do not use a minor bump merely because a change is deployed.
- During 0.y.z development, deliberate compatibility breaks require a minor bump and explicit migration notes. Once 1.0.0 is declared stable, incompatible public-contract changes require a major bump, resetting minor and patch.
- Batch related changes into one release; do not create a version per commit or retry. Source-only documentation, tests and tooling changes need no standalone game release. A deployed correction to the public changelog is a patch.
- Before publication, update the single version source in dist/releases.js and add factual, spoiler-light notes. Never renumber released versions or rewrite Git history. Correct historical inaccuracies with explicit audit notes. Record commits separately from verified deployments; a Git push is not proof of publication.
- Keep the public history spoiler-light. Record what shipped, not promises or unverified claims.
- This release version is separate from the saved-game schema key; do not erase compatible progress when bumping the release.
