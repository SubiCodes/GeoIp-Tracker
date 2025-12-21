import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CurrentIPCard from '@/components/cards/CurrentIPCard';
import { useIPGeoStore } from '@/store/ipgeoStore';
import ErrorWithRetryCard from '@/components/cards/ErrorWithRetryCard';
import { MoonLoader } from 'react-spinners';

function Home() {
  const [isAddIPModalOpen, setIsAddIPModalOpen] = React.useState(false);
  
  const currentIPGeo = useIPGeoStore((state) => state.currentIPGeo);
  const fetchingCurrentIPGeo = useIPGeoStore((state) => state.fetchingCurrentIPGeo);
  const fetchCurrentIPGeo = useIPGeoStore((state) => state.fetchCurrentIPGeo);
  const fetcingCurrentIPGeoError = useIPGeoStore((state) => state.fetcingCurrentIPGeoError);

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
        <div className="flex justify-center items-center min-h-[300px]">
          <MoonLoader size={40} color="#6366f1" />
        </div>
      ) : fetcingCurrentIPGeoError ? (
        <ErrorWithRetryCard error={fetcingCurrentIPGeoError} onRetry={fetchCurrentIPGeo} />
      ) : currentIPGeo ? (
        <CurrentIPCard data={currentIPGeo} />
      ) : (
        <div className="text-center text-muted-foreground">No IP geolocation data available.</div>
      )}
    </div>
  );
}

export default Home;