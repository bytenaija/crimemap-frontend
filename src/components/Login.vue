<template>
  <div class="container">
    <navbar></navbar>
  <div class="register-form col-md-6 align-items-center">
    <form enctype="application/json; charset=utf-8" @submit.prevent>
    <div >
      <div class="alert alert-success" role="alert" v-show="isAuthenticated">
      {{message}}
      </div>

      <div class="alert alert-danger" role="alert" v-show="isError">
      {{message}}
      </div>
    </div>

  <div class="form-group">
    <label for="email">Email address</label>
    <input type="email" class="form-control" id="email" v-model="user.email" aria-describedby="emailHelp" placeholder="Enter email">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="password">Password</label>
    <input type="password" class="form-control" v-model="user.password" id="password" placeholder="Password">
  </div>


  <button type="submit" class="btn btn-primary" @click.prevent="loginUser">Submit</button>
</form>
<router-link to="/forget-password" class="ml-auto">Forgot Password</router-link>
  </div>

  </div>
</template>

<script>
import Navbar from "./Nav";
const SETTINGS = require ("../service/settings.json");
import * as axios from 'axios';

export default {
  name: 'Login',
  components : {
    Navbar
  },
  data () {
    return {
      user : {
        email : '',
        password : ''
      },
      isAuthenticated : false,
      message : '',
      isError : false
      

    }
  },

  methods : {
    loginUser : function(){
      localStorage.removeItem("Authorization");
      console.log(localStorage);
      this.isAuthenticated = this.isError = false;
      var loginUrl = SETTINGS.BASE_URL + "user/login/"
      axios.post(loginUrl, this.user)
      .then(result=>{
       
        if(result.data.success){
          var token = "Bearer " + result.data.token;
        localStorage.setItem("Authorization", token);
       
          this.isAuthenticated = true;
          this.message = result.data.message
          /* var url = document.referrer;
          var a = document.createElement('a');
          a.href = url;

          url = a.pathname;
          console.log(url); */

          setTimeout(()=>{
           
           this.$router.push({path : "/"}
           
           )}
         , 3000)
        }else{
          this.isError = true;
          this.message = result.data.message;
        }
      })
    }
  }
}
</script>


<style scoped>

</style>
