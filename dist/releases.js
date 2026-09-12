// Newest first. One source for the visible version and public release history.
window.RobotRelease = {
  entries: [
    {version:'0.10.1',date:'2026-09-13',title:'Courtesy record wording',changes:['Replace Team Robot status labels with Courtesy Record wording in English and Lithuanian.']},
    {version:'0.10.0',date:'2026-09-13',title:'Illustrated world',changes:['Added original chapter artwork, recognizable machine illustrations and a distinct sea-view epilogue.']},
    { version: '0.9.2', date: '2026-09-13', title: 'Complete Lithuanian text coverage', changes: ['Translate remaining ending, sharing, accessibility and change-history text; preserve the current screen when switching languages.']},
    { version: '0.9.1', date: '2026-09-13', title: 'Correct release history and versioning', changes: [
      'Use patch increments for compatible bug fixes and minor increments for new features.',
      'Audit the full Git history, record previously omitted hosting and translation changes, and distinguish commits from deployments.',
      'Preserve historical version labels and explain earlier oversized version bumps.'
    ]},
    { version: '0.9.0', date: '2026-09-13', title: 'Sound button language fix', changes: [
      'Keep the sound button and its accessible label in the selected language after toggling audio, including when sound is unavailable.'
    ]},
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

const releaseLithuanian = [["0.10.1","Mandagumo įrašo formuluotės",["Robotų komandos būsenos pakeistos mandagumo įrašo formuluotėmis anglų ir lietuvių kalbomis."]],["0.10.0","Iliustruotas pasaulis",["Pridėtos originalios skyrių iliustracijos, atpažįstamų įrenginių piešiniai ir atskiras epilogas su vaizdu į jūrą."]],["0.9.2", "Visas tekstas lietuviškai", ["Išversti likę pabaigų, dalijimosi, prieinamumo ir pakeitimų istorijos tekstai; keičiant kalbą išlaikomas dabartinis ekranas."]], ["0.9.1", "Pataisyta versijų istorija ir numeravimas", ["Suderinamiems klaidų taisymams didinamas paskutinis versijos skaičius, naujoms funkcijoms – vidurinis.", "Peržiūrėta visa Git istorija, įtraukti praleisti talpinimo ir vertimo pakeitimai; atskirti kodo įrašai ir paskelbimai.", "Išsaugoti ankstesni versijų numeriai ir paaiškinti per dideli jų šuoliai."]], ["0.9.0", "Garso mygtuko kalbos taisymas", ["Perjungus garsą, mygtuko tekstas ir prieinamumo žyma lieka pasirinkta kalba, net jei garsas nepasiekiamas."]], ["0.8.0", "Nuorodos lieka žaidime", ["Failų peradresavimuose išsaugomas žaidimo adresas, įskaitant pakeitimų istorijos puslapį ir grįžimo nuorodą."]], ["0.7.0", "Žaidimo adreso taisymas", ["Peradresavimas atliekamas prieš pateikiant failus, todėl žaidimas atsidaro ir su pasviruoju brūkšniu adreso gale, ir be jo.", "Jei failo nėra, grąžinama klaida, o ne žaidimo puslapis vietoje trūkstamo scenarijaus."]], ["0.6.0", "Dvi kalbos ir laipsniška pradžia", ["Pridėtos anglų ir lietuvių kalbos bei kalbos perjungimas žaidimo ekranuose.", "Pradžioje pristatomas vienas įrenginys, vėliau du, o tada keturi.", "Istorija perrašyta paprasčiau, kad būtų aiškesnės pasekmės žmonėms ir pagrindinis klausimas."]], ["0.5.0", "Paprastesnis pradžios ekranas", ["Pašalinti šūkiai ir pasikartojantis žaidimo pavadinimas pradžios bei pakartotinio žaidimo ekranuose.", "Reklaminį tekstą pakeitė trumpa instrukcija. Žaidžiant išliko mažas pavadinimas.", "Pridėtas matomas versijos numeris ir vieša pakeitimų istorija."]], ["0.4.0", "Nuoseklesnė istorija", ["Dialogai ir vėlesni prisiminimai pritaikyti konkretiems tavo pasirinkimams.", "Tęsimas neatsakius tapo aiškiu pasirinkimu.", "Patikslintos vertinimo taisyklės ir pataisyti prieštaringi istorijos fragmentai.", "Pagerintas išsaugoto žaidimo tikrinimas ir pradėjimas iš naujo; pridėtos automatinės istorijos kelių patikros."]], ["0.3.0", "Nenutrūkstanti muzika ir ekrano dydis", ["Pereinant į kitą sceną keičiasi muzikos nuotaika, bet ji neprasideda iš naujo.", "Žaidimas pritaikytas telefono ir kompiuterio ekranams be vertikalaus slinkimo."]], ["0.2.0", "Pasirenkamas garsas", ["Pridėta originali kintanti muzika ir įrenginių darbo, padėkų bei praleidimų garsai.", "Pridėtas garso jungiklis. Pradžioje garsas išjungtas; palikus žaidimą jis sustabdomas."]], ["0.1.0", "Pirmasis žaidžiamas prototipas", ["Pristatyti penki skyriai, įrenginiai su laikmačiais, pokalbiai su žmonėmis ir dvi baigtys.", "Pridėtas vietinis pažangos išsaugojimas, pauzė, tęsimas, daugiau laiko padėkoms ir dalijimasis rezultatu."]]];
for(const [version,title,changes] of releaseLithuanian){const entry=window.RobotRelease.entries.find(r=>r.version===version);entry.lt={title,changes};}
