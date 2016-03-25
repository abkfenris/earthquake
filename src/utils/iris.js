export function fedcatalogToObject (input_string) {
  let lines = input_string.split('\n')
  let last_net = []
  let stations = {}
  for (var num in lines) {
    let line = lines[num]
    if (line === '') {
      last_net = []
    } else if (line.split(' ').length < 2) {
      last_net.push(line)
    } else {
      // select the network and station by splitting on -- and digits with a space on either side
      // http://regexr.com/3d389
      let name = line.split(/( (\d\d) | (--) )/)[0]
      stations[name] = {net: last_net}
    }
  }
  return (stations)
}

// For data from http://service.iris.edu/fdsnws/station/1/
export function fdsnwsStationToObject (xml) {
  let stationParser = new DOMParser()
  let stationDOM = stationParser.parseFromString(xml, 'text/xml')
  let FDSN = stationDOM.children[0]
  let stations = []

  for (var net_n in FDSN.getElementsByTagName('Network')) {
    var net_node = FDSN.getElementsByTagName('Network')[net_n]

    if (net_node.localName === 'Network') {
      for (var station_n in net_node.getElementsByTagName('Station')) {
        var station_node = net_node.getElementsByTagName('Station')[station_n]

        if (station_node.localName === 'Station') {
          var station = {geometry: {type: 'Point', coordinates: []}, properties: {}}

          station.geometry.coordinates.push(Number(station_node.getElementsByTagName('Longitude')[0].textContent))
          station.geometry.coordinates.push(Number(station_node.getElementsByTagName('Latitude')[0].textContent))
          station.geometry.coordinates.push(Number(station_node.getElementsByTagName('Elevation')[0].textContent))
          station.properties['name'] = station_node.getElementsByTagName('Site')[0]
            .getElementsByTagName('Name')[0].textContent
          station.properties['code'] = station_node.attributes.code.textContent
          station.properties['network_code'] = net_node.attributes.code.textContent

          if (net_node.attributes.restrictedStatus.textContent === 'open') {
            stations.push(station)
          }
        }
      }
    }
  }
  return stations
}
