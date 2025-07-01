
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen cemetery-bg flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-4">
        <div className="mb-8">
          <span className="text-8xl block mb-4 float-animation">👻</span>
        </div>
        
        <h1 className="font-creepster text-4xl md:text-6xl text-primary glow-text mb-6">
          404 - Page Not Found
        </h1>
        
        <p className="text-xl text-foreground/90 mb-6 leading-relaxed">
          Looks like this page has already been buried and can't be resurrected.
        </p>
        
        <p className="text-muted-foreground mb-8">
          The digital afterlife is a mysterious place. Some pages are lost forever.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => navigate('/')}
          >
            Return to the Graveyard
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/graveyard')}
            className="border-accent/50 text-accent hover:bg-accent/10"
          >
            Browse Digital Graves
          </Button>
        </div>
        
        <div className="mt-12 text-sm text-muted-foreground">
          <p>Lost? Try one of these instead:</p>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            <button 
              onClick={() => navigate('/dashboard')}
              className="text-primary hover:text-primary/80 underline"
            >
              Dashboard
            </button>
            <button 
              onClick={() => navigate('/bury')}
              className="text-primary hover:text-primary/80 underline"
            >
              Bury Something
            </button>
            <button 
              onClick={() => navigate('/graveyard')}
              className="text-primary hover:text-primary/80 underline"
            >
              Browse Graves
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
