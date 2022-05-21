import { todosApi } from 'api/todosApi'
import { action, makeAutoObservable, runInAction, toJS } from 'mobx'
import { Todo, TodoData, TodoDto } from 'types/CommonTypes'


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
  async add(text: Todo['text']) {
    const todo = await todosApi.post({
      text,
      position: this._todos.length && this._todos.at(-1)!.position + 1,
      completed: false
    })
    runInAction(() => {
      this._todos.push(todo)
    })
  }

  @action
  change(id: Todo['id'], todoDto: TodoDto) {
    todosApi.put(id, todoDto)
  }

  @action
  delete(deleteIds: number[]) {
    todosApi.delete(deleteIds)
    runInAction(() => this._todos = this._todos.filter(({ id }) => !deleteIds.includes(id)))
  }
}

export const todosStore = new TodosStore()
