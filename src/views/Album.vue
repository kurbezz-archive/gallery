<template>
  <div>
    <LeftBlock 
      :title="title" 
      :description="description" 
      :picture="picture"></LeftBlock>
    <div class="photos-wrapper">
      <div class="photos" v-if="album !== null">
        <Photo v-for="file in filesToShow" :key="file" :file="file" :album="album"></Photo>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import 'reflect-metadata';
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

import { StoreType } from '@/store';
import { IAlbum } from '@/store/albums/state';

import LeftBlock from '@/components/LeftBlock.vue';
import Photo from '@/components/Photo.vue';


@Component({
  name: 'AlbumPage',
  components: {
    LeftBlock,
    Photo,
  }
})
export default class AlbumPage extends Vue {
  public filesToShow: string[] = [];

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

  updateFiles() {
    this.filesToShow = [];

    if (this.album === null)
      return;

    this.album.files.forEach((item, index) => {
      setTimeout(() => this.filesToShow.push(item), 300 * index);
    })
  }

  @Watch('album')
  onAlbumsSourceChanged(val: IAlbum[], oldVal: IAlbum[] | null) {
    this.updateFiles();
  }

  mounted() {
    this.updateFiles();
  }
}
</script>

<style scoped>
.photos-wrapper {
  display: inline-block;
  vertical-align: top;
}

@media (max-width: 961px) {
  .photos-wrapper {
    width: calc(100vw);
  }
}

@media (min-width: 960px) {
  .photos-wrapper {
    width: calc(100vw - 405px);
    margin-left: 405px;
  }
}

.photos {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
