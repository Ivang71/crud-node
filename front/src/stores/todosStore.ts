import { todosApi } from 'api/todosApi'
import { action, makeAutoObservable, runInAction, toJS } from 'mobx'
import { Todo } from 'types/CommonTypes'
import { v4 as uid } from 'uuid'


class TodosStore {
  _todos: Todo[] = []

  get todos() {
    return toJS(this._todos)
  }

  constructor() {
    makeAutoObservable(this)
    this.load()
  }

  @action
  async load() {
    const todos = await todosApi.get()
    runInAction(() => {
      this._todos = todos
    })
  }

  @action
  async add(text: string) {
    const todo = await todosApi.post(text)
    runInAction(() => {
      this._todos.unshift(todo)
    })
  }

  @action
  async change(todo: Todo) {
    const r = await todosApi.put(todo)
    console.log('response', r)
  }

  @action
  async delete(id: string) {
    todosApi.delete(id)
    runInAction(() => this._todos = this._todos.filter(({ _id }) => _id !== id))
  }
}

export const todosStore = new TodosStore()
