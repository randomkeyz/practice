const app = Vue.createApp({
    data(){
        return {
            number: 37,
            currentNumber: 0
        }
    },
    watch: {
        currentNumber(value){
            if(value === this.number){
                const that = this;
                setTimeout(function(){
                    that.currentNumber = 0;
                }, 5000);
            }
        }
    },
    computed: {
        result(){
            if(this.currentNumber < this.number){
                return 'Not there yet!';
            } else if(this.currentNumber === this.number){
                return this.number;
            } else {
                return 'Too much!';
            }
        }
    },
    methods: {
        addNumber(num) {
            this.currentNumber = this.currentNumber + num;
        }
    }
});

app.mount('#assignment');