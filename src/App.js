import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import TagsButtonsList from './components/TagsButtonsList'
import './App.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class App extends Component {
  state = {
    input: '',
    option: tagsList[0].optionId,
    tasksList: [],
    selectedOption: '',
  }

  optionChange = event => {
    this.setState({option: event.target.value})
  }

  inputChange = event => {
    this.setState({input: event.target.value})
  }

  tagClicked = id => {
    this.setState(prev => ({
      tasksList: prev.tasksList.map(eachItem => {
        if (eachItem.tag.toUpperCase() === id) {
          return {...eachItem, isActive: true}
        }
        if (eachItem.tag.toUpperCase() !== id) {
          return {...eachItem, isActive: false}
        }
        return eachItem
      }),
      selectedOption: id,
    }))
  }

  submitTask = event => {
    event.preventDefault()
    const {input, option} = this.state

    const eachTask = {
      id: uuidv4(),
      task: input,
      tag: option.toLowerCase(),
      isActive: true,
    }

    this.setState(prev => ({
      tasksList: [...prev.tasksList, eachTask],
      input: '',
      option: tagsList[0].optionId,
    }))
  }

  render() {
    const {input, option, tasksList, selectedOption} = this.state

    const modifiedTasksList = tasksList.filter(
      eachItem => eachItem.isActive === true,
    )

    console.log(option)

    const modifiedTasksListLength = modifiedTasksList.length

    return (
      <div className="my_tasks_div">
        <form className="my_tasks_left_section" onSubmit={this.submitTask}>
          <h1 className="task_header">Create a Task!</h1>
          <label htmlFor="task" className="task_label">
            Task
          </label>
          <input
            id="task"
            placeholder="Enter the task here"
            type="text"
            value={input}
            className="input_box"
            onChange={this.inputChange}
          />
          <label htmlFor="tags" className="task_label">
            Tags
          </label>
          <select
            id="tags"
            className="input_box"
            value={option}
            onChange={this.optionChange}
          >
            {tagsList.map(eachTag => (
              <option key={eachTag.optionId} value={eachTag.optionId}>
                {eachTag.displayText}
              </option>
            ))}
          </select>
          <button type="submit" className="add_button">
            Add Task
          </button>
        </form>
        <div className="my_tasks_right_section">
          <h1 className="tags_header">Tags</h1>
          <ul className="tags_button_container">
            {tagsList.map(eachTag => (
              <TagsButtonsList
                key={eachTag.optionId}
                tagItem={eachTag}
                tagClicked={this.tagClicked}
                isActive={eachTag.optionId === selectedOption}
              />
            ))}
          </ul>
          <h1 className="tags_header">Tasks</h1>
          {modifiedTasksListLength !== 0 ? (
            <ul className="each_task_ul">
              {modifiedTasksList.map(eachTask => (
                <li key={eachTask.id} className="each_task_li">
                  <p className="task_name">{eachTask.task}</p>
                  <p className="tag_name">
                    {eachTask.tag.charAt(0).toUpperCase() +
                      eachTask.tag.slice(1)}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="no_tasks_div">
              <p className="no_tasks_text">No Tasks Added Yet</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default App
