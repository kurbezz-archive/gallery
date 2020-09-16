import { Actions } from 'vuex-smart-module';
import AppState from './state';
import AppGetters from './getters';
import AppMutations from './mutations';

export default class AppActions extends Actions<
  AppState,
  AppGetters,
  AppMutations,
  AppActions
> {
  setLeftPanelCloseStatus(value: boolean) {
    this.commit("setLeftPanelCloseStatus", value);
  }
}
