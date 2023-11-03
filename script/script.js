import {contactsList} from './data.js';
import {randomInteger} from './utility.js';
import {pariODispari} from './utility.js';
const dt = luxon.DateTime;
const completeDate = dt.now().setLocale('it').toFormat('dd//yyyy hh:mm:ss');
const { createApp } = Vue;

  createApp({
    data() {
      return {
        contacts : contactsList,
        activeContact : 0,
        newMessage : '',
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
      },
      addNewMessage(){
        if(this.newMessage !== ''){
          this.contacts[this.activeContact].messages.push({
            date: completeDate,
            message: this.newMessage,
            status: 'sent'
          });
          this.newMessage = '';
          this.response();
        }
      },
      response(){
        setTimeout(()=>{
          this.contacts[this.activeContact].messages.push({
            date: completeDate,
            message: 'ok',
            status: 'received'
          });
        },2000);
      }
    },
    amounted() {
    }
  }).mount('#app')