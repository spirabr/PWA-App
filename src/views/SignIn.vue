<template>
  <div class="container">
    <div class="logo">
      <video 
        autoplay
        muted
        src='../../public/img/video/Spira_logo_anim.webm'
      ></video>
    </div>
    <div class="card-container">
      <v-row justify="center">
        <v-card elevation="2" class="card">
          <form @submit.prevent="login">
            <v-row justify="center" class="label-title">
              <label for="email" color="white">Username</label>
            </v-row>
            <v-row justify="center" class="v-size--large input">        
              <input
                class="input-field"
                type="text"
                name="username"/>
            </v-row>
            <v-row justify="center" class="label-title">
              <label for="password">Password</label>
            </v-row>
            <v-row justify="center" class="v-size--large input">
              <input
                class="input-field"
                type="password"
                name="password"
              />
            </v-row>
            <v-row justify="center">
              <button type="submit" class="buttons" id="login_button">
                Sign In
              </button>
            </v-row>
          </form>
        </v-card>
      </v-row>
    </div>
  </div>
</template>


<script>
export default {
  name: 'SignIn',
};
</script>

<style scoped>
  .input-field {
    border-radius:5px;
    background-color: white;
    height:30px;
  }
  .header {
    font-weight: bold;
    font-size: 25px;

    color: white;
  }
  .card {
    border-radius:43px;
    background-color: rgba(124, 31, 244, 0.7);
    padding: 50px 25px;
    height: 80%;
    width: 80%;
    max-height: 800px;
    max-width: 400px;
  }
  .card-container {
    height: 100%;
    width: 100%;

    padding: 50px 22px;
  }
  .container {
    height: 100%;
    width: 100%;

    padding: 30px 22px;
  }
  .logo {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .route-button {
    margin-top: 16px;
    margin-bottom: 0px;
  }
  .buttons {
    border-radius:43px;
    padding: 10px 10px;
    font-weight: bold;
    font-size: 18.5px;
    background-color:  rgb(84, 9, 182);
    color: white;
  }
  .v-size--large {
    font-weight: bold;
    font-size: 18.5px;
    padding-top: 10px;
    padding-bottom: 40px;
    color: white;
  }

  .label-title {
    font-size: 18.5px;
    color: white;
  }
  .v-btn--block {
    flex: unset;
  }
  .v-btn:not(.v-btn--round).v-size--large {
    height: 47px;
  }
  video {
    height: 100%;
    width: 100%;
    max-height: 215px;
    max-width: 255px;
  }
</style>