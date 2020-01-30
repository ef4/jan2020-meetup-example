import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class OctaneStationComponent extends Component {
  @tracked cachedStation;

  get station() {
    if (this.cachedStation && this.cachedStation.id === this.args.id) {
      return this.cachedStation;
    }
    this.loadTheStation();
    return null;
  }

  async loadTheStation() {
    let response = await fetch(`/api/stations/${this.args.id}.json`);
    let json = await response.json();
    this.cachedStation = json;
  }
}
