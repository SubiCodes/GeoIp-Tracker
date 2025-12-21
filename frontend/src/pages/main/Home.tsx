import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CurrentIPCard from '@/components/cards/CurrentIPCard';
import AddedIPCard from '@/components/cards/AddedIPCard';
import { useIPGeoStore } from '@/store/ipgeoStore';
import ErrorWithRetryCard from '@/components/cards/ErrorWithRetryCard';
import { MoonLoader } from 'react-spinners';
import AddSaveIPDialog from '@/components/dialogs/AddSaveIPDialog';
import DeleteIPDialog from '@/components/dialogs/DeleteIPDialog';

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

  const [mountedForDeletion, setMountedForDeletion] = React.useState<string | null>(null);

  const refetchCurrentIPGeo = async () => {
    if (!currentIPGeo) {
      await fetchCurrentIPGeo();
    }
  }

  React.useEffect(() => {
    fetchCurrentIPGeo();
    fetchIPGeoDatas();
  }, []);

  React.useEffect(() => {
    refetchCurrentIPGeo();
  }, [currentIPGeo]);

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
        {fetchingIPGeoDatas ? (
          <div className="flex justify-center items-center min-h-40">
            <MoonLoader size={32} color="#6366f1" />
          </div>
        ) : fetcingIPGeoDatasError ? (
          <ErrorWithRetryCard error={fetcingIPGeoDatasError} onRetry={fetchIPGeoDatas} />
        ) : ipGeoDatas && ipGeoDatas.length > 0 ? (
          <div className="flex flex-col gap-2">
            {ipGeoDatas.map((ip, idx) => (
              <AddedIPCard key={ip.ip + idx} data={ip} onDelete={() => setMountedForDeletion(ip?._id ??  null)}/>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground">No saved IP addresses found.</div>
        )}
      </div>
      <AddSaveIPDialog open={isAddIPModalOpen} onOpenChange={setIsAddIPModalOpen}/>
      <DeleteIPDialog open={mountedForDeletion !== null} setIpToNull={() => setMountedForDeletion(null)} ipId={mountedForDeletion ?? ""}/>
    </div>
  );
}

export default Home;