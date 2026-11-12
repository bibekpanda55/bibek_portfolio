(() => {
  const D = window.PORTFOLIO;
  const $ = (s, r = document) => r.querySelector(s);
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------- small in-phone kit ---------- */
  const sb = (dark) => `<div class="sb" style="color:${dark ? "#fff" : "var(--ink)"}"><span>9:41</span><i></i></div>`;
  const sk = (cls) => `<span class="sk ${cls}"></span>`;
  const services = n => Array.from({ length: n }, () => `<div class="svc"><span class="ic"></span><span class="lb"></span></div>`).join("");
  const rows = (n) => Array.from({ length: n }, (_, i) => `
    <div class="row" style="padding:10px 0;border-bottom:1px solid #EEF1F5">
      <span class="sk circle" style="width:30px;height:30px;flex:none"></span>
      <div class="col" style="flex:1">${sk(i % 2 ? "h8 w60" : "h8 w70")}${sk("h6 w40")}</div>
      ${sk("h8 w30")}
    </div>`).join("");
  const tickIcon = (bg = "#2E9C8A", size = 52) => `<span class="circle" style="width:${size}px;height:${size}px;background:${bg};display:grid;place-items:center;margin:0 auto">
      <svg width="${size * .46}" height="${size * .46}" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>`;
  const chatHead = (name, sub = "online") => `${sb()}<div class="row pad" style="padding-bottom:10px;border-bottom:1px solid #EEF1F5;background:#fff">
      <span style="font-size:16px;color:var(--muted)">‹</span>
      <span class="circle" style="width:28px;height:28px;background:#D9DEF7"></span>
      <div class="col" style="gap:2px"><b style="font-size:12px">${name}</b><span class="ui-sub" style="font-size:9.5px">${sub}</span></div></div>`;
  const recv = (t, extra = "") => `<div style="align-self:flex-start;max-width:78%;background:#F2F2F2;padding:8px 10px;border-radius:14px 14px 14px 4px;position:relative;${extra}">${t}</div>`;
  const sent = (t, quote) => `<div style="align-self:flex-end;max-width:78%;background:#6549DE;color:#fff;padding:8px 10px;border-radius:14px 14px 4px 14px">
      ${quote ? `<div style="background:rgba(255,255,255,.14);border-left:3px solid #ECE7FF;border-radius:8px;padding:5px 8px;margin-bottom:6px">
        <div style="font-weight:600;color:#ECE7FF;font-size:9.5px">Rahul</div><div style="color:#D0C5FF;font-size:10px">${quote}</div></div>` : ""}${t}</div>`;
  const inputBar = (val = "", color = "#6549DE") => `<div class="row" style="padding:8px 10px 18px;background:#fff;border-top:1px solid #EEF1F5">
      <div class="inp" style="flex:1;background:#F2F4F7;border-radius:18px;padding:9px 12px;color:${val ? "var(--ink)" : "var(--muted)"}">${val || "Message"}</div>
      <span class="circle" style="width:30px;height:30px;background:${color};flex:none"></span></div>`;
  const upiSheet = (title = "Pay with") => `
    <div class="upi" style="position:absolute;left:0;right:0;bottom:0;z-index:8;background:#fff;border-radius:20px 20px 0 0;padding:10px 16px 22px;
         box-shadow:0 -10px 30px -10px rgba(26,34,56,.4);transform:translateY(105%);transition:transform .35s cubic-bezier(.2,.8,.2,1)">
      <span style="display:block;width:36px;height:4px;border-radius:2px;background:var(--sk-2);margin:0 auto 12px"></span>
      <b style="font-size:12px">${title}</b>
      <div class="row" style="justify-content:space-between;margin-top:14px">
        ${[["#5F6368", "GPay"], ["#5F259F", "PhonePe"], ["#00BAF2", "Paytm"], ["#E9A400", "BHIM"]].map(([c, n], i) => `
          <div class="col upi-app" data-i="${i}" style="align-items:center;gap:6px;width:52px">
            <span style="width:40px;height:40px;border-radius:12px;background:${c};opacity:.9"></span>
            <span style="font-size:9.5px;color:var(--ink-2)">${n}</span></div>`).join("")}
      </div>
    </div>`;
  const scrim = `<div class="scrim" style="position:absolute;inset:0;background:rgba(10,14,28,.35);opacity:0;transition:opacity .3s;z-index:7;pointer-events:none"></div>`;

  /* ================= demos ================= */
  /* each demo: (el, t) where t.later / t.every are scoped timers */
  const demos = {};
  const befores = {};

  /* ---------- Innopay: Messenger ---------- */
  demos.messenger = (a, t) => {
    const base = `
      <div class="thread" style="flex:1;display:flex;flex-direction:column;justify-content:flex-end;gap:7px;padding:12px;overflow:hidden">
        ${recv("Did the electricity bill go through?")}
        ${sent("Yes, paid it this morning")}
        ${recv("Nice. And the broadband one?")}
        ${sent("Doing it now")}
        ${recv("Can you send me the receipt?")}
      </div>`;
    a.innerHTML = `<div style="display:flex;flex-direction:column;height:100%;background:#FAFBFC">${chatHead("Rahul")}${base}
        <div class="preview-slot" style="overflow:hidden;height:0;transition:height .25s ease;background:#fff">
          <div class="row" style="margin:8px 10px 0;background:#F4F1FF;border-left:3px solid #6549DE;border-radius:8px;padding:6px 10px;justify-content:space-between">
            <div><div style="font-weight:600;color:#6657A8;font-size:10px">Replying to Rahul</div><div style="color:#6B6B6D;font-size:10px">Can you send me the receipt?</div></div>
            <span style="color:var(--muted)">×</span>
          </div>
        </div>${inputBar()}</div>`;
    if (reduced) { a.querySelector(".preview-slot").style.height = "52px"; return; }
    const thread = a.querySelector(".thread"), last = thread.lastElementChild;
    const slot = a.querySelector(".preview-slot"), inp = a.querySelector(".inp");
    last.style.transition = "transform .25s ease";
    last.insertAdjacentHTML("afterbegin", `<span class="rico" style="position:absolute;left:-26px;top:50%;margin-top:-9px;width:18px;height:18px;border-radius:50%;background:#ECE7FF;color:#6549DE;font-size:11px;display:grid;place-items:center;opacity:0;transition:opacity .2s">↩</span>`);
    const ico = last.querySelector(".rico");
    t.later(() => { last.style.transform = "translateX(46px)"; ico.style.opacity = 1; }, 700);
    t.later(() => { last.style.transform = ""; ico.style.opacity = 0; slot.style.height = "52px"; }, 1250);
    t.later(() => { inp.textContent = "Sending it now"; inp.style.color = "var(--ink)"; }, 2200);
    t.later(() => {
      slot.style.height = "0"; inp.textContent = "Message"; inp.style.color = "var(--muted)";
      const w = document.createElement("div");
      w.style.cssText = "display:flex;flex-direction:column;overflow:hidden;height:0;transition:height .3s cubic-bezier(0,0,.2,1)";
      w.innerHTML = sent("Sending it now", "Can you send me the receipt?");
      thread.appendChild(w);
      const h = w.scrollHeight; void w.offsetHeight; w.style.height = h + "px";
      t.later(() => thread.firstElementChild.remove(), 320);
      t.later(() => {
        const r = document.createElement("div");
        r.style.cssText = "display:flex;flex-direction:column;overflow:hidden;height:0;transition:height .3s cubic-bezier(0,0,.2,1)";
        r.innerHTML = recv("Got it, thanks!");
        thread.appendChild(r); const rh = r.scrollHeight; void r.offsetHeight; r.style.height = rh + "px";
        t.later(() => thread.firstElementChild.remove(), 320);
      }, 1500);
    }, 3200);
    t.later(() => demos.messenger(a, t), 7600);
  };

  /* ---------- Innopay: bill in chat ---------- */
  demos.billshare = (a, t) => {
    a.innerHTML = `<div style="display:flex;flex-direction:column;height:100%;background:#FAFBFC;position:relative">${chatHead("Mom")}
      <div style="flex:1;display:flex;flex-direction:column;justify-content:flex-end;gap:7px;padding:12px;overflow:hidden">
        ${recv("Can you pay this month's electricity?")}
        <div class="bill" style="align-self:flex-start;width:80%;background:#fff;border:1px solid #E6EAF0;border-radius:14px;padding:12px">
          <div class="row" style="gap:8px"><span style="width:28px;height:28px;border-radius:8px;background:#FFF3D1;display:grid;place-items:center;font-size:13px">⚡</span>
            <div class="col" style="gap:2px"><b style="font-size:11.5px">Electricity bill</b><span class="ui-sub">Due 14 Nov</span></div></div>
          <div class="row" style="justify-content:space-between;margin-top:10px"><span class="ui-sub">Amount</span><b style="font:700 16px var(--display)">₹1,240</b></div>
          <button class="pay hl" style="margin-top:10px;width:100%;border:0;border-radius:10px;padding:9px;background:#6549DE;color:#fff;font:600 11.5px var(--body);cursor:pointer">Pay now</button>
        </div>
      </div>
      ${inputBar()}
      ${scrim}
      <div class="paysheet" style="position:absolute;left:0;right:0;bottom:0;z-index:8;background:#fff;border-radius:20px 20px 0 0;padding:14px 16px 24px;transform:translateY(105%);transition:transform .35s cubic-bezier(.2,.8,.2,1)">
        <span style="display:block;width:36px;height:4px;border-radius:2px;background:var(--sk-2);margin:0 auto 12px"></span>
        <div class="ps-body"></div>
      </div></div>`;
    const sheet = a.querySelector(".paysheet"), body = a.querySelector(".ps-body"), sc = a.querySelector(".scrim");
    const btn = a.querySelector(".pay");
    let busy = false;
    const run = () => {
      if (busy) return; busy = true;
      btn.classList.remove("hl");
      btn.textContent = "Checking bill…"; btn.style.opacity = .75;
      t.later(() => {
        body.innerHTML = `<b style="font-size:12px">Pay ₹1,240</b><div class="ui-sub" style="margin-top:2px">Electricity bill, shared by Mom</div>
          <div class="row" style="justify-content:space-between;background:#F2F4F7;border-radius:10px;padding:10px;margin-top:12px"><span>From</span><b>UPI · ••42</b></div>
          <div class="ui-btn" style="margin-top:14px;background:#6549DE">Pay</div>`;
        sc.style.opacity = 1; sheet.style.transform = "none";
      }, 900);
      t.later(() => { body.innerHTML = `<div style="padding:14px 0 6px;text-align:center">${tickIcon()}<b style="display:block;margin-top:10px;font-size:13px">Paid ₹1,240</b><div class="ui-sub">Mom will see it in the chat</div></div>`; }, 2400);
      t.later(() => {
        sc.style.opacity = 0; sheet.style.transform = "translateY(105%)";
        btn.textContent = "Paid ✓"; btn.style.opacity = 1; btn.style.background = "#2E9C8A";
      }, 3900);
      t.later(() => demos.billshare(a, t), 7000);
    };
    btn.addEventListener("click", run);
    if (!reduced) t.later(run, 1600);
  };

  /* ---------- Innopay: carousel home ---------- */
  befores.carousel = (b) => {
    b.innerHTML = `
      <div style="height:210px;background:linear-gradient(160deg,#D5DBE4,#E7EAF0);position:relative">
        ${sb()}
        <div class="pad" style="margin-top:4px"><div class="searchbar">Search billers</div></div>
        <div style="position:absolute;left:18px;bottom:22px;width:120px" class="col">${sk("h10 w100 dk")}${sk("h8 w70 dk")}</div>
        <span class="sk dk" style="position:absolute;right:18px;bottom:16px;width:76px;height:76px;border-radius:18px"></span>
      </div>
      <div style="background:#fff;padding:16px 14px"><div class="grid4">${services(8)}</div></div>
      <div class="pad col" style="margin-top:14px">${sk("h10 w40")}<span class="sk" style="height:70px;border-radius:14px"></span></div>`;
  };
  demos.carousel = (a, t) => {
    const slides = [
      { bg: "linear-gradient(160deg,#FFE3A8,#FFF3D6)", fg: "#E9A400", shape: "50%" },
      { bg: "linear-gradient(160deg,#C9D6FF,#E6ECFF)", fg: "#4B5BD6", shape: "22px" },
      { bg: "linear-gradient(160deg,#BFE8DE,#E2F5F0)", fg: "#2E9C8A", shape: "50% 50% 14px 50%" }
    ];
    a.innerHTML = `
      <div class="scroll-y" tabindex="0" aria-label="Scrollable home screen">
      <div class="car" style="height:236px;position:relative;overflow:hidden">
        ${slides.map((s, i) => `<div class="car-bg" style="position:absolute;inset:0;background:${s.bg};opacity:${i ? 0 : 1};transition:opacity .9s ease"></div>`).join("")}
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
      <div style="position:relative;z-index:4;margin:-50px 8px 0;background:#fff;border-radius:22px;padding:16px 10px;box-shadow:0 -6px 18px -12px rgba(26,34,56,.4)">
        <div class="grid4">${services(8)}</div>
      </div>
      <div class="pad" style="padding-top:14px;padding-bottom:30px">${sk("h10 w40")}${rows(8)}</div>
      </div>
      <div class="stick" style="position:absolute;inset:0 0 auto 0;z-index:6;transition:background .2s, box-shadow .2s">
        ${sb()}<div class="row pad" style="padding-top:2px;padding-bottom:10px"><div class="searchbar" style="flex:1">Search billers</div><span class="circle" style="width:34px;height:34px;background:#fff;box-shadow:0 1px 2px rgba(26,34,56,.1);flex:none"></span></div>
      </div>`;
    const sc = a.querySelector(".scroll-y"), st = a.querySelector(".stick");
    const on = () => {
      const s = sc.scrollTop > 140;
      st.style.background = s ? "#fff" : "transparent";
      st.style.boxShadow = s ? "0 2px 10px rgba(0,0,0,.1)" : "none";
    };
    sc.addEventListener("scroll", on, { passive: true });
    if (reduced) return;
    let i = 0;
    const bgs = a.querySelectorAll(".car-bg"), fgs = a.querySelectorAll(".car-fg"), dots = a.querySelectorAll(".car-dots i");
    t.every(() => {
      const prev = i; i = (i + 1) % slides.length;
      bgs[prev].style.opacity = 0; bgs[i].style.opacity = 1;
      fgs[prev].style.transform = "translateX(-60px) scale(.96)"; fgs[prev].style.opacity = 0;
      fgs[i].style.transition = "none"; fgs[i].style.transform = "translateX(60px) scale(.96)";
      void fgs[i].offsetWidth;
      fgs[i].style.transition = ""; fgs[i].style.transform = "translateX(0) scale(1)"; fgs[i].style.opacity = 1;
      dots.forEach((d, k) => { d.style.width = k === i ? "14px" : "6px"; d.style.background = `rgba(26,34,56,${k === i ? .7 : .25})`; });
    }, 2800);
  };

  /* ---------- Innopay: recharge plans ---------- */
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
  befores.plans = (b) => {
    b.innerHTML = `${sb()}
      <div class="pad" style="padding-top:6px">
        <div class="ui-title">Recharge plans</div>
        <div class="row" style="gap:16px;margin:12px 0 4px;color:var(--muted);font-size:11px"><b style="color:var(--ink)">Popular</b><span>Unlimited</span><span>Data</span></div>
        ${PLANS.slice(0, 7).map(x => `
          <div style="padding:11px 0;border-bottom:1px solid #EEF1F5" class="row">
            <b style="font-size:13px;width:48px">₹${x.p}</b><span class="ui-sub" style="flex:1">${x.v}, ${x.d}</span>
          </div>`).join("")}
      </div>`;
  };
  demos.plans = (a) => {
    a.innerHTML = `${sb()}
      <div class="pad row" style="padding-top:6px;gap:10px">
        <span class="sk circle" style="width:30px;height:30px"></span>
        <div class="col" style="flex:1">${sk("h8 w60")}${sk("h6 w40")}</div>
      </div>
      <div style="position:absolute;left:0;right:0;bottom:0;top:96px;background:#fff;border-radius:22px 22px 0 0;box-shadow:0 -8px 20px -12px rgba(26,34,56,.35);display:flex;flex-direction:column">
        <span style="width:36px;height:4px;border-radius:2px;background:var(--sk-2);margin:8px auto 10px"></span>
        <div class="pad">
          <label class="searchbar" style="background:#F2F4F7;box-shadow:none">
            <input class="plan-q" type="search" placeholder="Search by price, data or validity" aria-label="Search plans"
              style="border:0;background:transparent;font:inherit;font-size:11px;width:100%;outline:none;color:var(--ink)">
          </label>
          <div class="plan-tabs row" style="gap:6px;margin:10px 0 6px" role="tablist">
            ${["Popular", "Unlimited", "Data"].map((x, i) => `<button role="tab" data-c="${x}" aria-selected="${!i}"
              style="border:0;font:600 10.5px var(--body);padding:6px 11px;border-radius:999px;cursor:pointer;
              background:${i ? "#F2F4F7" : "linear-gradient(90deg,#1A2238,#3A4460)"};color:${i ? "var(--ink-2)" : "#fff"}">${x}</button>`).join("")}
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
      const hits = term ? PLANS.filter(x => `${x.p} ${x.v} ${x.d}`.toLowerCase().includes(term)) : PLANS.filter(x => x.c === cat);
      if (!hits.length) {
        const n = parseInt(term, 10);
        const near = isNaN(n) ? PLANS.slice(0, 2) : [...PLANS].sort((m, k) => Math.abs(m.p - n) - Math.abs(k.p - n)).slice(0, 2);
        list.innerHTML = `<div style="text-align:center;padding:18px 0 4px"><b style="font-size:12px">No plan found</b>
          <div class="ui-sub" style="margin-top:4px">Showing similar plans you can recharge with</div></div>${near.map(card).join("")}`;
        return;
      }
      list.innerHTML = hits.map(card).join("");
    };
    tabs.forEach(tb => tb.addEventListener("click", () => {
      cat = tb.dataset.c; q.value = "";
      tabs.forEach(o => {
        const on = o === tb; o.setAttribute("aria-selected", on);
        o.style.background = on ? "linear-gradient(90deg,#1A2238,#3A4460)" : "#F2F4F7";
        o.style.color = on ? "#fff" : "var(--ink-2)";
      });
      render();
    }));
    q.addEventListener("input", render);
    render();
  };

  /* ---------- Innopay: payment receipt ---------- */
  const receiptHead = `<div style="text-align:center;padding:10px 0 12px">${tickIcon()}
      <div style="font:700 22px var(--display);margin-top:10px">₹299</div>
      <div class="ui-sub">Paid to Electricity Board</div></div>`;
  befores.receipt = (b) => {
    b.innerHTML = `${sb()}
      <div class="pad" style="padding-top:20px">${receiptHead}
        <div style="background:#fff;border-radius:14px;padding:4px 12px;margin-top:6px">
          ${["Transaction ID", "Paid from", "Date", "Consumer no."].map(l => `
            <div class="row" style="justify-content:space-between;padding:11px 0;border-bottom:1px solid #EEF1F5">
              <span class="ui-sub">${l}</span>${sk("h8 w40")}</div>`).join("")}
        </div>
      </div>
      <div class="pad" style="position:absolute;left:0;right:0;bottom:22px"><div class="ui-btn">Done</div></div>`;
  };
  demos.receipt = (a, t) => {
    const offers = ["Pay bills faster with Quick Pay", "Earn rewards on every transaction", "Special offers just for you"];
    a.innerHTML = `${sb()}
      <div class="pad" style="padding-top:6px">${receiptHead}
        <div class="row" style="justify-content:space-between;background:#fff;border-radius:12px;padding:10px 12px">
          <span style="font-weight:600">Transaction details</span><span class="ui-sub">View</span></div>
        <div style="margin-top:14px">
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
    t.every(() => {
      k = (k + 1) % offers.length;
      track.style.transform = `translateY(${-14 * k}px)`;
      dots.forEach((d, j) => d.style.background = j === k ? "#B88400" : "#E7D7AA");
    }, 2200);
  };

  /* ---------- Innopay: bus tickets ---------- */
  demos.bus = (a, t) => {
    a.innerHTML = `<div style="display:flex;flex-direction:column;height:100%;background:#F7F8FA;position:relative">
      ${sb()}
      <div class="row pad" style="padding-bottom:10px;background:#fff;border-bottom:1px solid #EEF1F5">
        <span style="font-size:16px;color:var(--muted)">‹</span><b style="font-size:12.5px">Bus tickets</b>
      </div>
      <div class="bus-body" style="flex:1;overflow:hidden;position:relative"></div>
      ${scrim}${upiSheet("Pay ₹642 with")}
      <div class="toast" style="position:absolute;left:12px;right:12px;bottom:18px;z-index:9;background:#1A2238;color:#fff;border-radius:12px;padding:10px 12px;font-size:10.5px;display:flex;gap:8px;align-items:center;opacity:0;transform:translateY(10px);transition:all .3s">
        <span style="width:18px;height:22px;border-radius:3px;background:#E9A400;flex:none"></span>Ticket saved as BLR-HYD-14Nov.pdf</div>
    </div>`;
    const body = a.querySelector(".bus-body");
    const route = `
      <div class="pad" style="padding-top:12px">
        <div style="background:#fff;border-radius:14px;padding:12px" class="col">
          <div class="row" style="justify-content:space-between"><div><div class="ui-sub">From</div><b>Bengaluru</b></div><span style="color:var(--muted)">⇄</span><div style="text-align:right"><div class="ui-sub">To</div><b>Hyderabad</b></div></div>
          <div class="row" style="justify-content:space-between;margin-top:6px"><span class="ui-sub">Fri, 14 Nov</span><span class="ui-sub">1 seat</span></div>
        </div>
        ${[["21:30", "06:15", "₹642", "AC Sleeper"], ["22:10", "07:00", "₹580", "Non-AC Sleeper"], ["23:00", "07:40", "₹720", "Volvo AC"]].map((r, i) => `
          <div class="bus-row" style="background:#fff;border-radius:14px;padding:11px 12px;margin-top:8px;border:1px solid ${i ? "transparent" : "transparent"}">
            <div class="row" style="justify-content:space-between"><b>${r[0]} → ${r[1]}</b><b>${r[2]}</b></div>
            <div class="ui-sub" style="margin-top:3px">${r[3]}</div>
          </div>`).join("")}
      </div>`;
    body.innerHTML = route;
    if (reduced) return;
    const sheet = a.querySelector(".upi"), sc = a.querySelector(".scrim"), toast = a.querySelector(".toast");
    t.later(() => { const r = body.querySelector(".bus-row"); r.style.borderColor = "#4B5BD6"; r.style.boxShadow = "0 0 0 3px rgba(75,91,214,.15)"; }, 1000);
    t.later(() => { sc.style.opacity = 1; sheet.style.transform = "none"; }, 1900);
    t.later(() => { const ap = a.querySelector(".upi-app"); ap.style.transform = "scale(.9)"; ap.style.transition = "transform .15s"; }, 3000);
    t.later(() => {
      sc.style.opacity = 0; sheet.style.transform = "translateY(105%)";
      body.innerHTML = `<div style="padding:46px 16px;text-align:center">${tickIcon()}<b style="display:block;margin-top:12px;font-size:13px">Booking confirmed</b>
        <div class="ui-sub" style="margin-top:3px">Seat 14U, Bengaluru to Hyderabad</div>
        <div class="ui-btn" style="margin-top:22px">Download ticket</div></div>`;
    }, 3500);
    t.later(() => { toast.style.opacity = 1; toast.style.transform = "none"; }, 4700);
    t.later(() => demos.bus(a, t), 7800);
  };

  /* ---------- Business: merchant home ---------- */
  demos.merchant = (a, t) => {
    const names = ["Ravi K.", "Anita S.", "Imran M.", "Divya R.", "Karthik P.", "Neha G."];
    const amts = [120, 45, 380, 60, 999, 210];
    a.innerHTML = `<div style="display:flex;flex-direction:column;height:100%;background:#F7F8FA;position:relative">
      <div style="background:linear-gradient(160deg,#1E6E60,#2E9C8A);color:#fff;padding-bottom:16px">
        ${sb(true)}
        <div class="pad row" style="justify-content:space-between;padding-top:4px">
          <div><div style="font-size:10px;opacity:.8">Sri Lakshmi Stores</div><b style="font:700 13px var(--body)">Today's collection</b></div>
          <button class="snd" aria-pressed="true" style="border:0;background:rgba(255,255,255,.18);color:#fff;border-radius:999px;padding:5px 9px;font:600 9.5px var(--body);cursor:pointer">🔔 Sound on</button>
        </div>
        <div class="pad" style="margin-top:8px"><b class="tot" style="font:800 28px var(--display)">₹4,580</b>
          <div style="font-size:10px;opacity:.85" class="cnt">32 payments</div></div>
        <div class="pad row" style="gap:8px;margin-top:12px">
          <span style="flex:1;background:rgba(255,255,255,.18);border-radius:10px;padding:8px;text-align:center;font-weight:600;font-size:10.5px">Show QR</span>
          <span style="flex:1;background:rgba(255,255,255,.18);border-radius:10px;padding:8px;text-align:center;font-weight:600;font-size:10.5px">Settlements</span>
        </div>
      </div>
      <div class="pad row" style="justify-content:space-between;padding-top:12px;padding-bottom:4px">
        <b style="font-size:12px">Transactions</b>
        <span style="font-size:10px;color:var(--ink-2);background:#fff;border:1px solid #E6EAF0;border-radius:8px;padding:4px 8px">Filter</span>
      </div>
      <div class="txl pad" style="flex:1;overflow:hidden"></div>
      <div class="ping" style="position:absolute;left:12px;right:12px;top:48px;z-index:9;background:#fff;border-radius:14px;padding:10px 12px;display:flex;gap:10px;align-items:center;
           box-shadow:0 12px 28px -10px rgba(26,34,56,.45);transform:translateY(-140%);transition:transform .35s cubic-bezier(.2,.8,.2,1)">
        <span class="circle" style="width:28px;height:28px;background:#D7F2EA;display:grid;place-items:center;color:#1E6E60;font-weight:700">₹</span>
        <div style="flex:1"><b class="ping-t" style="font-size:11px"></b><div class="ui-sub">Received just now</div></div>
      </div>
    </div>`;
    const list = a.querySelector(".txl");
    const row = (n, amt, fresh) => `<div class="row tx" style="padding:10px 0;border-bottom:1px solid #EEF1F5;${fresh ? "background:var(--change-soft);margin:0 -14px;padding-left:14px;padding-right:14px;transition:background 1.5s" : ""}">
      <span class="circle" style="width:30px;height:30px;background:#E3E7ED;display:grid;place-items:center;font-size:10px;font-weight:700;color:var(--ink-2)">${n[0]}</span>
      <div class="col" style="flex:1;gap:2px"><b style="font-size:11px">${n}</b><span class="ui-sub">UPI, ${fresh ? "just now" : "earlier today"}</span></div>
      <b style="font-size:12px;color:#1E6E60">+₹${amt}</b></div>`;
    list.innerHTML = [0, 1, 2, 3, 4].map(i => row(names[(i + 2) % 6], amts[(i + 3) % 6], false)).join("");
    const btn = a.querySelector(".snd");
    btn.addEventListener("click", () => {
      const on = btn.getAttribute("aria-pressed") !== "true";
      btn.setAttribute("aria-pressed", on); btn.textContent = on ? "🔔 Sound on" : "🔕 Sound off";
    });
    if (reduced) return;
    let total = 4580, count = 32, k = 0;
    const tot = a.querySelector(".tot"), cnt = a.querySelector(".cnt"), ping = a.querySelector(".ping"), pt = a.querySelector(".ping-t");
    const arrive = () => {
      const n = names[k % 6], amt = amts[k % 6]; k++;
      pt.textContent = `₹${amt} from ${n}`;
      ping.style.transform = "none";
      t.later(() => { ping.style.transform = "translateY(-140%)"; }, 1600);
      list.insertAdjacentHTML("afterbegin", row(n, amt, true));
      const fresh = list.firstElementChild;
      t.later(() => { fresh.style.background = "transparent"; }, 900);
      while (list.children.length > 7) list.lastElementChild.remove();
      total += amt; count++;
      tot.textContent = "₹" + total.toLocaleString("en-IN"); cnt.textContent = `${count} payments`;
    };
    t.later(arrive, 900);
    t.every(arrive, 3200);
  };

  /* ---------- TVMAX ---------- */
  demos.tvmax = (a, t) => {
    const packs = [["Base Pack", "120 channels", 199, true], ["Sports Plus", "18 channels", 89, false], ["Kids", "12 channels", 49, false], ["Regional", "40 channels", 69, false]];
    a.innerHTML = `<div style="display:flex;flex-direction:column;height:100%;background:#231310;color:#fff;position:relative">
      ${sb(true)}
      <div class="tv-body" style="flex:1;position:relative;overflow:hidden"></div>
      ${scrim}${upiSheet("Pay ₹337 with")}
    </div>`;
    const body = a.querySelector(".tv-body");
    const sheet = a.querySelector(".upi"), sc = a.querySelector(".scrim");
    const sel = new Set([0]);
    const totalOf = () => [...sel].reduce((s, i) => s + packs[i][2], 0);
    const plansView = () => {
      body.innerHTML = `
        <div class="pad" style="padding-top:4px"><b style="font:700 15px var(--display)">Manage plans</b>
          <div class="row" style="gap:6px;margin:10px 0 4px">
            ${["Packs", "Channels", "Add-ons"].map((x, i) => `<span style="font-size:10px;font-weight:600;padding:5px 10px;border-radius:999px;background:${i ? "rgba(255,255,255,.08)" : "#E8B9A2"};color:${i ? "#DCC6BC" : "#2A1712"}">${x}</span>`).join("")}
          </div>
          <div class="packs"></div>
        </div>
        <div style="position:absolute;left:0;right:0;bottom:0;padding:12px 14px 20px;background:#2E1A15;border-top:1px solid rgba(255,255,255,.08)" class="row">
          <div style="flex:1"><div style="font-size:9.5px;color:#B9A097">Monthly total</div><b class="tv-tot" style="font:700 16px var(--display)">₹${totalOf()}</b></div>
          <span class="tv-pay" style="background:#E8B9A2;color:#2A1712;border-radius:10px;padding:9px 16px;font-weight:700;font-size:11px">Checkout</span>
        </div>`;
      const host = body.querySelector(".packs");
      host.innerHTML = packs.map((p, i) => `
        <div class="pack" data-i="${i}" style="display:flex;align-items:center;gap:10px;background:rgba(255,255,255,.05);border:1px solid ${sel.has(i) ? "#E8B9A2" : "rgba(255,255,255,.08)"};border-radius:12px;padding:10px;margin-top:8px;transition:border-color .2s">
          <span style="width:34px;height:34px;border-radius:9px;background:${["#8C4A36", "#5E7A3A", "#9A4E6A", "#6B5A52"][i]}"></span>
          <div style="flex:1"><b style="font-size:11.5px">${p[0]}</b>${p[3] ? `<span style="font-size:8.5px;margin-left:6px;color:#E8B9A2">Required</span>` : ""}<div style="font-size:9.5px;color:#B9A097">${p[1]}</div></div>
          <b style="font-size:11.5px">₹${p[2]}</b>
          <span class="chk" style="width:16px;height:16px;border-radius:5px;border:1.5px solid ${sel.has(i) ? "#E8B9A2" : "#7A5A50"};background:${sel.has(i) ? "#E8B9A2" : "transparent"}"></span>
        </div>`).join("");
    };
    const toggle = (i) => {
      if (packs[i][3]) return;
      sel.has(i) ? sel.delete(i) : sel.add(i);
      const el = body.querySelector(`.pack[data-i="${i}"]`), c = el.querySelector(".chk");
      el.style.borderColor = sel.has(i) ? "#E8B9A2" : "rgba(255,255,255,.08)";
      c.style.borderColor = sel.has(i) ? "#E8B9A2" : "#7A5A50"; c.style.background = sel.has(i) ? "#E8B9A2" : "transparent";
      body.querySelector(".tv-tot").textContent = "₹" + totalOf();
    };
    plansView();
    body.addEventListener("click", e => { const p = e.target.closest(".pack"); if (p) toggle(+p.dataset.i); });
    if (reduced) return;
    t.later(() => toggle(1), 1100);
    t.later(() => toggle(3), 1900);
    t.later(() => {
      body.innerHTML = `<div class="pad" style="padding-top:4px"><b style="font:700 15px var(--display)">Checkout</b>
        <div style="background:rgba(255,255,255,.05);border-radius:12px;padding:12px;margin-top:12px">
          ${[...sel].map(i => `<div class="row" style="justify-content:space-between;padding:5px 0"><span style="color:#DCC6BC">${packs[i][0]}</span><b>₹${packs[i][2]}</b></div>`).join("")}
          <div class="row" style="justify-content:space-between;padding:8px 0 0;margin-top:6px;border-top:1px dashed rgba(255,255,255,.15)"><span>Total incl. tax</span><b>₹337</b></div>
        </div>
        <div style="margin-top:14px;font-size:10px;color:#B9A097">Pay with</div>
        <div style="background:rgba(255,255,255,.05);border-radius:12px;padding:11px 12px;margin-top:6px" class="row"><span style="flex:1">UPI app</span><span style="color:#E8B9A2">●</span></div>
        </div>
        <div style="position:absolute;left:14px;right:14px;bottom:20px;background:#E8B9A2;color:#2A1712;border-radius:12px;padding:11px;text-align:center;font-weight:700">Pay ₹337</div>`;
    }, 2900);
    t.later(() => { sc.style.opacity = 1; sheet.style.transform = "none"; }, 3900);
    t.later(() => { const ap = a.querySelectorAll(".upi-app")[1]; ap.style.transition = "transform .15s"; ap.style.transform = "scale(.9)"; }, 4800);
    t.later(() => {
      sc.style.opacity = 0; sheet.style.transform = "translateY(105%)";
      body.innerHTML = `<div style="text-align:center;padding-top:90px">
        <span class="spin" style="display:inline-block;width:40px;height:40px;border-radius:50%;border:3px solid rgba(255,255,255,.15);border-top-color:#E8B9A2"></span>
        <b style="display:block;margin-top:14px">Confirming your payment</b>
        <div style="font-size:10px;color:#B9A097;margin-top:4px">Checking with your bank</div></div>`;
    }, 5300);
    t.later(() => {
      body.innerHTML = `<div style="text-align:center;padding-top:80px">${tickIcon("#2E9C8A", 56)}
        <b style="display:block;margin-top:14px;font:700 15px var(--display)">Plan active</b>
        <div style="font-size:10px;color:#B9A097;margin-top:4px">Base Pack, Sports Plus and Regional on your set-top box</div></div>`;
    }, 6900);
    t.later(() => demos.tvmax(a, t), 9800);
  };

  /* Images carry their real size, so nothing shifts while they load (Safari has no scroll anchoring). */
  const SIZES = window.IMG_SIZES || {};
  const img = (src, alt) => {
    const wh = SIZES[src];
    const size = wh ? ` width="${wh[0]}" height="${wh[1]}"` : "";
    if (/\.mp4$/.test(src)) {
      const poster = src.replace(/\.mp4$/, "-poster.webp");
      return `<video src="${esc(src)}" poster="${esc(poster)}"${size} muted loop playsinline preload="metadata" ${reduced ? "controls" : "autoplay"} aria-label="${esc(alt)}"></video>`;
    }
    return `<img src="${esc(src)}" alt="${esc(alt)}"${size} loading="lazy" decoding="async">`;
  };

  /* Widget outlines for real screenshots, keyed by image path */
  const WMAP = {};
  (D.widgetMaps || []).forEach(m => { WMAP[m.src] = m; });
  const overlay = m => `<div class="w-ov" aria-hidden="true">
      <span class="wbox root"><i>${esc(m.root)}</i></span>
      ${m.widgets.map(w => `<span class="wbox${w.lp ? " lp-" + w.lp : ""}" style="left:${w.x}%;top:${w.y}%;width:${w.w}%;height:${w.h}%"><i>${esc(w.n)}</i></span>`).join("")}
    </div>`;

  /* ================= explorer component ================= */
  class Explorer {
    constructor(root, project) {
      this.root = root; this.p = project; this.i = 0; this.compare = false;
      this.timers = [];
      this.t = {
        later: (fn, ms) => { const id = setTimeout(fn, ms); this.timers.push(id); return id; },
        every: (fn, ms) => { const id = setInterval(fn, ms); this.timers.push(id); return id; }
      };
      this.build();
      this.show(0);
      if ("IntersectionObserver" in window) {
        let visible = true;
        new IntersectionObserver(([e]) => {
          if (e.isIntersecting && !visible) { visible = true; this.restartDemo(); }
          else if (!e.isIntersecting && visible) { visible = false; this.stop(); }
        }, { rootMargin: "150px 0px" }).observe(root);
      }
    }
    stop() { this.timers.forEach(id => { clearTimeout(id); clearInterval(id); }); this.timers = []; }
    restartDemo() {
      const f = this.p.features[this.i];
      if (this.mode !== "demo" || !demos[f.demo]) return;
      this.stop();
      demos[f.demo](this.root.querySelector(".sc-after"), this.t);
    }
    build() {
      const many = this.p.features.length > 1;
      this.root.innerHTML = `
        ${many ? `<div class="feat-tabs" role="tablist" aria-label="${esc(this.p.name)} features">
          ${this.p.features.map((f, k) => `<button role="tab" type="button" data-k="${k}" aria-selected="${k === 0}">${esc(f.short)}</button>`).join("")}
        </div>` : ""}
        <div class="feat">
          <div class="feat-visual">
            <div class="shots" hidden></div>
            <div class="phones">
              <figure class="device dev-before" hidden><figcaption><span class="tag tag-before">Before</span></figcaption>
                <div class="phone"><div class="island"></div><div class="screen sc-before"></div></div></figure>
              <figure class="device dev-after"><figcaption class="cap-after" hidden><span class="tag tag-after">After</span></figcaption>
                <div class="phone"><div class="island"></div><div class="screen sc-after"></div></div></figure>
            </div>
          </div>
          <div class="feat-text">
            <h3 class="feat-title"></h3>
            <p class="feat-what"></p>
            <div class="feat-built-wrap">
              <h4>What I built</h4>
              <ul class="feat-built"></ul>
            </div>
            <div class="feat-actions">
              <div class="seg mode" role="group" aria-label="What to show" hidden>
                <button type="button" data-m="screens" aria-pressed="true">Real screens</button>
                <button type="button" data-m="demo" aria-pressed="false">Try it</button>
              </div>
              <label class="w-toggle" hidden><input type="checkbox"><span class="sw" aria-hidden="true"></span>Show Flutter widgets</label>
              <p class="feat-hint"></p>
              <button type="button" class="ghost cmp" aria-pressed="false">Compare with before</button>
            </div>
          </div>
        </div>`;
      this.tabs = [...this.root.querySelectorAll(".feat-tabs button")];
      this.tabs.forEach(b => b.addEventListener("click", () => this.show(+b.dataset.k)));
      const tl = this.root.querySelector(".feat-tabs");
      if (tl) tl.addEventListener("keydown", e => {
        if (!["ArrowLeft", "ArrowRight"].includes(e.key)) return;
        e.preventDefault();
        const n = (this.i + (e.key === "ArrowRight" ? 1 : -1) + this.tabs.length) % this.tabs.length;
        this.show(n); this.tabs[n].focus();
      });
      this.cmp = this.root.querySelector(".cmp");
      this.cmp.addEventListener("click", () => { this.compare = !this.compare; this.show(this.i, true); });
      this.wt = this.root.querySelector(".w-toggle");
      this.wt.querySelector("input").addEventListener("change", e => this.root.querySelector(".shots").classList.toggle("inspect", e.target.checked));
      this.root.querySelectorAll(".mode button").forEach(b => b.addEventListener("click", () => { this.mode = b.dataset.m; this.show(this.i, true); }));
    }
    show(k, keepMode) {
      this.stop();
      if (!keepMode && k !== this.i) this.mode = null;
      this.i = k;
      const f = this.p.features[k];
      const hasShots = !!(f.shots && f.shots.length), hasDemo = !!(f.demo && demos[f.demo]);
      if (!this.mode || (this.mode === "screens" && !hasShots) || (this.mode === "demo" && !hasDemo)) this.mode = hasShots ? "screens" : "demo";
      this.tabs.forEach((b, j) => {
        b.setAttribute("aria-selected", j === k);
        b.tabIndex = j === k ? 0 : -1;
        // Keep the selected tab visible by scrolling the tab row sideways only, never the page.
        if (j === k && b.parentElement.scrollWidth > b.parentElement.clientWidth) {
          const row = b.parentElement, left = b.offsetLeft - (row.clientWidth - b.offsetWidth) / 2;
          row.scrollTo({ left: Math.max(0, left), behavior: reduced ? "auto" : "smooth" });
        }
      });
      const r = this.root;
      r.querySelector(".feat-title").textContent = f.title;
      r.querySelector(".feat-what").textContent = f.what;
      const ul = r.querySelector(".feat-built");
      ul.innerHTML = f.built.map(x => `<li>${esc(x)}</li>`).join("");
      r.querySelector(".feat-built-wrap").hidden = !f.built.length;
      const demoMode = this.mode === "demo";
      if (demoMode) this.wt.hidden = true;
      r.querySelector(".feat-hint").textContent = demoMode ? (f.hint || "")
        : f.shotsHint || (hasShots && f.shots.length > 2 ? "Scroll the screens sideways to see more." : "");
      const modeEl = r.querySelector(".mode");
      modeEl.hidden = !(hasShots && hasDemo);
      modeEl.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", b.dataset.m === this.mode));
      const shotsEl = r.querySelector(".shots");
      shotsEl.hidden = demoMode;
      shotsEl.classList.toggle("many", hasShots && f.shots.length > 2);
      shotsEl.scrollLeft = 0;
      r.querySelector(".phones").hidden = !demoMode;
      if (!demoMode) {
        shotsEl.innerHTML = f.shots.map((sh, j) => {
          const src = typeof sh === "string" ? sh : sh.src, alt = (f.shotAlts || [])[j] || f.title;
          if (sh.scroll) return `<figure class="shot"><div class="shot-scroll" tabindex="0" aria-label="${esc(alt)}, scrolls">${img(src, alt)}</div></figure>`;
          const m = WMAP[src];
          return m ? `<figure class="shot"><div class="shot-in">${img(src, alt)}${overlay(m)}</div></figure>` : `<figure class="shot">${img(src, alt)}</figure>`;
        }).join("");
        const mapped = f.shots.some(sh => WMAP[typeof sh === "string" ? sh : sh.src]);
        this.wt.hidden = !mapped;
        this.wt.querySelector("input").checked = false;
        shotsEl.classList.remove("inspect");
        this.compare = false;
        this.cmp.hidden = true;
        r.querySelector(".feat").classList.remove("comparing");
        r.querySelector(".sc-after").innerHTML = "";
        return;
      }
      const hasBefore = !!f.before && !!befores[f.before];
      if (!hasBefore) this.compare = false;
      this.cmp.hidden = !hasBefore;
      this.cmp.setAttribute("aria-pressed", this.compare);
      this.cmp.textContent = this.compare ? "Hide before" : "Compare with before";
      r.querySelector(".dev-before").hidden = !this.compare;
      r.querySelector(".cap-after").hidden = !this.compare;
      r.querySelector(".feat").classList.toggle("comparing", this.compare);
      const after = r.querySelector(".sc-after"), before = r.querySelector(".sc-before");
      after.innerHTML = ""; before.innerHTML = "";
      demos[f.demo](after, this.t);
      if (this.compare) befores[f.before](before);
    }
  }

  /* ================= render page ================= */
  $("#project-index").innerHTML = D.projects.map(p => `
    <li><a href="#p-${p.id}" style="--area-color:${p.color}">
      <span class="pi-name">${esc(p.name)}</span>
      <span class="pi-kind">${esc(p.kind)}</span>
      <span class="pi-meta">${esc(p.company)}, ${esc(p.period)}</span>
    </a></li>`).join("");

  const host = $("#projects");
  D.projects.forEach((p, n) => {
    const sec = document.createElement("section");
    sec.className = "project" + (n % 2 ? " alt" : "");
    sec.id = `p-${p.id}`;
    sec.style.setProperty("--area-color", p.color);
    sec.setAttribute("aria-labelledby", `t-${p.id}`);
    sec.innerHTML = `
      <div class="p-head">
        <div>
          <p class="p-kind">${esc(p.kind)}</p>
          <h2 id="t-${p.id}" class="p-name">${esc(p.name)}</h2>
          <p class="p-meta">${esc(p.company)}, ${esc(p.period)}</p>
        </div>
        <div>
          <p class="p-summary">${esc(p.summary)}</p>
          <ul class="chips" aria-label="Tools">${p.stack.map(s => `<li>${esc(s)}</li>`).join("")}</ul>
          ${p.links ? `<p class="store-links">${p.links.map(l => `<a href="${esc(l.href)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join("")}</p>` : ""}
        </div>
      </div>
      <div class="explorer"></div>
      ${p.gallery ? `
        <div class="gallery">
          <h3>${esc(p.gallery.title)}</h3>
          <div class="strip" tabindex="0" aria-label="${esc(p.name)} screenshots, scrolls sideways">
            ${p.gallery.images.map((src, j) => img(src, `${p.name} screenshot ${j + 1}`)).join("")}
          </div>
        </div>` : ""}
      ${p.underTheHood ? `
        <div class="uth">
          <h3>${esc(p.underTheHood.title)}</h3>
          <ul>${p.underTheHood.items.map(([h, d]) => `<li><b>${esc(h)}</b><span>${esc(d)}</span></li>`).join("")}</ul>
        </div>` : ""}`;
    host.appendChild(sec);
    new Explorer(sec.querySelector(".explorer"), p);
  });

  /* ================= hero: Flutter hot reload, plus three hidden Flutter demos ================= */
  (() => {
    const host = $("#hotreload");
    if (!host) return;
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    const inr = n => "₹" + Math.round(n).toLocaleString("en-IN");
    // Code tokens: [class, text, key?]. Keys mark values a demo edits.
    const codeHTML = lines => lines.map(line => `<span class="ln">${line.map(([c, t, k]) =>
      `<span${c ? ` class="tk-${c}"` : ""}${k ? ` data-k="${k}"` : ""}>${esc(t)}</span>`).join("") || " "}</span>`).join("");
    // Light syntax colouring for plain Dart strings (used by the hidden demos).
    const KW = /^(class|final|required|return|this|const|true|false)$/;
    const dart = src => src.split("\n").map(l => {
      if (/^\s*\/\//.test(l)) return [["c", l]];
      const out = [];
      l.replace(/('[^']*')|(@\w+)|(\b\d[\w.]*\b)|(\b[A-Z]\w*\b)|(\b[a-z_]\w*\b)|([^'@\w]+)/g, (m, s, a, n, T, w, p) => {
        out.push([s ? "s" : a ? "f" : n ? "n" : T ? "t" : w && KW.test(w) ? "k" : "", m]);
        return m;
      });
      return out;
    });
    const editor = (file, tag, body) => `
      <div class="hr-ed">
        <div class="hr-bar"><span class="hr-file">${file}</span>${tag}</div>
        <pre class="hr-code" aria-hidden="true"><code>${body}</code></pre>
      </div>`;

    /* ---------- scheduling: each demo runs only while it is on screen ---------- */
    let cur = "hr", visible = true, waiters = [];
    const ok = s => visible && !document.hidden && cur === s;
    const ready = s => ok(s) ? Promise.resolve() : new Promise(r => waiters.push([s, r]));
    const check = () => { waiters = waiters.filter(([s, r]) => (ok(s) ? (r(), false) : true)); };
    if ("IntersectionObserver" in window) new IntersectionObserver(([e]) => { visible = e.isIntersecting; check(); }).observe(host);
    document.addEventListener("visibilitychange", check);

    /* ---------- the visible demo: hot reload keeps state ---------- */
    const L = [
      [["t", "int"], ["", " people = "], ["n", "2"], ["", ";  "], ["c", "// state"]],
      [],
      [["t", "Widget"], ["", " "], ["f", "build"], ["", "(context) {"]],
      [["", "  "], ["k", "return"], ["", " "], ["t", "BillCard"], ["", "("]],
      [["", "    title: "], ["s", "'Dinner'", "title"], ["", ","]],
      [["", "    total: "], ["n", "2400", "total"], ["", ","]],
      [["", "    color: "], ["t", "Color"], ["", "("], ["n", "0xFF1A2238", "color"], ["", "),"]],
      [["", "    radius: "], ["n", "12", "radius"], ["", ","]],
      [["", "    onAdd: () => "], ["f", "setState"], ["", "(() => people++),"]],
      [["", "  );"]],
      [["", "}"]]
    ];
    const EDITS = [
      ["title", "'Goa trip'"], ["color", "0xFF0F7B6C"], ["radius", "28"], ["total", "18600"],
      ["title", "'Dinner'"], ["color", "0xFF1A2238"], ["radius", "12"], ["total", "2400"]
    ];
    const NAMES = ["Asha", "Bibek", "Chirag", "Divya", "Esha", "Farhan"];
    const TINTS = ["#E9A400", "#7FA7E8", "#E58C6A", "#9CC59A", "#C9A2E0", "#F2C46B"];
    const billCard = (o, cls = "") => `
      <div class="bc ${cls}" style="--bc:${o.bg};--fg:${o.fg || "#fff"};--br:${o.radius || 12}px">
        <div class="bc-top"><span class="bc-title">${esc(o.title)}</span><span class="bc-total">${inr(o.total)}</span></div>
        <div class="bc-people" aria-hidden="true">${NAMES.slice(0, o.people).map((n, i) => `<span style="background:${TINTS[i]}">${n[0]}</span>`).join("")}</div>
        <div class="bc-foot"><span class="bc-each">${inr(o.total / o.people)} each</span>${o.buttons || ""}</div>
      </div>`;

    host.innerHTML = `
      <div class="stage on" data-s="hr">
        <div class="hr-ed">
          <div class="hr-bar"><span class="hr-file">split_bill.dart</span><button type="button" class="hr-bolt" tabindex="-1">⚡ Hot reload</button></div>
          <pre class="hr-code" aria-hidden="true"><code>${codeHTML(L)}</code></pre>
        </div>
        <div class="hr-prev">
          ${billCard({ title: "Dinner", total: 2400, people: 2, bg: "#1A2238", buttons: `<span class="bc-btns">
            <button type="button" class="bc-minus" aria-label="Remove a person">−</button>
            <button type="button" class="bc-plus" aria-label="Add a person">+</button></span>` }, "live")}
          <p class="hr-status" aria-live="polite">Tap <b>+</b> or <b>−</b>, then watch the next reload keep it.</p>
        </div>
        <p class="hr-cap">Flutter hot reload: the code changes, the state stays.<br><span class="egg-hint">✦ 3 more Flutter things are hidden on this page.</span></p>
      </div>
      <div class="stage" data-s="previews"></div>
      <div class="stage" data-s="dart"></div>
      <div class="stage" data-s="carousel"></div>
      <div class="egg-bar" hidden>
        <p class="egg-note" aria-live="polite"></p>
        <button type="button" class="egg-back">← Back to hot reload</button>
      </div>`;

    const q = s => host.querySelector(s);
    const card = q(".bc.live"), status = q(".hr-status"), bolt = q(".hr-bolt");
    const st = { title: "'Dinner'", total: "2400", color: "0xFF1A2238", radius: "12" };
    let people = 2, touched = false;
    const render = () => {
      card.style.setProperty("--bc", "#" + st.color.slice(4));
      card.style.setProperty("--br", st.radius + "px");
      card.querySelector(".bc-title").textContent = st.title.replace(/'/g, "");
      card.querySelector(".bc-total").textContent = inr(+st.total);
      card.querySelector(".bc-each").textContent = `${inr(+st.total / people)} each`;
      card.querySelector(".bc-people").innerHTML = NAMES.slice(0, people).map((n, i) => `<span style="background:${TINTS[i]}">${n[0]}</span>`).join("");
      q(".bc-minus").disabled = people <= 1;
      q(".bc-plus").disabled = people >= NAMES.length;
    };
    const change = (d, byUser) => {
      people = Math.max(1, Math.min(NAMES.length, people + d));
      if (byUser) touched = true;
      render();
      status.innerHTML = `State: <b>people = ${people}</b>. The code still says 2.`;
    };
    q(".bc-plus").addEventListener("click", () => change(1, true));
    q(".bc-minus").addEventListener("click", () => change(-1, true));
    render();
    const flash = () => { bolt.classList.remove("flash"); void bolt.offsetWidth; bolt.classList.add("flash"); };
    const tap = async (sel, d) => {
      const b = q(sel);
      b.classList.add("tap"); await sleep(260);
      change(d, false); await sleep(240); b.classList.remove("tap");
    };
    const edit = async ([k, v]) => {
      const el = host.querySelector(`[data-s="hr"] [data-k="${k}"]`);
      if (reduced) el.textContent = v;
      else {
        el.classList.add("sel"); await sleep(520);
        el.classList.remove("sel"); el.textContent = ""; el.classList.add("typing");
        for (const ch of v) { el.textContent += ch; await sleep(55); }
        el.classList.remove("typing"); await sleep(320);
      }
      st[k] = v;
      flash();
      card.classList.add("reloaded");
      render();
      status.innerHTML = `⚡ Reloaded <b>${k}</b>. State kept: <b>people = ${people}</b>.`;
      await sleep(500); card.classList.remove("reloaded");
    };
    (async () => {
      await sleep(1200);
      for (let n = 0; ; n++) {
        await ready("hr");
        // Change the state now and then, so the reload visibly keeps it.
        if (!touched && n % 4 === 0 && !reduced) {
          await tap(people >= 4 ? ".bc-minus" : ".bc-plus", people >= 4 ? -1 : 1);
          await sleep(1300);
          await ready("hr");
        }
        await edit(EDITS[n % EDITS.length]);
        await sleep(reduced ? 5000 : 2600);
      }
    })();

    /* ---------- hidden demo 1: Widget Previews (stable in Flutter 3.47) ---------- */
    const buildPreviews = el => {
      const src = `@Preview(name: 'Light')
@Preview(name: 'Dark',
    brightness: Brightness.dark)
@Preview(name: 'Large text',
    textScaleFactor: 1.6)
Widget billCard() => BillCard(
    title: 'Dinner', total: 2400);`;
      const base = { title: "Dinner", total: 2400, people: 2, radius: 12 };
      el.innerHTML = `${editor("bill_card_preview.dart", `<span class="hr-tag">Flutter 3.47</span>`, codeHTML(dart(src)))}
        <div class="pv-panel">
          <p class="pv-head"><span>Widget Previewer</span><span>3 previews</span></p>
          <div class="pv-grid">
            <figure class="pv"><figcaption>Light</figcaption>${billCard({ ...base, bg: "#FFFFFF", fg: "#1A2238" }, "mini")}</figure>
            <figure class="pv dark"><figcaption>Dark</figcaption>${billCard({ ...base, bg: "#1A2238" }, "mini")}</figure>
            <figure class="pv wide"><figcaption>Large text</figcaption>${billCard({ ...base, bg: "#FFFFFF", fg: "#1A2238" }, "mini big")}</figure>
          </div>
        </div>
        <p class="hr-cap">Widget Previews, stable in Flutter 3.47: one widget in several setups, without running the app.</p>`;
      (async () => {
        const pv = [...el.querySelectorAll(".pv")];
        for (;;) {
          await ready("previews");
          pv.forEach(p => p.classList.remove("in"));
          for (const p of pv) { await sleep(reduced ? 0 : 380); p.classList.add("in"); }
          await sleep(6500);
        }
      })();
    };

    /* ---------- hidden demo 2: shorter Dart (3.13 primary constructors, 3.10 dot shorthands) ---------- */
    const buildDart = el => {
      const SNIPS = [
        { file: "txn.dart", tag: "Dart 3.13", what: "Primary constructors",
          before: `class Txn {
  final String id;
  final int amount;
  final TxnStatus status;

  Txn({
    required this.id,
    required this.amount,
    required this.status,
  });
}`,
          after: `class Txn({
  required final String id,
  required final int amount,
  required final TxnStatus status,
});` },
        { file: "txn_row.dart", tag: "Dart 3.10", what: "Dot shorthands",
          before: `Row(
  mainAxisSize: MainAxisSize.min,
  children: [
    StatusChip(status: TxnStatus.paid),
    Text(label, style: TextStyle(
      fontWeight: FontWeight.w600)),
  ],
)`,
          after: `Row(
  mainAxisSize: .min,
  children: [
    StatusChip(status: .paid),
    Text(label, style: TextStyle(
      fontWeight: .w600)),
  ],
)`,
          // tokens removed on the way from before to after
          drop: ["MainAxisSize", "TxnStatus", "FontWeight"] }
      ];
      el.innerHTML = `${editor(`<span class="dt-file"></span>`, `<span class="hr-tag dt-tag"></span>`, "")}
        <p class="dt-count"><span class="dt-what"></span><b class="dt-num"></b></p>
        <p class="hr-cap">Same code, less typing: Dart 3.13 makes primary constructors stable, and Dart 3.10 added dot shorthands.</p>`;
      const code = el.querySelector("code"), file = el.querySelector(".dt-file"), tag = el.querySelector(".dt-tag");
      const what = el.querySelector(".dt-what"), num = el.querySelector(".dt-num");
      const chars = s => s.replace(/\s+/g, "").length;
      (async () => {
        for (let i = 0; ; i++) {
          const s = SNIPS[i % SNIPS.length];
          await ready("dart");
          file.textContent = s.file; tag.textContent = s.tag; what.textContent = s.what;
          code.className = "";
          code.innerHTML = codeHTML(dart(s.before));
          const bl = s.before.split("\n").length;
          num.textContent = s.drop ? `${chars(s.before)} characters` : `${bl} lines`;
          await sleep(reduced ? 1500 : 1800);
          await ready("dart");
          if (s.drop) {
            // strike the type names that the shorthand makes unnecessary
            code.querySelectorAll(".tk-t").forEach(t => { if (s.drop.includes(t.textContent)) t.classList.add("gone"); });
          } else {
            code.querySelectorAll(".ln").forEach(ln => {
              if (/^\s*final |^\s*required this\.|^\s*Txn\(\{|^\s*\}\);|^\s*\}$|^\s*$/.test(ln.textContent)) ln.classList.add("gone");
            });
          }
          await sleep(reduced ? 600 : 1300);
          code.innerHTML = codeHTML(dart(s.after));
          code.className = "fresh";
          num.textContent = s.drop ? `${chars(s.before)} → ${chars(s.after)} characters` : `${bl} → ${s.after.split("\n").length} lines`;
          await sleep(4200);
        }
      })();
    };

    /* ---------- hidden demo 3: infinite CarouselView (Flutter 3.44) ---------- */
    const buildCarousel = el => {
      const OFFERS = [
        { t: "Bill payments", s: "Electricity, water, gas", c: "#1A2238" },
        { t: "Mobile recharge", s: "Plans from every operator", c: "#0F7B6C" },
        { t: "Bus tickets", s: "Pick a seat, pay with UPI", c: "#B5542E" },
        { t: "Split a bill", s: "Right inside the chat", c: "#5B4BC4" },
        { t: "FASTag", s: "Top up before the toll", c: "#8A6A00" }
      ];
      const src = `CarouselView(
  itemExtent: 220,
  infinite: true,
  onIndexChanged: (i) =>
      setState(() => index = i),
  children: offers,
)`;
      const N = OFFERS.length, COPIES = 5;
      const slides = Array.from({ length: N * COPIES }, (_, k) => OFFERS[k % N])
        .map((o, k) => `<div class="cv-item" style="--c:${o.c}"><b>${esc(o.t)}</b><span>${esc(o.s)}</span><i>${(k % N) + 1}/${N}</i></div>`).join("");
      el.innerHTML = `${editor("offers.dart", `<span class="hr-tag">Flutter 3.44</span>`, codeHTML(dart(src)))}
        <div class="cv" tabindex="0" aria-label="Offers carousel that loops forever. Drag or scroll sideways.">${slides}</div>
        <p class="cv-status"><span>onIndexChanged → <b class="cv-i">0</b></span><span class="cv-loop">loops: <b>0</b></span></p>
        <p class="hr-cap">CarouselView loops forever since Flutter 3.44. Drag it either way, it never runs out.</p>`;
      const cv = el.querySelector(".cv"), idx = el.querySelector(".cv-i"), loops = el.querySelector(".cv-loop b");
      let W = 0, lastI = -1, laps = 0, user = 0;
      const measure = () => { const it = cv.querySelector(".cv-item"); W = it ? it.offsetWidth + 10 : 230; };
      const centre = () => { measure(); cv.scrollLeft = W * N * 2; };
      // Keep the strip in the middle copies so it can scroll forever both ways.
      cv.addEventListener("scroll", () => {
        if (!W) return;
        const set = W * N;
        if (cv.scrollLeft < set) { cv.scrollLeft += set * 2; laps++; }
        else if (cv.scrollLeft > set * 3) { cv.scrollLeft -= set * 2; laps++; }
        const i = Math.round(cv.scrollLeft / W) % N;
        if (i !== lastI) { lastI = i; idx.textContent = i; idx.parentElement.classList.remove("ping"); void idx.offsetWidth; idx.parentElement.classList.add("ping"); }
        loops.textContent = laps;
      }, { passive: true });
      ["pointerdown", "wheel", "touchstart", "keydown"].forEach(ev => cv.addEventListener(ev, () => { user = Date.now(); }, { passive: true }));
      // drag with a mouse
      let drag = null;
      cv.addEventListener("pointerdown", e => { if (e.pointerType === "mouse") { drag = { x: e.clientX, s: cv.scrollLeft }; cv.classList.add("grab"); cv.setPointerCapture(e.pointerId); } });
      cv.addEventListener("pointermove", e => { if (drag) cv.scrollLeft = drag.s - (e.clientX - drag.x); });
      const end = () => { if (!drag) return; drag = null; cv.classList.remove("grab"); cv.scrollTo({ left: Math.round(cv.scrollLeft / W) * W, behavior: "smooth" }); };
      cv.addEventListener("pointerup", end); cv.addEventListener("pointercancel", end);
      requestAnimationFrame(centre);
      (async () => {
        for (;;) {
          await ready("carousel");
          if (!W) centre();
          await sleep(2400);
          if (cur === "carousel" && !reduced && Date.now() - user > 4000) cv.scrollBy({ left: W, behavior: "smooth" });
        }
      })();
    };

    /* ---------- finding them ---------- */
    const EGGS = {
      previews: { label: "Widget Previews", build: buildPreviews, hint: "the little phone in the top bar is more than a logo." },
      dart: { label: "Shorter Dart", build: buildDart, hint: "⚡ Hot reload likes being clicked three times, quickly. ", laptop: true },
      carousel: { label: "Endless CarouselView", build: buildCarousel, hint: "type the command that starts a Flutter app. ", laptop: true }
    };
    let found = [];
    try { found = JSON.parse(localStorage.getItem("bp-eggs") || "[]").filter(k => EGGS[k]); } catch (e) {}
    const built = {};
    const bar = q(".egg-bar"), note = q(".egg-note"), back = q(".egg-back");
    const setStage = s => {
      cur = s;
      host.querySelectorAll(".stage").forEach(x => x.classList.toggle("on", x.dataset.s === s));
      check();
    };
    let lastFocus = null;
    const open = k => {
      if (!built[k]) { EGGS[k].build(host.querySelector(`.stage[data-s="${k}"]`)); built[k] = true; }
      if (!found.includes(k)) { found.push(k); try { localStorage.setItem("bp-eggs", JSON.stringify(found)); } catch (e) {} }
      setStage(k);
      const left = Object.keys(EGGS).filter(x => !found.includes(x)).length;
      const next = Object.keys(EGGS).find(x => !found.includes(x));
      note.innerHTML = `✦ You found <b>${found.length} of 3</b>: ${EGGS[k].label}.` +
        (next ? `<span class="egg-clue">Hint for the next one: ${EGGS[next].hint}${EGGS[next].laptop && !window.matchMedia("(min-width: 1100px)").matches ? " (Try this one on a laptop.)" : ""}</span>` : " That's all of them, nice.");
      bar.hidden = false;
      q(".egg-hint").textContent = left ? `✦ ${left} more Flutter thing${left > 1 ? "s are" : " is"} hidden on this page.` : "✦ You found all 3 hidden Flutter demos.";
      const narrow = !window.matchMedia("(min-width: 1100px)").matches;
      host.classList.toggle("sheet", narrow);
      back.textContent = narrow ? "Close" : "← Back to hot reload";
      document.body.classList.toggle("egg-sheet", narrow);
      if (narrow) { lastFocus = document.activeElement; back.focus({ preventScroll: true }); }
      else if (host.getBoundingClientRect().bottom < 0) host.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
    };
    const close = () => {
      bar.hidden = true;
      setStage("hr");
      if (host.classList.contains("sheet")) { host.classList.remove("sheet"); document.body.classList.remove("egg-sheet"); if (lastFocus) lastFocus.focus({ preventScroll: true }); }
    };
    back.addEventListener("click", close);
    document.addEventListener("keydown", e => { if (e.key === "Escape" && cur !== "hr") close(); });
    document.addEventListener("click", e => { if (host.classList.contains("sheet") && e.target === document.body) close(); });

    // 1. the little phone in the top bar
    const mark = $(".mark-phone");
    if (mark) mark.addEventListener("click", e => { e.preventDefault(); e.stopPropagation(); open("previews"); });
    // 2. the ⚡ Hot reload tag, three quick clicks
    let clicks = [];
    bolt.addEventListener("click", () => {
      flash();
      const now = Date.now();
      clicks = clicks.filter(t => now - t < 1400).concat(now);
      if (clicks.length >= 3) { clicks = []; open("dart"); }
    });
    // 3. typing `flutter run` anywhere on the page
    let typed = "";
    document.addEventListener("keydown", e => {
      if (e.metaKey || e.ctrlKey || e.altKey || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable) return;
      if (e.key.length !== 1) return;
      typed = (typed + e.key.toLowerCase()).slice(-11);
      if (typed === "flutter run") { typed = ""; open("carousel"); }
    });
    // the hint reflects what this visitor already found
    if (found.length) {
      const left = 3 - found.length;
      q(".egg-hint").textContent = left ? `✦ ${left} more Flutter thing${left > 1 ? "s are" : " is"} hidden on this page.` : "✦ You found all 3 hidden Flutter demos.";
    }
  })();

  /* Live on the App Store: versions refreshed by the deploy workflow */
  (() => {
    const box = $("#hero-store");
    if (!box) return;
    fetch("assets/store.json", { cache: "no-cache" }).then(r => r.ok ? r.json() : null).then(st => {
      if (!st || !st.apps || !st.apps.length) return;
      box.innerHTML = `<span>Live on the App Store:</span> ${st.apps.map(a =>
        `<a href="https://apps.apple.com/in/app/id${esc(a.id)}" target="_blank" rel="noopener">${esc(a.name)} <em>v${esc(a.version)}</em></a>`).join("")}`;
      box.hidden = false;
    }).catch(() => {});
  })();

  $("#jobs").innerHTML = D.jobs.map(j => `
    <li>
      <span class="j-period">${esc(j.period)}</span>
      <div><h3>${esc(j.role)}, ${esc(j.company)}</h3><p>${esc(j.text)}</p></div>
    </li>`).join("");
  $("#skills").innerHTML = `<h3>Tools I use</h3><dl>${D.skills.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>`;
  $("#contact-links").innerHTML = D.contact.map(c => `<a href="${esc(c.href)}"${/^https?:/.test(c.href) ? ' target="_blank" rel="noopener"' : ""}>${esc(c.label)}</a>`).join("<br>");
})();
