"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import {
  Search,
  Filter,
  Layers,
  MapPin,
  Fish,
  Waves,
  AlertTriangle,
  Eye,
  Camera,
  Anchor,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Info,
  X,
} from "lucide-react";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Mock data for marine observation points
const observationPoints = [
  {
    id: 1,
    name: "Great Barrier Reef Station",
    coordinates: [145.7731, -16.9186],
    type: "research",
    species: 342,
    status: "active",
  },
  {
    id: 2,
    name: "Coral Triangle Observatory",
    coordinates: [125.5, 1.5],
    type: "conservation",
    species: 567,
    status: "active",
  },
  {
    id: 3,
    name: "Galapagos Marine Reserve",
    coordinates: [-90.3, -0.9],
    type: "reserve",
    species: 298,
    status: "active",
  },
  {
    id: 4,
    name: "Mediterranean Blue Initiative",
    coordinates: [15.0, 37.0],
    type: "research",
    species: 156,
    status: "active",
  },
  {
    id: 5,
    name: "Caribbean Reef Watch",
    coordinates: [-64.8, 18.3],
    type: "monitoring",
    species: 234,
    status: "active",
  },
  {
    id: 6,
    name: "Red Sea Coral Project",
    coordinates: [38.5, 22.0],
    type: "conservation",
    species: 189,
    status: "active",
  },
  {
    id: 7,
    name: "Monterey Bay Station",
    coordinates: [-121.9, 36.6],
    type: "research",
    species: 412,
    status: "active",
  },
  {
    id: 8,
    name: "Great White Shark Tracking",
    coordinates: [18.4, -33.9],
    type: "tracking",
    species: 45,
    status: "active",
  },
  {
    id: 9,
    name: "Maldives Manta Project",
    coordinates: [73.5, 3.2],
    type: "conservation",
    species: 78,
    status: "active",
  },
  {
    id: 10,
    name: "Palau Marine Sanctuary",
    coordinates: [134.5, 7.5],
    type: "reserve",
    species: 456,
    status: "active",
  },
  {
    id: 11,
    name: "Norwegian Fjord Study",
    coordinates: [7.0, 60.5],
    type: "research",
    species: 123,
    status: "active",
  },
  {
    id: 12,
    name: "Antarctic Krill Monitoring",
    coordinates: [-60.0, -64.0],
    type: "monitoring",
    species: 67,
    status: "active",
  },
];

// Mock species sightings
const recentSightings = [
  {
    id: 1,
    species: "Blue Whale",
    location: "Monterey Bay",
    coordinates: [-122.0, 36.8],
    time: "2 hours ago",
    verified: true,
  },
  {
    id: 2,
    species: "Whale Shark",
    location: "Coral Triangle",
    coordinates: [126.0, 2.0],
    time: "5 hours ago",
    verified: true,
  },
  {
    id: 3,
    species: "Manta Ray",
    location: "Maldives",
    coordinates: [73.8, 3.5],
    time: "8 hours ago",
    verified: false,
  },
  {
    id: 4,
    species: "Hawksbill Turtle",
    location: "Caribbean",
    coordinates: [-65.0, 18.5],
    time: "12 hours ago",
    verified: true,
  },
  {
    id: 5,
    species: "Hammerhead Shark",
    location: "Galapagos",
    coordinates: [-89.5, -1.0],
    time: "1 day ago",
    verified: true,
  },
];

// Marine protected areas
const protectedAreas = [
  {
    id: 1,
    name: "Papah\u0101naumoku\u0101kea",
    coordinates: [-175.0, 25.0],
    size: "1,510,000 km\u00b2",
    established: 2006,
  },
  {
    id: 2,
    name: "Ross Sea Region MPA",
    coordinates: [175.0, -77.0],
    size: "1,550,000 km\u00b2",
    established: 2017,
  },
  {
    id: 3,
    name: "Phoenix Islands Protected Area",
    coordinates: [-171.0, -3.0],
    size: "408,250 km\u00b2",
    established: 2008,
  },
];

const markerColors: Record<string, string> = {
  research: "#0ea5e9",
  conservation: "#22c55e",
  reserve: "#8b5cf6",
  monitoring: "#f59e0b",
  tracking: "#ef4444",
};

