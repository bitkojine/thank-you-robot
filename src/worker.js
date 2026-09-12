export default {
  async fetch(request, env) {
    const incoming = new URL(request.url);

    if (incoming.pathname.startsWith("/thank-you-robot")) {
      const rewritten = new URL(request.url);
      rewritten.pathname = incoming.pathname.replace(/^\/thank-you-robot/, "") || "/";
      return env.ASSETS.fetch(new Request(rewritten, request));
    }

    return env.ASSETS.fetch(request);
  }
};
