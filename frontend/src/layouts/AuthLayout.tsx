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
        {/* Coordinate grid background */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Coordinate lines */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 right-0 h-px bg-border opacity-50" />
          <div className="absolute top-1/2 left-0 right-0 h-px bg-border opacity-50" />
          <div className="absolute top-3/4 left-0 right-0 h-px bg-border opacity-50" />
          <div className="absolute left-1/4 top-0 bottom-0 w-px bg-border opacity-50" />
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border opacity-50" />
          <div className="absolute left-3/4 top-0 bottom-0 w-px bg-border opacity-50" />
        </div>

        {/* Animated location pins */}
        <div className="absolute top-1/4 left-1/3 animate-pulse">
          <MapPin className="w-6 h-6 text-primary" />
        </div>
        <div className="absolute top-2/3 left-2/3 animate-pulse delay-1000">
          <MapPin className="w-5 h-5 text-primary opacity-60" />
        </div>
        <div className="absolute top-1/2 left-1/4 animate-pulse delay-500">
          <MapPin className="w-4 h-4 text-primary opacity-40" />
        </div>

        {/* Content overlay */}
        <div className="relative z-10 flex flex-col justify-center px-12 py-12">
          <div className="space-y-6">
            {/* Logo/Brand section */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <Globe className="w-12 h-12 text-primary" />
                <Navigation className="w-5 h-5 text-primary absolute -bottom-1 -right-1" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">GeoIP Tracker</h1>
                <p className="text-sm text-muted-foreground">Location Intelligence Platform</p>
              </div>
            </div>

            {/* Feature highlights */}
            <div className="space-y-4 pt-8">
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 rounded-md bg-primary/10">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Precise Geolocation</h3>
                  <p className="text-sm text-muted-foreground">Track IP addresses with accuracy down to city-level coordinates</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 rounded-md bg-primary/10">
                  <Globe className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Global Coverage</h3>
                  <p className="text-sm text-muted-foreground">Access location data from IP addresses worldwide</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 rounded-md bg-primary/10">
                  <Navigation className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Interactive Maps</h3>
                  <p className="text-sm text-muted-foreground">Visualize locations on detailed, interactive map interfaces</p>
                </div>
              </div>
            </div>

            {/* Coordinates decoration */}
            <div className="pt-8 space-y-2 text-xs font-mono text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="opacity-50">LAT:</span>
                <span>14.6760° N</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="opacity-50">LON:</span>
                <span>121.0437° E</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="opacity-50">ALT:</span>
                <span>16m</span>
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