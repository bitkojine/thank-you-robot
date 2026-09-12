# Release versioning

Follow [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html). The current game is in initial development (0.y.z). We choose to distinguish patches from features during this phase, even though SemVer permits rapid changes before 1.0.0.

## Public compatibility contract

This browser game has no external programming API. Its public contract comprises the playable entry URL at /thank-you-robot (with or without a trailing slash), the root entry on its standalone host, the change-history link and return navigation, and compatible restoration of previously valid local saves and preferences on the same origin. English and Lithuanian selection, timing assistance and sound controls must continue to work with existing progress. Internal JavaScript globals and asset filenames are implementation details, not a supported API. Moving to another origin does not migrate browser-local saves automatically.

## Choosing the next version

- PATCH: compatible fixes to existing behavior, including routing, translation, audio labels, layout and story contradictions; corrections to published change history. Example: 0.9.1 → 0.9.2.
- MINOR: new compatible functionality, such as a new supported language or gameplay mode. Reset patch to zero. Example: 0.9.2 → 0.10.0.
- Before 1.0.0, intentional incompatible contract changes use a minor increment and explain migration or lost compatibility. Do not silently discard saves. Stabilization at 1.0.0 is an explicit product decision, not an automatic jump after 0.9.
- After 1.0.0, incompatible contract changes increment MAJOR and reset minor and patch; compatible additions remain minor and fixes remain patch. Deprecation is a minor release before removal in a major release.
- Source-only documentation, tests and tooling changes do not require a game release. Batch related changes into one release; repeated deploy attempts retain the same version when content is unchanged.

dist/releases.js is the single version source. Use numeric MAJOR.MINOR.PATCH without leading zeros. Optional prerelease identifiers (for example 0.10.0-beta.1) precede the corresponding release. Build metadata does not affect precedence. Never modify a published version's artifact or reuse its number for changed content. Do not reset or renumber historical versions to compensate for earlier mistakes.

## History audit (2026-09-13)

All 15 existing commits were reviewed. The table records source history, not proof of individual live deployments. Versions 0.1.0–0.4.0 were assigned retrospectively in the 0.5.0 changelog. Several subsequent commits changed the game while retaining 0.6.0; those are recorded here rather than inventing historical release numbers. Both 0.7.0 and 0.8.0 entries first appear in the same commit.

| Commit | Change | Classification under current policy |
| --- | --- | --- |
| e2fd2cb | First mobile game, five scenes, choices, saves, timing assistance and sharing | Initial prototype (retrospective 0.1.0) |
| 197a7b7 | Optional soundtrack and service cues | Feature (retrospective 0.2.0) |
| bda0673 | Continuous music and viewport fit | Patch; historical 0.3.0 over-incremented |
| 14c45dd | Conditional memories, story corrections, save checks, explicit silence, route tests | Mixed fixes and explicit-choice behavior; historical 0.4.0 |
| 41e7923 | Simplified home, visible version and public change history | Feature (0.5.0) |
| 2599a60 | Language selection, gradual machine introduction, simpler story | Feature (0.6.0); language coverage was incomplete, subsequently patched |
| 39a14d6 | Repository/deployment documentation | Documentation only |
| 01aa844 | Correct stripped words in README | Documentation only |
| 341753c | Cloudflare Worker and assets binding | Hosting support; no separate game version recorded |
| 0412e9b | Correct deployment compatibility date | Deployment fix; no separate game version recorded |
| 38ddd88 | Translate three remaining epilogue passages | Patch; no separate game version recorded |
| d49d566 | Ignore local Wrangler files | Tooling only |
| eec5da5 | Add trailing-slash redirect | Patch; no separate game version recorded |
| b303f17 | Worker-first routing, strict prefix, preserve prefix on redirects | Patches; historical 0.7.0/0.8.0 over-incremented |
| 016a4e1 | Localize sound toggle refresh and failure label | Patch; historical 0.9.0 over-incremented |

0.9.1 corrects the public history and establishes this policy. Historical labels remain recognizable; future fixes increment the patch number.
