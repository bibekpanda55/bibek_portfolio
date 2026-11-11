/* All page content lives here. Edit text freely; app.js renders it. */
window.PORTFOLIO = {
  contact: [
    { label: "github.com/bibekpanda55", href: "https://github.com/bibekpanda55" }
  ],

  projects: [
    {
      id: "innopay",
      name: "Innopay",
      kind: "Consumer payments app",
      company: "Innopay",
      period: "2025 to now",
      color: "var(--area-messenger)",
      summary: "Innopay is a payments app for India: bills, mobile recharges, bus tickets and digital gold, paid by UPI. I joined in 2025 and have built its Messenger, a large part of the home screen and much of the payment flow.",
      stack: ["Flutter", "GetX", "WebSockets", "SQLite", "Firebase", "Kotlin & Swift channels"],
      links: [
        { label: "App Store", href: "https://apps.apple.com/in/app/innopay-recharge-bills/id6467755491" },
        { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.innopay.payment.user" }
      ],
      gallery: { title: "From the store listing", images: [0, 1, 2, 3, 4, 5, 6, 7].map(i => `assets/img/innopay/store-${i}.webp`) },
      features: [
        {
          id: "messenger",
          title: "Messenger, built from the first screen",
          short: "Messenger",
          what: "Chat with any Innopay contact without leaving the payments app. I designed and wrote most of it, around 110 files, and it now ships to every user.",
          built: [
            "Real-time chat over WebSockets with sent, delivered and read ticks, sent to the server in batches",
            "Works offline: messages queue up and send when you reconnect, from a local SQLite store I migrated off Hive",
            "Contact sync runs off the main thread, de-duplicates numbers and finds who's on Innopay",
            "Swipe to reply, copy, delete for everyone, block, clear chat and contact-permission flows",
            "Status updates with view counts, promotional messages, and notifications that open the right chat"
          ],
          shots: ["chats", "chat", "status", "chat-menu", "unknown-number", "search"].map(n => `assets/img/innopay/messenger/${n}.webp`),
          shotAlts: [
            "Messenger chat list with unread counts and a verified Innopay conversation",
            "A conversation with photos, a date divider and the message input",
            "An Innopay status update in full screen with progress bars",
            "Chat menu with View profile, Clear chat and Block user",
            "A chat from a number not in your contacts, with Block and Add options",
            "Search across chats and contacts, with Invite for people not on Innopay"
          ],
          demo: "messenger",
          hint: "The phone plays a swipe-to-reply."
        },
        {
          id: "billshare",
          title: "Pay a bill a friend sends you",
          short: "Bills in chat",
          what: "Share an electricity or phone bill into a chat and the other person can pay it from the message itself.",
          built: [
            "Share any fetched bill from its biller page; it arrives in the chat as a card with a live Pay now button",
            "Before paying, the app re-checks the message, and bills that were edited or deleted show as no longer valid",
            "Pay now takes the friend straight into the normal Innopay checkout for that bill",
            "Messenger terms are checked before a first share, and people not yet on Messenger get an invite"
          ],
          shots: ["share-from-biller", "bill-in-chat", "expired-and-valid", "bill-history"].map(n => `assets/img/innopay/billshare/${n}.webp`),
          shotAlts: [
            "A fetched electricity bill on the biller page with a Share button",
            "Bill cards in a chat: one sent, one received with Pay Now",
            "Older shared bills marked as no longer valid, next to one that can still be paid",
            "A chat history of bills shared over several weeks"
          ],
          demo: "billshare",
          hint: "Tap Pay now in the chat."
        },
        {
          id: "home",
          title: "A home screen the business can redesign",
          short: "Server-driven home",
          what: "The home screen's layout comes from the server, so campaigns and new services go live without an app release.",
          built: [
            "A full-bleed carousel header: backgrounds cross-fade, artwork slides, each slide waits for its animation",
            "A search bar and profile header that float above the page and pick up a background as you scroll",
            "Staggered rows, uniform grids, configurable service tags and per-banner loading images",
            "Banner assets prefetched at launch, and the page refreshes after every payment"
          ],
          shots: ["home-recording.mp4", "services.webp", "bill-payment-finance.webp", "finance-banner.webp", "others.webp"].map(n => `assets/img/innopay/home/${n}`),
          shotAlts: [
            "Screen recording of the home header cycling through campaign slides, with the search hint and centre button changing",
            "Home with Popular services, a credit card bill reminder and the Recharge section",
            "Bill Payment and Finance sections, with a New tag on Personal Loan",
            "Finance cards above a promotional banner carousel",
            "The Others grid with sixteen services"
          ],
          demo: "carousel",
          before: "carousel",
          hint: "The header changes slides on its own."
        },
        {
          id: "plans",
          title: "Finding the right recharge plan",
          short: "Recharge plans",
          what: "Prepaid plans in a sheet you can search by price, data or validity, instead of one long list.",
          built: [
            "A draggable sheet that snaps between 40% and full height based on how fast you swipe",
            "Search across all plans, with swipeable category tabs",
            "When nothing matches, the closest plans are suggested instead of an empty screen",
            "Redesigned plan cards with validity and data at a glance"
          ],
          demo: "plans",
          before: "plans",
          hint: "Type in the search bar. Try 299, 2GB, or a price with no plan."
        },
        {
          id: "receipt",
          title: "A payment receipt that leads somewhere",
          short: "Payment receipt",
          what: "After paying, people see what they paid and a natural next step, instead of a dead end.",
          built: [
            "Rebuilt the confirmation screen with the receipt, top services and a Popular badge",
            "A rotating offer strip where only the text slides and the icon and dots stay put",
            "Ad and referral slots driven by configuration",
            "First-payment and payment-initiated analytics events"
          ],
          demo: "receipt",
          before: "receipt",
          hint: "Watch the offer strip."
        },
        {
          id: "bus",
          title: "Bus tickets without leaving the app",
          short: "Bus tickets",
          what: "Bus booking is a partner web flow. I built the native shell around it so it feels like part of Innopay.",
          built: [
            "Single sign-on into the booking site, refreshed if a link reopens the screen",
            "Hands UPI payments to the user's UPI app and closes the gateway when it returns",
            "Downloads tickets as PDFs named from the server, and opens phone, mail and map links outside",
            "Recovers from load errors and from iOS killing the web process in the background"
          ],
          demo: "bus",
          hint: "The phone books and pays for a ticket."
        }
      ],
      underTheHood: {
        title: "Also on Innopay",
        items: [
          ["Android 16 ready", "Edge-to-edge layouts and system insets everywhere for target SDK 36."],
          ["iOS on Swift Package Manager", "Moved native dependencies off CocoaPods."],
          ["In-app updates", "Prompts that check the platform and preload their animation."],
          ["Device security", "Root and jailbreak checks at launch and on resume."],
          ["Deep links", "Cold-start routing and iOS universal links that land on the right screen."],
          ["Steadier taps and networks", "A double-tap guard and a no-internet sheet that dismisses itself when you're back online."]
        ]
      }
    },

    {
      id: "business",
      name: "Innopay Business",
      kind: "Merchant app",
      company: "Innopay",
      period: "2025",
      color: "var(--area-home)",
      summary: "The app shopkeepers use to accept Innopay payments and track their money. In 2025 I rebuilt most of its merchant-facing screens and the plumbing behind them.",
      stack: ["Flutter", "Riverpod", "WebSockets", "Isolates", "Firebase Messaging"],
      features: [
        {
          id: "merchant",
          title: "Payments land on screen as they happen",
          short: "Live payments",
          what: "A merchant sees each payment the moment it arrives, alongside settlements and a QR code to show customers.",
          built: [
            "Live transactions over WebSockets on top of a local cache, so the list loads instantly",
            "Large histories decoded in a background isolate so scrolling stays smooth",
            "Transaction and settlement views with filters, sorting and a custom date picker",
            "Shop QR codes you can share, download, or create for a fixed amount",
            "Phone and OTP login with SMS autofill, a resend timer and session-expiry handling",
            "Background notifications on Android and iOS through native channels, with a sound toggle",
            "Moved the app's state management from GetX to Riverpod"
          ],
          demo: "merchant",
          hint: "A payment arrives every few seconds."
        }
      ]
    },

    {
      id: "tvmax",
      name: "TVMAX",
      kind: "IPTV subscriber app",
      company: "Innopay, for Innolens Media",
      period: "2026",
      color: "var(--area-app)",
      summary: "TVMAX subscribers use this app to manage their channel packs and set-top boxes, and to pay for them. I started the app and wrote most of it.",
      stack: ["Flutter", "Riverpod", "go_router", "Dio", "UPI intents", "Firebase"],
      links: [
        { label: "App Store", href: "https://apps.apple.com/in/app/tvmax-customer-app/id6772130411" },
        { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.tvmax.customer" }
      ],
      gallery: { title: "From the store listing", images: [0, 1, 2, 3, 4].map(i => `assets/img/tvmax/store-${i}.webp`) },
      features: [
        {
          id: "tvmax",
          title: "Pick your channels, pay with UPI",
          short: "Plans and payments",
          what: "Choose channel packs, see the bill, pay with any UPI app and get back to watching.",
          built: [
            "Feature-first architecture on Riverpod, go_router and Dio, from the first commit",
            "Plan management across tabs that keeps your picks and requires a base plan",
            "Checkout with a bill estimate, UPI app payments on Android and iOS, and status checks once you return",
            "Add a set-top box by scanning its QR code, gated on GPS location",
            "Push notifications that open the related transaction, with refunds shown clearly",
            "OTP login with autofill, secure storage and Crashlytics"
          ],
          shots: ["assets/img/tvmax/home.webp", "assets/img/tvmax/channels.webp"],
          shotAlts: ["TVMAX home with the set-top box and channel categories", "TVMAX channel list with search and category filters"],
          demo: "tvmax",
          hint: "Try it runs a full purchase."
        }
      ]
    },

    {
      id: "vinegypsy",
      name: "Vine Gypsy",
      kind: "Wine tasting-room guide",
      company: "Zemusi, for Vine Gypsy LLC",
      period: "2023 to 2024",
      color: "var(--area-payments)",
      summary: "Vine Gypsy helps people find wine tasting rooms worth visiting, with reviews from certified wine professionals and other visitors. I was its only developer: I built the app from the first commit to its App Store and Play Store launch in 2024, then added tablet and web versions.",
      stack: ["Flutter", "Firebase", "Cloud Functions", "Google Maps", "Riverpod", "go_router"],
      links: [
        { label: "App Store", href: "https://apps.apple.com/in/app/vine-gypsy/id6478381545" },
        { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.vinegypsy.app" }
      ],
      gallery: { title: "From the store listing", images: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => `assets/img/vinegypsy/store-${i}.webp`) },
      features: [
        {
          id: "vine-discover",
          title: "Find a tasting room worth the drive",
          short: "Map and filters",
          what: "Browse tasting rooms on a map or a list and narrow them down to the kind of visit you want.",
          built: [
            "Google Maps with tasting-room markers, an info sheet and a slide-up list",
            "Filters for rating, wine quality, price, food pairing and service",
            "Search by name or address with Google Places",
            "Paginated lists with cached images, after I tracked down an image-cache memory leak"
          ],
          shots: ["assets/img/vinegypsy/map.webp", "assets/img/vinegypsy/room.webp"],
          shotAlts: ["Map of tasting rooms with Food, Price and Rating filters","A tasting room page with photos"]
        },
        {
          id: "vine-review",
          title: "Reviews you can trust",
          short: "Guided reviews",
          what: "A step-by-step review that asks the same questions of every visit, so ratings mean the same thing everywhere.",
          built: [
            "A review form whose questions come from the backend, so they change without an app release, with required ratings checked before you submit",
            "Photos compressed on the phone before upload to Firebase Storage",
            "Certified wine professionals upload a certificate; admins get an approval email",
            "Reviews can be edited later, and ratings roll up into each room's score"
          ],
          shots: ["assets/img/vinegypsy/room-reviews.webp", "assets/img/vinegypsy/my-reviews.webp"],
          shotAlts: ["Reviews on a tasting room, with certified reviewers","Your reviews, with scores for each question"]
        },
        {
          id: "vine-community",
          title: "Follow people whose taste you trust",
          short: "Community",
          what: "Follow reviewers, see who's most active, and hear about it when people you follow review or visit somewhere new.",
          built: [
            "Followers, following and a top-reviewers list ranked by reviews",
            "Public profiles with privacy controls and a report option",
            "Profile links you can share that open in the app on Android, iOS and the web",
            "Notifications sent by Firebase Cloud Functions when someone you follow reviews, visits or follows you"
          ],
          shots: ["assets/img/vinegypsy/users.webp", "assets/img/vinegypsy/profile.webp"],
          shotAlts: ["All users with follow buttons and review counts","A profile with followers, following, visits and reviews"]
        },
        {
          id: "vine-owner",
          title: "Tools for tasting-room owners",
          short: "For owners",
          what: "Owners can claim their tasting room and keep it up to date, and visitors can keep notes on what they tasted.",
          built: [
            "Claim a tasting room, with a pending state until an admin approves it",
            "Edit details, opening hours, the wine list and events",
            "Tasting notes for each wine, grouped by visit",
            "Wishlist, favourites, visited and membership lists, plus designated-driver tours"
          ],
          shots: ["assets/img/vinegypsy/add-room.webp", "assets/img/vinegypsy/favourites.webp"],
          shotAlts: ["Add your tasting room","Favourites with average ratings"]
        }
      ],
      underTheHood: {
        title: "Also on Vine Gypsy",
        items: [
          ["Sign-in", "Email, Google and Sign in with Apple, guest browsing and account deletion."],
          ["Tablet and landscape", "Responsive layouts for tablets and rotating carousels."],
          ["Runs on the web", "A Progressive Web App build from the same codebase."],
          ["Releases", "Play Store and App Store builds, signing and Crashlytics."]
        ]
      }
    },
    {
      id: "finsco",
      name: "Finsco",
      kind: "Investing app for stocks, crypto and ETFs",
      company: "Zemusi",
      period: "2022 to 2023",
      color: "var(--area-messenger)",
      summary: "Finsco (first called Rumo) lets investors follow stocks, crypto and ETFs in one place, with a score and report for each holding, curated picks and a community feed. I was the app's main developer, writing most of its screens and integrations.",
      stack: ["Flutter", "Provider", "Plaid", "Firebase", "RevenueCat", "fl_chart"],
      gallery: { title: "More screens", images: ["start", "portfolio-graph", "ideas-stocks", "ideas-crypto", "stock-holdings", "ticker-details", "resources"].map(n => `assets/img/finsco/${n}.webp`) },
      features: [
        {
          id: "fin-portfolio",
          title: "Your whole portfolio in one place",
          short: "Portfolio",
          what: "Link a brokerage account or add holdings by hand, and see what everything is worth today.",
          built: [
            "Brokerage linking with Plaid on Android and iOS",
            "A manual portfolio for accounts Plaid can't reach",
            "Portfolio valuation, holdings and allocation, calculated in the background",
            "Performance charts that redraw for each time range"
          ],
          shots: ["assets/img/finsco/portfolio-score.webp", "assets/img/finsco/crypto-holdings.webp"],
          shotAlts: ["Robinhood portfolio worth $35,478.65 with a portfolio score of 82","Crypto and ETF holdings with asset allocation"]
        },
        {
          id: "fin-research",
          title: "A score and a report for every ticker",
          short: "Research",
          what: "Each stock, coin and ETF gets a score and a short report, so people can judge it at a glance before going deeper.",
          built: [
            "Score and report screens for stocks, crypto and ETFs, driven by live ticker data",
            "Watchlists you can add to from any report",
            "Ticker search with suggestions as you type",
            "Curated stock and crypto picks with scores, news and a resource center"
          ],
          shots: ["assets/img/finsco/ticker-score.webp", "assets/img/finsco/watchlist.webp"],
          shotAlts: ["Alphabet report with price chart and a Finscore of 84","A watchlist with scores and price changes"]
        },
        {
          id: "fin-community",
          title: "Posts and alerts from the community",
          short: "Community",
          what: "A feed where investors post, comment, like and follow each other, plus price alerts on the tickers they care about.",
          built: [
            "Posts with images, comments and likes, plus a create-post flow",
            "Community profiles with follow and follower lists",
            "Price alerts and a notifications screen, with community rules",
            "Push notifications that open the related post"
          ],
          shots: ["assets/img/finsco/feed.webp", "assets/img/finsco/alerts.webp"],
          shotAlts: ["Home with a feed of community posts","Price alerts and notifications"]
        }
      ],
      underTheHood: {
        title: "Also on Finsco",
        items: [
          ["Sign-in", "Email with OTP verification and Sign in with Apple, on Firebase Auth."],
          ["Biometric unlock", "Face ID and fingerprint to open the app."],
          ["Subscriptions", "In-app subscriptions on both stores through RevenueCat."],
          ["Offline-friendly", "Local caching with Hive for the data people check most."]
        ]
      }
    }
  ],

  jobs: [
    {
      company: "Innopay",
      role: "Flutter engineer",
      period: "Apr 2025 to now",
      text: "Messenger, home, payments and platform work on the Innopay consumer app; merchant flows on Innopay Business; and the TVMAX subscriber app for a client."
    },
    {
      company: "Zemusi",
      role: "Flutter developer",
      period: "2022 to early 2025",
      text: "Client apps in Flutter. I was the main developer of Finsco, an investing app, and built Vine Gypsy, a wine tasting-room guide, on my own from the first commit to launch."
    }
  ],

  skills: [
    ["Flutter & Dart", "GetX, Riverpod, go_router, isolates, custom animations"],
    ["Native", "Kotlin and Swift method channels, Android SDK upgrades, Xcode, Swift Package Manager"],
    ["Data", "REST with Dio, WebSockets, SQLite, Hive, secure storage, offline sync"],
    ["Payments", "UPI intent flows, payment gateways, bill payments"],
    ["Shipping", "Firebase Messaging, Crashlytics and Analytics, deep links, in-app updates, Play Store and App Store releases"]
  ]
};
