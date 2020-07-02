<template>
    <div class="inputBox shadow">
        <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo">
        <span v-on:click="addTodo" class="addContainer">
            <i class="fas fa-plus-circle addBtn"></i>
        </span>

        <Modal v-if="modalInfo.showModal" @close="modalInfo.showModal = false">
            <!--
                you can use custom content here to overwrite
                default content
            -->
            <h3 slot="header">{{modalInfo.header}}</h3>
            <h4 slot="body">{{modalInfo.body}}</h4>
            <h4 slot="footer">{{modalInfo.footer}}</h4>
        </Modal>
    </div>
</template>

<script>
import Modal from './common/Modal'

export default {
    components: {
        Modal
    },
    data: function() {
        return {
            newTodoItem: "",
            modalInfo: {
                showModal: false,
                header: '',
                body: '',
                footer: ''
            }
        }
    },
    methods: {
        addTodo: function() {
            
            
            if((this.newTodoItem).replace(/ /g, "") !== "" && !(localStorage.getItem(this.newTodoItem) || false)) {
                this.$emit('addTodoEvent', this.newTodoItem);
                this.clearInput();
            }else {
                if((this.newTodoItem).replace(/ /g, "") == "") {
                    let errorCode = {
                        showModal: true,
                        header: '등록오류',
                        body: '#1. 빈칸 입력',
                        footer: '빈 일정은 등록할 수 없습니다.'
                    };
                    this.modalInfo = errorCode;
                    this.clearInput();
                } else {
                    let errorCode = {
                        showModal: true,
                        header: '등록오류',
                        body: '#2. 중복 입력',
                        footer: '이미 등록된 일정은 입력할 수 없습니다.'
                    }
                    this.modalInfo = errorCode;
                }
            }
        },
        clearInput: function() {
            this.newTodoItem = "";
        }
    }
}
</script>

<style scoped>
    input:focus {
        outline: none;
    }

    .inputBox {
        background: white;
        height: 50px;
        line-height: 50px;
        border-radius: 5px;
    }

    .inputBox input {
        border-style: none;
        font-size: 0.9rem;
    }

    .addContainer {
        float: right;
        background: linear-gradient(to right, #6478FB, #8763FB);
        display: block;
        width: 3rem;
        border-radius: 0 5px 5px 0;
    }

    .addBtn {
        color: white;
        vertical-align: middle;
        font-size: 1.5rem;
    }
</style>