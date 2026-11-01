// Album covers: hover (mouse) or first tap/click (touch, keyboard) reveals the
// links; clicking a revealed link opens it in a new tab. Tapping elsewhere closes.
(() => {
  const covers = document.querySelectorAll(".album-cover");
  const canHover = window.matchMedia("(hover: hover)");
  const closeAll = (except) =>
    covers.forEach((c) => c !== except && c.classList.remove("is-open"));

  covers.forEach((cover) => {
    cover.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      // Let the link through if it was already visible (open, or hovered with a mouse).
      if (link && (cover.classList.contains("is-open") || canHover.matches)) return;
      if (link) e.preventDefault();
      const open = !cover.classList.contains("is-open");
      closeAll(cover);
      cover.classList.toggle("is-open", open);
      cover.setAttribute("aria-expanded", open);
    });

    cover.addEventListener("keydown", (e) => {
      if ((e.key === "Enter" || e.key === " ") && e.target === cover) {
        e.preventDefault();
        cover.click();
      } else if (e.key === "Escape") {
        cover.classList.remove("is-open");
        cover.focus();
      }
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".album-cover")) closeAll();
  });
})();
