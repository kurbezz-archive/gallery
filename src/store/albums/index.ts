import { Module } from 'vuex-smart-module';
import AlbumsState from './state';
import AlbumsGetters from './getters';
import AlbumsMutations from './mutations';
import AlbumsActions from './actions';


const authModule = new Module({
  state: AlbumsState,
  getters: AlbumsGetters,
  mutations: AlbumsMutations,
  actions: AlbumsActions,
});

export default authModule;
