<template>
  <div>
    <LeftBlock title="HOME" description="kreorg photos" picture="/pictures/home.jpg" :leftPanelClosed="leftPanelClosed"></LeftBlock>
    <div class="albums-wrapper">
      <div class="albums">
        <Album v-for="album in albums" :key="album.folderName" :data="album"></Album>
        <!-- ToDO: Delete -->
        <Album v-for="album in albums" :key="album.folderName + 'copy'" :data="album"></Album>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import 'reflect-metadata';
import { Component, Prop, Vue } from 'vue-property-decorator';

import LeftBlock from '@/components/LeftBlock.vue';
import Album, { IAlbum } from '@/components/Album.vue';


@Component({
  name: 'Home',
  components: {
    LeftBlock,
    Album,
  }
})
export default class Home extends Vue {
  @Prop({required: true}) public readonly leftPanelClosed!: boolean;

  public albums: IAlbum[] = [
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