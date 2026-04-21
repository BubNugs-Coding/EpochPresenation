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
  const sectionIds = links
    .map((link) => (link.getAttribute("href") || "").replace("#", ""))
    .filter(Boolean);

  const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
  if (sections.length === 0) return;

  const linkById = new Map(
    links.map((link) => [(link.getAttribute("href") || "").replace("#", ""), link]),
  );

  /** Pixels from viewport top: section headings “count” once they pass under the fixed bar. */
  const getActivationLine = () => {
    const raw = getComputedStyle(document.documentElement).getPropertyValue("--topbar-h").trim();
    const parsed = parseFloat(raw);
    const topbarPx = Number.isFinite(parsed) ? parsed : 84;
    return topbarPx + 16;
  };

  const setActiveById = (id) => {
    for (const link of links) link.removeAttribute("aria-current");
    const active = linkById.get(id);
    if (active) active.setAttribute("aria-current", "page");
  };

  let ticking = false;
  const updateActiveSection = () => {
    ticking = false;
    const line = getActivationLine();
    const docEl = document.documentElement;
    const scrollY = window.scrollY || docEl.scrollTop || 0;
    const viewBottom = scrollY + docEl.clientHeight;

    if (viewBottom >= docEl.scrollHeight - 2) {
      setActiveById(sectionIds[sectionIds.length - 1]);
      return;
    }

    let activeId = sectionIds[0];
    for (let i = 0; i < sections.length; i += 1) {
      const top = sections[i].getBoundingClientRect().top;
      if (top <= line) activeId = sectionIds[i];
    }

    if (scrollY <= 2) {
      activeId = sectionIds[0];
    }

    setActiveById(activeId);
  };

  const onScrollOrResize = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateActiveSection);
  };

  window.addEventListener("scroll", onScrollOrResize, { passive: true });
  window.addEventListener("resize", onScrollOrResize);
  window.addEventListener("hashchange", onScrollOrResize);
  updateActiveSection();
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
