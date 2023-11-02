import {contactsList} from './data.js';
import {randomInteger} from './utility.js';
import {pariODispari} from './utility.js';
const { createApp } = Vue;

  createApp({
    data() {
      return {
        contacts : contactsList,
      }
    },
    methods:{

    },
    amounted() {
        
    }
  }).mount('#app')