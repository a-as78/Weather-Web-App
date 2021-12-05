<template>
<div>
  <input class="search" 
  v-model = "country"
  @keyup.enter = "submit"
  /></div>
</template>

<script>

export default {
  data () {
    return {
        country: ''
    }
  },
  created() {
  },
  methods: {
      submit(){
        this.$emit('submit' , this.country)
      }
  },
  watch: { 
    
  }
}
</script>

<style scoped>
.search{
  width: 85vw;
  max-width: 300px;
  height: 7vh;
  border-radius: 0px 15px ;
  opacity: 70%;
  box-shadow: 3px 3px 5px grey;
  margin: 30px 0px 20px;
}


</style>
