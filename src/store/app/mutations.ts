import { Mutations } from 'vuex-smart-module';
import AppState from './state';

export default class AppMutations extends Mutations<AppState> {
  setLeftPanelCloseStatus(value: boolean) {
    this.state.leftPanelClosed = value;
  }
}
