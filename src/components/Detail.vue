<template>
    <div id="detail" v-if="movie">
        <movie-item v-bind:movie="movie.movie"></movie-item>
    </div>
</template>

<script>
    import MovieItem from './MovieItem.vue';
    export default {
        props: [ 'movies'],
        computed: {
          movie() {
              // filter through movies and return true for all movies with the id from the route param id
              let movie = this.movies.find(movie => movie.id === this.$route.params.id);
              // return null if no movie was found
              return movie ? movie : null;
          }
        },
        components:  {
            MovieItem
        }
    }
</script>