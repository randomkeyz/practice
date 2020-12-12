const app = Vue.createApp({
  data() {
    return {
      output1: "",
      output2: "",
    };
  },
  methods: {
    showAlert() {
      alert("Hello!");
    },
    showOutput1(event) {
      this.output1 = event.target.value;
    },
    showOutput2(event) {
      this.output2 = event.target.value;
    },
  },
});

app.mount("#assignment");
