import { tracked } from '@glimmer/tracking';


export class RemoteData {
  @tracked _state;

  constructor(urlCallback) {
    this.urlCallback = urlCallback;
  }

  async run() {
    let url = this._url;
    let response = await fetch(url);
    let json = await response.json();
    if (this._url !== url) {
      // somebody else superceded our request
      return;
    }
    this._state = {
      isLoading: false,
      response: json,
    };
  }

  get state() {
    let url = this.urlCallback();
    if (this._url !== url) {
      this._url = url;
      this._state = {
        isLoading: true,
        response: undefined,
      }
      this.run();
    }
    return this._state;
  }
}

function resource(Class) {
  return (...args) => [Class, ...args];
}

export const remoteData = resource(RemoteData);
