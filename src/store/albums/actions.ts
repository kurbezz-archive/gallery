import { Actions } from 'vuex-smart-module';
import AlbumsState, { IAlbum } from './state';
import AlbumsGetters from './getters';
import AlbumsMutations from './mutations';

export default class AlbumsActions extends Actions<
  AlbumsState,
  AlbumsGetters,
  AlbumsMutations,
  AlbumsActions
> {
  $init() {
    const albums: IAlbum[] = [
      {
        name: 'Test',
        description: 'Test description',
        protected: false,
  
        folderName: 'test',
        files: [
          'p (1).jpg',
          'p (2).jpg',
          'p (3).jpg',
          'p (4).jpg',
          'p (5).jpg',
          'p (6).jpg',
        ]
      },
      {
        name: 'Test 2',
        description: 'Test 2 description',
        protected: false,
  
        folderName: 'test2',
        files: [
          'p (1).jpg',
          'p (2).jpg',
          'p (3).jpg',
          'p (4).jpg',
          'p (5).jpg',
        ]
      },
      {
        name: 'Test 3',
        description: 'Test 3 description',
        protected: false,
  
        folderName: 'test3',
        files: [
          'p (1).jpg',
          'p (2).jpg',
          'p (3).jpg',
          'p (4).jpg',
          'p (5).jpg',
        ]
      }
    ];
  
    setTimeout(() => this.commit('updateAlbums', albums), 500);
  }
}
