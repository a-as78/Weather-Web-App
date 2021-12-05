<template>
    <div class="body">
        <app-search @submit="search($event)">
        </app-search>
        <div class="result">
            <div class="city" 
                 v-if="result"
                 @click="showCity(city)">{{city}}</div>
        </div>
        <div v-if="error">{{message}}</div>
        <div class="cities"
             v-if="showAll">
            <div class="city" 
                 v-for="(city , index) in cities"
                 :key="index" 
                 @click="showCity(city)">{{city}}</div>
        </div>
    </div>
</template>

<script>
import data from '../database/test2.json'
import AppSearch from '../components/search.vue'

export default {
    components:{
        AppSearch
    },
    data () {
        return {
            data: data,
            country: this.$route.params.id,
            cities: [],
            city: '',
            showAll: true,
            result: false,
            error: false,
            message: 'City Not Found'
        }
    },
    created() {
        this.cities = this.data[this.country]
    },
    methods: {
        showCity(city){
            this.$router.push({
            name: "city",
            params: {id: city}
            })
        },
        search(city) {
            this.showAll = false;
            console.log("here")
            console.log(this.cities.indexOf(city))
            console.log("hereee")
            if (this.cities.indexOf(city)>=0){
                this.result = true;
                this.city = city;
                this.error = false
            } else {
                this.error = true;
            }
        }
    }
}
</script>

<style scoped>
.body{
    background-color: rgb(196, 219, 224);
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
}
.search{
    margin: 10px;
    padding: 5px;
}
.cities{
    align-items: left;
    width: 85vw;
    max-width: 300px;
    border: 1px solid rgb(255, 0, 170);
}
.city{
    margin: 10px;
    padding: 5px;
    cursor: pointer;
}
.result{
    align-items: left;
    width: 85vw;
    max-width: 300px;
}
</style>