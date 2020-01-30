import Component from "@glimmer/component";
import { use } from "../lib/use";
import { RemoteData } from "../lib/remote-data";

export default class UseDecoratorStationComponent extends Component {
  @use station = new RemoteData(() => `/api/stations/${this.args.id}.json`);
}
