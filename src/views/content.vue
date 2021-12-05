<template>
  <div class="content"
       :class="{warm: warm , cool: cool}">
    <app-search @submit="getCountryName($event)">
    </app-search>
    <div class="loading"
         v-if="loading"></div>
    <div class="info" 
          v-if="submitted">
      <div class="country" 
           v-if="weather.temp">{{countryName}}</div>
      <div class="date" 
           v-if="weather.temp">{{date | moment("dddd D MMMM YYYY")}}</div>
      <div class="temp" 
           v-if="weather.temp">{{parseInt(weather.temp)}}c</div>
      <div class="status" 
           v-if="weather.status">{{weather.status}}</div>
      <ul class="cities" 
          v-if="weather.temp">
        <li class="city" 
            v-for="(city , index) in countryCities.slice(0,3)" 
            :key="index">{{city}}</li>
        <button @click="showMore">More Cities</button>
      </ul>
      <div class="error" 
           v-if="weather.message">{{weather.message}}</div>
    </div>
</div>
</template>

<script>
import AppSearch from '../components/search.vue'
import data from '../database/test2.json'

export default {
  components: {
    AppSearch
  },
  data () {
    return {
      countryName: "Iran",
      urlBase: "https://api.openweathermap.org/data/2.5/",
      apiKey:"2c364f3e2ea4974b3d5e850d6b57ef3e",
      weather: {
        temp: '',
        status: '',
        message: ''
      },
      date: new Date(),
      warm: false,
      cool: true,
      submitted: false, 
      countryCities: [],
      data: data,
      url: "/cities",
      loading: false
    }
  },
  async created() { 
    console.log('data', data)
  },
  methods: {
    async getWeatherData() {
        let response = await fetch(`${this.urlBase}weather?q=${this.countryName}&units=metric&APPID=${this.apiKey}`)
        this.response = await response.json();
        return this.response
    },
    changeBackground(){
      if(this.response.main.temp < 25){
        this.warm = false
        this.cool = true
      }else{
        this.warm = true
        this.cool = false
     }
    },
    async getCountryName(country){
      this.weather.message = ''
      this.loading = true
      this.countryName = country
      this.submitted = true
      this.response = await this.getWeatherData()
      this.loading = false
      this.countryCities = this.data[this.countryName]
      if(this.response.cod == "200"){
      this.weather = {
        temp: this.response.main.temp,
        status: this.response.weather[0].main,
        message: ''
      }
      this.url += this.countryName
      this.changeBackground();
     } else {
        this.weather = {
          temp: '',
          status: '',
          message: 'Country Not Found'
        }
      }
       console.log('request api')
       console.log(this.response)
   },
   showMore(){
    this.$router.push({
      name: "cities",
      params: {id: this.countryName}
    })
  }
  }
}
</script>

<style scoped>
.warm {
  background-image: url('../assets/warm.jpg');
  background-repeat: no-repeat;
  background-position-x: center;
  width: 100%;
  height: 100vh;
  color: white;
}
.cool {
  background-image: url('../assets/cool.jpg');
  background-repeat: no-repeat;
  background-position-x: center;
  width: 100%;
  height: 100vh;
  color: black;
}
div {
  font-family: 'montserrat', sans-serif;
}
.content{  
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 30px;
  position: relative;
}
.info{
  display: flex;
  align-items: center;
  flex-direction: column;
  font-weight: 800;
}
.temp{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60vw;
  max-width: 200px;
  height: 15vh;
  border-radius: 15px;
  background-color: #FFFFFF80;
  margin: 20px;
  font-size: 50px;
  box-shadow: 5px 5px 5px rgba(128, 128, 128, 0.363);
}
.date, .status{
  font-style: italic;
}
.date{
  font-size: 15px;
  padding: 5px;
  font-weight: 300;
}
.status{
  font-size: 20px;
}
.cities{
  border-radius: 15px;
  margin-top: 50px;
  background-color: #FFFFFF80;
  padding: 10px;
  box-shadow: 5px 5px 5px rgba(128, 128, 128, 0.363)
}
.city{
  margin: 10px 0px;
}
.loading{
  width: 30px;
  height: 30px;
  border: 1px solid grey;
  border-radius: 50%;
  border-left-color: lightblue;
  -webkit-animation: spin 4s infinite linear;
}

@-webkit-keyframes spin {
	0%  {-webkit-transform: rotate(0deg);}
	100% {-webkit-transform: rotate(360deg);}	
}
</style>

