const storage = {
    fetch() {
        const arr = [];
        if(localStorage.length > 0) {
            for(let i=0; i<localStorage.length; i++) {
                if(localStorage.key(i) !== 'loglevel:webpack-dev-server') {
                    arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));      
                }
            }
        }

        return arr;
    },
};

const state = {
    todoItems: storage.fetch()
};

const getters = {
    storedTodoItems(state) {
        return state.todoItems
    }
};

const mutations = {
    addOneItem(state, payload) {
        const addTodoItem = {completed: false, item: payload.newTodoItem};
        localStorage.setItem(payload.newTodoItem, JSON.stringify(addTodoItem));
        state.todoItems.push(addTodoItem);
    },
    removeItem(state, payload) {
        localStorage.removeItem(payload.todoItem.item);
        state.todoItems.splice(payload.index, 1);
    },
    toggleComplete(state, payload) {
        state.todoItems[payload.index].completed = !state.todoItems[payload.index].completed;      
        localStorage.setItem(payload.todoItem.item, JSON.stringify(payload.todoItem));
    },
    clearAll(state) {
        localStorage.clear();
        state.todoItems = [];
    }
};

export default {
    state,
    getters,
    mutations
}