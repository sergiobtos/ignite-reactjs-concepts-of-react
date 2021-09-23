import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number
  title: string
  isComplete: boolean
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState('')

  // string option to generate id
  function guidGenerator() {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }
    return (
      S4() +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      S4() +
      S4()
    )
  }

  function handleCreateNewTask() {
    let isAlreadyIncluded: Task | undefined = tasks.find(
      result => result.title === newTaskTitle
    )

    if (isAlreadyIncluded === undefined) {
      if (newTaskTitle != '') {
        const task: Task = {
          id: Math.random(),
          title: newTaskTitle,
          isComplete: false
        }
        setTasks(curTask => [...curTask, task])
        setNewTaskTitle('')
      } else {
        alert('Task title can not be blank')
      }
    } else {
      setNewTaskTitle('')
      alert('Task already exists!!! Try again. ')
    }
  }

  function handleToggleTaskCompletion(id: number) {
    const newArray = tasks.slice()
    let index = newArray.findIndex(t => t.id === id)
    newArray[index].isComplete = !newArray[index].isComplete
    setTasks(newArray)
  }

  function handleRemoveTask(id: number) {
    if (id > 0) {
      const newArray = tasks.slice()
      let index = newArray.findIndex(t => t.id === id)
      newArray.splice(index, 1)
      setTasks(newArray)
    } else {
      console.log('error')
    }
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={e => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div
                className={task.isComplete ? 'completed' : ''}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  )
}
