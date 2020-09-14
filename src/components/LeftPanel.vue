<template>
  <div>
    <div class="left-panel-background">
    </div>
    <div class="main-column links text-center">
      <div class="link-wrapper">
        <span class="link" 
              :class="{'active-link': isActiveLink('Home')}"
              @click="goToHome">
          HOME
        </span>
      </div>
      <div class="link-wrapper">
        <span class="link" 
              :class="{'active-link': isActiveLink('About Me')}"
              @click="goToAboutMe">
          ABOUT ME
        </span>
      </div>
    </div>
    <div class="main-column socials text-center">
      <div class="row no-gutters">
        <div class="col-12">
          <div class="social">
           <i class="fa fa-twitter"></i>
          </div>
          <div class="social">
           <i class="fa fa-facebook"></i>
          </div>
          <div class="social">
            <i class="fa fa-flickr"></i>
          </div>
          <div class="social">
            <i class="fa fa-instagram"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="main-column copyright text-center">
      <span>© Kreorg</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class LeftPanel extends Vue {
  public closed: boolean = true;

  isActiveLink(name: string): boolean {
    return this.$route.name === name;
  }

  goToHome() {
    this.$router.push({'name': 'Home'});

    this.$emit('closeLeftPanel');
  }

  goToAboutMe() {
    this.$router.push({'name': 'About Me'});

    this.$emit('closeLeftPanel');
  }
}
</script>

<style scoped>
.left-panel-background {
  background-color: white;
  height: 100vh;
}

.main-column {
  width: 142px;
  position: absolute;
  left: 58px;
}

.no-gutters {
  padding: 0;
}

.links {
  top: 45vh;
}

.socials {
  top: 63vh
}

.social {
  display: inline-block;

  width: 25px;
  height: 25px;
  padding: 1px 1px; 
  border-radius: 100%; 
  font-size: 15px; 
  text-align: center;
  margin-right: 3px;
  margin-left: 3px;

  color: white;
  background-color: black; 
}

.copyright {
  position: absolute;
  top: 93vh;
  font-size: 13px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  letter-spacing: 0px;
}

.link {
  font-size: 14px;
  color: #999999;
  text-decoration: none;
}

.link:hover {
  color: black;
}

.active-link {
  font-weight: 900;
  color: black;
}

.link-wrapper {
  padding-top: 8px;
  padding-bottom: 8px;
}
</style>
