<template>
  <div class="photo-wrapper"
    :style="photoWrapperStyle"
    ref="element"
    @click="onClick">
    <transition appear name="fade">
      <div class="photo" :style="photoStyle"></div>
    </transition>
  </div>
</template>

<script lang="ts">
import 'reflect-metadata';
import { Vue, Component, Prop, Ref } from 'vue-property-decorator';

import { IAlbum } from '@/store/albums/state';

@Component({
  name: 'Photo',
})
export default class Photo extends Vue {
  @Prop({required: true})
  public readonly file!: string;

  @Prop({required: true})
  public readonly album!: IAlbum;

  @Ref('element') public readonly element!: HTMLElement;

  public height: string = '10px';

  updateHeight(): void {
    if (this.element === undefined)
      return;

    this.height = `${this.element.clientWidth}px`;
  }

  created() {
    window.addEventListener("resize", this.updateHeight);
  }

  destroyed() {
    window.removeEventListener("resize", this.updateHeight);
  }

  get photoStyle() {
    return {
      'background-image': `url('/pictures/albums/${this.album.folderName}/photos/${this.file}')`
    }
  }

  get photoWrapperStyle() {
    return {
      'height': this.height,
    }
  }

  onClick() {
    this.$emit('clickPhoto', this.album.files.indexOf(this.file));
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

.photo-wrapper {
  position: relative;
  overflow: hidden;
  transition: linear ;
  transition: opacity 1s ease;
  opacity: 1;
}

.photo-wrapper:hover {
  transition: opacity 1s ease;
  opacity: 0.5;
}

.photo {
  background-size: cover;
  transition: 1s;
  width: 100%;
  height: 100%;
}

.photo:hover {
  transform: scale(1.2);
}

@media (max-width: 461px) {
  .photo-wrapper {
    flex: 1 100%;
    max-width: 100%;
  }
}

@media (min-width: 460px) and (max-width: 1401px) {
  .photo-wrapper {
    flex: 1 50%;
    max-width: 50%;
  }
}

@media (min-width: 1400px) and (max-width: 1501px) {
  .photo-wrapper {
    flex: 1 33.333%;
    max-width: 33.333%;
  }
}

@media (min-width: 1500px) {
  .photo-wrapper {
    flex: 1 25%;
    max-width: 25%;
  }
}
</style>
