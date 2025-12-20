import React from 'react';
import { MapPin, Globe, Navigation } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Panel - Map themed branding section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-muted/30 border-r">
        {/* Stylized Map Background - SVG */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-border" opacity="0.3" />
            </pattern>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <rect width="100" height="100" fill="url(#smallGrid)" />
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="1" className="text-border" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Abstract landmass shapes */}
          <g className="text-muted-foreground" opacity="0.15">
            <path d="M 100 200 Q 150 180 200 200 L 220 250 Q 200 270 180 260 L 150 280 Q 120 260 100 250 Z" fill="currentColor" />
            <path d="M 300 150 Q 350 140 380 160 L 400 200 Q 380 220 360 210 L 330 230 Q 310 210 300 190 Z" fill="currentColor" />
            <ellipse cx="500" cy="400" rx="80" ry="60" fill="currentColor" />
            <path d="M 600 300 Q 650 290 680 310 L 700 350 Q 680 370 660 360 L 630 380 Q 610 360 600 340 Z" fill="currentColor" />
            <path d="M 200 500 Q 250 490 280 510 L 300 560 Q 280 580 260 570 L 230 590 Q 210 570 200 550 Z" fill="currentColor" />
            <ellipse cx="450" cy="600" rx="70" ry="50" fill="currentColor" />
          </g>

          {/* Route/path lines */}
          <g className="text-primary" opacity="0.2" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="5,5">
            <path d="M 150 250 Q 300 200 450 300" />
            <path d="M 450 300 Q 550 350 600 330" />
            <path d="M 300 200 Q 400 250 500 200" />
          </g>
        </svg>

        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-background/75" />

        {/* Animated location pins with glow effect */}
        <div className="absolute top-1/4 left-1/3 animate-pulse">
          <div className="relative">
            <div className="absolute inset-0 bg-primary rounded-full blur-xl opacity-60 scale-150" />
            <MapPin className="w-7 h-7 text-primary relative z-10 drop-shadow-lg" fill="currentColor" />
          </div>
        </div>
        <div className="absolute top-2/3 left-2/3 animate-pulse" style={{ animationDelay: '1s' }}>
          <div className="relative">
            <div className="absolute inset-0 bg-primary rounded-full blur-lg opacity-40 scale-150" />
            <MapPin className="w-6 h-6 text-primary opacity-70 relative z-10 drop-shadow-lg" fill="currentColor" />
          </div>
        </div>
        <div className="absolute top-1/2 left-1/4 animate-pulse" style={{ animationDelay: '0.5s' }}>
          <div className="relative">
            <div className="absolute inset-0 bg-primary rounded-full blur-lg opacity-30 scale-150" />
            <MapPin className="w-5 h-5 text-primary opacity-50 relative z-10 drop-shadow-lg" fill="currentColor" />
          </div>
        </div>

        {/* Connecting lines between pins */}
        <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }}>
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0" className="text-primary" />
              <stop offset="50%" stopColor="currentColor" stopOpacity="0.3" className="text-primary" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" className="text-primary" />
            </linearGradient>
          </defs>
          <line x1="33%" y1="25%" x2="25%" y2="50%" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="8,4">
            <animate attributeName="stroke-dashoffset" from="0" to="24" dur="2s" repeatCount="indefinite" />
          </line>
          <line x1="33%" y1="25%" x2="66%" y2="66%" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="8,4">
            <animate attributeName="stroke-dashoffset" from="0" to="24" dur="2s" repeatCount="indefinite" />
          </line>
          <line x1="25%" y1="50%" x2="66%" y2="66%" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="8,4">
            <animate attributeName="stroke-dashoffset" from="0" to="24" dur="2.5s" repeatCount="indefinite" />
          </line>
        </svg>

        {/* Content overlay */}
        <div className="relative z-10 flex flex-col justify-center px-12 py-12">
          <div className="space-y-6">
            {/* Logo/Brand section */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-primary rounded-full blur-xl opacity-40 scale-150" />
                <Globe className="w-12 h-12 text-primary relative z-10 drop-shadow-lg" />
                <Navigation className="w-5 h-5 text-primary absolute -bottom-1 -right-1 z-10 drop-shadow-lg" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">GeoIP Tracker</h1>
                <p className="text-sm text-muted-foreground">Location Intelligence Platform</p>
              </div>
            </div>

            {/* Feature highlights */}
            <div className="space-y-4 pt-8">
              <div className="flex items-start gap-3 bg-card/80 backdrop-blur-md p-4 rounded-lg border shadow-sm transition-all hover:shadow-md hover:bg-card/90">
                <div className="mt-1 p-2 rounded-md bg-primary/10 ring-1 ring-primary/20">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Precise Geolocation</h3>
                  <p className="text-sm text-muted-foreground">Track IP addresses with accuracy down to city-level coordinates</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-card/80 backdrop-blur-md p-4 rounded-lg border shadow-sm transition-all hover:shadow-md hover:bg-card/90">
                <div className="mt-1 p-2 rounded-md bg-primary/10 ring-1 ring-primary/20">
                  <Globe className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Global Coverage</h3>
                  <p className="text-sm text-muted-foreground">Access location data from IP addresses worldwide</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-card/80 backdrop-blur-md p-4 rounded-lg border shadow-sm transition-all hover:shadow-md hover:bg-card/90">
                <div className="mt-1 p-2 rounded-md bg-primary/10 ring-1 ring-primary/20">
                  <Navigation className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Interactive Maps</h3>
                  <p className="text-sm text-muted-foreground">Visualize locations on detailed, interactive map interfaces</p>
                </div>
              </div>
            </div>

            {/* Coordinates decoration with background */}
            <div className="pt-8 space-y-2 text-xs font-mono bg-card/80 backdrop-blur-md p-4 rounded-lg border shadow-sm">
              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="opacity-60 min-w-[4rem]">LAT:</span>
                <span className="font-semibold">14.6760° N</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="opacity-60 min-w-[4rem]">LON:</span>
                <span className="font-semibold">121.0437° E</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="opacity-60 min-w-[4rem]">ALT:</span>
                <span className="font-semibold">16m</span>
              </div>
              <div className="flex items-center gap-3 pt-2 border-t text-muted-foreground">
                <span className="opacity-60 min-w-[4rem]">REGION:</span>
                <span className="font-semibold">Central Luzon, PH</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Auth form */}
      <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-md">
          {/* Mobile branding header */}
          <div className="lg:hidden mb-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Globe className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold tracking-tight">GeoIP Tracker</h1>
            </div>
            <p className="text-sm text-muted-foreground">Location Intelligence Platform</p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;