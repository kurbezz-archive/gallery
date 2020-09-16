import { Module } from 'vuex-smart-module';
import AppState from './state';
import AppGetters from './getters';
import AppMutations from './mutations';
import AppActions from './actions';
import AlbumsMutations from '../albums/mutations';


const appModule = new Module({
  state: AppState,
  getters: AppGetters,
  mutations: AppMutations,
  actions: AppActions,
});

export default appModule;
