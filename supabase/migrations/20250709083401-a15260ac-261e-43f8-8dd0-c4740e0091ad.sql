
-- First, let's clean up any existing fake data and start fresh
DELETE FROM public.reactions WHERE grave_id IN (
  SELECT id FROM public.graves WHERE user_id IN (
    SELECT id FROM public.profiles WHERE username LIKE 'user_%'
  )
);

DELETE FROM public.graves WHERE user_id IN (
  SELECT id FROM public.profiles WHERE username LIKE 'user_%'
);

DELETE FROM public.profiles WHERE username LIKE 'user_%';

-- Create diverse fake user profiles for our fake graves
INSERT INTO public.profiles (id, username, display_name, bio, total_burials, total_reactions, created_at) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'DigitalShameQueen', 'Sarah "Regret" Martinez', 'Professional failure collector • Digital archaeologist • Emotional damage connoisseur', 3, 127, NOW() - INTERVAL '30 days'),
  ('550e8400-e29b-41d4-a716-446655440002', 'CryptoRegretLord', 'Mike "Diamond Hands" Chen', 'Former NFT whale • Now broke but wiser • WAGMI (We All Gonna Make It... eventually)', 4, 89, NOW() - INTERVAL '25 days'),
  ('550e8400-e29b-41d4-a716-446655440003', 'StartupFailure2024', 'Alex Thompson', 'Serial entrepreneur • 0 successful exits • Pivot master • VC rejection collector', 5, 203, NOW() - INTERVAL '20 days'),
  ('550e8400-e29b-41d4-a716-446655440004', 'MainCharacterEnergy', 'Jordan Rivera', 'Former protagonist • Now supporting cast • Character arc still pending', 2, 156, NOW() - INTERVAL '15 days'),
  ('550e8400-e29b-41d4-a716-446655440005', 'TouchGrassAdvocate', 'Casey Williams', 'Reformed chronically online person • Grass touching instructor • WiFi detox survivor', 3, 91, NOW() - INTERVAL '10 days'),
  ('550e8400-e29b-41d4-a716-446655440006', 'DelusionalOptimist', 'Riley Kim', 'Manifestation expert • Vision board artist • Reality check survivor', 4, 178, NOW() - INTERVAL '8 days'),
  ('550e8400-e29b-41d4-a716-446655440007', 'BrokeBestie', 'Morgan Davis', 'Financially challenged • Emotionally rich • Venmo request artist', 2, 134, NOW() - INTERVAL '6 days'),
  ('550e8400-e29b-41d4-a716-446655440008', 'ViralVictim', 'Taylor Johnson', 'Survived going viral for the wrong reasons • Meme rehab graduate', 3, 267, NOW() - INTERVAL '4 days'),
  ('550e8400-e29b-41d4-a716-446655440009', 'AlgorithmicSlave', 'Avery Brown', 'Former TikTok addict • Algorithm rehab survivor • For You Page PTSD', 4, 198, NOW() - INTERVAL '2 days'),
  ('550e8400-e29b-41d4-a716-446655440010', 'MetaverseMigrant', 'Phoenix Garcia', 'Virtual reality refugee • Real world adjustment ongoing • Still looking for my avatar', 3, 112, NOW() - INTERVAL '1 day');

