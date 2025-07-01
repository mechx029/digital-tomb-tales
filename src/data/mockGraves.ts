
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
    title: 'My NFT Collection Worth $50K',
    epitaph: 'Here lies my life savings spent on digital monkeys. May they rest in screenshotted peace.',
    author: 'CryptoKing2021',
    timestamp: '2024-01-15T10:30:00Z',
    category: 'Crypto',
    reactions: { skull: 156, fire: 89, crying: 234, clown: 445 },
    shares: 89,
    featured: true,
    packageType: 'featured'
  },
  {
    id: '2',
    title: 'My Relationship with My Ex Sarah',
    epitaph: 'She said we would be together forever. Forever lasted 3 months. RIP to believing in love.',
    author: 'BrokenHeart_Mike',
    timestamp: '2024-01-14T15:45:00Z',
    category: 'Exes',
    reactions: { skull: 67, fire: 23, crying: 189, clown: 12 },
    shares: 45,
    featured: false,
    packageType: 'basic'
  },
  {
    id: '3',
    title: 'Thinking I Could Be a TikTok Star',
    epitaph: 'Spent 6 months perfecting dances for 12 followers. My dignity died with each unsynced move.',
    author: 'NotFamousSally',
    timestamp: '2024-01-14T09:20:00Z',
    category: 'Trends',
    reactions: { skull: 234, fire: 156, crying: 45, clown: 678 },
    shares: 234,
    featured: true,
    packageType: 'premium'
  },
  {
    id: '4',
    title: 'My Startup: DogWalking for Cats',
    epitaph: 'Revolutionizing pet care, one confused feline at a time. Investors ran faster than the cats.',
    author: 'EntrepreneurEric',
    timestamp: '2024-01-13T14:00:00Z',
    category: 'Tech',
    reactions: { skull: 89, fire: 134, crying: 56, clown: 345 },
    shares: 67,
    featured: false,
    packageType: 'premium'
  },
  {
    id: '5',
    title: 'My Political Hot Takes on Twitter',
    epitaph: 'Thought I could change the world 280 characters at a time. Only changed my follower count to zero.',
    author: 'PoliticalPundit',
    timestamp: '2024-01-13T11:30:00Z',
    category: 'Politics',
    reactions: { skull: 445, fire: 234, crying: 123, clown: 567 },
    shares: 156,
    featured: true,
    packageType: 'featured'
  },
  {
    id: '6',
    title: 'My Emo Phase from 2005',
    epitaph: 'Black eyeliner, emotional poetry, and thinking nobody understood me. Cringe level: Maximum.',
    author: 'FormerEmoKid',
    timestamp: '2024-01-12T16:45:00Z',
    category: 'Cringe',
    reactions: { skull: 123, fire: 67, crying: 89, clown: 234 },
    shares: 78,
    featured: false,
    packageType: 'basic'
  },
  {
    id: '7',
    title: 'Believing Facebook Meta Would Work',
    epitaph: 'Spent my savings on Meta stock thinking virtual reality would replace reality. Reality hit hard.',
    author: 'TechInvestor2022',
    timestamp: '2024-01-12T13:15:00Z',
    category: 'Tech',
    reactions: { skull: 234, fire: 456, crying: 345, clown: 123 },
    shares: 234,
    featured: true,
    packageType: 'premium'
  },
  {
    id: '8',
    title: 'My Mullet Haircut',
    epitaph: 'Business in the front, party in the back, unemployment everywhere. Some trends should stay buried.',
    author: 'MulletMan',
    timestamp: '2024-01-11T10:00:00Z',
    category: 'Funny',
    reactions: { skull: 345, fire: 234, crying: 45, clown: 567 },
    shares: 345,
    featured: false,
    packageType: 'basic'
  },
  {
    id: '9',
    title: 'Thinking I Was Smarter Than Wall Street',
    epitaph: 'GameStop to the moon! Diamond hands! Paper wallet. Here lies my financial confidence.',
    author: 'DiamondHands4Life',
    timestamp: '2024-01-11T08:30:00Z',
    category: 'Crypto',
    reactions: { skull: 567, fire: 345, crying: 234, clown: 123 },
    shares: 456,
    featured: true,
    packageType: 'featured'
  },
  {
    id: '10',
    title: 'My Gym Membership from January 2023',
    epitaph: 'New year, new me! Lasted exactly 12 days. The treadmill misses me more than I miss it.',
    author: 'FitnessFailure',
    timestamp: '2024-01-10T19:20:00Z',
    category: 'Serious',
    reactions: { skull: 789, fire: 123, crying: 456, clown: 234 },
    shares: 234,
    featured: false,
    packageType: 'basic'
  },
  {
    id: '11',
    title: 'Dating My Roommate',
    epitaph: 'Seemed convenient until it wasnt. Now I live with my ex and three cats who judge me daily.',
    author: 'RoommateDater',
    timestamp: '2024-01-10T14:45:00Z',
    category: 'Exes',
    reactions: { skull: 234, fire: 67, crying: 345, clown: 156 },
    shares: 123,
    featured: false,
    packageType: 'premium'
  },
  {
    id: '12',
    title: 'My YouTube Channel: Minecraft Tutorials',
    epitaph: '47 subscribers after 2 years. Even my mom unsubscribed. Here lies my content creator dreams.',
    author: 'MinecraftMaster',
    timestamp: '2024-01-09T16:30:00Z',
    category: 'Tech',
    reactions: { skull: 156, fire: 234, crying: 123, clown: 345 },
    shares: 89,
    featured: false,
    packageType: 'basic'
  },
  {
    id: '13',
    title: 'Believing in "Clean Eating"',
    epitaph: 'Only organic, non-GMO, gluten-free, locally sourced everything. My wallet and social life died first.',
    author: 'HealthGuru23',
    timestamp: '2024-01-09T12:00:00Z',
    category: 'Trends',
    reactions: { skull: 345, fire: 123, crying: 67, clown: 234 },
    shares: 156,
    featured: true,
    packageType: 'premium'
  },
  {
    id: '14',
    title: 'My Fashion Blog: "Crocs and Socks Style"',
    epitaph: 'Revolutionary fashion takes that nobody asked for. Style died, comfort lived, dignity missing.',
    author: 'FashionistaFail',
    timestamp: '2024-01-08T11:15:00Z',
    category: 'Funny',
    reactions: { skull: 234, fire: 345, crying: 89, clown: 456 },
    shares: 267,
    featured: false,
    packageType: 'basic'
  },
  {
    id: '15',
    title: 'Thinking Bitcoin Would Hit $100K by 2022',
    epitaph: 'HODL they said. Diamond hands they said. My portfolio says otherwise. RIP to financial wisdom.',
    author: 'BitcoinBelieve',
    timestamp: '2024-01-08T09:45:00Z',
    category: 'Crypto',
    reactions: { skull: 456, fire: 234, crying: 345, clown: 123 },
    shares: 345,
    featured: true,
    packageType: 'featured'
  },
  // Add more mock graves to reach 50+
  {
    id: '16',
    title: 'My Sourdough Starter Named Gerald',
    epitaph: 'Fed him daily for 3 months during lockdown. Gerald died when I forgot him for one weekend. Sorry Gerald.',
    author: 'PandemicBaker',
    timestamp: '2024-01-07T15:30:00Z',
    category: 'Funny',
    reactions: { skull: 123, fire: 89, crying: 234, clown: 156 },
    shares: 98,
    featured: false,
    packageType: 'basic'
  },
  {
    id: '17',
    title: 'Believing My Band Would Make It',
    epitaph: 'Three chord progressions and unlimited dreams. Played to crowds of dozens. Mostly our parents.',
    author: 'RockstarReject',
    timestamp: '2024-01-07T13:20:00Z',
    category: 'Serious',
    reactions: { skull: 267, fire: 156, crying: 189, clown: 234 },
    shares: 134,
    featured: false,
    packageType: 'premium'
  },
  {
    id: '18',
    title: 'My 2020 New Years Resolutions',
    epitaph: 'Learn Spanish, run a marathon, read 50 books, find love. Accomplished: watching Netflix in Spanish subtitles.',
    author: 'ResolutionReaper',
    timestamp: '2024-01-06T18:45:00Z',
    category: 'Serious',
    reactions: { skull: 345, fire: 123, crying: 278, clown: 189 },
    shares: 223,
    featured: true,
    packageType: 'premium'
  },
  {
    id: '19',
    title: 'Thinking I Could Day Trade',
    epitaph: 'Quit my job to become a day trader. Turns out the market trades back. My savings account remembers.',
    author: 'WallStreetWannabe',
    timestamp: '2024-01-06T14:30:00Z',
    category: 'Crypto',
    reactions: { skull: 189, fire: 267, crying: 234, clown: 145 },
    shares: 178,
    featured: false,
    packageType: 'basic'
  },
  {
    id: '20',
    title: 'My Confidence in Zoom Calls',
    epitaph: 'Thought I looked professional on video calls. Discovered my camera angle made me look like a nostril close-up.',
    author: 'ZoomZombie',
    timestamp: '2024-01-05T16:15:00Z',
    category: 'Tech',
    reactions: { skull: 456, fire: 189, crying: 123, clown: 334 },
    shares: 289,
    featured: true,
    packageType: 'featured'
  }
  // Add 30 more similar graves...
];

