<template lang="pug">
  <div id="app">
    <img src="./assets/logo.png">
    <h1>PlatziMusic</h1>
    <select v-model="selectedCountry">
      <option v-for="country in countries" v-bind:value="country.value">{{country.name}}</option>
    </select>
    <spinner v-show="loader"/>
    <ul>
      <artist v-for="artist in artists" :artist="artist" :key="artist.mbid"/>
    </ul>
  </div>
</template>

<script>
  import Artist from "./components/Artist.vue"
  import Spinner from "./components/Spinner.vue"
  import getArtists from "./api"
  export default {
    name: 'app',
    data () {
      return {
        artists: [],
        countries: [
          {name: 'Colombia', value:'colombia'},
          {name: 'España', value:'spain'},
          {name: 'Argentina', value:'argentina'},
        ],
        selectedCountry: 'colombia',
        loader: true,
      }
    },
    components: {
      Artist,
      Spinner,
    },
    methods: {
      refreshArtists () {
        const self = this
        self.loader = true
        self.artists = []
        getArtists(this.selectedCountry).then(function (artists) {
          self.loader = false
          self.artists = artists
        })
      },
    },
    mounted () {
      this.refreshArtists()
    },
    watch: {
      selectedCountry () {
        this.refreshArtists()
      }
    },
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
