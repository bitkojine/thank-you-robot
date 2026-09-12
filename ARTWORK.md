# Illustrated world — 0.10.0

Generated using the built-in image generation tool. Final assets: dist/art/world.jpg and dist/art/machines.jpg. JPEG conversion retains the original compositions while reducing mobile downloads. The unmodified generated PNG originals remain outside the repository.

## Prompt set

World atlas: six equal panels in a 3-column, 2-row image; painterly cinematic graphic novel, navy shadows and amber light, no UI or text. Panels in reading order: morning kitchen with toast; station with ticket and coffee machines; sad curly-haired Eli in a rust sweater in his apartment; woman engineer beside public-office terminal; guardian and waiting crowd with Eli; elderly survivor, caretaker, cake, empty chair and sunset sea view. Important subjects centered for mobile cropping.

Machine atlas: sixteen equal cells in a 4-column, 4-row image; recognizable painterly objects on navy backgrounds, consistent three-quarter perspective, amber highlights. In reading order: toaster, ticket kiosk, coffee machine, speaker, purifier, medicine delivery robot, dishwasher, benefits terminal, medical scanner, security gate, assistant, radio, evacuation gate, tram, guardian, cake. No UI text; cell backgrounds and image crops are presentation only.

## Integration

CSS selects atlas cells without downloading a separate image per object. Text labels, machine timing/status, and human dialogue remain the accessible equivalents. Illustrations are decorative to avoid repeating those descriptions to screen readers. Warm scenes progress into cold public spaces, ending in a quiet sunset. Existing saved-game data and language selection are unchanged.
