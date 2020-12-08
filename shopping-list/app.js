const app = new Vue({
    el: '#app',
    data: {
        title: 'Shopping List',
        newItem: '',
        qty: 0,
        purchased: false,
        itemList: []
    },
    methods: {
        addItem() {
            this.itemList.push({
                name: this.newItem,
                qty: 1,
                purchased: false
            });
            this.newItem = '';
        },
        deleteItem(item){
            const itemIndex = this.itemList.indexOf(item);
            this.itemList.splice(itemIndex, 1);
        },
        clear(){
            this.itemList = [];
        }
    }
});