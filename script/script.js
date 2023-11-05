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
        filteredContacts : contactsList,
        search : '',
        moreInfo:false,
        iconSendMessage: false,
        contactStatus:false,
        contactStatusText:'',
        newName:'',
        newAvatar:'',
        errorNewContact:false,
        firstClickOnContacts: false,
        splashDisplayNone : false,
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
        if(this.newMessage.trim() !== ''){
          this.contacts[this.activeContact].messages.push({
            date: completeDate,
            message: this.newMessage,
            status: 'sent'
          });
          this.iconSendMessage = false;
          this.newMessage = '';
          this.response();
        }
      },
      response(){
        this.contactStatus = true;
        this.contactStatusText = 'online';
        const currentContactId = this.activeContact;
        setTimeout(() => {
          this.contactStatusText = 'Sta scrivendo...';
          setTimeout(()=>{
            this.contacts[currentContactId].messages.push({
              date: completeDate,
              message: 'ok',
              status: 'received'
            });
            this.contactStatusText = 'online';
            setTimeout(()=> {this.contactStatus = false}, 4000);
          },2500);
        }, 1500);
      },
      filterContacts(){
        if(this.search.trim() !== ''){
          this.filteredContacts = [];
          this.contacts.forEach(contact => {
            if(contact.name.toLowerCase().includes(this.search.toLowerCase())){
              this.filteredContacts.push(contact);
            }
          });
        }else{
          this.filteredContacts = this.contacts;
        }
        console.log(this.filteredContacts);
      },
      deliteMessage(message){
        let i=0;
        while(i < this.contacts[this.activeContact].messages.length){
          if(this.contacts[this.activeContact].messages[i] === message){
            this.contacts[this.activeContact].messages.splice(i,1);
          }
          i++;
        }
      },
      showInfo(){
        this.moreInfo = !this.moreInfo
      },
      showSendMessage(){
        if(this.newMessage.trim() !== ''){
          this.iconSendMessage = true;
        }else{
          this.iconSendMessage = false;
        }
      },
      deliteAllMessages(){
        this.contacts[this.activeContact].messages = [];
      },
      deliteChat(){
        this.contacts.splice(this.activeContact,1);
      },
      newContact(){
        if(this.newName.trim() === ''){
          this.errorNewContact = true;
          console.log('name');
          return
        }
        if(!this.newAvatar.includes('https://')){
          this.errorNewContact = true;
          console.log('avatar');
          return
        }
        let currentId = this.contacts[this.contacts.length - 1].id +1;
        this.contacts.push(
          {
            id: currentId,
            name: this.newName,
            avatar : this.newAvatar,
            messages:[],
          }
        );
        this.errorNewContact = false;
      },
    },
    created() {
      setTimeout(()=>{
        this.splashDisplayNone = true;
      },3000)
    }
  }).mount('#app')