<template>
<div v-bind:class="{ onHome: $route.path == '/' }">
  <modal classes="rp-modal" :adaptive="true" :height="450" :width="750" name="login-header">
    <button type="button" class="rp-modal-close" aria-label="Close" @click="$modal.hide('login-header')"><span aria-hidden="true">&times;</span></button>
    <login :isCreation="false" />
  </modal>
  <nav id="landing-nav">
    <router-link to="/" class="hide-on-mobile"><img src="/static/imgs/logo.jpg" id="logo" /></router-link>
    <ul id="primary-menu">
      <div class="hide-on-desktop" id="logo-mobile" @click="showMobileMenu()">
        <div class="row no-gutters justify-content-start">
          <div class="col-3">
            <div class="row no-gutters" style="padding-left: 6px;">
              <div class="">
                <img src="/static/imgs/logo_mobile.png"/>
              </div>
              <div class="">
                <span class="dropdown-arrow" ></span>
              </div>
            </div>  
          </div>
          <div class="col-6">
            <router-link v-scroll-to="'#choose-pass, 0px'" to="/#choose-pass">
            <div id="getracepass" class="button">Get Racepass</div>
            </router-link>
          </div>  
          <div class="col-3" id="login-button">
            <button class="hollow" @click="$modal.show('login-header')">Login</button>
          </div>
        </div>
      </div>
      <li class="hide-on-mobile"><span @click="$modal.show('login-header')">Log in</span></li>
      <li class="hide-on-mobile" v-scroll-to="'#choose-pass, 0px'">
        <router-link to="/#choose-pass">
          <div id="getracepass" class="button hollow">Get Racepass</div>
        </router-link>
      </li>
      <li><router-link to="/why">Why?</router-link></li>
    </ul>
  </nav>
  <MobileHeader ref="mobileHeader"></MobileHeader>
</div>
</template>

<script>
import Login from '@/components/Login'
import MobileHeader from '@/components/MobileHeader'
export default {
  components: {
    'login': Login,
    MobileHeader,
  },
  methods: {
    showMobileMenu () {
      this.$refs.mobileHeader.showMobileMenu()
    }
  },
  data () {
    return {
      open: false
    }
  },
}
</script>

<style scoped>
#landing-nav {
	padding: 13px 15px 0px 0px;
	margin-bottom: 0px;
  overflow: hidden;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.25);
}
#logo {
	width: 140px;
	margin-left: 19px;
}
#logo-mini {
	height: 32px;
}
#primary-menu {
  float: right;
  padding-left: 10px;
  margin-bottom: 10px;
}
#primary-menu li {
  display: inline-block;
  height: 30px;
  margin-left: 15px;
  font-weight: 900;
}
#primary-menu button,
#primary-menu .button {
  padding: 6px 15px;
}
@media screen and (max-width: 799px) {
  ul {
    margin-top: 15px;
    text-align: center;
    width: 100%;
  }
  #landing-nav {
    padding: 13px 0px 13px 0px;
    z-index: 200;
    position: fixed;
    width: 100%;
  }
  #logo-mobile {
    margin: 0px 0px;
  }
  #login-button {
    margin: 0px 0px;
  }
  #login-button button {
    font-size: 12px;
    font-weight: 900;
    line-height: 16px;
  }
  #getracepass{
    font-size: 12px;
    font-weight: 900;
    line-height: 16px;
    margin: 0 auto;
  }
  #logo-mobile img {
    width: 58px;
  }
  #logo-mobile {
    margin-top: -5px;
  }
  
  #primary-menu {
    float: none;
    padding: 0px 0px;
  }
  #primary-menu li {
    margin-left: 0px;
  }
  #getracepass {
    max-width: 120px;
  }
}
#getracepass {
  font-size: 12px;
  font-weight: 900;
}
.hollow {
  cursor: pointer;
}
</style>
<style>
.shadowed {
  -webkit-box-shadow: 0px 2px 2px 0px rgba(0,0,0,0.25);
  -moz-box-shadow: 0px 2px 2px 0px rgba(0,0,0,0.25);
  box-shadow: 0px 2px 2px 0px rgba(0,0,0,0.25);
}
</style>
