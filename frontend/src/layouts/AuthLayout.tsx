/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapPin, Globe, Navigation } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  // Coordinates for Balanga, Central Luzon, Philippines
  const position: [number, number] = [14.6760, 121.0437];

  return (
    <div className="min-h-screen flex bg-background relative">
      {/* Mobile Background Map - Full screen behind content */}
      <div className="lg:hidden absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-90">
          <MapContainer
            center={position}
            zoom={11}
            zoomControl={false}
            dragging={false}
            scrollWheelZoom={false}
            doubleClickZoom={false}
            style={{ height: '100%', width: '100%', filter: 'saturate(0.5)' }}
            attributionControl={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          </MapContainer>
        </div>
        <div className="absolute inset-0 from-background/95 via-background/90 to-background/95" />
      </div>

      {/* Left Panel - Map themed branding section (Desktop) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-muted/30 border-r">
        {/* React Leaflet Map Background */}
        <div className="absolute inset-0 opacity-70">
          <MapContainer
            center={position}
            zoom={12}
            zoomControl={false}
            dragging={false}
            scrollWheelZoom={false}
            doubleClickZoom={false}
            style={{ height: '100%', width: '100%', filter: 'saturate(0.7)' }}
            attributionControl={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
              <Popup>Balanga, Central Luzon, Philippines</Popup>
            </Marker>
          </MapContainer>
        </div>

        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/50" />

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
              <stop offset="0%" stopColor="currentColor" stopOpacity="0" className="text-primary"/>
              <stop offset="50%" stopColor="currentColor" stopOpacity="0.3" className="text-primary"/>
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" className="text-primary"/>
            </linearGradient>
          </defs>
          <line x1="33%" y1="25%" x2="25%" y2="50%" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="8,4">
            <animate attributeName="stroke-dashoffset" from="0" to="24" dur="2s" repeatCount="indefinite"/>
          </line>
          <line x1="33%" y1="25%" x2="66%" y2="66%" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="8,4">
            <animate attributeName="stroke-dashoffset" from="0" to="24" dur="2s" repeatCount="indefinite"/>
          </line>
          <line x1="25%" y1="50%" x2="66%" y2="66%" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="8,4">
            <animate attributeName="stroke-dashoffset" from="0" to="24" dur="2.5s" repeatCount="indefinite"/>
          </line>
        </svg>

        {/* Content overlay */}
        <div className="relative z-1 flex flex-col justify-center px-12 py-12">
          <div className="space-y-6">
            {/* Logo/Brand section */}
            <div className="flex items-center gap-3 bg-white md:bg-transparent bg-opacity-20 md:bg-opacity-0 px-4 py-2 rounded-md w-max">
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
      <div className="flex-1 flex items-center justify-center p-4 lg:p-8 relative z-10">
        <div className="w-full max-w-md">
          {/* Mobile branding header */}
          <div className="lg:hidden mb-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="relative">
                <div className="absolute inset-0 bg-primary rounded-full blur-xl opacity-40 scale-150" />
                <Globe className="w-8 h-8 text-primary relative z-10 drop-shadow-lg" />
              </div>
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