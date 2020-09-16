<template>
  <div>
    <LeftBlock 
      title="HOME" 
      description="kreorg photos" 
      picture="/pictures/home.jpg"></LeftBlock>
    <div class="albums-wrapper">
      <div class="albums">
        <Album v-for="album in albums" :key="album.folderName" :data="album"></Album>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import 'reflect-metadata';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

import LeftBlock from '@/components/LeftBlock.vue';
import Album from '@/components/Album.vue';

import { IAlbum } from '@/store/albums/state';
import { StoreType } from '@/store';


@Component({
  name: 'Home',
  components: {
    LeftBlock,
    Album,
  }
})
export default class Home extends Vue {
  public albums: IAlbum[] = [];

  public timeoutsIds: number[] = [];

  get albumsSource() {
    const store = (this.$store as StoreType);

    const albums = store.state.albums.albums;

    if (albums === null)
      return [];
    return albums;
  }

  @Watch('albumsSource')
  onAlbumsSourceChanged(val: IAlbum[], oldVal: IAlbum[] | null) {
    this.updateAlbums();
  }

  updateAlbums() {
    this.albums = [];

    this.albumsSource.forEach((item, index) => {
      setTimeout(() => this.albums.push(item), 300 * index);
    })
  }

  mounted() {
    this.updateAlbums();
  }
}
</script>

<style scoped>
.albums-wrapper {
  display: inline-block;
  vertical-align: top;
}

@media (max-width: 961px) {
  .albums-wrapper {
    width: calc(100vw);
  }
}

@media (min-width: 960px) {
  .albums-wrapper {
    width: calc(100vw - 405px);
    margin-left: 405px;
  }
}

.albums {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>