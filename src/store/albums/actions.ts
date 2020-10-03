import { Actions } from 'vuex-smart-module';
import AlbumsState, { IAlbum } from './state';
import AlbumsGetters from './getters';
import AlbumsMutations from './mutations';

import axios from 'axios';

export default class AlbumsActions extends Actions<
  AlbumsState,
  AlbumsGetters,
  AlbumsMutations,
  AlbumsActions
> {
  $init() {
    axios.get('generated_albums_config.json')
      .then(response => {
        setTimeout(() => this.commit('updateAlbums', response.data), 500);
      }).catch(error => console.log(error));
  }
}
