function qs(sel, root = document) {
  return root.querySelector(sel);
}

function qsa(sel, root = document) {
  return Array.from(root.querySelectorAll(sel));
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function setToast(btn, text, ms = 1200) {
  const old = btn.textContent;
  btn.textContent = text;
  btn.disabled = true;
  window.setTimeout(() => {
    btn.textContent = old;
    btn.disabled = false;
  }, ms);
}

function setupActiveNav() {
  const links = qsa(".navLink");
  const sections = links
    .map((a) => qs(a.getAttribute("href")))
    .filter(Boolean);

  const sectionById = new Map(sections.map((s) => [s.id, s]));
  const linkById = new Map(
    links
      .map((link) => {
        const id = (link.getAttribute("href") || "").replace("#", "");
        return [id, link];
      })
      .filter(([id]) => sectionById.has(id)),
  );

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;

      for (const link of links) link.removeAttribute("aria-current");
      const activeLink = linkById.get(visible.target.id);
      if (activeLink) activeLink.setAttribute("aria-current", "page");
    },
    {
      root: null,
      threshold: [0.2, 0.35, 0.5, 0.65],
    },
  );

  sections.forEach((s) => observer.observe(s));
}

function setupScrollProgress() {
  const bar = qs("#progressBar");
  if (!bar) return;

  const onScroll = () => {
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || document.body.scrollTop;
    const height = doc.scrollHeight - doc.clientHeight;
    const pct = height > 0 ? (scrollTop / height) * 100 : 0;
    bar.style.width = `${clamp(pct, 0, 100).toFixed(2)}%`;
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function setupExpandAll() {
  const btn = qs("#expandAllBtn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const details = qsa("details.accordion");
    const allOpen = details.length > 0 && details.every((d) => d.open);
    details.forEach((d) => {
      d.open = !allOpen;
    });
    btn.textContent = allOpen ? "Expand all" : "Collapse all";
  });
}

function setupCopyLink() {
  const btn = qs("#copyLinkBtn");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setToast(btn, "Copied!");
    } catch {
      window.prompt("Copy this link:", window.location.href);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupActiveNav();
  setupScrollProgress();
  setupExpandAll();
  setupCopyLink();
});
