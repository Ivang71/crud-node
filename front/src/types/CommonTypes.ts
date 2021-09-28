export interface Todo {
  _id: string
  text: string
}

export interface UiTodo extends Todo {
  editable: boolean
}

export interface PostResponse {
  acknowledged: boolean
  insertedId: string
}

