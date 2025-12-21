import React from 'react';
import { Plus, BookmarkPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CurrentIPCard from '@/components/cards/CurrentIPCard';
import type { IPGeoData } from '@/store/ipgeoStore';


const fakeData: IPGeoData = {
  ip: '8.8.8.8',
  success: true,
  type: 'IPv4',
  continent: 'North America',
  continent_code: 'NA',
  country: 'United States',
  country_code: 'US',
  region: 'California',
  region_code: 'CA',
  city: 'Mountain View',
  latitude: 37.386,
  longitude: -122.0838,
  is_eu: false,
  postal: '94035',
  calling_code: '1',
  capital: 'Washington D.C.',
  borders: '',
  flag: {
    img: '',
    emoji: '🇺🇸',
    emoji_unicode: 'U+1F1FA U+1F1F8',
  },
  connection: {
    asn: 15169,
    org: 'Google LLC',
    isp: 'Google LLC',
    domain: 'google.com',
  },
  timezone: {
    id: 'America/Los_Angeles',
    abbr: 'PST',
    is_dst: false,
    offset: -8,
    utc: '-08:00',
    current_time: '2025-12-21T12:00:00-08:00',
  },
  description: 'Test IP for Google',
};

function Home() {
  const [isAddIPModalOpen, setIsAddIPModalOpen] = React.useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-6 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Home</h1>
          <p className="text-muted-foreground mt-1">
            View your current IP address and geolocation details
          </p>
        </div>
        <Button 
          onClick={() => setIsAddIPModalOpen(true)}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Saved IP
        </Button>
      </div>

      {/* Content Area */}
      <CurrentIPCard data={fakeData} />
    </div>
  );
}

export default Home;