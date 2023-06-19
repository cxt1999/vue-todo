<template>
  <li class="list-group-item d-flex align-items-center" :class="{ completed: todo.done, editing }">
    <div class="d-flex align-items-center">
      <input class= "toggle form-check-input me-2"
        type="checkbox"
        :checked="todo.done"
        @change="toggleTodo(todo)">
      <label v-text="todo.text" @dblclick="editing = true" class="fs-5"></label>
      <button class="btn btn-danger ms-1 btn-sm" @click="removeTodo(todo)"><i class="bi bi-x"></i></button>
    </div>
    <input class="edit form-control"
      v-show="editing"
      :value="todo.text"
      ref="input"
      @keyup.enter="doneEdit"
      @keyup.esc="cancelEdit"
      @blur="doneEdit">
  </li>
</template>

<script>
import { nextTick } from 'vue'
import { mapActions } from 'vuex'

export default {
  name: 'TodoItem',
  props: ['todo'],
  data () {
    return {
      editing: false
    }
  },
  directives: {
    focus (el, { value }, { context }) {
      if (value) {
        context.$nextTick(() => {
          el.focus()
        })
      }
    }
  },
  watch: {
    editing (v) {
      v && nextTick(() => { this.$refs.input.focus() })
    }
  },
  methods: {
    ...mapActions([
      'editTodo',
      'toggleTodo',
      'removeTodo'
    ]),
    doneEdit (e) {
      const value = e.target.value.trim()
      const { todo } = this
      if (!value) {
        this.removeTodo(todo)
      } else if (this.editing) {
        this.editTodo({
          todo,
          value
        })
        this.editing = false
      }
    },
    cancelEdit (e) {
      e.target.value = this.todo.text
      this.editing = false
    }
  }
}
</script>