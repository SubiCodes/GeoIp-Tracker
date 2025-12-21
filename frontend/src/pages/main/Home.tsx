import React from 'react';
import { Plus, BookmarkPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
      <div className="border rounded-lg p-6 bg-card">
        <p className="text-muted-foreground">Content goes here...</p>
      </div>
    </div>
  );
}

export default Home;