// Generate additional graves programmatically
const additionalGraves = [
  'My Attempt at Stand-up Comedy',
  'Believing Clubhouse Would Replace Social Media',
  'My Essential Oils MLM Business',
  'Thinking I Could Cut My Own Hair',
  'My Cryptocurrency Mining Rig',
  'Dating Someone From Reddit',
  'My TikTok Dance Phase at Age 35',
  'Believing I Could Fix My Car Myself',
  'My Organic Farming Fantasy',
  'Thinking Hot Sauce Was a Food Group',
  'My Pinterest Board Wedding Plans (Still Single)',
  'Believing I Could Learn Guitar in 30 Days',
  'My Attempt at Influencer Marketing',
  'Thinking I Could Handle Spicy Food',
  'My Collection of Self-Help Books',
  'Dating My Ex Again (And Again)',
  'My Belief in "Get Rich Quick" Schemes',
  'Thinking I Could Do My Own Taxes',
  'My Attempt at Veganism (Lasted 3 Days)',
  'Believing I Could Function on 4 Hours Sleep',
  'My Homeschooling My Kids Experiment',
  'Thinking I Could Beat Wordle Every Day',
  'My Attempt at Minimalism',
  'Believing I Could Handle Black Friday Shopping',
  'My DIY Home Renovation Project',
  'Thinking I Could Train My Cat',
  'My Attempt at Online Dating',
  'Believing I Could Quit Social Media',
  'My Plan to Read More Books',
  'Thinking I Could Adult Successfully'
];

// Generate the additional graves
additionalGraves.forEach((title, index) => {
  const id = (21 + index).toString();
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  const randomAuthor = `User${Math.random().toString(36).substr(2, 5)}`;
  const randomDate = new Date(2024, 0, Math.floor(Math.random() * 30) + 1, Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
  
  mockGraves.push({
    id,
    title,
    epitaph: `Here lies another one of life's grand failures. May it rest in digital peace and serve as a warning to others.`,
    author: randomAuthor,
    timestamp: randomDate.toISOString(),
    category: randomCategory,
    reactions: {
      skull: Math.floor(Math.random() * 500) + 50,
      fire: Math.floor(Math.random() * 300) + 20,
      crying: Math.floor(Math.random() * 400) + 30,
      clown: Math.floor(Math.random() * 600) + 40
    },
    shares: Math.floor(Math.random() * 200) + 10,
    featured: Math.random() < 0.3,
    packageType: ['basic', 'premium', 'featured'][Math.floor(Math.random() * 3)] as 'basic' | 'premium' | 'featured'
  });
});

export const getTotalGraves = () => mockGraves.length;

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
