/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Search, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CurrentIPCard from '@/components/cards/CurrentIPCard';
import { useIPGeoStore } from '@/store/ipgeoStore';
import ErrorWithRetryCard from '@/components/cards/ErrorWithRetryCard';
import { MoonLoader } from 'react-spinners';
import { useIPHistoryStore } from '@/store/ipHistoryStore';
import SearchDialog from '@/components/dialogs/SearchDialog';
import IPHistoryDialog from '@/components/dialogs/IPHistoryDialog';

function Home() {
  const displayedIPGeoData = useIPGeoStore((state) => state.displayedIPGeoData);
  const displayingIPGeoData = useIPGeoStore((state) => state.displayingIPGeoData);
  const displayingIPGeoDataError = useIPGeoStore((state) => state.displayingIPGeoDataError);
  const displayIPGeoData = useIPGeoStore((state) => state.displayIPGeoData);

  const ipHistory = useIPHistoryStore((state) => state.ipHistory);
  const fetchIPHistory = useIPHistoryStore((state) => state.fetchIPHistory);

  const fetchCurrentIPGEO = async () => {
    await fetchIPHistory();
    const freshHistory = useIPHistoryStore.getState().ipHistory;
    const currentIP = freshHistory.length > 0 ? freshHistory[0].ip : undefined;
    await displayIPGeoData(currentIP);
  };


  React.useEffect(() => {
    fetchCurrentIPGEO();
  }, [ipHistory.length]);

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
        <div className='flex-1 flex items-center gap-2 justify-end'>
          <SearchDialog triggerButton={
            <Button
              className="gap-2 hover:bg-primary hover:text-primary-foreground cursor-pointer"
              variant={'outline'}
            >
              <Search className="h-4 w-4" />
              Search IP
            </Button>
          } />
          <IPHistoryDialog triggerButton={
            <Button
              className="gap-2 hover:bg-primary hover:text-primary-foreground cursor-pointer"
              variant={'outline'}
            >
              <History className="h-4 w-4" />
              History
            </Button>
          } />
        </div>
      </div>

      {/* Content Area */}
      {displayingIPGeoData ? (
        <div className="flex justify-center items-center min-h-75">
          <MoonLoader size={40} color="#6366f1" />
        </div>
      ) : displayingIPGeoDataError ? (
        <ErrorWithRetryCard error={displayingIPGeoDataError} onRetry={displayIPGeoData} />
      ) : displayedIPGeoData ? (
        <CurrentIPCard data={displayedIPGeoData} />
      ) : (
        <div className="text-center text-muted-foreground">No IP geolocation data available.</div>
      )}

    </div>
  );
}

export default Home;