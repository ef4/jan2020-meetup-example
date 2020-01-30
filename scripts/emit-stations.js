/* eslint-env node */
const zip = require('lodash/zip');
const { outputJSONSync } = require('fs-extra');
const { join } = require('path');

const redLine = [
  "Kendall/MIT",
  "Charles/MGH",
  "Park Street",
  "Downtown Crossing",
  "South Station"
];

const greenLine = [
  "Haymarket",
  "Government Center",
  "Park Street",
  "Boylston",
  "Arlington",
  "Copley"
];

const orangeLine = [
  "North Station",
  "Haymarket",
  "State",
  "Downtown Crossing",
  "Chinatown"
];

const stations = new Map();

function addLine(names, line) {
  for (let name of names) {
    let station = stations.get(name);
    if (!station) {
      station = {
        id: stations.size,
        name,
        lines: new Set(),
        neighbors: new Set(),
      }
      stations.set(name, station);
    }
    station.lines.add(line);
  }
  for (let [a,b] of zip(names.slice(0, -1), names.slice(1))) {
    stations.get(a).neighbors.add(stations.get(b));
    stations.get(b).neighbors.add(stations.get(a));
  }
}

addLine(redLine, 'Red');
addLine(greenLine, 'Green');
addLine(orangeLine, 'Orange');

for (let station of stations.values()) {
  outputJSONSync(join(__dirname, `../public/api/stations/${station.id}.json`), {
    id: String(station.id),
    name: station.name,
    lines: [...station.lines],
    neighbors: [...station.neighbors].map(neighbor => ({
      id: neighbor.id,
      name: neighbor.name,
    })),
  });
}
