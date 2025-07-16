
-- Insert 20 additional fake user profiles for the new graves
INSERT INTO public.profiles (id, username, display_name, bio, total_burials, total_reactions, created_at) VALUES
  ('650e8400-e29b-41d4-a716-446655440001', 'ghost_destroyer', 'Alex "RIP Master" Johnson', 'Digital archaeologist • Grave keeper extraordinaire • 404 soul not found', 1, 43, NOW() - INTERVAL '15 days'),
  ('650e8400-e29b-41d4-a716-446655440002', 'rip_master2024', 'Sam "Ghost Hunter" Chen', 'Certified failure collector • Professional mourner • Digital death specialist', 1, 67, NOW() - INTERVAL '12 days'),
  ('650e8400-e29b-41d4-a716-446655440003', 'soul_collector_x', 'Jordan "Pixel Reaper" Williams', 'Virtual cemetery manager • Meme mortician • Error 500 survivor', 1, 89, NOW() - INTERVAL '8 days'),
  ('650e8400-e29b-41d4-a716-446655440004', 'digital_mourner', 'Casey "Byte Burial" Davis', 'Code cemetery curator • Bug exterminator • Stack overflow survivor', 1, 34, NOW() - INTERVAL '20 days'),
  ('650e8400-e29b-41d4-a716-446655440005', 'graveyard_keeper', 'Taylor "404 Forever" Martinez', 'Lost in cyberspace • Digital ghost whisperer • Connection timeout specialist', 1, 56, NOW() - INTERVAL '6 days'),
  ('650e8400-e29b-41d4-a716-446655440006', 'phantom_coder', 'Riley "Null Pointer" Brown', 'Debugging the afterlife • Segfault survivor • Memory leak investigator', 1, 78, NOW() - INTERVAL '25 days'),
  ('650e8400-e29b-41d4-a716-446655440007', 'cyber_undertaker', 'Morgan "Delete Forever" Garcia', 'Permanent deletion specialist • Recycle bin emptier • CTRL+Z rebel', 1, 45, NOW() - INTERVAL '3 days'),
  ('650e8400-e29b-41d4-a716-446655440008', 'error_404_soul', 'Avery "Broken Link" Kim', 'Link rot researcher • Dead end navigator • Page not found expert', 1, 92, NOW() - INTERVAL '18 days'),
  ('650e8400-e29b-41d4-a716-446655440009', 'glitch_in_matrix', 'Phoenix "Blue Screen" Rivera', 'System crash survivor • Runtime error collector • Exception handler', 1, 61, NOW() - INTERVAL '7 days'),
  ('650e8400-e29b-41d4-a716-446655440010', 'digital_tombstone', 'Quinn "Deprecated" Thompson', 'Legacy code maintainer • Backwards compatibility warrior • EOL specialist', 1, 38, NOW() - INTERVAL '14 days'),
  ('650e8400-e29b-41d4-a716-446655440011', 'ghost_in_shell', 'Drew "Kernel Panic" Lee', 'Operating system exorcist • Driver update victim • BSOD therapist', 1, 73, NOW() - INTERVAL '11 days'),
  ('650e8400-e29b-41d4-a716-446655440012', 'dead_pixel_hunter', 'Sage "Memory Leak" Wilson', 'Hardware failure investigator • Corrupted data recoverer • Format survivor', 1, 51, NOW() - INTERVAL '22 days'),
  ('650e8400-e29b-41d4-a716-446655440013', 'binary_graveyard', 'Cameron "Logic Bomb" Clark', 'Boolean burial specialist • Truth table therapist • XOR gate guardian', 1, 69, NOW() - INTERVAL '5 days'),
  ('650e8400-e29b-41d4-a716-446655440014', 'null_void_keeper', 'Reese "Infinite Loop" Miller', 'Recursion recovery expert • Stack overflow survivor • Base case finder', 1, 82, NOW() - INTERVAL '16 days'),
  ('650e8400-e29b-41d4-a716-446655440015', 'syntax_error_lord', 'Jamie "Missing Semicolon" White', 'Compiler error translator • Syntax sugar addict • Bracket matcher', 1, 47, NOW() - INTERVAL '9 days'),
  ('650e8400-e29b-41d4-a716-446655440016', 'debug_mode_ghost', 'Parker "Breakpoint" Hall', 'Step-through survivor • Watch variable expert • Call stack analyzer', 1, 65, NOW() - INTERVAL '13 days'),
  ('650e8400-e29b-41d4-a716-446655440017', 'server_down_soul', 'Skyler "503 Error" Young', '500 status code collector • Uptime challenger • Load balancer nemesis', 1, 54, NOW() - INTERVAL '19 days'),
  ('650e8400-e29b-41d4-a716-446655440018', 'cache_miss_spirit', 'Rowan "Buffer Overflow" King', 'Memory management mayhem • Garbage collection survivor • Heap corruption expert', 1, 71, NOW() - INTERVAL '4 days'),
  ('650e8400-e29b-41d4-a716-446655440019', 'deprecated_dev', 'Emery "Version Conflict" Scott', 'Dependency hell navigator • Package manager victim • Merge conflict mediator', 1, 39, NOW() - INTERVAL '17 days'),
  ('650e8400-e29b-41d4-a716-446655440020', 'timeout_reaper', 'Finley "Connection Lost" Adams', 'Network timeout specialist • Latency investigator • Packet loss mourner', 1, 88, NOW() - INTERVAL '10 days');

