<template>
  <div ref="element" class="album"
      :style="{'background-image': backgroundStyle,
               'min-height': height}">
    {{ data.name }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref } from 'vue-property-decorator';

export interface IAlbum {
  name: string;
  description: string;
  protected: boolean;

  folderName: string;
  files: string[];
}

@Component
export default class Album extends Vue {
  @Prop({required: true}) public readonly data!: IAlbum;

  @Ref('element') public readonly element!: HTMLElement;

  public height: string = '10px';

  get backgroundStyle() {
    return `url('pictures/albums/${this.data.folderName}/${this.data.files[1]}')`;
  }

  updateHeight(): void {
    if (this.element === undefined)
      return;

    console.log("update");

    this.height = `${this.element.clientWidth}px`;
  }

  created() {
    window.addEventListener("resize", this.updateHeight);
  }

  destroyed() {
    window.removeEventListener("resize", this.updateHeight);
  }

  mounted() {
    this.updateHeight();
  }
}
</script>

<style scoped>
.album {
  background-size: cover;
}

@media (max-width: 461px) {
  .album {
    flex: 1 100%;
  }
}

@media (min-width: 460px) and (max-width: 1401px) {
  .album {
    flex: 1 50%;
  }
}

@media (min-width: 1400px) and (max-width: 1801px) {
  .album {
    flex: 1 33%;
  }
}
</style>