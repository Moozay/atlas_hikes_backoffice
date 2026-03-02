import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { routeLayers } from '@/lib/map/routeStyles';
import { setupPOIInteractions, setupRouteInteractions, loadCustomIcons, poiLayers, poiLayerConfigs, iconMapping } from '@/lib/map/poiInteractions';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as string | undefined;

interface TourMapProps {
  /** Inline GeoJSON object (preferred — loaded from DB) */
  geojson?: any;
  /** Fallback: URL/path to fetch GeoJSON from */
  geojsonFile?: string;
  height?: string;
  width?: string;
  center?: [number, number];
  zoom?: number;
  pitch?: number;
  bearing?: number;
  terrainExaggeration?: number;
  className?: string;
}

export default function TourMap({
  geojson: geojsonProp,
  geojsonFile,
  height = '500px',
  width = '100%',
  center = [-7.92, 31.06],
  zoom = 11,
  pitch = 55,
  bearing = -20,
  terrainExaggeration = 1.3,
  className = ''
}: TourMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [geojson, setGeojson] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Use inline geojson if provided, otherwise fetch from file
  useEffect(() => {
    if (geojsonProp) {
      setGeojson(geojsonProp);
      return;
    }
    if (!geojsonFile) return;
    fetch(geojsonFile)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load GeoJSON: ${res.statusText}`);
        return res.json();
      })
      .then((data) => setGeojson(data))
      .catch((err) => {
        console.error('Failed to load GeoJSON:', err);
        setError('Failed to load map data. Please try again later.');
      });
  }, [geojsonProp, geojsonFile]);

  useEffect(() => {
    if (!geojson) return;
    if (!mapContainer.current) return;
    if (!MAPBOX_TOKEN) {
      setError('Mapbox token missing. Add VITE_MAPBOX_TOKEN to your .env file.');
      return;
    }

    if (mapRef.current) {
      const map = mapRef.current;
      if (map.getSource('route')) {
        (map.getSource('route') as mapboxgl.GeoJSONSource).setData(geojson);
      }
      return;
    }

    mapboxgl.accessToken = MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center,
      zoom,
      pitch,
      bearing,
      antialias: true
    });

    mapRef.current = map;

    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    map.addControl(new mapboxgl.FullscreenControl(), 'top-right');

    map.on('load', () => {
      map.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxzoom: 14
      });

      map.setTerrain({ source: 'mapbox-dem', exaggeration: terrainExaggeration });

      if (!map.getLayer('hillshade')) {
        map.addLayer(
          {
            id: 'hillshade',
            type: 'hillshade',
            source: 'mapbox-dem',
            paint: { 'hillshade-exaggeration': 0.2 }
          },
          'waterway-label'
        );
      }

      if (!map.getSource('route')) {
        map.addSource('route', { type: 'geojson', data: geojson });
      }

      if (!map.getLayer('route-line')) {
        map.addLayer(routeLayers.routeLine as any);
      }

      loadCustomIcons(map, iconMapping)
        .then(() => {
          Object.values(poiLayers).forEach((layer: any) => {
            if (!map.getLayer(layer.id)) map.addLayer(layer as any);
          });
        })
        .catch((err) => console.error('Failed to load icons:', err));

      setupRouteInteractions(map);
      setupPOIInteractions(map, poiLayerConfigs);

      try {
        const lineFeatures = geojson.features.filter((f: any) =>
          f.geometry.type === 'LineString' || f.geometry.type === 'MultiLineString'
        );
        if (lineFeatures.length > 0) {
          let coords: [number, number][] = [];
          lineFeatures.forEach((feature: any) => {
            if (feature.geometry.type === 'LineString') {
              coords = coords.concat(feature.geometry.coordinates);
            } else {
              coords = coords.concat(feature.geometry.coordinates.flat(1));
            }
          });
          if (coords.length > 0) {
            const bounds = coords.reduce(
              (b: mapboxgl.LngLatBounds, coord: [number, number]) => b.extend(coord),
              new mapboxgl.LngLatBounds(coords[0], coords[0])
            );
            map.fitBounds(bounds, { padding: 80 });
          }
        }
      } catch (e) {
        console.warn('Could not fit bounds:', e);
      }
    });

    return () => {
      if (map && map.remove) map.remove();
      mapRef.current = null;
    };
  }, [geojson, center, zoom, pitch, bearing, terrainExaggeration]);

  return (
    <div className={className} style={{ width, height, position: 'relative' }}>
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-50 border border-red-200 rounded-lg z-10">
          <div className="text-center p-4">
            <p className="text-red-600 font-medium mb-2">Map Loading Error</p>
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        </div>
      )}
      <div ref={mapContainer} className="w-full h-full rounded-lg" />
    </div>
  );
}
