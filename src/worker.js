export default {
  async fetch(request, env) {
    const incoming = new URL(request.url);

    if (incoming.pathname === "/thank-you-robot" || incoming.pathname.startsWith("/thank-you-robot/")) {
      if (incoming.pathname === "/thank-you-robot") {
        incoming.pathname = "/thank-you-robot/";
        return Response.redirect(incoming, 301);
      }
      const rewritten = new URL(request.url);
      rewritten.pathname = incoming.pathname.replace(/^\/thank-you-robot/, "") || "/";
      const response = await env.ASSETS.fetch(new Request(rewritten, request));
      // Asset canonicalization sees the stripped path. Restore the public mount
      // on redirects so changelog.html and index.html cannot escape the game.
      const location = response.headers.get("Location");
      if (response.status >= 300 && response.status < 400 && location) {
        const target = new URL(location, rewritten);
        if (target.origin === incoming.origin) {
          target.pathname = "/thank-you-robot" + target.pathname;
          const headers = new Headers(response.headers);
          headers.set("Location", target.href);
          return new Response(response.body, { status: response.status, headers });
        }
      }
      return response;
    }

    return env.ASSETS.fetch(request);
  }
};
