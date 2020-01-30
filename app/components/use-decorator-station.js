import Component from "@glimmer/component";
import { use } from "../lib/use";
import { remoteData } from "../lib/remote-data";

export default class UseDecoratorStationComponent extends Component {
  @use station = remoteData(`/api/stations/${this.args.id}.json`);
}
