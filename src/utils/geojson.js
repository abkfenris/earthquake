import distance from 'turf-distance'

export const distanceForFeature = (source, feature) => {
  return distance(source, feature, 'degrees')
}

export const featuresWithDistance = (source, features) => {
  return features.map((feature) => {
    feature.properties['distance'] = distance(source, feature, 'degrees')
    return feature
  })
}

export const compareFeatureDistances = (a, b) => {
  if (a.properties.distance < b.properties.distance) {
    return -1
  } else if (a.properties.distance > b.properties.distance) {
    return 1
  } else {
    return 0
  }
}
