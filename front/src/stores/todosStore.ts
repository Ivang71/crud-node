import { makeAutoObservable, toJS } from 'mobx'
import { v4 as uid } from 'uuid'
import { todosApi } from '../api/todosApi'
import { Todo } from '../Types/CommonTypes'


class TodosStore {
  _todos: Todo[] = []

  constructor() {
    makeAutoObservable(this)
    this.load()
  }

  async load() {
    this._todos = await todosApi.get()
  }

  async add(text: string) {
    const tmpId = uid()
    this._todos.push({ _id: tmpId, text })
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

  async change(_id: string, text: string) {

  }

  async delete(_id: string) {

  }

  get todos() {
    return toJS(this._todos)
  }
}

export const todosStore = new TodosStore()
