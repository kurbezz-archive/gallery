<template>
  <transition appear name="fade">
    <div class="photo"
        :style="photoStyle"
        ref="element">
    </div>
  </transition>
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
      'background-image': `url('/pictures/albums/${this.album.folderName}/${this.file}')`,
      'height': this.height,
    }
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

.photo {
  background-size: cover;
  position: relative;
}

@media (max-width: 461px) {
  .photo {
    flex: 1 100%;
    max-width: 100%;
  }
}

@media (min-width: 460px) and (max-width: 1401px) {
  .photo {
    flex: 1 50%;
    max-width: 50%;
  }
}

@media (min-width: 1400px) and (max-width: 1501px) {
  .photo {
    flex: 1 33.333%;
    max-width: 33.333%;
  }
}

@media (min-width: 1500px) {
  .photo {
    flex: 1 25%;
    max-width: 25%;
  }
}
</style>
