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
      foundLastMessage(i){
        let j = this.contacts[i].messages.length - 1;
        while( j >= 0){
          if (this.contacts[i].messages[j].status === 'sent' ){
            return this.contacts[i].messages[j].message;
          }
          j--;
        }
        return '';
      }
    },
    amounted() {
    }
  }).mount('#app')