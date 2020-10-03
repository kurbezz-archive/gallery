<template>
  <transition appear name="fade">
    <div 
        @click="onClick"
        @mouseover="mouseover"
        @mouseleave="mouseleave"
        ref="element" class="album"
        :style="albumStyle">
      <div class="w-100 h-100 background-wrapper">
        <div class="w-100 h-100 backgrounds">
          <transition name="fade">
            <div v-show="showCover" class="w-100 h-100 cover" :style="coverStyle"></div>
          </transition>
          <transition name="fade" v-for="file in data.files" :key="file.id">
            <div v-show="!showCover && file === data.files[currentPhotoNumber]" 
                class="w-100 h-100 cover" 
                :style="{'background-image': `url('pictures/albums/${data.folderName}/photos/${file}')`,}"></div>
          </transition>
          <div :style="cacheBlockStyle"></div>
        </div>
      </div>

      <div class="w-100 h-100 background-mask">
        <div class="info text-center">
          <div class="info-name">{{ data.name }}</div>
          <hr class="info-hr">
          <div class="info-description">{{ data.description }}</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import 'reflect-metadata';
import { Component, Prop, Vue, Ref } from 'vue-property-decorator';

import { IAlbum } from '@/store/albums/state';


@Component({})
export default class Album extends Vue {
  @Prop({required: true}) public readonly data!: IAlbum;

  @Ref('element') public readonly element!: HTMLElement;

  public height: string = '10px';

  showCover: boolean = true;

  interval: number | null = null;

  currentPhotoNumber: number = 0;

  get albumStyle() {
    return {
      'height': this.height,
    }
  }

  get coverStyle() {
    return {
      'background-image': `url('pictures/albums/${this.data.folderName}/photos/${this.data.coverFileName}')`,
    };
  }

  get cacheBlockStyle() {
    const chacheImageNumber = this.currentPhotoNumber % this.data.files.length;
    return {
      'background-image': `url('pictures/albums/${this.data.folderName}/photos/${this.data.files[chacheImageNumber]}')`,
    }
  }

  updateHeight(): void {
    if (this.element === undefined)
      return;

    this.height = `${this.element.clientWidth}px`;
  }

  created() {
    window.addEventListener("resize", this.updateHeight);
    this.interval = setInterval(() => this.changePhoto(), 2000);
  }

  destroyed() {
    window.removeEventListener("resize", this.updateHeight);

    if (this.interval !== null)
      clearInterval(this.interval);
  }

  changePhoto() {
    if (!this.showCover)
      this.currentPhotoNumber = this.currentPhotoNumber % this.data.files.length;
  }

  onClick() {
    this.$router.push({ name: 'Album Page', params: { name: this.data.folderName } })
  }

  mouseover(event: Event) {
    this.showCover = false;
  }

  mouseleave(event: Event) {
    this.showCover = true;
  }

  mounted() {
    this.updateHeight();
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.background-wrapper {
  position: absolute;
}

.backgrounds {
  position: relative;
}

.cover {
  background-size: cover;
  position: absolute;
}

.background-mask {
  background: rgba(0, 0, 0, 0);
  transition: background linear .3s;
  position: absolute;
  z-index: 1;
}

.background-mask:hover {
  background: rgba(0, 0, 0, 0.5);
  transition: background linear .3s;
}

.background-mask > .info {
  opacity: 0;
  padding-top: 3em;

  transition: all linear .3s;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.background-mask:hover > .info {
  opacity: 1;
  padding-top: 0;

  transition: all linear .3s;
}

.info-hr {
  width: 70%;
  border-width: 2px;
  border-color: rgba(255, 255, 255, 0.3);
}

.info-name, .info-description {
  color: white;
  font-family: 'Open Sans', sans-serif;
}

.info-name {
  font-size: 24px;
}

.info-description {
  font-size: 12px;
}

.album {
  position: relative;
}

@media (max-width: 461px) {
  .album {
    flex: 1 100%;
    max-width: 100%;
  }
}

@media (min-width: 460px) and (max-width: 1401px) {
  .album {
    flex: 1 50%;
    max-width: 50%;
  }
}

@media (min-width: 1400px) and (max-width: 1501px) {
  .album {
    flex: 1 33.333%;
    max-width: 33.333%;
  }
}

@media (min-width: 1500px) {
  .album {
    flex: 1 25%;
    max-width: 25%;
  }
}
</style>
