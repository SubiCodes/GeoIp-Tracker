import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CurrentIPCard from '@/components/cards/CurrentIPCard';
import AddedIPCard from '@/components/cards/AddedIPCard';
import { useIPGeoStore } from '@/store/ipgeoStore';
import ErrorWithRetryCard from '@/components/cards/ErrorWithRetryCard';
import { MoonLoader } from 'react-spinners';

export const fakeIpGeoData = [
  // Current IP (distinct, eye-catching)
  {
    _id: "6512cfa4a7b2f5001a2b3456",
    ip: "203.0.113.42",
    success: true,
    type: "IPv4",
    continent: "Asia",
    continent_code: "AS",
    country: "Philippines",
    country_code: "PH",
    region: "Metro Manila",
    region_code: "MM",
    city: "Quezon City",
    latitude: 14.6760,
    longitude: 121.0437,
    is_eu: false,
    postal: "1100",
    calling_code: "63",
    capital: "Manila",
    borders: "",
    flag: {
      img: "https://cdn.ipwhois.io/flags/ph.svg",
      emoji: "🇵🇭",
      emoji_unicode: "U+1F1F5 U+1F1ED"
    },
    connection: {
      asn: 4788,
      org: "Globe Telecom Inc.",
      isp: "Globe Telecom",
      domain: "globe.com.ph"
    },
    timezone: {
      id: "Asia/Manila",
      abbr: "PHT",
      is_dst: false,
      offset: 8,
      utc: "+08:00",
      current_time: "2025-12-21T18:30:00+08:00"
    },
    description: "Current IP of the user",
    user: "64a1f5c123abc456def78901",
    createdAt: "2025-12-21T18:00:00.000Z",
    updatedAt: "2025-12-21T18:00:00.000Z"
  },

  // Added IP (previously added by user)
  {
    _id: "6512cfa4a7b2f5001a2b3457",
    ip: "81.2.69.142",
    success: true,
    type: "IPv4",
    continent: "Europe",
    continent_code: "EU",
    country: "United Kingdom",
    country_code: "GB",
    region: "England",
    region_code: "ENG",
    city: "Bracknell",
    latitude: 51.41604,
    longitude: -0.75398,
    is_eu: false,
    postal: "RG12 1EH",
    calling_code: "44",
    capital: "London",
    borders: "IE",
    flag: {
      img: "https://cdn.ipwhois.io/flags/gb.svg",
      emoji: "🇬🇧",
      emoji_unicode: "U+1F1EC U+1F1E7"
    },
    connection: {
      asn: 20712,
      org: "None Specified",
      isp: "Andrews Arnold LTD",
      domain: "aa.net.uk"
    },
    timezone: {
      id: "Europe/London",
      abbr: "GMT",
      is_dst: false,
      offset: 0,
      utc: "+00:00",
      current_time: "2025-12-21T10:51:38+00:00"
    },
    description: "Previously added IP",
    user: "64a1f5c123abc456def78901",
    createdAt: "2025-12-20T12:30:00.000Z",
    updatedAt: "2025-12-20T12:30:00.000Z"
  }
];

function Home() {
  const [isAddIPModalOpen, setIsAddIPModalOpen] = React.useState(false);
  
  const currentIPGeo = useIPGeoStore((state) => state.currentIPGeo);
  const fetchingCurrentIPGeo = useIPGeoStore((state) => state.fetchingCurrentIPGeo);
  const fetchCurrentIPGeo = useIPGeoStore((state) => state.fetchCurrentIPGeo);
  const fetcingCurrentIPGeoError = useIPGeoStore((state) => state.fetcingCurrentIPGeoError);

  const ipGeoDatas = useIPGeoStore((state) => state.ipGeoDatas);
  const fetchingIPGeoDatas = useIPGeoStore((state) => state.fetchingIPGeoDatas);
  const fetchIPGeoDatas = useIPGeoStore((state) => state.fetchIPGeoDatas);
  const fetcingIPGeoDatasError = useIPGeoStore((state) => state.fetcingIPGeoDatasError);

  React.useEffect(() => {
    fetchCurrentIPGeo();
  }, []);

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
      {fetchingCurrentIPGeo ? (
        <div className="flex justify-center items-center min-h-75">
          <MoonLoader size={40} color="#6366f1" />
        </div>
      ) : fetcingCurrentIPGeoError ? (
        <ErrorWithRetryCard error={fetcingCurrentIPGeoError} onRetry={fetchCurrentIPGeo} />
      ) : currentIPGeo ? (
        <CurrentIPCard data={currentIPGeo} />
      ) : (
        <div className="text-center text-muted-foreground">No IP geolocation data available.</div>
      )}

      {/* Saved IP Addresses */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Saved IP Addresses</h2>
        <div className="flex flex-col gap-2">
          {fakeIpGeoData.map((ip, idx) => (
            <AddedIPCard key={ip.ip + idx} data={ip} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;