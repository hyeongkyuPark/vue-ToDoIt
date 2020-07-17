const addOneItem = (state, payload) => {
    const addTodoItem = {completed: false, item: payload.newTodoItem};
    localStorage.setItem(payload.newTodoItem, JSON.stringify(addTodoItem));
    state.todoItems.push(addTodoItem);
};
const removeItem = (state, payload) => {
    localStorage.removeItem(payload.todoItem.item);
    state.todoItems.splice(payload.index, 1);
};
const toggleComplete = (state, payload) => {
    state.todoItems[payload.index].completed = !state.todoItems[payload.index].completed;      
    localStorage.setItem(payload.todoItem.item, JSON.stringify(payload.todoItem));
};
const clearAll = (state) => {
    localStorage.clear();
    state.todoItems = [];
};

export {addOneItem, removeItem, toggleComplete, clearAll};