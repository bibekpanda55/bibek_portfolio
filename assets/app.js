(() => {
  const D = window.PORTFOLIO;
  const $ = (s, r = document) => r.querySelector(s);
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- timers scoped to the current case ---------- */
  let timers = [];
  let cleanups = [];
  const later = (fn, ms) => { const t = setTimeout(fn, ms); timers.push(t); return t; };
  const every = (fn, ms) => { const t = setInterval(fn, ms); timers.push(t); return t; };
  const resetTimers = () => {
    timers.forEach(t => { clearTimeout(t); clearInterval(t); });
    cleanups.forEach(fn => fn());
    timers = []; cleanups = [];
  };

  const esc = s => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const sb = (dark) => `<div class="sb" style="color:${dark ? "#fff" : "var(--ink)"}"><span>9:41</span><i></i></div>`;
  const sk = (cls) => `<span class="sk ${cls}"></span>`;
  const services = n => Array.from({ length: n }, () => `<div class="svc"><span class="ic"></span><span class="lb"></span></div>`).join("");
  const rows = (n) => Array.from({ length: n }, (_, i) => `
    <div class="row" style="padding:10px 0;border-bottom:1px solid #EEF1F5">
      <span class="sk circle" style="width:30px;height:30px;flex:none"></span>
      <div class="col" style="flex:1">${sk(i % 2 ? "h8 w60" : "h8 w70")}${sk("h6 w40")}</div>
      ${sk("h8 w30")}
    </div>`).join("");

  /* ================= screen builders ================= */
  const builders = {

    /* ---------- 1. image carousel header ---------- */
    carousel(b, a) {
      b.innerHTML = `
        <div style="height:210px;background:linear-gradient(160deg,#D5DBE4,#E7EAF0);position:relative">
          ${sb()}
          <div class="pad" style="margin-top:4px"><div class="searchbar">Search billers</div></div>
          <div style="position:absolute;left:18px;bottom:22px;width:120px" class="col">${sk("h10 w100 dk")}${sk("h8 w70 dk")}</div>
          <span class="sk dk" style="position:absolute;right:18px;bottom:16px;width:76px;height:76px;border-radius:18px"></span>
        </div>
        <div style="background:#fff;padding:16px 14px">
          <div class="grid4">${services(8)}</div>
        </div>
        <div class="pad col" style="margin-top:14px">${sk("h10 w40")}<span class="sk" style="height:70px;border-radius:14px"></span></div>`;

      const slides = [
        { bg: "linear-gradient(160deg,#FFE3A8,#FFF3D6)", fg: "#E9A400", shape: "50%" },
        { bg: "linear-gradient(160deg,#C9D6FF,#E6ECFF)", fg: "#4B5BD6", shape: "22px" },
        { bg: "linear-gradient(160deg,#BFE8DE,#E2F5F0)", fg: "#2E9C8A", shape: "50% 50% 14px 50%" }
      ];
      a.innerHTML = `
        <div class="car" style="height:236px;position:relative;overflow:hidden">
          ${slides.map((s, i) => `<div class="car-bg" style="position:absolute;inset:0;background:${s.bg};opacity:${i ? 0 : 1};transition:opacity .9s ease"></div>`).join("")}
          <div style="position:relative;z-index:2">${sb()}<div class="pad" style="margin-top:4px"><div class="searchbar">Search billers</div></div></div>
          ${slides.map((s, i) => `
            <div class="car-fg" style="position:absolute;inset:auto 0 62px 0;padding:0 18px;display:flex;justify-content:space-between;align-items:flex-end;z-index:2;
                 transition:transform .9s cubic-bezier(.65,0,.35,1),opacity .9s ease;opacity:${i ? 0 : 1};transform:translateX(${i ? 60 : 0}px) scale(${i ? .96 : 1})">
              <div class="col" style="width:118px;gap:7px">
                <span class="sk" style="height:12px;background:rgba(26,34,56,.22)"></span>
                <span class="sk w70" style="height:8px;background:rgba(26,34,56,.14)"></span>
                <span style="margin-top:4px;width:56px;height:18px;border-radius:9px;background:${s.fg}"></span>
              </div>
              <span style="width:84px;height:84px;border-radius:${s.shape};background:${s.fg};opacity:.85"></span>
            </div>`).join("")}
          <div class="car-dots" style="position:absolute;bottom:58px;left:0;right:0;display:flex;justify-content:center;gap:5px;z-index:3">
            ${slides.map((_, i) => `<i style="width:${i ? 6 : 14}px;height:6px;border-radius:3px;background:rgba(26,34,56,${i ? .25 : .7});transition:all .4s"></i>`).join("")}
          </div>
        </div>
        <div class="hl" style="position:relative;z-index:4;margin:-50px 8px 0;background:#fff;border-radius:22px;padding:16px 10px;box-shadow:0 -6px 18px -12px rgba(26,34,56,.4)">
          <div class="grid4">${services(8)}</div>
        </div>
        <div class="pad col" style="margin-top:14px">${sk("h10 w40")}<span class="sk" style="height:70px;border-radius:14px"></span></div>`;

      if (reduced) return;
      let i = 0;
      const bgs = a.querySelectorAll(".car-bg"), fgs = a.querySelectorAll(".car-fg"), dots = a.querySelectorAll(".car-dots i");
      every(() => {
        const prev = i; i = (i + 1) % slides.length;
        bgs[prev].style.opacity = 0; bgs[i].style.opacity = 1;
        fgs[prev].style.transform = "translateX(-60px) scale(.96)"; fgs[prev].style.opacity = 0;
        fgs[i].style.transition = "none"; fgs[i].style.transform = "translateX(60px) scale(.96)";
        void fgs[i].offsetWidth;
        fgs[i].style.transition = ""; fgs[i].style.transform = "translateX(0) scale(1)"; fgs[i].style.opacity = 1;
        dots.forEach((d, k) => { d.style.width = k === i ? "14px" : "6px"; d.style.background = `rgba(26,34,56,${k === i ? .7 : .25})`; });
      }, 2800);
    },

    /* ---------- 2. sticky search header ---------- */
    sticky(b, a) {
      const banner = (inner) => `
        <div style="height:200px;background:linear-gradient(160deg,#C9D6FF,#EEF1FF);position:relative">
          ${inner}
          <div style="position:absolute;left:16px;bottom:24px;width:130px" class="col">
            <span class="sk" style="height:12px;background:rgba(26,34,56,.18)"></span>
            <span class="sk w60" style="height:8px;background:rgba(26,34,56,.12)"></span>
          </div>
        </div>`;
      const header = `<div class="row pad" style="padding-top:2px;padding-bottom:10px"><div class="searchbar" style="flex:1">Search billers</div><span class="circle" style="width:34px;height:34px;background:#fff;box-shadow:0 1px 2px rgba(26,34,56,.1);flex:none"></span></div>`;
      const body = `
        <div style="background:#fff;padding:16px 14px"><div class="grid4">${services(8)}</div></div>
        <div class="pad" style="padding-top:14px;padding-bottom:30px">${sk("h10 w40")}${rows(9)}</div>`;

      b.innerHTML = `
        <div style="position:absolute;inset:0 0 auto 0;z-index:4">${sb()}</div>
        <div class="scroll-y" tabindex="0" aria-label="Scrollable before screen">
          ${banner(`<div style="height:44px"></div>${header}`)}${body}
        </div>`;
      a.innerHTML = `
        <div class="scroll-y" tabindex="0" aria-label="Scrollable after screen">${banner("")}${body}</div>
        <div class="stick hl" style="position:absolute;inset:0 0 auto 0;z-index:4;transition:background .2s, box-shadow .2s;outline-offset:-3px;border-radius:0 0 10px 10px">
          ${sb()}${header}
        </div>`;
      const sc = a.querySelector(".scroll-y"), st = a.querySelector(".stick");
      const threshold = 200 - 88;
      const on = () => {
        const s = sc.scrollTop > threshold;
        st.style.background = s ? "#fff" : "transparent";
        st.style.boxShadow = s ? "0 2px 10px rgba(0,0,0,.1)" : "none";
      };
      sc.addEventListener("scroll", on, { passive: true });
      cleanups.push(() => sc.removeEventListener("scroll", on));
    },

    /* ---------- 3. recharge plan search ---------- */
    plans(b, a) {
      const PLANS = [
        { p: 199, v: "28 days", d: "1.5GB/day", c: "Popular" },
        { p: 239, v: "28 days", d: "2GB/day", c: "Popular" },
        { p: 299, v: "28 days", d: "2GB/day", c: "Unlimited" },
        { p: 349, v: "30 days", d: "2.5GB/day", c: "Unlimited" },
        { p: 479, v: "56 days", d: "1.5GB/day", c: "Popular" },
        { p: 666, v: "84 days", d: "1.5GB/day", c: "Unlimited" },
        { p: 19, v: "1 day", d: "1GB", c: "Data" },
        { p: 58, v: "Active plan", d: "3GB", c: "Data" }
      ];
      b.innerHTML = `
        ${sb()}
        <div class="pad" style="padding-top:6px">
          <div class="ui-title">Recharge plans</div>
          <div class="row" style="gap:16px;margin:12px 0 4px;color:var(--muted);font-size:11px"><b style="color:var(--ink)">Popular</b><span>Unlimited</span><span>Data</span></div>
          ${PLANS.slice(0, 7).map(x => `
            <div style="padding:11px 0;border-bottom:1px solid #EEF1F5" class="row">
              <b style="font-size:13px;width:48px">₹${x.p}</b>
              <span class="ui-sub" style="flex:1">${x.v}, ${x.d}</span>
            </div>`).join("")}
        </div>`;

      a.innerHTML = `
        ${sb()}
        <div class="pad row" style="padding-top:6px;gap:10px">
          <span class="sk circle" style="width:30px;height:30px"></span>
          <div class="col" style="flex:1">${sk("h8 w60")}${sk("h6 w40")}</div>
        </div>
        <div class="hl" style="position:absolute;left:0;right:0;bottom:0;top:96px;background:#fff;border-radius:22px 22px 0 0;box-shadow:0 -8px 20px -12px rgba(26,34,56,.35);display:flex;flex-direction:column;outline-offset:-3px">
          <span style="width:36px;height:4px;border-radius:2px;background:var(--sk-2);margin:8px auto 10px"></span>
          <div class="pad">
            <label class="searchbar" style="background:#F2F4F7;box-shadow:none">
              <input class="plan-q" type="search" placeholder="Search by price, data or validity" aria-label="Search plans"
                style="border:0;background:transparent;font:inherit;font-size:11px;width:100%;outline:none;color:var(--ink)">
            </label>
            <div class="plan-tabs row" style="gap:6px;margin:10px 0 6px" role="tablist">
              ${["Popular", "Unlimited", "Data"].map((t, i) => `<button role="tab" data-c="${t}" aria-selected="${!i}"
                style="border:0;font:600 10.5px var(--body);padding:6px 11px;border-radius:999px;cursor:pointer;
                background:${i ? "#F2F4F7" : "linear-gradient(90deg,#1A2238,#3A4460)"};color:${i ? "var(--ink-2)" : "#fff"}">${t}</button>`).join("")}
            </div>
          </div>
          <div class="plan-list pad" style="overflow-y:auto;flex:1;padding-bottom:16px;scrollbar-width:none"></div>
        </div>`;

      const q = a.querySelector(".plan-q"), list = a.querySelector(".plan-list"), tabs = a.querySelectorAll(".plan-tabs button");
      let cat = "Popular";
      const card = x => `
        <div style="border:1px solid #E6EAF0;border-radius:14px;padding:11px 12px;margin-top:8px">
          <div class="row" style="justify-content:space-between"><b style="font-size:16px">₹${x.p}</b>
            <span style="font-size:10px;font-weight:600;padding:3px 8px;border-radius:999px;background:var(--change-soft);color:#7A5600">${x.c}</span></div>
          <div class="row" style="gap:22px;margin-top:8px">
            <div><div class="ui-sub">Validity</div><b style="font-size:11.5px">${x.v}</b></div>
            <div><div class="ui-sub">Data</div><b style="font-size:11.5px">${x.d}</b></div>
          </div>
        </div>`;
      const render = () => {
        const term = q.value.trim().toLowerCase().replace(/₹/g, "");
        let hits = term
          ? PLANS.filter(x => `${x.p} ${x.v} ${x.d}`.toLowerCase().includes(term))
          : PLANS.filter(x => x.c === cat);
        if (!hits.length) {
          const n = parseInt(term, 10);
          const near = isNaN(n) ? PLANS.slice(0, 2) : [...PLANS].sort((m, k) => Math.abs(m.p - n) - Math.abs(k.p - n)).slice(0, 2);
          list.innerHTML = `
            <div style="text-align:center;padding:18px 0 4px"><b style="font-size:12px">No plan found</b>
            <div class="ui-sub" style="margin-top:4px">Showing similar plans you can recharge with</div></div>
            ${near.map(card).join("")}`;
          return;
        }
        list.innerHTML = hits.map(card).join("");
      };
      tabs.forEach(t => t.addEventListener("click", () => {
        cat = t.dataset.c; q.value = "";
        tabs.forEach(o => {
          const on = o === t; o.setAttribute("aria-selected", on);
          o.style.background = on ? "linear-gradient(90deg,#1A2238,#3A4460)" : "#F2F4F7";
          o.style.color = on ? "#fff" : "var(--ink-2)";
        });
        render();
      }));
      q.addEventListener("input", render);
      render();
    },

    /* ---------- 4. payment confirmation ---------- */
    confirmation(b, a) {
      const tick = `<span class="circle" style="width:52px;height:52px;background:#2E9C8A;display:grid;place-items:center;margin:0 auto">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>`;
      const head = `<div style="text-align:center;padding:10px 0 12px">${tick}
        <div style="font:700 22px var(--display);margin-top:10px">₹299</div>
        <div class="ui-sub">Paid to Electricity Board</div></div>`;
      b.innerHTML = `
        ${sb()}
        <div class="pad" style="padding-top:20px">${head}
          <div style="background:#fff;border-radius:14px;padding:4px 12px;margin-top:6px">
            ${["Transaction ID", "Paid from", "Date", "Consumer no."].map(l => `
              <div class="row" style="justify-content:space-between;padding:11px 0;border-bottom:1px solid #EEF1F5">
                <span class="ui-sub">${l}</span>${sk("h8 w40")}</div>`).join("")}
          </div>
        </div>
        <div class="pad" style="position:absolute;left:0;right:0;bottom:22px"><div class="ui-btn">Done</div></div>`;

      const offers = ["Pay bills faster with Quick Pay", "Earn rewards on every transaction", "Special offers just for you"];
      a.innerHTML = `
        ${sb()}
        <div class="pad" style="padding-top:6px">${head}
          <div class="row" style="justify-content:space-between;background:#fff;border-radius:12px;padding:10px 12px">
            <span style="font-weight:600">Transaction details</span><span class="ui-sub">View</span></div>
          <div class="hl" style="margin-top:14px;padding:2px 0 0">
            <div style="font-weight:700;font-size:12px;margin:0 2px 8px">Top services</div>
            <div style="background:#fff;border-radius:14px;padding:12px 0 10px">
              <div style="display:flex;gap:4px;overflow-x:auto;padding:8px 8px 0;scrollbar-width:none">
                ${[0, 1, 2, 3, 4].map(i => `
                  <div style="width:56px;flex:none;display:flex;flex-direction:column;align-items:center;gap:5px;position:relative">
                    ${i === 0 ? `<span style="position:absolute;top:-6px;z-index:1;font-size:8px;font-weight:700;background:var(--change);color:#3D2B00;padding:1px 6px;border-radius:6px">Popular</span>` : ""}
                    <span class="circle" style="width:40px;height:40px;background:#F2F4F7;border:1px solid #E6EAF0"></span>
                    <span class="sk h6" style="width:36px"></span>
                  </div>`).join("")}
              </div>
              <div class="row" style="margin:12px 10px 0;background:#FFF8E6;border-radius:10px;padding:8px 10px;gap:8px">
                <span class="circle" style="width:20px;height:20px;background:var(--change);color:#fff;font-weight:700;font-size:10px;display:grid;place-items:center;flex:none">%</span>
                <div style="overflow:hidden;flex:1;height:14px;position:relative">
                  <div class="offer-track" style="transition:transform .5s ease">
                    ${offers.map(o => `<div style="height:14px;line-height:14px;font-size:9.5px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${o}</div>`).join("")}
                  </div>
                </div>
                <div class="offer-dots row" style="gap:3px">${offers.map((_, i) => `<i style="width:5px;height:5px;border-radius:50%;background:${i ? "#E7D7AA" : "#B88400"}"></i>`).join("")}</div>
              </div>
            </div>
          </div>
          <span class="sk" style="height:56px;border-radius:14px;margin-top:14px"></span>
        </div>
        <div class="pad" style="position:absolute;left:0;right:0;bottom:22px"><div class="ui-btn">Done</div></div>`;
      if (reduced) return;
      const track = a.querySelector(".offer-track"), dots = a.querySelectorAll(".offer-dots i");
      let k = 0;
      every(() => {
        k = (k + 1) % offers.length;
        track.style.transform = `translateY(${-14 * k}px)`;
        dots.forEach((d, j) => d.style.background = j === k ? "#B88400" : "#E7D7AA");
      }, 2200);
    },

    /* ---------- 5. swipe to reply ---------- */
    reply(b, a) {
      const chatHead = `${sb()}<div class="row pad" style="padding-bottom:10px;border-bottom:1px solid #EEF1F5;background:#fff">
          <span style="font-size:16px;color:var(--muted)">‹</span>
          <span class="circle" style="width:28px;height:28px;background:#D9DEF7"></span>
          <div class="col" style="gap:2px"><b style="font-size:12px">Rahul</b><span class="ui-sub" style="font-size:9.5px">online</span></div></div>`;
      const recv = (t, extra = "") => `<div class="msg r" style="align-self:flex-start;max-width:78%;background:#F2F2F2;padding:8px 10px;border-radius:14px 14px 14px 4px;position:relative;${extra}">${t}</div>`;
      const sent = (t, quote) => `<div class="msg s" style="align-self:flex-end;max-width:78%;background:#6549DE;color:#fff;padding:8px 10px;border-radius:14px 14px 4px 14px">
          ${quote ? `<div style="background:rgba(255,255,255,.14);border-left:3px solid #ECE7FF;border-radius:8px;padding:5px 8px;margin-bottom:6px">
            <div style="font-weight:600;color:#ECE7FF;font-size:9.5px">Rahul</div><div style="color:#D0C5FF;font-size:10px">${quote}</div></div>` : ""}${t}</div>`;
      const input = (val = "") => `<div class="row" style="padding:8px 10px 18px;background:#fff;border-top:1px solid #EEF1F5">
          <div class="inp" style="flex:1;background:#F2F4F7;border-radius:18px;padding:9px 12px;color:${val ? "var(--ink)" : "var(--muted)"}">${val || "Message"}</div>
          <span class="circle" style="width:30px;height:30px;background:#6549DE;flex:none"></span></div>`;
      const base = `
        <div class="thread" style="flex:1;display:flex;flex-direction:column;justify-content:flex-end;gap:7px;padding:12px;overflow:hidden">
          ${recv("Did the electricity bill go through?")}
          ${sent("Yes, paid it this morning")}
          ${recv("Nice. And the broadband one?")}
          ${sent("Doing it now")}
          ${recv("Can you send me the receipt?")}
        </div>`;
      b.innerHTML = `<div style="display:flex;flex-direction:column;height:100%;background:#FAFBFC">${chatHead}${base}${input()}</div>`;
      a.innerHTML = `<div style="display:flex;flex-direction:column;height:100%;background:#FAFBFC">${chatHead}${base}
          <div class="preview-slot" style="overflow:hidden;height:0;transition:height .25s ease;background:#fff">
            <div class="row" style="margin:8px 10px 0;background:#F4F1FF;border-left:3px solid #6549DE;border-radius:8px;padding:6px 10px;justify-content:space-between">
              <div><div style="font-weight:600;color:#6657A8;font-size:10px">Replying to Rahul</div><div style="color:#6B6B6D;font-size:10px">Can you send me the receipt?</div></div>
              <span style="color:var(--muted)">×</span>
            </div>
          </div>${input()}</div>`;

      const run = () => {
        const thread = a.querySelector(".thread");
        const last = thread.lastElementChild;
        const slot = a.querySelector(".preview-slot");
        const inp = a.querySelector(".inp");
        last.style.transition = "transform .25s ease";
        last.insertAdjacentHTML("afterbegin", `<span class="rico" style="position:absolute;left:-26px;top:50%;margin-top:-9px;width:18px;height:18px;border-radius:50%;background:#ECE7FF;color:#6549DE;font-size:11px;display:grid;place-items:center;opacity:0;transition:opacity .2s">↩</span>`);
        const ico = last.querySelector(".rico");
        later(() => { last.style.transform = "translateX(46px)"; ico.style.opacity = 1; }, 600);
        later(() => { last.style.transform = ""; ico.style.opacity = 0; slot.style.height = "52px"; last.classList.add("hl"); }, 1150);
        later(() => { inp.textContent = "Sending it now"; inp.style.color = "var(--ink)"; }, 2100);
        later(() => {
          slot.style.height = "0"; last.classList.remove("hl");
          inp.textContent = "Message"; inp.style.color = "var(--muted)";
          thread.firstElementChild.remove();
          thread.insertAdjacentHTML("beforeend", sent("Sending it now", "Can you send me the receipt?"));
          thread.lastElementChild.classList.add("hl");
        }, 3100);
        later(() => { builders.reply(b, a); }, 6200);
      };
      if (reduced) {
        a.querySelector(".preview-slot").style.height = "52px";
        return;
      }
      run();
    },

    /* ---------- 6. message entry animation ---------- */
    entry(b, a) {
      const script = [
        ["r", "Are you coming tonight?"], ["s", "Yes! Leaving in 10"], ["r", "Great, I'll book the cab"],
        ["s", "Split it on Innopay?"], ["r", "Sure, send a request"], ["s", "Sent ₹180"], ["r", "Got it, thanks"],
        ["s", "See you soon"]
      ];
      const bubble = ([w, t]) => w === "r"
        ? `<div style="align-self:flex-start;max-width:78%;background:#F2F2F2;padding:8px 10px;border-radius:14px 14px 14px 4px">${t}</div>`
        : `<div style="align-self:flex-end;max-width:78%;background:#6549DE;color:#fff;padding:8px 10px;border-radius:14px 14px 4px 14px">${t}</div>`;
      const shell = `<div style="display:flex;flex-direction:column;height:100%;background:#FAFBFC">${sb()}
        <div class="row pad" style="padding-bottom:10px;border-bottom:1px solid #EEF1F5;background:#fff">
          <span class="circle" style="width:28px;height:28px;background:#D9DEF7"></span><b style="font-size:12px">Priya</b></div>
        <div class="thread" style="flex:1;display:flex;flex-direction:column;justify-content:flex-end;padding:12px;overflow:hidden"></div>
        <div style="padding:8px 10px 18px;background:#fff;border-top:1px solid #EEF1F5"><div style="background:#F2F4F7;border-radius:18px;padding:9px 12px;color:var(--muted)">Message</div></div></div>`;
      b.innerHTML = shell; a.innerHTML = shell;
      const tb = b.querySelector(".thread"), ta = a.querySelector(".thread");
      const add = (i, animate) => {
        const m = script[i % script.length];
        const wrap = document.createElement("div");
        wrap.style.cssText = "display:flex;flex-direction:column;padding-top:7px;overflow:hidden";
        wrap.innerHTML = bubble(m);
        const host = animate ? ta : tb;
        host.appendChild(wrap);
        while (host.children.length > 9) host.firstElementChild.remove();
        if (animate && !reduced) {
          const h = wrap.scrollHeight;
          wrap.style.height = "0px";
          wrap.style.transition = "height .3s cubic-bezier(0,0,.2,1)";
          void wrap.offsetHeight;
          wrap.style.height = h + "px";
          wrap.firstElementChild.classList.add("hl");
          later(() => { wrap.style.height = ""; wrap.firstElementChild.classList.remove("hl"); }, 700);
        }
      };
      for (let i = 0; i < 3; i++) add(i, false);
      [...tb.children].forEach(c => ta.appendChild(c.cloneNode(true)));
      let n = 3;
      later(() => { add(n, false); add(n, true); n++; }, 700);
      every(() => { add(n, false); add(n, true); n++; }, 2200);
    },

    /* ---------- 7. offline ---------- */
    offline(b, a) {
      const screen = `${sb()}
        <div class="net" style="position:absolute;top:46px;left:50%;transform:translateX(-50%);font-size:9.5px;font-weight:600;padding:3px 9px;border-radius:999px;background:#FDE2E4;color:#A23A48;z-index:3;transition:all .3s">Offline</div>
        <div class="pad" style="padding-top:26px">
          <div class="ui-title">Electricity bill</div>
          <div class="ui-sub" style="margin-top:2px">Due in 3 days</div>
          <div style="background:#fff;border-radius:14px;padding:14px;margin-top:12px" class="col">
            <span class="ui-sub">Amount</span><b style="font:700 24px var(--display)">₹1,240</b>
            <div style="margin-top:6px" class="col">${sk("h8 w70")}${sk("h8 w50")}</div>
          </div>
          <div class="col" style="margin-top:16px">${sk("h10 w40")}${rows(3)}</div>
        </div>
        <div class="pad" style="position:absolute;left:0;right:0;bottom:22px"><button class="ui-btn pay" style="width:100%;border:0;font-family:inherit;cursor:pointer">Pay ₹1,240</button></div>`;
      b.innerHTML = screen + `<div class="snacks" style="position:absolute;left:10px;right:10px;bottom:74px;display:flex;flex-direction:column;gap:6px;z-index:6"></div>`;
      a.innerHTML = screen + `
        <div class="sheet hl" style="position:absolute;left:10px;right:10px;bottom:16px;z-index:6;background:#fff;border-radius:50px;padding:12px 14px;display:flex;align-items:center;gap:10px;
             box-shadow:0 10px 30px -8px rgba(26,34,56,.35);transform:translateY(140%);transition:transform .35s cubic-bezier(.2,.8,.2,1)">
          <span class="circle" style="width:30px;height:30px;background:#FDE2E4;display:grid;place-items:center;flex:none">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A23A48" stroke-width="2.4" stroke-linecap="round"><path d="M2 8.5a15 15 0 0 1 20 0M5 12a10 10 0 0 1 14 0M8.5 15.5a5 5 0 0 1 7 0"/><path d="M3 3l18 18"/></svg></span>
          <div style="flex:1;min-width:0"><b style="font-size:11.5px">No Internet Connection</b>
            <div class="ui-sub" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Please check your internet connectivity</div></div>
          <button class="ok" style="border:0;background:transparent;font:700 11.5px var(--body);color:#4B5BD6;cursor:pointer">OK</button>
        </div>`;

      let online = false;
      const setOnline = (on) => {
        online = on;
        [b, a].forEach(s => {
          const n = s.querySelector(".net");
          n.textContent = on ? "Back online" : "Offline";
          n.style.background = on ? "#D7F2EA" : "#FDE2E4";
          n.style.color = on ? "#1E6E60" : "#A23A48";
        });
        if (on) a.querySelector(".sheet").style.transform = "translateY(140%)";
      };
      const snack = () => {
        if (online) return;
        const box = b.querySelector(".snacks");
        const el = document.createElement("div");
        el.style.cssText = "background:#2B3247;color:#fff;border-radius:8px;padding:10px 12px;font-size:10.5px;opacity:0;transform:translateY(8px);transition:all .25s";
        el.textContent = "Please check your internet connectivity";
        box.appendChild(el);
        requestAnimationFrame(() => { el.style.opacity = 1; el.style.transform = "none"; });
        later(() => { el.style.opacity = 0; later(() => el.remove(), 260); }, 2600);
      };
      const sheet = () => { if (!online) a.querySelector(".sheet").style.transform = "none"; };
      b.querySelector(".pay").addEventListener("click", snack);
      a.querySelector(".pay").addEventListener("click", sheet);
      a.querySelector(".ok").addEventListener("click", () => { a.querySelector(".sheet").style.transform = "translateY(140%)"; });

      later(() => { snack(); sheet(); }, 700);
      later(() => { snack(); }, 1300);
      later(() => { snack(); }, 1800);
      later(() => setOnline(true), 5200);
    }
  };

  /* ================= stage ================= */
  const list = $("#case-list");
  const screenB = $("#screen-before"), screenA = $("#screen-after");
  const phones = $("#phones"), codeView = $("#code-view");
  let current = 0, view = "screens";

  const renderDiff = (file, diff) => `
    <div class="code-file">${esc(file)}</div>
    <div class="code-lines">${diff.split("\n").map(l => {
      const c = l.startsWith("@@") ? "hunk" : l.startsWith("+") ? "add" : l.startsWith("-") ? "del" : "ctx";
      return `<div class="${c}">${esc(l) || " "}</div>`;
    }).join("")}</div>`;

  D.cases.forEach((c, i) => {
    const li = document.createElement("li");
    li.innerHTML = `<button type="button" data-i="${i}">
      <span class="dot" style="background:${D.areas[c.area]}"></span>
      <span class="c-title">${esc(c.title)}</span>
      <span class="c-meta">${c.area}, ${c.date.replace(/^\d+ /, "")}</span></button>`;
    list.appendChild(li);
  });

  function setView(v) {
    view = v;
    $("#view-screens").setAttribute("aria-selected", v === "screens");
    $("#view-code").setAttribute("aria-selected", v === "code");
    phones.hidden = v !== "screens";
    phones.style.display = v === "screens" ? "" : "none";
    codeView.hidden = v !== "code";
    $("#replay").hidden = v !== "screens" || !D.cases[current].replay;
  }

  function show(i, focusList) {
    resetTimers();
    current = i;
    const c = D.cases[i];
    list.querySelectorAll("button").forEach((btn, k) => btn.setAttribute("aria-current", k === i));
    const stage = $("#bench-stage");
    stage.style.setProperty("--area-color", D.areas[c.area]);
    $("#stage-area").textContent = c.area;
    $("#stage-title").textContent = c.title;
    $("#stage-commit").innerHTML = `<code>${c.hash}</code> &nbsp;${c.date}, ${c.stat}`;
    $("#hash-before").textContent = `${c.hash.slice(0, 7)}^`;
    $("#hash-after").textContent = c.hash.slice(0, 7);
    $("#note-before").textContent = c.before;
    $("#note-after").textContent = c.after;
    $("#stage-hint").textContent = c.hint || "";
    codeView.innerHTML = renderDiff(c.code.file, c.code.diff);
    screenB.innerHTML = ""; screenA.innerHTML = "";
    builders[c.id](screenB, screenA);
    setView(view);
    if (focusList && window.innerWidth <= 1040) {
      list.children[i].scrollIntoView({ behavior: reduced ? "auto" : "smooth", inline: "nearest", block: "nearest" });
    }
  }

  list.addEventListener("click", e => {
    const btn = e.target.closest("button");
    if (btn) show(+btn.dataset.i, true);
  });
  list.addEventListener("keydown", e => {
    if (!["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(e.key)) return;
    e.preventDefault();
    const dir = (e.key === "ArrowDown" || e.key === "ArrowRight") ? 1 : -1;
    const next = (current + dir + D.cases.length) % D.cases.length;
    show(next, true);
    list.querySelectorAll("button")[next].focus();
  });
  document.querySelectorAll(".seg button").forEach(btn => btn.addEventListener("click", () => setView(btn.dataset.view)));
  $("#replay").addEventListener("click", () => show(current));

  show(0);

  /* ================= fixes ================= */
  const fixList = $("#fix-list");
  D.fixes.forEach(f => {
    const li = document.createElement("li");
    li.className = "fix";
    li.style.setProperty("--area-color", D.areas[f.area]);
    li.innerHTML = `<details>
      <summary>
        <span class="fix-area">${f.area}</span>
        <span><span class="fix-title">${esc(f.title)}</span><br><span class="fix-toggle">Show the change</span></span>
        <span class="fix-why">${esc(f.why)}</span>
        <span class="fix-date">${f.date}<br><code>${f.hash.slice(0, 7)}</code></span>
      </summary>
      <div class="code-view">${renderDiff(f.file, f.diff)}</div>
    </details>`;
    fixList.appendChild(li);
  });

  /* ================= timeline ================= */
  const order = ["Messenger", "Payments", "Home", "Platform", "App-wide"];
  const chart = $("#chart");
  const totals = D.months.map(m => order.reduce((s, k) => s + (m[k] || 0), 0));
  const max = Math.max(...totals);
  const MN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  D.months.forEach((m, i) => {
    const [y, mo] = m.m.split("-");
    const col = document.createElement("div");
    col.className = "month";
    const pct = totals[i] / max;
    col.innerHTML = `
      ${D.flags[m.m] ? `<span class="note-flag">${D.flags[m.m]}</span>` : ""}
      <div class="mcount">${totals[i]}</div>
      <div class="stack" style="height:calc((100% - 90px) * ${pct})" title="${MN[+mo - 1]} ${y}: ${totals[i]} commits">
        ${order.filter(k => m[k]).map(k => `<span style="flex:${m[k]};background:${D.areas[k]}"></span>`).join("")}
      </div>
      <div class="mlabel">${MN[+mo - 1]}${(i === 0 || mo === "01") ? `<br>${y}` : ""}</div>`;
    chart.appendChild(col);
  });
  chart.setAttribute("aria-label", `Commits per month from June 2025 to November 2026, peaking at ${max} in August 2026.`);
  $("#legend").innerHTML = order.map(k => {
    const n = D.months.reduce((s, m) => s + (m[k] || 0), 0);
    return `<li><i style="background:${D.areas[k]}"></i>${k} <span style="color:var(--muted)">${n}</span></li>`;
  }).join("");

  /* pause animations when the bench is off-screen */
  if ("IntersectionObserver" in window) {
    let visible = true;
    new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !visible) { visible = true; show(current); }
      else if (!e.isIntersecting && visible) { visible = false; resetTimers(); }
    }).observe($("#bench-stage"));
  }
})();
