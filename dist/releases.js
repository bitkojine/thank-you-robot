// Newest first. One source for the visible version and public release history.
window.RobotRelease = {
  entries: [
    { version: '0.8.0', date: '2026-09-13', title: 'Keep navigation inside the game', changes: [
      'Keep the game path on asset redirects, including the change-history page and return link.'
    ]},
    { version: '0.7.0', date: '2026-09-13', title: 'Custom-domain routing fix', changes: [
      'Run the path redirect before serving files so the game opens with or without a trailing slash.',
      'Return missing-file errors instead of substituting the game page for missing scripts.'
    ]},
    { version: '0.6.0', date: '2026-09-12', title: 'Bilingual onboarding', changes: [
      'Added English and Lithuanian throughout the game, with a language switch available on every screen.',
      'Reduced the first chapters to introduce one machine, then two, before the full four-machine rhythm.',
      'Rewrote the story in plain language so the human cost and philosophical question are easier to follow.'
    ]},
    { version: '0.5.0', date: '2026-09-12', title: 'Simpler start screen', changes: [
      'Removed slogans and the duplicate game title from the start and restart screen.',
      'Replaced promotional copy with a short instruction. Kept the small title during play.',
      'Added a visible version number and this public change history.'
    ]},
    { version: '0.4.0', date: '2026-09-12', title: 'Story consistency', changes: [
      'Made dialogue and later memories follow the specific choices you made.',
      'Made continuing without answering an explicit choice.',
      'Clarified the judgment rules and corrected contradictory story passages.',
      'Improved saved-game validation and restart behavior; added automated narrative-path checks.'
    ]},
    { version: '0.3.0', date: '2026-09-12', title: 'Continuous music and screen fit', changes: [
      'Music changes mood without restarting when you move to the next scene.',
      'Adjusted the game to fit phone and desktop screens without vertical scrolling.'
    ]},
    { version: '0.2.0', date: '2026-09-12', title: 'Optional audio', changes: [
      'Added an original evolving soundtrack and sounds for machine services, thanks, and omissions.',
      'Added a sound toggle. Audio starts muted and pauses when you leave the game.'
    ]},
    { version: '0.1.0', date: '2026-09-12', title: 'First playable prototype', changes: [
      'Released five chapters, timed machine interactions, human conversations, and two outcomes.',
      'Added local progress saving, pause and resume, timing assistance, and result sharing.'
    ]}
  ]
};
window.RobotRelease.version = window.RobotRelease.entries[0].version;
