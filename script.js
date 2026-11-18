/* ============================================================
   EDIT YOUR CONTENT HERE
   ============================================================ */
const profile = {
  name: "Your Name",
  handle: "@yourhandle",
  bio: "Creator, developer and coffee enthusiast. Sharing what I build and learn.",
  avatar: "",            // optional: path or URL of your photo, e.g. "me.jpg"
  initials: "YN",        // shown when no avatar image is set
  defaultTheme: "ocean"  // ocean | sunset | forest | light | midnight
};

// featured: true highlights a link with the accent color
const links = [
  { icon: "⭐", title: "My new project", note: "Check out what I'm launching", url: "https://example.com", featured: true },
  { icon: "\u{1F4BC}", title: "Portfolio", note: "Selected work and case studies", url: "https://example.com" },
  { icon: "\u{1F4DD}", title: "Blog", note: "Articles and tutorials", url: "https://example.com" },
  { icon: "\u{1F3A5}", title: "YouTube channel", note: "New videos every week", url: "https://youtube.com" },
  { icon: "\u{1F4E7}", title: "Work with me", note: "hello@example.com", url: "mailto:hello@example.com" }
];

const socials = [
  { label: "GH", name: "GitHub", url: "https://github.com/" },
  { label: "in", name: "LinkedIn", url: "https://linkedin.com/" },
  { label: "IG", name: "Instagram", url: "https://instagram.com/" },
  { label: "X", name: "X / Twitter", url: "https://x.com/" },
  { label: "YT", name: "YouTube", url: "https://youtube.com/" }
];

const themes = ["ocean", "sunset", "forest", "light", "midnight"];

/* ============================================================
   Rendering (no need to edit below)
   ============================================================ */
const $ = (s) => document.querySelector(s);
const esc = (t) => String(t).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

$("#name").textContent = profile.name;
$("#handle").textContent = profile.handle;
$("#bio").textContent = profile.bio;
document.title = profile.name + " — Links";
if (profile.avatar) $("#avatar").innerHTML = `<img src="${esc(profile.avatar)}" alt="${esc(profile.name)}">`;
else $("#avatar").textContent = profile.initials;

$("#socials").innerHTML = socials.map(s => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener" aria-label="${esc(s.name)}" title="${esc(s.name)}">${esc(s.label)}</a></li>`).join("");

$("#links").innerHTML = links.map((l, i) => `
  <a class="link${l.featured ? " featured" : ""}" href="${esc(l.url)}" target="_blank" rel="noopener" style="animation-delay:${i * 70}ms">
    <span class="ico" aria-hidden="true">${l.icon}</span>
    <span class="txt">${esc(l.title)}${l.note ? `<small>${esc(l.note)}</small>` : ""}</span>
    <span class="go" aria-hidden="true">&rarr;</span>
  </a>`).join("");

// Themes (choice is remembered when storage is available)
function setTheme(t) {
  document.documentElement.dataset.theme = t;
  document.querySelectorAll(".theme-dot").forEach(d => d.setAttribute("aria-pressed", d.dataset.theme === t));
  try { localStorage.setItem("lib-theme", t); } catch (e) {}
}
$("#themes").innerHTML = themes.map(t => `<button class="theme-dot" data-theme="${t}" aria-label="${t} theme" aria-pressed="false"></button>`).join("");
$("#themes").addEventListener("click", (e) => { const d = e.target.closest(".theme-dot"); if (d) setTheme(d.dataset.theme); });
let start = profile.defaultTheme;
try { const s = localStorage.getItem("lib-theme"); if (themes.includes(s)) start = s; } catch (e) {}
setTheme(start);

// Share button: native share sheet when available, otherwise copy the link
const toast = $("#toast");
function say(msg) { toast.textContent = msg; toast.classList.add("show"); setTimeout(() => toast.classList.remove("show"), 2000); }
$("#shareBtn").addEventListener("click", async () => {
  const data = { title: document.title, url: location.href };
  try {
    if (navigator.share) { await navigator.share(data); return; }
    await navigator.clipboard.writeText(location.href);
    say("Link copied!");
  } catch (e) { say("Copy the link from the address bar"); }
});
