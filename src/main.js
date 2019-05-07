import Vue from 'vue';
import './style.scss';

import VueResource from 'vue-resource';
Vue.use(VueResource);

import moment from 'moment-timezone';
moment.tz.setDefault("UTC");
// Define moment to be usable on any component
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } });

import { checkFilter, setDay } from './util/bus';
const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', { get() { return this.$root.bus } });

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import routes from './util/routes';


const router = new VueRouter({routes});

new Vue({
    el: '#app',
    data: {
        genre: [],
        time: [],
        movies: [],
        moment,
        day: moment(),
        bus
    },
    created() {
        this.$http.get('/api').then(response => {
            this.movies = response.data;
        });
        this.$bus.$on('check-filter', checkFilter.bind(this));
        this.$bus.$on('set-day', setDay.bind(this));
    },
    router
});

// import already created addClass / removeClass functions from the helpers.js file
import { addClass, removeClass } from './util/helpers';

let mouseOverHandler = function(event) {
    // go to the parent(session-time-wrapper) of the target(session-time) than get the span element(tooltip)
    let span = event.target.parentNode.getElementsByTagName('SPAN')[0];
    addClass(span, 'tooltip-show');
}
let mouseOutHandler = function(event) {
    // go to the parent(session-time-wrapper) of the target(session-time) than get the span element(tooltip)
    let span = event.target.parentNode.getElementsByTagName('SPAN')[0];
    removeClass(span, 'tooltip-show');
}
Vue.directive('tooltip', {
   bind(el, bindings) {
       // el in this case is the class session-time-wrapper
       // create span element with seats available text in it
       let span = document.createElement('SPAN');
       let text = document.createTextNode('Seats available: 200');
       span.appendChild(text);
       // add tooltip class to just created span
       addClass(span, 'tooltip');
       // add span as a child to el(session-time-wrapper)
       el.appendChild(span);
       // get the div(session-time) and add mouseover and mouseout event listener for displaying and hiding tooltip
       let div = el.getElementsByTagName('DIV')[0];
       div.addEventListener('mouseover', mouseOverHandler);
       div.addEventListener('mouseout', mouseOutHandler);
       // add touch start and end for mobile users cause they can't mouse over and out
       div.addEventListener('touchstart', mouseOutHandler);
       div.addEventListener('touchend', mouseOutHandler);
   },
    // when the element is removed from the dom we are still listening for the event taking up CPU and memory so we need to remove the event listener when the element isn't on the page
    unbind(el) {
        let div = el.getElementsByTagName('DIV')[0];
        div.removeEventListener('mouseover', mouseOverHandler);
        div.removeEventListener('mouseout', mouseOutHandler);
        // add touch start and end for mobile users cause they can't mouse over and out
        div.removeEventListener('touchstart', mouseOutHandler);
        div.removeEventListener('touchend', mouseOutHandler);
    }
});