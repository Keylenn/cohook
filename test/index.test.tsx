import React from "react"
import { render, fireEvent } from "@testing-library/react"
import createContainer from "../src"

interface Todo {
  id: number
  text: string
  completed: boolean
}

describe("nestedDataChange", () => {
  let container: ReturnType<typeof createContainer>
  let nextTodoId: number
  let addTodoActionRenderCount: number
  let todosRenderCount: number

  const AddTodo = () => {
    addTodoActionRenderCount += 1
    const inputRef: any = React.useRef(null)
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (!inputRef.current.value.trim()) {
            return
          }
          container.commit((draft: any) => {
            nextTodoId += 1
            draft.current.push({
              id: nextTodoId,
              text: inputRef.current.value,
              completed: false,
            })
          })
          inputRef.current.value = ""
        }}
      >
        <input ref={inputRef} />
        <button type="submit">Add Todo</button>
      </form>
    )
  }

  const TodoList = () => {
    todosRenderCount += 1
    const todoList = container.useMapDataToState() as any[]
    return (
      <ul>
        {todoList.map((item: any) => (
          <li
            key={item.id}
            onClick={() => {
              const { id } = item
              container.commit((draft: any) => {
                draft.current = draft.current.map((todo: any) =>
                  todo.id === id
                    ? { ...todo, completed: !todo.completed }
                    : todo
                )
              })
            }}
            style={{
              textDecoration: item.completed ? "line-through" : "none",
            }}
            aria-hidden
          >
            {item.text}
          </li>
        ))}
      </ul>
    )
  }

  beforeEach(() => {
    nextTodoId = 0
    addTodoActionRenderCount = 0
    todosRenderCount = 0
    container = createContainer<Todo[]>([])
  })

  test("first render", () => {
    const App = () => (
      <>
        <AddTodo />
        <TodoList />
      </>
    )

    render(<App />)

    expect(nextTodoId).toBe(0)
    expect(todosRenderCount).toBe(1)
    expect(todosRenderCount).toBe(1)
  })
})
