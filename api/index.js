import handler from '../dist/server/server.js';

// By removing the Edge config, Vercel will use the Node.js runtime,
// which has full support for modules like async_hooks, stream, etc.
// We wrap the handler explicitly with a 'request' parameter
// so Vercel's static analyzer knows to pass a Web Request object
// instead of a standard Node.js (req, res) object.

export default async function (request) {
  return handler(request);
}
