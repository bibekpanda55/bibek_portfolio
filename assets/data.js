/* Content for the portfolio. Commit facts come from innopay-user-app-fl's git history. */
window.PORTFOLIO = {
  stats: { total: 199, files: 803, first: "2025-06-03", last: "2026-11-04" },

  areas: {
    Messenger: "var(--area-messenger)",
    Payments: "var(--area-payments)",
    Home: "var(--area-home)",
    Platform: "var(--area-platform)",
    "App-wide": "var(--area-app)"
  },

  cases: [
    {
      id: "carousel",
      area: "Home",
      title: "A home header that moves",
      date: "17 Aug 2026",
      hash: "448811fe7",
      stat: "6 files, +606 −21",
      before: "The home header was one static image. Marketing could change the picture, but not run a campaign of several slides, and the categories sheet sat flat underneath it.",
      after: "A new imageCarousel header type: backgrounds cross-fade in place while the foreground art slides, auto-scroll waits for each slide's Lottie to finish, and the categories sheet lifts 50px to overlap the header's edge. All of it is driven by the backend.",
      hint: "The After screen runs on its own. Each slide waits for its animation, then cross-fades.",
      replay: true,
      code: {
        file: "lib/ui/screens/landing/home/widgets/image_carousel_banner_widget.dart",
        diff: `@@ new file, 550 lines @@
+  /// Backgrounds sit in place and cross-fade as the swipe progresses.
+  Widget _backgroundCrossFade() {
+    return AnimatedBuilder(
+      animation: _pageController,
+      builder: (context, _) {
+        final fromPage = _currentPage.floor();
+        final t = (_currentPage - fromPage).clamp(0.0, 1.0).toDouble();
+        return Stack(
+          fit: StackFit.expand,
+          children: [
+            if (t < 1) _background(fromPage, opacity: 1 - t),
+            if (t > 0) _background(fromPage + 1, opacity: t),
+          ],
+        );
+      },
+    );
+  }
@@ innopay_home_screen.dart @@
-  decoration: const BoxDecoration(
-    color: Color(0xffFAFAFA),
+  // Pulls the categories sheet up so it overlaps the header's bottom edge.
+  transform: Matrix4.translationValues(0, isImageCarousel ? -50 : 0, 0),
+  decoration: BoxDecoration(
+    color: isImageCarousel ? Colors.transparent : Colors.white,
@@ home_screen_utils.dart @@
-enum HeaderType { image, background, banner, defaultType }
+enum HeaderType { image, background, banner, imageCarousel, defaultType }`
      }
    },
    {
      id: "sticky",
      area: "Home",
      title: "Search that stays in reach",
      date: "12 Feb 2026",
      hash: "fc1a4abe6",
      stat: "25 files, +572 −453",
      before: "The search bar and profile icon scrolled away with the header, so finding a biller meant scrolling all the way back to the top.",
      after: "The search bar and profile header now float above the page. They start transparent over the banner, then pick up a white background and soft shadow at the exact point the header slides beneath them.",
      hint: "Scroll inside both phones to compare.",
      replay: false,
      code: {
        file: "lib/ui/screens/landing/home/innopay_home_screen.dart",
        diff: `@@ -560,12 +571,34 @@
+  // Sticky header height = SafeArea top + vertical padding (10+10) + card height (48)
+  double get _stickyHeaderHeight => MediaQuery.of(context).padding.top + 68;
+
+    // Subtract sticky header height so shadow appears when header goes behind sticky bar
+    return (imageHeight - _stickyHeaderHeight).clamp(0.0, double.infinity);
@@
+  // Sticky Header with background on scroll
+  ValueListenableBuilder<double>(
+    valueListenable: _scrollOffset,
+    builder: (context, scrollOffset, child) {
+      final isScrolled = scrollOffset > _headerCollapseThreshold;
+      return AnimatedContainer(
+        duration: const Duration(milliseconds: 200),
+        decoration: BoxDecoration(
+          color: isScrolled ? Colors.white : Colors.transparent,
+          boxShadow: isScrolled
+              ? [BoxShadow(color: Colors.black.withOpacity(0.1),
+                  blurRadius: 10, offset: const Offset(0, 2))]
+              : [],
+        ),
-        SafeArea(
+        child: SafeArea(
+          bottom: false,`
      }
    },
    {
      id: "plans",
      area: "Payments",
      title: "Finding the right recharge plan",
      date: "29 Jul 2026",
      hash: "8ebb62e37",
      stat: "9 files, +999 −148",
      before: "Prepaid plans were one long list per category. There was no way to search by price or data, and an empty category simply showed nothing.",
      after: "Plans moved into a draggable sheet that snaps between 40% and full height based on swipe speed, with a search bar, swipeable category tabs and clearer plan cards. When nothing matches, it says so and suggests similar plans.",
      hint: "Type in the After phone's search bar. Try 299, 2GB, or something with no match.",
      replay: false,
      code: {
        file: "lib/ui/screens/pre_and_post_bill_payments/recharge/recharge_plans_sheet.dart",
        diff: `@@ new draggable sheet @@
+        minChildSize: 0.4,
+        maxChildSize: maxSize,
@@
+  onVerticalDragEnd: (details) {
+    if (draggableScrollableController.isAttached) {
+      final velocity = details.primaryVelocity ?? 0;
+      final currentSize = draggableScrollableController.size;
+      // Snap to full or min based on velocity or position
+      if (velocity < -500 ||
+          (velocity >= -500 && velocity <= 500 && currentSize > 0.7)) {
+        // Swipe up fast or already past 70% - snap to full
+        draggableScrollableController.animateTo(1.0,
+            duration: const Duration(milliseconds: 200), curve: Curves.easeOut);
+      } else if (velocity > 500 ||
+          (velocity >= -500 && velocity <= 500 && currentSize <= 0.7)) {
+        // Swipe down fast or below 70% - snap to min
+        draggableScrollableController.animateTo(0.4,
+            duration: const Duration(milliseconds: 200), curve: Curves.easeOut);
+      }
+    }
+  },`
      }
    },
    {
      id: "confirmation",
      area: "Payments",
      title: "A payment receipt that leads somewhere",
      date: "21 Jan 2026",
      hash: "11914cc9d",
      stat: "1 file, +247 −77",
      before: "After paying, people saw a tick, the amount and a list of details. The only way forward was Done, so the screen was a dead end.",
      after: "The revamped confirmation keeps the receipt but adds a scrollable row of top services with a Popular badge on the first one, and a rotating offer strip whose icon and page dots stay fixed while only the text slides.",
      hint: "Watch the offer strip at the bottom of the After screen.",
      replay: false,
      code: {
        file: "lib/ui/screens/pre_and_post_bill_payments/payment_confirmation_screen_v2.dart",
        diff: `@@ -560,7 +590,10 @@
-  Widget _buildServiceItem(TopService service) {
+  Widget _buildServiceItem(TopService service, int index) {
+    // Show "Popular" badge only on first item
+    final showBadge = index == 0;
+
     return GestureDetector(
@@ -576,50 +607,189 @@
       child: SizedBox(
-        width: 70,
+        width: 80,
@@
+          // Percentage icon in circle (constant - stays in place)
+          // Carousel with sliding text only
+          // Pagination dots (constant - outside carousel, stays in place)`
      }
    },
    {
      id: "reply",
      area: "Messenger",
      title: "Swipe a message to reply",
      date: "12 Aug 2025",
      hash: "af61b7728",
      stat: "20 files, +607 −178",
      before: "In Messenger you could answer the last message, but there was no way to point at an earlier one, so conversations got confusing fast.",
      after: "Swipe any bubble to the right to reply. A preview with the sender's name sits above the input, the sent message carries the quoted bubble, and the reply id travels to the server and the local cache.",
      hint: "The After phone plays a swipe-to-reply on a loop.",
      replay: true,
      code: {
        file: "lib/features/messenger/components/chat_input_bar.dart",
        diff: `@@ new: swipe_message_widget.dart @@
+class _SwipeableChatMessageState extends State<SwipeableChatMessage>
+    with SingleTickerProviderStateMixin {
+  late AnimationController _controller;
+  late Animation<Offset> _animation;
+  double _dragOffset = 0.0;
@@ chat_input_bar.dart @@
+    String? replyTo;
+    if (messengerController.replyToMessage.value != null) {
+      replyTo = messengerController.replyToMessage.value!.id!;
+      messengerController.replyToMessage.value = null;
+    }
+    await widget.onSendButtonPressed(text, replyTo);
@@ message_card.dart @@
+    final replyMessage = localMessageController
+        .conversationMessages
+        .firstWhereOrNull((element) =>
+            message.metadata?.replyTo != null &&
+            element.id == message.metadata?.replyTo);`
      }
    },
    {
      id: "entry",
      area: "Messenger",
      title: "Messages that arrive, not appear",
      date: "23 Sep 2026",
      hash: "b3f358ba0",
      stat: "6 files, +132 −78",
      before: "New messages popped into the list in a single frame. Everything above jumped up, and it was easy to lose your place mid-conversation.",
      after: "A just-arrived message now grows its slot over 300ms, pushing earlier messages up smoothly. Only messages from the last three seconds animate, so scrolling back through history stays still.",
      hint: "Both phones receive the same messages. Watch how the older bubbles move.",
      replay: true,
      code: {
        file: "lib/features/messenger/components/message_entry_animation.dart",
        diff: `@@ new file, 60 lines @@
+/// Slides a just-arrived message up into place, the way a chat app does when
+/// you hit send. Older messages build without animating, so scrolling back
+/// through history — which rebuilds their cards — stays still.
+class MessageEntryAnimation extends StatefulWidget {
+  static const _newMessageWindow = Duration(seconds: 3);
+
+  bool get _isNew =>
+      DateTime.now().difference(sentAt.toLocal()) < _newMessageWindow;
@@
+    if (widget._isNew) {
+      _controller = AnimationController(
+        vsync: this,
+        duration: const Duration(milliseconds: 300),
+      )..forward();
+    }
@@
+    // Growing the slot is what pushes the earlier messages up; the slide alone
+    // only moves the bubble inside space the list already made for it.
+    return SizeTransition(
+      sizeFactor: curve,
+      alignment: Alignment.topRight,
+      child: widget.child,
+    );`
      }
    },
    {
      id: "offline",
      area: "App-wide",
      title: "Going offline, gracefully",
      date: "29 Jul 2026",
      hash: "c66e5f8d3",
      stat: "9 files, +229 −142",
      before: "Losing signal showed a snackbar that vanished after a few seconds. Every tap fired another one, and nothing told you when the connection came back.",
      after: "A single floating sheet explains the problem and stays until it's useful to leave: it listens to the connection and dismisses itself the moment you're back online. Taps are debounced so it can't stack.",
      hint: "Tap Pay in either phone while offline, then wait for the connection to return.",
      replay: true,
      code: {
        file: "lib/components/no_internet_bottom_sheet.dart",
        diff: `@@ new file @@
+class _NoInternetBottomSheetState extends State<NoInternetBottomSheet> {
+  StreamSubscription<DataConnectionStatus>? _statusSubscription;
+
+  @override
+  void initState() {
+    super.initState();
+    _statusSubscription =
+        DataConnectionChecker().onStatusChange.listen((status) {
+      if (status == DataConnectionStatus.connected && mounted) {
+        Get.back();
+      }
+    });
+    DataConnectionChecker().startMonitoring();
+  }
@@ categories_section_widget.dart @@
-        context.showNetworkAppSnackbar(
-            message: "Please check your internet connectivity");
+        // ScaffoldMessenger.of(context).clearSnackBars();
+        // context.showNetworkAppSnackbar(...)`
      }
    }
  ],

  fixes: [
    {
      area: "Messenger",
      title: "Contact sync stopped running out of memory",
      why: "On phones with thousands of contacts, sync loaded photos, notes and addresses it never used. Asking for names and numbers only fixed the crash in four lines.",
      date: "7 Oct 2026",
      hash: "b2154bda2",
      file: "lib/features/messenger/helpers/messenger_helper.dart",
      diff: `@@ -190,7 +190,10 @@ class MessengerHelper {
   static Future<List<contact.Contact>> fetchContacts() async {
     List<contact.Contact> contacts = await contact.FlutterContacts.getAll(
-      properties: contact.ContactProperties.all,
+      properties: const {
+        contact.ContactProperty.name,
+        contact.ContactProperty.phone,
+      },
     );
     return contacts;
   }`
    },
    {
      area: "App-wide",
      title: "One tap opens one screen",
      why: "Two quick taps, or two fingers in the same frame, could push the same screen twice. A tiny leading-edge guard blocks it before the route stack even updates.",
      date: "6 Aug 2026",
      hash: "8b06f2674",
      file: "lib/utils/tap_guard.dart",
      diff: `@@ new file @@
+/// Global leading-edge guard against rapid duplicate taps that push the same
+/// screen twice. The first tap is allowed; any tap within [_windowMs] is
+/// ignored. Unlike GetX's \`preventDuplicates\`, this also blocks two fingers
+/// tapping in the same frame (before the route stack updates).
+abstract class TapGuard {
+  static int _lastMs = 0;
+  static const int _windowMs = 600;
+
+  static bool allow() {
+    final now = DateTime.now().millisecondsSinceEpoch;
+    if (now - _lastMs < _windowMs) return false;
+    _lastMs = now;
+    return true;
+  }
+}`
    },
    {
      area: "Messenger",
      title: "Failed messages say they failed",
      why: "A message that never reached the server still showed a clock and later looked sent. Now it gets its own failed state and a red marker, and the send call returns the real error.",
      date: "1 Oct 2026",
      hash: "170253697",
      file: "lib/features/messenger/components/msg_status_tick_widget.dart",
      diff: `@@
-enum MsgStatus { pending, sent, delivered, read }
+enum MsgStatus { pending, failed, sent, delivered, read }
@@
-    message.id == null && message.msgStatusList.isEmpty
-        ? MsgStatus.pending
+    message.id == null
+        ? message.msgStatusList.isEmpty
+            ? MsgStatus.pending
+            : MsgStatus.failed
@@
-  Future<bool> sendMessage(
+  Future<Either<MessageResponse, MessengerErrorModel>> sendMessage(`
    },
    {
      area: "Messenger",
      title: "Chats recover after a reconnect",
      why: "When the websocket dropped and came back, the server forgot you were looking at a chat, so read receipts stopped. The open chat now re-activates itself on reconnect.",
      date: "7 Oct 2026",
      hash: "c5d45f3c3",
      file: "lib/features/messenger/controller/messenger_web_socket_controller.dart",
      diff: `@@ -269,6 +270,21 @@
+  Future<void> _reactivateOpenChat() async {
+    final convo = localMessengerController.currentConversationLocal.value;
+    final participant = MsgChatHelper.participantUser;
+    if (Get.currentRoute != AppMacros.MESSENGER_CHAT_SCREEN_ROUTE ||
+        messengerController.appPaused.value ||
+        convo.isReadOnly ||
+        (convo.isBlocked ?? false) ||
+        participant.id == -1) {
+      return;
+    }
+    await messengerController.setChatStatus(
+        setChatStatusRequest:
+            SetChatStatusRequest(vieweeUserId: participant.id, isActive: 1));
+  }
@@ -294,6 +310,7 @@
         isConnected.value=true;
         _startStabilityTimer();
+        await _reactivateOpenChat();`
    },
    {
      area: "Messenger",
      title: "Moved the chat cache from Hive to SQLite",
      why: "Messenger's offline store moved from Hive boxes to six SQLite tables, with a one-time migration that carries existing users' chats across on first launch and a written migration guide for the team.",
      date: "12 Jun 2026",
      hash: "8454cd666",
      file: "25 files, +1,710 −429",
      diff: `@@ summary @@
+          CREATE TABLE conversations (...)
+          CREATE TABLE messages (...)
+          CREATE TABLE contacts (...)
+          CREATE TABLE users (...)
+          CREATE TABLE user_data (...)
+          CREATE TABLE server_sync (...)
@@ messenger_db_migration.dart @@
+/// One-time Hive → sqflite copy, guarded by the
+/// \`messenger_migrated_to_sqflite\` flag in SharedPreferences.
+class MessengerDbMigration {`
    },
    {
      area: "Platform",
      title: "iOS builds moved to Swift Package Manager",
      why: "Moved the iOS project's native dependencies from CocoaPods to Swift Package Manager, Flutter's direction for iOS, and the change removed more configuration than it added.",
      date: "29 Sep 2026",
      hash: "491141de9",
      file: "ios/Runner.xcodeproj/project.pbxproj and 9 more",
      diff: `@@ summary @@
- Podfile-driven dependency setup
+ Swift Package Manager integration in the Xcode project
  10 files changed, +397 −632`
    },
    {
      area: "Platform",
      title: "Ready for Android 16's edge-to-edge",
      why: "Targeting SDK 36 makes edge-to-edge mandatory, which pushed buttons under the navigation bar. Insets now come from the system everywhere, with the status bar transparent.",
      date: "21 Aug 2026",
      hash: "1b2a87541",
      file: "8 files, +27 −17",
      diff: `@@ main.dart @@
+  await SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp]);
+  // Explicit edge-to-edge so behavior matches Android 16 (target SDK 36) on all OS versions.
+  SystemChrome.setEnabledSystemUIMode(SystemUiMode.edgeToEdge);
@@ bottom sheets @@
-      padding: EdgeInsets.only(top: widget.paddingTop, bottom: MediaQuery.viewInsetsOf(context).bottom),
+      // max(): keyboard inset when open, nav-bar inset otherwise (edge-to-edge).
+      padding: EdgeInsets.only(
+        top: widget.paddingTop,
+        bottom: max(MediaQuery.viewInsetsOf(context).bottom,
+            MediaQuery.paddingOf(context).bottom),
+      ),`
    }
  ],

  months: [
    {"m":"2025-06","App-wide":4,"Platform":2,"Messenger":4},
    {"m":"2025-07","Messenger":7},
    {"m":"2025-08","Messenger":7,"Payments":1},
    {"m":"2025-09","Messenger":6,"Platform":1,"Payments":1},
    {"m":"2025-10","Payments":1,"Messenger":3},
    {"m":"2025-11","Messenger":2},
    {"m":"2025-12","Messenger":2,"App-wide":1,"Platform":1},
    {"m":"2026-01","Messenger":1,"App-wide":1,"Payments":2},
    {"m":"2026-02","Messenger":8,"Platform":1,"Payments":12,"App-wide":1},
    {"m":"2026-03","Platform":2,"Messenger":4,"Home":3,"Payments":3},
    {"m":"2026-04","Payments":1,"Home":2,"App-wide":1,"Messenger":1},
    {"m":"2026-05","Payments":3,"Platform":4,"Messenger":2},
    {"m":"2026-06","Messenger":1},
    {"m":"2026-07","Platform":2,"Payments":7,"Home":2,"App-wide":2,"Messenger":1},
    {"m":"2026-08","Platform":8,"Payments":11,"Home":7,"Messenger":4,"App-wide":6},
    {"m":"2026-09","Messenger":6,"Platform":5,"Payments":4,"App-wide":4,"Home":2},
    {"m":"2026-10","App-wide":4,"Platform":5,"Home":3,"Payments":6,"Messenger":12},
    {"m":"2026-11","Payments":2}
  ],

  flags: {
    "2025-06": "Messenger v1",
    "2026-02": "Payments revamp",
    "2026-08": "New home"
  }
};
