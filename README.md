# Thank You Robot

A short mobile browser game about courtesy, survival, and being the exception.

## Local preview

Open dist/index.html in a browser, or serve the dist folder with any static file server.

## Publishing

The publish directory is dist. For RobertasRudys.com/thank-you-robot, deploy this directory behind a path route on the domain host. Keep the game repository separate from the main site, then route that path to this static deployment.

The game stores progress and language preference locally in the player browser. Audio starts muted and can be enabled by the player.

## Releases

See [dist/changelog.html](dist/changelog.html) for the public development history. The current release is recorded in [dist/releases.js](dist/releases.js).

We follow [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html): patches for compatible fixes, minor versions for new features, and major versions for incompatible changes after stabilization. See [VERSIONING.md](VERSIONING.md) for the public compatibility contract, pre-1.0 policy and full commit audit.
