
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { User, Settings, LogOut, Skull, Crown, PlusCircle } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAuthClick = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => navigate('/')}
        >
          <span className="text-2xl">💀</span>
          <span className="font-creepster text-xl text-primary glow-text">
            The Internet Graveyard
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Button
            variant="ghost"
            className={`hover:text-primary ${location.pathname === '/' ? 'text-primary' : ''}`}
            onClick={() => navigate('/')}
          >
            Home
          </Button>
          <Button
            variant="ghost"
            className={`hover:text-primary ${location.pathname === '/graveyard' ? 'text-primary' : ''}`}
            onClick={() => navigate('/graveyard')}
          >
            Browse Graves
          </Button>
          {user && (
            <Button
              variant="ghost"
              className={`hover:text-primary ${location.pathname === '/bury' ? 'text-primary' : ''}`}
              onClick={() => navigate('/bury')}
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Bury Something
            </Button>
          )}
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-3">
              {/* User Stats */}
              {profile && (
                <div className="hidden sm:flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    <Skull className="w-3 h-3 mr-1" />
                    {profile.total_burials || 0}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    🔥 {profile.total_reactions || 0}
                  </Badge>
                  {profile.level > 1 && (
                    <Badge variant="outline" className="text-xs">
                      <Crown className="w-3 h-3 mr-1" />
                      Lvl {profile.level}
                    </Badge>
                  )}
                </div>
              )}

              {/* User Menu */}
              <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={profile?.avatar_url} alt={profile?.display_name || 'User'} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {profile?.display_name 
                          ? getInitials(profile.display_name)
                          : user.email?.[0]?.toUpperCase() || 'U'
                        }
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">
                        {profile?.display_name || 'Anonymous Grave Keeper'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        @{profile?.username || 'user'}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Profile Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                onClick={() => navigate('/auth')}
                className="text-muted-foreground hover:text-primary"
              >
                Sign In
              </Button>
              <Button
                onClick={() => navigate('/auth')}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Join Graveyard
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
