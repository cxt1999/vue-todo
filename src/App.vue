<template>
  <section class="container">
    <!-- header -->
    <header class="header my-3">
      <h1>Todos</h1>
      <input class="form-control"
        autofocus
        autocomplete="off"
        placeholder="What needs to be done?"
        @keyup.enter="addTodo">
    </header>

    <!-- main section -->
    <section class="main" v-show="todos.length">
      <input class="form-check-input me-1" id="toggle-all"
        type="checkbox"
        :checked="allChecked"
        @change="toggleAll(!allChecked)">
      <label for="toggle-all">Select All</label>
      <ul class="list-group mt-2 ">
        <TodoItem
          v-for="(todo, index) in filteredTodos"
          :key="index"
          :todo="todo"
        />
      </ul>
    </section>
    <!-- footer -->
    <footer class="footer card p-2 mt-4" v-show="todos.length">
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
        {{ pluralize(remaining, 'item') }} left
      </span>
      <div class="btn-group list-inline">
          <a :href="'#/' + key"  v-for="(val, key) in filters" :key="key"
            :class="{ active: visibility === key }" class="btn btn-primary"
            @click="visibility = key">{{ capitalize(key) }}
          </a>
      </div>
      <button class="clear-completed btn btn-danger mt-2"
        v-show="todos.length > remaining"
        @click="clearCompleted">
        Clear completed
      </button>
    </footer>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import TodoItem from './components/TodoItem.vue'

const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.done),
  completed: todos => todos.filter(todo => todo.done)
}

export default {
  components: { TodoItem },
  data () {
    return {
      visibility: 'all',
      filters: filters,
    }
  },
  computed: {
    todos () {
      return this.$store.state.todos
    },
    allChecked () {
      return this.todos.every(todo => todo.done)
    },
    filteredTodos () {
      return filters[this.visibility](this.todos)
    },
    remaining () {
      return this.todos.filter(todo => !todo.done).length
    }
  },
  methods: {
    ...mapActions([
      'toggleAll',
      'clearCompleted'
    ]),
    addTodo (e) {
      const text = e.target.value.trim()
        this.$store.dispatch('addTodo', text);
      e.target.value = ''
    },
    pluralize (n, w) {
      return n === 1 ? w : (w + 's')
    },
    capitalize (s) {
      return s.charAt(0).toUpperCase() + s.slice(1)
    }
  }
}
</script>