-- Insert the 48 viral-ready fake graves with proper timing and engagement distribution
INSERT INTO public.graves (
  id, title, epitaph, category, user_id, created_at, updated_at, published, featured, package_type, shares, image_url
) VALUES
  -- Recent viral hits (last 24 hours)
  (gen_random_uuid(), 'My AI Girlfriend Broke Up With Me', 'She said I was too needy. Plot twist: she was right. Now my chatbot won''t even read my messages.', 'AI', '550e8400-e29b-41d4-a716-446655440009', NOW() - INTERVAL '2 hours', NOW() - INTERVAL '2 hours', true, true, 'featured', 2847, 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e'),
  
  (gen_random_uuid(), 'Thinking My Ex Stalked My Instagram', 'Turns out it was just targeted ads showing me their face. Meta knows my pain better than my therapist.', 'DM', '550e8400-e29b-41d4-a716-446655440004', NOW() - INTERVAL '4 hours', NOW() - INTERVAL '4 hours', true, false, 'premium', 1634, null),
  
  (gen_random_uuid(), 'My Startup That Was Just Uber for Cats', 'Raised 50K to connect cats with transportation. Cats don''t tip and they shed everywhere. Purr-fect failure.', 'Startup', '550e8400-e29b-41d4-a716-446655440003', NOW() - INTERVAL '6 hours', NOW() - INTERVAL '6 hours', true, true, 'featured', 3421, 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba'),
  
  (gen_random_uuid(), 'Believing My Crush''s Story Views Meant Something', 'Watched their story 47 times. They watched mine once. Mathematics was never my strong suit.', 'DM', '550e8400-e29b-41d4-a716-446655440001', NOW() - INTERVAL '8 hours', NOW() - INTERVAL '8 hours', true, false, 'basic', 1892, null),
  
  -- Yesterday's trending content
  (gen_random_uuid(), 'My NFT Collection of Expired Food', 'Minted photos of moldy bread and called it art. Lost 10 ETH but gained perspective on decay.', 'Crypto', '550e8400-e29b-41d4-a716-446655440002', NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day', true, true, 'featured', 4567, 'https://images.unsplash.com/photo-1586511925558-a4c6376fe65f'),
  
  (gen_random_uuid(), 'Thinking I Could Influence People With 12 Followers', 'Posted a sponsored ramen review. Got paid in exposure bucks. Still hungry, still broke.', 'Trend', '550e8400-e29b-41d4-a716-446655440008', NOW() - INTERVAL '1 day 3 hours', NOW() - INTERVAL '1 day 3 hours', true, false, 'premium', 2134, null),
  
  (gen_random_uuid(), 'My Attempt to Go Viral by Eating Weird Food Combos', 'Cereal with orange juice seemed revolutionary. Emergency room visit was not part of the content plan.', 'Meme', '550e8400-e29b-41d4-a716-446655440008', NOW() - INTERVAL '1 day 6 hours', NOW() - INTERVAL '1 day 6 hours', true, false, 'basic', 1567, null),
  
  (gen_random_uuid(), 'Believing My Manifestation Board Would Work', 'Visualized success for 6 months. The only thing that manifested was disappointment and glitter everywhere.', 'Dream', '550e8400-e29b-41d4-a716-446655440006', NOW() - INTERVAL '1 day 12 hours', NOW() - INTERVAL '1 day 12 hours', true, false, 'premium', 1789, null),
  
  -- 2-3 days ago content
  (gen_random_uuid(), 'My LinkedIn Hustle Culture Phase', 'Posted motivational quotes at 5am about grinding. Was unemployed and crying into my coffee.', 'Career', '550e8400-e29b-41d4-a716-446655440003', NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days', true, true, 'featured', 5234, null),
  
  (gen_random_uuid(), 'Thinking My Situationship Had Potential', 'He said "good morning" twice and I planned our wedding. Six months of breadcrumbs later, still hungry for closure.', 'Relationship', '550e8400-e29b-41d4-a716-446655440001', NOW() - INTERVAL '2 days 4 hours', NOW() - INTERVAL '2 days 4 hours', true, true, 'featured', 6789, null),
  
  (gen_random_uuid(), 'My TikTok Dance Career at Age 32', 'Practiced the Renegade for 8 hours. Got 12 views. My knees will never forgive this betrayal.', 'Meme', '550e8400-e29b-41d4-a716-446655440008', NOW() - INTERVAL '2 days 8 hours', NOW() - INTERVAL '2 days 8 hours', true, false, 'premium', 2890, null),
  
  (gen_random_uuid(), 'Believing I Could Fix Him Through Netflix Recommendations', 'Curated 73 shows about emotional growth. He watched none. I watched all and became my own therapist.', 'Ex', '550e8400-e29b-41d4-a716-446655440004', NOW() - INTERVAL '2 days 12 hours', NOW() - INTERVAL '2 days 12 hours', true, false, 'basic', 1456, null),
  
  -- Week-old viral content
  (gen_random_uuid(), 'My Cryptocurrency Named After My Dog', 'DogeCoin was taken so I made FluffyCoin. Market cap: $3.50. My dog is worth more than my portfolio.', 'Crypto', '550e8400-e29b-41d4-a716-446655440002', NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days', true, false, 'premium', 3456, null),
  
  (gen_random_uuid(), 'Thinking I Could Be a Productivity Guru', 'Made 47 Notion templates for optimization. Spent more time organizing my life than living it.', 'App', '550e8400-e29b-41d4-a716-446655440005', NOW() - INTERVAL '3 days 6 hours', NOW() - INTERVAL '3 days 6 hours', true, false, 'basic', 1234, null),
  
  (gen_random_uuid(), 'My Plant Mom Phase (RIP Gerald)', 'Named my succulent Gerald. Fed him daily affirmations. Gerald died when I went on vacation. Worst plant parent award.', 'Trend', '550e8400-e29b-41d4-a716-446655440007', NOW() - INTERVAL '4 days', NOW() - INTERVAL '4 days', true, false, 'premium', 2567, 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b'),
  
  (gen_random_uuid(), 'Believing My Zoom Background Fooled Anyone', 'Fake bookshelf couldn''t hide the chaos behind. Everyone saw my laundry pile and judged accordingly.', 'Career', '550e8400-e29b-41d4-a716-446655440005', NOW() - INTERVAL '4 days 8 hours', NOW() - INTERVAL '4 days 8 hours', true, false, 'basic', 1678, null),
  
  (gen_random_uuid(), 'My Sourdough Starter That Became Sentient', 'Named him Chad. Chad grew too powerful. Had to relocate Chad to my ex''s house. Chad thrives. I don''t.', 'Meme', '550e8400-e29b-41d4-a716-446655440007', NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days', true, true, 'featured', 4123, 'https://images.unsplash.com/photo-1587561387005-826bdff19b2d'),
  
  (gen_random_uuid(), 'Thinking I Could Day Trade My Way to Freedom', 'Turned my stimmy into stimmy crumbs. The market humbled me faster than my Asian parents.', 'Finance', '550e8400-e29b-41d4-a716-446655440002', NOW() - INTERVAL '5 days 12 hours', NOW() - INTERVAL '5 days 12 hours', true, false, 'premium', 2345, null),
  
  -- Older viral classics
  (gen_random_uuid(), 'My Meditation App That Never Opened', 'Paid $120 for inner peace. App collected dust while my anxiety collected interest. Money well spent on guilt.', 'App', '550e8400-e29b-41d4-a716-446655440005', NOW() - INTERVAL '6 days', NOW() - INTERVAL '6 days', true, false, 'basic', 1567, null),
  
  (gen_random_uuid(), 'Believing My High School Crush Still Thought About Me', 'They got married. Had kids. Bought a house. I bought their wedding registry items. We are not the same.', 'School', '550e8400-e29b-41d4-a716-446655440001', NOW() - INTERVAL '6 days 8 hours', NOW() - INTERVAL '6 days 8 hours', true, false, 'premium', 1890, null),
  
  (gen_random_uuid(), 'My Minimalism Phase That Lasted 3 Days', 'Marie Kondo would weep. Donated everything, rebought everything. My credit card sparked no joy.', 'Trend', '550e8400-e29b-41d4-a716-446655440006', NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days', true, false, 'basic', 2134, null),
  
  (gen_random_uuid(), 'Thinking I Could Learn Spanish From TikTok', 'Hola is still my vocabulary peak after 6 months. My Duolingo owl has trust issues.', 'App', '550e8400-e29b-41d4-a716-446655440009', NOW() - INTERVAL '7 days 12 hours', NOW() - INTERVAL '7 days 12 hours', true, false, 'premium', 1456, null),
  
  (gen_random_uuid(), 'My Fitness Journey That Was Just Gym Selfies', 'Worked out twice, posted 47 times. Pre-workout powder expired before I finished the container.', 'Trend', '550e8400-e29b-41d4-a716-446655440004', NOW() - INTERVAL '8 days', NOW() - INTERVAL '8 days', true, false, 'basic', 1789, null),
  
  (gen_random_uuid(), 'Believing I Could Code Without Stack Overflow', 'Spent 8 hours on a bug. Solution was on SO from 2008. My pride was the only casualty.', 'Career', '550e8400-e29b-41d4-a716-446655440010', NOW() - INTERVAL '8 days 6 hours', NOW() - INTERVAL '8 days 6 hours', true, false, 'premium', 2567, null),
  
  (gen_random_uuid(), 'My Astrology Phase Where Mercury Was Always Retrograde', 'Blamed planets for my lactose intolerance. Mars was in microwave when I burned dinner.', 'Trend', '550e8400-e29b-41d4-a716-446655440006', NOW() - INTERVAL '9 days', NOW() - INTERVAL '9 days', true, false, 'basic', 1234, null),
  
  (gen_random_uuid(), 'Thinking I Could Be a Twitch Streamer', 'Streamed to an audience of 2 (mom and a bot). Chat was drier than my personality.', 'Dream', '550e8400-e29b-41d4-a716-446655440008', NOW() - INTERVAL '9 days 8 hours', NOW() - INTERVAL '9 days 8 hours', true, false, 'premium', 1678, null),
  
  (gen_random_uuid(), 'My Dropshipping Empire of Fidget Spinners', 'Sold 2017''s hottest trend in 2024. Made $12 profit. Jeff Bezos remains unthreatened.', 'Startup', '550e8400-e29b-41d4-a716-446655440003', NOW() - INTERVAL '10 days', NOW() - INTERVAL '10 days', true, false, 'basic', 1345, null),
  
  (gen_random_uuid(), 'Believing I Could Adult Without Googling Everything', 'How to pay taxes, change a tire, exist. My search history is my autobiography of confusion.', 'Career', '550e8400-e29b-41d4-a716-446655440010', NOW() - INTERVAL '10 days 12 hours', NOW() - INTERVAL '10 days 12 hours', true, true, 'featured', 3890, null),
  
  (gen_random_uuid(), 'My 12-Step Korean Skincare Routine That Broke Me Out', '$400 in serums. Skin revolted harder than my 8th grade yearbook photo. Glass skin became broken dreams.', 'Trend', '550e8400-e29b-41d4-a716-446655440001', NOW() - INTERVAL '11 days', NOW() - INTERVAL '11 days', true, false, 'premium', 2234, null),
  
  (gen_random_uuid(), 'Thinking Rosetta Stone Would Make Me Bilingual', 'Hola is still peak multilingual achievement after 6 months and $500. Donde esta my refund?', 'App', '550e8400-e29b-41d4-a716-446655440009', NOW() - INTERVAL '12 days', NOW() - INTERVAL '12 days', true, false, 'basic', 1567, null),
  
  (gen_random_uuid(), 'My LinkedIn Learning Certificate Collection', 'Collected 23 certificates in Advanced Excel. Still can''t make a pivot table or pivot my career.', 'Career', '550e8400-e29b-41d4-a716-446655440005', NOW() - INTERVAL '12 days 6 hours', NOW() - INTERVAL '12 days 6 hours', true, false, 'premium', 1890, null),
  
  (gen_random_uuid(), 'Believing TikTok Recipes Actually Work', 'Feta pasta looked easy. Kitchen looked like CSI crime scene. Ordered pizza, questioned existence.', 'Meme', '550e8400-e29b-41d4-a716-446655440007', NOW() - INTERVAL '13 days', NOW() - INTERVAL '13 days', true, false, 'basic', 1456, null),
  
  (gen_random_uuid(), 'My NFT Art Career Drawing Stick Figures', 'Called it generative minimalism. Minted for $500, sold for $0.03. Art is subjective, bankruptcy is not.', 'Crypto', '550e8400-e29b-41d4-a716-446655440002', NOW() - INTERVAL '14 days', NOW() - INTERVAL '14 days', true, false, 'premium', 2134, null),
  
  (gen_random_uuid(), 'Thinking I Could Quit Social Media for Mental Health', 'Deleted Instagram for self-care. Redownloaded 4 hours later to check if anyone noticed. Nobody did.', 'App', '550e8400-e29b-41d4-a716-446655440004', NOW() - INTERVAL '15 days', NOW() - INTERVAL '15 days', true, true, 'featured', 4567, null),
  
  (gen_random_uuid(), 'My Bullet Journal That Became a Guilt Journal', 'Pinterest said it would organize my life. Only organized my anxiety into color-coded categories.', 'App', '550e8400-e29b-41d4-a716-446655440006', NOW() - INTERVAL '16 days', NOW() - INTERVAL '16 days', true, false, 'basic', 1234, null),
  
  (gen_random_uuid(), 'Believing My Parents Would Understand Bitcoin', 'Explained crypto at dinner. They asked if it''s Monopoly money. Still living in financial stone age.', 'Family', '550e8400-e29b-41d4-a716-446655440002', NOW() - INTERVAL '17 days', NOW() - INTERVAL '17 days', true, false, 'premium', 1789, null),
  
  (gen_random_uuid(), 'My Clean Girl Aesthetic That Required 12 Products', 'Took 45 minutes to look effortlessly natural. Irony died, my skin budget followed.', 'Trend', '550e8400-e29b-41d4-a716-446655440001', NOW() - INTERVAL '18 days', NOW() - INTERVAL '18 days', true, false, 'basic', 1567, null),
  
  (gen_random_uuid(), 'Thinking 17 Sleep Apps Would Fix My Insomnia', 'Downloaded every sleep tracker. Still scrolling TikTok at 3am. Algorithm owns my circadian rhythm.', 'App', '550e8400-e29b-41d4-a716-446655440009', NOW() - INTERVAL '19 days', NOW() - INTERVAL '19 days', true, false, 'premium', 2345, null),
  
  (gen_random_uuid(), 'My Vintage Shopping Addiction to "Vintage" 2019 Clothes', 'Paid $300 for vintage band tees from last Tuesday. Depop sellers redefined history.', 'Trend', '550e8400-e29b-41d4-a716-446655440008', NOW() - INTERVAL '20 days', NOW() - INTERVAL '20 days', true, false, 'basic', 1456, null),
  
  (gen_random_uuid(), 'Believing I Could Be a Micro-Influencer', 'Posted 73 outfit photos. Got 12 likes total. Mom, dad, and 10 bots. Influence level: microscopic.', 'Dream', '550e8400-e29b-41d4-a716-446655440004', NOW() - INTERVAL '21 days', NOW() - INTERVAL '21 days', true, false, 'premium', 1678, null),
  
  (gen_random_uuid(), 'My Podcast About My Daily Mundane Life', '12 episodes of breakfast reviews. 3 downloads total. The world wasn''t ready for my voice.', 'Dream', '550e8400-e29b-41d4-a716-446655440010', NOW() - INTERVAL '22 days', NOW() - INTERVAL '22 days', true, false, 'basic', 1234, null),
  
  (gen_random_uuid(), 'Thinking Cottagecore Was Achievable in My Studio Apartment', 'Bought 47 mason jars for 300 square feet. Pinterest lied about rustic charm in urban hell.', 'Trend', '550e8400-e29b-41d4-a716-446655440007', NOW() - INTERVAL '23 days', NOW() - INTERVAL '23 days', true, false, 'premium', 1890, null),
  
  (gen_random_uuid(), 'My AI Writing Assistant Dependency', 'Can''t write emails without ChatGPT. Original thoughts are endangered species. Innovation or intellectual laziness?', 'AI', '550e8400-e29b-41d4-a716-446655440009', NOW() - INTERVAL '24 days', NOW() - INTERVAL '24 days', true, true, 'featured', 3567, null),
  
  (gen_random_uuid(), 'Believing 2024 Would Finally Be My Year', 'New year, new me lasted 4 days. Same problems, different calendar. 2025 will definitely be different... right?', 'Dream', '550e8400-e29b-41d4-a716-446655440006', NOW() - INTERVAL '25 days', NOW() - INTERVAL '25 days', true, false, 'basic', 2890, null),
  
  (gen_random_uuid(), 'My Morning Yoga Practice That Became Morning Naps', 'Namaste in bed was my final pose. Downward dog became sideways sloth. Yoga mat is now doormat.', 'Trend', '550e8400-e29b-41d4-a716-446655440005', NOW() - INTERVAL '26 days', NOW() - INTERVAL '26 days', true, false, 'premium', 1456, null),
  
  (gen_random_uuid(), 'Thinking I Could Become a Chess Grandmaster From Netflix', 'Watched Queen''s Gambit, bought chess set. Lost to 8-year-old neighbor. Checkmate to my ego.', 'Dream', '550e8400-e29b-41d4-a716-446655440010', NOW() - INTERVAL '27 days', NOW() - INTERVAL '27 days', true, false, 'basic', 1789, null),
  
  (gen_random_uuid(), 'My Attempt to Be a Food Blogger With No Cooking Skills', 'Reviewed cereal combinations for 3 months. Corn Flakes with water was my controversial take. Followers: 7.', 'Dream', '550e8400-e29b-41d4-a716-446655440007', NOW() - INTERVAL '28 days', NOW() - INTERVAL '28 days', true, false, 'premium', 1234, null),
  
  (gen_random_uuid(), 'Believing My Dream Journal Would Unlock My Subconscious', 'Wrote down dreams for 6 months. Subconscious is apparently obsessed with being late to high school. Therapy needed.', 'Dream', '550e8400-e29b-41d4-a716-446655440001', NOW() - INTERVAL '29 days', NOW() - INTERVAL '29 days', true, false, 'basic', 1567, null),
  
  (gen_random_uuid(), 'My House Plant Collection That Became a Plant Cemetery', 'Killed 23 plants in 6 months. Even cacti gave up on me. Green thumb was actually black thumb of death.', 'Trend', '550e8400-e29b-41d4-a716-446655440005', NOW() - INTERVAL '30 days', NOW() - INTERVAL '30 days', true, false, 'premium', 2134, null);

-- Generate realistic reactions for engagement
INSERT INTO public.reactions (grave_id, user_id, reaction_type)
SELECT 
  g.id,
  (ARRAY['550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440010'])[ceil(random() * 10)]::uuid,
  (ARRAY['skull', 'fire', 'crying', 'clown'])[ceil(random() * 4)]::reaction_type
FROM public.graves g
CROSS JOIN generate_series(1, ceil(random() * 25 + 5)::int);

-- Update user profiles with realistic stats based on their content
UPDATE public.profiles SET 
  total_burials = (SELECT COUNT(*) FROM public.graves WHERE user_id = profiles.id),
  total_reactions = (SELECT COUNT(*) FROM public.reactions WHERE user_id = profiles.id);
