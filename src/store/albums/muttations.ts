import { Mutations } from 'vuex-smart-module';
import AlbumsState, { IAlbum } from './state';

export default class AlbumsMutations extends Mutations<AlbumsState> {
  updateAlbums(albumsData: IAlbum[]) {
    this.state.albums = albumsData;
  }
}
