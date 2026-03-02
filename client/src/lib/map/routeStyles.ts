export const routeLayers = {
  routeLine: {
    id: 'route-line',
    type: 'line' as const,
    source: 'route',
    layout: {
      'line-join': 'round' as const,
      'line-cap': 'round' as const
    },
    paint: {
      'line-color': '#ff001e',
      'line-width': 4,
      'line-opacity': 0.95
    }
  }
};
