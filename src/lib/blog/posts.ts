import { images } from "@/lib/images";

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  /** Meta description (~150–160 chars). */
  description: string;
  excerpt: string;
  author: string;
  /** Display date, e.g. "Jun 3, 2026". */
  date: string;
  /** ISO date for sitemap. */
  publishedAt: string;
  readTime: string;
  image: string;
  imageAlt: string;
  category: "Communities" | "Families";
  body: BlogBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "peace-of-mind-for-families-far-from-independent-living",
    title:
      "Peace of Mind for Families Who Live Far From Independent Living",
    description:
      "How long-distance families stay close when a loved one lives in independent living—and how short CareNow visits create real peace of mind between trips.",
    excerpt:
      "You can love someone from miles away and still feel close. Here is how families stay connected—and sleep better—when a parent lives in independent living.",
    author: "TLC CareNow",
    date: "Aug 14, 2026",
    publishedAt: "2026-08-14",
    readTime: "6 min read",
    image: images.blogGuides.stayConnected,
    imageAlt:
      "Senior woman walking arm-in-arm with a caregiver in a bright independent living community",
    category: "Families",
    body: [
      {
        type: "p",
        text: "Plenty of adult children do not live near their parent’s independent living community. Work, kids, and geography get in the way. That does not mean love is missing. It does mean the quiet stretch between visits can feel heavy: Did Mom eat today? Is Dad going to the lobby? Who is there if the afternoon feels long?",
      },
      {
        type: "p",
        text: "Peace of mind is not the same as being in the building every day. It is knowing that help can show up when you cannot—and that your loved one’s week still has people, plans, and dignity in it. Families who use TLC CareNow often describe that feeling as the difference between worrying in the dark and staying connected with a plan.",
      },
      {
        type: "h2",
        text: "What long-distance love actually needs",
      },
      {
        type: "p",
        text: "Weekend trips matter. So do phone calls. What many families also need is a third thing: a way to support the ordinary Tuesday when they are three states away. Not a crisis call. Not a guilt spiral. Just a reliable way to make sure the day still works.",
      },
      {
        type: "ul",
        items: [
          "Visibility: knowing help was booked and confirmed—not guessing from a short phone call",
          "Flexibility: support sized to the moment, not a half-day block that feels like overkill",
          "Partnership: community staff who can book on a resident’s behalf when needed",
          "Quality time later: when you do visit, you can be family—not the only unpaid care team",
        ],
      },
      {
        type: "h2",
        text: "How CareNow helps when you cannot be there",
      },
      {
        type: "p",
        text: "In partner communities, families sign in at app.tlccarenow.com and book short visits from wherever they are. A morning assist before breakfast. Company for an afternoon that tends to feel lonely. Help after an appointment day. Staff can also book when your loved one is tired of asking. Visits are timed and confirmed, so you are not waiting for a vague “someone will stop by.”",
      },
      {
        type: "p",
        text: "That structure is what creates peace of mind. You still call. You still visit when you can. Between trips, you are not inventing a care plan from a group text.",
      },
      {
        type: "h2",
        text: "What changes for families",
      },
      {
        type: "ul",
        items: [
          "Fewer 10 p.m. worry loops about whether the day went okay",
          "Shared access so siblings can take turns booking instead of one person carrying it alone",
          "Better visits in person—because chores and catch-up care are not the only agenda",
          "A calmer relationship with the community: you are collaborating, not only calling when something is wrong",
        ],
      },
      {
        type: "h2",
        text: "What changes for your loved one",
      },
      {
        type: "p",
        text: "Independence stays theirs. They are not “being managed from afar.” They are getting practical help that protects the life they chose—while knowing their family is still in the loop. Many residents like that the visit is scheduled and clear. It feels respectful, not like a surprise inspection.",
      },
      {
        type: "h2",
        text: "Love that travels well",
      },
      {
        type: "p",
        text: "Living far away does not make you a less devoted son or daughter. It just means closeness needs tools. Short, bookable CareNow visits are one of those tools: a way to show up on hard Tuesdays, keep your loved one’s week fuller, and give yourself permission to sleep.",
      },
      {
        type: "p",
        text: "If their community already uses CareNow, sign in at app.tlccarenow.com to set up access and book support. If you’re not sure whether CareNow is available in their building, ask the community office or reach us through our contact page—we’re glad to help you find the next step.",
      },
    ],
  },
  {
    slug: "how-tlc-carenow-is-changing-lives-in-independent-senior-communities",
    title:
      "How TLC CareNow Is Changing Lives in Independent Senior Communities",
    description:
      "How on-demand CareNow visits are changing daily life in independent living—for residents, families, and the teams who keep communities running.",
    excerpt:
      "The biggest changes in independent living rarely look dramatic. They look like breakfast eaten, a shower taken, a family who can sleep, and a community that can say yes to help.",
    author: "TLC CareNow",
    date: "Aug 8, 2026",
    publishedAt: "2026-08-08",
    readTime: "7 min read",
    image: images.blogGuides.changingLives,
    imageAlt:
      "Caregiver and senior resident talking together in a bright independent living community",
    category: "Communities",
    body: [
      {
        type: "p",
        text: "Independent living is supposed to feel like home with neighbors nearby: a dining room, activities down the hall, staff who know your name. What it is not supposed to feel like is a waiting room for the next level of care. Yet that is how many families describe the stretch when a loved one is “mostly fine”—until mornings get harder, showers get skipped, and everyone starts wondering how long the apartment can still work.",
      },
      {
        type: "p",
        text: "TLC CareNow was built for that stretch. In partner communities, residents and families book short, on-demand visits on campus—help getting ready, an escort to dining, companionship after an appointment—without a four-hour agency minimum and without hoping someone “stops by.” The change is not one miracle visit. It is a different rhythm: help that arrives when the day needs it.",
      },
      {
        type: "h2",
        text: "What “changing a life” looks like on a Tuesday",
      },
      {
        type: "p",
        text: "Lives change in ordinary hours. A resident who used to skip breakfast because dressing took too long makes it to the dining room. A daughter who lives two hours away books a shower assist before a work trip instead of canceling the trip. A wellness director stops playing dispatcher for last-minute favors and can point families to a visit they can actually schedule.",
      },
      {
        type: "ul",
        items: [
          "Residents keep more of the life they chose: meals with neighbors, activities they enjoy, pride in their own apartment",
          "Families get a plan they can see—confirmed times instead of guessing from a phone call",
          "Communities offer real backup for everyday needs without turning independent living into assisted living",
          "Staff spend less time scrambling for informal help and more time on the work only they can do",
        ],
      },
      {
        type: "h2",
        text: "Why independent living needed a different model",
      },
      {
        type: "p",
        text: "Traditional home care often arrives in blocks that do not match campus life. A resident may need thirty minutes before breakfast—not a four-hour shift. Families delay asking because the minimum feels like “too much.” Staff fill gaps with kindness until they cannot. By the time help is official, the conversation has already shifted toward a move.",
      },
      {
        type: "p",
        text: "On-demand visits flip that timeline. When help is bookable in the amounts that fit the day, small needs stay small. Dignity stays intact. Independent living gets a better chance to keep working—the way it was designed to.",
      },
      {
        type: "h2",
        text: "Three lives, one campus",
      },
      {
        type: "p",
        text: "The resident: After a hospital stay, walking to dining felt uncertain. Short escorts and morning help meant meals and people again—not a week of toast in the apartment.",
      },
      {
        type: "p",
        text: "The family: A son who used to call the front desk in a panic now books a companionship visit when he cannot be there. He still worries. He does not have to invent a care team from scratch every time.",
      },
      {
        type: "p",
        text: "The community: Operators can say yes to extra support without rewriting the whole care model. Families see a partner that takes independence seriously—and has a practical answer when independence needs a boost.",
      },
      {
        type: "h2",
        text: "What makes CareNow different on campus",
      },
      {
        type: "ul",
        items: [
          "Visits are timed and confirmed in the TLC CareNow app—residents, families, and staff can stay aligned",
          "Help is on campus in partner communities, available around the clock when the building uses CareNow",
          "Staff can book on a resident’s behalf when someone is shy, tired, or overwhelmed",
          "You book the visit you need—not a half-day block that makes asking feel like giving up independence",
        ],
      },
      {
        type: "h2",
        text: "Changing lives is a team sport",
      },
      {
        type: "p",
        text: "CareNow does not replace physicians, community wellness teams, or family love. It gives those people a tool that matches real days: short, visible, bookable help. That is how lives change in independent senior communities—not with a slogan, but with a morning that works, a meal that happens, and another month in the home someone already chose.",
      },
      {
        type: "p",
        text: "If your community already uses CareNow, sign in at app.tlccarenow.com to book support. If you’re not sure whether CareNow is available in a building, ask the community office or reach us through our contact page—we’re glad to help you find the next step.",
      },
    ],
  },
  {
    slug: "how-tlc-carenow-helped-helen-stay-in-her-community",
    title:
      "How TLC CareNow Helped Helen Stay in the Community She Chose",
    description:
      "A family story about short CareNow visits that helped a resident stay in independent living longer—after illness, shaky mornings, and the fear of needing to move.",
    excerpt:
      "Helen’s family almost started looking at assisted living. Short, on-demand CareNow visits gave her enough support to keep the apartment—and the neighbors—she already loved.",
    author: "TLC CareNow",
    date: "Jul 25, 2026",
    publishedAt: "2026-07-25",
    readTime: "6 min read",
    image: images.blogGuides.stayInCommunity,
    imageAlt:
      "Senior woman smiling on a sunny balcony at her independent living community",
    category: "Families",
    body: [
      {
        type: "p",
        text: "Helen had lived in her independent living community for almost four years. She knew the dining room by heart. She had her tablemates. She liked her one-bedroom apartment because the morning light hit the chair by the window just right. When her daughter, Rachel, started quietly Googling assisted living options after a rough winter, Helen’s first response was simple: “I’m not ready to leave.”",
      },
      {
        type: "p",
        text: "She wasn’t arguing with the facts. After a hospital stay for pneumonia, mornings were harder. Showers felt risky. Getting dressed took long enough that she skipped breakfast. Some days she stayed in the apartment instead of walking to activities she used to love. Rachel lived ninety minutes away. Staff were kind, but they couldn’t quietly become Helen’s daily caregivers. Everyone could feel the same question hanging in the air: How much longer can she stay here?",
      },
      {
        type: "h2",
        text: "The moment that changed the plan",
      },
      {
        type: "p",
        text: "The turning point wasn’t another crisis. It was a conversation with the community office. Helen’s building had recently added TLC CareNow—short, bookable visits on campus for help with everyday needs. No four-hour agency minimum. No hoping a neighbor “had a minute.” Rachel could book from her phone. Staff could book when Helen was tired of asking. Visits were confirmed and timed.",
      },
      {
        type: "p",
        text: "Rachel booked three things that first week: help getting ready before breakfast twice, one companionship walk to dining, and one shower assist. Helen rolled her eyes at “all the fuss”—and then ate in the dining room three days in a row.",
      },
      {
        type: "h2",
        text: "What support looked like in real life",
      },
      {
        type: "ul",
        items: [
          "Morning help on hard days so Helen didn’t miss breakfast because dressing took too long",
          "A steady escort to dining and activities when her balance felt uncertain",
          "Shower support that protected dignity without turning every bath into a battle",
          "A few companionship check-ins when Rachel traveled for work",
          "A light pattern of visits after appointments instead of “see how she does alone”",
        ],
      },
      {
        type: "p",
        text: "None of those visits were dramatic. That was the point. They filled the gaps that usually push families toward a move: skipped meals, skipped showers, isolation, and the quiet fear of falling with no one nearby.",
      },
      {
        type: "h2",
        text: "Why Helen could stay",
      },
      {
        type: "p",
        text: "Assisted living might still be right for Helen someday. But for months after that winter, it stopped being the only option on the table. Helen kept her apartment. She kept her friends. Rachel stopped living in perpetual emergency mode and started booking help the way other families book rides—when the day needed it.",
      },
      {
        type: "p",
        text: "The community stayed in the loop. Staff could see what was scheduled. Rachel could see confirmations instead of guessing from a phone call. Helen still made her own choices; CareNow simply made those choices safer to keep.",
      },
      {
        type: "h2",
        text: "What families can take from Helen’s story",
      },
      {
        type: "ul",
        items: [
          "Ask early whether your community offers TLC CareNow—before a rough season becomes a move-out conversation.",
          "Start with one or two practical visits, not a full care plan. Momentum matters more than perfection.",
          "Use short visits after illness or hospital stays to steady the first weeks home.",
          "Share access with another family member so support doesn’t depend on a single person.",
          "Tell staff what “a good week” looks like for your loved one so they know what to reinforce.",
        ],
      },
      {
        type: "h2",
        text: "Staying is a form of love, too",
      },
      {
        type: "p",
        text: "Helen’s story isn’t a promise that every resident can stay forever. It’s a reminder that length of stay is often decided in the small hours: the morning someone can’t get ready, the dinner they skip, the shower they avoid, the lonely afternoon that makes the apartment feel too quiet. When families can book short help for those moments, independent living has a better chance to keep working.",
      },
      {
        type: "p",
        text: "If your community already uses CareNow, sign in at app.tlccarenow.com to book support. If you’re not sure whether CareNow is available in their building, ask the community office or reach us through our contact page—we’re glad to help you find the next step.",
      },
    ],
  },
  {
    slug: "physical-activity-for-seniors-in-independent-living",
    title:
      "Physical Activity for Seniors in Independent Living: A Practical Family Guide",
    description:
      "How families support safe movement in senior living—walking, strength, balance, and when short CareNow visits help residents stay active.",
    excerpt:
      "Staying active in independent living is less about gym memberships and more about steady, safe movement. Here is how families help keep momentum without pushing too hard.",
    author: "TLC CareNow",
    date: "Jul 11, 2026",
    publishedAt: "2026-07-11",
    readTime: "6 min read",
    image: images.blogGuides.physicalActivity,
    imageAlt:
      "Senior woman doing gentle water exercise in a community swimming pool",
    category: "Families",
    body: [
      {
        type: "p",
        text: "In independent living, movement is easy to postpone. The dining room is down the hall. The activity calendar looks busy. Your loved one says they’re “fine.” Then a week turns into a month of mostly sitting—TV in the morning, a short walk to lunch, an early evening in the chair. Families often notice the shift late: slower walking, fewer outings, more hesitation on stairs or getting up from the couch.",
      },
      {
        type: "p",
        text: "Physical activity later in life isn’t about training for a marathon. It’s about keeping strength, balance, and confidence so the apartment, the dining room, and the life they chose still feel manageable. You don’t need to become a personal trainer. You do need a clear eye—and a plan when fear, pain, or loneliness makes moving feel optional.",
      },
      {
        type: "h2",
        text: "What “enough activity” usually looks like",
      },
      {
        type: "p",
        text: "Guidelines for older adults usually point to a mix of aerobic movement, strength, and balance—most days, in doses that fit their body. In a community, that can look simple: hallway walks, chair exercises, a fitness class, gardening, or a short outdoor stroll with company. Consistency beats intensity. Ten meaningful minutes done regularly often matter more than one ambitious day followed by a week of rest.",
      },
      {
        type: "ul",
        items: [
          "Aerobic movement: walking to dining, hallway loops, or a paced outdoor walk",
          "Strength: sit-to-stands, light bands, or community fitness sessions that protect muscle",
          "Balance: careful standing practice, tai chi–style classes, or guided stretches",
          "Everyday motion: making the bed, carrying a light bag, standing while talking on the phone",
        ],
      },
      {
        type: "h2",
        text: "Warning signs families notice first",
      },
      {
        type: "ul",
        items: [
          "Skipping community walks, classes, or outings they used to enjoy",
          "Needing furniture or walls to stand up more often",
          "Avoiding stairs, the courtyard, or longer halls because of fear of falling",
          "Saying “I’m too tired” after very little activity—or sleeping more during the day",
          "A recent fall, near-fall, hospital stay, or illness that quietly ended their routine",
        ],
      },
      {
        type: "p",
        text: "One quiet week isn’t a crisis. A pattern lasting more than a couple of weeks deserves a conversation with your loved one, the community wellness team, and their physician—especially if pain, dizziness, shortness of breath, or new weakness is part of the story.",
      },
      {
        type: "h2",
        text: "Make movement easier—not stricter",
      },
      {
        type: "p",
        text: "Lecturing rarely restores a walking habit. Removing friction does.",
      },
      {
        type: "ul",
        items: [
          "Ask which part of the day they feel strongest and protect a short walk then.",
          "Pair movement with people: a neighbor, a family FaceTime walk, or a companionship visit.",
          "After a rough morning, help with getting ready so they don’t skip an activity because dressing took too long.",
          "Start smaller than you think—one hallway loop or one chair-exercise video is a win.",
          "Tell wellness or fitness staff what feels safe for your loved one, including fall history and physician limits.",
        ],
      },
      {
        type: "h2",
        text: "When short CareNow visits help with activity",
      },
      {
        type: "p",
        text: "Sometimes the barrier isn’t motivation—it’s the day around movement. Unsteady footing. Fear of walking alone. No energy to get dressed for a class. After illness, strength can lag while caution stays high.",
      },
      {
        type: "p",
        text: "In communities that use TLC CareNow, families and staff can book short visits for exactly those moments: help getting ready before a walk or class, a steady escort down the hall or to the courtyard, or companionship so movement doesn’t feel lonely or risky. Visits are timed and confirmed—so you’re not hoping someone “stops by.” That kind of practical support protects activity without turning every walk into a clinical event.",
      },
      {
        type: "h2",
        text: "Questions worth asking the community",
      },
      {
        type: "ul",
        items: [
          "What walking routes, fitness classes, or balance programs are available—and how hard are they to join?",
          "Who notices when someone stops coming to activities—and how are families told?",
          "Is TLC CareNow (or similar on-demand help) available for activity escorts and companionship?",
          "How should we restart movement after a fall, hospital stay, or long illness?",
        ],
      },
      {
        type: "h2",
        text: "Movement is fuel for independence",
      },
      {
        type: "p",
        text: "Physical activity won’t solve every health challenge. It does give your loved one a better shot at balance, strength, clearer days, and staying proud in the life they chose. Watch for patterns, make movement easier, loop in the community early—and use short, bookable help when the barrier is getting started, not knowing that movement matters.",
      },
      {
        type: "p",
        text: "If your community offers CareNow, sign in at app.tlccarenow.com to schedule activity support. For questions about whether CareNow is available in their building, ask the community office or reach us through our contact page.",
      },
    ],
  },
  {
    slug: "healthy-eating-for-seniors-in-independent-living",
    title:
      "Healthy Eating for Seniors in Independent Living: A Practical Family Guide",
    description:
      "How families support healthy eating in senior living—appetite changes, dining routines, hydration, and when short CareNow visits help at mealtime.",
    excerpt:
      "Good nutrition in independent living is about more than the menu. Here is how families notice changes early and make mealtime easier to keep.",
    author: "TLC CareNow",
    date: "Jun 27, 2026",
    publishedAt: "2026-06-27",
    readTime: "6 min read",
    image: images.blogGuides.healthyEating,
    imageAlt:
      "Colorful healthy grain and vegetable bowl with fresh produce",
    category: "Families",
    body: [
      {
        type: "p",
        text: "In independent living, meals are supposed to be one of the easier parts of the day: a dining room, a menu, neighbors at the table. Then something shifts. Your parent skips breakfast. They say they’re “not hungry.” The fridge in the apartment holds little more than crackers. Clothes fit looser. Families often treat food as a private preference—until nutrition becomes the quiet reason energy, mood, and independence start to slip.",
      },
      {
        type: "p",
        text: "Healthy eating later in life is less about perfect plates and more about steady routines: enough protein, enough fluids, and enough company that showing up for a meal still feels worthwhile. You don’t need to become a dietitian overnight. You do need a clear eye—and a plan when appetite or mobility makes dining harder.",
      },
      {
        type: "h2",
        text: "What “healthy eating” usually means for older adults",
      },
      {
        type: "p",
        text: "Needs change with age. Many people benefit from more protein to protect strength, colorful produce for fiber and vitamins, and fewer empty calories that fill them up without fueling the day. Taste and smell can dull. Dentures, dry mouth, or medications can make chewing and swallowing less pleasant. That doesn’t mean the answer is only soft, bland food—it means the path to a good meal may need a little more support.",
      },
      {
        type: "ul",
        items: [
          "Protein at most meals: eggs, fish, chicken, beans, yogurt, or fortified options the community offers",
          "Produce that is easy to eat: soft fruit, cooked vegetables, soups, and salads they actually like",
          "Hydration across the day—not only a glass at dinner",
          "Familiar favorites mixed with healthier choices so the plate still feels like theirs",
        ],
      },
      {
        type: "h2",
        text: "Warning signs families notice first",
      },
      {
        type: "ul",
        items: [
          "Skipping meals, especially breakfast or the main dining sitting",
          "Unintentional weight loss—or clothes and belts that suddenly fit differently",
          "Living on tea, toast, sweets, or delivery that never includes a real meal",
          "Avoiding the dining room because walking there feels hard or lonely",
          "Confusion around meal times after illness, a hospital stay, or a medication change",
        ],
      },
      {
        type: "p",
        text: "One quiet week isn’t a crisis. A pattern lasting more than a couple of weeks deserves a conversation with your loved one, the community wellness team, and their physician if weight or energy is changing.",
      },
      {
        type: "h2",
        text: "Make the dining routine easier—not stricter",
      },
      {
        type: "p",
        text: "Lecturing rarely restores appetite. Removing friction does.",
      },
      {
        type: "ul",
        items: [
          "Ask which meal they enjoy most and protect that sitting first.",
          "Pair food with people: a friend at the table, a family FaceTime during lunch, or a short companionship visit.",
          "After a rough morning, help with getting ready so they don’t miss dining because dressing took too long.",
          "Keep simple, approved snacks in the apartment for between meals—especially if dinner is early.",
          "Tell dining or wellness staff what “a good plate” looks like for your loved one, including allergies and strong dislikes.",
        ],
      },
      {
        type: "h2",
        text: "When short CareNow visits help at mealtime",
      },
      {
        type: "p",
        text: "Sometimes the barrier isn’t the food—it’s the day around the food. A shaky walk to dining. No energy to get dressed. Loneliness that makes the dining room feel loud. After illness, appetite can lag while fatigue stays high.",
      },
      {
        type: "p",
        text: "In communities that use TLC CareNow, families and staff can book short visits for exactly those moments: help getting ready before a meal, an escort to dining, or companionship so eating doesn’t feel solitary. Visits are timed and confirmed—so you’re not hoping someone “stops by.” That kind of practical support protects nutrition without turning every meal into a clinical event.",
      },
      {
        type: "h2",
        text: "Questions worth asking the community",
      },
      {
        type: "ul",
        items: [
          "Can residents get lighter plates, smaller portions, or alternatives if appetite is low?",
          "Who notices when someone stops coming to dining—and how are families told?",
          "Is TLC CareNow (or similar on-demand help) available for mealtime escorts and companionship?",
          "How should we coordinate after a hospital stay when eating and energy are unpredictable?",
        ],
      },
      {
        type: "h2",
        text: "Food is fuel for independence",
      },
      {
        type: "p",
        text: "Healthy eating won’t solve every health challenge. It does give your loved one a better shot at strength, clearer days, and staying proud in the life they chose. Watch for patterns, make mealtime easier, loop in the community early—and use short, bookable help when the barrier is getting to the table, not choosing what’s on it.",
      },
      {
        type: "p",
        text: "If your community offers CareNow, sign in at app.tlccarenow.com to schedule mealtime support. For questions about whether CareNow is available in their building, ask the community office or reach us through our contact page.",
      },
    ],
  },
  {
    slug: "after-a-hospital-stay-in-independent-living",
    title:
      "After a Hospital Stay: How to Support Your Loved One Back in Independent Living",
    description:
      "A practical family guide to the first week home after the hospital—short visits, recovery routines, and how TLC CareNow helps without agency minimums.",
    excerpt:
      "Discharge day is not the finish line. Here is how families and communities use short, on-demand visits to steady the first week back in independent living.",
    author: "TLC CareNow",
    date: "Jun 13, 2026",
    publishedAt: "2026-06-13",
    readTime: "6 min read",
    image: images.blogGuides.afterHospital,
    imageAlt:
      "Caregiver helping a senior with recovery exercises after returning home",
    category: "Families",
    body: [
      {
        type: "p",
        text: "The hospital discharge papers are signed. Someone drives your parent back to their apartment. Relieved neighbors text “welcome home.” Then evening comes—and the real work starts. Medications feel confusing. A shower feels risky. Dinner in the dining room feels like too much. Independent living is still the right place—but the first week after a hospital stay is when small gaps turn into big setbacks.",
      },
      {
        type: "p",
        text: "Families often assume the community will “handle it,” or that one long agency visit will cover everything. What usually works better is a short, honest plan: the right help, on the right days, in amounts that match recovery—not a four-hour block your loved one doesn’t want or need.",
      },
      {
        type: "h2",
        text: "Why the first week home matters so much",
      },
      {
        type: "p",
        text: "After illness, surgery, or an ER visit, energy is low and confidence drops. Routines that felt automatic—bathing, dressing, walking to dining—suddenly take more effort. Out-of-town family can’t see the apartment. Staff may not know what “normal” looked like before. Without a plan, people stretch themselves until something breaks: a fall, skipped meals, missed meds, or a rushed move to a higher level of care.",
      },
      {
        type: "h2",
        text: "What help is actually useful after discharge",
      },
      {
        type: "ul",
        items: [
          "Morning and evening readiness: bathing, dressing, and a calm start or wind-down",
          "Escort support: a steady walk to dining, activities, or the lobby for pickup",
          "Companionship and check-ins: especially if family lives far away",
          "Light apartment help: tidy-up, laundry, settling after appointments",
          "A few planned visits across several days—not one oversized block on day one",
        ],
      },
      {
        type: "p",
        text: "This is non-clinical, day-to-day support. It does not replace nursing orders, therapy, or what the physician recommended. It fills the gap between “medically cleared to go home” and “actually able to live the day with dignity.”",
      },
      {
        type: "h2",
        text: "A simple recovery pattern families can book",
      },
      {
        type: "p",
        text: "Think in patterns, not panic. For many people, a light week looks like morning help for a few days, plus an evening check-in after a tough appointment. Adjust based on how your loved one feels—not on what an agency minimum forces you to buy.",
      },
      {
        type: "ul",
        items: [
          "Day of return: help settling in, a shower if needed, and company at the first meal back",
          "Days 2–4: short morning visits so routines restart without white-knuckling",
          "Midweek: escort to any follow-up appointment and help afterward",
          "Toward day 7: taper as strength returns—keep one optional visit on the calendar just in case",
        ],
      },
      {
        type: "h2",
        text: "How TLC CareNow fits",
      },
      {
        type: "p",
        text: "In communities that partner with CareNow, residents and families book short visits in the TLC CareNow app. Staff can also book on a resident’s behalf when someone is exhausted or overwhelmed. You see timing and confirmation—so you’re not relying on a vague promise that “someone will stop by.” Same-day help may depend on staffing; asking earlier in the day improves the odds.",
      },
      {
        type: "p",
        text: "That flexibility is the point. Recovery is uneven. Some mornings are fine. Some evenings aren’t. On-demand visits let you match the day instead of overbuying hours or waiting until a crisis forces everyone’s hand.",
      },
      {
        type: "h2",
        text: "Talk with the community before discharge if you can",
      },
      {
        type: "ul",
        items: [
          "Tell wellness or nursing the discharge date and what the hospital recommended for the first week.",
          "Ask who books day-to-day help on campus—and whether TLC CareNow is available.",
          "Share one other family contact so updates don’t depend on a single person.",
          "Separate urgent clinical questions from routine visit booking so the right team handles each.",
        ],
      },
      {
        type: "h2",
        text: "Coming home should feel like progress",
      },
      {
        type: "p",
        text: "A hospital stay is hard enough. The goal afterward is not perfection—it’s a steadier return to the life your loved one already chose. Short, reliable help protects pride, reduces family stress, and gives independent living a fair chance to work the way it should.",
      },
      {
        type: "p",
        text: "If your community offers CareNow, sign in at app.tlccarenow.com and set up a light recovery week before you need it in a rush. If you’re not sure CareNow is available in their building, ask the community office or reach us through our contact page.",
      },
    ],
  },
  {
    slug: "how-tlc-carenow-helps-loved-ones-stay-independent-longer",
    title:
      "How TLC CareNow Helps Your Loved One Stay Independent Longer",
    description:
      "How on-demand care with TLC CareNow supports the everyday help that helps aging loved ones stay safer, more engaged, and living the life they chose—longer.",
    excerpt:
      "Extending a loved one’s independence isn’t about one big intervention. It’s the small visits that keep them steady, social, and home in the community they chose.",
    author: "TLC CareNow",
    date: "May 30, 2026",
    publishedAt: "2026-05-30",
    readTime: "6 min read",
    image: images.blogGuides.stayIndependent,
    imageAlt:
      "Adult daughter and senior mother smiling together outdoors with a phone",
    category: "Families",
    body: [
      {
        type: "p",
        text: "When families talk about “extending” a loved one’s life, they rarely mean a miracle. They mean more good days. More mornings they can get ready with dignity. More dinners in the dining room instead of alone. More months—or years—in the independent living community they chose, before anyone has to talk about a higher level of care.",
      },
      {
        type: "p",
        text: "That kind of longer, fuller life is built from everyday support. TLC CareNow is designed for exactly those moments: short, on-demand visits that meet a real need today—without waiting for a crisis, and without a four-hour agency minimum that makes help feel out of reach.",
      },
      {
        type: "h2",
        text: "Independence lasts longer when help arrives early",
      },
      {
        type: "p",
        text: "Many move-outs don’t start with a dramatic event. They start with stretch: skipped showers, missed meals, fewer activities, a fall that “almost” happened, a hospital return with no plan for the first week home. Families sense it on the phone. Staff see it in the hallways. By the time everyone names the problem, options feel limited.",
      },
      {
        type: "p",
        text: "On-demand care flips that timeline. When your loved one—or you, or a trusted staff member—can book a shower assist, a companionship visit, or an escort to dining in minutes, small needs stay small. Help shows up while your parent still feels like themselves.",
      },
      {
        type: "h2",
        text: "What “more life” looks like day to day",
      },
      {
        type: "ul",
        items: [
          "Safer routines: bathing, dressing, and getting ready without white-knuckling it alone",
          "Better days after appointments or illness: short visits stacked across a week of recovery",
          "Connection: mealtime company or a check-in when you’re out of town",
          "Confidence for families: you can see what was booked instead of guessing from a phone call",
          "Dignity: asking for forty-five minutes of help—not a half-day block that feels like “needing too much”",
        ],
      },
      {
        type: "h2",
        text: "How TLC CareNow makes that possible",
      },
      {
        type: "p",
        text: "In communities that partner with CareNow, residents and families book through the TLC CareNow app. Staff can also book on a resident’s behalf when someone is shy, tired, or overwhelmed. Visits are confirmed and timed. Care is on campus and available around the clock in partner communities—so support lives where your loved one already lives.",
      },
      {
        type: "p",
        text: "That matters for length of stay. Communities that can offer flexible, visible help give families a reason to keep hoping in independent living—not to rush the next move. Residents get the backup that protects pride. Operators get a calmer path than informal favors and last-minute agency calls.",
      },
      {
        type: "h2",
        text: "What families can do this week",
      },
      {
        type: "ul",
        items: [
          "Ask whether your community offers TLC CareNow—and who can help you set up a login.",
          "Book one practical visit before it’s an emergency (for example, help after a tough appointment).",
          "Share access with one other family member so support doesn’t depend on a single person.",
          "After any hospital stay or illness, plan a light pattern of short visits instead of waiting to “see how it goes.”",
          "Tell the community what “a good day” looks like for your loved one—so staff know what to reinforce.",
        ],
      },
      {
        type: "h2",
        text: "Love, made practical",
      },
      {
        type: "p",
        text: "You can’t control every health outcome. You can make it easier for your loved one to eat, bathe, move, and connect—the building blocks of a life that still feels like theirs. TLC CareNow turns that love into something bookable: care that arrives on time, on campus, in the amounts that actually fit the day.",
      },
      {
        type: "p",
        text: "If your community already uses CareNow, sign in at app.tlccarenow.com to book support. If you’re not sure whether CareNow is available in their building, ask the community office or reach us through our contact page—we’re glad to help you find the next step.",
      },
    ],
  },
  {
    slug: "helping-seniors-with-day-to-day-living-in-communities",
    title:
      "How Senior Living Communities Can Help Residents With Day-to-Day Living",
    description:
      "A practical guide for senior living operators: everyday support residents need, why help often arrives late, and how to make short visits easy to book.",
    excerpt:
      "From morning routines to companionship after appointments—here is how communities can deliver day-to-day help without agency minimums or last-minute scrambling.",
    author: "TLC CareNow",
    date: "May 16, 2026",
    publishedAt: "2026-05-16",
    readTime: "7 min read",
    image: images.blogGuides.dayToDay,
    imageAlt:
      "Caregiver walking with a senior resident and offering everyday support",
    category: "Communities",
    body: [
      {
        type: "p",
        text: "Picture a resident who is mostly fine on her own—until she isn’t. A shaky morning. A shower that suddenly feels risky. An afternoon appointment that leaves her worn out and alone in her apartment. She does not need assisted living. She needs forty-five minutes of the right help, today. That is day-to-day living support—and it is where many senior living communities still fall short.",
      },
      {
        type: "p",
        text: "Residents choose independent living for dignity and choice. Families expect the community to notice small needs before they become crises. Staff want a clear way to help without turning every request into a four-hour agency visit or an off-the-books favor. Getting day-to-day support right protects all three.",
      },
      {
        type: "h2",
        text: "What day-to-day help really means",
      },
      {
        type: "p",
        text: "Day-to-day help is short, non-clinical support with the routines that keep someone steady, presentable, and connected. It sits between “I’m fully independent” and “I need a higher level of care.” Think of it as backup for real life—not a permanent care plan.",
      },
      {
        type: "ul",
        items: [
          "Getting ready: bathing, dressing, grooming, and a calm start to the day",
          "Staying mobile: a steady arm to dining, activities, or the salon",
          "Keeping the apartment livable: light tidy-up, laundry help, simple organizing",
          "Feeling less alone: companionship, mealtime company, or a check-in when family is traveling",
          "Hard days: help packing for an appointment, waiting with someone, or settling back in afterward",
        ],
      },
      {
        type: "p",
        text: "These moments rarely need a half-day block. They need reliability, a familiar face when possible, and a booking path that does not embarrass the resident for asking.",
      },
      {
        type: "h2",
        text: "Where communities get stuck",
      },
      {
        type: "p",
        text: "Most operators already care deeply. The problem is the system around the help.",
      },
      {
        type: "ul",
        items: [
          "Agency minimums make a 30-minute need feel too expensive to request.",
          "Informal favors burn out staff and leave no record for families or leadership.",
          "Residents wait until needs pile up because asking feels like “becoming a problem.”",
          "Families call the front desk again and again because they cannot see what was booked.",
          "Supervisors only learn the full story after a fall, a complaint, or a move-out talk.",
        ],
      },
      {
        type: "p",
        text: "When help is hard to get, people stretch themselves. Stretching works—until it doesn’t. Then everyone is reacting instead of supporting.",
      },
      {
        type: "h2",
        text: "A simple operating model that works",
      },
      {
        type: "p",
        text: "Communities that handle day-to-day living well usually share the same habits:",
      },
      {
        type: "ul",
        items: [
          "Name the help in plain language. “Shower assist,” “companionship,” “escort to dining”—not jargon residents have to decode.",
          "Make booking easy for more than one person. Residents, families, and trusted staff should all be able to schedule when needed.",
          "Use short visits on purpose. Stack what the day actually requires instead of forcing unused hours.",
          "Keep one shared view of demand. Leadership should see patterns across the week, not only last night’s emergency.",
        ],
      },
      {
        type: "p",
        text: "TLC CareNow is built around that model: on-campus, on-demand visits residents and families can book in the app, staff who can book on someone’s behalf, and a clear schedule your team can run without guessing. Help shows up as a real visit—confirmed, timed, and visible—not a vague promise that someone will stop by.",
      },
      {
        type: "h2",
        text: "Five moves your team can make this month",
      },
      {
        type: "ul",
        items: [
          "Write a one-page “everyday help” menu with typical visit lengths and who can book.",
          "Coach front desk and wellness staff to offer help early—after a hospital return, a rough week, or a lonely stretch—not only when a resident asks.",
          "Tell families: after illness, book a light pattern (for example, morning and evening for a few days) instead of one oversized block.",
          "Review last week’s requests by type. Staff to real demand, not assumptions.",
          "Draw a bright line between routine day-to-day booking and urgent clinical escalation so nobody confuses the two.",
        ],
      },
      {
        type: "h2",
        text: "Why this protects independence—and length of stay",
      },
      {
        type: "p",
        text: "Day-to-day support is not “extra fluff.” It is how independent living keeps its promise. Residents stay proud of managing their own lives. Families stay calmer because help is bookable and visible. Staff stop improvising under pressure. Small needs get met while they are still small—before they harden into a higher level of care, or a move-out conversation nobody wanted.",
      },
      {
        type: "p",
        text: "If your community wants a clearer path for everyday support, explore TeamLife Campus Care or request a short walkthrough on our contact page. We can show how partner communities schedule short visits, keep families in the loop, and keep operations simple for the team on site.",
      },
    ],
  },
  {
    slug: "schedule-extra-care-without-agency-minimums",
    title:
      "How Independent Living Communities Schedule Extra Care Without Agency Minimums",
    description:
      "Why hour minimums block flexible care in independent living—and how communities schedule on-demand visits staff can actually run.",
    excerpt:
      "Traditional home-care minimums do not fit independent living. Here is how operators schedule extra help by the visit instead of by the half-day block.",
    author: "TLC CareNow",
    date: "May 2, 2026",
    publishedAt: "2026-05-02",
    readTime: "6 min read",
    image: images.blogGuides.scheduling,
    imageAlt:
      "Care team member reviewing schedules on a tablet in a senior living community",
    category: "Communities",
    body: [
      {
        type: "p",
        text: "Independent living communities are built for active residents who want choice—not a full home-health contract every time someone needs an extra hand. Yet many operators still rely on outside agencies that require two- or four-hour minimums. That mismatch creates gaps: residents delay asking for help, families get frustrated, and staff end up coordinating care in texts and spreadsheets.",
      },
      {
        type: "h2",
        text: "Why agency minimums clash with independent living",
      },
      {
        type: "p",
        text: "Agency minimums made sense when care was delivered almost entirely in private homes. In a senior living community, needs are often shorter and more frequent: a shower assist before an outing, medication reminders, companionship after a procedure, or help unpacking after a move. Charging for four hours when someone needs forty-five minutes erodes trust and pushes work to informal favors instead of documented care.",
      },
      {
        type: "ul",
        items: [
          "Residents wait until needs pile up instead of booking early.",
          "Supervisors cannot see demand until someone complains.",
          "Billing and scheduling live in different systems—or in email.",
        ],
      },
      {
        type: "h2",
        text: "What “by the visit” scheduling looks like on the ground",
      },
      {
        type: "p",
        text: "Communities that move away from minimums usually standardize three things: clear visit types, staff who can book on behalf of residents, and a shared calendar the whole team trusts. Supervisors book or rebook in minutes; care professionals see the day on one screen; leadership gets visibility without another complicated platform.",
      },
      {
        type: "p",
        text: "TLC CareNow is built for that operating model—transparent scheduling, role-based dashboards, and the ability to stack visits across a day or week without treating every request like a home-health admission. Operators keep control; residents and families use the same platform to book and stay informed.",
      },
      {
        type: "h2",
        text: "Practical steps your community can take",
      },
      {
        type: "ul",
        items: [
          "List your most common non-clinical visit types and typical durations.",
          "Train front desk and nursing leadership to book on behalf of residents when needed.",
          "Publish how families request same-day or short-term help—one path, not five.",
          "Review weekly demand so staffing matches real patterns, not guesswork.",
        ],
      },
      {
        type: "p",
        text: "You do not have to rip out every vendor on day one. Start with one building or one service line, measure fill rates and resident satisfaction, then expand. The goal is predictable operations for your team and flexible care for residents—without paying for unused hours.",
      },
      {
        type: "p",
        text: "If you operate multiple sites or want a walkthrough of dashboards and booking workflows, request a demo through our contact page.",
      },
    ],
  },
  {
    slug: "on-demand-care-for-families-in-senior-living",
    title:
      "What Families Should Know About On-Demand Care in Senior Living",
    description:
      "How families book extra care in independent living and senior living—what to expect, how scheduling works, and questions to ask your community.",
    excerpt:
      "On-demand care is not the same as moving to assisted living. Here is how families request help inside a senior living community and what good communication looks like.",
    author: "TLC CareNow",
    date: "Apr 18, 2026",
    publishedAt: "2026-04-18",
    readTime: "5 min read",
    image: images.blogGuides.onDemandFamilies,
    imageAlt:
      "Adult daughter helping her senior mother use a tablet in a sunny park",
    category: "Families",
    body: [
      {
        type: "p",
        text: "When a parent lives in independent living or another senior living setting, families often assume the community provides every hour of hands-on help. In reality, many communities offer a lifestyle-focused bundle—meals, activities, safety—and partner with on-demand care so residents can add personal support when needs change. Understanding that split prevents surprises and helps you advocate clearly.",
      },
      {
        type: "h2",
        text: "On-demand care vs. a higher level of care",
      },
      {
        type: "p",
        text: "On-demand care usually covers non-medical support: bathing, dressing, transfers, companionship, light housekeeping, escorts to appointments, and similar tasks booked by the visit or by the hour without a large agency minimum. It is not a substitute for skilled nursing or assisted living unless your community’s clinical team says otherwise. If needs are escalating every week, schedule a care conference with the community—not only more visits.",
      },
      {
        type: "h2",
        text: "How booking typically works",
      },
      {
        type: "p",
        text: "In communities that use TLC CareNow, residents or families book through the CareNow app; staff can also book on a resident’s behalf. You should see confirmation, timing, and who is assigned—not a vague promise that “someone will stop by.” Same-day requests may depend on staffing; asking earlier in the day improves the odds.",
      },
      {
        type: "ul",
        items: [
          "Confirm whether your community uses one scheduling system or several vendors.",
          "Ask who to call if a visit is late or canceled.",
          "Keep emergency and after-hours numbers separate from routine booking lines.",
        ],
      },
      {
        type: "h2",
        text: "Questions worth asking before you need help",
      },
      {
        type: "ul",
        items: [
          "What visit lengths are available, and are there minimum hours?",
          "How are care professionals vetted and trained for this property?",
          "How do charges appear—on a community bill, a separate invoice, or both?",
          "Can out-of-town family members get updates without calling the desk repeatedly?",
        ],
      },
      {
        type: "h2",
        text: "Tips for adult children and spouses",
      },
      {
        type: "p",
        text: "Share the login or booking process with one other family member so no single person becomes the bottleneck. After a hospital stay or illness, book a short pattern of visits (for example, morning and evening for one week) instead of assuming one long block will cover recovery. Note what went well in a short email to the supervisor—positive feedback helps communities staff the right skill mix.",
      },
      {
        type: "p",
        text: "If your community offers CareNow, you can sign in at app.tlccarenow.com to book care. For general questions about whether CareNow serves your building, contact the community office or reach TeamLife through our contact page.",
      },
    ],
  },
  {
    slug: "depression-in-elderly-people",
    title:
      "Depression in Elderly People: Tips for Helping Your Aging Loved One",
    description:
      "How to spot depression in older adults, what families often miss, and practical ways to support an aging loved one—with compassion and the right help.",
    excerpt:
      "Weight loss, skipping baths, and pulling away from people can be more than “just getting older.” Here is what to watch for and how to help.",
    author: "Stephanie Stewart",
    date: "Apr 4, 2026",
    publishedAt: "2026-04-04",
    readTime: "6 min read",
    image: images.blogGuides.depression,
    imageAlt:
      "Younger family member holding an older loved one’s hand in quiet support",
    category: "Families",
    body: [
      {
        type: "p",
        text: "Melissa could tell that her father was suffering. He’d dropped several pounds in the last few months, was reluctant to bathe, and kept to himself more than usual. At first she told herself it was aging, or a rough winter, or missing mom. Then a neighbor mentioned he had stopped coming to coffee in the lobby—and Melissa realized how long it had been since he sounded like himself on the phone.",
      },
      {
        type: "p",
        text: "Depression in older adults is common and often overlooked. Families and even professionals sometimes mistake it for “normal aging,” dementia, or just a bad week. It isn’t a personality flaw, and it isn’t something people should have to tough out alone. With the right support—medical care, social connection, and compassionate day-to-day help—many older adults feel better.",
      },
      {
        type: "h2",
        text: "Why depression looks different later in life",
      },
      {
        type: "p",
        text: "Older adults may not say “I feel depressed.” They may talk about being tired, useless, or “done.” Changes in health, mobility, hearing, eyesight, grief, retirement, or losing friends can all chip away at energy and hope. In independent living or senior communities, someone can be surrounded by people and still feel deeply alone—especially if getting to activities takes more effort than it used to.",
      },
      {
        type: "h2",
        text: "Signs families often notice first",
      },
      {
        type: "p",
        text: "You know your loved one’s baseline. Trust patterns that last more than a couple of weeks:",
      },
      {
        type: "ul",
        items: [
          "Losing interest in meals, hobbies, or visits they used to enjoy",
          "Weight loss or gain, or a sudden change in appetite",
          "Skipping bathing, laundry, or keeping the apartment tidy",
          "Sleeping much more—or hardly sleeping at all",
          "Pulling away from friends, dining, or community events",
          "Irritability, tearfulness, or talking about being a burden",
          "Trouble concentrating, or seeming slowed down and flat",
        ],
      },
      {
        type: "p",
        text: "One off day is human. A stretch of days where the person you love seems smaller, quieter, or less present is worth taking seriously.",
      },
      {
        type: "h2",
        text: "What to do when you’re worried",
      },
      {
        type: "ul",
        items: [
          "Start with a gentle conversation. Try “I’ve noticed you’ve seemed quieter lately—how are you really doing?” instead of “You seem depressed.”",
          "Call their physician. Ask for a checkup that includes mood, medications, sleep, hearing, and pain—physical issues can look like depression, and depression deserves clinical attention.",
          "Loop in the community. If they live in senior living, tell wellness or nursing what you’re seeing so staff can watch for isolation and offer support.",
          "Remove barriers to showing up. A short companionship visit, help getting ready for dining, or an escort to an activity can make connection feel possible again.",
          "Don’t go it alone. Share the load with a sibling, spouse, or trusted friend so follow-ups don’t depend on one exhausted person.",
        ],
      },
      {
        type: "h2",
        text: "How day-to-day care can help",
      },
      {
        type: "p",
        text: "Professional treatment matters—therapy, medication when appropriate, and guidance from a doctor. Alongside that, compassionate daily care can restore rhythm: help bathing when motivation is low, company at mealtime, a familiar voice checking in, or support after a hard appointment. In communities that use TLC CareNow, families and staff can book short visits for exactly those moments—so help is planned, not improvised in a panic.",
      },
      {
        type: "p",
        text: "Melissa’s story is a reminder many families need: small changes can be a loud signal. Persistent shifts in mood, appetite, sleep, or interest in activities deserve a conversation with a physician—and a circle of support that includes family, community staff, and, when needed, on-demand care that helps your loved one feel human again.",
      },
    ],
  },
];

const postsBySlug = new Map(blogPosts.map((post) => [post.slug, post]));

export function getBlogPost(slug: string): BlogPost | undefined {
  return postsBySlug.get(slug);
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map((post) => post.slug);
}

/** Newest first for the index page. */
export function getBlogPostsForIndex(): BlogPost[] {
  return [...blogPosts].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
}
