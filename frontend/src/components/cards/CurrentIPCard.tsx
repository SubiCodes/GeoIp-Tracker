import React from 'react';
import { MapPin, Globe, Wifi, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { IPGeoData } from '@/store/ipgeoStore';

interface CurrentIPCardProps {
    data: IPGeoData;
};


const CurrentIPCard: React.FC<CurrentIPCardProps> = ({ data }) => {
    const position: [number, number] = [data.latitude, data.longitude];

    return (
        <Card className="border-2 border-primary shadow-lg">
            <CardHeader className="bg-primary/5">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-2xl flex items-center gap-2">
                            <MapPin className="h-6 w-6 text-primary" />
                            Your Current Location
                        </CardTitle>
                        <CardDescription className="text-base mt-2">
                            IP Address: <span className="font-mono font-bold text-foreground">{data.ip}</span>
                        </CardDescription>
                    </div>
                    <div className="text-4xl">{data.flag?.emoji}</div>
                </div>
            </CardHeader>

            <CardContent className="pt-6 space-y-6">
                {/* Map */}
                <div className="w-full h-80 rounded-lg overflow-hidden border-2 border-primary/20">
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

                {/* Location Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <Globe className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Location</p>
                                <p className="font-semibold">{data.city}, {data.region}</p>
                                <p className="text-sm text-muted-foreground">{data.country} {data.flag?.emoji}</p>
                                {data.postal && <p className="text-sm text-muted-foreground">Postal: {data.postal}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <Clock className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Timezone</p>
                                <p className="font-semibold">{data.timezone?.id}</p>
                                <p className="text-sm text-muted-foreground">UTC {data.timezone?.utc}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <Wifi className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Connection</p>
                                <p className="font-semibold">{data.connection?.isp || 'N/A'}</p>
                                {data.connection?.org && (
                                    <p className="text-sm text-muted-foreground">{data.connection.org}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Coordinates</p>
                                <p className="font-mono text-sm">{data.latitude.toFixed(5)}, {data.longitude.toFixed(5)}</p>
                                <Badge variant="outline" className="mt-1">{data.type}</Badge>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default CurrentIPCard;