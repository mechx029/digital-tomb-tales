
export interface Grave {
  id: string;
  title: string;
  epitaph: string;
  author: string;
  timestamp: string;
  category: string;
  reactions: {
    skull: number;
    fire: number;
    crying: number;
    clown: number;
  };
  shares: number;
  image?: string;
  featured: boolean;
  packageType: 'basic' | 'premium' | 'video' | 'featured' | 'bundle';
}

export const categories = [
  'Funny', 'Cringe', 'Exes', 'Crypto', 'Tech', 'Politics', 'Trends', 'Serious'
];

export const mockGraves: Grave[] = [
  {
    id: '1',
    title: 'My "I Can Fix Him" Era',
    epitaph: 'Bestie really thought she could save a man who still uses Internet Explorer. Here lies 8 months of pure delusion and trauma bonding.',
    author: 'MainCharacterEnergy',
    timestamp: '2024-01-15T10:30:00Z',
    category: 'Exes',
    reactions: { skull: 2847, fire: 1293, crying: 4561, clown: 892 },
    shares: 1847,
    featured: true,
    packageType: 'featured'
  },
  {
    id: '2',
    title: 'Thinking Elon Would Notice My Reply',
    epitaph: 'Spent 3 hours crafting the perfect comeback tweet only to get ratio\'d by a 14-year-old with a anime pfp. The audacity was astronomical.',
    author: 'TwitterFingerz',
    timestamp: '2024-01-14T15:45:00Z',
    category: 'Tech',
    reactions: { skull: 1567, fire: 2134, crying: 678, clown: 3421 },
    shares: 892,
    featured: false,
    packageType: 'premium'
  },
  {
    id: '3',
    title: 'My BeReal Streak (Day 1-1)',
    epitaph: 'Downloaded BeReal to be authentic. Posted one blurry selfie of my double chin and immediately deleted the app. Authenticity is overrated.',
    author: 'NotLikeOtherGirls',
    timestamp: '2024-01-14T09:20:00Z',
    category: 'Trends',
    reactions: { skull: 892, fire: 456, crying: 234, clown: 1678 },
    shares: 456,
    featured: true,
    packageType: 'premium'
  },
  {
    id: '4',
    title: 'Buying Dogecoin Because of a Meme',
    epitaph: 'To the moon they said. Much wow they said. My portfolio said otherwise. Here lies $2000 and my trust in Shiba Inus.',
    author: 'DiamondHandsBro',
    timestamp: '2024-01-13T14:00:00Z',
    category: 'Crypto',
    reactions: { skull: 3456, fire: 1789, crying: 2341, clown: 892 },
    shares: 1234,
    featured: true,
    packageType: 'featured'
  },
  {
    id: '5',
    title: 'My Spotify Wrapped Villain Era',
    epitaph: 'Top artist: Taylor Swift. Top song: Anti-Hero (649 plays). Even Spotify knew I was the problem. The mirror never lies bestie.',
    author: 'SwiftieSupremacy',
    timestamp: '2024-01-13T11:30:00Z',
    category: 'Trends',
    reactions: { skull: 1234, fire: 2789, crying: 1567, clown: 678 },
    shares: 934,
    featured: false,
    packageType: 'basic'
  },
  {
    id: '6',
    title: 'Thinking I Could Pull Off Curtain Bangs',
    epitaph: 'Pinterest lied. YouTube tutorials lied. My mirror reflected pure chaos. Spent $200 at the salon to fix what TikTok told me to do.',
    author: 'BaddieOnABudget',
    timestamp: '2024-01-12T16:45:00Z',
    category: 'Cringe',
    reactions: { skull: 2134, fire: 567, crying: 3421, clown: 1789 },
    shares: 1456,
    featured: true,
    packageType: 'premium'
  },
  {
    id: '7',
    title: 'My LinkedIn Influencer Phase',
    epitaph: 'Posted daily motivation quotes while unemployed. "Hustle culture" hit different when you\'re eating ramen for the 30th day straight.',
    author: 'FakeItTillYouMakeIt',
    timestamp: '2024-01-12T13:15:00Z',
    category: 'Serious',
    reactions: { skull: 1789, fire: 1234, crying: 2567, clown: 892 },
    shares: 678,
    featured: false,
    packageType: 'basic'
  },
  {
    id: '8',
    title: 'Believing My Situationship Had Potential',
    epitaph: 'He texted "wyd" at 2am for 6 months straight. I really thought we were building something special. The delusion was immaculate.',
    author: 'PickMeEnergyQueen',
    timestamp: '2024-01-11T10:00:00Z',
    category: 'Exes',
    reactions: { skull: 4567, fire: 892, crying: 5234, clown: 1456 },
    shares: 3421,
    featured: true,
    packageType: 'featured'
  },
  {
    id: '9',
    title: 'My Dark Academia Pinterest Board',
    epitaph: 'Collected 2000+ pins of Oxford libraries and vintage typewriters. Never read a book. The aesthetic was more important than the education.',
    author: 'AestheticOverEverything',
    timestamp: '2024-01-11T08:30:00Z',
    category: 'Trends',
    reactions: { skull: 1456, fire: 2789, crying: 567, clown: 2134 },
    shares: 1789,
    featured: false,
    packageType: 'premium'
  },
  {
    id: '10',
    title: 'Thinking I Could Be a Twitch Streamer',
    epitaph: 'Streamed for 8 hours to an audience of 2 (my mom and a bot). Chat was drier than my personality. The grind was not worth it.',
    author: 'WouldBeInfluencer',
    timestamp: '2024-01-10T19:20:00Z',
    category: 'Tech',
    reactions: { skull: 2341, fire: 1567, crying: 892, clown: 3456 },
    shares: 1234,
    featured: true,
    packageType: 'premium'
  },
  {
    id: '11',
    title: 'My Plant Mom Era (RIP Succulents)',
    epitaph: 'Killed 12 "unkillable" plants in 3 months. Even cacti gave up on me. My green thumb was actually a black thumb of death.',
    author: 'PlantMomFail',
    timestamp: '2024-01-10T14:45:00Z',
    category: 'Funny',
    reactions: { skull: 1789, fire: 678, crying: 2456, clown: 1234 },
    shares: 892,
    featured: false,
    packageType: 'basic'
  },
  {
    id: '12',
    title: 'Buying Every Viral TikTok Product',
    epitaph: 'Pink sauce, cloud couch, Stanley cup, those weird leggings. Spent $800 on junk that broke in 2 weeks. TikTok Shop was my downfall.',
    author: 'TikTokMadeMeBuyIt',
    timestamp: '2024-01-09T16:30:00Z',
    category: 'Trends',
    reactions: { skull: 3421, fire: 2134, crying: 1567, clown: 892 },
    shares: 2789,
    featured: true,
    packageType: 'featured'
  },
  {
    id: '13',
    title: 'My Discord Mod Power Trip',
    epitaph: 'Banned 47 people for using lowercase in general chat. The power corrupted my soul. Touch grass was never an option.',
    author: 'PowerTrippingMod',
    timestamp: '2024-01-09T12:00:00Z',
    category: 'Tech',
    reactions: { skull: 2789, fire: 1456, crying: 678, clown: 4567 },
    shares: 1892,
    featured: false,
    packageType: 'premium'
  },
  {
    id: '14',
    title: 'Thinking Therapy Could Wait',
    epitaph: 'Chose retail therapy over real therapy. Now I have 50 packages and 500 problems. Amazon Prime was not the solution to my trauma.',
    author: 'RetailTherapyQueen',
    timestamp: '2024-01-08T11:15:00Z',
    category: 'Serious',
    reactions: { skull: 5234, fire: 1789, crying: 6781, clown: 892 },
    shares: 4567,
    featured: true,
    packageType: 'featured'
  },
  {
    id: '15',
    title: 'My Fitness Influencer Cosplay',
    epitaph: 'Posted gym selfies for 2 weeks straight. Worked out twice. The pre-workout supplements expired before I finished the container.',
    author: 'FitspoFraud',
    timestamp: '2024-01-08T09:45:00Z',
    category: 'Cringe',
    reactions: { skull: 1567, fire: 2341, crying: 1234, clown: 3789 },
    shares: 1456,
    featured: false,
    packageType: 'basic'
  },
  {
    id: '16',
    title: 'Believing NFTs Would Make Me Rich',
    epitaph: 'Bought a pixelated monkey for 0.5 ETH. Now it\'s worth 0.005 ETH and my trust in digital art. The screenshot was free.',
    author: 'CryptoArtDealer',
    timestamp: '2024-01-07T15:30:00Z',
    category: 'Crypto',
    reactions: { skull: 4321, fire: 2789, crying: 1567, clown: 892 },
    shares: 3456,
    featured: true,
    packageType: 'featured'
  },
  {
    id: '17',
    title: 'My Indie Music Elitist Phase',
    epitaph: 'Only listened to bands with less than 1000 monthly listeners. Gatekept music harder than airport security. Nobody asked for my opinions.',
    author: 'MusicSnobSupreme',
    timestamp: '2024-01-07T13:20:00Z',
    category: 'Cringe',
    reactions: { skull: 2134, fire: 1678, crying: 892, clown: 2567 },
    shares: 1234,
    featured: false,
    packageType: 'premium'
  },
  {
    id: '18',
    title: 'Thinking I Could DIY Everything',
    epitaph: 'Pinterest said I could renovate my room for $50. Spent $500 and it looks like a craft store exploded. Hot glue gun was not the answer.',
    author: 'DIYDisaster',
    timestamp: '2024-01-06T18:45:00Z',
    category: 'Funny',
    reactions: { skull: 3789, fire: 1234, crying: 2456, clown: 1567 },
    shares: 2134,
    featured: true,
    packageType: 'premium'
  },
  {
    id: '19',
    title: 'My Toxic Positivity Era',
    epitaph: 'Good vibes only bestie! Manifested nothing but student debt and anxiety. Turns out toxic positivity is still toxic.',
    author: 'GoodVibesOnly',
    timestamp: '2024-01-06T14:30:00Z',
    category: 'Serious',
    reactions: { skull: 2567, fire: 3421, crying: 4789, clown: 1234 },
    shares: 2891,
    featured: false,
    packageType: 'basic'
  },
  {
    id: '20',
    title: 'Believing My Crush Would Text First',
    epitaph: 'Left him on read to play hard to get. He never texted again. The silence was deafening and my pride was in shambles.',
    author: 'PlayingHardToGet',
    timestamp: '2024-01-05T16:15:00Z',
    category: 'Exes',
    reactions: { skull: 1892, fire: 567, crying: 5234, clown: 1456 },
    shares: 3789,
    featured: true,
    packageType: 'featured'
  },
  {
    id: '21',
    title: 'My Minimalism Phase (That Lasted 3 Days)',
    epitaph: 'Marie Kondo would be proud... until she saw me rebuy everything I donated. Turns out I need 47 lip glosses to spark joy.',
    author: 'MinimalistFail',
    timestamp: '2024-01-05T12:00:00Z',
    category: 'Trends',
    reactions: { skull: 1456, fire: 2789, crying: 1234, clown: 3567 },
    shares: 1678,
    featured: false,
    packageType: 'basic'
  },
  {
    id: '22',
    title: 'Thinking I Could Learn Spanish from Duolingo',
    epitaph: 'Hola, me llamo disappointment. 300-day streak broken because I forgot "el gato" means cat. The owl will never forgive me.',
    author: 'LinguisticFailure',
    timestamp: '2024-01-04T17:30:00Z',
    category: 'Serious',
    reactions: { skull: 2341, fire: 1567, crying: 2789, clown: 1892 },
    shares: 1456,
    featured: true,
    packageType: 'premium'
  },
  {
    id: '23',
    title: 'My Vintage Clothing Addiction',
    epitaph: 'Spent $300 on a "vintage" band tee from 2019. Depop sellers really said vintage and meant last Tuesday. My wallet is crying.',
    author: 'VintageVibesOnly',
    timestamp: '2024-01-04T13:45:00Z',
    category: 'Trends',
    reactions: { skull: 1678, fire: 2134, crying: 3456, clown: 892 },
    shares: 2567,
    featured: false,
    packageType: 'premium'
  },
  {
    id: '24',
    title: 'Believing I Could Be YouTube Famous',
    epitaph: 'Made 47 videos about my morning routine. Got 12 views total (8 were me checking if it uploaded). Fame was not in the algorithm.',
    author: 'AlmostFamous',
    timestamp: '2024-01-03T19:20:00Z',
    category: 'Tech',
    reactions: { skull: 3789, fire: 1234, crying: 1567, clown: 2891 },
    shares: 1789,
    featured: true,
    packageType: 'featured'
  },
  {
    id: '25',
    title: 'My Clean Girl Aesthetic Attempt',
    epitaph: 'Took 45 minutes to look effortlessly natural. Used 12 products to achieve the "no makeup" look. The irony was not lost on my bank account.',
    author: 'CleanGirlDirtySecrets',
    timestamp: '2024-01-03T15:10:00Z',
    category: 'Cringe',
    reactions: { skull: 2567, fire: 3421, crying: 1234, clown: 1789 },
    shares: 2134,
    featured: false,
    packageType: 'basic'
  },
  {
    id: '26',
    title: 'Thinking I Could Fix My Sleep Schedule',
    epitaph: 'Downloaded 17 sleep apps, bought blackout curtains, melatonin gummies. Still scrolling TikTok at 3am. The algorithm knows my weakness.',
    author: 'InsomniacInfluencer',
    timestamp: '2024-01-02T20:45:00Z',
    category: 'Serious',
    reactions: { skull: 4567, fire: 2134, crying: 3789, clown: 1456 },
    shares: 3421,
    featured: true,
    packageType: 'premium'
  },
  {
    id: '27',
    title: 'My Astrology Obsession Phase',
    epitaph: 'Blamed Mercury retrograde for everything including my lactose intolerance. Mars was in microwave when I burned my leftovers.',
    author: 'CosmicChaosQueen',
    timestamp: '2024-01-02T16:30:00Z',
    category: 'Trends',
    reactions: { skull: 1789, fire: 2567, crying: 892, clown: 4321 },
    shares: 2789,
    featured: false,
    packageType: 'premium'
  },
  {
    id: '28',
    title: 'Believing I Could Adult Without Googling',
    epitaph: 'How to pay taxes? Google. How to change a tire? Google. How to exist? Also Google. My search history is my autobiography.',
    author: 'GoogleDependentAdult',
    timestamp: '2024-01-01T18:15:00Z',
    category: 'Serious',
    reactions: { skull: 5234, fire: 1567, crying: 4789, clown: 2134 },
    shares: 4567,
    featured: true,
    packageType: 'featured'
  },
  {
    id: '29',
    title: 'My Sourdough Starter Named Kevin',
    epitaph: 'Fed Kevin daily for 3 months during lockdown. Kevin died when I went on vacation. RIP Kevin, you were the bread of my life.',
    author: 'PandemicBaker2020',
    timestamp: '2024-01-01T14:20:00Z',
    category: 'Funny',
    reactions: { skull: 2891, fire: 1234, crying: 3567, clown: 1678 },
    shares: 2456,
    featured: false,
    packageType: 'basic'
  },
  {
    id: '30',
    title: 'Thinking Cottage Core Was Achievable in a Studio Apartment',
    epitaph: 'Bought 47 mason jars and called it rustic. My 300sq ft space looked like a craft store garage sale. Pinterest lied to me.',
    author: 'CottageCoreReality',
    timestamp: '2023-12-31T12:45:00Z',
    category: 'Trends',
    reactions: { skull: 1567, fire: 2789, crying: 2134, clown: 3421 },
    shares: 1892,
    featured: true,
    packageType: 'premium'
  },
  {
    id: '31',
    title: 'My Attempt at Being the Main Character',
    epitaph: 'Wore sunglasses indoors, drank iced coffee in winter, posted cryptic Instagram stories. Nobody cared. Side character energy forever.',
    author: 'SideCharacterForever',
    timestamp: '2023-12-31T09:30:00Z',
    category: 'Cringe',
    reactions: { skull: 3456, fire: 892, crying: 1789, clown: 2567 },
    shares: 1234,
    featured: false,
    packageType: 'basic'
  },
  {
    id: '32',
    title: 'Believing My Ex When He Said "We Can Still Be Friends"',
    epitaph: 'Friendship lasted exactly 12 hours until he posted a thirst trap with his new situationship. The audacity was astronomical.',
    author: 'StillHaveHope',
    timestamp: '2023-12-30T17:20:00Z',
    category: 'Exes',
    reactions: { skull: 4789, fire: 1456, crying: 6234, clown: 2134 },
    shares: 3789,
    featured: true,
    packageType: 'featured'
  },
  {
    id: '33',
    title: 'My LinkedIn Learning Certificate Collection',
    epitaph: 'Collected 23 certificates in "Advanced Excel" and "Leadership Skills". Still can\'t make a pivot table or lead myself to bed on time.',
    author: 'FakeItTillYouMakeIt',
    timestamp: '2023-12-30T13:15:00Z',
    category: 'Tech',
    reactions: { skull: 2134, fire: 3567, crying: 1892, clown: 1456 },
    shares: 2789,
    featured: false,
    packageType: 'premium'
  },
  {
    id: '34',
    title: 'Thinking I Could Pull Off Bangs (Again)',
    epitaph: 'Third time was not the charm. My forehead said no but TikTok said yes. Currently growing out my regret for the next 8 months.',
    author: 'BangRegretQueen',
    timestamp: '2023-12-29T15:40:00Z',
    category: 'Cringe',
    reactions: { skull: 1892, fire: 678, crying: 4321, clown: 2567 },
    shares: 3456,
    featured: true,
    packageType: 'premium'
  },
  {
    id: '35',
    title: 'My Meditation App Subscription (Unused)',
    epitaph: 'Paid $120 for inner peace. Opened the app twice. My mind is still chaos but my wallet is lighter. Namaste broke.',
    author: 'ChaosInsteadOfPeace',
    timestamp: '2023-12-29T11:25:00Z',
    category: 'Serious',
    reactions: { skull: 2567, fire: 1234, crying: 3789, clown: 1678 },
    shares: 2134,
    featured: false,
    packageType: 'basic'
  },
  {
    id: '36',
    title: 'Believing I Could Day Trade Stocks',
    epitaph: 'Watched 3 YouTube videos and thought I was the next Wolf of Wall Street. Lost $500 in 2 days. The wolf became a sheep.',
    author: 'WallStreetWannabe2',
    timestamp: '2023-12-28T16:50:00Z',
    category: 'Crypto',
    reactions: { skull: 3421, fire: 2789, crying: 2134, clown: 1567 },
    shares: 2891,
    featured: true,
    packageType: 'featured'
  },
  {
    id: '37',
    title: 'My Attempt at Journaling Every Day',
    epitaph: 'Day 1: "Dear Diary, today I start my journey..." Day 47: Found moldy journal under my bed. The journey ended abruptly.',
    author: 'JournalFailure',
    timestamp: '2023-12-28T12:35:00Z',
    category: 'Serious',
    reactions: { skull: 1678, fire: 2456, crying: 3234, clown: 1892 },
    shares: 1567,
    featured: false,
    packageType: 'basic'
  },
  {
    id: '38',
    title: 'Thinking I Could Be a BookTok Girlie',
    epitaph: 'Bought 47 books based on aesthetic covers alone. Read 2.5 of them. My bookshelf is now expensive decoration.',
    author: 'AestheticReader',
    timestamp: '2023-12-27T14:20:00Z',
    category: 'Trends',
    reactions: { skull: 2789, fire: 1567, crying: 2134, clown: 3456 },
    shares: 2567,
    featured: true,
    packageType: 'premium'
  },
  {
    id: '39',
    title: 'My Skincare Routine That Bankrupted Me',
    epitaph: '12-step routine, $400 worth of serums. My skin said "this is too much bestie" and broke out worse than my 8th grade yearbook photo.',
    author: 'GlowUpGoneWrong',
    timestamp: '2023-12-27T10:45:00Z',
    category: 'Cringe',
    reactions: { skull: 4321, fire: 1234, crying: 3789, clown: 2567 },
    shares: 3421,
    featured: false,
    packageType: 'premium'
  },
  {
    id: '40',
    title: 'Believing I Could Learn Guitar from YouTube',
    epitaph: 'Wonderwall remains unconquered. My neighbors filed a noise complaint. The guitar now holds up my plant that I\'m also killing.',
    author: 'WonderwallWarrior',
    timestamp: '2023-12-26T18:30:00Z',
    category: 'Funny',
    reactions: { skull: 1567, fire: 2891, crying: 1234, clown: 4678 },
    shares: 1892,
    featured: true,
    packageType: 'featured'
  },
  {
    id: '41',
    title: 'My Attempt at Being Sustainable',
    epitaph: 'Bought 12 reusable water bottles to reduce waste. Now I have 12 plastic bottles plus the packaging they came in. Math is hard.',
    author: 'EcoWarriorFail',
    timestamp: '2023-12-26T14:15:00Z',
    category: 'Serious',
    reactions: { skull: 2134, fire: 3567, crying: 2789, clown: 1456 },
    shares: 2678,
    featured: false,
    packageType: 'basic'
  },
  {
    id: '42',
    title: 'Thinking I Could Handle Spicy Food',
    epitaph: 'Ordered the "medium" spice level. Cried for 20 minutes and drank a gallon of milk. My taste buds have trust issues now.',
    author: 'SpiceToleranceLie',
    timestamp: '2023-12-25T16:40:00Z',
    category: 'Funny',
    reactions: { skull: 3789, fire: 4567, crying: 2134, clown: 1892 },
    shares: 3456,
    featured: true,
    packageType: 'premium'
  },
  {
    id: '43',
    title: 'My Cryptocurrency "Research" Phase',
    epitaph: 'Research = reading memes on Reddit. Invested life savings in ShibaCumRocket coin. The rocket crashed before takeoff.',
    author: 'CryptoMemeLord',
    timestamp: '2023-12-25T12:25:00Z',
    category: 'Crypto',
    reactions: { skull: 5234, fire: 2789, crying: 3456, clown: 1567 },
    shares: 4321,
    featured: false,
    packageType: 'featured'
  },
  {
    id: '44',
    title: 'Believing I Could Quit Social Media',
    epitaph: 'Deleted Instagram for mental health. Redownloaded it 4 hours later to see if anyone noticed I was gone. Nobody did.',
    author: 'DigitalDetoxFail',
    timestamp: '2023-12-24T19:50:00Z',
    category: 'Tech',
    reactions: { skull: 2891, fire: 1678, crying: 4234, clown: 2567 },
    shares: 3789,
    featured: true,
    packageType: 'featured'
  },
  {
    id: '45',
    title: 'My Attempt at Morning Yoga',
    epitaph: 'Namaste in bed was my final pose. Downward dog became sideways sloth. The mat is now a very expensive doormat.',
    author: 'YogaFailure',
    timestamp: '2023-12-24T15:35:00Z',
    category: 'Serious',
    reactions: { skull: 1456, fire: 2134, crying: 2789, clown: 3567 },
    shares: 1678,
    featured: false,
    packageType: 'basic'
  },
  {
    id: '46',
    title: 'Thinking I Could Be a Fashion Influencer',
    epitaph: 'Posted 73 outfit of the day photos. Got 12 likes total (mom, dad, and 10 bots). My style icon dreams died with my engagement rate.',
    author: 'OOTDObsessed',
    timestamp: '2023-12-23T17:20:00Z',
    category: 'Cringe',
    reactions: { skull: 2567, fire: 1234, crying: 1892, clown: 4321 },
    shares: 2134,
    featured: true,
    packageType: 'premium'
  },
  {
    id: '47',
    title: 'My Belief That I Could Cook Without Recipes',
    epitaph: 'Eyeballed ingredients like a master chef. Created a culinary disaster that violated several Geneva Convention articles. Takeout saved my life.',
    author: 'ChefBoyarDisaster',
    timestamp: '2023-12-23T13:45:00Z',
    category: 'Funny',
    reactions: { skull: 3456, fire: 2789, crying: 1567, clown: 2134 },
    shares: 2891,
    featured: false,
    packageType: 'premium'
  },
  {
    id: '48',
    title: 'Thinking My Podcast Would Go Viral',
    epitaph: '12 episodes about my daily life. 3 total downloads (all from my own phone checking if it worked). The world wasn\'t ready for my voice.',
    author: 'PodcastDreamer',
    timestamp: '2023-12-22T20:10:00Z',
    category: 'Tech',
    reactions: { skull: 1789, fire: 3421, crying: 2567, clown: 1234 },
    shares: 3567,
    featured: true,
    packageType: 'featured'
  },
  {
    id: '49',
    title: 'My Belief That I Could Fix My Sleep Schedule Over Winter Break',
    epitaph: 'Planned to sleep at 10pm and wake at 7am. Currently writing this at 4:30am while eating cereal. Some things never change.',
    author: 'NightOwlForever',
    timestamp: '2023-12-22T16:30:00Z',
    category: 'Serious',
    reactions: { skull: 4567, fire: 1892, crying: 3234, clown: 2789 },
    shares: 4321,
    featured: false,
    packageType: 'basic'
  },
  {
    id: '50',
    title: 'Thinking 2024 Would Be My Year',
    epitaph: 'New year, new me! Lasted exactly 4 days before falling back into old patterns. 2025 will definitely be different... right?',
    author: 'EternalOptimist',
    timestamp: '2023-12-22T12:15:00Z',
    category: 'Serious',
    reactions: { skull: 6789, fire: 3456, crying: 5234, clown: 2891 },
    shares: 5678,
    featured: true,
    packageType: 'featured'
  }
];

export const getTotalGraves = () => mockGraves.length;

export const getTotalUsers = () => {
  // Extract unique authors from graves
  const uniqueAuthors = new Set(mockGraves.map(grave => grave.author));
  return uniqueAuthors.size;
};

export const getTotalReactions = () => {
  return mockGraves.reduce((total, grave) => {
    return total + grave.reactions.skull + grave.reactions.fire + grave.reactions.crying + grave.reactions.clown;
  }, 0);
};

export const getActiveBurials = () => {
  // Graves from last 24 hours
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
  return mockGraves.filter(grave => new Date(grave.timestamp) > yesterday).length;
};

export const getRecentGraves = (limit: number = 10) => {
  return mockGraves
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
};

export const getTrendingGraves = (limit: number = 10) => {
  return mockGraves
    .sort((a, b) => (b.shares + b.reactions.skull + b.reactions.fire) - (a.shares + a.reactions.skull + a.reactions.fire))
    .slice(0, limit);
};

export const getFeaturedGraves = () => {
  return mockGraves.filter(grave => grave.featured);
};

export const getGravesByCategory = (category: string) => {
  return mockGraves.filter(grave => grave.category === category);
};
