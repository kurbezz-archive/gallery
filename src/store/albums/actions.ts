import { Actions } from 'vuex-smart-module';
import Vue from 'vue';
import { AxiosResponse, AxiosError } from 'axios';
import AlbumsState from './state';
import AlbumsGetters from './getters';
import AlbumsMutations from './muttations';

export default class AlbumsActions extends Actions<
  AlbumsState,
  AlbumsGetters,
  AlbumsMutations,
  AlbumsActions
> {

}
