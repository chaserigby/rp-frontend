<template>
<div id="user-menu" @click="stopPropagation($event)">
  <div style="display: flex;">
    <img class="profile-photo" :src="photo" />
    <div>
      <div class="name">{{user.first_name}} {{user.last_name}}</div>
      <div class="email">{{user.email}}</div>
      <div id="actions">
        <router-link to="/app/useredit" class="button hollow" style="margin-right:10px">Account</router-link>
        <button class="hollow" @click="sign_out()">Sign out</button>
      </div>
    </div>
  </div>
  <div id="lower-menu" v-if="isAdmin">
    <router-link to="/app/races">
      <button class="hollow">Bulk Race Editor</button>
    </router-link>
  </div>
  <!--<div id="lower-menu">
    <button class="hollow">Change Pass</button>
    <button class="hollow">Billing Settings</button>
    <button class="hollow">Cancel Account</button>
  </div>-->
</div>
</template>

<script>
export default {
  name: 'user-menu',
  methods: {
    sign_out () {
      this.$store.commit('logout')
      this.$router.push('/')
    },
    stopPropagation ($event) {
      $event.stopPropagation()
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    photo () {
      return this.$store.state.photo
    },
    isAdmin () {
      return this.$store.state.user.roles.indexOf('Admin') !== -1
    }
  }
}
</script>

<style>
#user-menu {
  position: absolute;
  z-index: 1;
  top: 55px;
  right: 10px;
	width: 280px;
	border-radius: 4px;
	background-color: #fff;
	box-shadow: 0 2px 10px 0 rgba(0,0,0,0.25);
  padding: 10px;

	color: #4A4A4A;
	font-family: Avenir;
	font-size: 12px;
	font-weight: 900;
	line-height: 16px;
}
.email {
  font-weight: 300;
}
.profile-photo {
	height: 72px;
	width: 72px;
	border-radius: 36px;
  margin-right: 10px;
  float: left;
}
#lower-menu {
  margin-top: 10px;
  border-top: 1px solid #D8D8D8;
  padding: 10px;
}
button {
  font-weight: 100;
  font-size: 12px;
}
#actions {
  margin-top: 6px;
}
</style>
