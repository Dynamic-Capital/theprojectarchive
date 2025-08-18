// Crisp chat widget integration
// Replace {{CRISP_WEBSITE_ID}} with the actual website ID via environment variables or backend to keep it secure.
window.$crisp = [];
window.CRISP_WEBSITE_ID = "{{CRISP_WEBSITE_ID}}";
window.CRISP_RUNTIME_CONFIG = { theme: { primaryColor: "#ffe17d" } };
(function () {
  const d = document;
  const s = d.createElement("script");
  s.src = "https://client.crisp.chat/l.js";
  s.async = 1;
  d.getElementsByTagName("head")[0].appendChild(s);
})();
