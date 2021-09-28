import { action, makeAutoObservable, runInAction, toJS } from 'mobx'
import { v4 as uid } from 'uuid'
import { todosApi } from '../api/todosApi'
import { Todo, UiTodo } from '../types/CommonTypes'


class TodosStore {
  _todos: UiTodo[] = []

  get todos() {
    return toJS(this._todos)
  }

  constructor() {
    makeAutoObservable(this)
    this.load()
  }

  @action
  async load() {
    const todos = (await todosApi.get()).map((t) =>( {...t, editable: false}))
    runInAction(() => {
      this._todos = todos
    })
  }

  async add(text: string) {
    const tmpId = uid()
    this._todos.push({ _id: tmpId, text, editable: false })
    try {
      const { insertedId } = await todosApi.add(text)
      this._todos.forEach((todo) => {
        if (todo._id === tmpId) {
          todo._id = insertedId
        }
      })
    } catch (err) {
      this._todos = this._todos.filter(({ _id }) => _id !== tmpId)
      console.error('erasdf', err)
    }
  }

  async change(todo: Todo) {
    const r = await todosApi.change(todo)
    console.log('response', r)
  }

  async delete(_id: string) {
    const r = await todosApi.delete(_id)
    // console.log('response', r)
  }
}

export const todosStore = new TodosStore()
