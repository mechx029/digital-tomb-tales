
-- Insert 48 fake graves with varied, culturally relevant content
INSERT INTO public.graves (
  id,
  title,
  epitaph,
  category,
  user_id,
  created_at,
  updated_at,
  published,
  featured,
  package_type,
  shares,
  image_url
) VALUES
  (gen_random_uuid(), 'My NFT Monkey Collection', 'Paid 50 ETH for pixelated regret. Now worth less than a McDonald''s Happy Meal. The apes have left the building.', 'Crypto', gen_random_uuid(), NOW() - INTERVAL '2 hours', NOW() - INTERVAL '2 hours', true, true, 'featured', 847, 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5'),
  
  (gen_random_uuid(), 'Texting My Ex at 3AM', 'Hey bestie, you up? Sent to the wrong person. My therapist says this is growth. The embarrassment is eternal.', 'DM', gen_random_uuid(), NOW() - INTERVAL '4 hours', NOW() - INTERVAL '4 hours', true, false, 'premium', 1234, null),
  
  (gen_random_uuid(), 'My AI Startup That Solved Nothing', 'Raised 2M to build an AI that orders pizza. Turns out humans can do that already. Innovation was not the vibe.', 'Startup', gen_random_uuid(), NOW() - INTERVAL '6 hours', NOW() - INTERVAL '6 hours', true, true, 'featured', 2156, 'https://images.unsplash.com/photo-1500673922987-e212871fec22'),
  
  (gen_random_uuid(), 'Believing I Could Day Trade', 'Watched 3 TikToks and became a financial advisor to myself. Portfolio went from hero to zero in record time.', 'Finance', gen_random_uuid(), NOW() - INTERVAL '8 hours', NOW() - INTERVAL '8 hours', true, false, 'basic', 892, null),
  
  (gen_random_uuid(), 'My Duolingo 500-Day Streak', 'Hola, I still can''t order coffee in Spanish. The owl haunts my dreams but my vocabulary remains tragic.', 'App', gen_random_uuid(), NOW() - INTERVAL '12 hours', NOW() - INTERVAL '12 hours', true, false, 'premium', 678, null),
  
  (gen_random_uuid(), 'Thinking Web3 Would Save Me', 'Decentralized everything except my bank account. Still centralized in my mom''s basement building the metaverse.', 'Crypto', gen_random_uuid(), NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day', true, true, 'featured', 3421, 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb'),
  
  (gen_random_uuid(), 'My Main Character Era', 'Wore sunglasses indoors and posted cryptic quotes. Nobody asked for my villain origin story but here we are.', 'Trend', gen_random_uuid(), NOW() - INTERVAL '1 day 3 hours', NOW() - INTERVAL '1 day 3 hours', true, false, 'basic', 1567, null),
  
  (gen_random_uuid(), 'Buying Every Course on Udemy', 'Became a lifetime learner with 847 courses. Completed 2.5 of them. My browser bookmarks are a graveyard of good intentions.', 'Career', gen_random_uuid(), NOW() - INTERVAL '1 day 6 hours', NOW() - INTERVAL '1 day 6 hours', true, false, 'premium', 945, null),
  
  (gen_random_uuid(), 'My LinkedIn Thought Leadership Phase', 'Posted motivational quotes while unemployed. Hustle culture hit different when you''re eating ramen for breakfast, lunch, and dinner.', 'Career', gen_random_uuid(), NOW() - INTERVAL '1 day 12 hours', NOW() - INTERVAL '1 day 12 hours', true, false, 'basic', 2134, null),
  
  (gen_random_uuid(), 'Believing My Situationship Had Potential', 'He said good morning once and I planned our wedding. Six months of breadcrumbs later, I''m still hungry for closure.', 'Relationship', gen_random_uuid(), NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days', true, true, 'featured', 4567, null),
  
  (gen_random_uuid(), 'My TikTok Dance Career', 'Practiced the Renegade for 8 hours straight. Got 12 views. My knees will never forgive me for this sacrifice.', 'Meme', gen_random_uuid(), NOW() - INTERVAL '2 days 4 hours', NOW() - INTERVAL '2 days 4 hours', true, false, 'premium', 834, null),
  
  (gen_random_uuid(), 'Thinking I Could Fix Him', 'Saw a broken man and thought I was a mechanic. Plot twist: I was just another casualty in his emotional junkyard.', 'Ex', gen_random_uuid(), NOW() - INTERVAL '2 days 8 hours', NOW() - INTERVAL '2 days 8 hours', true, true, 'featured', 5234, null),
  
  (gen_random_uuid(), 'My Startup That Was Just Uber', 'Uber but for dog walkers. Uber but for laundry. Plot twist: Uber already existed and worked fine.', 'Startup', gen_random_uuid(), NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days', true, false, 'premium', 1789, null),
  
  (gen_random_uuid(), 'Buying AirPods Max for Zoom Calls', 'Spent $549 for premium audio quality. Used them to listen to my coworkers complain about their WiFi connection.', 'Gadget', gen_random_uuid(), NOW() - INTERVAL '3 days 6 hours', NOW() - INTERVAL '3 days 6 hours', true, false, 'basic', 1234, 'https://images.unsplash.com/photo-1582562124811-c09040d0a901'),
  
  (gen_random_uuid(), 'My Discord Moderator Era', 'Achieved ultimate power by banning people for using lowercase. Touch grass was not in my vocabulary.', 'Meme', gen_random_uuid(), NOW() - INTERVAL '4 days', NOW() - INTERVAL '4 days', true, false, 'premium', 2567, null),
  
  (gen_random_uuid(), 'Believing ChatGPT Would Do My Job', 'Asked AI to write my resignation letter. It was so good, my boss asked if I wanted a promotion instead.', 'AI', gen_random_uuid(), NOW() - INTERVAL '4 days 8 hours', NOW() - INTERVAL '4 days 8 hours', true, true, 'featured', 3892, null),
  
  (gen_random_uuid(), 'My Plant Mom Phase', 'Killed 12 succulents in 3 months. Even cacti gave up on me. My green thumb was actually a black thumb of death.', 'Trend', gen_random_uuid(), NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days', true, false, 'basic', 1456, null),
  
  (gen_random_uuid(), 'Thinking I Could Be YouTube Famous', 'Made 73 videos about my morning routine. Total views: 47 (12 were me checking if it uploaded properly).', 'Dream', gen_random_uuid(), NOW() - INTERVAL '5 days 12 hours', NOW() - INTERVAL '5 days 12 hours', true, false, 'premium', 2134, null),
  
  (gen_random_uuid(), 'My Meditation App Subscription', 'Paid $120 for inner peace. Opened the app twice. My mind is still chaos but my wallet is $120 lighter.', 'App', gen_random_uuid(), NOW() - INTERVAL '6 days', NOW() - INTERVAL '6 days', true, false, 'basic', 892, null),
  
  (gen_random_uuid(), 'Believing My Crush Liked Me Back', 'He said hi in the hallway and I wrote our names in a heart. Plot twist: he was talking to the person behind me.', 'School', gen_random_uuid(), NOW() - INTERVAL '6 days 8 hours', NOW() - INTERVAL '6 days 8 hours', true, true, 'featured', 4321, null),
  
  (gen_random_uuid(), 'My Crypto Portfolio', 'Diamond hands turned into paper cuts. HODL became SOLD. My wife''s boyfriend is now the financial advisor.', 'Crypto', gen_random_uuid(), NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days', true, false, 'premium', 3456, null),
  
  (gen_random_uuid(), 'Thinking I Could Learn Guitar', 'Wonderwall remains unconquered. My neighbors called noise control. The guitar now holds up my dying plant.', 'Dream', gen_random_uuid(), NOW() - INTERVAL '7 days 12 hours', NOW() - INTERVAL '7 days 12 hours', true, false, 'basic', 1678, null),
  
  (gen_random_uuid(), 'My Minimalism Phase', 'Marie Kondo would be proud until she saw me rebuy everything I donated. Turns out I need 47 lip glosses for joy.', 'Trend', gen_random_uuid(), NOW() - INTERVAL '8 days', NOW() - INTERVAL '8 days', true, false, 'premium', 2345, null),
  
  (gen_random_uuid(), 'Believing My Ex When He Said', 'We can still be friends. Friendship lasted 12 hours until he posted a thirst trap with his new girlfriend.', 'Ex', gen_random_uuid(), NOW() - INTERVAL '8 days 6 hours', NOW() - INTERVAL '8 days 6 hours', true, true, 'featured', 5678, null),
  
  (gen_random_uuid(), 'My Sourdough Starter Named Gerald', 'Fed Gerald daily during lockdown. Gerald died when I went on vacation. RIP Gerald, you were the bread of my life.', 'Meme', gen_random_uuid(), NOW() - INTERVAL '9 days', NOW() - INTERVAL '9 days', true, false, 'basic', 2890, 'https://images.unsplash.com/photo-1487252665478-49b61b47f302'),
  
  (gen_random_uuid(), 'Thinking I Could Day Trade Options', 'Turned $1000 into $10 faster than a Vegas slot machine. The market humbled me with algorithmic precision.', 'Finance', gen_random_uuid(), NOW() - INTERVAL '9 days 8 hours', NOW() - INTERVAL '9 days 8 hours', true, false, 'premium', 1567, null),
  
  (gen_random_uuid(), 'My Fitness Influencer Cosplay', 'Posted gym selfies for 2 weeks. Worked out twice. The pre-workout expired before I finished the container.', 'Trend', gen_random_uuid(), NOW() - INTERVAL '10 days', NOW() - INTERVAL '10 days', true, false, 'basic', 1234, null),
  
  (gen_random_uuid(), 'Believing I Could Code Without Google', 'Spent 6 hours on a bug. Solution was on Stack Overflow from 2008. My pride was the only casualty.', 'Career', gen_random_uuid(), NOW() - INTERVAL '10 days 12 hours', NOW() - INTERVAL '10 days 12 hours', true, false, 'premium', 3421, null),
  
  (gen_random_uuid(), 'My Astrology Phase', 'Blamed Mercury retrograde for my lactose intolerance. Mars was in microwave when I burned my leftovers.', 'Trend', gen_random_uuid(), NOW() - INTERVAL '11 days', NOW() - INTERVAL '11 days', true, false, 'basic', 1789, null),
  
  (gen_random_uuid(), 'Thinking I Could Be a Streamer', 'Streamed for 8 hours to an audience of 2 (my mom and a bot). Chat was drier than my personality.', 'Dream', gen_random_uuid(), NOW() - INTERVAL '12 days', NOW() - INTERVAL '12 days', true, false, 'premium', 2456, null),
  
  (gen_random_uuid(), 'My Dropshipping Empire', 'Sold fidget spinners from AliExpress for 300% markup. Made $12 profit after ads. Jeff Bezos remains unthreated.', 'Startup', gen_random_uuid(), NOW() - INTERVAL '12 days 6 hours', NOW() - INTERVAL '12 days 6 hours', true, false, 'basic', 1345, null),
  
  (gen_random_uuid(), 'Believing I Could Adult Without Help', 'Googled how to pay taxes, change a tire, and exist. My search history is my autobiography of confusion.', 'Career', gen_random_uuid(), NOW() - INTERVAL '13 days', NOW() - INTERVAL '13 days', true, true, 'featured', 4567, null),
  
  (gen_random_uuid(), 'My Skincare Routine That Broke Me', '12-step routine, $400 in serums. My skin revolted harder than my 8th grade yearbook photo.', 'Trend', gen_random_uuid(), NOW() - INTERVAL '14 days', NOW() - INTERVAL '14 days', true, false, 'premium', 2134, null),
  
  (gen_random_uuid(), 'Thinking I Could Learn Spanish Overnight', 'Rosetta Stone meets reality check. Hola is still the extent of my multilingual empire after 6 months.', 'App', gen_random_uuid(), NOW() - INTERVAL '15 days', NOW() - INTERVAL '15 days', true, false, 'basic', 1678, null),
  
  (gen_random_uuid(), 'My LinkedIn Learning Marathon', 'Collected 23 certificates in Advanced Excel. Still can''t make a pivot table or pivot my career.', 'Career', gen_random_uuid(), NOW() - INTERVAL '16 days', NOW() - INTERVAL '16 days', true, false, 'premium', 2789, null),
  
  (gen_random_uuid(), 'Believing TikTok Recipes Actually Work', 'Feta pasta looked easy. Kitchen looked like a crime scene. Ordered pizza and questioned my life choices.', 'Meme', gen_random_uuid(), NOW() - INTERVAL '17 days', NOW() - INTERVAL '17 days', true, false, 'basic', 1892, null),
  
  (gen_random_uuid(), 'My NFT Art Career', 'Drew stick figures and called it generative art. Minted for $500, sold for $0.03. Art is subjective, right?', 'Crypto', gen_random_uuid(), NOW() - INTERVAL '18 days', NOW() - INTERVAL '18 days', true, false, 'premium', 3456, null),
  
  (gen_random_uuid(), 'Thinking I Could Quit Social Media', 'Deleted Instagram for mental health. Redownloaded 4 hours later to see if anyone noticed. Nobody did.', 'App', gen_random_uuid(), NOW() - INTERVAL '19 days', NOW() - INTERVAL '19 days', true, true, 'featured', 5234, null),
  
  (gen_random_uuid(), 'My Productivity System', 'Notion templates, habit trackers, bullet journals. Spent more time organizing my life than living it.', 'App', gen_random_uuid(), NOW() - INTERVAL '20 days', NOW() - INTERVAL '20 days', true, false, 'basic', 1567, null),
  
  (gen_random_uuid(), 'Believing My Parents Understood Crypto', 'Explained Bitcoin at dinner. They asked if it''s like Monopoly money. Still living in the digital stone age.', 'Family', gen_random_uuid(), NOW() - INTERVAL '21 days', NOW() - INTERVAL '21 days', true, false, 'premium', 2341, null),
  
  (gen_random_uuid(), 'My Clean Girl Aesthetic Attempt', 'Took 45 minutes to look effortlessly natural. Used 12 products for the no-makeup look. Irony died today.', 'Trend', gen_random_uuid(), NOW() - INTERVAL '22 days', NOW() - INTERVAL '22 days', true, false, 'basic', 1789, null),
  
  (gen_random_uuid(), 'Thinking I Could Fix My Sleep Schedule', 'Downloaded 17 sleep apps, bought blackout curtains. Still scrolling TikTok at 3am. The algorithm owns my soul.', 'App', gen_random_uuid(), NOW() - INTERVAL '23 days', NOW() - INTERVAL '23 days', true, false, 'premium', 2678, null),
  
  (gen_random_uuid(), 'My Vintage Shopping Addiction', 'Spent $300 on vintage band tees from 2019. Depop sellers really said vintage and meant last Tuesday.', 'Trend', gen_random_uuid(), NOW() - INTERVAL '24 days', NOW() - INTERVAL '24 days', true, false, 'basic', 1456, null),
  
  (gen_random_uuid(), 'Believing I Could Be an Influencer', 'Posted 73 outfit photos. Got 12 likes total (mom, dad, and 10 bots). Influence level: non-existent.', 'Dream', gen_random_uuid(), NOW() - INTERVAL '25 days', NOW() - INTERVAL '25 days', true, false, 'premium', 2134, null),
  
  (gen_random_uuid(), 'My Podcast That Nobody Asked For', '12 episodes about my daily life. 3 downloads total. The world wasn''t ready for my voice.', 'Dream', gen_random_uuid(), NOW() - INTERVAL '26 days', NOW() - INTERVAL '26 days', true, false, 'basic', 1234, null),
  
  (gen_random_uuid(), 'Thinking Cottagecore Was Achievable', 'Bought 47 mason jars for my studio apartment. Pinterest lied about rustic charm in 300 square feet.', 'Trend', gen_random_uuid(), NOW() - INTERVAL '27 days', NOW() - INTERVAL '27 days', true, false, 'premium', 1892, null),
  
  (gen_random_uuid(), 'My AI Writing Assistant Dependence', 'Can''t write emails without ChatGPT. My original thoughts are now endangered species. Innovation or laziness?', 'AI', gen_random_uuid(), NOW() - INTERVAL '28 days', NOW() - INTERVAL '28 days', true, true, 'featured', 3567, null),
  
  (gen_random_uuid(), 'Believing 2024 Would Be My Year', 'New year, new me lasted 4 days. Same problems, different calendar. 2025 will definitely be different... right?', 'Dream', gen_random_uuid(), NOW() - INTERVAL '29 days', NOW() - INTERVAL '29 days', true, false, 'basic', 2890, null),
  
  (gen_random_uuid(), 'My Attempt at Morning Yoga', 'Namaste in bed was my final pose. Downward dog became sideways sloth. The mat is now a doormat.', 'Trend', gen_random_uuid(), NOW() - INTERVAL '30 days', NOW() - INTERVAL '30 days', true, false, 'premium', 1678, null);

-- Add some fake reactions to make graves feel more interactive
INSERT INTO public.reactions (grave_id, user_id, reaction_type)
SELECT 
  g.id,
  gen_random_uuid(),
  (ARRAY['skull', 'fire', 'crying', 'clown'])[floor(random() * 4 + 1)::int]::reaction_type
FROM public.graves g
CROSS JOIN generate_series(1, floor(random() * 50 + 10)::int);

-- Add some fake profiles for the grave creators
INSERT INTO public.profiles (id, username, display_name, bio, total_burials, total_reactions)
SELECT DISTINCT 
  g.user_id,
  'user_' || substring(g.user_id::text, 1, 8),
  (ARRAY['DigitalShameQueen', 'CryptoRegretLord', 'StartupFailure2024', 'MainCharacterEnergy', 'TouchGrassAdvocate', 'DelusionalOptimist', 'BrokeBestie', 'ViralVictim', 'AlgorithmicSlave', 'MetaverseMigrant'])[floor(random() * 10 + 1)::int],
  'Professional failure collector • Digital archaeologist • Emotional damage connoisseur',
  floor(random() * 20 + 1)::int,
  floor(random() * 500 + 50)::int
FROM public.graves g;
