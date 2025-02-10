import React, { useEffect, useRef, useState } from "react";
import SearchIcon from "@/app/icons/UserIcon.svg?url";

interface GoogleMapProps {
  apiKey: string;
  center: google.maps.LatLngLiteral;
  zoom: number;
  markers?: { position: google.maps.LatLngLiteral; title: string; image: string }[];
  allowSelection: boolean;
  onLocationSelect?: (location: { address: string; lat: number; lng: number }) => void;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ apiKey, center, zoom, markers, allowSelection, onLocationSelect }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);

  useEffect(() => {
    const loadGoogleMapsScript = (): void => {
      if (!document.getElementById("google-maps-script")) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
        script.id = "google-maps-script";
        script.async = true;
        script.defer = true;
        script.onload = initMap;
        document.body.appendChild(script);
      } else if (window.google) {
        initMap();
      }
    };

    const initMap = (): void => {
      if (mapRef.current && !map) {
        const newMap = new google.maps.Map(mapRef.current, {
          center,
          zoom,
        });
        setMap(newMap);

        const renderer = new google.maps.DirectionsRenderer();
        renderer.setMap(newMap);
        setDirectionsRenderer(renderer);

        markers?.forEach(({ position, title, image }) => {
          const marker = new google.maps.Marker({
            position,
            map: newMap,
            title,
            icon: {
              url: "https://img.icons8.com/?size=100&id=65004&format=png&color=000000",
              scaledSize: new google.maps.Size(50, 50),
              anchor: new google.maps.Point(25, 50),
            },
          });

          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div class="info-window">
                <div style="width: 200px; height: 200px; overflow: hidden;">
                  <img
                    src="${image}"
                    alt="Seleccionada"
                    style="width: 100%; height: 100%; object-fit: cover"
                  />
                </div>
                <p>${title}</p>
              </div>
            `,
          });

          marker.addListener("click", () => {
            infoWindow.open(newMap, marker);
          });
        });
      }
    };

    GoogleMap.defaultProps = {
      markers: [],
      allowSelection: true,
    };

    const getUserLocation = (): void => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const location: google.maps.LatLngLiteral = {
              lat: latitude,
              lng: longitude,
            };
            setUserLocation(location);

            if (map) {
              map.setCenter(location);
              new google.maps.Marker({
                position: location,
                map,
                title: "Mi ubicación",
                icon: {
                  url: "https://img.icons8.com/?size=100&id=IFhxBaYSUYkJ&format=png&color=000000",
                  scaledSize: new google.maps.Size(50, 50),
                  anchor: new google.maps.Point(25, 50),
                },
              });
            }
          },
          (error) => {
            console.error("Error obteniendo la ubicación del usuario:", error);
          }
        );
      } else {
        console.error("Geolocalización no soportada por este navegador.");
      }
    };

    loadGoogleMapsScript();
    getUserLocation();

    return () => {
      if (map) {
        directionsRenderer?.setMap(null);
        setMap(null);
      }
    };
  }, [apiKey, center, zoom, markers, map]);

  const extractAddress = (location: google.maps.LatLngLiteral) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location }, (results, status) => {
      if (status === "OK" && results[0]) {
        const locationData = {
          lat: location.lat,
          lng: location.lng,
          address: results[0].formatted_address,
        };
        setSelectedLocation(locationData);

        // Callback para pasar la información al formulario
        if (onLocationSelect) {
          onLocationSelect(locationData);
        }
      }
    });
  };

  const addMarker = (location: google.maps.LatLngLiteral) => {
    if (!map) return;

    if (marker) {
      marker.setMap(null);
    }

    const newMarker = new google.maps.Marker({
      position: location,
      map,
    });

    setMarker(newMarker);
    extractAddress(location);
  };

  const handleSearch = () => {
    if (!map) return;
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: searchInput }, (results, status) => {
      if (status === "OK" && results[0]) {
        const location = results[0].geometry.location;
        map.setCenter(location);
        addMarker({ lat: location.lat(), lng: location.lng() });
      }
    });
  };

  useEffect(() => {
    if (map && allowSelection) {
      const listener = map.addListener("click", (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
          addMarker({ lat: event.latLng.lat(), lng: event.latLng.lng() });
        }
      });

      return () => google.maps.event.removeListener(listener);
    }
  }, [map, allowSelection, marker]);

  return (
    <div>
      {allowSelection &&
        <div className="flex items-center gap-2 m-8">
          <input
            className="input-standard flex-grow h-[50px]"
            type="text"
            placeholder="Buscar dirección"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            type="button"
            id="button-standard"
            style={{ width: 'auto', margin: '0' }}
            onClick={handleSearch}
          >
            Buscar
          </button>
        </div>
      }

      <div style={{ height: "500px", width: "100%" }} ref={mapRef} />
    </div>
  );
};

export default GoogleMap;

