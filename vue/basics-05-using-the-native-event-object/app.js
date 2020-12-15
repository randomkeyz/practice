const app = Vue.createApp({
  data() {
    return {
      counter: 0,
      name: '',
      lastName: ''
    };
  },
  watch: {
    counter(value){
      if(value > 50) {
        const that = this;
        setTimeout(function(){
          that.counter = 0;
        }, 2000);
      }
    }
  },
  computed: {
    fullName(){
      if(this.name === '' || this.lastName === ''){
          return '';
        }
        return this.name + ' ' + this.lastName;
      }
    },
  methods: {
    setName(event) {
      this.name = event.target.value;
    },
    add(num) {
      this.counter = this.counter + num;
    },
    reduce(num) {
      this.counter = this.counter - num;
      // this.counter--;
    },
    resetInput() {
      this.name = '';
    },
    outputFullName() {
      if(this.name === ''){
        return '';
      }
      return this.name + ' ' + 'Hanna';
    }
  }
});

app.mount('#events');
