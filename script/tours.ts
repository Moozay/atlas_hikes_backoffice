export interface Tour {
    routeGeoJson?: string
  id: string
  title: string
  duration: number
  difficulty: string
  price: number
  rating: number
  reviewCount: number
  image: string
  description: string
  location: string
  groupSize: number
  category: string
  highlights: string[]
  featured: boolean
  images: string[]
  itinerary: {
    day: string
    title: string
    description: string
    duration: string
    elevation: string
    accommodation?: string
    meals?: string
  }[]
  included: string[]
  excluded: string[]
  whatToBring: string[]
  bestTime: string
  physicalRequirements: string
  culturalNotes?: string
  reviews: {
    id: number
    name: string
    avatar?: string
    rating: number
    date: string
    comment: string
  }[]
}

export const allTours: Tour[] = [
{
    "id": "atlas-sahara-3day-zagora",
    "routeGeoJson": "/routes/atlas-sahara-3day-zagora.geojson",
    "title": "3-Day Atlas to Sahara: The Draa Valley & Zagora Desert Adventure",
    "duration": 3,
    "difficulty": "Easy - Moderate",
    "price": 349,
    "rating": 4.7,
    "reviewCount": 98,
    "image": "/images/images_by_toure/3-Day Atlas to Zagora Desert/68.png",
    "description": "In just three days, we will guide you on an epic journey from the snow-capped peaks of the High Atlas to the golden sands of the Sahara. This is the perfect desert adventure for those with limited time, offering a profound and authentic taste of the Sahara's magic. We'll traverse the dramatic Tizi n'Tichka pass, walk through ancient ksars, follow the breathtaking Draa Valley—a ribbon of green in a sea of ochre—and spend two unforgettable nights under a blanket of stars in a traditional desert camp.",
    "location": "High Atlas Mountains & Zagora Desert Region",
    "groupSize": 14,
    "category": "atlas-sahara",
    "highlights": [
      "Step back in time at the UNESCO-listed Aït Benhaddou ksar, a famous film location.",
      "Journey through the breathtaking Draa Valley, a 200km-long ribbon of lush oasis and ancient kasbahs.",
      "Experience two magical nights in a traditional desert camp at the gateway to the Sahara.",
      "Feel the soft sand under your feet at the Tinfou or Erg Lihoudi dunes.",
      "Discover the rich history and culture of traditional Berber villages along the way."
    ],
    "featured": false,
    "images": ["/images/images_by_toure/3-Day Atlas to Zagora Desert/68.png", "/images/images_by_toure/3-Day Atlas to Zagora Desert/zagora1.jpg", "/images/images_by_toure/3-Day Atlas to Zagora Desert/Atlas-mountains.jpg"],
    "itinerary": [
      {
        "day": "Day 1",
        "title": "From the High Atlas to the Gateway of the Sahara",
        "description": "Our adventure begins with a dramatic drive over the Tizi n'Tichka pass (2,260m), where the landscape shifts from the green terraces of the Atlas to a more arid, rocky world. Our first major stop is the magnificent Aït Benhaddou, a UNESCO World Heritage site where you'll feel like you've walked onto a movie set. After exploring its ancient earthen ksar, we continue towards Ouarzazate and then enter the magnificent Draa Valley. The sight is stunning: a 200km-long sea of green palm groves flanked by the desert. We follow this historic route to Zagora, the legendary gateway to the Sahara. As the sun sets, we'll mount our camels for a short trek into the dunes to reach our desert camp, where a traditional dinner and a sky full of stars await.",
        "duration": "Approx. 9 hours of scenic driving & activities",
        "elevation": "From 2,260m pass to desert level",
        "accommodation": "Traditional desert camp",
        "meals": "Dinner"
      },
      {
        "day": "Day 2",
        "title": "The Soul of the Sahara & The Draa's Secrets",
        "description": "Awaken to the serene silence of the desert and enjoy a spectacular sunrise. After a camel ride back to Zagora and breakfast, we'll delve deeper into the region's culture. Our journey takes us to the holy village of Tamegroute, an historic center of Islamic learning. Here, we'll visit the famous Quranic library, with its ancient manuscripts, and explore the unique underground kasbah. We'll also visit a local cooperative to see the region's distinctive green pottery being made. In the afternoon, you can choose to visit the rolling Tinfou dunes to feel the true scale of the desert or simply relax at the camp. We'll enjoy a second evening and night in our desert home, deepening our connection with this magical landscape.",
        "duration": "Full day of cultural exploration and activities",
        "elevation": "Desert level",
        "accommodation": "Traditional desert camp",
        "meals": "Breakfast, Dinner"
      },
      {
        "day": "Day 3",
        "title": "Farewell to the Desert & Return to the Red City",
        "description": "After a final desert sunrise and breakfast, we begin our journey back to Marrakech. We'll retrace our path through the Draa Valley, offering a final opportunity to soak in the epic landscapes and stop at any scenic kasbahs we may have missed. The drive through the Atlas mountains is just as beautiful on the return, with the changing light offering a new perspective on the dramatic peaks and valleys. We'll arrive back in Marrakech in the late afternoon, filled with memories of the mountains, the valley, and the sea of sand.",
        "duration": "Approx. 9 hours of scenic driving",
        "elevation": "Crossing the 2,260m Tizi n'Tichka pass",
        "accommodation": "Not included",
        "meals": "Breakfast"
      }
    ],
    "included": [
      "Experienced English/French speaking driver-guide",
      "Comfortable, air-conditioned transport (4x4 or minibus)",
      "2 nights accommodation in traditional desert camps",
      "Camel treks to and from the desert camps",
      "2 breakfasts and 2 dinners as specified",
      "All entrance fees for scheduled visits",
      "The full support of our experienced team"
    ],
    "excluded": [
      "Lunches and beverages (soft drinks, water, etc.)",
      "Your accommodation in Marrakech",
      "Personal travel insurance (highly recommended)",
      "Tips for your driver-guide and camp staff (a customary gesture of thanks)",
      "Personal expenses and souvenirs"
    ],
    "whatToBring": [
      "Light desert clothing for the day (e.g., cotton t-shirts, long trousers)",
      "Warm layers for the cool desert and mountain evenings (fleece, jacket)",
      "Sun protection essentials: a wide-brimmed hat, sunglasses, and high-SPF sunscreen",
      "Comfortable walking shoes for exploring villages and kasbahs",
      "Camera and a power bank to capture the incredible landscapes and starry nights",
      "Personal items and any necessary medications"
    ],
    "bestTime": "October to April offers the most pleasant temperatures for both the mountains and the desert.",
    "physicalRequirements": "Easy. This tour is suitable for all ages and fitness levels. The main activities involve walking and short camel rides. Please be aware that there are some long driving days, which are part of the experience of seeing Morocco's diverse landscapes.",
    "culturalNotes": "This journey takes you through the heartland of the Amazigh (Berber) people, from the mountain communities to the desert dwellers of the Draa Valley. Hospitality is sacred; you will undoubtedly be offered mint tea, and accepting it is a sign of respect and friendship. The desert camps are comfortable but rustic, offering an authentic experience. We ask that you be respectful of local customs, dress modestly when visiting villages, and embrace the slower, more traditional rhythm of desert life.",
    "reviews": [
      {
        "id": 1,
        "name": "Emma Thompson",
        "rating": 5,
        "date": "February 10, 2024",
        "comment": "Perfect short desert escape! Zagora is less touristy than Merzouga but equally beautiful. The Draa Valley was stunning with endless palm groves. Camp was comfortable and the Berber hospitality amazing."
      }
    ]
  },
  
{
  "id": "artisan-villages-craft-tour",
  "title": "4-Day Artisan Villages & Craft Tour",
  "duration": 4,
  "difficulty": "Easy",
  "price": 429,
  "rating": 4.8,
  "reviewCount": 56,
  "image": "/images/images_by_toure/4-Day Artisan Villages & Craft Tour/art1.jpg",
  "description": "Discover Morocco's living craft traditions visiting specialized artisan villages. Learn pottery, weaving, metalwork, and traditional techniques from master craftspeople.",
  "location": "Atlas Foothills & Valleys",
  "groupSize": 10,
  "category": "berber-villages",
  "highlights": [
    "Pottery workshops in Tamegroute with signature green glaze",
    "Carpet weaving in women's cooperatives",
    "Berber silver jewelry crafting demonstrations",
    "Natural dye workshops using local plants",
    "Argan oil production at women's cooperatives",
    "Purchase directly from artisans at fair prices",
    "Support traditional craft preservation"
  ],
  "featured": false,
  "images": [
    "/images/images_by_toure/4-Day Artisan Villages & Craft Tour/art1.jpg",
    "/images/images_by_toure/4-Day Artisan Villages & Craft Tour/art2.jpg",
    "/images/images_by_toure/4-Day Artisan Villages & Craft Tour/art3.jpg",
    "/images/images_by_toure/4-Day Artisan Villages & Craft Tour/art4.jpg"
  ],
  "itinerary": [
    {
      "day": "Day 1",
      "title": "Marrakech to Imlil - Weaving Cooperatives",
      "description": "Visit women's weaving cooperatives in Asni valley. Watch traditional Berber carpet making and learn about symbolism in patterns. Natural dye workshop using local plants including henna. Hands-on weaving lesson using traditional techniques. Continue to Imlil for overnight.",
      "duration": "Half day + travel",
      "elevation": "Valley level",
      "accommodation": "Guesthouse in Imlil",
      "meals": "Lunch, dinner"
    },
    {
      "day": "Day 2",
      "title": "Metalwork & Wood Crafts",
      "description": "Visit Tahanaout and surrounding villages known for metalwork. Watch craftsmen creating traditional Berber silver jewelry with intricate designs and semi-precious stones. Afternoon: walnut wood carving demonstrations. Try your hand at basic techniques under artisan guidance. Evening in family guesthouse.",
      "duration": "Workshop day",
      "elevation": "Valley level",
      "accommodation": "Village guesthouse",
      "meals": "All meals"
    },
    {
      "day": "Day 3",
      "title": "Tamegroute Pottery & Draa Valley",
      "description": "Drive to famous Tamegroute village, pottery center since 17th century. Visit underground kasbah and family-run workshops using ancient techniques. Learn about the signature green glaze unique to this region. Create your own pottery piece (shipping available). Explore the library and Zawiya. Overnight in Draa Valley kasbah.",
      "duration": "Full day with travel",
      "elevation": "Desert level",
      "accommodation": "Kasbah hotel",
      "meals": "All meals"
    },
    {
      "day": "Day 4",
      "title": "Argan Cooperatives & Return",
      "description": "Visit women's argan oil cooperative to learn traditional production methods. Participate in nut cracking and oil extraction using age-old techniques. Shop for quality argan products directly from producers. Return to Marrakech via scenic route with additional craft village stops.",
      "duration": "Half day + return",
      "elevation": "Varied",
      "accommodation": "Not included",
      "meals": "Breakfast"
    }
  ],
  "included": [
    "Craft specialist guide (English/French)",
    "All workshop fees and materials",
    "3 nights accommodation (guesthouses/kasbah)",
    "All meals as specified",
    "Transport in comfortable vehicle",
    "Cooperative visits and translations",
    "Hands-on craft lessons with artisans",
    "Artisan community support donations",
    "Pottery shipping coordination"
  ],
  "excluded": [
    "Marrakech accommodation",
    "Craft purchases from artisans",
    "Shipping costs for pottery/purchases",
    "Travel insurance",
    "Tips for guide and artisans",
    "Personal expenses",
    "Beverages not mentioned"
  ],
  "whatToBring": [
    "Comfortable clothing for workshops",
    "Camera for documenting techniques",
    "Notebook for craft notes",
    "Cash for artisan purchases (Euros or Dirhams)",
    "Shopping bag for purchases",
    "Sun protection",
    "Personal items",
    "Comfortable walking shoes"
  ],
  "bestTime": "Year-round (workshops available all seasons)",
  "physicalRequirements": "Easy. Suitable for all ages and mobility levels. Mostly sedentary workshops with some walking.",
  "culturalNotes": "Purchasing from artisans supports their families directly. Fair prices established by cooperatives. Learn about preserving traditional crafts passed through generations. Many workshops are family-run enterprises with techniques dating back centuries.",
  "reviews": [
    {
      "id": 1,
      "name": "Julia Martinez",
      "rating": 5,
      "date": "April 12, 2024",
      "comment": "Perfect for craft lovers! Every village specialized in different traditions. The pottery workshop in Tamegroute was fascinating - I made my own bowl which they shipped home. Weaving demonstrations were mesmerizing. Loved supporting women's cooperatives directly. Came home with unique, authentic pieces and new appreciation for Moroccan craftsmanship."
    }
  ]
},
  {
    id: "southeast-nomad-trail-5day",
    routeGeoJson: "/routes/southeast-nomad-trail-5day.geojson",
    title: "5-Day Nomadic Trails of Southeast Morocco",
    duration: 5,
    difficulty: "Moderate",
    price: 589,
    rating: 4.9,
    reviewCount: 41,
    image: "/images/images_by_toure/5-Day Atlas to Merzouga Desert/20250902_155242(0).jpg",
    description: "Follow ancient nomadic routes through remote valleys, meet traditional shepherds, and experience authentic Berber hospitality in lesser-known corners of Southeast Morocco.",
    location: "M'Goun, Dades, Atlas Foothills",
    groupSize: 8,
    category: "southeast-morocco",
    highlights: [
      "Nomadic family encounters",
      "M'Goun Valley trekking",
      "Traditional souk visits",
      "Homestays in remote villages",
      "Shepherding experiences",
      "Authentic cooking classes",
    ],
    featured: false,
    images: ["/images/images_by_toure/5-Day Atlas to Merzouga Desert/20250902_155242(0).jpg", "/images/images_by_toure/5-Day Atlas to Merzouga Desert/9.jpg", "/images/images_by_toure/5-Day Atlas to Merzouga Desert/20250228_135711.jpg", "/images/images_by_toure/5-Day Atlas to Merzouga Desert/images (1).jpeg"],
    itinerary: [
      {
        day: "Day 1",
        title: "Marrakech to M'Goun Valley",
        description: "Cross Atlas via Tizi n'Tichka to the beautiful M'Goun region, often called the 'Happy Valley.' Visit Kelaa M'Gouna during rose harvest season (April-May). Overnight in traditional guesthouse in Ait Youl village.",
        duration: "7 hours",
        elevation: "2260m",
        accommodation: "Village guesthouse",
        meals: "Dinner"
      },
      {
        day: "Day 2",
        title: "M'Goun Valley Trek & Nomadic Families",
        description: "Trek through M'Goun Valley visiting nomadic families in their traditional tents. Learn about their lifestyle, herding practices, and sample homemade bread and tea. Help with daily tasks if interested. Overnight in pastoral guesthouse.",
        duration: "5-6 hours trekking",
        elevation: "Gain/loss 400m",
        accommodation: "Mountain guesthouse",
        meals: "All meals"
      },
      {
        day: "Day 3",
        title: "Valley of Roses to Dades Villages",
        description: "Drive through rose distilleries and kasbahs to lesser-known Dades villages. Visit weekly souk (market day varies). Stay with Berber family learning traditional cooking and carpet weaving.",
        duration: "4 hours + activities",
        elevation: "Varied",
        accommodation: "Family homestay",
        meals: "All meals"
      },
      {
        day: "Day 4",
        title: "Dades to Todra & Berber Villages",
        description: "Explore off-road tracks to remote villages rarely visited by tourists. Meet shepherds returning from mountain pastures. Walk through Todra palm oasis. Evening with local music.",
        duration: "6 hours",
        elevation: "Varied",
        accommodation: "Traditional kasbah",
        meals: "All meals"
      },
      {
        day: "Day 5",
        title: "Return to Marrakech via Ounila Valley",
        description: "Alternative return route through stunning Ounila Valley with its red earth kasbahs. Visit traditional pottery workshops. Arrive Marrakech evening.",
        duration: "8 hours",
        elevation: "2260m pass",
        accommodation: "Not included",
        meals: "Breakfast"
      },
    ],
    included: [
      "Expert cultural guide (fluent English/French/Berber)",
      "4x4 vehicle for off-road sections",
      "4 nights accommodation (guesthouses/homestays)",
      "All meals during tour",
      "Nomadic family visits",
      "Cooking class",
      "All activities and entrance fees",
    ],
    excluded: [
      "Marrakech accommodation",
      "Travel insurance",
      "Tips for guide and families",
      "Personal expenses",
      "Optional purchases from artisans",
    ],
    whatToBring: [
      "Comfortable trekking shoes",
      "Modest clothing for village visits",
      "Light sleeping bag (provided if needed)",
      "Sun and wind protection",
      "Camera and power bank",
      "Small gifts for host families (pens, soaps, etc.)",
      "Personal toiletries",
    ],
    bestTime: "April-May (rose season), September-October",
    physicalRequirements: "Moderate fitness needed for valley trekking.",
    culturalNotes: "Deep cultural immersion. Respect for local customs essential. Great photography opportunities but always ask permission.",
    reviews: [
      {
        id: 1,
        name: "Marie Dubois",
        rating: 5,
        date: "May 18, 2024",
        comment: "The most authentic Moroccan experience! Meeting nomadic families was humbling and beautiful. The homestay cooking class was fantastic, and I learned so much about Berber culture. This tour goes where tourist buses don't. Our guide Lahcen was wonderful at facilitating genuine connections."
      },
    ]
  }, 
{
    "id": "sahara-expedition-7day",
    "routeGeoJson": "/routes/sahara-expedition-7day.geojson",
    "title": "7-Day Epic Sahara Expedition: From Erg Chebbi to Erg Chegaga",
    "duration": 7,
    "difficulty": "Challenging",
    "price": 899,
    "rating": 4.9,
    "reviewCount": 87,
    "image": "/images/images_by_toure/7-Day Sahara Desert Expedition/1532078008.jpg",
    "description": "This is not a tour; it is an expedition into the very heart of the Sahara. Over seven unforgettable days, we will guide you on a true journey of discovery, venturing deep into two of Morocco's most magnificent and contrasting dune systems: the iconic Erg Chebbi and the wild, remote Erg Chegaga. You will live like a nomad, travel by camel caravan, explore by 4x4 over ancient pistes, and sleep under a canopy of stars so brilliant it feels like another world. This is the ultimate desert immersion for the true adventurer.",
    "location": "Sahara Desert (Erg Chebbi & Erg Chegaga)",
    "groupSize": 10,
    "category": "desert-adventures",
    "highlights": [
      "Experience two distinct desert worlds with multiple nights in different, spectacular camps.",
      "Embark on an extended, multi-day camel trek, connecting with the ancient rhythm of the desert.",
      "Share mint tea and stories with nomadic families, the true guardians of the desert.",
      "Learn basic desert navigation and survival skills from your expert guide.",
      "Hunt for fossils in a sea of prehistoric history, where the desert was once an ocean.",
      "Be enchanted by evenings of traditional Berber music around a crackling campfire.",
      "Feel the thrill of sandboarding down the immense, golden dunes.",
      "Navigate epic off-road tracks in a capable 4x4, crossing vast, untouched landscapes."
    ],
    "featured": true,
    "images": ["/images/images_by_toure/7-Day Sahara Desert Expedition/1532078008.jpg", "/images/images_by_toure/7-Day Sahara Desert Expedition/1532078762.jpg", "/images/images_by_toure/7-Day Sahara Desert Expedition/1699029271.jpg", "/images/images_by_toure/7-Day Sahara Desert Expedition/1699029270.jpg"],
    "itinerary": [
      {
        "day": "Day 1",
        "title": "From High Atlas to the Sea of Dunes",
        "description": "Our expedition begins with a dramatic traverse of the High Atlas Mountains, watching the landscape transform from lush green to arid rock. We'll pause at the spectacular Todra Gorges, where you can walk between towering cliff walls that narrow to just a few meters apart. Continuing through the town of Erfoud, known for its fossils, we arrive at the gateway to Erg Chebbi: Merzouga. As the sun begins to set, we'll mount our camels for the first time, trekking silently into the immense dunes to reach our luxury desert camp. A traditional dinner and the first night under the stars await.",
        "duration": "Approx. 9 hours driving + activities",
        "elevation": "From High Atlas passes to desert level",
        "accommodation": "Luxury desert camp, Erg Chebbi",
        "meals": "Dinner"
    },
      {
        "day": "Day 2",
        "title": "Deep Desert Secrets of Erg Chebbi",
        "description": "Today we venture far from the tourist trail on a full-day 4x4 expedition. Our journey takes us to the fringes of the dunes, where we'll visit nomadic families in their traditional tents, sharing tea and learning about their incredible resilience and desert survival techniques. We'll explore the abandoned village of Mifis and the hauntingly beautiful 'black desert' near Alnif. With a local expert, we'll search for ancient fossils, holding pieces of a prehistoric ocean in our hands. As evening falls, we arrive at a different, more remote camp, deeper in the heart of the dunes.",
        "duration": "Full day of 4x4 exploration",
        "elevation": "Desert level",
        "accommodation": "Traditional desert camp, Erg Chebbi",
        "meals": "Breakfast, Lunch, Dinner"
    },
      {
        "day": "Day 3",
        "title": "The Camel Caravan & Nomadic Life",
        "description": "We embrace the rhythm of the desert on a 4-5 hour camel caravan, journeying deeper into the silent expanse of the dunes. Your guide will share knowledge of desert navigation and the fascinating bond between the camel and its handler. We'll set up our own nomad-style camp, a truly immersive experience. The afternoon is for adventure—try your hand at sandboarding down the soft slopes or simply relax in the profound silence. In the evening, you'll learn to prepare *mella*, the traditional nomadic bread, baked directly in the hot sand. As darkness falls, an astronomy guide will unveil the secrets of the breathtaking desert sky.",
        "duration": "4-5 hours camel trekking",
        "elevation": "Desert level",
        "accommodation": "Nomadic-style camp",
        "meals": "Breakfast, Lunch, Dinner"
    },
      {
        "day": "Day 4",
        "title": "Epic 4x4 Traverse to Erg Chegaga",
        "description": "After a final sunrise camel ride back to Merzouga, we begin the most epic leg of our journey. We'll board our 4x4 and set off across the desert via ancient caravan routes, a landscape of stone and sand that has changed for centuries. Our path takes us across the vast, dried lakebed of Lac Iriki, a surreal and starkly beautiful expanse. After hours of true off-road adventure, we'll see them on the horizon: the Erg Chegaga dunes. Morocco's largest and most remote dunes are wilder and more dramatic than Erg Chebbi. We'll arrive in time for a sunset walk and a night under a pristine, unpolluted desert sky.",
        "duration": "Approx. 8 hours 4x4 journey",
        "elevation": "Desert level",
        "accommodation": "Desert camp, Erg Chegaga",
        "meals": "Breakfast, Lunch, Dinner"
    },
      {
        "day": "Day 5",
        "title": "The Wild Heart of Erg Chegaga",
        "description": "Today is dedicated to exploring the raw, untamed beauty of Erg Chegaga. These dunes are higher and more expansive, offering unparalleled panoramic views. We'll climb to the crest of the highest dunes and discover ancient petroglyphs, rock art left by civilizations that passed here millennia ago. In the afternoon, we'll spend time with a nomadic shepherd family, learning about their traditional skills and way of life. Our final evening in the deep desert is a celebration, with a Berber campfire, drums, and dancing under the stars.",
        "duration": "Full day of activities",
        "elevation": "Desert level",
        "accommodation": "Desert camp, Erg Chegaga",
        "meals": "Breakfast, Lunch, Dinner"
    },
      {
        "day": "Day 6",
        "title": "From Desert to the Draa Valley Oasis",
        "description": "After a final morning exploration of the Chegaga dunes, we begin our journey back towards civilization. We'll drive via a challenging desert piste to the town of Foum Zguid, the last outpost before the desert. From here, the landscape transforms once again as we enter the spectacular Draa Valley. A 200km-long ribbon of lush palm groves flanked by the desert, this is Morocco's most beautiful oasis. We'll visit ancient kasbahs and fortified villages (ksour) before overnighting in a traditional kasbah hotel in Zagora or Agdz, a welcome comfort after our rugged adventure.",
        "duration": "Approx. 7 hours driving",
        "elevation": "From desert level to the valley floor",
        "accommodation": "Traditional Kasbah hotel",
        "meals": "Breakfast, Dinner"
    },
      {
        "day": "Day 7",
        "title": "The Draa Valley & Return to Marrakech",
        "description": "We enjoy a leisurely morning in the Draa Valley, soaking in the contrast to the desert. Our final cultural stop is the holy village of Tamegroute, where we'll visit its historic Quranic library, home to ancient manuscripts, and see the region's famous green pottery being crafted. From here, we begin our scenic drive back to Marrakech, crossing the Atlas mountains one last time. We'll arrive in the evening, returning with a soul full of unforgettable desert memories.",
        "duration": "Approx. 8-9 hours driving",
        "elevation": "Crossing the 2,260m Tizi n'Tichka pass",
        "accommodation": "Not included",
        "meals": "Breakfast"
    }
    ],
    "included": [
      "Expert, multi-lingual desert guide (English/French/Berber)",
      "Experienced team of camel handlers and skilled 4x4 drivers",
      "Comfortable, air-conditioned 4x4 vehicle for all road and piste portions",
      "6 nights accommodation in a mix of luxury camps, traditional camps, and a kasbah hotel",
      "All meals during the expedition as specified (authentic, delicious nomadic cuisine)",
      "All camel trekking experiences as described",
      "All 4x4 desert expeditions and off-road driving",
      "Privileged visits to nomadic families with full translation",
      "Sandboarding equipment and instruction",
      "A guided desert astronomy session",
      "Evenings of traditional Berber music and entertainment",
      "A guided fossil hunting expedition with a local expert",
      "All high-quality camping equipment (tents, sleeping mats, etc.)",
      "Comprehensive safety equipment and a satellite phone for peace of mind"
    ],
    "excluded": [
      "Your accommodation in Marrakech before and after the expedition",
      "Lunches on Day 1 (travel day) and Day 7 (return day)",
      "Personal travel insurance with mandatory helicopter evacuation coverage",
      "Tips for your guide and the full support team (€50-70 per person is recommended to be distributed fairly)",
      "Personal expenses and souvenirs",
      "Drinks and snacks outside of main mealtimes"
    ],
    "whatToBring": [
      "Sturdy walking shoes or sandals for walking in the hot sand",
      "Lightweight, light-colored, long-sleeved clothing for optimal sun protection",
      "Warm layers for cold desert nights (temperatures can drop to 0-5°C)",
      "A traditional desert scarf or shemagh (can be purchased locally and is essential)",
      "A sleeping bag liner for extra warmth and hygiene (sleeping bags are provided)",
      "High-SPF sunscreen and protective lip balm",
      "Sunglasses with full UV protection",
      "A reliable headlamp with extra batteries (essential for moving around the camp at night)",
      "Camera with a dust-proof bag or protection",
      "A large capacity power bank for recharging devices",
      "Any personal medications and a comprehensive personal first-aid kit",
      "Wet wipes and hand sanitizer for maintaining hygiene",
      "A reusable water bottle with at least 3L capacity",
      "A small, comfortable daypack for the camel trekking days"
    ],
    "bestTime": "October to April. These months offer pleasant daytime temperatures and avoid the extreme, dangerous heat of the summer months.",
    "physicalRequirements": "A good level of physical fitness is required for this expedition. You must be comfortable with several hours of camel trekking per day and with the basic, rustic facilities of desert camping. The environment can be demanding, and a positive, resilient attitude is essential.",
    "culturalNotes": "This is an authentic expedition into the world of nomadic communities. The greatest respect for their culture, privacy, and traditions is paramount. The desert ecosystem is extremely fragile; we operate on a 'leave no trace' principle. Photography of nomadic families is a privilege, not a right, and must only be done with explicit permission from your guide, who will facilitate the interaction with cultural sensitivity.",
    "reviews": [
      {
        "id": 1,
        "name": "Alessandro Rossi",
        "rating": 5,
        "date": "March 28, 2024",
        "comment": "The ultimate Sahara adventure! Three different camps gave us diverse desert experiences. The camel trek into remote dunes was challenging but incredible. Meeting nomadic families and learning their survival skills was humbling. Our guide Omar was exceptional - knowledgeable about desert ecology, Berber culture, and kept us safe and entertained throughout. Erg Chegaga was wild and beautiful. This expedition exceeded all expectations!"
      },
      {
        "id": 2,
        "name": "Sarah Mitchell",
        "rating": 5,
        "date": "November 15, 2023",
        "comment": "Life-changing desert expedition! The progression from Erg Chebbi to Erg Chegaga showed the desert's diversity. Sleeping under billions of stars with no light pollution was magical. The 4x4 journey between the two ergs felt like a real adventure through untouched desert. Nomadic family visits were authentic and respectful. Camps were surprisingly comfortable. Perfect for anyone wanting deep desert immersion."
      }
    ]
},

{
  "id": "desert-photography-5day",
  "routeGeoJson": "/routes/desert-photography-5day.geojson",
  "title": "5-Day Sahara Photography Expedition",
  "duration": 5,
  "difficulty": "Moderate to Challenging",
  "price": 899,
  "rating": 4.8,
  "reviewCount": 44,
  "image": "/images/images_by_toure/5-Day Sahara Photography Expedition/sahara.jpg",
  "description": "A photographer's dream tour designed for optimal light conditions, unique desert landscapes, and cultural documentation. Led by professional photographer guide with specialized desert photography experience.",
  "location": "Merzouga & Surrounding Desert",
  "groupSize": 6,
  "category": "desert-adventures",
  "highlights": [
    "Golden hour and blue hour shoots daily",
    "Milky Way and star trail photography",
    "Portrait sessions with nomads (with permission)",
    "Unique desert landscapes including Erg Chebbi",
    "Professional photography guidance",
    "Image review and editing sessions",
    "Drone photography opportunities (where permitted)",
    "Sand dune abstract and pattern photography"
  ],
  "featured": false,
  "images": [
    "/images/images_by_toure/5-Day Sahara Photography Expedition/sahara.jpg", 
    "/images/images_by_toure/5-Day Sahara Photography Expedition/sahara1.jpg"
  ],
  "itinerary": [
    {
      "day": "Day 1",
      "title": "Marrakech to Merzouga - Landscape Photography",
      "description": "Depart early for photography stops at Tizi n'Tichka pass and Aït Benhaddou (golden light). Lunch in Ouarzazate with photo opportunities at film studios. Continue through Valley of Roses and Dades Gorges. Reach Merzouga late afternoon. Sunset shoot at Erg Chebbi dunes with photo composition guidance. Evening: camera settings workshop for desert conditions.",
      "duration": "10 hours + photo stops",
      "elevation": "2260m pass to desert level",
      "accommodation": "Hotel in Merzouga",
      "meals": "Breakfast, Dinner"
    },
    {
      "day": "Day 2",
      "title": "Sunrise Dunes & Desert Communities",
      "description": "Pre-dawn departure for sunrise shoot on high dunes. Return for breakfast and rest during harsh midday light. Afternoon visit to nomadic families for respectful portrait photography (with permission and cultural sensitivity). Evening: blue hour dune photography and techniques. Night: introduction to astrophotography.",
      "duration": "Photography focused day",
      "elevation": "Desert level",
      "accommodation": "Desert camp (premium)",
      "meals": "All meals"
    },
    {
      "day": "Day 3",
      "title": "Deep Desert & Night Sky Photography",
      "description": "4x4 expedition to black desert, fossil fields, and abandoned villages for unique landscapes. Midday: image review and editing session in camp. Evening: Milky Way photography workshop with professional equipment. Star trail and long exposure techniques. Optional light painting with camels after dark.",
      "duration": "Full day",
      "elevation": "Desert level",
      "accommodation": "Remote desert camp",
      "meals": "All meals"
    },
    {
      "day": "Day 4",
      "title": "Creative Desert Photography",
      "description": "Creative morning: sand patterns, abstract compositions, motion blur with sand. Visit Khamlia village for Gnawa music photography. Afternoon: minimalist desert photography workshop. Sunset: camel silhouettes and dramatic sky captures. Group critique session. Night: advanced astrophotography techniques.",
      "duration": "Photography day",
      "elevation": "Desert level",
      "accommodation": "Desert camp",
      "meals": "All meals"
    },
    {
      "day": "Day 5",
      "title": "Final Dawn Shoot & Return to Marrakech",
      "description": "Last sunrise photography session capturing morning mist over dunes. Image selection and editing workshop during breakfast. Return journey to Marrakech with photography stops at scenic kasbahs. Optional sunset shoot at Atlas Mountains (time permitting). Arrive evening.",
      "duration": "9 hours + stops",
      "elevation": "2260m pass",
      "accommodation": "Not included",
      "meals": "Breakfast, Lunch"
    },
  ],
  "included": [
    "Professional photographer guide (English/French)",
    "Daily photography workshops and critiques",
    "4 nights accommodation (hotel + premium camps)",
    "All meals during tour",
    "4x4 desert transportation",
    "Camel access for photography",
    "Model releases arranged for portrait work",
    "Night sky photography equipment assistance",
    "Image backup and transfer services",
    "Photography location scouting",
    "All entrance fees",
    "Drone flight permissions (where applicable)",
    "Tea and snacks during photo shoots"
  ],
  "excluded": [
    "Camera equipment (bring your own)",
    "Marrakech accommodation",
    "Travel insurance",
    "Tips for guide and team",
    "Image editing software licenses",
    "Prints and photo processing",
    "Personal expenses",
    "Alcoholic beverages",
    "Drone registration fees (if applicable)"
  ],
  "whatToBring": [
    "DSLR or mirrorless camera with manual controls",
    "Wide-angle lens (14-24mm recommended)",
    "Telephoto lens (70-200mm or similar)",
    "Sturdy tripod (essential for night photography)",
    "Extra batteries and memory cards (128GB+ total)",
    "Lens cleaning kit and blower for sand",
    "UV filters and polarizing filter",
    "Remote shutter release or intervalometer",
    "Laptop for image review (optional)",
    "Large capacity storage drives",
    "Camera rain cover (dust protection)",
    "Headlamp with red light for night shoots",
    "Camera backpack with weather protection",
    "Graduated neutral density filters",
    "Drone (optional, with registration)",
    "Portable power bank for charging"
  ],
  "bestTime": "September-November, February-April (best light and weather)",
  "physicalRequirements": "Moderate to challenging fitness. Early mornings and late evenings required for optimal light. Comfortable with desert conditions and some hiking in sand.",
  "culturalNotes": "Ethical photography practices emphasized. Always ask permission before photographing people. Tips provided for culturally sensitive documentary work. Portrait sessions arranged with proper compensation to subjects.",
  "reviews": [
    {
      "id": 1,
      "name": "Marcus Weber",
      "rating": 5,
      "date": "October 30, 2023",
      "comment": "As a semi-professional photographer, this tour was perfect! Our guide understood light, composition, and technical aspects. The itinerary was designed around golden hours and unique locations. Night sky photography instruction was excellent. I got portfolio-quality images and learned new techniques. Small group size meant personalized attention."
    },
    {
      "id": 2,
      "name": "Sophie Chen",
      "rating": 5,
      "date": "November 15, 2023",
      "comment": "The astrophotography sessions were incredible! Our guide knew exactly where to find the darkest skies and helped me master long exposures. The cultural photography opportunities were handled respectfully, and I appreciated learning proper etiquette. Worth every penny for serious photographers."
    }
  ]
},
  {
    id: "berber-summer-pastures-trek",
    routeGeoJson: "/routes/berber-summer-pastures-trek.geojson",
    title: "5-Day Summer Pastures Trek",
    duration: 5,
    difficulty: "Challenging",
    price: 549,
    rating: 4.7,
    reviewCount: 31,
    image: "/images/pastures-trek.jpg",
    description: "Trek to high-altitude summer pastures where Berber shepherds graze their flocks. Experience transhumance traditions and remote mountain life.",
    location: "High Atlas Mountains",
    groupSize: 8,
    category: "berber-villages",
    highlights: [
      "High mountain azib (summer shelters)",
      "Shepherd life experience",
      "Alpine meadows and wildlife",
      "Traditional cheese making",
      "Remote mountain passes",
      "Authentic camping and shepherding",
    ],
    featured: false,
    images: ["/images/pastures-1.jpg"],
    itinerary: [
      {
        day: "Day 1",
        title: "Imlil to Azib Tamsoulte",
        description: "Trek from Imlil valley up to Azib Tamsoulte (2200m), a summer grazing area. Meet shepherd families who migrate here seasonally. Set up camp near their stone shelters. Evening: learn about transhumance traditions and mountain ecology.",
        duration: "5-6 hours trekking",
        elevation: "Gain 900m",
        accommodation: "Mountain camping",
        meals: "Lunch, dinner"
      },
      {
        day: "Day 2",
        title: "High Pastures & Shepherd Activities",
        description: "Join shepherds moving flocks to higher pastures. Learn traditional herding techniques and mountain navigation. Participate in milking and cheese-making. Afternoon: alpine meadow exploration and wildlife watching. Evening: stories around the fire.",
        duration: "6-7 hours activities",
        elevation: "Gain 600m, lose 200m",
        accommodation: "Mountain camping",
        meals: "All meals"
      },
      {
        day: "Day 3",
        title: "Cross to Remote Azib Likemt",
        description: "Trek over high mountain pass (3200m) to reach remote Azib Likemt. Pass through pristine alpine environment rarely visited. Set camp and meet another shepherd community. Learn about their seasonal lifestyle and challenges.",
        duration: "7-8 hours trekking",
        elevation: "Gain 1000m, lose 800m",
        accommodation: "Mountain camping",
        meals: "All meals"
      },
      {
        day: "Day 4",
        title: "Shepherd Skills & Mountain Life",
        description: "Full day immersed in shepherd activities: making traditional butter, repairing shelters, collecting medicinal plants. Learn about mountain survival skills and weather prediction. Optional: help guard flocks from wildlife. Evening: traditional music.",
        duration: "Activities day",
        elevation: "Mountain level",
        accommodation: "Azib shelter + camping",
        meals: "All meals"
      },
      {
        day: "Day 5",
        title: "Return to Imlil via Tizi Mzik",
        description: "Trek back to civilization via scenic Tizi Mzik pass. Stop at permanent villages to see contrast with summer pasture life. Return to Imlil for hot shower and celebratory lunch. Transfer to Marrakech afternoon.",
        duration: "6 hours trek + transfer",
        elevation: "Lose 1100m",
        accommodation: "Not included",
        meals: "Breakfast, lunch"
      },
    ],
    included: [
      "Expert mountain guide (English/French/Berber)",
      "Shepherd community coordination",
      "Mule support for camping equipment",
      "All camping equipment (4-season tents)",
      "All meals (traditional mountain food + cheese)",
      "Cooking team",
      "Cultural activities and workshops",
      "Transfers from/to Marrakech",
    ],
    excluded: [
      "Sleeping bag (can be rented €15)",
      "Personal trekking equipment",
      "Marrakech accommodation",
      "Travel insurance",
      "Tips for guide and team",
      "Personal expenses",
    ],
    whatToBring: [
      "4-season sleeping bag (cold nights)",
      "Waterproof mountain boots",
      "Warm layers (fleece, down jacket)",
      "Rain gear",
      "Trekking poles",
      "Sun protection",
      "Personal medications",
      "Headlamp",
      "Water bottles (2L capacity)",
      "Camera for mountain landscapes",
    ],
    bestTime: "June to September (summer pasture season only)",
    physicalRequirements: "Challenging high-altitude trekking. Good fitness essential. Experience with mountain camping helpful.",
    culturalNotes: "Unique opportunity to experience nomadic pastoralism. Respect for shepherd traditions essential. Physical participation welcome.",
    reviews: [
      {
        id: 1,
        name: "Patricia Green",
        rating: 5,
        date: "July 20, 2024",
        comment: "Extraordinary cultural experience! Living alongside shepherds in high mountains was humbling. Learning cheese-making and helping with flocks gave real insight into this ancient lifestyle. The azib shelters and camping under stars was magical. Our guide translated shepherd stories beautifully. Challenging trek but worth every step."
      },
    ]
  },

{
    "id": "southeast-gorges-valleys-4day",
    "routeGeoJson": "/routes/southeast-gorges-valleys-4day.geojson",
    "title": "4-Day Southeast Morocco: Gorges, Kasbahs & Valleys",
    "duration": 4,
    "difficulty": "Easy - Moderate",
    "price": 489,
    "rating": 4.8,
    "reviewCount": 73,
    "image": "/images/images_by_toure/4-Day Gorges & Valleys Explorer/gorge1.jpg",
    "description": "Journey into the very soul of Southeast Morocco, where dramatic gorges carve through ancient earth and rose-scented valleys cradle fortified kasbahs. This 4-day tour is an immersive tapestry of natural wonders and living Berber heritage, perfect for the discerning traveler seeking to go beyond the guidebook and connect with the true spirit of the region.",
    "location": "Dades, Todra, Ziz & M'Goun Valleys",
    "groupSize": 10,
    "category": "southeast-morocco",
    "highlights": [
      "Walk through the breathtaking Todra and Dades Gorges, Morocco's most spectacular river-carved canyons.",
      "Discover the 'Valley of a Thousand Kasbahs' and the iconic UNESCO site of Aït Benhaddou.",
      "Wander through the fragrant 'Valley of Roses' (M'Goun), famous for its Damask rose production.",
      "Trace the route of ancient caravans through the lush Ziz Valley and its endless palm groves.",
      "Uncover the secrets of Erfoud, the fossil capital of Morocco, on a guided paleontological tour.",
      "Experience authentic Berber hospitality in a traditional kasbah."
    ],
    "featured": true,
    "images": [
      "/images/images_by_toure/4-Day Gorges & Valleys Explorer/gorge1.jpg",
      "/images/images_by_toure/4-Day Gorges & Valleys Explorer/gorge2.jpg",
      "/images/images_by_toure/4-Day Gorges & Valleys Explorer/gorge3.jpg",
      "/images/images_by_toure/4-Day Gorges & Valleys Explorer/gorge4.jpg"
    ],
    "itinerary": [
      {
        "day": "Day 1",
        "title": "Marrakech to Dades Valley: Gateway to the Gorges",
        "description": "Our adventure begins as we leave the red city behind, ascending into the High Atlas Mountains via the spectacular Tizi n'Tichka pass (2,260m). The landscape unfolds dramatically as we enter the Dades Valley. We'll visit the iconic UNESCO World Heritage site of Aït Benhaddou, a stunning example of southern Moroccan earthen architecture, and explore the ksar of Ouarzazate. As the day wanes, we arrive in the Dades Gorges, where we'll take a sunset walk among the spectacular, eroded rock formations known as the 'Monkey Fingers', watching the canyon walls glow in the golden hour.",
        "duration": "Approx. 8 hours driving & walking",
        "elevation": "Reaching 1,400m in the Dades Valley",
        "accommodation": "Comfortable Hotel in Dades Gorges",
        "meals": "Dinner"
      },
      {
        "day": "Day 2",
        "title": "Dades Gorges to Todra Canyon & Valley of a Thousand Kasbahs",
        "description": "Awaken to the dramatic beauty of the Dades Gorges, where towering walls up to 300m create a natural cathedral. We'll spend the morning exploring this geological marvel before embarking on a scenic drive through the famous 'Valley of a Thousand Kasbahs'. We'll stop at traditional Berber villages, seemingly frozen in time, and learn about the ancient irrigation systems that sustain this land. In the afternoon, we reach the Todra Gorges, Morocco's most impressive canyon. Here, we'll walk the canyon floor, gazing up at the sheer cliffs that narrow to just 10 meters in places. We overnight in the charming town of Tinghir, on the very edge of the Sahara.",
        "duration": "Approx. 6 hours driving & walking",
        "elevation": "Driving through mountain passes, valley floor at 900m",
        "accommodation": "Traditional Kasbah Hotel in Tinghir",
        "meals": "Breakfast, Dinner"
      },
      {
        "day": "Day 3",
        "title": "Ziz Valley & Erfoud: From Palms to Prehistoric Seas",
        "description": "Today, we journey into the lush Ziz Valley, a breathtaking oasis of over a million date palm trees. We'll follow ancient caravan routes, stopping at panoramic viewpoints that offer unparalleled vistas over the valley. Our path leads us to Erfoud, the fascinating fossil capital of Morocco, where we'll join a local expert for a guided paleontological tour to uncover trilobites and ammonites hidden in the stone, remnants of a prehistoric sea that once covered this land. We continue our drive through the dramatic gorges of the High Atlas, arriving in Midelt, the 'apple capital' of Morocco, nestled at the foot of the mountains.",
        "duration": "Approx. 7 hours driving & walking",
        "elevation": "Crossing several High Atlas passes, reaching Midelt at 1,500m",
        "accommodation": "Hotel in Midelt",
        "meals": "Breakfast, Dinner"
      },
      {
        "day": "Day 4",
        "title": "Return to Marrakech via the High Atlas",
        "description": "Our final day takes us on a scenic and less-traveled route back to Marrakech. We'll wind through the heart of the Middle Atlas mountains, passing through the beautiful Azilal and Beni Mellal regions. For a final, unforgettable encounter, we'll stop at the Ouzoud Waterfalls, a stunning cascade and one of the highest waterfalls in North Africa. We arrive back in Marrakech in the late afternoon, filled with memories of a truly epic journey.",
        "duration": "Approx. 8 hours driving",
        "elevation": "Crossing the Tizi n'Tichka pass (2,260m) en route",
        "accommodation": "Not included",
        "meals": "Breakfast"
      }
    ],
    "included": [
      "Services of a professional, English/French-speaking driver-guide.",
      "Transportation in a comfortable, private 4x4 vehicle or air-conditioned minibus.",
      "3 nights accommodation in carefully selected quality hotels and traditional kasbahs.",
      "3 breakfasts and 3 dinners featuring delicious local cuisine.",
      "All entrance fees to monuments and gorges.",
      "Guided walks through the Todra and Dades Gorges.",
      "Visits to a fossil workshop in Erfoud and local Berber cooperatives."
    ],
    "excluded": [
      "Lunches and beverages with meals.",
      "Accommodation in Marrakech before and after the tour.",
      "Comprehensive travel insurance (highly recommended).",
      "Tips for your guide and driver (discretionary but greatly appreciated).",
      "Optional activities not mentioned in the itinerary.",
      "Personal expenses and souvenirs."
    ],
    "whatToBring": [
      "Sturdy and comfortable walking shoes with good grip.",
      "Layered clothing to adapt to changing mountain temperatures.",
      "Sun protection: a wide-brimmed hat, sunglasses, and high-SPF sunscreen.",
      "A camera to capture the breathtaking landscapes.",
      "Any personal medications you may require.",
      "A reusable water bottle to stay hydrated."
    ],
    "bestTime": "March to May and September to November for pleasant weather and clear skies.",
    "physicalRequirements": "This tour involves walking on uneven terrain and is suitable for most fitness levels. Walks are moderate in length and can be tailored to the group.",
    "culturalNotes": "This journey is a respectful invitation into the heart of Berber culture. We will visit local homes and communities, and we ask all our guests to dress modestly and be open to the warm hospitality you will encounter. It's a wonderful opportunity to learn about and support the traditions of these resilient mountain people.",
    "reviews": [
      {
        "id": 1,
        "name": "Robert Chen",
        "rating": 5,
        "date": "April 5, 2024",
        "comment": "The gorges were absolutely spectacular! Todra Gorges felt like walking through a natural cathedral. Our guide, Ahmed, was fantastic at finding hidden spots and arranging village visits. The kasbahs were fascinating, and staying in them added so much to the experience. This is the best way to see the real Morocco!"
      }
    ]
  },
  
  {
    id: "mgoun-massif-traverse",
    routeGeoJson: "/routes/mgoun-massif-traverse.geojson",
    title: "6-Day M'Goun Massif Traverse",
    duration: 6,
    difficulty: "Challenging",
    price: 679,
    rating: 4.8,
    reviewCount: 38,
    image: "/images/images_by_toure/6-Day M'Goun Massif Traverse/mgoun1.jpg",
    description: "Trek the second-highest peak in Morocco (4071m) via the stunning M'Goun massif. Remote valleys, high passes, and Berber villages far from tourist trails.",
    location: "M'Goun Massif, Central High Atlas",
    groupSize: 8,
    category: "classic",
    highlights: [
      "M'Goun summit (4071m) optional",
      "Ameskar Cathedral canyon",
      "Remote Berber villages",
      "Tessaout Valley",
      "High mountain passes",
      "Camping in pristine wilderness",
    ],
    featured: true,
    images: ["/images/images_by_toure/6-Day M'Goun Massif Traverse/mgoun1.jpg", "/images/images_by_toure/6-Day M'Goun Massif Traverse/mgoun2.jpg", "/images/images_by_toure/6-Day M'Goun Massif Traverse/mgoun3.jpg", "/images/images_by_toure/6-Day M'Goun Massif Traverse/mgoun4.jpg"],
    itinerary: [
      {
        day: "Day 1",
        title: "Marrakech to Ait Bougmez Valley",
        description: "Drive to the beautiful Ait Bougmez Valley (known as 'Happy Valley'), one of Morocco's most remote and traditional Berber regions. Overnight in village guesthouse. Afternoon walk to explore the valley's kasbahs and terraced fields.",
        duration: "6 hours drive + walk",
        elevation: "1800m valley",
        accommodation: "Village guesthouse",
        meals: "Dinner"
      },
      {
        day: "Day 2",
        title: "Ait Bougmez to Ameskar",
        description: "Begin trekking through lush valley, passing numerous Berber villages. Gradually ascend to Ameskar (2200m), gateway to M'Goun massif. Camp near dramatic rock formations. Afternoon visit to nearby dinosaur footprints (fossilized).",
        duration: "6-7 hours trekking",
        elevation: "Gain 400m",
        accommodation: "Mountain camping",
        meals: "All meals"
      },
      {
        day: "Day 3",
        title: "Ameskar Canyon to Oulilimt Plateau",
        description: "Trek through spectacular Ameskar Cathedral - a narrow canyon with 300m walls. Scramble over boulders and through water sections (bring sandals). Emerge onto high Oulilimt plateau (2900m) with stunning views. Camp in alpine setting.",
        duration: "7-8 hours trekking",
        elevation: "Gain 700m",
        accommodation: "High mountain camping",
        meals: "All meals"
      },
      {
        day: "Day 4",
        title: "M'Goun Summit Attempt & Descent",
        description: "Early start for M'Goun summit (4071m) - 5-6 hours round trip. Non-technical but steep scree slopes. Spectacular 360° views from North Africa's second-highest peak. Afternoon descent to Tarkedid pass area (3200m). Camp at high altitude.",
        duration: "8-10 hours",
        elevation: "Gain 1171m, lose 871m",
        accommodation: "Mountain camping",
        meals: "All meals"
      },
      {
        day: "Day 5",
        title: "Tarkedid to Tessaout Valley",
        description: "Cross Tarkedid pass (3200m) with stunning views. Long descent into beautiful Tessaout Valley through changing landscapes - from alpine to green valley. Pass several traditional villages. Camp near Agouti village.",
        duration: "7 hours trekking",
        elevation: "Lose 1400m",
        accommodation: "Valley camping",
        meals: "All meals"
      },
      {
        day: "Day 6",
        title: "Tessaout to Marrakech via Azilal",
        description: "Final morning walk through Tessaout Valley. Meet vehicle for drive to Azilal and return to Marrakech via scenic Middle Atlas route. Arrive evening.",
        duration: "3 hours walk + 6 hours drive",
        elevation: "Descend to valley",
        accommodation: "Not included",
        meals: "Breakfast"
      },
    ],
    included: [
      "Expert mountain guide (English/French/Berber)",
      "Mule team for luggage and camping equipment",
      "5 nights accommodation (1 guesthouse + 4 camping)",
      "All meals during trek",
      "High-quality camping equipment",
      "Cooking team with fresh ingredients",
      "Transfers from/to Marrakech",
      "Entrance fees and permits",
    ],
    excluded: [
      "Sleeping bag (rental available €15)",
      "Personal trekking gear",
      "Marrakech accommodation",
      "Travel insurance with high-altitude coverage",
      "Tips for guide and team (€40-50 recommended)",
      "Personal expenses",
    ],
    whatToBring: [
      "4-season sleeping bag for high altitude",
      "Waterproof mountain boots (ankle support)",
      "Sandals for canyon water sections",
      "Warm layers and waterproof shell",
      "Trekking poles (highly recommended)",
      "Sun protection (SPF 50+)",
      "Personal first aid and altitude medication",
      "Headlamp with spare batteries",
      "Water bottles/bladder (3L capacity)",
      "Camera for spectacular scenery",
    ],
    bestTime: "May to October (summit accessible)",
    physicalRequirements: "Challenging. Good fitness and previous mountain experience required. High-altitude trekking with one optional summit day.",
    culturalNotes: "Remote Berber regions with traditional lifestyle. Ait Bougmez Valley is culturally rich. Respect local customs.",
    reviews: [
      {
        id: 1,
        name: "Andreas Schmidt",
        rating: 5,
        date: "June 15, 2024",
        comment: "M'Goun was incredible - less crowded than Toubkal but equally spectacular! Ameskar Canyon was thrilling adventure through water and boulders. The summit day was challenging but manageable. Our guide Brahim knew every path and village. Camping spots were pristine. This trek shows the real Atlas without tourist crowds. Highly recommended for experienced trekkers!"
      },
    ]
  },
{
    "id": "family-atlas-adventure-4day",
    "routeGeoJson": "/routes/family-atlas-adventure-4day.geojson",
    "title": "4-Day Family Atlas Adventure: A Journey for All Ages",
    "duration": 4,
    "difficulty": "Easy",
    "price": 449,
    "rating": 4.9,
    "reviewCount": 92,
    "image": "/images/images_by_toure/4-Day Family Atlas Adventure/20240507_104549.jpg",
    "description": "This is more than a holiday; it's a chance to see the world through your children's eyes and create memories that will last a lifetime. We've crafted this adventure to be a perfect, gentle introduction to the wonders of Morocco's mountains, where every day is a new discovery. From the joy of a mule ride to the magic of baking bread in a Berber home, this is a journey of connection, laughter, and learning for the whole family.",
    "location": "Imlil Valley & Surrounding Areas",
    "groupSize": 12,
    "category": "berber-villages",
    "highlights": [
      "Gentle trails perfect for little legs and big imaginations.",
      "The joy of a mule ride, a surefire smile for every child.",
      "Heartwarming interactions with Berber families, who welcome children as their own.",
      "Hands-on bread-making workshops where everyone gets their hands floury.",
      "A visit to a village school, a beautiful meeting of two different worlds.",
      "Stays in family-oriented accommodations with space to play and relax."
    ],
    "featured": true,
    "images": ["/images/images_by_toure/4-Day Family Atlas Adventure/20240507_104549.jpg", "/images/images_by_toure/4-Day Family Atlas Adventure/20240507_105538.jpg", "/images/images_by_toure/4-Day Family Atlas Adventure/20240715_115508.jpg"],
    "itinerary": [
      {
        "day": "Day 1",
        "title": "From City Bustle to Mountain Welcome",
        "description": "Our family adventure begins as we leave the energy of Marrakech behind, winding our way up into the peaceful High Atlas to the village of Imlil. After settling into our family-friendly guesthouse, we'll take a short, easy walk to the village of Aroumd. The kids will love the short mule ride, a perfect introduction to mountain travel! We'll visit the local primary school (when in session) to see where the village children learn, and there's always time for a spontaneous game of football with the local kids. It's a wonderful first taste of mountain life.",
        "duration": "2 hours of easy walking and activities",
        "elevation": "Minimal gain",
        "accommodation": "Family guesthouse with spacious rooms",
        "meals": "Lunch, Dinner"
      },
      {
        "day": "Day 2",
        "title": "Waterfalls, Shrines, and Baking Magic",
        "description": "Today, we follow the gentle path of the river towards the sacred shrine of Sidi Chamharouch. The kids will be captivated by the sound of water, the sight of mule trains carrying goods, and the impressive waterfall. We'll enjoy a picnic lunch by the river's edge. In the afternoon, the real magic happens. We'll gather with a Berber family for a hands-on bread-making workshop. The children can help knead the dough and watch as it's baked in a traditional clay oven. After dinner, we'll gather for a storytelling session, sharing tales as old as the mountains themselves.",
        "duration": "3-4 hours of easy walking",
        "elevation": "Gain 300m",
        "accommodation": "Same guesthouse",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": "Day 3",
        "title": "Crafts, Games, and Berber Rhythms",
        "description": "This morning is about creativity. We'll visit a local women's cooperative where the kids can try their small hands at the ancient craft of carpet weaving, guided by the patient and skilled artisans. Afterwards, we'll organize some traditional Berber games and activities. It's incredible to see how quickly children from different worlds connect through the universal language of laughter and play. In the afternoon, there's an optional mule ride to a nearby village or time to simply relax at the guesthouse. Our final evening is filled with the rhythm of Berber music and dancing—a joyful celebration for everyone.",
        "duration": "A full day of fun activities",
        "elevation": "Village level",
        "accommodation": "Same guesthouse",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": "Day 4",
        "title": "A Feast for the Senses at the Asni Market",
        "description": "No trip to Morocco is complete without a visit to a weekly souk (market)! On Saturday, we'll head to the bustling market in Asni. It's a feast for the senses—a symphony of colors, smells, and sounds. The children will love the vibrant chaos, and they can help our guide choose fresh vegetables and spices for our final lunch. After this exciting morning, we'll begin our scenic drive back to Marrakech, arriving in the afternoon with full hearts and a camera roll full of precious memories.",
        "duration": "Half day at the market + transfer",
        "elevation": "None",
        "accommodation": "Not included",
        "meals": "Breakfast, Lunch"
    }
    ],
    "included": [
      "Family-friendly English-speaking guide skilled in engaging with children",
      "Comfortable private transport with car seats available upon request",
      "3 nights of family-friendly accommodation (private rooms)",
      "All meals, with delicious, kid-friendly options available",
      "Mule rides for the children (and adults if you wish!)",
      "All workshops and cultural activities mentioned in the itinerary",
      "All village and school visits, coordinated respectfully with the local community",
      "A full schedule of cultural activities tailored for families"
    ],
    "excluded": [
      "Your accommodation in Marrakech",
      "Personal travel insurance",
      "Tips for your guide and local hosts (a customary gesture of thanks)",
      "Personal expenses and souvenirs",
      "Snacks and drinks outside of main mealtimes"
    ],
    "whatToBring": [
      "Comfortable walking shoes for the whole family",
      "Sun protection for everyone: hats, sunscreen, and sunglasses",
      "Light layers that can be added or removed as the temperature changes",
      "Small backpacks for the kids to carry their own water and treasures",
      "A camera for capturing those priceless family moments",
      "Any special dietary items or comfort foods for your children",
      "Personal medications and a small first-aid kit",
      "Entertainment for the transfers (books, travel games)",
      "Reusable water bottles for the whole family"
    ],
    "bestTime": "April to June and September to November offer the most comfortable temperatures for family activities in the mountains.",
    "physicalRequirements": "Easy. This tour is suitable for children aged 5 and up, as well as all fitness levels. The pace is always adapted to the youngest and slowest members of the group, ensuring a relaxed and enjoyable experience for everyone.",
    "culturalNotes": "This journey is a wonderful cultural education for children and adults alike. Berber culture is incredibly family-centric, and you will find that your family is welcomed with open arms and incredible warmth. Children are cherished, and it's common for local kids to approach your children with curiosity and friendship, creating bonds that transcend language barriers. We ask that you encourage these interactions and be respectful of local customs, especially when visiting homes and the school.",
    "reviews": [
      {
        "id": 1,
        "name": "Karen & Mike Johnson",
        "rating": 5,
        "date": "April 28, 2024",
        "comment": "Perfect family adventure! Our kids (ages 7 and 10) absolutely loved it. The mule rides were a highlight, and making bread with the Berber family was magical. Our guide was patient and made everything fun for the children. The guesthouse was clean and comfortable with great family meals. This gave our kids a different perspective on the world. Highly recommend for families!"
      },
      {
        "id": 2,
        "name": "Sophie Dubois",
        "rating": 5,
        "date": "October 12, 2023",
        "comment": "Wonderful experience for our family of 5. The pace was perfect for children, and the cultural activities kept them engaged. Watching our kids play with village children was heartwarming. The guide adapted everything to our family's needs. Safe, educational, and fun!"
      }
    ]
},

{
  "id": "winter-toubkal-snowshoe-trek",
  "routeGeoJson": "/routes/winter-toubkal-snowshoe-trek.geojson",
  "title": "4-Day Winter Toubkal Snowshoe Trek",
  "duration": 4,
  "difficulty": "Challenging",
  "price": 489,
  "rating": 4.7,
  "reviewCount": 47,
  "image": "/images/images_by_toure/4-Day Winter Toubkal Snowshoe Trek/winter_toubkal_main.jpg",
  "description": "Experience Toubkal in its most dramatic season. Snowshoe through winter wonderland, attempt the summit in winter conditions, and enjoy quiet mountain refuge life.",
  "location": "Toubkal National Park",
  "groupSize": 6,
  "category": "classic",
  "highlights": [
    "Winter mountaineering experience",
    "Snowshoeing through pristine landscapes",
    "Toubkal winter summit (conditions permitting)",
    "Crampons and ice axe use",
    "Cozy refuge evenings",
    "Fewer crowds, more wilderness",
    "Professional winter mountaineering instruction"
  ],
  "featured": false,
  "images": [
"/images/images_by_toure/4-Day Winter Toubkal Snowshoe Trek/20241110_075340.jpg",
"/images/images_by_toure/4-Day Winter Toubkal Snowshoe Trek/20250228_094359.jpg",
"/images/images_by_toure/4-Day Winter Toubkal Snowshoe Trek/20250228_120545.jpg",
"/images/images_by_toure/4-Day Winter Toubkal Snowshoe Trek/images (2).jpg"
],
  "itinerary": [
    {
      "day": "Day 1",
      "title": "Marrakech to Toubkal Refuge via Imlil",
      "description": "Transfer to Imlil. Gear check and winter equipment fitting (crampons, snowshoes). Trek to Toubkal Refuge with snowshoes as needed. Winter landscape photography opportunities. Evening: winter mountaineering briefing and safety talk.",
      "duration": "5-6 hours snowshoe trek",
      "elevation": "Gain 1467m",
      "accommodation": "Toubkal Refuge (heated)",
      "meals": "Lunch, dinner"
    },
    {
      "day": "Day 2",
      "title": "Acclimatization & Winter Skills",
      "description": "Morning: winter mountaineering skills training - crampon use, ice axe technique, avalanche awareness. Afternoon: acclimatization snowshoe to nearby col with spectacular winter views. Return to refuge for early dinner and rest before summit attempt.",
      "duration": "4-5 hours training & trekking",
      "elevation": "Gain/lose 400m",
      "accommodation": "Toubkal Refuge",
      "meals": "All meals"
    },
    {
      "day": "Day 3",
      "title": "Winter Summit Attempt",
      "description": "Early start (4-5am) for summit bid. Headlamps illuminate snowy path. Crampons required for icy sections. Summit conditions depend on weather and snow stability. Incredible winter views if successful. Descend to refuge then continue to Imlil. Hot shower and celebration dinner.",
      "duration": "10-12 hours",
      "elevation": "Gain 960m, lose 2427m",
      "accommodation": "Hotel in Imlil",
      "meals": "All meals"
    },
    {
      "day": "Day 4",
      "title": "Imlil Exploration & Return",
      "description": "Leisurely morning in Imlil. Optional easy snowshoe walk to nearby villages. Visit cooperatives for shopping. Lunch before transfer to Marrakech. Arrive afternoon.",
      "duration": "Half day + transfer",
      "elevation": "Minimal",
      "accommodation": "Not included",
      "meals": "Breakfast, lunch"
    }
  ],
  "included": [
    "IFMGA-certified winter mountain guide",
    "Winter technical equipment (crampons, ice axe, snowshoes)",
    "3 nights accommodation (refuge + hotel)",
    "All meals during tour",
    "Winter safety equipment (avalanche transceiver, probe, shovel)",
    "Mule support to refuge (weather permitting)",
    "Winter mountaineering instruction",
    "Transfers from/to Marrakech",
    "Group first aid kit",
    "Water purification tablets"
  ],
  "excluded": [
    "Personal winter clothing and boots",
    "4-season sleeping bag (rental €15)",
    "Marrakech accommodation",
    "Travel insurance with winter sports coverage",
    "Tips for guide and team",
    "Personal expenses",
    "Alcoholic beverages"
  ],
  "whatToBring": [
    "Insulated mountaineering boots (rigid, crampon-compatible)",
    "4-season sleeping bag (-15°C comfort)",
    "Full winter layering system",
    "Insulated down jacket",
    "Waterproof/breathable shell layers",
    "Winter gloves (liner + insulated)",
    "Balaclava and warm hat",
    "Ski goggles for wind/snow",
    "Sunglasses with UV protection",
    "Trekking poles with snow baskets",
    "High-energy snacks for summit day",
    "Thermos for hot drinks",
    "Sunscreen SPF 50+ (snow reflection intense)",
    "Headlamp with spare batteries"
  ],
  "bestTime": "December to April (depending on snow conditions)",
  "physicalRequirements": "Very challenging. Previous winter hiking experience strongly recommended. Summit not guaranteed due to weather/conditions. Good cardiovascular fitness required.",
  "culturalNotes": "Winter trekking is quieter with fewer tourists. Refuge atmosphere is cozy and communal. Flexibility required for weather conditions.",
  "reviews": [
    {
      "id": 1,
      "name": "Lars Andersson",
      "rating": 5,
      "date": "February 10, 2023",
      "comment": "Epic winter adventure! Summiting Toubkal in snow was challenging but incredible. Our guide was excellent at assessing conditions and keeping us safe. The winter training day was valuable. Snowshoeing through silent, frozen valleys was magical. Different experience from summer - more technical but more rewarding. Proper gear essential!"
    }
  ]
},

{
    "id": "atlas-adventure-combo-7day",
    "routeGeoJson": "/routes/atlas-adventure-combo-7day.geojson",
    "title": "7-Day Ultimate Atlas & Desert Adventure",
    "duration": 7,
    "difficulty": "Moderate",
    "price": 849,
    "rating": 4.9,
    "reviewCount": 127,
    "image": "/images/images_by_toure/7-Day Atlas Multi-Activity Adventure/atlas1.jpg",
    "description": "This is not just a tour; it's a complete immersion into the soul of Morocco. Over seven incredible days, we will guide you through a breathtaking tapestry of landscapes, from the foothills of the High Atlas to the shores of a serene lake, through lush valleys and finally to the edge of the Sahara. You will trek, bike, cook, and connect with local families, experiencing the rich culture and warm hospitality that defines this land. Every day is a new chapter, a new adventure, a new memory waiting to be made.",
    "location": "Al Haouz Region & Agafay Desert, Morocco",
    "groupSize": 12,
    "category": "new-product",
    "highlights": [
      "Trek through the stunning, less-traveled valleys of Amizmiz and Ouirgane.",
      "Feel the wind on your face during a mountain biking adventure around Lake Lalla Takerkoust.",
      "Master the art of Moroccan cuisine in a hands-on cooking class with a local Berber family.",
      "Discover the cascading waterfalls and vibrant culture of the famous Ourika Valley.",
      "Experience a high-altitude walk among ancient rock art on the Yagour Plateau or in the Oukaimeden ski area.",
      "Indulge in a night of starlit luxury in a private desert camp in the stony Agafay Desert.",
      "Enjoy authentic encounters, from camel treks to sharing meals with local families."
    ],
    "featured": true,
    "images": ["/images/images_by_toure/7-Day Atlas Multi-Activity Adventure/atlas1.jpg", "/images/images_by_toure/7-Day Atlas Multi-Activity Adventure/atlas2.jpg", "/images/images_by_toure/7-Day Atlas Multi-Activity Adventure/atlas3.jpg", "/images/images_by_toure/7-Day Atlas Multi-Activity Adventure/atlas4.jpg", "/images/images_by_toure/7-Day Atlas Multi-Activity Adventure/atlas5.jpg",  "/images/images_by_toure/7-Day Atlas Multi-Activity Adventure/atlas6.jpg", "/images/images_by_toure/7-Day Atlas Multi-Activity Adventure/atlas7.jpg"],
    "itinerary": [
      {
        "day": "Day 1",
        "title": "Amizmiz Foothills & Berber Hospitality",
        "description": "Our journey begins as we leave the red city of Marrakech behind, heading west into the Amizmiz foothills, the gateway to the High Atlas for the local Amazigh people. We'll take an easy walk through ancient villages where time seems to stand still, passing olive groves and visiting artisan workshops where skills are passed down through generations. A delicious, home-cooked Berber lunch awaits, your first taste of authentic mountain hospitality. We'll spend the night in a traditional lodge, settling into the gentle rhythm of mountain life.",
        "duration": "3–4 hours activity",
        "elevation": "+150m / -100m",
        "accommodation": "Amizmiz Traditional Lodge",
        "meals": "Lunch, Dinner"
      },
      {
        "day": "Day 2",
        "title": "Lalla Takerkoust: Lakeside Biking & Views",
        "description": "After a hearty breakfast, we'll gear up for a half-day of guided mountain biking. Our route circles the vast, beautiful Lake Lalla Takerkoust, an artificial reservoir that shimmers like a sapphire against the backdrop of the Atlas Mountains. The terrain is varied and the views are simply spectacular. In the afternoon, you have the choice to relax by the water or add a splash of adventure with optional kayaking or quad biking. We'll retire to a charming ecolodge on the lake's shore.",
        "duration": "3 hours biking",
        "elevation": "+200m / -200m",
        "accommodation": "Lakeside Ecolodge, Lalla Takerkoust",
        "meals": "Breakfast, Lunch, Dinner"
    },
      {
        "day": "Day 3",
        "title": "The Red Earth of Ouirgane National Park",
        "description": "Today we journey to the serene Ouirgane Valley, a protected national park known for its distinctive red earth, verdant palm groves, and fragrant juniper forests. Our 4–5 hour trek takes us through this stunning landscape, passing Berber villages seemingly carved from the mountainside. We'll learn about the region's unique history, including the ancient salt-mining traditions that still survive here. It's a day of profound natural beauty and cultural insight.",
        "duration": "4–5 hours trekking",
        "elevation": "+350m / -350m",
        "accommodation": "Beautiful Riad in Ouirgane",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": "Day 4",
        "title": "Asni Forest Walk & The Flavors of Morocco",
        "description": "We move from the red earth to the lush fruit-growing region around Asni. Our morning is for a gentle walk through pine and oak forests, breathing in the fresh mountain air. The real treat comes in the afternoon, when we roll up our sleeves for a hands-on cooking workshop. In the home of a local family or at a women's cooperative, you'll learn the secrets to making a perfect tagine, fresh salads, and the delicious flatbread, *khobz*, that is the heart of every meal.",
        "duration": "3–4 hours activity",
        "elevation": "+200m / -200m",
        "accommodation": "Charming Guesthouse in Tahanaout",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": "Day 5",
        "title": "Ourika Valley: Waterfalls & Traditions",
        "description": "Today we explore the famous Ourika Valley, a lush gorge carved by a river from the High Atlas. Our path takes us on a guided hike up to the spectacular seven waterfalls of Setti Fatma. The trail is a beautiful, rocky scramble alongside the rushing water. In the afternoon, we'll delve deeper into the local culture with a visit to a saffron garden (in season) or a women's argan oil cooperative, discovering the precious products that come from this fertile land.",
        "duration": "3–4 hours trekking",
        "elevation": "+250m / -250m",
        "accommodation": "Comfortable Guesthouse in Ourika",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": "Day 6",
        "title": "High Altitude to Desert Dunes: A Day of Contrast",
        "description": "This is a day of dramatic transitions. We begin by ascending high into the mountains. Depending on the season, we'll either take an alpine hike through the meadows of Oukaimeden (Morocco's highest ski resort) or explore the Yagour Plateau, famous for its prehistoric rock engravings. After our high-altitude adventure, we witness the landscape change dramatically as we drive to the Agafay Desert. Here, you'll settle into a luxury camp, enjoy a sunset camel ride over the stony plains, and be serenaded by traditional music around a campfire under a canopy of stars.",
        "duration": "4–5 hours trekking",
        "elevation": "+400m / -400m",
        "accommodation": "Luxury Desert Camp, Agafay",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": "Day 7",
        "title": "Agafay Sunrise & Farewell to Morocco",
        "description": "There is no better way to end your journey than with a peaceful sunrise camel ride. Watch as the first light illuminates the vast, quiet expanse of the desert. We'll return to our camp for a final, delicious breakfast. After a week of unforgettable adventures and connections, we'll transfer you back to Marrakech, filled with memories that will last a lifetime.",
        "duration": "1–2 hours activity",
        "elevation": "—",
        "accommodation": "—",
        "meals": "Breakfast"
      }
    ],
    "included": [
      "Professional, multi-activity guide for the entire tour",
      "Private, air-conditioned transport for the full duration of the tour",
      "6 nights accommodation in a mix of charming lodges, riads, and a luxury desert camp",
      "All meals as specified in the itinerary (6 breakfasts, 6 lunches, 6 dinners)",
      "Guided mountain biking activity and all necessary equipment",
      "Hands-on Berber cooking class with all ingredients",
      "Sunset and sunrise camel rides in the Agafay Desert",
      "Constant supply of water, mint tea, and snacks during activities",
      "All entrance fees for parks, gardens, and cooperatives",
      "Full support team (dedicated driver, local specialists where applicable)"
    ],
    "excluded": [
      "International and domestic flights to/from Morocco",
      "Personal travel insurance (highly recommended)",
      "Tips for your guide and driver (a customary gesture of thanks for excellent service)",
      "Personal expenses such as souvenirs or additional drinks",
      "Drinks with meals not specified as included"
    ],
    "whatToBring": [
      "Comfortable and sturdy walking/trekking shoes with good grip",
      "Comfortable daypack (25-30L) to carry daily essentials",
      "Sun protection: a wide-brimmed hat, high-SPF sunscreen, and sunglasses",
      "Warm layers, including a fleece or light down jacket for cool mountain and desert evenings",
      "Reusable water bottle to stay hydrated (we provide refill points)",
      "Camera and/or smartphone with a power bank to capture the incredible scenery",
      "A light jacket or scarf for the breeze during activities and cooler evenings"
    ],
    "bestTime": "March to November offers the most pleasant and varied weather for this multi-region adventure.",
    "physicalRequirements": "A moderate level of fitness is required. This tour is a true mix of activities, including full-day trekking, a guided mountain biking tour on varied terrain, and active cultural days. You should have good stamina for walking and basic cycling ability to fully enjoy the experience.",
    "culturalNotes": "This journey is a deep dive into the diverse cultures of the Al Haouz region. You will visit Amazigh (Berber) communities with rich traditions. We ask that you dress modestly, especially when visiting villages and cooperatives, and always be respectful. Your guide will provide context and help you navigate interactions with locals, ensuring your experience is both authentic and respectful. The luxury desert camp offers a modern take on nomadic traditions, providing comfort while still connecting you to the vast, spiritual landscape of the Agafay.",
    "reviews": [
      {
        "id": 1,
        "name": "Alicia",
        "rating": 5,
        "date": "2024-08-12",
        "comment": "One of the best travel experiences of my life. Every day had something new and the guides were amazing!"
      }
    ]
  },

{
    "id": "luxury-atlas-experience-5day",
    "routeGeoJson": "/routes/luxury-atlas-experience-5day.geojson",
    "title": "The 5-Day Ultimate Atlas Luxury Retreat",
    "duration": 5,
    "difficulty": "Moderate",
    "price": 1299,
    "rating": 4.9,
    "reviewCount": 81,
    "image": "/images/images_by_toure/5-Day Luxury Atlas Experience/Luxury1.jpeg",
    "description": "Indulge in the ultimate Moroccan experience, where the rugged splendor of the Atlas Mountains meets bespoke luxury. This exclusive 5-day retreat is a symphony of breathtaking landscapes, private cultural immersions, and unparalleled comfort. Stay in hand-picked 5-star kasbahs, dine on gourmet cuisine, and enjoy the services of a private guide and concierge, all while experiencing the authentic soul of the High Atlas. This is not just a tour; it is a journey crafted for the discerning traveler.",
    "location": "High Atlas Mountains & Agafay Desert",
    "groupSize": 6,
    "category": "classic",
    "highlights": [
      "Unwind in exquisitely appointed 5-star kasbahs with stunning mountain views.",
      "Enjoy the dedicated expertise of a private, professional guide and driver.",
      "Savor exquisite, gourmet Moroccan cuisine crafted by a private chef.",
      "Rejuvenate your body and soul with exclusive spa and hammam treatments.",
      "Travel in complete comfort with a private vehicle and discreet porter service.",
      "Experience the magic of the Agafay Desert from a private luxury mobile camp."
    ],
    "featured": true,
    "images": ["/images/images_by_toure/5-Day Luxury Atlas Experience/Luxury1.jpeg", "/images/images_by_toure/5-Day Luxury Atlas Experience/Luxury2.jpeg", "/images/images_by_toure/5-Day Luxury Atlas Experience/Luxury3.jpg", "/images/images_by_toure/5-Day Luxury Atlas Experience/Luxury4.jpg", "/images/images_by_toure/5-Day Luxury Atlas Experience/Luxury5.jpg", "/images/images_by_toure/5-Day Luxury Atlas Experience/Luxury6.jpg"],
    "itinerary": [
      {
        "day": "Day 1",
        "title": "Arrival in the High Atlas: Your Mountain Sanctuary",
        "description": "Your private journey begins with a seamless transfer from Marrakech to the foothills of the High Atlas. We'll whisk you away to the iconic Kasbah du Toubkal (or an equivalent luxury property), your sanctuary for the next two nights. After a warm welcome and a tour of the stunning property, enjoy a leisurely afternoon. Choose between a gentle guided walk through a nearby Berber village or indulge in your first rejuvenating spa treatment. As evening falls, savor a spectacular welcome dinner on the terrace, with the silhouette of the mountains as your backdrop and a selection of fine wines curated by our sommelier.",
        "duration": "Private transfer & leisurely afternoon",
        "elevation": "Mountain resort level",
        "accommodation": "5-Star Kasbah du Toubkal",
        "meals": "Lunch, Dinner"
      },
      {
        "day": "Day 2",
        "title": "The Azzaden Valley: A Private Gourmet Trek",
        "description": "After a gourmet breakfast, your private guide will lead you on an unforgettable trek into the breathtaking Azzaden Valley, often called the 'Valley of Happiness'. We'll follow ancient mule paths through lush walnut groves and past traditional Berber villages. Your efforts will be rewarded with a gourmet picnic lunch set up in a spectacular, secluded location. We'll visit a local women's cooperative for a private, hands-on workshop before returning to your kasbah. This evening, relax with a traditional hammam and massage, followed by an intimate roof terrace dinner accompanied by the gentle sounds of traditional Berber music.",
        "duration": "5-6 hours of private trekking",
        "elevation": "Gain 600m, lose 600m",
        "accommodation": "5-Star Kasbah du Toubkal",
        "meals": "All meals (gourmet)"
      },
      {
        "day": "Day 3",
        "title": "The Toubkal Challenge or a Day of Blissful Relaxation",
        "description": "Today is yours to shape. For the adventurous, we offer a private, fully-supported day ascent of North Africa's highest peak, Jbel Toubkal (4,167m). We'll arrange a pre-dawn start with a gourmet breakfast box, and a professional photographer will capture your triumphant summit moment. For those seeking relaxation, the kasbah is your oasis. Enjoy a private yoga session, a bespoke cooking class with the chef, or simply unwind by the pool with a book. Whichever path you choose, the day concludes with a celebratory dinner under the stars.",
        "duration": "10-12 hours (summit option) or full day of leisure",
        "elevation": "2,167m ascent (summit option)",
        "accommodation": "5-Star Kasbah du Toubkal",
        "meals": "All meals (gourmet)"
      },
      {
        "day": "Day 4",
        "title": "From Mountains to Dunes: The Agafay Desert Camp",
        "description": "We bid farewell to the High Atlas and embark on a scenic private 4x4 journey to the starkly beautiful Agafay Desert. Here, a marvel of comfort awaits: our exclusive luxury mobile camp. Your private suite is complete with a king-sized bed, fine linens, and an elegant en-suite bathroom. The afternoon is yours to enjoy a guided nature walk or simply relax in your private lounge. As the sun sets, painting the dunes in hues of gold and rose, your private chef will prepare a spectacular multi-course Moroccan feast served under a canopy of a billion stars.",
        "duration": "Leisurely transfer & desert activities",
        "elevation": "Desert plateau level",
        "accommodation": "Luxury Mobile Camp, Agafay Desert",
        "meals": "All meals (gourmet)"
      },
      {
        "day": "Day 5",
        "title": "Desert Sunrise & Return to Marrakech",
        "description": "Awaken to the serene silence of the desert. Enjoy a final sunrise camel ride or a peaceful morning coffee on your private terrace. After a leisurely breakfast, we begin our journey back to Marrakech. En route, we can stop at a local souk for a spot of curated shopping or visit a renowned argan oil cooperative for a final taste of local culture. We'll enjoy a farewell lunch at an exclusive restaurant on the outskirts of the city before arriving back at your Marrakech hotel or riad in the afternoon, filled with memories of unparalleled luxury and adventure.",
        "duration": "Leisurely morning & private transfer",
        "elevation": "Return to city level",
        "accommodation": "Not included (can arrange 5-star)",
        "meals": "Breakfast, Lunch"
      }
    ],
    "included": [
      "The services of a private, expert guide (English/French/Spanish speaking)",
      "4 nights of luxury accommodation (3 nights in a 5-star kasbah, 1 night in a luxury mobile camp)",
      "All gourmet meals as specified, with selected wine pairings",
      "Private, air-conditioned vehicle and dedicated driver for all transfers",
      "Discreet porter service to handle all luggage from door to door",
      "A rejuvenating hammam and massage treatment",
      "All private cultural experiences and workshops as described",
      "Professional photography service for the Toubkal summit option",
      "All entrance fees and scheduled activities",
      "A dedicated 24/7 concierge service to cater to your every need"
    ],
    "excluded": [
      "Your luxury accommodation in Marrakech (can be arranged upon request)",
      "Helicopter transfers (available as a supplement, please inquire)",
      "Premium alcoholic beverages beyond the included wine selections",
      "Personal shopping and additional spa treatments beyond those specified",
      "International travel insurance (mandatory)",
      "Tips for the staff (discretionary, but greatly appreciated)",
      "International flights to/from Morocco"
    ],
    "whatToBring": [
      "High-quality, comfortable hiking boots for the trekking options",
      "Smart-casual evening attire for dinners at the kasbahs",
      "Layered clothing to adapt to the changing mountain and desert climates",
      "High-SPF sun protection, sunglasses, and a wide-brimmed hat",
      "Your camera and a good book for moments of relaxation",
      "Personal toiletries (though a full range of luxury amenities will be provided)",
      "A comfortable daypack for your daily excursions"
    ],
    "bestTime": "This luxury retreat is designed to be enjoyed year-round, with our accommodations providing comfort in every season.",
    "physicalRequirements": "This tour is designed with flexibility in mind. Options range from easy, scenic walks to a challenging summit ascent. All activities will be tailored to your personal fitness level and preferences.",
    "culturalNotes": "This is a high-end cultural experience that does not compromise on authenticity. We are committed to supporting local communities through fair-trade practices and respectful engagement, ensuring your visit has a positive and lasting impact.",
    "reviews": [
      {
        "id": 1,
        "name": "Victoria & James Morrison",
        "rating": 5,
        "date": "April 18, 2024",
        "comment": "Absolutely spectacular! The Kasbah du Toubkal was stunning - incredible views, impeccable service, gourmet food. Our private guide made trekking enjoyable with perfect pacing. The luxury mobile camp was beyond expectations - proper beds, hot showers, and incredible food in the middle of nowhere! This is how to experience the Atlas Mountains in comfort. Worth every penny."
      }
    ]
  },

  {
    "id": "weekend-atlas-escape-2day",
    "routeGeoJson": "/routes/weekend-atlas-escape-2day.geojson",
    "title": "2-Day Atlas Mountain Retreat: A Weekend Escape from Marrakech",
    "duration": 2,
    "difficulty": "Easy - Moderate",
    "price": 199,
    "rating": 4.7,
    "reviewCount": 124,
    "image": "/images/images_by_toure/2-Day Weekend Atlas Escape/20240512_134915.jpg",
    "description": "Feel the city's noise fade away as we ascend into the breathtaking tranquility of the High Atlas. This is the perfect weekend escape, designed to immerse you in the gentle rhythm of mountain life without demanding a long trek. We'll wander through verdant valleys, share stories with local families, and sleep in a cozy guesthouse, all while feasting on delicious, home-cooked Berber cuisine. It's a quick, complete reset for your mind and body.",
    "location": "Imlil Valley, High Atlas Mountains",
    "groupSize": 12,
    "category": "berber-villages",
    "highlights": [
      "The perfect weekend reset from the buzz of Marrakech.",
      "Gentle, scenic trekking through lush valleys and alongside ancient irrigation canals.",
      "A restful night in a comfortable, traditional mountain guesthouse.",
      "Savor authentic, home-cooked Berber meals prepared with local, organic ingredients.",
      "Discover a hidden waterfall and enjoy the simple pleasure of village exploration.",
      "An ideal first-time taste of the Atlas Mountains and Berber hospitality."
    ],
    "featured": false,
    "images": ["/images/images_by_toure/2-Day Weekend Atlas Escape/20240512_134915.jpg", "/images/images_by_toure/2-Day Weekend Atlas Escape/20241024_125838.jpg", "/images/images_by_toure/2-Day Weekend Atlas Escape/20241117_112811.jpg", "/images/images_by_toure/2-Day Weekend Atlas Escape/week.jpg"],
    "itinerary": [
      {
        "day": "Day 1",
        "title": "From City Bustle to Mountain Serenity",
        "description": "Your weekend begins with a relaxed mid-morning pickup from Marrakech, giving you time to enjoy a leisurely breakfast. As we drive, watch the landscape transform from the flat plains to the majestic foothills of the High Atlas. In about 1.5 hours, we arrive in Imlil, the vibrant heart of the region. After a delicious lunch at our guesthouse, we'll set off on a gentle 3-4 hour afternoon trek. Our path takes us through whispering walnut groves and up to the charming village of Armed. We'll visit a small, local waterfall and perhaps pop into a Berber home to say hello. We'll return to our guesthouse as the sun begins to set, ready for a fantastic, traditional dinner and a peaceful night's sleep.",
        "duration": "3-4 hours of easy trekking",
        "elevation": "Gain 300m, lose 300m",
        "accommodation": "Comfortable Imlil guesthouse",
        "meals": "Lunch, Dinner"
      },
      {
        "day": "Day 2",
        "title": "Valley Views & A Fond Farewell",
        "description": "After a hearty Berber breakfast, we'll embark on our final mountain walk. We'll head towards the village of Aroumd, perched high on the mountainside, which offers absolutely stunning views down the valley. The path is easy and the scenery is spectacular. Along the way, we'll be welcomed into a local Berber home for a traditional mint tea ceremony—a moment of pure connection and hospitality. For those feeling energetic, there's an optional short climb to a viewpoint, or we can visit a local women's cooperative. We'll return to our guesthouse for lunch before beginning our scenic drive back to Marrakech, arriving around 5pm, feeling refreshed and renewed.",
        "duration": "3 hours of morning trekking",
        "elevation": "Gain 200m",
        "accommodation": "Not included",
        "meals": "Breakfast, Lunch"
    }
    ],
    "included": [
      "Licensed English/French speaking mountain guide",
      "Round-trip transport from/to your Marrakech hotel",
      "1 night accommodation in a comfortable guesthouse",
      "All meals as specified (2 lunches, 1 dinner, 1 breakfast)",
      "Traditional mint tea ceremonies",
      "All village visits and coordination with local families",
      "The support of our wonderful team"
    ],
    "excluded": [
      "Your accommodation in Marrakech",
      "Personal expenses and souvenirs",
      "Tips for your guide (a gesture of thanks is always appreciated)",
      "Personal travel insurance"
    ],
    "whatToBring": [
      "Comfortable walking shoes or trainers with good grip",
      "A light daypack to carry your water and camera",
      "Sun protection (a hat, sunglasses, and high-SPF sunscreen)",
      "Light layers you can add or remove as the temperature changes",
      "Your camera to capture the stunning views and smiling faces",
      "Personal items and any necessary medications",
      "A reusable water bottle to help us protect this beautiful environment"
    ],
    "bestTime": "Year-round. Every season paints the valley in a different, beautiful light.",
    "physicalRequirements": "Easy. This tour is suitable for most fitness levels. The walks are gently paced with plenty of time to stop, take photos, and enjoy the scenery.",
    "culturalNotes": "This is a wonderful, short but sweet cultural immersion. It's the perfect introduction for first-time visitors to the Atlas. You'll be a guest in our community, and we ask that you dress modestly (covering shoulders and knees) and be open to the warm, spontaneous interactions that make these journeys so special. It's a glimpse into a way of life that is centered on community, nature, and hospitality.",
    "reviews": [
      {
        "id": 1,
        "name": "Claire Anderson",
        "rating": 5,
        "date": "March 30, 2024",
        "comment": "Perfect weekend break! Just enough time to disconnect and experience mountain life. The guesthouse was cozy, food delicious, and walks were beautiful but not too challenging. Great value for money. Perfect if you're short on time but want authentic Atlas experience!"
      }
    ]
},

  // ========================================================================== 
  // CLASSIC ATLAS TREKS - Additional Tours
  // ==========================================================================

{
  id: "toubkal-2day-ascent",
  routeGeoJson: "/routes/toubkal-2day-ascent.geojson",
  title: "2-Day Mount Toubkal Ascent",
  duration: 2,
  difficulty: "Moderate–Challenging",
  price: 199,
  rating: 4.8,
  reviewCount: 287,
  image: "/images/images_by_toure/2-Day Mount Toubkal Ascent/20240904_072117.jpg",
  description: "This is the ultimate express adventure for those with a fire in their belly and a desire to conquer North Africa's rooftop. In just 48 hours, we will transport you from the vibrant buzz of Marrakech to the serene, powerful silence of the High Atlas. This is more than just a trek; it's a test of spirit and a reward that will stay with you forever—a breathtaking sunrise from the 4,167-meter summit of Mount Toubkal. We've crafted this journey to be fast-paced yet safe, challenging but deeply rewarding.",
  location: "Toubkal National Park, High Atlas",
  groupSize: 12,
  category: "classic",
  highlights: [
    "Stand atop North Africa's rooftop: the triumphant 4,167 m summit of Mount Toubkal.",
    "Witness a breathtaking sunrise from the summit, painting the entire Atlas range and the vast Sahara in hues of gold and rose.",
    "Journey through the heart of Berber culture, passing ancient terraced farms and the sacred shrine of Sidi Chamharouch.",
    "Experience a true mountaineer's night at the Toubkal Refuge (3,207 m), sharing stories under a blanket of stars.",
    "Immerse yourself in a world of dramatic, high-altitude scenery—from lush valleys to stark, lunar-like scree slopes.",
    "The perfect challenge for ambitious trekkers with limited time, without compromising on the experience."
  ],
  featured: true,
  images: ["/images/images_by_toure/2-Day Mount Toubkal Ascent/20240904_072117.jpg", "/images/images_by_toure/2-Day Mount Toubkal Ascent/20241103_075959.jpg", "/images/images_by_toure/2-Day Mount Toubkal Ascent/20250228_135719.jpg", "/images/images_by_toure/2-Day Mount Toubkal Ascent/20250817_071137.jpg"],
  itinerary: [
    {
      day: "Day 1",
      title: "Imlil → The Heart of the Mountain → Toubkal Refuge",
      description: `Our adventure begins after we leave the red city behind, winding our way up into the majestic High Atlas to the bustling trailhead of Imlil (≈ 1,740 m). Here, you'll meet your mountain guide and muleteer team—the heart and soul of your trek. After a warm welcome and gear check, we set off. We follow the gentle path of the Aït Mizane valley, where the air is filled with the scent of walnut and the sound of trickling irrigation canals. We pass through the village of Aroumd, a testament to Berber resilience, carved into the mountainside. Our trail leads us to the sacred pilgrimage site of Sidi Chamharouch, a vibrant splash of color against the grey mountain, where we pause to show our respect. From here, the real ascent begins, our path climbing steadily through rocky terrain as the vegetation thins and the peaks tower above us. We arrive at our destination: the Toubkal Refuge (3,207 m). The afternoon is yours to rest, acclimatize, and prepare for the summit push, as your guide shares stories of the mountain over a warm meal.`,
      duration: "5–6 h trekking",
      elevation: "Gain 1,467 m (1,740 → 3,207 m)",
      accommodation: "Toubkal Refuge (dormitory style)",
      meals: "Lunch, Dinner"
    },
    {
      day: "Day 2",
      title: "Summit Sunrise & Triumphant Descent",
      description: `Today is the day. We rise long before the sun (≈ 4:30–5:00 am), fueled by hot mint tea and a light breakfast. Under a canopy of stars, we begin our final ascent. The path is steep and rocky, a true test of our resolve, but with every step, the anticipation builds. Our goal is to stand on the summit as the first rays of dawn break. And then... magic. The world unfolds beneath you—a 360-degree panorama of the entire High Atlas range, the Anti-Atlas to the south, and on a clear day, the vast expanse of the Sahara. After soaking in the moment and capturing the memory, we begin our descent. We return to the refuge for a well-earned breakfast before continuing our journey down through the valley we climbed yesterday, seeing it in a new light. We arrive back in Imlil by late afternoon, tired but triumphant, for your transfer back to Marrakech.`,
      duration: "8–10 h total (3–4 h up, 5–6 h descent & return)",
      elevation: "Gain ~960 m, descend ~2,427 m",
      accommodation: "Not included (tour ends in Imlil/Marrakech)",
      meals: "Breakfast, Lunch"
    }
  ],
  included: [
    "Licensed English/French mountain guide",
    "Mules or mule support to carry communal gear and food",
    "1 night dormitory accommodation at Toubkal Refuge",
    "All meals on trek (Lunch, Dinner, Breakfast, Snacks)",
    "Park entry permits / liaison fees",
    "Round-trip transport: Marrakech ↔ Imlil (start & end of trek)"
  ],
  excluded: [
    "Flight to Marrakech / initial transport outside program",
    "Personal trekking gear (boots, poles, backpack, etc.)",
    "Sleeping bag / liner (can be rented on site, ~€10–15)",
    "Accommodation in Marrakech before/after trek",
    "Tips for guide, muleteers (suggested €15–25 per person)",
    "Personal snacks, drinks, hot beverages, extras",
    "Winter gear (crampons, ice axe) if needed outside hiking season"
  ],
  whatToBring: [
    "Broken-in trekking boots",
    "Warm layering (fleece, down jacket) and base layers",
    "Waterproof jacket & pants",
    "Headlamp + extra batteries",
    "Sun protection (SPF 50+, hat, sunglasses, lip balm)",
    "Trekking poles (strongly recommended)",
    "Hydration system or 1–1.5 L water bottle",
    "High-energy snacks (nuts, bars, chocolate)",
    "Small daypack (25–30 L) for summit day",
    "Personal toiletries, medications, first aid kit",
    "Camera, power bank, spare batteries",
    "Cash in local currency for tips and refuge extras"
  ],
  bestTime: "Late April through October (avoid heavy snow in winter months)",
  physicalRequirements: "Good fitness essential. You must be able to hike 8–10 h on summit day, with ~960 m of ascent and significant descent. Previous multi-day hike experience is strongly recommended. No technical climbing skills needed (in summer).",
  culturalNotes: `Our mountain home, the Toubkal Refuge, offers a warm and authentic, though simple, high-altitude experience with dormitory-style sleeping and shared facilities. Our journey takes us past the revered shrine of Sidi Chamharouch; as a sign of respect, we ask that you dress modestly and always ask permission before taking photographs. Our local guide and muleteers may observe prayer breaks; these are a natural part of the day's rhythm and a wonderful opportunity for you to rest and quietly reflect on your surroundings. Please note that local registration at park checkpoints is a standard procedure, and your guide will assist with this, though having your passport handy is always a good idea.`,
  reviews: [
    {
      id: 1,
      name: "James Peterson",
      rating: 5,
      date: "June 14, 2024",
      comment: "Absolutely incredible experience! The summit sunrise was worth every step. Our guide Omar kept us at a perfect pace and his knowledge of the mountains was impressive. The 2-day format is intense but achievable if you're reasonably fit. Pro tip: bring good gloves for the cold summit morning!"
    },
    {
      id: 2,
      name: "Sophie Laurent",
      rating: 5,
      date: "May 3, 2024",
      comment: "Tough but totally worth it! Summit day is a serious undertaking—don't underestimate it. The refuge was more comfortable than expected, and the food was surprisingly good. Watching the sunrise from 4,167 m with the Sahara stretching out before us is a memory I'll cherish forever."
    }
  ]
},


{
    "id": "toubkal-3day-azzaden-aguelzim",
    "routeGeoJson": "/routes/toubkal-3day-azzaden-aguelzim.geojson",
    "title": "3-Day Toubkal: The Scenic Azzaden & Aguelzim Traverse",
    "duration": 3,
    "difficulty": "Challenging",
    "price": 289,
    "rating": 4.9,
    "reviewCount": 142,
    "image": "/images/images_by_toure/3-Day Toubkal via Azzaden & Aguelzim/16d6e9c2739.jpeg",
    "description": "Why take the direct path when a masterpiece of a trail awaits? This is the definitive Toubkal experience, crafted for those who believe the journey is as important as the destination. Over three days, we will guide you through the emerald Azzaden Valley, across the breathtakingly high Aguelzim ridge, and finally to the roof of North Africa. This is a challenging, high-altitude adventure that will show you the Atlas from its most dramatic and secluded perspectives.",
    "location": "High Atlas Mountains, Toubkal National Park",
    "groupSize": 10,
    "category": "classic",
    "highlights": [
      "Trek through the stunning, less-traveled Azzaden Valley, a jewel of the High Atlas.",
      "Cross the Tizi Mzik pass (2,489m) for spectacular views into two distinct valleys.",
      "Discover the powerful Ighouliden waterfalls, a hidden cascade deep in the mountains.",
      "Experience the epic high-altitude traverse of the Aguelzim ridge (3,650m).",
      "Conquer Mount Toubkal (4,167m) at sunrise, a truly unforgettable moment.",
      "Rest and recharge in traditional mountain refuges, sharing stories with fellow trekkers."
    ],
    "featured": true,
    "images": ["/images/images_by_toure/3-Day Toubkal via Azzaden & Aguelzim/19897cd11f4.jpeg", "/images/images_by_toure/3-Day Toubkal via Azzaden & Aguelzim/19897cd11f4.jpeg", "/images/images_by_toure/3-Day Toubkal via Azzaden & Aguelzim/18810727c36.jpeg", "/images/images_by_toure/3-Day Toubkal via Azzaden & Aguelzim/20240513_093225.jpg"],
    "itinerary": [
      {
        "day": "Day 1",
        "title": "Imlil → Tizi Mzik → The Heart of the Azzaden Valley",
        "description": "We leave Imlil behind, but instead of following the main crowd, we ascend the Tizi Mzik pass (2,489m). The reward is an immediate and breathtaking panorama of the Imlil valley we've left and the pristine Azzaden valley we are about to enter. We descend into a world of juniper forests and Berber terraces, making a short detour to the spectacular Ighouliden waterfalls. Our path then follows the valley floor, a lush green ribbon carved by the river, passing through friendly villages like Tizi Oussem. Our destination is Azib Tamsoult, a peaceful summer shepherd's hut nestled at the head of the valley, surrounded by towering peaks.",
        "duration": "6-7 hours trekking",
        "elevation": "Gain 749m, lose 639m (net)",
        "accommodation": "Azib Tamsoult mountain refuge (gite)",
        "meals": "Lunch, dinner"
      },
      {
        "day": "Day 2",
        "title": "The Aguelzim Traverse → Toubkal Base Camp",
        "description": "Today is an epic high-mountain journey. We leave the green valley behind and climb steadily up a rocky trail, entering a world of scree and sky. Our goal is the Aguelzim pass (3,650m), a high point on the very spine of the Atlas range. The view from here is unparalleled: the entire Toubkal massif is laid out before you in all its raw, granite glory. We then traverse the ridge before beginning the famous descent down the '99 zigzags' into the main Mizane Valley. This challenging path brings us to the bustling Toubkal Refuge (3,207m), where we'll rest, acclimatize, and prepare for our summit attempt.",
        "duration": "7-8 hours trekking",
        "elevation": "Gain 1,400m, lose 443m (net)",
        "accommodation": "Toubkal Refuge (dormitory)",
        "meals": "Breakfast, lunch, dinner"
      },
      {
        "day": "Day 3",
        "title": "Summit Day & The Long Descent to Imlil",
        "description": "The final push begins in the dark, long before dawn. We ascend by headlamp, the path growing steeper and rockier as we climb the south col. The final section involves some easy scrambling, but every step is worth it. We reach the summit cairn (4,167m) just as the first rays of sun illuminate the world. From this incredible vantage point, you can see the entire Atlas range and the vast expanse of the Sahara Desert to the south. After celebrating our achievement, we descend to the refuge for a well-earned breakfast, then continue our journey down through the valley, passing the sacred shrine of Sidi Chamharouch and the village of Aroumd before arriving back in Imlil, tired but triumphant.",
        "duration": "9-10 hours total",
        "elevation": "Gain 960m, descend 2,427m",
        "accommodation": "Not included",
        "meals": "Breakfast, lunch"
    }
    ],
    "included": [
      "Professional, licensed English/French mountain guide",
      "Mule support for luggage (you carry only a daypack)",
      "2 nights mountain accommodation (refuge/gite)",
      "All meals during the trek (7 meals total)",
      "Toubkal National Park entry fees",
      "Emergency evacuation insurance"
    ],
    "excluded": [
      "Transport Marrakech-Imlil-Marrakech (can be arranged)",
      "Personal trekking gear (boots, poles, etc.)",
      "Sleeping bag (rental available for ~€10)",
      "Tips for guide and refuge staff (greatly appreciated)",
      "Personal travel insurance (highly recommended)",
      "Personal expenses (drinks, snacks at refuges)"
    ],
    "whatToBring": [
      "Broken-in, sturdy trekking boots",
      "Warm layers, including a fleece and down jacket (summit can be -5°C or colder)",
      "Waterproof jacket and pants",
      "Headlamp with spare batteries (essential for summit day)",
      "Sun protection (SPF 50+, hat, sunglasses, lip balm)",
      "Trekking poles (strongly recommended for the descent)",
      "1-2L water capacity or bladder",
      "Personal snacks and energy food",
      "30L daypack for summit day",
      "Toiletries and personal first-aid kit",
      "Camera/phone and power bank"
    ],
    "bestTime": "April through October for the most stable and clear weather conditions.",
    "physicalRequirements": "This is a challenging trek requiring very good cardiovascular fitness and stamina. You will face long days with significant elevation gain, particularly on Day 2. Previous multi-day hiking experience at altitude is essential.",
    "culturalNotes": "This route takes you through the heart of Berber territory, far from the main tourist trail. The Azzaden Valley is a place of authentic life and work. We ask that you dress modestly and be respectful of the local communities and their customs. The mountain refuges are basic but offer a warm, communal atmosphere and a unique chance to meet trekkers from around the world.",
    "reviews": [
      {
        "id": 1,
        "name": "Marcus Klein",
        "rating": 5,
        "date": "September 12, 2024",
        "comment": "What an adventure! The Azzaden route is so much better than the standard Toubkal approach. Day 2 over Aguelzim was tough but absolutely spectacular. Our guide Hassan was excellent, setting the perfect pace and sharing stories about Berber life. The 99 zigzags are real—my legs confirmed it! Summit sunrise was magical."
      },
      {
        "id": 2,
        "name": "Emma Rodriguez",
        "rating": 5,
        "date": "August 5, 2024",
        "comment": "Perfect three-day itinerary for Toubkal. The Azzaden Valley is stunning and far less crowded than the main route. Loved staying in the mountain refuges and meeting other trekkers. The Aguelzim pass was challenging but the views made every step worth it. Highly recommend this route over the standard 2-day climb."
      }
    ]
},

  {
    id: "toubkal-circuit-lake-ifni-6day",
    routeGeoJson: "/routes/toubkal-circuit-lake-ifni-6day.geojson",
    title: "6-Day Toubkal Circuit via Lake Ifni",
    duration: 6,
    difficulty: "Challenging",
    price: 689,
    rating: 4.9,
    reviewCount: 96,
    image: "/images/lake-ifni-circuit.jpg",
    description: "The ultimate High Atlas adventure combining remote wilderness, stunning alpine scenery, and the thrill of summiting Toubkal. Trek through valleys rarely visited by tourists, camp beside Morocco's only alpine lake nestled beneath towering cliffs at 2,295m, cross high mountain passes, and complete your journey with a triumphant ascent of North Africa's highest peak.",
    location: "Toubkal National Park",
    groupSize: 8,
    category: "classic",
    highlights: [
      "Lake Ifni—Morocco's spectacular alpine lake",
      "Remote valleys and traditional villages",
      "Multiple high passes including Tizi Likemt (3,555m)",
      "Summit Toubkal (4,167m) on final day",
      "Camping in pristine mountain locations",
      "Minimal tourist traffic on most of the route",
    ],
    featured: true,
    images: ["/images/lake-ifni-1.jpg", "/images/toubkal-circuit.jpg"],
    itinerary: [
      {
        day: "Day 1",
        title: "Imlil to Tacheddirt via Tizi n'Tamatert",
        description: "Begin with a gradual ascent through the Imlil Valley, passing apple orchards and walnut groves. Climb to Tizi n'Tamatert pass (2,279m) with excellent views back to the valley. Descend to the charming village of Ouaneskra before continuing to Tacheddirt (2,400m), a beautiful high-altitude village surrounded by peaks. Camp near the river beneath the stars.",
        duration: "5 hours trekking",
        elevation: "Gain 660m, lose 200m",
        accommodation: "Camping (tents provided)",
        meals: "Lunch, dinner"
      },
      {
        day: "Day 2",
        title: "Tacheddirt to Azib Likemt via Tizi Likemt",
        description: "The toughest day of the trek. A long, steady ascent over loose scree to Tizi Likemt pass (3,555m), one of the highest trekking passes in the Atlas. The effort is rewarded with your first dramatic views of the Toubkal massif. Long descent to the remote village of Azib Likemt.",
        duration: "7-8 hours trekking",
        elevation: "Gain 1,155m, lose 1,000m",
        accommodation: "Camping at Azib Likemt",
        meals: "Breakfast, lunch, dinner"
      },
      {
        day: "Day 3",
        title: "Azib Likemt to Lake Ifni",
        description: "Cross Tizi n'Ourai pass (3,120m) with stunning views. Descend to the beautiful Amsouzert Valley. Continue climbing through increasingly barren landscape to reach Lake Ifni (2,295m), dramatically situated beneath sheer rock walls. This pristine alpine lake is a sight you'll never forget. Camp lakeside—one of the most special camping spots in Morocco.",
        duration: "6-7 hours trekking",
        elevation: "Varied—multiple ascents/descents",
        accommodation: "Camping at Lake Ifni",
        meals: "Breakfast, lunch, dinner"
      },
      {
        day: "Day 4",
        title: "Lake Ifni to Toubkal Refuge",
        description: "Leave the lake and climb the steep path up endless scree to Tizi n'Ouanoums (3,664m), a dramatic narrow ledge between two rock shafts. This is one of the most spectacular passes in the High Atlas. Long zigzagging descent brings you down to the Toubkal Refuge (3,207m). Rest and prepare for tomorrow's summit attempt.",
        duration: "7 hours trekking",
        elevation: "Gain 1,369m, lose 457m",
        accommodation: "Toubkal Refuge (dormitory)",
        meals: "Breakfast, lunch, dinner"
      },
      {
        day: "Day 5",
        title: "Summit Toubkal & Descent",
        description: "Wake before dawn for the final push. Climb by headlamp up the south col route. Reach the top at sunrise—after five days of trekking, this moment is pure magic. Views extend across the entire Atlas, to the Sahara, and on clear days to the Anti-Atlas. Descend to Sidi Chamharouch and continue to Aroumd village. Transfer to Imlil by evening.",
        duration: "8-10 hours total",
        elevation: "Gain 960m, descend 2,427m",
        accommodation: "Not included",
        meals: "Breakfast, lunch"
      }
    ],
    included: [
      "Professional mountain guide (English/French)",
      "Cook and mule team",
      "4 nights camping + 1 refuge accommodation",
      "All camping equipment (tents, sleeping mats)",
      "All meals during trek",
      "Mule transport for group equipment",
      "National Park fees",
      "Emergency evacuation insurance",
    ],
    excluded: [
      "Transport to/from Imlil",
      "Personal sleeping bag (essential—bring or rent)",
      "Personal trekking equipment",
      "Tips for guide, cook, muleteers",
      "Travel insurance",
      "Accommodation before/after trek",
    ],
    whatToBring: [
      "Sleeping bag (3-season minimum, -5°C rating)",
      "Quality trekking boots",
      "Warm layers (down jacket recommended)",
      "Waterproof jacket and pants",
      "Headlamp with spare batteries",
      "Sun protection essentials",
      "Trekking poles (essential for this trek)",
      "2L water capacity",
      "Personal snacks",
      "Small day pack",
      "Toiletries and medications",
      "Camera and power bank",
    ],
    bestTime: "May-October (avoid winter snow)",
    physicalRequirements: "Challenging trek requiring excellent fitness and stamina. Long days with significant elevation changes. Previous multi-day trekking experience essential. Good head for heights needed at Tizi n'Ouanoums.",
    culturalNotes: "This remote circuit passes through traditional Berber villages where life has changed little in centuries. Respect local customs, dress modestly, and always ask permission before photographing people.",
    reviews: [
      {
        id: 1,
        name: "David Thompson",
        rating: 5,
        date: "July 22, 2024",
        comment: "Absolutely epic trek! Lake Ifni was the highlight—camping beside that pristine alpine lake beneath towering cliffs is something I'll never forget. The circuit is demanding but our guide Mohammed paced it perfectly. Summiting Toubkal after five days of trekking made reaching the top even more meaningful. Best trek I've done anywhere."
      }
    ]
  }
,

  // ==========================================================================
  // 4000m+ PEAKS COLLECTION
  // ==========================================================================

{
    "id": "ouanoukrim-ras-timesguida",
    "routeGeoJson": "/routes/ouanoukrim-ras-timesguida.geojson",
    "title": "3-Day Ouanoukrim Ascent: The Ultimate 4000ers Challenge",
    "duration": 3,
    "difficulty": "Challenging",
    "price": 425,
    "rating": 4.9,
    "reviewCount": 87,
    "image": "/images/images_by_toure/Ras & Timesguida (Ouanoukrim)/Ras & Timesguida6.jpeg",
    "description": "This is the definitive High Atlas mountaineering experience. Go beyond the standard Toubkal trek on this 3-day expedition designed for those who seek a greater challenge. We will guide you from the valley floor in Imlil to the summits of Morocco's second and third-highest peaks: Timesguida (4,089m) and Ras n-Ouanoukrim (4,083m). This journey involves thrilling scrambles, high-altitude camping, and the immense satisfaction of conquering a spectacular and demanding ridge traverse.",
    "location": "Toubkal Massif, High Atlas",
    "groupSize": 6,
    "category": "4000ers",
    "highlights": [
      "Conquer two 4,000m+ summits in a single, epic push.",
      "Experience a thrilling, hands-on scramble along the spectacular Ouanoukrim ridge.",
      "A complete 3-day circuit, allowing for proper acclimatization and a safer ascent.",
      "Stand atop Timesguida (4,089m) and Ras n-Ouanoukrim (4,083m) with unparalleled views.",
      "Enjoy the camaraderie of two nights in the Toubkal Refuge, the heart of the High Atlas."
    ],
    "featured": true,
    "images": ["/images/images_by_toure/Ras & Timesguida (Ouanoukrim)/Ras & Timesguida6.jpeg", "/images/images_by_toure/Ras & Timesguida (Ouanoukrim)/Ras & Timesguida2.jpeg", "/images/images_by_toure/Ras & Timesguida (Ouanoukrim)/Ras & Timesguida3.jpeg", "/images/images_by_toure/Ras & Timesguida (Ouanoukrim)/Ras & Timesguida5.jpeg"],
    "itinerary": [
      {
        "day": "Day 1",
        "title": "Imlil to Toubkal Refuge: The Ascent Begins",
        "description": "Our expedition begins in Imlil (1,740m), the gateway to the High Atlas. After meeting our guide and muleteer team, we set off on the classic path towards the Toubkal Refuge. We'll follow the Mizane Valley, passing through the village of Aroumd and the sacred shrine of Sidi Chamharouch. The trek is a steady climb through stunning scenery, giving our bodies time to begin adjusting to the altitude. We'll arrive at the Toubkal Refuge (3,207m) in the afternoon, with time to rest, hydrate, and enjoy a hearty dinner while our guide provides a detailed briefing for tomorrow's main event.",
        "duration": "5-6 hours trekking",
        "elevation": "Gain 1,467 m (1,740 → 3,207 m)",
        "accommodation": "Toubkal Refuge (dormitory style)",
        "meals": "Lunch, Dinner"
    },
      {
        "day": "Day 2",
        "title": "Summit Day: The Ouanoukrim Ridge Traverse",
        "description": "Today is the challenge we've been preparing for. We'll rise before dawn for an early breakfast, aiming to be on the trail as the first light appears. We leave the main Toubkal route and climb north towards the Tizi n'Ouagane pass. Here, the real adventure begins. We ascend the rocky spine of the Ouanoukrim ridge, a fantastic and exposed scramble that gets the adrenaline pumping. Our first summit is the plateau of Timesguida (4,089m), offering breathtaking views directly across to the face of Jbel Toubkal. We continue along the airy ridge to our second objective, the cairned summit of Ras n-Ouanoukrim (4,083m). After celebrating our achievement, we'll carefully retrace our steps and descend back to the refuge for a well-earned dinner and a deep, satisfying sleep.",
        "duration": "7-8 hours trekking",
        "elevation": "Gain/lose 880m",
        "accommodation": "Toubkal Refuge (dormitory style)",
        "meals": "Breakfast, Packed Lunch, Dinner"
    },
      {
        "day": "Day 3",
        "title": "Descent to Imlil & Reflection",
        "description": "After a leisurely breakfast and a final look at the mountains we've conquered, we begin our descent. The journey back to Imlil gives us a new perspective on the landscape we climbed just two days before. We'll retrace our steps through the Mizane Valley, passing Sidi Chamharouch and Aroumd, with plenty of time to stop for photos and reflect on the incredible achievement. We'll arrive back in Imlil in the afternoon, tired but triumphant, for our transfer back to Marrakech or your next adventure.",
        "duration": "4-5 hours trekking",
        "elevation": "Lose 1,467 m (3,207 → 1,740 m)",
        "accommodation": "Not included",
        "meals": "Breakfast, Lunch"
      }
    ],
    "included": [
      "Expert, certified mountain guide for the entire 3-day expedition",
      "Mules and muleteers to carry communal gear and food",
      "2 nights accommodation in the Toubkal Refuge (dormitory style)",
      "All meals during the trek (2 breakfasts, 3 lunches, 2 dinners, plus snacks)",
      "Technical guidance and safety management on all scrambling sections",
      "Toubkal National Park entry fees"
    ],
    "excluded": [
      "Transport to/from Imlil (we can help arrange this)",
      "Personal trekking gear (boots, poles, backpack, etc.)",
      "Sleeping bag (can be rented at the refuge for ~€10-15)",
      "Tips for guide and muleteers (a customary gesture of thanks is always appreciated)",
      "Personal travel insurance with mountain rescue coverage (mandatory)"
    ],
    "whatToBring": [
      "Sturdy, broken-in mountaineering boots with excellent ankle support",
      "Warm, non-cotton layering system: fleece, down jacket, thermal base layers",
      "A windproof and waterproof jacket and pants (the weather can change in an instant)",
      "Warm gloves, a hat/beanie, and a neck gaiter/buff",
      "High-SPF sun protection (sunscreen, lip balm, sunglasses)",
      "Trekking poles (highly recommended for the descent)",
      "Headlamp with extra batteries (essential for the early morning start)",
      "2L water capacity or bladder and high-energy snacks",
      "A 30L daypack for summit day"
    ],
    "bestTime": "June through September for the most stable weather and minimal snow on the ridge.",
    "physicalRequirements": "Excellent physical fitness is required. This is a demanding high-altitude trek. You must be confident and comfortable scrambling on exposed rock for extended periods and have a very good head for heights. Previous multi-day hiking and experience at altitude is highly recommended.",
    "culturalNotes": "This is a pure mountaineering objective in a sacred mountain environment. Our Berber guides have a deep respect for these peaks. We will move with purpose and respect, leaving no trace and appreciating the profound silence and power of this high-altitude world.",
    "reviews": [
      {
        "id": 1,
        "name": "Alex Kumar",
        "rating": 5,
        "date": "August 23, 2024",
        "comment": "Absolutely brilliant 3-day trip! The pace was perfect, allowing us to acclimatize before the big day. The Ouanoukrim ridge is way more interesting than Toubkal—the scrambling adds so much excitement and the views are phenomenal. Our guide knew every hand and foothold. If you're comfortable with scrambling, don't miss these summits."
      }
    ]
},

  {
    id: "imlil-aroumd-day-loop",
    routeGeoJson: "/routes/imlil-aroumd.geojson",
    title: "Imlil Valley & Aroumd Village: The Authentic Berber Experience",
    duration: 1,
    difficulty: "Easy to Moderate",
    price: 55,
    rating: 4.8,
    reviewCount: 41,
    image: "/images/images_by_toure/imlil-aroumd-day-loop/72619828Master.jpg",
    description: "Escape the city for the 'Little Chamonix' of Morocco. This day trip takes you from Marrakech to the heart of the High Atlas. You will hike through ancient walnut groves, visit the village of Aroumd (1,900m) perched on a glacial moraine, and enjoy a traditional lunch with local families while staring up at the snow-capped peak of Jebel Toubkal.",
    location: "Imlil Valley, High Atlas",
    groupSize: 12,
    category: "Day Trips",
    highlights: [
      "Enjoy a traditional Berber lunch in a local family home with direct views of Mount Toubkal.",
      "Hike through ancient walnut groves and terraced cherry and apple orchards.",
      "Discover the hidden Imlil waterfall and cross the dramatic Mizane Valley floodplain.",
      "Experience the 'Berber Welcome' with fresh mint tea and local bread."
    ],
    featured: false,
    images: ["/images/images_by_toure/imlil-aroumd-day-loop/72619828Master.jpg", 
      "/images/images_by_toure/imlil-aroumd-day-loop/72619839Master.jpg", 
      "/images/images_by_toure/imlil-aroumd-day-loop/72619881Master.jpg", 
      "/images/images_by_toure/imlil-aroumd-day-loop/72619915Master.jpg"],
  "itinerary": [
    {
      "day": "08:30",
      "title": "Pickup in Marrakech & Drive to the High Atlas",
      "description": "Meet your driver in Marrakech and travel via a scenic mountain road towards Imlil, with stops for photos of the Atlas peaks and valleys.",
      "duration": "1.5h drive",
      "elevation": "Marrakech (≈450m) to Imlil (≈1740m)",
      "accommodation": "",
      "meals": ""
    },
    {
      "day": "10:00",
      "title": "Argan Oil Cooperative Visit",
      "description": "Short stop at a women’s argan oil cooperative to see traditional extraction methods and taste argan-based products.",
      "duration": "30m",
      "elevation": "",
      "accommodation": "",
      "meals": "Snacks/tea (sometimes included)"
    },
    {
      "day": "10:30",
      "title": "Guided Walk Through Imlil Valley",
      "description": "Meet the local mountain guide in Imlil and start an easy–moderate walk through walnut and apple orchards, terraced fields, and stone Berber hamlets with views of Mount Toubkal.",
      "duration": "2h walk",
      "elevation": "Approx. +100m / -100m",
      "accommodation": "",
      "meals": ""
    },
    {
      "day": "12:30",
      "title": "Aroumd Village & Berber House Lunch",
      "description": "Arrive in hillside Aroumd village by foot or mule, share mint tea with a local family, and enjoy a home-cooked tagine lunch overlooking the valley and surrounding peaks.",
      "duration": "1.5–2h",
      "elevation": "Aroumd ≈1840m",
      "accommodation": "",
      "meals": "Lunch"
    },
    {
      "day": "14:30",
      "title": "Return Walk to Imlil",
      "description": "Descend via a different path or along the same route, passing waterfalls or irrigated terraces, and return to Imlil village.",
      "duration": "1–1.5h walk",
      "elevation": "Approx. -100m",
      "accommodation": "",
      "meals": ""
    },
    {
      "day": "16:00",
      "title": "Drive Back to Marrakech",
      "description": "Depart Imlil and relax on the drive back to Marrakech, arriving in the early evening and drop-off at your accommodation.",
      "duration": "1.5h drive",
      "elevation": "",
      "accommodation": "",
      "meals": ""
    }
  ],
    included: [
    "Hotel pickup and drop-off in Marrakech.",
    "Round-trip transport in air-conditioned vehicle or minibus.",
    "Local English-speaking mountain guide in Imlil.",
    "Guided walk through Imlil Valley and Berber villages.",
    "Traditional lunch in a Berber house in or near Aroumd.",
    "Mint tea at a local family home.",
    "Visits and photo stops along the route (valley viewpoints, argan cooperative)"
    ],
    excluded: [
    "Personal expenses (extra drinks, snacks, souvenirs).",
    "Tips for guide and driver (optional).",
    "Mule hire for those who prefer not to walk (usually available at extra cost).",
    "Travel insurance beyond basic local coverage."
    ],
    whatToBring: [
    "Comfortable walking or light hiking shoes with good grip.",
    "Layered clothing (mornings and evenings can be cool in the mountains).",
    "Sun protection: hat, sunglasses, and sunscreen.",
    "Reusable water bottle and some snacks.",
    "Light waterproof or windproof jacket in cooler months.",
    "Small daypack for personal items and camera."
    ],
    bestTime: "Year-round",
    physicalRequirements: "Suitable for most travelers with a basic level of fitness, involving 2–4 hours of easy–moderate walking on uneven mountain paths with some short uphill sections; mules are often available for those who prefer to ride part of the route.",
  "reviews": [
    {
      "id": 1,
      "name": "James B",
      "rating": 5,
      "date": "2025-08-15",
      "comment": "A fantastic day in the Atlas Mountains with stunning views, friendly Berber hospitality, and great value for money; the guide made sure everyone was comfortable and engaged throughout the hike."
    },
    {
      "id": 2,
      "name": "Katel J",
      "rating": 5,
      "date": "2021-10-21",
      "comment": "Excellent full-day tour to Imlil with knowledgeable guides, amazing scenery, and a very good balance between walking, village visits, and relaxing breaks."
    }
    ]
  },

{
  "id": "tizi-mzik-pass-ultimate-panoramic-day-trek",
  "routeGeoJson": "/routes/tizi-mzik-pass-day-trek.geojson",
  "title": "Tizi Mzik Pass (2,489m): The Ultimate Panoramic Day Trek",
  "duration": 1,
  "difficulty": "Moderate",
  "price": 35,
  "rating": 4.7,
  "reviewCount": 120,
  "image": "/images/images_by_toure/tizi-mzik-day-trek/20240512_131901.jpg",
  "description": "Full-day circular trek from Imlil up to the Tizi Mzik Pass at 2,489m, offering sweeping views over both the Imlil (Ait Mizane) and Azzaden valleys, classic High Atlas scenery, and encounters with Berber villages.",
  "location": "Imlil, High Atlas Mountains, Morocco",
  "groupSize": 12,
  "category": "Day Trips",
  "highlights": [
    "Climb from Imlil (≈1,740m) to the Tizi Mzik Pass (≈2,489–2,500m) for one of the best panoramic viewpoints in the western High Atlas.",
    "Enjoy superb views over the Imlil (Ait Mizane) Valley and the red Azzaden Valley with traditional terraced fields and villages.",
    "Pass through Mazik/Mzik hamlet and nearby Berber villages with opportunities to meet local families.",
    "Picnic or hot lunch on or near the pass, surrounded by high peaks including parts of the Oukaïmeden range and Tazaghart plateau.",
    "Classic day hike used by trekkers as an acclimatisation and training route before longer Atlas or Toubkal treks.",
    "Flexible descent routes back to Imlil, with options to loop via other hamlets or follow the same scenic trail."
  ],
  "featured": false,
  "images": [
    "/images/images_by_toure/tizi-mzik-day-trek/20240512_131901.jpg",
    "/images/images_by_toure/tizi-mzik-day-trek/pathfinders-treks-full-day-trek-to-tizi-mzik-pass.jpg"
  ],
  "itinerary": [
    {
      "day": "08:30",
      "title": "Start from Imlil & Warm-Up Ascent",
      "description": "Meet your guide in Imlil, check gear, and begin walking on a mule track above the village, passing orchards and traditional stone houses towards the hamlet of Mazik/Mzik.",
      "duration": "1–1.5h walk",
      "elevation": "≈+200m",
      "accommodation": "",
      "meals": ""
    },
    {
      "day": "10:00",
      "title": "Steady Climb to Tizi Mzik Pass",
      "description": "Follow a zigzag path up the western flanks above Imlil, with increasingly wide views over the Ait Mizane valley as altitude increases towards the Tizi Mzik Pass at around 2,489–2,500m.",
      "duration": "1.5–2h walk",
      "elevation": "Total ascent from Imlil ≈+600–700m",
      "accommodation": "",
      "meals": "Short snack break (bring your own or provided by trek crew)"
    },
    {
      "day": "12:00",
      "title": "Panoramic Pass Stop & Lunch",
      "description": "Relax at the Tizi Mzik Pass, taking in sweeping views over the Azzaden Valley, Oukaïmeden range, and surrounding peaks before enjoying a picnic or simple cooked lunch prepared by the support team.",
      "duration": "1–1.5h",
      "elevation": "Pass at ≈2,489–2,500m",
      "accommodation": "",
      "meals": "Lunch"
    },
    {
      "day": "13:30",
      "title": "Descent via Mazik & Surroundings",
      "description": "Descend on the same trail or via a slightly different path towards Mazik, with views back to the pass and across to Azzaden; optional tea stop in a Berber house depending on timing.",
      "duration": "1.5–2h walk",
      "elevation": "≈−600–700m back to Imlil",
      "accommodation": "",
      "meals": "Tea/snack (if arranged)"
    },
    {
      "day": "16:00",
      "title": "Return to Imlil & Relax",
      "description": "Arrive back in Imlil, debrief with your guide, and enjoy free time for a drink or exploration of the village before departure or overnight at your guesthouse.",
      "duration": "30–60m",
      "elevation": "",
      "accommodation": "",
      "meals": ""
    }
  ],
  "included": [
    "Local licensed mountain guide for the full day trek.",
    "Guided circular walk from Imlil to the Tizi Mzik Pass and back.",
    "Picnic or hot lunch during the trek (often at or near the pass).",
    "Tea or soft drinks with lunch, depending on provider.",
    "Basic trekking support such as route planning and safety advice."
  ],
  "excluded": [
    "Transport between Marrakech and Imlil (unless booked as an add-on).",
    "Personal trekking gear (boots, clothing, daypack, poles).",
    "Bottled water and additional snacks beyond what is provided at lunch.",
    "Tips for guide and any muleteers.",
    "Travel and mountain rescue insurance."
  ],
  "whatToBring": [
    "Sturdy hiking boots or trail shoes with good grip; the trail is steep and can be loose in places.",
    "Breathable layered clothing suitable for changing mountain temperatures.",
    "Windproof/waterproof jacket, especially in cooler or unsettled seasons.",
    "Sun hat, sunglasses, and high-SPF sunscreen; the pass is exposed with little shade.",
    "1.5–2L of water per person plus light snacks or energy bars.",
    "Trekking poles for support on the steep ascent and descent (recommended but optional).",
    "Small daypack for layers, camera, and personal items."
  ],
  "bestTime": "Best between March–June and September–November for clear views and comfortable temperatures; possible in winter but snow and ice may make the pass more challenging.",
  "physicalRequirements": "Recommended for hikers with a reasonable level of fitness, as the route involves around 5–6 hours of walking and roughly 600–700m of ascent and descent on steep, sometimes rough mountain trails; no technical climbing, but sustained uphill sections demand good stamina and sure-footedness.",
  "reviews": [
    {
      "id": 1,
      "name": "Anna R",
      "rating": 5,
      "date": "2026-09-18",
      "comment": "Challenging but incredibly rewarding day hike with breathtaking views from the pass over both valleys; a perfect preparation trek before attempting Toubkal."
    },
    {
      "id": 2,
      "name": "Lars M",
      "rating": 4,
      "date": "2025-05-06",
      "comment": "Steep ascent and descent but the scenery was outstanding and our guide set a comfortable pace with plenty of breaks and a great picnic at the top."
    }
  ]
},


{
  "id": "tamsoult-waterfalls-hidden-cascade",
  "routeGeoJson": "routes/tamsoult-waterfalls-hidden-cascade.geojson",
  "title": "Tamsoult Waterfalls (2,250m) – The Hidden Cascade",
  "duration": 1,
  "difficulty": "Moderate–Challenging",
  "price": 45,
  "rating": 4.8,
  "reviewCount": 95,
  "image": "/images/images_by_toure/tamsoult-waterfalls-hidden-cascade/20240512_134922.jpg",
  "description": "A full-day mountain adventure from Imlil that combines a climb over a high Atlas pass with a descent through forests and hamlets to reach the dramatic, little-visited Tamsoult waterfalls, one of the highest cascades in the range.",
  "location": "Azzaden Valley, High Atlas Mountains, Morocco",
  "groupSize": 12,
  "category": "Day Trips",
  "highlights": [
    "Full-day 8-hour trek linking Imlil with the remote Tamsoult waterfalls via a high mountain pass.",
    "Panoramic ascent from Imlil through orchards and Berber hamlets like Tanghourt, Fimlil, and M’Zik with sweeping valley views.",
    "Traverse of classic High Atlas scenery including juniper and pine forests and rugged rock formations.",
    "Arrival at Tamsoult waterfalls (around 2,200–2,300m), among the highest falls in the Atlas with a drop of about 100m.",
    "Opportunity to picnic and, in warmer months, paddle or bathe in the pools beneath the cascade.",
    "Immersive encounters with Berber shepherds and seasonal transhumance communities using high pastures in summer."
  ],
  "featured": false,
  "images": [
    "/images/images_by_toure/tamsoult-waterfalls-hidden-cascade/20240512_134922.jpg",
    "/images/images_by_toure/tamsoult-waterfalls-hidden-cascade/20240512_165509.jpg",
    "/images/images_by_toure/tamsoult-waterfalls-hidden-cascade/20240513_093225.jpg"
  ],
  "itinerary": [
    {
      "day": "08:30",
      "title": "Departure from Imlil and Orchard Ascent",
      "description": "Set off west from Imlil (around 1,740m), climbing on mule trails through almond, walnut, and apple groves with views over Berber hamlets such as Tanghourt, Fimlil, and M’Zik.",
      "duration": "1.5–2h walk",
      "elevation": "≈+300–400m",
      "accommodation": "",
      "meals": ""
    },
    {
      "day": "10:30",
      "title": "High Atlas Panorama Section",
      "description": "Continue ascending towards the high ground, gaining big horizons over the valley and distant ranges while following old shepherd paths and mule tracks.",
      "duration": "1.5h walk",
      "elevation": "Cumulative ascent approaching ≈+600–700m",
      "accommodation": "",
      "meals": "Short snack break en route"
    },
    {
      "day": "12:00",
      "title": "Descent Through Forest to Tamsoult",
      "description": "Drop down through juniper and pine woods between peaks such as Jbel Tasghimout and Adrar Adj, heading into the upper Azzaden valley towards the Tamsoult cascade.",
      "duration": "1–1.5h walk",
      "elevation": "≈−300–400m towards 2,200–2,250m",
      "accommodation": "",
      "meals": ""
    },
    {
      "day": "13:00",
      "title": "Tamsoult Waterfalls Picnic and Relax",
      "description": "Reach the secluded Tamsoult waterfalls (often cited around 2,200m, with a drop close to 100m), enjoy a picnic lunch and, in late spring to early autumn, time to paddle or swim in the natural pools.",
      "duration": "1–1.5h",
      "elevation": "Waterfalls ≈2,200–2,250m",
      "accommodation": "",
      "meals": "Lunch"
    },
    {
      "day": "14:30",
      "title": "Return Ascent and Forest Traverse",
      "description": "Retrace the general route by different shepherd paths, climbing back through the forest and high ground, with fresh perspectives on the surrounding summits and valleys.",
      "duration": "2–2.5h walk",
      "elevation": "≈+300–400m ascent then gradual descent",
      "accommodation": "",
      "meals": "Short breaks with snacks/tea if provided"
    },
    {
      "day": "17:00",
      "title": "Final Descent to Imlil",
      "description": "Follow mule trails back down through orchards and stone hamlets to arrive in Imlil by late afternoon, with time for a final tea before ending the trek.",
      "duration": "30–60m walk",
      "elevation": "Return to ≈1,740m",
      "accommodation": "",
      "meals": ""
    }
  ],
  "included": [
    "Experienced local mountain guide for the full-day trek.",
    "Guided walking route from Imlil to the Tamsoult waterfalls and back.",
    "Picnic or cooked lunch near the waterfalls or at a nearby refuge, depending on provider.",
    "Tea or coffee and light snacks during the day when specified.",
    "Basic safety briefing and route planning before departure."
  ],
  "excluded": [
    "Transport to and from Imlil (unless added from Marrakech as a package).",
    "Personal trekking equipment such as boots, clothing, and poles.",
    "Additional drinks and bottled water beyond what is provided at lunch.",
    "Tips for guide and any support staff.",
    "Travel or mountain rescue insurance."
  ],
  "whatToBring": [
    "Good hiking boots or sturdy trail shoes suitable for steep and sometimes loose terrain.",
    "Comfortable layered clothing to adapt to cool mornings and warmer midday temperatures at altitude.",
    "Waterproof or windproof jacket, especially in shoulder seasons or if showers are forecast.",
    "Sun protection including hat, sunglasses, and high-factor sunscreen.",
    "At least 1.5–2L of water per person plus energy snacks if desired.",
    "Swimwear or quick-dry shorts and a small towel in warmer months for a dip near the falls.",
    "Trekking poles to ease the long ascents and descents (recommended).",
    "Small daypack for carrying layers, water, lunch, and camera."
  ],
  "bestTime": "Generally best from late spring to early autumn for comfortable temperatures and good water flow, with June to September often ideal for swimming conditions at the falls.",
  "physicalRequirements": "Designed for hikers with solid fitness, involving a full day of walking (often 6–8 hours) and roughly 800–1,000m of total ascent and descent on mountain trails; no technical climbing, but the route includes sustained climbs, uneven surfaces, and sections that can feel exposed or tiring, so previous hiking experience is strongly recommended.",
  "reviews": [
    {
      "id": 1,
      "name": "Sophie D",
      "rating": 5,
      "date": "2024-07-09",
      "comment": "Long, demanding but unforgettable day trek; the final approach to the waterfalls and the chance to cool off in the pools made the effort absolutely worth it."
    },
    {
      "id": 2,
      "name": "Marco G",
      "rating": 4,
      "date": "2023-09-22",
      "comment": "Beautiful route with changing scenery from orchards to forests and high cliffs; not an easy walk, but our guide paced it well and the picnic by the cascade was a highlight of our Atlas trip."
    }
  ]
},

  // ==========================================================================
  // DAY HIKES
  // ==========================================================================

{
  "id": "sidi-chamharouch-waterfalls-dayhike",
  "routeGeoJson": "/routes/sidi-chamharouch-waterfalls-dayhike.geojson",
  "title": "Sidi Chamharouch: A Spiritual & Scenic Day Hike",
  "duration": 1,
  "difficulty": "Moderate",
  "price": 65,
  "rating": 4.8,
  "reviewCount": 160,
  "image": "/images/images_by_toure/chamharouchday/cham1.jpg",
  "description": "A full-day experience starting from Marrakech or Imlil, following the classic Toubkal approach trail through Berber villages and orchards to the mystical Sidi Chamharouch shrine at 2,350m, with sweeping views of the Toubkal massif and the Ait Mizane valley.",
  "location": "Imlil & Ait Mizane Valley, High Atlas Mountains, Morocco",
  "groupSize": 12,
  "category": "Day Trips",
  "highlights": [
    "Follow the famous Toubkal trail from Imlil towards the high mountains without committing to the summit.",
    "Walk through the stone-built Berber village of Aroumd, with its walnut groves and terraced fields.",
    "Climb gradually alongside the Assif n'Isougouane riverbed with ever-improving views of Jbel Toubkal and surrounding peaks.",
    "Reach the hamlet of Sidi Chamharouch, a pilgrimage site marked by a large white-painted rock and marabout shrine.",
    "Enjoy a picnic or simple hot lunch near the waterfalls and stream below the shrine.",
    "Ideal acclimatisation hike or standalone spiritual and scenic day in Toubkal National Park."
  ],
  "featured": false,
  "images": [
    "/images/images_by_toure/chamharouchday/cham1.jpg",
      "/images/images_by_toure/chamharouchday/cham3.jpeg", 
      "/images/images_by_toure/chamharouchday/cham4.jpeg", 
      "/images/images_by_toure/chamharouchday/cham5.jpeg"
  ],
  "itinerary": [
    {
      "day": "07:30",
      "title": "Pickup in Marrakech and Drive to Imlil",
      "description": "Depart Marrakech by private or shared vehicle, crossing the Haouz plain and climbing into the High Atlas to reach Imlil (about 1.5 hours). Meet your local mountain guide, enjoy a welcome tea, and prepare for the hike.",
      "duration": "1.5h drive",
      "elevation": "Marrakech ≈450m to Imlil ≈1,740m",
      "accommodation": "",
      "meals": ""
    },
    {
      "day": "09:00",
      "title": "Start of the Toubkal Trail from Imlil",
      "description": "Begin walking south from Imlil on the main mule track used for the Toubkal ascent, following the Reraya / Ait Mizane river and passing small hamlets on the valley floor.",
      "duration": "45–60m walk",
      "elevation": "Gentle ascent of ≈+100m",
      "accommodation": "",
      "meals": ""
    },
    {
      "day": "10:00",
      "title": "Aroumd Village and Valley Views",
      "description": "Climb towards and through the village of Aroumd (≈1,840–1,900m), with stone houses perched above walnut and almond groves and big views back to Imlil and up to the Toubkal massif.",
      "duration": "45–60m walk",
      "elevation": "Cumulative ascent ≈+200m",
      "accommodation": "",
      "meals": "Short tea/snack stop if arranged"
    },
    {
      "day": "11:00",
      "title": "Mule Track to Sidi Chamharouch",
      "description": "Continue on a clear mule trail along the Assif n'Isougouane riverbed, passing small stalls and boulder fields as the valley narrows and the mountains loom above.",
      "duration": "1.5–2h walk",
      "elevation": "Total ascent from Imlil ≈+550–600m",
      "accommodation": "",
      "meals": ""
    },
    {
      "day": "12:30",
      "title": "Arrival at Sidi Chamharouch Shrine",
      "description": "Reach Sidi Chamharouch (around 2,300–2,350m), a hamlet centred on a marabout shrine beneath a large white-painted boulder where pilgrims come seeking healing and blessings.",
      "duration": "30m",
      "elevation": "Shrine ≈2,300–2,350m",
      "accommodation": "",
      "meals": ""
    },
    {
      "day": "13:00",
      "title": "Lunch and Time by the Waterfalls",
      "description": "Enjoy a picnic or simple Berber lunch near the stream and small waterfalls, relax, take photos, and soak up the spiritual atmosphere; non‑Muslims may view but not enter the shrine itself.",
      "duration": "1–1.5h",
      "elevation": "",
      "accommodation": "",
      "meals": "Lunch"
    },
    {
      "day": "14:30",
      "title": "Descent via Aroumd",
      "description": "Retrace the route back down the valley, returning through Aroumd on a slightly different path if conditions permit, with late‑afternoon light over the Imlil valley.",
      "duration": "2–2.5h walk",
      "elevation": "Descent ≈−550–600m to Imlil",
      "accommodation": "",
      "meals": "Optional tea in Aroumd or Imlil"
    },
    {
      "day": "17:00",
      "title": "Drive Back to Marrakech",
      "description": "Meet your driver in Imlil and return to Marrakech, arriving in the early evening at your riad or hotel.",
      "duration": "1.5h drive",
      "elevation": "",
      "accommodation": "",
      "meals": ""
    }
  ],
  "included": [
    "Pickup and drop-off at your accommodation in Marrakech by private or shared vehicle.",
    "Return transfer Marrakech ↔ Imlil.",
    "Local English-speaking Berber mountain guide for the full day.",
    "Guided hike from Imlil to Sidi Chamharouch and back via Aroumd.",
    "Berber picnic or simple hot lunch near Sidi Chamharouch or on the trail.",
    "Mint tea in Imlil or Aroumd (depending on provider)."
  ],
  "excluded": [
    "Personal trekking gear (boots, clothing, daypack, walking poles).",
    "Bottled water and extra snacks beyond what is provided.",
    "Tips for guide and driver.",
    "Travel and mountain rescue insurance."
  ],
  "whatToBring": [
    "Comfortable walking or light hiking shoes with good grip; trails are rocky in places.",
    "Layered clothing to adapt to cooler air at higher altitude and warmer midday sun.",
    "Light windproof or waterproof jacket in case of changing mountain weather.",
    "Sun hat, sunglasses, and sunscreen; much of the route is exposed.",
    "1.5–2L of water per person plus light snacks or energy bars.",
    "Small daypack for water, layers, camera, and personal items.",
    "Respectful clothing suitable for visiting a pilgrimage area (avoid very short shorts/tops)."
  ],
  "bestTime": "Year-round, with the most comfortable conditions typically from March to June and September to November; in winter the trail may have snow or ice higher up but remains a popular low‑level Toubkal approach.",
  "physicalRequirements": "Moderate day hike involving about 5–6 hours of walking and roughly 600m of ascent and descent on a clear but rocky mule track; suitable for regular walkers with basic fitness and sure‑footedness, no technical climbing required.",
  "reviews": [
    {
      "id": 1,
      "name": "Leila S",
      "rating": 5,
      "date": "2024-04-03",
      "comment": "A beautiful introduction to the Toubkal trail with powerful views and a fascinating spiritual stop at Sidi Chamharouch; challenging enough to feel like a real mountain day but very accessible."
    },
    {
      "id": 2,
      "name": "Jonas F",
      "rating": 5,
      "date": "2023-11-18",
      "comment": "Great day out from Marrakech: lovely guide, steady climb through Aroumd, and the shrine area felt unique and atmospheric with the sound of the river below."
    }
  ]
},

{
  "id": "tizi-tamatert-tachedirt-dayhike",
  "routeGeoJson": "/routes/tizi-tamatert-tachedirt-dayhike.geojson",
  "title": "Tizi n'Tamatert Balcony Path to Tachedirt – One-Day High Atlas Trek",
  "duration": 1,
  "difficulty": "Moderate",
  "price": 75,
  "rating": 4.7,
  "reviewCount": 130,
  "image": "/images/images_by_toure/Tizi n'Tamatert Balconies to Tachedirt/tachdirt1.jpeg",
  "description": "Full-day excursion from Marrakech to the High Atlas: transfer to Imlil, then a panoramic trek over Tizi n'Tamatert and along the balcony path through the Imnane valley to Tachedirt and Tighourine, before returning to Marrakech in the evening.",
  "location": "From Marrakech to Imlil & Imnane Valley, High Atlas Mountains, Morocco",
  "groupSize": 12,
  "category": "Day Trips",
  "highlights": [
    "Hotel pickup in Marrakech and scenic drive to Imlil at the foot of the High Atlas.",
    "Ascent from Imlil through Tamatert village to the Tizi n'Tamatert pass with twin valley views.",
    "Balcony path traverse high above the Imnane valley towards Amghdoul and Tachedirt, passing traditional Berber villages.",
    "Lunch in or near Tachedirt, one of the highest Berber villages in Morocco.",
    "Return via Ouaneskra and Tighourine for changing perspectives on the valley and surrounding 3,000–3,800m peaks.",
    "Evening drop-off back at your accommodation in Marrakech after a full Atlas mountain experience in a single day."
  ],
  "featured": false,
  "images": [
    "/images/images_by_toure/Tizi n'Tamatert Balconies to Tachedirt/tachdirt1.jpeg",
    "/images/images_by_toure/Tizi n'Tamatert Balconies to Tachedirt/tachdirt2.jpeg",
    "/images/images_by_toure/Tizi n'Tamatert Balconies to Tachedirt/tachdirt3.jpeg",
    "/images/images_by_toure/Tizi n'Tamatert Balconies to Tachedirt/tachdirt4.jpeg"
  ],
  "itinerary": [
    {
      "day": "07:30",
      "title": "Pickup in Marrakech and Drive to Imlil",
      "description": "Meet your driver at your riad or hotel in Marrakech and travel south across the Haouz plain and up into the High Atlas to reach Imlil (about 1.5–2 hours). Short tea stop on arrival and meet your mountain guide.",
      "duration": "1.5–2h drive",
      "elevation": "Marrakech ≈450m to Imlil ≈1,740m",
      "accommodation": "",
      "meals": ""
    },
    {
      "day": "09:30",
      "title": "Depart Imlil and Ascent to Tamatert",
      "description": "Begin the trek from Imlil, walking on a track through orchards and terraced fields towards Tamatert village, with early views back over the Ait Mizane valley.",
      "duration": "1–1.5h walk",
      "elevation": "≈+200–250m",
      "accommodation": "",
      "meals": ""
    },
    {
      "day": "11:00",
      "title": "Tizi n'Tamatert Pass",
      "description": "Climb through pine and juniper to reach Tizi n'Tamatert (≈2,270m), where you can look down on both the Imlil/Ait Mizane and Imnane valleys dotted with Berber villages.",
      "duration": "1–1.5h walk",
      "elevation": "Cumulative ascent from Imlil ≈+500–550m",
      "accommodation": "",
      "meals": "Snack break"
    },
    {
      "day": "12:00",
      "title": "Balcony Path to Tachedirt",
      "description": "Follow the balcony path contouring along the Imnane valley side, passing above or through villages such as Amghdoul on the way towards Tachedirt, with constant mountain and village panoramas.",
      "duration": "1.5h walk",
      "elevation": "Undulating with gentle descent",
      "accommodation": "",
      "meals": ""
    },
    {
      "day": "13:30",
      "title": "Lunch in or Near Tachedirt",
      "description": "Reach Tachedirt (≈2,300–2,400m) and enjoy a picnic or simple cooked lunch at a local house or on a terrace overlooking the valley.",
      "duration": "1–1.5h",
      "elevation": "Tachedirt ≈2,300–2,400m",
      "accommodation": "",
      "meals": "Lunch"
    },
    {
      "day": "15:00",
      "title": "Return via Ouaneskra and Tighourine",
      "description": "Complete the loop by crossing to the opposite side of the valley and walking back via hamlets such as Ouaneskra, Tamegguist and Tighourine, then descend towards Imlil.",
      "duration": "2–2.5h walk",
      "elevation": "Gradual descent back to ≈1,740m",
      "accommodation": "",
      "meals": "Short tea/snack stop if arranged"
    },
    {
      "day": "17:30",
      "title": "Drive Back to Marrakech",
      "description": "Meet your driver in Imlil, relax on the return drive, and arrive back at your accommodation in Marrakech in the early evening.",
      "duration": "1.5–2h drive",
      "elevation": "",
      "accommodation": "",
      "meals": ""
    }
  ],
  "included": [
    "Hotel/riad pickup and drop-off in Marrakech by private or shared air-conditioned vehicle.",
    "Return road transfer Marrakech ↔ Imlil.",
    "Local licensed mountain guide for the full-day trek.",
    "Guided circular walk Imlil – Tizi n'Tamatert – balcony path – Tachedirt – Tighourine – Imlil.",
    "Picnic or home-cooked lunch in or near Tachedirt.",
    "Mint tea in Imlil or at a village house."
  ],
  "excluded": [
    "Personal trekking equipment (boots, clothing layers, poles).",
    "Bottled water and extra snacks beyond what is provided at lunch.",
    "Tips for guide and driver.",
    "Travel and mountain rescue insurance."
  ],
  "whatToBring": [
    "Comfortable hiking boots or sturdy trail shoes.",
    "Layered clothing to handle cool mornings at the pass and warmer afternoons.",
    "Light windproof/waterproof jacket.",
    "Sun hat, sunglasses and high SPF sunscreen.",
    "1.5–2L of water per person and optional snacks.",
    "Trekking poles (recommended).",
    "Small daypack for water, layers, camera and personal items."
  ],
  "bestTime": "March–June and September–November for clear views and comfortable temperatures; winter departures possible but may involve snow or ice on higher sections.",
  "physicalRequirements": "Suitable for active travelers comfortable with around 6–7 hours of walking and roughly 600m of ascent and descent on mountain tracks and balcony paths; no technical climbing but good general fitness and sure-footedness are required.",
  "reviews": [
    {
      "id": 1,
      "name": "Claire H",
      "rating": 5,
      "date": "2024-05-19",
      "comment": "Door-to-door from Marrakech, amazing balcony views all day and a real sense of being in the high mountains without needing multiple days."
    },
    {
      "id": 2,
      "name": "Thomas K",
      "rating": 4,
      "date": "2023-10-02",
      "comment": "Long but well-paced day; pickup from Marrakech made logistics easy and the variety of villages and scenery kept it interesting throughout."
    }
  ]
},


  // ==========================================================================
  // BERBER VILLAGES - Additional Tours
  // ==========================================================================

{
    "id": "berber-villages-3day-circuit",
    "routeGeoJson": "/routes/berber-villages-3day-circuit.geojson",
    "title": "3-Day Berber Villages Circuit: A Journey into the Heart of the Atlas",
    "duration": 3,
    "difficulty": "Easy-Moderate",
    "price": 289,
    "rating": 4.8,
    "reviewCount": 176,
    "image": "/images/images_by_toure/3-Day Berber Villages Circuit/20250414_113637.jpg",
    "description": "This is more than a trek; it's an immersion. Over three unforgettable days, we will guide you deep into the soul of the High Atlas, where ancient mule paths connect timeless Berber villages. You won't just see the mountains; you'll live within them, sharing meals, stories, and laughter with local families who welcome you as their own. This is your chance to slow down, disconnect from the modern world, and discover a culture built on community, resilience, and profound hospitality.",
    "location": "Imlil & Azzaden Valleys, High Atlas",
    "groupSize": 10,
    "category": "berber-villages",
    "highlights": [
      "Two nights immersed in authentic Berber family homes, experiencing true mountain hospitality.",
      "Savor delicious, home-cooked meals made with love and local, organic ingredients.",
      "Support and learn from a local women's cooperative, discovering the secrets of argan oil.",
      "Get your hands floury in a traditional bread-making workshop with your host family.",
      "If your timing is right, experience the vibrant chaos and color of a weekly village souk (market)."
    ],
    "featured": true,
    "images": ["/images/images_by_toure/3-Day Berber Villages Circuit/20250414_113637.jpg", "/images/images_by_toure/3-Day Berber Villages Circuit/20240506_160847.jpg", "/images/images_by_toure/3-Day Berber Villages Circuit/20250411_113415.jpg", "/images/images_by_toure/3-Day Berber Villages Circuit/20250415_160927.jpg"],
    "itinerary": [
      {
        "day": "Day 1",
        "title": "Imlil → Tizi Mzik Pass → The Azzaden Valley",
        "description": "Our journey begins in Imlil, but we quickly leave the main path behind. We ascend steadily towards the Tizi Mzik pass (2,448m), where we are rewarded with breathtaking panoramic views of the Imlil valley below and the peaks ahead. From here, we descend into the lush, green jewel of the Azzaden Valley, following the river as it carves its way through the landscape. We arrive in the welcoming village of Tizi Oussem, where you'll meet your host family. After settling in and enjoying a delicious lunch, the afternoon is for exploration. In the evening, you won't just eat dinner; you'll help prepare it, joining your host in a cooking demonstration to learn the secrets of a perfect tagine.",
        "duration": "5 hours of beautiful trekking",
        "elevation": "Gain 749m, lose 639m",
        "accommodation": "Family homestay in Tizi Oussem",
        "meals": "Lunch, Dinner"
      },
      {
        "day": "Day 2",
        "title": "Azzaden Valley Life & Ait Aissa",
        "description": "After a hearty breakfast, we start our day with a visit to a local women's cooperative. Here, you'll meet the incredible women who hand-crack argan nuts to produce the precious oil, learning about this vital source of income and empowerment for the community. We then continue our trek through the heart of the valley, passing walnut groves and small hamlets, the sound of the river our constant companion. Our path leads us to the village of Ait Aissa, our home for the night. In the late afternoon, you'll gather for a hands-on bread-making workshop. Feel the dough, smell the wood fire, and taste the satisfaction of creating your own delicious khobz (flatbread).",
        "duration": "4-5 hours of gentle valley walking",
        "elevation": "Varied gentle ups and downs",
        "accommodation": "Family homestay in Ait Aissa",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": "Day 3",
        "title": "A Fond Farewell & Return to Imlil",
        "description": "On our final morning, we'll gain a deeper insight into village life with a visit to the local school (if in session) and see the exterior of the mosque, understanding the central role these institutions play. After saying our goodbyes to our hosts, we begin our final trek. We climb out of the valley and make our way towards Aroumd, a large village perched high above Imlil, offering spectacular final views. From here, it's a short descent back into Imlil, where you can reflect on the incredible connections you've made and the authentic glimpse you've had into a world far from your own.",
        "duration": "3-4 hours of scenic walking",
        "elevation": "Mostly descending with a final climb",
        "accommodation": "Not included",
        "meals": "Breakfast, Lunch"
      }
    ],
    "included": [
      "Experienced, licensed English/French speaking mountain guide",
      "2 nights authentic family homestay accommodation",
      "All meals on the trek (7 meals total: 2 breakfasts, 3 lunches, 2 dinners)",
      "Mule support to carry the main luggage and communal supplies",
      "All workshops and cultural activities as described in the itinerary"
    ],
    "excluded": [
      "Transport to/from Marrakech (we can happily arrange this for you)",
      "Tips for your guide and host families (a gesture of thanks is always appreciated)",
      "Personal travel insurance"
    ],
    "whatToBring": [
      "Light hiking shoes or sturdy trainers",
      "Modest clothing for village visits (covering shoulders and knees)",
      "Light sleeping bag or sleeping bag liner for added comfort and hygiene",
      "Sun protection (hat, sunglasses, high-SPF sunscreen)",
      "Your camera to capture the memories",
      "Small, simple gifts for your host families are a wonderful gesture (e.g., school supplies, fruit, or sweets from your home country)"
    ],
    "bestTime": "March to November offers the most pleasant weather for walking through the valleys.",
    "physicalRequirements": "Easy to moderate. This trek is suitable for anyone with a reasonable level of fitness, including families with children aged 8+.",
    "culturalNotes": "This trek offers a deep and privileged cultural immersion. Berber hospitality is legendary; you will be treated as an honored guest. It is customary to remove your shoes before entering a home and to always accept the offer of mint tea as a sign of friendship. The facilities in the village homes are basic but clean and comfortable—a true part of the authentic experience. We ask that you be flexible, respectful, and open-minded. A smile is the most important thing you can pack.",
    "reviews": [
      {
        "id": 1,
        "name": "Jennifer Walsh",
        "rating": 5,
        "date": "October 11, 2024",
        "comment": "This trek changed how I see travel. Staying with Berber families gave me insights no hotel ever could. The bread-making session was a highlight. Highly recommend for cultural travelers."
      }
    ]
  },

{
    "id": "atlas-trek-village-stay-2day",
    "routeGeoJson": "/routes/atlas-trek-village-stay-2day.geojson",
    "title": "2-Day Atlas Trek & Authentic Berber Village Stay",
    "duration": 2,
    "difficulty": "Easy",
    "price": 165,
    "rating": 4.7,
    "reviewCount": 203,
    "image": "/images/images_by_toure/2-Day Atlas Trek with Village Stay/20240506_153038.jpg",
    "description": "Step away from the hustle and bustle and into the gentle rhythm of mountain life. This is more than a trek; it's an invitation to become part of a Berber family for two days. We've designed this journey to be a perfect, gentle introduction to the breathtaking beauty and profound culture of the High Atlas, ideal for families, first-time hikers, and anyone seeking a genuine connection with Morocco's heartland.",
    "location": "Imlil & Aroumd Valleys",
    "groupSize": 12,
    "category": "berber-villages",
    "highlights": [
      "A gentle, family-friendly trail suitable for all ages and fitness levels.",
      "An authentic overnight stay in a warm, welcoming Berber family home.",
      "Savor delicious, home-cooked meals like Tagine and fresh bread prepared by your hosts.",
      "Explore ancient, terraced fields and learn about traditional mountain agriculture.",
      "Connect with local life through simple, joyful activities perfect for children."
    ],
    "featured": false,
    "images": ["/images/images_by_toure/2-Day Atlas Trek with Village Stay/20240506_153038.jpg", "/images/images_by_toure/2-Day Atlas Trek with Village Stay/20240512_172450.jpg", "/images/images_by_toure/2-Day Atlas Trek with Village Stay/20240506_160812.jpg", "/images/images_by_toure/2-Day Atlas Trek with Village Stay/20250823_102851.jpg"],
    "itinerary": [
      {
        "day": "Day 1",
        "title": "Imlil → A Warm Welcome in the Village",
        "description": "Our adventure begins in the vibrant village of Imlil. From here, we take a short, beautiful walk up to the village of Aroumd (1,843m), perched on the mountainside. The path is easy, offering stunning views and a chance to get our legs warmed up. You'll be greeted with open arms by your host family and welcomed into their home with a traditional glass of sweet mint tea. After a delicious, home-cooked lunch, the afternoon is yours to explore. We'll wander the maze-like paths of the village, see the terraced gardens where the community grows its food, and perhaps share a laugh with the local children. As evening falls, you'll gather with your host family to help prepare dinner, learn about their daily lives, and share stories under a blanket of stars.",
        "duration": "2-3 hours of gentle walking",
        "elevation": "Gain 200m",
        "accommodation": "Traditional Berber family homestay",
        "meals": "Lunch, Dinner"
      },
      {
        "day": "Day 2",
        "title": "Village Life & A Fond Farewell",
        "description": "After a hearty Berber breakfast, perhaps with fresh bread you helped make yesterday, we'll take a deeper look into the local economy. We'll visit a village cooperative, where you can see local women producing argan oil, honey, or weaving beautiful carpets—a perfect chance to purchase authentic souvenirs and directly support the community. Following our visit, we'll begin our leisurely descent back to Imlil. It's a final opportunity to soak in the incredible mountain scenery, say goodbye to your new friends, and reflect on the warmth and generosity you've experienced.",
        "duration": "2 hours of walking",
        "elevation": "Descend 200m",
        "accommodation": "Not included",
        "meals": "Breakfast"
      }
    ],
    "included": [
      "Licensed English/French speaking guide",
      "1 night authentic homestay in a Berber village",
      "All meals as specified (Lunch x1, Dinner x1, Breakfast x1)",
      "Visit to a local village cooperative"
    ],
    "excluded": [
      "Transport from Marrakech to Imlil (we can help arrange this)",
      "Tips for your guide and host family (a gesture of thanks is always appreciated)",
      "Travel insurance"
    ],
    "whatToBring": [
      "Comfortable walking shoes or trainers",
      "Modest clothing (covering shoulders and knees) is essential, especially for village visits",
      "A small backpack for your personal items",
      "Sun protection (hat, sunscreen, sunglasses)",
      "A small, simple gift for your host family is a wonderful gesture (e.g., school supplies, fruit, or sweets from your country)"
    ],
    "bestTime": "Year-round. Each season reveals a different charm of the Atlas Mountains.",
    "physicalRequirements": "Very easy. This is a gentle walk suitable for all ages and fitness levels, including families with young children and older adults.",
    "culturalNotes": "Being a guest in a Berber home is a privilege. It is customary to remove your shoes before entering the house. You will be served mint tea; accepting it is a sign of respect and friendship. Your hosts will be incredibly generous; please be respectful in return by dressing modestly and asking your guide about local customs. This is a unique opportunity to see a way of life that has remained unchanged for centuries.",
    "reviews": [
      {
        "id": 1,
        "name": "Sarah Johnson",
        "rating": 5,
        "date": "September 30, 2024",
        "comment": "Perfect family experience! Our kids (ages 7 and 10) loved staying with the Berber family. Walking was very easy. Highly recommend for first-time visitors."
      }
    ]
  },

  // ==========================================================================
  // NEW PRODUCTS / MULTI-ACTIVITY
  // ==========================================================================

  {
    id: "high-atlas-skyline-traverse",
    routeGeoJson: "/routes/toubkal-circuit-lake-ifni-6day.geojson",
    title: "Toubkal & Lake Ifni Trek – The Wild Heart of the Atlas",
    duration: 7,
    difficulty: "Very Challenging",
    price: 580,
    rating: 4.9,
    reviewCount: 34,
    image: "/images/images_by_toure/High Atlas Skyline Traverse/traverse1.jpg",
    description: "Embark on one of Morocco’s most spectacular alpine routes — the High Atlas Skyline Traverse, an advanced ridge-to-ridge journey linking the highest summits of North Africa. From the valleys of Imlil to the turquoise waters of Lake Ifni and the summit of Jbel Toubkal (4167 m), this demanding expedition combines wild camping, high passes, and exposed scrambling along the skyline of the Toubkal massif. Led by certified mountain guides, this traverse offers a raw immersion in the wilderness of the High Atlas — far from villages and crowds, surrounded by dramatic ridges and vast skies.",
    location: "Toubkal Massif",
    groupSize: 6,
    category: "new-product",
    highlights: [
      "Summit 4-5 peaks over 4,000m",
      "High-level ridge traverses",
      "Technical scrambling sections",
      "Wild camping in remote locations",
      "True alpine expedition",
    ],
    featured: true,
    images: ["/images/images_by_toure/High Atlas Skyline Traverse/traverse1.jpg", "/images/images_by_toure/High Atlas Skyline Traverse/traverse2.jpg", "/images/images_by_toure/High Atlas Skyline Traverse/traverse3.jpeg", "/images/images_by_toure/High Atlas Skyline Traverse/traverse4.jpg"],
    itinerary: [
      {
      day: "Day 1",
      title: "Imlil (1740 m) → Tachdirt (2300 m)",
      description: "Depart from Imlil after breakfast, climbing gradually through the Tamatert Pass (2,280 m). Enjoy panoramic views over the Imnane Valley before descending to Tachdirt, one of the highest Berber villages in the Atlas. Overnight in a local guesthouse (gîte).",
      duration: "5-6 hours",
      elevation: "Gain 600m",
      accommodation: "Mountain camping",
      meals: "Lunch, dinner"
      },

      {
      day: "Day 2",
      title: "Tachdirt → Tizi n’Likemt (3550 m) → Laazib n’Ourai (2800 m)",
      description: "A demanding but rewarding stage. Early start to climb up the long valley to Tizi n’Likemt, a high mountain pass offering stunning views of the surrounding peaks. Descend into the remote valley of Ourai, where shepherds still live seasonally in stone huts (azibs). Camp near Laazib n’Ourai.",
      duration: "7-8 hours",
      elevation: "Gain 1,250m / Loss 750m",
      accommodation: "Wild camping near summit",
      meals: "Breakfast, lunch, dinner"
      },

      {
      day: "Day 3",
      title: "Laazib n’Ourai → Amsouzart (1740 m)",
      description: "Descend gradually through the Ourai Valley to reach Amsouzart, a peaceful Berber village surrounded by walnut trees. Enjoy a warm welcome and overnight stay in a traditional guesthouse.",
      duration: "5-6 hours",
      elevation: "Gain 1,000m",
      accommodation: "High plateau wild camp",
      meals: "Breakfast, lunch, dinner"
      },

      {
      day: "Day 4",
      title: "Amsouzart → Ifni Lake (2295 m)",
      description: "A shorter but beautiful stage. Trek up through terraced fields and narrow valleys to reach the legendary Lake Ifni, the only natural lake in the Toubkal massif. Relax and swim (weather permitting) before camping near the lake.",
      duration: "4-5 hours",
      elevation: "Gain 600m",
      accommodation: "Lake Ifni wild camp",
      meals: "Breakfast, lunch, dinner"
      },

      {
      day: "Day 5",
      title: "Ifni Lake → Tizi n’Ouanoums (3680 m) → Toubkal Refuge (3207 m)",
      description: "Early start for a long and steep ascent to Tizi n’Ouanoums, a dramatic high pass beneath the peaks of Akioud and Ras n’Ouanoukrim. Descend on rocky trails to reach the Toubkal Refuge, nestled in the valley of Sidi Chamharouch.",
      duration: "6-7 hours",
      elevation: "Gain 1,400m / Loss 800m",
      accommodation: "Toubkal Refuge camp",
      meals: "Breakfast, lunch, dinner"
      },

      {
      day: "Day 6",
      title: "Ras n’Ouanoukrim (4083 m) & Timesguida (4089 m) Traverse ",
      description: "For strong groups, optional ascent of these twin 4000 m peaks via a rocky ridge (Grade II scrambling). Return to the refuge after summiting. For those not attempting the peaks, a rest day or lower-altitude hike is possible.",
      duration: "6-7 hours",
      elevation: "Gain 900m / Loss 900m",
      accommodation: "Wild camping in remote valley",
      meals: "Breakfast, lunch, dinner"
      },

      {
      day: "Day 7",
      title: "Toubkal Summit (4167 m) → Imlil (1740 m)",
      description: "Pre-dawn ascent of Jbel Toubkal, North Africa’s highest mountain. From the summit, enjoy 360° views of the Atlas range and the Sahara far to the south. Descend via the refuge and continue down the Mizane Valley to Imlil for a well-deserved lunch and celebration.",
      duration: "8-9 hours",
      elevation: "Gain 900m / Loss 2,400m",
      accommodation: "Guesthouse or transfer",
      meals: "Breakfast, lunch"
      },
    ],
    included: [
      "Certified mountain guide (expert in 4000m routes)",
      "All meals during the expedition",
      "3 nights in Toubkal Refuge",
      "2 nights high camp (tents & equipment)",
      "1 night in Imlil (before or after, based on logistics)",
      "Mule/porter support",
      "Technical equipment (helmets, ropes if needed)",
      "Transfers Marrakech ↔ Imlil",
      "Snacks, tea, and water treatment"
    ],

    excluded: [
      "Personal travel insurance",
      "Crampon/ice axe rental (seasonal)",
      "Sleeping bag",
      "Guide tips",
      "Meals in Marrakech"
    ],

    whatToBring: [
      "Mountaineering boots",
      "Down jacket",
      "Technical layers",
      "Gloves & hat",
      "Headlamp",
      "Trekking poles",
      "Sunglasses & sunscreen",
      "Hydration system (2–3L)"
    ],

    bestTime: "April–October (snow/ice possible in early season)",

    physicalRequirements:
      "Very high fitness required. 6–10 hour summit days, steep couloirs, exposed scrambling, and high-altitude endurance above 4,000m.",

    reviews: [
      {
        id: 1,
        name: "Anna L.",
        rating: 5,
        date: "2024-08-14",
        comment:
          "The most complete mountaineering trip I’ve ever done. Doing all the 4000ers in one week is brutal but unforgettable!"
      },
      {
        id: 2,
        name: "Marc G.",
        rating: 5,
        date: "2024-09-02",
        comment:
          "Incredible guiding, safe, professional, and the route planning was perfect. Every peak was different and spectacular."
      }
    ]
  },

{
    "id": "angour-ridge-tachedirt",
    "routeGeoJson": "/routes/angour-ridge-tachedirt.geojson",
    "title": "The Angour Traverse: A 2-Day High Atlas Ridge Adventure",
    "duration": 2,
    "difficulty": "Moderate-Challenging",
    "price": 225,
    "rating": 4.7,
    "reviewCount": 68,
    "image": "/images/images_by_toure/Angour Ridge to Tachedirt/tachnagor1.jpg",
    "description": "Escape the well-trodden paths and discover the wild, untamed heart of the High Atlas on this thrilling 2-day traverse. We will guide you across the spectacular and exposed Angour Ridge, a challenging and rewarding route that culminates in an overnight stay in Tachedirt, one of the highest and most remote villages in North Africa. This is the ultimate adventure for experienced hikers seeking breathtaking views, authentic cultural immersion, and a profound sense of accomplishment.",
    "location": "Eastern High Atlas Mountains",
    "groupSize": 8,
    "category": "new-product",
    "highlights": [
      "Traverse the dramatic and exposed Angour Ridge (3,620m).",
      "Experience thrilling scrambling on solid rock with immense exposure.",
      "Enjoy unparalleled, panoramic views over Imlil, Oukaïmeden, and the Toubkal massif.",
      "Overnight in Tachedirt (2,350m), one of the highest inhabited villages in the Atlas.",
      "A challenging and rewarding alternative to the busy Toubkal summit routes.",
      "Connect with the authentic, untouched culture of a remote mountain community.",
      "Wild ridge lines, steep couloirs, and quiet shepherd paths."
    ],
    "featured": true,
    "images": [
      "/images/images_by_toure/Angour Ridge to Tachedirt/tachnagor1.jpg",
      "/images/images_by_toure/Angour Ridge to Tachedirt/tachnagor2.jpg",
      "/images/images_by_toure/Angour Ridge to Tachedirt/tachnagor3.jpg",
      "/images/images_by_toure/Angour Ridge to Tachedirt/tachnagor4.jpg",
      "/images/images_by_toure/Angour Ridge to Tachedirt/tachnagor5.jpg"
    ],
    "itinerary": [
      {
        "day": "Day 1",
        "title": "Imlil to Angour Ridge: The Ascent Begins",
        "description": "Our adventure begins in Imlil, the gateway to the High Atlas. We'll ascend through juniper and walnut forests, gaining altitude steadily as we leave the main trails behind. The real challenge starts as we approach the North Face of the Angour Ridge. Here, the path becomes more rugged and exposed, requiring careful footwork and a good head for heights. We'll traverse this breathtaking spine, scrambling over solid rock and pausing at airy viewpoints that offer staggering views down into the Imlil and Azzaden valleys. Our day ends with a final descent into a remote village of Tachedirt, perched dramatically on the mountainside, where we'll be welcomed by a local family for a night of authentic Berber hospitality.",
        "duration": "6-7 hours of trekking",
        "elevation": "Gain 1,200m, descend 200m to Tachedirt",
        "accommodation": "Mountain gîte or family homestay in Tachedirt",
        "meals": "Lunch, Dinner"
      },
      {
        "day": "Day 2",
        "title": "Tachedirt to Imlil: The Ridge Traversed",
        "description": "After a simple, hearty breakfast in our mountain refuge, we begin our descent. The morning light reveals the vast, pristine landscape we traversed the day before. We'll retrace our steps along the ridge, soaking in the final, unforgettable views from a different perspective. The path then leads us down into lush valleys, as the rugged high terrain gives way to greener slopes. We'll arrive back in Imlil by afternoon, tired but deeply fulfilled, with a profound sense of accomplishment and memories of an authentic Moroccan adventure that few will ever experience.",
        "duration": "4-5 hours of trekking",
        "elevation": "Descend 1,000m back to Imlil",
        "accommodation": "Not included",
        "meals": "Breakfast, Lunch"
      }
    ],
    "included": [
      "Services of a certified, English-speaking mountain guide for your safety and enrichment.",
      "Mules and a muleteer to carry communal food and equipment.",
      "1 night of accommodation in a mountain gîte or family homestay in Tachedirt.",
      "All meals on the mountain (2 lunches, 1 dinner, 1 breakfast).",
      "National Park entry fees."
    ],
    "excluded": [
      "Transport to/from Imlil.",
      "Personal trekking gear (boots, backpack, sleeping bag).",
      "Tips for your guide and muleteer (a customary gesture of thanks).",
      "Travel insurance (mandatory).",
      "Lunches and beverages outside of included meals.",
      "Personal expenses and souvenirs."
    ],
    "whatToBring": [
      "Sturdy, broken-in mountaineering boots with excellent ankle support.",
      "A comfortable and well-fitting backpack (30-40L).",
      "Warm layers, including a fleece, down jacket, and waterproof shell jacket.",
      "A warm hat, gloves, and scarf for the summit and cold evenings.",
      "Trekking poles (highly recommended for balance and to save your knees).",
      "Headlamp or flashlight.",
      "High-SPF sunscreen, sunglasses, and lip balm.",
      "Personal first-aid kit and any personal medications you may require.",
      "Plenty of water and high-energy snacks."
    ],
    "bestTime": "June to September for the most stable weather and clearest views.",
    "physicalRequirements": "This is a challenging trek requiring excellent fitness and stamina. You must be comfortable with significant exposure on narrow ridges and scrambling over steep terrain. Previous multi-day trekking experience at altitude is highly recommended.",
    "culturalNotes": "This trek takes you through a pristine and less-traveled area of the High Atlas. The village of Tachedirt is a living, working community. We ask for your respect and discretion when visiting, and to dress modestly. This is a unique opportunity to witness a way of life that has remained unchanged for centuries.",
    "reviews": [
      {
        "id": 1,
        "name": "Claire Dubois",
        "rating": 5,
        "date": "June 25, 2024",
        "comment": "Fantastic ridge walk! Some exposed sections that got the adrenaline going. Views were stunning. Camping on the ridge was magical. Great alternative to standard treks."
      }
    ]
  },

{
  "id": "erber-villages-7day-atlas-immersion",
  "routeGeoJson": "/routes/erber-villages-7day-atlas-immersion.geojson",
  "title": "7-Day Middle Atlas Villages & Culture Immersion",
  "duration": 7,
  "difficulty": "Easy - Moderate",
  "price": 950,
  "rating": 4.9,
  "reviewCount": 52,
  "image": "/images/images_by_toure/7-Day Atlas Villages Cultural Immersion/ifran1.jpg",
  "description": "Explore the heart of the Middle Atlas through 7 days of authentic Amazigh village life, local crafts, markets, and cuisine. Immerse yourself in traditions, music, and hospitality while discovering the cultural richness of the region. This tour starts and ends in Fes with comfortable transfers to the Middle Atlas.",
  "location": "Middle Atlas, Morocco",
  "groupSize": 8,
  "category": "cultural-immersion",
  "highlights": [
    "Stay with local Amazigh families",
    "Hands-on weaving, pottery, and cedar craft workshops",
    "Visit weekly souks in Azrou and Ain Leuh",
    "Traditional Amazigh cooking classes",
    "Cultural evenings with Ahouach music and storytelling",
    "Scenic cedar forests and Barbary macaque sightings",
    "Berber carpet weaving cooperatives",
    "Honey tasting in traditional apiaries"
  ],
  "featured": true,
  "images": [
    "/images/images_by_toure/7-Day Atlas Villages Cultural Immersion/ifran1.jpg",
    "/images/images_by_toure/7-Day Atlas Villages Cultural Immersion/ifran2.jpg",
    "/images/images_by_toure/7-Day Atlas Villages Cultural Immersion/ifran3.jpg",
    "/images/images_by_toure/7-Day Atlas Villages Cultural Immersion/ifran4.jpg",
    "/images/images_by_toure/7-Day Atlas Villages Cultural Immersion/ifran5.jpg"
  ],
  "itinerary": [
    {
      "day": "Day 1",
      "title": "Fes → Azrou (Transfer) & Orientation",
      "description": "Depart Fes in the morning by private transfer to the Middle Atlas. Arrive in Azrou, settle in at your guesthouse, take a short walk in the cedar forest to see Barbary macaques, and enjoy a welcome orientation and dinner with Amazigh families.",
      "duration": "2-3 hours",
      "elevation": "1000m",
      "accommodation": "Traditional Amazigh guesthouse in Azrou",
      "meals": "Dinner"
    },
    {
      "day": "Day 2",
      "title": "Azrou Weekly Souk & Cedar Forest",
      "description": "Visit Azrou's vibrant weekly souk (Wednesday), explore the cedar forest with Barbary macaque sightings, meet local Amazigh artisans, and observe traditional cedar wood carving.",
      "duration": "6-7 hours",
      "elevation": "1200m",
      "accommodation": "Traditional Amazigh guesthouse in Azrou",
      "meals": "Breakfast, Lunch, Dinner"
    },
    {
      "day": "Day 3",
      "title": "Transfer to Ain Leuh & Weaving Workshop",
      "description": "Travel to Ain Leuh, visit the famous women's weaving cooperative, participate in hands-on Amazigh rug-making, and learn about natural dyeing techniques.",
      "duration": "1-2 hours",
      "elevation": "1400m",
      "accommodation": "Guesthouse in Ain Leuh",
      "meals": "Breakfast, Lunch, Dinner"
    },
    {
      "day": "Day 4",
      "title": "Kasbah My Slim & Cultural Immersion",
      "description": "Head to Kasbah My Slim, visit local honey producers, taste different varieties of Middle Atlas honey, and participate in a cooking class preparing traditional Amazigh dishes.",
      "duration": "4-5 hours",
      "elevation": "1300m",
      "accommodation": "Guesthouse in Kasbah My Slim",
      "meals": "Breakfast, Lunch, Dinner"
    },
    {
      "day": "Day 5",
      "title": "Beni Mellal & Traditional Crafts",
      "description": "Visit Beni Mellal region villages, meet local artisans, observe traditional pottery making, and explore the beautiful Ouzoud waterfalls area.",
      "duration": "5-6 hours",
      "elevation": "600-800m",
      "accommodation": "Guesthouse in Beni Mellal region",
      "meals": "Breakfast, Lunch, Dinner"
    },
    {
      "day": "Day 6",
      "title": "Cultural Evening & Local Traditions",
      "description": "Enjoy a cultural evening with traditional Ahouach music, storytelling, and tea ceremonies. Optional short walk to a scenic viewpoint in the surrounding village.",
      "duration": "3-4 hours",
      "elevation": "Minimal",
      "accommodation": "Guesthouse in Beni Mellal region",
      "meals": "Breakfast, Lunch, Dinner"
    },
    {
      "day": "Day 7",
      "title": "Beni Mellal → Fes (Return)",
      "description": "Relaxed morning, optional market shopping, reflection session with your guide, then private transfer back to Fes for drop-off and departure.",
      "duration": "4-5 hours",
      "elevation": "Minimal",
      "accommodation": "—",
      "meals": "Breakfast"
    }
  ],
  "included": [
    "Local certified Amazigh guide",
    "All accommodations (traditional guesthouses)",
    "All breakfasts, lunches, and dinners",
    "Cultural workshops and craft experiences",
    "Tea breaks and snacks",
    "Transport between villages and transfers to/from Fes",
    "Entrance fees to mentioned sites",
    "Honey tasting sessions",
    "Cooking class with local ingredients"
  ],
  "excluded": [
    "International and regional flights",
    "Personal travel insurance",
    "Optional activities not mentioned",
    "Tips and gratuities",
    "Personal expenses",
    "Beverages with meals"
  ],
  "whatToBring": [
    "Comfortable walking shoes",
    "Layers for changing weather (mountain climate)",
    "Sun protection (hat, sunscreen, sunglasses)",
    "Camera",
    "Notebook for cultural notes",
    "Respectful clothing for village visits",
    "Small gifts for host families (optional)"
  ],
  "bestTime": "April to June, September to November",
  "physicalRequirements": "Light to moderate activity level. Walking on village paths and some easy trails. Suitable for all adults with average fitness.",
  "culturalNotes": "The Middle Atlas is home to diverse Amazigh tribes with unique traditions. Visitors should respect local customs, especially during religious or cultural events. Photography should always be permission-based.",
  "reviews": [
    {
      "id": 1,
      "name": "Emma R.",
      "rating": 5,
      "date": "2023-10-12",
      "comment": "A truly immersive experience! I loved learning about Amazigh crafts, tasting homemade dishes, and connecting with local families. The cedar forest with Barbary macaques was a highlight!"
    },
    {
      "id": 2,
      "name": "James P.",
      "rating": 5,
      "date": "2023-09-05",
      "comment": "Middle Atlas villages are beautiful and authentic. The guide was excellent and the workshops unforgettable. The honey tasting was surprisingly fascinating!"
    }
  ]
},

  {
    "id": "hidden-4000ers-weekend",
    "routeGeoJson": "/routes/hidden-4000ers-weekend.geojson",
    "title": "The Toubkal Seven: The Ultimate 4000ers Expedition",
    "duration": 7,
    "difficulty": "Extreme – High Altitude Mountaineering",
    "price": 1290,
    "rating": 5.0,
    "reviewCount": 41,
    "image": "/images/images_by_toure/Hidden 4000ers Weekend/peak1.jpg",
    "description": "This is the definitive High Atlas mountaineering expedition—a rite of passage for seasoned trekkers seeking the ultimate challenge. Over seven days, we will guide you on an unparalleled journey to conquer the seven summits over 4000 meters that define the Toubkal massif. This is not just a trek; it is a complete high-altitude traverse, combining technical ascents, dramatic ridge lines, and strategic acclimatization to achieve what most only dream of. This is your chance to join the elite few who can say they have truly mastered the High Atlas.",
    "location": "Toubkal National Park, High Atlas",
    "groupSize": 6,
    "category": "mountaineering",
    "highlights": [
      "Achieve the 'Grand Slam': Conquer the Toubkal Seven in a single, epic expedition.",
      "Master the High-Altitude Traverse: Scramble the iconic Angour Ridge and traverse the dramatic Toubkal West plateau.",
      "Strategic Acclimatization: Our expertly paced itinerary is designed for maximum summit success and safety.",
      "Full Expedition Support: Mules and porters carry the load, leaving you free to focus on the climb.",
      "Exclusive High-Altitude Camping: Experience the solitude of the Atlas rooftop under a blanket of stars."
    ],
    "featured": true,
    "images": [
      "/images/images_by_toure/Hidden 4000ers Weekend/peak1.jpg",
      "/images/images_by_toure/Hidden 4000ers Weekend/peak2.jpg",
      "/images/images_by_toure/Hidden 4000ers Weekend/peak3.jpg",
      "/images/images_by_toure/Hidden 4000ers Weekend/peak4.jpg",
      "/images/images_by_toure/Hidden 4000ers Weekend/peak5.jpg",
      "/images/images_by_toure/Hidden 4000ers Weekend/peak6.jpg"
    ],
    "itinerary": [
      {
        "day": "Day 1",
        "title": "The Ascent Begins: Marrakech to the Toubkal Refuge (3,207m)",
        "description": "Your expedition begins in the vibrant heart of Marrakech, but the true call of the mountains is already pulling you. We transfer to Imlil, the bustling gateway to the High Atlas, where you'll meet your expert guide and team. The trek to the Toubkal Refuge is not just a walk; it's the first step in your acclimatization, a steady climb through the Mizane Valley to 3,207 meters. Here, in the shadow of North Africa's highest peaks, we'll prepare our bodies and minds for the incredible journey ahead over a hearty dinner.",
        "duration": "5–6 hours",
        "elevation": "Gain 1,467m",
        "accommodation": "Toubkal Refuge",
        "meals": "Dinner"
      },
      {
        "day": "Day 2",
        "title": "The Acclimatization Test: Toubkal West Plateau & Base Camp",
        "description": "Today is a crucial day for acclimatization. We'll make a challenging ascent to the Toubkal West plateau (3,800m), a vast, rocky expanse that offers our first stunning, panoramic views of the giants we aim to summit. This test of our endurance at altitude helps prepare our bodies for the thinner air to come. We'll return to our base camp at the refuge, tired but accomplished, ready for the main event.",
        "duration": "5–6 hours",
        "elevation": "Gain 800m / Loss 800m",
        "accommodation": "Toubkal Refuge",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": "Day 3",
        "title": "The First Conquest: Ouanoukrim (4,088m) & Timesguida (4,089m)",
        "description": "This is what we've trained for. An early start takes us across the rocky slopes towards the iconic Angour Ridge. The climb is a true test of our scrambling skills on solid rock, with exhilarating exposure on both sides. The reward is immeasurable: the summit of Ouanoukrim, followed by the traverse to the slightly higher peak of Timesguida. Standing here, you'll feel on top of the world, with the entire Toubkal massif spread beneath you. We return to our camp, our first two 4000ers conquered, filled with a profound sense of achievement.",
        "duration": "7–9 hours",
        "elevation": "Gain 900m / Loss 900m",
        "accommodation": "Toubkal Refuge",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": "Day 4",
        "title": "The High Point: Afella (4,043m) & Akioud (4,030m)",
        "description": "Today we push deeper into the massif. Our goal is the Afella plateau, a remote and wild area. The climb is strenuous but rewards us with unparalleled solitude and a raw sense of adventure. After summiting Afella, we traverse to Akioud, a lesser-known peak with breathtaking views. This is a day of true exploration, far from the crowds, where the only sounds are the wind and our own footsteps.",
        "duration": "6–7 hours",
        "elevation": "Gain 800m / Loss 800m",
        "accommodation": "Toubkal Refuge",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": "Day 5",
        "title": "The Ultimate Prize: Toubkal (4,167m) & The Final Traverse",
        "description": "The pinnacle of our expedition. We rise before dawn for our attempt on Jbel Toubkal (4,167m), the roof of North Africa. The final ascent is a physical and mental battle, a steep climb on scree in the thin air, but every step is powered by the strength and skill we've gained. The sunrise from the summit is a moment of pure magic, a 360-degree view that makes every hardship worthwhile. We are not just observers; we are conquerors. The journey isn't over yet; we must traverse the Toubkal West plateau, a final, challenging ridge walk back to the refuge, and then descend to Imlil, forever changed by this experience.",
        "duration": "8–10 hours",
        "elevation": "Gain 1,000m / Loss 1,000m",
        "accommodation": "Toubkal Refuge",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": "Day 6",
        "title": "The Descent & Reflection",
        "description": "A well-deserved breakfast and a final, celebratory look at the mountains we have mastered. The descent is a time for reflection, to share stories with your fellow mountaineers, and to let the magnitude of our achievement sink in. We arrive back in Imlil as heroes, with a bond forged in the thin air of the High Atlas.",
        "duration": "4–5 hours",
        "elevation": "Loss 1,467m",
        "accommodation": "Toubkal Refuge",
        "meals": "Breakfast, Lunch"
      },
      {
        "day": "Day 7",
        "title": "The Final Peak: Akioud (4,030m)",
        "description": "For those who still have fire in their legs, there is one final, optional challenge: a sunrise ascent of Akioud. It's a final, glorious ridge walk before we transfer back to Marrakech, bringing our epic journey to a close. We return not as tourists, but as true mountaineers, with the seven peaks of the Toubkal massif now a part of our history.",
        "duration": "5–6 hours",
        "elevation": "Gain 400m / Loss 400m",
        "accommodation": "Not included",
        "meals": "Breakfast"
      }
    ],
    "included": [
      "Services of a certified, English-speaking mountain guide for your safety and enrichment.",
      "All meals during the expedition (breakfasts, lunches, dinners).",
      "3 nights accommodation in Toubkal Refuge (dormitory style).",
      "2 nights high-altitude camping (tents, sleeping mats, and stools).",
      "Mules and porters to carry all communal food, equipment, and personal luggage.",
      "Technical mountaineering equipment (helmet, harness if necessary).",
      "National Park entry fees.",
      "Satellite phone for emergency communication.",
      "Celebratory dinner on the final night."
    ],
    "excluded": [
      "Transport to/from Marrakech and Imlil.",
      "Personal trekking gear (broken-in mountaineering boots, backpack, sleeping bag).",
      "High-altitude sleeping bag (4-season, -10°C comfort rating).",
      "Personal travel insurance with helicopter evacuation coverage (mandatory).",
      "Tips for guide, cook, and muleteer team (discretionary but greatly appreciated).",
      "Alcoholic beverages and personal snacks."
    ],
    "whatToBring": [
      "Sturdy, broken-in mountaineering boots with excellent ankle support.",
      "A 40-65L backpack for carrying personal gear on summit days.",
      "Layered clothing system: thermal base layers, fleece jacket, waterproof/windproof shell jacket, down jacket.",
      "Warm hat, gloves, buff or balaclava.",
      "High-quality 4-season tent, sleeping pad, and lightweight sleeping bag liner.",
      "Trekking poles (highly recommended).",
      "Headlamp with extra batteries.",
      "High-SPF sunscreen, lip balm, and sunglasses.",
      "Personal first-aid kit with blister treatment and pain relievers.",
      "2-3L water bottles or a hydration reservoir.",
      "High-energy snacks (energy bars, gels, nuts).",
      "Satellite phone or personal locator beacon.",
      "Camera and spare batteries/power bank.",
      "Toilet paper and a small trowel."
    ],
    "bestTime": "June to September for the most stable weather and clearest skies.",
    "physicalRequirements": "This is an extreme expedition requiring excellent physical fitness, significant prior multi-day trekking experience at altitude, and comfort with exposed scrambling and steep terrain. A medical check-up is highly recommended before attempting this expedition.",
    "culturalNotes": "This expedition takes you through a pristine and respected natural environment. We practice Leave No Trace principles and strictly follow all park regulations. Our Berber muleteer team is essential to our success and carries generations of mountain knowledge.",
    "reviews": [
      {
        "id": 1,
        "name": "Anna L.",
        "rating": 5,
        "date": "2023-09-15",
        "comment": "The most physically demanding and rewarding thing I have ever done. Our guide, Hassan, was a true professional—his knowledge of the terrain and pacing was perfect. The feeling of standing on the last summit, Akioud, with the entire range behind us, was indescribable. This expedition is the gold standard for High Atlas mountaineering."
      },
      {
        "id": 2,
        "name": "Ben Carter",
        "rating": 5,
        "date": "2023-07-20",
        "comment": "Incredible logistics and support. The food was surprisingly good at the refuge and the high camps were well-managed. The traverse of the Angour Ridge was the highlight for me—exposed but so safe. A life-changing experience!"
      }
    ]
  }

  
]
