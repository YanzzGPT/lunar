// Import the raw text content of your HTML, CSS, and JS files.
// The bundler (Wrangler/esbuild) will handle including these files' content in the final script.
import indexHtml from './index.html';
import styleCss from './style.css';
import scriptJs from './script.js';

export default {
  /**
   * The fetch handler is the entry point for your Worker.
   * It's called each time a request is made to your Worker's URL.
   *
   * @param request - The incoming request object.
   * @returns A Response object.
   */
  async fetch(request: Request): Promise<Response> {
    // Parse the URL to determine which file is being requested.
    const url = new URL(request.url);

    // Simple routing logic based on the URL pathname.
    switch (url.pathname) {
      case '/':
        // If the root path is requested, serve the index.html file.
        // We set the Content-Type header to tell the browser it's an HTML document.
        return new Response(indexHtml, {
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        });

      case '/style.css':
        // If style.css is requested, serve the CSS file.
        // The Content-Type header is set to text/css.
        return new Response(styleCss, {
          headers: { 'Content-Type': 'text/css; charset=utf-8' },
        });

      case '/script.js':
        // If script.js is requested, serve the JavaScript file.
        // The Content-Type header is set to application/javascript.
        return new Response(scriptJs, {
          headers: { 'Content-Type': 'application/javascript; charset=utf-8' },
        });

      default:
        // If the requested path doesn't match any of the above, return a 404 "Not Found" error.
        return new Response('Not Found', { status: 404 });
    }
  },
};
