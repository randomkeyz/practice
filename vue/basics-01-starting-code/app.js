const app = Vue.createApp({
  data() {
    return {
      courseGoal: 'Learn Vue JS',
      vueLink: 'https://v3.vuejs.org'
    };
  },
});

app.mount("#user-goal");
