import {contactsList} from './data.js';
import {randomInteger} from './utility.js';
import {pariODispari} from './utility.js';
const { createApp } = Vue;

  createApp({
    data() {
      return {
        contacts : contactsList,
        activeContact : 0,
      }
    },
    methods:{
      LastMessageReceived(i){
        let lastM = this.lastMessage(i, 'received');
        return lastM.message;
      },
      isTheActive(i){
        this.activeContact = i;
      },
      dataLastMassage(i){
        let lastM = this.lastMessage(i, 'received');
        return lastM.date;
      },
      lastMessage(i, status){
        if(status === '') return this.contacts[i].messages[this.contacts[i].messages.length - 1];
        let j = this.contacts[i].messages.length - 1;
        while( j >= 0){
          if (this.contacts[i].messages[j].status === status ){
            return this.contacts[i].messages[j];
          }
          j--;
        }
        return '';
      }
    },
    amounted() {
    }
  }).mount('#app')