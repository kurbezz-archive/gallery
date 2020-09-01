<template>
  <div class="left-block text-center"
      :style="{'background-image': backgroundStyle}">
    <div class="text-block background"
        :class="{'background-when-left-panel-opened': !leftPanelClosed}">
      <p class="title">{{ title }}</p>
      <p class="description">{{ description }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class LeftBlock extends Vue {
  @Prop({required: true}) public readonly title!: string;

  @Prop({required: true}) public readonly description!: string;

  @Prop({required: true}) public readonly picture!: string;

  @Prop({required: true}) public readonly leftPanelClosed!: boolean;

  get backgroundStyle(): string {
    return `url('${this.picture}')`
  }
}
</script>

<style scoped>
.left-block {
  display: inline-block;
}

.background {
  background-color: rgba(0, 0, 0, 0.5);
  transition: background-color linear .3s;
}

.background-when-left-panel-opened {
  background-color: rgba(0, 0, 0, 1);
  transition: background-color linear .3s;
}

@media (max-width: 961px) {
  .left-block {
    background-position: center center;
    background-size: cover;
    width: 100%;
    height: 300px;
  }

  .text-block {
    padding-top: 130px;
  }

  .background {
    width: 100%;
    height: 300px;
  }
}

@media (min-width: 960px) {
  .left-block {
    background-size: cover;
    min-height: 100vh;
    width: 405px;
  }

  .text-block {
    padding-top: 43vh;
    padding-left: 45px;
  }

  .background {
    height: 100vh;
  }
}

.title {
  font-size: 32px;
  color: white;
  font-family: 'Open Sans', sans-serif;
}

.description {
  font-size: 20px;
  color: white;
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
}
</style>