-- Insert 20 new fake graves with unique, viral-worthy content
INSERT INTO public.graves (
  id, title, epitaph, category, user_id, created_at, updated_at, published, featured, package_type, shares, image_url
) VALUES
  (gen_random_uuid(), 'MySpace Profile with 47 Best Friends Forever', 'Tom was my only real friend. The rest were just HTML code and broken dreams. Top 8 trauma still haunts me.', 'Platform', '650e8400-e29b-41d4-a716-446655440001', NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day', true, false, 'premium', 234, 'https://images.unsplash.com/photo-1611162617474-5b21e879e113'),
  
  (gen_random_uuid(), 'My Flappy Bird High Score of 4', 'Spent 6 months perfecting my technique. Peak achievement: not hitting the first pipe. Legacy of mediocrity continues.', 'Game', '650e8400-e29b-41d4-a716-446655440002', NOW() - INTERVAL '3 hours', NOW() - INTERVAL '3 hours', true, true, 'featured', 1567, 'https://images.unsplash.com/photo-1511512578047-dfb367046420'),
  
  (gen_random_uuid(), 'Cringe TikTok Phase Where I Thought I Was Funny', 'Posted 73 videos of me lip-syncing to audio clips. Got 12 views total. Even my mom stopped watching.', 'Meme', '650e8400-e29b-41d4-a716-446655440003', NOW() - INTERVAL '5 hours', NOW() - INTERVAL '5 hours', true, false, 'premium', 892, 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0'),
  
  (gen_random_uuid(), 'Google+ Circle Management System', 'Organized friends into 47 circles. Had 3 friends total. Over-engineering social anxiety since 2011.', 'Platform', '650e8400-e29b-41d4-a716-446655440004', NOW() - INTERVAL '8 hours', NOW() - INTERVAL '8 hours', true, false, 'basic', 445, null),
  
  (gen_random_uuid(), 'My 2-Hour Clubhouse Fame as Audio Influencer', 'Joined random rooms, said "Great point!" 47 times. Thought I was building my personal brand. Built anxiety instead.', 'Platform', '650e8400-e29b-41d4-a716-446655440005', NOW() - INTERVAL '12 hours', NOW() - INTERVAL '12 hours', true, false, 'premium', 678, null),
  
  (gen_random_uuid(), 'Farmville Crops I Let Die During Finals Week', 'My virtual strawberries deserved better. Prioritized real life over digital agriculture. Poor life choices.', 'Game', '650e8400-e29b-41d4-a716-446655440006', NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days', true, true, 'featured', 1234, 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b'),
  
  (gen_random_uuid(), 'Pokémon GO Gym Leader Dreams', 'Walked 200 miles for CP 47 Pidgey. Gym got taken over in 3 minutes. Exercise was the real victory.', 'Game', '650e8400-e29b-41d4-a716-446655440007', NOW() - INTERVAL '16 hours', NOW() - INTERVAL '16 hours', true, false, 'basic', 567, null),
  
  (gen_random_uuid(), 'Vine Career Cut Short by 6-Second Attention Span', 'Posted 23 Vines, got 4 loops total. Creativity died with the platform. RIP digital comedy dreams.', 'Platform', '650e8400-e29b-41d4-a716-446655440008', NOW() - INTERVAL '1 day 4 hours', NOW() - INTERVAL '1 day 4 hours', true, false, 'premium', 789, null),
  
  (gen_random_uuid(), 'My Spotify Wrapped That Exposed My Depression', 'Top song: "Mad World" played 1,247 times. Algorithm knew my mental state better than my therapist.', 'App', '650e8400-e29b-41d4-a716-446655440009', NOW() - INTERVAL '20 hours', NOW() - INTERVAL '20 hours', true, false, 'basic', 923, null),
  
  (gen_random_uuid(), 'Internet Explorer Bookmarks from 2003', 'Saved 200+ links to Flash games and GeoCities sites. Digital archaeology of a simpler, slower internet.', 'Platform', '650e8400-e29b-41d4-a716-446655440010', NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days', true, false, 'premium', 345, null),
  
  (gen_random_uuid(), 'My Tamagotchi That Died While I Was at School', 'Fed him every morning, came home to digital corpse. First lesson in the fragility of virtual life.', 'Game', '650e8400-e29b-41d4-a716-446655440011', NOW() - INTERVAL '6 hours', NOW() - INTERVAL '6 hours', true, true, 'featured', 1456, 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f'),
  
  (gen_random_uuid(), 'AIM Away Messages That Were Passive-Aggressive Art', '"BRB studying" while playing RuneScape for 8 hours. Master of digital deception and self-sabotage.', 'Platform', '650e8400-e29b-41d4-a716-446655440012', NOW() - INTERVAL '1 day 8 hours', NOW() - INTERVAL '1 day 8 hours', true, false, 'basic', 678, null),
  
  (gen_random_uuid(), 'My 47 Unfinished Python Projects', 'Started with "Hello World", peaked at calculator app. GitHub graveyard of ambitious beginnings and inevitable abandonment.', 'Code', '650e8400-e29b-41d4-a716-446655440013', NOW() - INTERVAL '10 hours', NOW() - INTERVAL '10 hours', true, false, 'premium', 834, null),
  
  (gen_random_uuid(), 'Neopets Account I Forgot the Password To', 'My virtual pet starved while I figured out what email I used in 2002. Digital neglect at its finest.', 'Game', '650e8400-e29b-41d4-a716-446655440014', NOW() - INTERVAL '2 days 12 hours', NOW() - INTERVAL '2 days 12 hours', true, false, 'basic', 456, null),
  
  (gen_random_uuid(), 'ICQ Number That Was My Digital Identity', '6-digit UIN was my first social media handle. "Uh oh!" sound still triggers PTSD from dial-up days.', 'Platform', '650e8400-e29b-41d4-a716-446655440015', NOW() - INTERVAL '14 hours', NOW() - INTERVAL '14 hours', true, false, 'premium', 712, null),
  
  (gen_random_uuid(), 'My World of Warcraft Character I Rage-Deleted', 'Level 67 Paladin deleted after ninja loot incident. Digital tantrums have permanent consequences.', 'Game', '650e8400-e29b-41d4-a716-446655440016', NOW() - INTERVAL '1 day 16 hours', NOW() - INTERVAL '1 day 16 hours', true, true, 'featured', 1123, 'https://images.unsplash.com/photo-1542751371-adc38448a05e'),
  
  (gen_random_uuid(), 'MapQuest Directions I Printed and Lost', 'Printed 17 pages for 20-minute drive. Got lost anyway. GPS was not yet our digital overlord.', 'Platform', '650e8400-e29b-41d4-a716-446655440017', NOW() - INTERVAL '18 hours', NOW() - INTERVAL '18 hours', true, false, 'basic', 589, null),
  
  (gen_random_uuid(), 'My Limewire Music Collection Full of Malware', 'Downloaded "Linkin Park" got 47 viruses instead. Paid premium price for corrupted MP3s and system crashes.', 'Platform', '650e8400-e29b-41d4-a716-446655440018', NOW() - INTERVAL '22 hours', NOW() - INTERVAL '22 hours', true, false, 'premium', 967, null),
  
  (gen_random_uuid(), 'Friendster Profile That Predated Social Media', 'Was cool before Facebook existed. Digital hipster credentials expired with the platform.', 'Platform', '650e8400-e29b-41d4-a716-446655440019', NOW() - INTERVAL '4 days', NOW() - INTERVAL '4 days', true, false, 'basic', 278, null),
  
  (gen_random_uuid(), 'My Geocities Website with Blinking Text', 'Under construction since 1999. Visitor counter stuck at 47. Peak of early web design aesthetics.', 'Platform', '650e8400-e29b-41d4-a716-446655440020', NOW() - INTERVAL '2 days 6 hours', NOW() - INTERVAL '2 days 6 hours', true, false, 'premium', 645, 'https://images.unsplash.com/photo-1451187580459-43490279c0fa');

-- Generate realistic reactions for the new graves (3-7 reactions each)
INSERT INTO public.reactions (grave_id, user_id, reaction_type)
SELECT 
  g.id,
  (ARRAY['550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440005', '650e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440004', '650e8400-e29b-41d4-a716-446655440005'])[ceil(random() * 10)]::uuid,
  (ARRAY['skull', 'fire', 'crying', 'clown'])[ceil(random() * 4)]::reaction_type
FROM public.graves g
WHERE g.user_id IN (
  SELECT id FROM public.profiles WHERE username LIKE 'ghost_%' OR username LIKE 'rip_%' OR username LIKE '%_ghost' OR username LIKE '%_soul' OR username LIKE '%_reaper'
)
CROSS JOIN generate_series(1, ceil(random() * 5 + 3)::int);

-- Update user profiles with correct burial and reaction counts
UPDATE public.profiles SET 
  total_burials = (SELECT COUNT(*) FROM public.graves WHERE user_id = profiles.id),
  total_reactions = (SELECT COUNT(*) FROM public.reactions WHERE user_id = profiles.id);

-- Enable real-time functionality for the graves table
ALTER TABLE public.graves REPLICA IDENTITY FULL;
ALTER publication supabase_realtime ADD TABLE public.graves;

-- Enable real-time functionality for the reactions table  
ALTER TABLE public.reactions REPLICA IDENTITY FULL;
ALTER publication supabase_realtime ADD TABLE public.reactions;

-- Enable real-time functionality for the profiles table
ALTER TABLE public.profiles REPLICA IDENTITY FULL;
ALTER publication supabase_realtime ADD TABLE public.profiles;
