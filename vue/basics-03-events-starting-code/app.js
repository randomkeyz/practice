const app = Vue.createApp({
  data() {
    return {
      counter: 0,
      name: "",
      confirmedName: "",
    };
  },
  methods: {
    confirmName() {
      this.confirmedName = this.name;
    },
    submitForm() {
      console.log("Submitted!");
    },
    setName(event, lastName) {
      this.name = event.target.value + " " + lastName;
    },
    add(num) {
      this.counter = this.counter + num;
    },
    subtract(num) {
      this.counter = this.counter - num;
    },
  },
});

app.mount("#events");
