<template>
  <div id="login-container">
    <h1 v-if="isCreation">We haven’t launched in your area yet</h1>
    <h1 v-else>Welcome to Racepass!</h1>
    <div v-if="isCreation" class="subinfo container">
      <div class="row justify-content-center">
        <div class="col-10">
          Create an account to join the waitlist and we’ll let you know as soon as we’re open in your region.
        </div>
      </div>
    </div>
    <div class="login-panel">
      <div style="flex: 1;">
        <div v-if="isCreation">Create account with social:</div>
        <div v-if="!isCreation">Login with social:</div>
        <div style="margin-top: 30px;">
            <div id="fb-login" @click="facebook()">
            <i class="fa fa-facebook" aria-hidden="true"></i>
            CONTINUE WITH FACEBOOK
          </div>
        </div>
      </div>
      <div id="login-divider" style="flex: 0.1 50px">
        <div class="vbar"></div>
        <div style="margin: 8px 0px;">OR</div>
        <div class="vbar"></div>
      </div>
      <form class="userpass" style="flex: 1;">
        <div v-if="isCreation">Create account with email and password:</div>
        <div v-if="!isCreation">Login with your email and password:</div>
        <br>
        <input required v-model="email" class="full" type="email" placeholder="Your email" /><br>
        <input required @keyup.enter="isCreation ? pwdRegister(): pwdLogin()" v-model="password" class="full" type="password" placeholder="Choose a password" />
        <div>
            <button type="button" v-if="isCreation" @click="pwdRegister()" id="do-login-button">Register</button>
            <button type="button" v-if="!isCreation" @click="pwdLogin()" id="do-login-button">Login</button>
        </div>
      </form>
    </div>
    <p style="text-align: center; margin-top: 8px;">By signing up you agree to our <a href="/terms" target="_blank">Terms of Use</a> and <a href="/privacy" target="_blank">Privacy Policy</a></p>
  </div>
</template>

<script>
/* global FB:true */
import rp from '../rp'
import toastr from 'toastr'
export default {
  name: 'login',
  props: {
    isCreation: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    facebookRegister (fbAccessToken) {
      var data = {
        'fbAccessToken': fbAccessToken,
      }
      rp.post('user/register', data)
        .then((result) => {
          this.facebookLogin(fbAccessToken)
        }, function (err) {
          if (err.status === '409') {
            return toastr.error('a user with this email already exists')
          }
          toastr.error('error creating an account with Facebook')
        })
    },
    pwdRegister (success) {
      var data = {
        'email': this.email,
        'password': this.password,
      }
      rp.post('user/register', data)
        .then((result) => {
          this.pwdLogin(success)
        }, function (err) {
          if (err.status === 409) {
            toastr.error('An account with this email already exists.')
          } else {
            toastr.error('error creating an account')
          }
        })
    },
    facebook () {
      FB.login((response) => {
        this.facebookLogin(response.authResponse.accessToken, () => {
          this.facebookRegister(response.authResponse.accessToken)
        })
      }, {scope: 'public_profile,email,user_birthday,user_location'})
    },
    facebookLogin (fbAccessToken, onErr) {
      var data = {
        'fbAccessToken': fbAccessToken,
      }
      rp.post('user/fblogin', data)
        .then((result) => {
          this.$store.commit('login', result)
          this.$store.dispatch('loadUser')
          this.$router.push('/app/profile')
        }, function (err) {
          if (err.status === 404) {
            // if no account try creating one
            return onErr()
            // return self.facebookRegister()
            // return toastr.error('No account with this Facebook\'s email exists.')
          }
          toastr.error('error logging in with Facebook')
        })
    },
    pwdLogin () {
      var data = {
        'email': this.email,
        'password': this.password,
      }
      rp.post('user/login', data)
        .then((result) => {
          if (result.token) {
            this.$store.commit('login', result)
            this.$store.dispatch('loadUser')
            this.$router.push('/app/profile')
          } else {
            toastr.error(result.error || 'error logging in')
          }
          // window.location = '/app'
        }, function (result) {
          result = result || {}
          toastr.error(result.error || 'error logging in')
        })
    }
  }
}
</script>

<style scoped>
#login-container {
  max-width: 650px;
  margin: 10px auto;
}
#login-container input {
  margin: 8px 20px 8px 0px;
}
#login-container button {
  margin-right: 0px;
}
.login-panel {
  display: flex;
}
#fb-login-container {
  margin-top: 50px;
}
#login-divider {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 35px;
}
.subinfo {
  color: #FFFFFF;
  font-size: 18px;
  font-weight: 300;
  line-height: 25px;
  text-align: center;
  margin-bottom: 20px;
}
h1 {
  color: #FFFFFF;
  font-size: 30px;
  font-weight: 900;
  line-height: 41px;
}
@media screen and (max-width: 750px) {
  .login-panel {
    display: block;
    padding-right: 25px;
  }
  .vbar {
    display: none;
  }
  #fb-login-container {
    margin-top: 25px;
  }
  #login-divider {
    margin-top: 15px;
  }
}
#do-login-button {
  float: right;
  padding: 10px;
  width: 100px;
  margin-top: 5px;
  margin-right: -7px;
}
</style>
