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
      <span>360*</span>
      <div class="photos360" v-if="album !== null">
        <Photo v-for="file in filesToShow360" :key="file" :file="file" :album="album"
               @clickPhoto="clickPhoto360" :t360="true"></Photo>
      </div>
    </div>
    <vue-gallery v-if="album !== null"
                 :options="options" 
                 :images="images" 
                 :index="index" 
                 @close="index = null">
    </vue-gallery>
    <div class="pano-wrapper" v-if="index360 !== null">
      <div class="pano-container">
        <pano :source="source360"></pano>
      </div>
      <div class="pano-button pano-prev" @click="prev360">‹</div>
      <div class="pano-button pano-next" @click="next360">›</div>
      <div class="pano-button pano-close" @click="index360 = null">×</div>
      <div class="pano-description">{{ panoDescription }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import 'reflect-metadata';
import { Vue, Component, Prop, Watch, Ref } from 'vue-property-decorator';

import VueGallery from 'vue-gallery';

import { Pano } from 'vuejs-vr';

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
    Pano,
  }
})
export default class AlbumPage extends Vue {
  public filesToShow: string[] = [];

  public filesToShow360: string[] = [];

  public index: number | null = null;

  public index360: number | null = null;
  
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
    return `/pictures/albums/${this.album.folderName}/photos/${this.album.coverFileName}`;
  }

  get images() {
    return this.album!.files
      .map((item, index) => {
        return {
          id: `${this.album!.folderName}/${item}`,
          href: `/pictures/albums/${this.album!.folderName}/photos/${item}`,
          description: this.album!.photoDescription[item] || ' ',
        };
      });
  }

  updateFiles() {
    this.filesToShow = [];

    if (this.album === null)
      return;

    this.album.files.forEach((item, index) => {
      setTimeout(() => this.filesToShow.push(item), 300 * index);
    });

    this.album.files_360.forEach((item, index) => {
      setTimeout(() => this.filesToShow360.push(item), 300 * index);
    });
  }

  @Watch('album')
  onAlbumsSourceChanged(val: IAlbum[], oldVal: IAlbum[] | null) {
    this.updateFiles();
  }

  clickPhoto(index: number) {
    this.index = index;
  }

  clickPhoto360(index: number) {
    this.index360 = index;
  }

  get source360() {
    if (this.index360 === null)
      return '';

    const filename = this.album!.files_360[this.index360];
    return `/pictures/albums/${this.album!.folderName}/360_photos/${filename}`;
  }

  get panoDescription() {
    if (this.index360 === null)
      return '';

    const filename = this.album!.files_360[this.index360];
    return this.album!.photoDescription[filename] || '';
  }

  next360() {
    const newIndex = this.index360! + 1;

    if (newIndex >= this.album!.files_360.length) {
      this.index360 = 0;
    } else {
      this.index360 = newIndex;
    }
  }

  prev360() {
    const newIndex = this.index360! - 1;

    if (newIndex! < 0) {
      this.index360 = this.album!.files_360.length - 1;
    } else {
      this.index360 = newIndex;
    }
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

.pano-wrapper {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 200;
  background-color: rgba(0, 0, 0, 0.9);
}

.pano-container {
  margin-top: 5%;
  margin-left: 5%;
  width: 90%;
  height: 85%;
}

.pano-description {
  position: fixed;

  margin-top: 0.5em;

  width: 100%;
  text-align: center;
  color: white;
}

.pano-button {
  position: fixed;

  padding: 1em;
  color: white;
  cursor: pointer;
}

.pano-prev {
  top: 45%;
  left: -3%;
  font-size: 3em;
}

.pano-next {
  top: 45%;
  right: -3%;
  font-size: 3em;
}

.pano-close {
  top: -3%;
  right: -1%;
  font-size: 2em;
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

.photos, .photos360 {
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

.blueimp-gallery-controls > .description {
  margin-top: calc(100vh - 5em);
  width: 100vw;
  text-align: center;
}
</style>
