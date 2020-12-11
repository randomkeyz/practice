const app = Vue.createApp({
    data() {
        return {
            name: 'Natasha',
            age: 29,
            imgUrl: 'https://i.pinimg.com/564x/46/dd/16/46dd162231f32b37fbaeb265f92664d6.jpg'
        }
    },
    methods: {
        agePlusFive(){
            return this.age + 5;
        },
        favNum(){
            const randomNum = Math.random();
            return randomNum;
        }
    }
});

app.mount('#assignment');