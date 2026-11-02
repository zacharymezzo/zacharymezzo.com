// YouTube: show a thumbnail until clicked, then swap in the player.
// Keeps the page light (no iframes load up front). Without JS the thumbnail
// is just a link to YouTube.
(() => {
  document.querySelectorAll(".video-frame[data-yt]").forEach((frame) => {
    frame.addEventListener("click", (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey) return; // let "open in new tab" through
      e.preventDefault();
      const params = new URLSearchParams({ autoplay: "1", rel: "0" });
      if (frame.dataset.start > 0) params.set("start", frame.dataset.start);
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube-nocookie.com/embed/${frame.dataset.yt}?${params}`;
      iframe.title = frame.getAttribute("aria-label").replace(/^Play /, "");
      iframe.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
      iframe.allowFullscreen = true;
      const box = document.createElement("div");
      box.className = frame.className;
      box.append(iframe);
      frame.replaceWith(box);
    });
  });
})();
