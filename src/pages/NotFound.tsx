
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A0A0A] text-white p-4">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-display font-bold mb-4 text-gradient">404</h1>
        <p className="text-xl text-gray-400 mb-8">
          The page you're looking for seems to have vanished into the digital void.
        </p>
        <Button 
          asChild
          className="bg-gradient-to-r from-neon-purple to-neon-blue text-white"
        >
          <a href="/">Return to Home</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
