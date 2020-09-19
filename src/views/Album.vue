<template>
  <div>
    <LeftBlock 
      :title="title" 
      :description="description" 
      :picture="picture"></LeftBlock>
    <div class="photos-wrapper">
      <div class="photos" v-if="album !== null">
        <Photo v-for="file in filesToShow" :key="file" :file="file" :album="album"
               @clickPhoto="clickPhoto"></Photo>
      </div>
    </div>
    <vue-gallery v-if="album !== null"
                 :options="options" 
                 :images="images" 
                 :index="index" 
                 @close="index = null">
      <slot name="next">Next</slot>
    </vue-gallery>
  </div>
</template>

<script lang="ts">
import 'reflect-metadata';
import { Vue, Component, Prop, Watch, Ref } from 'vue-property-decorator';

import VueGallery from 'vue-gallery';

import { StoreType } from '@/store';
import { IAlbum } from '@/store/albums/state';

import LeftBlock from '@/components/LeftBlock.vue';
import Photo from '@/components/Photo.vue';


@Component({
  name: 'AlbumPage',
  components: {
    LeftBlock,
    Photo,
    VueGallery,
  }
})
export default class AlbumPage extends Vue {
  public filesToShow: string[] = [];

  public index: number | null = null;
  
  public options: object = {};

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
    return `/pictures/albums/${this.album.folderName}/${this.album.coverFileName}`;
  }

  get images() {
    return this.album!.files
    .map(item => `/pictures/albums/${this.album!.folderName}/${item}`);
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

  clickPhoto(index: number) {
    this.index = index;
  }

  mounted() {
    this.updateFiles();

    this.$on('clickPhoto', this.clickPhoto);
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

<style>
.blueimp-gallery>.next, .blueimp-gallery>.prev {
  border: none;
  background: none;
  color: white!important;
}
</style>
