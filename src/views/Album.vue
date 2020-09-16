<template>
  <div>
    <LeftBlock 
      title="HOME" 
      description="kreorg photos" 
      picture="/pictures/home.jpg" 
      :leftPanelClosed="leftPanelClosed"></LeftBlock>
    
  </div>
</template>

<script lang="ts">
import 'reflect-metadata';
import { Vue, Component, Prop } from 'vue-property-decorator';

import LeftBlock from '@/components/LeftBlock.vue';


@Component({
  name: 'AlbumPage',
  components: {
    LeftBlock,
  }
})
export default class AlbumPage extends Vue {
  @Prop({required: true}) public readonly leftPanelClosed!: boolean;
}
</script>

<style>

</style>
