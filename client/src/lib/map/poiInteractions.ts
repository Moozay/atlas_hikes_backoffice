import mapboxgl from 'mapbox-gl';
import { generatePOILayers, generateIconMapping, generatePOILayerConfigs } from './poiConfig';

export const poiLayers = generatePOILayers();
export const iconMapping = generateIconMapping();
export const poiLayerConfigs = generatePOILayerConfigs();

export function setupPOIInteractions(map: mapboxgl.Map, poiLayerConfigs: Array<{id: string, type: string}>) {
  poiLayerConfigs.forEach((layerConfig) => {
    const { id } = layerConfig;

    map.on('mouseenter', id, () => {
      map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', id, () => {
      map.getCanvas().style.cursor = '';
    });
  });
}

export function setupRouteInteractions(map: mapboxgl.Map) {
  map.on('mouseenter', 'route-line', () => {
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseleave', 'route-line', () => {
    map.getCanvas().style.cursor = '';
  });
}

export function loadCustomIcons(map: mapboxgl.Map, iconMapping: Record<string, string>) {
  const iconLoadPromises = Object.entries(iconMapping).map(
    ([iconName, iconPath]) =>
      new Promise<void>((resolve, reject) => {
        map.loadImage(iconPath, (error, image) => {
          if (error) {
            console.error(`Failed to load icon ${iconName}:`, error);
            reject(error);
            return;
          }
          if (!map.hasImage(iconName)) {
            map.addImage(iconName, image as HTMLImageElement | ImageBitmap, { sdf: false });
          }
          resolve();
        });
      })
  );

  return Promise.all(iconLoadPromises);
}
