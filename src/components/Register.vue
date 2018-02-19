<template>

  <div class="container">
    <navbar></navbar>
  <div class="register-form col-md-6 align-items-center">
    <form enctype="application/json; charset=utf-8" @submit.prevent>
  <div class="form-group">
    <label for="firstname">Firstname</label>
    <input type="text" class="form-control" id="firstname" v-model="user.firstname" placeholder="Enter your firstname">
  </div>

   <div class="form-group">
    <label for="lastname">Lastname</label>
    <input type="text" class="form-control" id="lastname" v-model="user.lastname" placeholder="Enter your lastname">
  </div>

   <div class="form-group">
    <label for="username">Username</label>
    <input type="text" class="form-control" id="username" v-model="user.username" placeholder="Enter your username">
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

  <div class="form-group">
    <label for="avatar">Password</label>
    <input type="file" class="form-control-file"  name ="avatar" id="avatar" @change="avatarChanged($event.target.files)" accept="image/*">
    <button type="submit" class="btn btn-primary" @click.prevent="uploadAvatar">Upload File</button>
  </div>

  <button type="submit" class="btn btn-primary" @click.prevent="registerUser">Submit</button>
</form>
  </div>
  <img :src=imgSrc>
  </div>
</template>

<script>
import Navbar from "./Nav";
  const SETTINGS = require ("../service/settings.json");
import * as axios from 'axios';


export default {
  name: 'Register',
   components : {
    Navbar
  },
  data () {
    return {
      user : {
        email : '',
        password : '',
        firstname : '',
        lastname : '',
        username : '',
        avatar : '',
      },
      formData :  null,
      imgSrc : SETTINGS.BASE_URL + "user/avatar/"

    }
  },

  methods:  {
    avatarChanged: function(file){
      this.formData = new FormData();
      console.log(file[0].name);
      this.formData.append("avatar", file[0], file[0].name)
       

    },

    uploadAvatar: function(){
      console.log("Here");
     console.log("Uploading...")
    const urlAvatar = SETTINGS.BASE_URL + 'user/avatar/upload/';
    let data = this.formData;
    axios.post(urlAvatar, data, {headers: {
          'Content-Type': 'multipart/form-data'
        }})
        .then(result=>{
         this.user.avatar = result.data.file;
         
        })
    },

    registerUser: function(){
      const urlRegister = SETTINGS.BASE_URL +  'user/register/';
     /*  this.formData = new URLSearchParams();
      
      this.formData.append("username", this.username);
      this.formData.append("firstname", this.firstname);
      this.formData.append("lastname", this.lastname);
      this.formData.append("email", this.email);
      this.formData.append("password", this.password);
      this.formData.append("avatar", this.avatar); */


    //  const data = this.formData;

     
      axios.post(urlRegister, this.user)
        .then(result=>{
            this.imgSrc += result.data.id;
            console.log(result);
          
        });
    },

    }

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.container{
  min-width: 100% !important;
  margin: 0;
  padding: 0;
}

</style>
