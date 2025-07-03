
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {},
  assets: {
    'index.csr.html': {size: 4335, hash: '1a5bcaa4ad378a553272148b2b2c6a39f32f936e5fcaf8e6fa68886feff1374b', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 4401, hash: '9a2758e4d83cba371fc795f5a6c48def9548260833d9154cdee5f1796670829c', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-6DLAKFEQ.css': {size: 1056, hash: 'IpPnd5F3/oI', text: () => import('./assets-chunks/styles-6DLAKFEQ_css.mjs').then(m => m.default)}
  },
};
