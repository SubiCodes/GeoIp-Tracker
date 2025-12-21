import React from 'react';
import { MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { IPGeoData } from '@/store/ipgeoStore';


interface AddedIPCardProps {
  data: IPGeoData;
  onDelete?: () => void;
}

const AddedIPCard: React.FC<AddedIPCardProps> = ({ data, onDelete }) => {
  const position: [number, number] = [data.latitude, data.longitude];

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="text-2xl drop-shadow">{data.flag?.emoji}</span>
              {data.city}, {data.country}
            </CardTitle>
            <CardDescription className="mt-1 flex items-center gap-2">
              <span className="font-mono bg-primary/10 px-2 py-0.5 rounded">{data.ip}</span>
              <Badge variant="outline" className="ml-2 text-xs border-primary text-primary bg-primary/10">{data.type}</Badge>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick Info */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-muted-foreground">Region</p>
            <p className="font-medium">{data.region}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Timezone</p>
            <p className="font-medium">{data.timezone?.abbr || 'N/A'}</p>
          </div>
          <div>
            <p className="text-muted-foreground">ISP</p>
            <p className="font-medium truncate">{data.connection?.isp || 'N/A'}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Coordinates</p>
            <p className="font-mono text-xs">{data.latitude.toFixed(2)}, {data.longitude.toFixed(2)}</p>
          </div>
        </div>

        {/* Optional Description */}
        {data.description && (
          <div className="pt-2 border-t">
            <p className="text-sm text-muted-foreground">{data.description}</p>
          </div>
        )}

        {/* Accordion for Map */}
        <Accordion type="single" collapsible className="border-t pt-2">
          <AccordionItem value="map" className="border-0">
            <AccordionTrigger className="text-sm py-2 hover:no-underline text-primary">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                View on Map
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="w-full h-48 rounded-lg overflow-hidden border mt-2 border-primary/20">
                <MapContainer
                  center={position}
                  zoom={12}
                  zoomControl={false}
                  dragging={false}
                  scrollWheelZoom={false}
                  doubleClickZoom={false}
                  style={{ height: '100%', width: '100%' }}
                  attributionControl={false}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={position}>
                    <Popup>{`${data.city}, ${data.region}, ${data.country}`}</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default AddedIPCard;