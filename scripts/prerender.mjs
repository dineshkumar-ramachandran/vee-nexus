import fs from 'node:fs/promises';
import { createServer } from 'vite';
import React from 'react';
import { renderToString } from 'react-dom/server';

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  ssr: { noExternal: ['gsap'] },
});
try {
  const { App } = await vite.ssrLoadModule('/src/main.tsx');
  const html = renderToString(React.createElement(App));
  const file = await fs.readFile('dist/index.html', 'utf8');
  await fs.writeFile('dist/index.html', file.replace('<div id="root"></div>', `<div id="root">${html}</div>`));
  console.log(`Prerendered ${html.length.toLocaleString()} characters of static HTML.`);
} finally {
  await vite.close();
}
