

require('./bootstrap');
import Form from 'vform'

window.Form = Form;
window.Vue = require('vue');


require('./components/RegisterComponent');
const app = new Vue({
    el: '#app',
});
