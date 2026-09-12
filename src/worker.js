export default {
  async fetch(request, env) {
    const incoming = new URL(request.url);

    if (incoming.pathname.startsWith("/thank-you-robot")) {
      if (incoming.pathname === "/thank-you-robot") {
        incoming.pathname = "/thank-you-robot/";
        return Response.redirect(incoming, 301);
      }
      const rewritten = new URL(request.url);
      rewritten.pathname = incoming.pathname.replace(/^\/thank-you-robot/, "") || "/";
      return env.ASSETS.fetch(new Request(rewritten, request));
    }

    return env.ASSETS.fetch(request);
  }
};
