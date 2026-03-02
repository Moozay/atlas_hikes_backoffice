export const POI_TYPES = {
  start_point: {
    name: 'Start Point',
    icon: '/icons/marker.png',
    size: 1.2
  },
  village: {
    name: 'Village',
    icon: '/icons/village.png',
    size: 1.1
  },
  holy_shrine: {
    name: 'Holy Shrine',
    icon: '/icons/place-of-worship.png',
    size: 1.1
  },
  junction: {
    name: 'Junction',
    icon: '/icons/cross.png',
    size: 1.0
  },
  refuge: {
    name: 'Refuge',
    icon: '/icons/lodging.png',
    size: 1.1
  },
  summit: {
    name: 'Summit',
    icon: '/icons/mountain.png',
    size: 1.2
  }
};

export function generatePOILayers() {
  const layers: Record<string, any> = {};
  Object.entries(POI_TYPES).forEach(([typeKey, typeConfig]) => {
    const layerId = `poi-${typeKey}`;
    layers[layerId] = {
      id: layerId,
      type: 'symbol',
      source: 'route',
      filter: ['==', ['get', 'type'], typeKey],
      layout: {
        'icon-image': typeKey,
        'icon-size': typeConfig.size,
        'icon-allow-overlap': false,
        'symbol-placement': 'point',
        'text-field': ['get', 'poi'],
        'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
        'text-size': 8,
        'text-offset': [0, -1],
        'text-anchor': 'bottom'
      }
    };
  });
  return layers;
}

export function generateIconMapping() {
  const iconMap: Record<string, string> = {};
  Object.entries(POI_TYPES).forEach(([typeKey, typeConfig]) => {
    iconMap[typeKey] = typeConfig.icon;
  });
  return iconMap;
}

export function generatePOILayerConfigs() {
  return Object.keys(POI_TYPES).map((typeKey) => ({
    id: `poi-${typeKey}`,
    type: typeKey
  }));
}
