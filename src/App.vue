<template>
  <div id="app">
    <div class="left-panel" 
        :class="{'left-panel-closed': leftPanelClosed}">
      <LeftPanel></LeftPanel>
    </div>
    <div class="content w-100" 
        :class="{'content-when-left-panel-open': !leftPanelClosed}">
      <div class="vertical-panel"
          :class="{'vertical-panel-when-left-panel-open': !leftPanelClosed}"></div>
      <div class="close-btn"
          :class="{'close-btn-when-left-panel-open': !leftPanelClosed,
                   'close-btn-hover': leftPanelClosed}"
          @click="switchLeftPanel()">
          <LottieAnimation
            class="close-btn-icon"
           :class="{'close-btn-icon-when-left-panel-open': !leftPanelClosed}"
            path="./animations/menu-close2.json"
           :width="30"
           :autoPlay="false"
           :loop="false"
           @AnimControl="setAnimController"
            ref="close-icon"></LottieAnimation>
          <span class="close-btn-label"
               :class="{'close-btn-label-when-left-panel-open': !leftPanelClosed}">MENU</span>
      </div>
      
      <vue-scroll style="height: 100vh" :ops="{scrollPanel: {scrollingX: false}}">
        <router-view class="w-100 content-body"
                    :class="{'content-body-when-left-panel-open': !leftPanelClosed}"
                    style="min-height: 100vh"/>
      </vue-scroll>
    </div>
  </div>
</template>

<script lang="ts">
import 'reflect-metadata';
import { Component, Vue, Ref, Watch } from 'vue-property-decorator';

import VueScroll, { Config } from 'vuescroll';

import LeftPanel from '@/components/LeftPanel.vue'

import LottieAnimation from "lottie-vuejs/src/LottieAnimation.vue";

import { StoreType } from '@/store';

interface AnimData {
  direction: number;
  currentTime: number;
  totalTime: number;
}

interface IAnimController {
  addEventListener(event: string, foo: (data: any) => void): void;

  play(): void;
  pause(): void;
  setSpeed(speed: number): void;
  setDirection(direction: 1 | -1): void;
}

interface ILottieAnimation {
  anim: IAnimController;
}


@Component({
  components: {
    LeftPanel,
    LottieAnimation,
    VueScroll,
  },
})
export default class App extends Vue {
  @Ref('close-icon') public readonly closeIcon!: ILottieAnimation;

  setAnimController(controller: IAnimController) {
    controller.addEventListener("enterFrame", this.onEnterFrame)
  }

  onEnterFrame(data: AnimData) {
    if (data.direction === 1 && data.currentTime >= data.totalTime / 2)
      this.closeIcon.anim.pause();
  }

  switchLeftPanel() {
    this.closeIcon.anim.setSpeed(1.2);

    if (this.leftPanelClosed) {
      this.closeIcon.anim.setDirection(1);
      this.closeIcon.anim.play();
    } else {
      this.closeIcon.anim.setDirection(-1);
      this.closeIcon.anim.play();
    }

    this.leftPanelClosed = !this.leftPanelClosed;
  }

  changeLeftPanelStatus(status: boolean) {
    if (!this.leftPanelClosed) {
      this.closeIcon.anim.setDirection(1);
      this.closeIcon.anim.play();
    } else {
      this.closeIcon.anim.setDirection(-1);
      this.closeIcon.anim.play();
    }
  }

  get leftPanelClosed(): boolean {
    return (this.$store as StoreType).state.app.leftPanelClosed;
  }

  set leftPanelClosed(value: boolean) {
    const store = (this.$store as StoreType);

    store.dispatch('app/setLeftPanelCloseStatus', value)
      .catch(error => console.log(error));
  }

  @Watch('leftPanelClosed')
  onLeftPanelClosedChange(val: boolean, oldValue: boolean) {

    this.changeLeftPanelStatus(val);
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&family=Open+Sans&display=swap');

body, #app {
  min-height: 100vh;
  overflow-x: hidden;
  font-family: 'Lato', sans-serif;
  letter-spacing: 1px;
  font-weight: 700;
  background-color: black;
  overflow: hidden;
}

.close-btn-hover:hover {
  background-color: white!important;
}

.close-btn {
  z-index: 2;
}

.vertical-panel {
  position: absolute;
  height: 0px;
  width: 0px;
  z-index: 1;
}

.content-body {
  transition: background-color linear .3s;
}

.content-body-when-left-panel-open {
  transition: margin-left linear .3s;
  margin-left: 58px;
  opacity: 0.5;
}

@media (max-width: 961px) {
  .close-btn {
    position: absolute;
    width: 100%;
    height: 50px;
    outline: none!important;
    background-color: black!important;
    transition: background-color linear .3s;
    opacity: 1!important;
  }

  .close-btn-when-left-panel-open {
    background-color: transparent!important;
    transition: background-color linear .3s;
  }

  .close-btn-icon {
    position: fixed;
    height: 50px!important;
    left: 14px;
    transition: left linear .3s;
    z-index: 2;
  }

  .close-btn-icon-when-left-panel-open {
    left: 205px;
  }

  .close-btn-label {
    position: absolute;
    font-size: 13px;
    font-weight: 400;
    color: white;
    top: 14px;
    left: 60px;
  }

  .close-btn-label-when-left-panel-open {
    opacity: 0;
  }

  .vertical-panel-when-left-panel-open {
    position: fixed;
    width: 58px;
    height: 100%;
    background: white!important;
  }

  .close-btn-label-when-left-panel-open {
    color: black;
  }

  .content-when-left-panel-open {
    margin-left: 192px;
  }
}

@media (min-width: 960px) {
  .close-btn {
    position: fixed;
    width: 58px;
    height: 100%;
    outline: none!important;
    background-color: rgba(0, 0, 0, 0.7)!important;
    transition: background-color linear .3s;
    opacity: 1!important;
    z-index: 1;
  }

  .close-btn-when-left-panel-open {
    background-color: white!important;
    transition: background-color linear .3s;
  }

  .close-btn-icon {
    position: absolute;
    left: 14px;
  }

  .close-btn-label {
    position: absolute;
    font-size: 12px;
    font-weight: 300;
    color: white;
    top: calc(49% + 20px);
    left: 10px;
  }

  .content-when-left-panel-open {
    margin-left: 192px;
  }
}

.left-panel {
  position: fixed;
  width: 192px;
  background-color: white;
  transition: margin-left linear .3s;
  z-index: 100;
}

.left-panel-closed {
  margin-left: -192px;
}

.content {
  transition: margin-left linear .3s;
  min-height: 100vh;
}
</style>
