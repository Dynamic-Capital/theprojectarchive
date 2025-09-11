if (!self.define) {
  let e,
    s = {};
  const a = (a, c) => (
    (a = new URL(a + '.js', c).href),
    s[a] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          ((e.src = a), (e.onload = s), document.head.appendChild(e));
        } else ((e = a), importScripts(a), s());
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (c, t) => {
    const i =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (s[i]) return;
    let n = {};
    const u = (e) => a(e, i),
      r = { module: { uri: i }, exports: n, require: u };
    s[i] = Promise.all(c.map((e) => r[e] || u(e))).then((e) => (t(...e), n));
  };
}
define(['./workbox-f52fd911'], function (e) {
  'use strict';
  (importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/app-build-manifest.json',
          revision: '5e7ca8b1798e25cb274665bbc7c7cf31',
        },
        {
          url: '/_next/static/chunks/117-eb1bae4528c2f9ac.js',
          revision: 'y73TcvpvVSauwyP7uUmY7',
        },
        {
          url: '/_next/static/chunks/364-0547e6ea8ca87d3d.js',
          revision: 'y73TcvpvVSauwyP7uUmY7',
        },
        {
          url: '/_next/static/chunks/395-5b8ee5c5e793a01b.js',
          revision: 'y73TcvpvVSauwyP7uUmY7',
        },
        {
          url: '/_next/static/chunks/4-6dba5b902e76f9a0.js',
          revision: 'y73TcvpvVSauwyP7uUmY7',
        },
        {
          url: '/_next/static/chunks/502-abcd396b1f8a9121.js',
          revision: 'y73TcvpvVSauwyP7uUmY7',
        },
        {
          url: '/_next/static/chunks/610.aab5f5b217d009de.js',
          revision: 'aab5f5b217d009de',
        },
        {
          url: '/_next/static/chunks/684-6ac23e0e459ed5bc.js',
          revision: 'y73TcvpvVSauwyP7uUmY7',
        },
        {
          url: '/_next/static/chunks/app/%5Bsection%5D/page-5cd02380a32569c1.js',
          revision: 'y73TcvpvVSauwyP7uUmY7',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-c1bbe1b4bc8170a6.js',
          revision: 'y73TcvpvVSauwyP7uUmY7',
        },
        {
          url: '/_next/static/chunks/app/coming-soon/page-d0b661cdf7de57fc.js',
          revision: 'y73TcvpvVSauwyP7uUmY7',
        },
        {
          url: '/_next/static/chunks/app/error-0f29d542fc3252ab.js',
          revision: 'y73TcvpvVSauwyP7uUmY7',
        },
        {
          url: '/_next/static/chunks/app/layout-db5b4f6b797702da.js',
          revision: 'y73TcvpvVSauwyP7uUmY7',
        },
        {
          url: '/_next/static/chunks/app/not-found-b8b2db7d14af6a6d.js',
          revision: 'y73TcvpvVSauwyP7uUmY7',
        },
        {
          url: '/_next/static/chunks/app/page-fad4778127261ac4.js',
          revision: 'y73TcvpvVSauwyP7uUmY7',
        },
        {
          url: '/_next/static/chunks/b536a0f1-87fe7d628774cf2e.js',
          revision: 'y73TcvpvVSauwyP7uUmY7',
        },
        {
          url: '/_next/static/chunks/bd904a5c-36d3f6f472903483.js',
          revision: 'y73TcvpvVSauwyP7uUmY7',
        },
        {
          url: '/_next/static/chunks/fd9d1056-07005af0086e2321.js',
          revision: 'y73TcvpvVSauwyP7uUmY7',
        },
        {
          url: '/_next/static/chunks/framework-f66176bb897dc684.js',
          revision: 'y73TcvpvVSauwyP7uUmY7',
        },
        {
          url: '/_next/static/chunks/main-6e92058399905653.js',
          revision: 'y73TcvpvVSauwyP7uUmY7',
        },
        {
          url: '/_next/static/chunks/main-app-499f6d8e194c6aa9.js',
          revision: 'y73TcvpvVSauwyP7uUmY7',
        },
        {
          url: '/_next/static/chunks/pages/_app-72b849fbd24ac258.js',
          revision: 'y73TcvpvVSauwyP7uUmY7',
        },
        {
          url: '/_next/static/chunks/pages/_error-7ba65e1336b92748.js',
          revision: 'y73TcvpvVSauwyP7uUmY7',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-fb73385a23a089e9.js',
          revision: 'y73TcvpvVSauwyP7uUmY7',
        },
        {
          url: '/_next/static/css/b82349f592ab3204.css',
          revision: 'b82349f592ab3204',
        },
        {
          url: '/_next/static/media/19cfc7226ec3afaa-s.woff2',
          revision: '9dda5cfc9a46f256d0e131bb535e46f8',
        },
        {
          url: '/_next/static/media/21350d82a1f187e9-s.woff2',
          revision: '4e2553027f1d60eff32898367dd4d541',
        },
        {
          url: '/_next/static/media/8e9860b6e62d6359-s.woff2',
          revision: '01ba6c2a184b8cba08b0d57167664d75',
        },
        {
          url: '/_next/static/media/ba9851c3c22cd980-s.woff2',
          revision: '9e494903d6b0ffec1a1e14d34427d44d',
        },
        {
          url: '/_next/static/media/c5fe6dc8356a8c31-s.woff2',
          revision: '027a89e9ab733a145db70f09b8a18b42',
        },
        {
          url: '/_next/static/media/df0a9ae256c0569c-s.woff2',
          revision: 'd54db44de5ccb18886ece2fda72bdfe0',
        },
        {
          url: '/_next/static/media/e4af272ccee01ff0-s.p.woff2',
          revision: '65850a373e258f1c897a2b3d75eb74de',
        },
        {
          url: '/_next/static/y73TcvpvVSauwyP7uUmY7/_buildManifest.js',
          revision: 'c155cce658e53418dec34664328b51ac',
        },
        {
          url: '/_next/static/y73TcvpvVSauwyP7uUmY7/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        { url: '/favicon.svg', revision: '5bca3b3cb68005fa26ac5191b0319da0' },
      ],
      { ignoreURLParametersMatching: [] },
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: a,
              state: c,
            }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: 'OK',
                    headers: s.headers,
                  })
                : s,
          },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /^https:\/\/picsum\.photos\/.*$/i,
      new e.CacheFirst({
        cacheName: 'image-cache',
        plugins: [new e.ExpirationPlugin({ maxEntries: 50 })],
      }),
      'GET',
    ));
});