export default function MapPage() {
  const [position, setPosition] = useState({
    coordinates: [0, 20] as [number, number],
    zoom: 1.5,
  });
  const [selectedPoint, setSelectedPoint] = useState<
    (typeof observationPoints)[0] | null
  >(null);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("stations");
  const [filters, setFilters] = useState({
    research: true,
    conservation: true,
    reserve: true,
    monitoring: true,
    tracking: true,
  });
  const [yearRange, setYearRange] = useState([2000, 2024]);

  const handleZoomIn = () => {
    if (position.zoom >= 8) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 1.5 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 1.5 }));
  };

  const handleReset = () => {
    setPosition({ coordinates: [0, 20], zoom: 1.5 });
  };

  const handleMoveEnd = (position: {
    coordinates: [number, number];
    zoom: number;
  }) => {
    setPosition(position);
  };

  const filteredPoints = observationPoints.filter(
    (point) =>
      filters[point.type as keyof typeof filters] &&
      (searchQuery === "" ||
        point.name.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1 flex flex-col">
        {/* Map Header */}
        <div className="border-b bg-card">
          <div className="w-full mx-auto px-4 py-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Interactive Ocean Map
                </h1>
                <p className="text-muted-foreground">
                  Explore marine research stations, protected areas, and species
                  sightings worldwide
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative flex-1 lg:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search locations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>

                <Sheet open={showFilters} onOpenChange={setShowFilters}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Map Filters</SheetTitle>
                      <SheetDescription>
                        Customize what appears on the map
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-6 space-y-6">
                      <div className="space-y-4">
                        <h3 className="font-medium text-foreground">
                          Station Types
                        </h3>
                        {Object.entries(filters).map(([key, value]) => (
                          <div key={key} className="flex items-center gap-3">
                            <Checkbox
                              id={key}
                              checked={value}
                              onCheckedChange={(checked) =>
                                setFilters((f) => ({ ...f, [key]: checked }))
                              }
                            />
                            <Label
                              htmlFor={key}
                              className="flex items-center gap-2 capitalize"
                            >
                              <span
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: markerColors[key] }}
                              />
                              {key}
                            </Label>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-medium text-foreground">
                          Established Year
                        </h3>
                        <Slider
                          value={yearRange}
                          onValueChange={setYearRange}
                          min={1970}
                          max={2024}
                          step={1}
                        />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>{yearRange[0]}</span>
                          <span>{yearRange[1]}</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-medium text-foreground">
                          Data Layers
                        </h3>
                        <Select defaultValue="all">
                          <SelectTrigger>
                            <SelectValue placeholder="Select layer" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Layers</SelectItem>
                            <SelectItem value="temperature">
                              Sea Temperature
                            </SelectItem>
                            <SelectItem value="salinity">Salinity</SelectItem>
                            <SelectItem value="biodiversity">
                              Biodiversity Index
                            </SelectItem>
                            <SelectItem value="pollution">
                              Pollution Levels
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>

                <Button variant="outline" size="icon">
                  <Layers className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="flex-1 flex relative">
          {/* Sidebar */}
          <div className="w-80 border-r bg-card hidden lg:block overflow-y-auto">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="w-full rounded-none border-b">
                <TabsTrigger value="stations" className="flex-1">
                  Stations
                </TabsTrigger>
                <TabsTrigger value="sightings" className="flex-1">
                  Sightings
                </TabsTrigger>
                <TabsTrigger value="protected" className="flex-1">
                  Protected
                </TabsTrigger>
              </TabsList>

              <TabsContent value="stations" className="m-0 p-4 space-y-3">
                {filteredPoints.map((point) => (
                  <Card
                    key={point.id}
                    className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                      selectedPoint?.id === point.id
                        ? "ring-2 ring-primary"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedPoint(point);
                      setPosition({
                        coordinates: point.coordinates as [number, number],
                        zoom: 4,
                      });
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm text-foreground truncate">
                            {point.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              variant="secondary"
                              className="text-xs"
                              style={{
                                backgroundColor: `${markerColors[point.type]}20`,
                                color: markerColors[point.type],
                              }}
                            >
                              {point.type}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {point.species} species
                            </span>
                          </div>
                        </div>
                        <MapPin
                          className="h-4 w-4 shrink-0"
                          style={{ color: markerColors[point.type] }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="sightings" className="m-0 p-4 space-y-3">
                {recentSightings.map((sighting) => (
                  <Card
                    key={sighting.id}
                    className="cursor-pointer hover:bg-muted/50"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Fish className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-sm text-foreground">
                              {sighting.species}
                            </h3>
                            {sighting.verified && (
                              <Badge
                                variant="secondary"
                                className="text-xs bg-secondary/20 text-secondary"
                              >
                                Verified
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {sighting.location}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {sighting.time}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="protected" className="m-0 p-4 space-y-3">
                {protectedAreas.map((area) => (
                  <Card
                    key={area.id}
                    className="cursor-pointer hover:bg-muted/50"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                          <Waves className="h-5 w-5 text-accent" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-sm text-foreground">
                            {area.name}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Size: {area.size}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Established: {area.established}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Map */}
          <div className="flex-1 relative bg-[#0c4a6e]/10">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 120,
              }}
              style={{ width: "100%", height: "100%" }}
            >
              <ZoomableGroup
                zoom={position.zoom}
                center={position.coordinates}
                onMoveEnd={handleMoveEnd}
              >
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="#1e3a5f"
                        stroke="#2d4a6f"
                        strokeWidth={0.5}
                        style={{
                          default: { outline: "none" },
                          hover: { fill: "#2d4a6f", outline: "none" },
                          pressed: { outline: "none" },
                        }}
                      />
                    ))
                  }
                </Geographies>

                {/* Observation markers */}
                {filteredPoints.map((point) => (
                  <Marker
                    key={point.id}
                    coordinates={point.coordinates as [number, number]}
                    onClick={() => setSelectedPoint(point)}
                  >
                    <circle
                      r={6 / position.zoom}
                      fill={markerColors[point.type]}
                      stroke="#fff"
                      strokeWidth={1.5 / position.zoom}
                      className="cursor-pointer"
                      style={{
                        filter:
                          selectedPoint?.id === point.id
                            ? "drop-shadow(0 0 6px rgba(255,255,255,0.8))"
                            : "none",
                      }}
                    />
                  </Marker>
                ))}

                {/* Sighting markers */}
                {activeTab === "sightings" &&
                  recentSightings.map((sighting) => (
                    <Marker
                      key={`sighting-${sighting.id}`}
                      coordinates={sighting.coordinates as [number, number]}
                    >
                      <circle
                        r={4 / position.zoom}
                        fill="#f59e0b"
                        stroke="#fff"
                        strokeWidth={1 / position.zoom}
                        className="cursor-pointer animate-pulse"
                      />
                    </Marker>
                  ))}
              </ZoomableGroup>
            </ComposableMap>

            {/* Map Controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <Button
                variant="secondary"
                size="icon"
                onClick={handleZoomIn}
                className="bg-card/90 backdrop-blur-sm"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                onClick={handleZoomOut}
                className="bg-card/90 backdrop-blur-sm"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                onClick={handleReset}
                className="bg-card/90 backdrop-blur-sm"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
              <h3 className="text-sm font-medium text-foreground mb-3">
                Legend
              </h3>
              <div className="space-y-2">
                {Object.entries(markerColors).map(([type, color]) => (
                  <div key={type} className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-xs text-muted-foreground capitalize">
                      {type}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Point Info */}
            {selectedPoint && (
              <div className="absolute bottom-4 right-4 w-72 bg-card/95 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {selectedPoint.name}
                      </h3>
                      <Badge
                        variant="secondary"
                        className="mt-1"
                        style={{
                          backgroundColor: `${markerColors[selectedPoint.type]}20`,
                          color: markerColors[selectedPoint.type],
                        }}
                      >
                        {selectedPoint.type}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => setSelectedPoint(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Fish className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Species</p>
                        <p className="text-sm font-medium text-foreground">
                          {selectedPoint.species}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Status</p>
                        <p className="text-sm font-medium text-foreground capitalize">
                          {selectedPoint.status}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button size="sm" className="flex-1">
                      View Details
                    </Button>
                    <Button size="sm" variant="outline">
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
