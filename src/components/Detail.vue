<template>
    <div id="detail" v-if="movie">
        <movie-item v-bind:movie="movie">
            <div class="movie-details">
                <p class="movie-genre">{{ movie.Genre }}</p>
                <p class="movie-plot">{{ movie.Plot }}</p>
                <table>
                    <tr><td>Released date:</td><td>{{ movie.Released }}</td></tr>
                    <tr><td>Running time:</td><td>{{ movie.Runtime }}</td></tr>
                    <tr><td>Director:</td><td>{{ movie.Director }}</td></tr>
                    <tr><td>Cast:</td><td>{{ movie.Actors }}</td></tr>
                </table>
            </div>
        </movie-item>
        <div class="home">
            <router-link v-bind:to="{ name: 'home' }">Back to results</router-link>
        </div>
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
              return movie ? movie.movie : null;
          }
        },
        components:  {
            MovieItem
        }
    }
</script>