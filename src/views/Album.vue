<template>
  <div>
    <LeftBlock 
      :title="title" 
      :description="description" 
      :picture="picture"></LeftBlock>
  </div>
</template>

<script lang="ts">
import 'reflect-metadata';
import { Vue, Component, Prop } from 'vue-property-decorator';

import { StoreType } from '@/store';
import { IAlbum } from '@/store/albums/state';

import LeftBlock from '@/components/LeftBlock.vue';


@Component({
  name: 'AlbumPage',
  components: {
    LeftBlock,
  }
})
export default class AlbumPage extends Vue {
  get album(): IAlbum | null {
    const albums = (this.$store as StoreType).state.albums.albums;

    if (albums === null)
      return null;

    const album = albums.filter(item => item.folderName === this.$route.params.name);

    if (album.length === 0)
      return null;

    return album[0];
  }

  get title(): string {
    if (this.album === null)
      return '';
    return this.album.name;
  }

  get description(): string {
    if (this.album === null)
      return '';
    return this.album.description;
  }

  get picture(): string {
    if (this.album === null)
      return '';
    return `/pictures/albums/${this.album.folderName}/${this.album.coverFileName}`
  }
}
</script>

<style>

</style>
