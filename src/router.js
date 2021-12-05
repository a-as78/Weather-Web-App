import Vue from 'vue'
import Content from './views/content.vue'
import City from './views/city.vue'
import Cities from './views/cities.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const router = new VueRouter({
    // mode: 'history',
    routes: [
        {path:"/" , component: Content},
        {path:"/cities/:id" , component: Cities , name: "cities", params: "country"},
        {path:"/city/:id" , component: City, name: "city", params: "city name"}
    ]
})
  
export default router