import * as React from "react";

import TaskRepository, {Task} from "./TaskRepository"

interface MainState {
  newTaskTitle: string;
  tasks: Array<Task>;
}

class Main extends React.Component<any, MainState> {

  constructor(props: any) {
    super(props);
    this.state = {
      newTaskTitle: "",
      tasks: []
    };
  }

  componentDidMount() {
    this.getTasks();
  }

  onChangeNewTaskTitle(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({newTaskTitle: event.target.value})
  }

  addTask() {
    let task = new Task();
    task.setTitle(this.state.newTaskTitle);

    task.save().then(() => {
      this.setState({newTaskTitle: ""});
      this.getTasks();
    });
  }

  getTasks() {
    Task.findAll().then(tasks => {
      console.log(tasks);
      this.setState({tasks: tasks})
    })

  }

  deleteTask(task: Task) {
    task.delete().then(() => {
          this.getTasks();
        }
    );
  }

  renderTask() {
    return this.state.tasks.map((task: Task) =>
        <li key={task.id}>
          {task.getTitle()}
          <button onClick={() => this.deleteTask(task)}>x</button>
        </li>)
  }

  render() {
    return <div>
      <h1>Hello</h1>
      <input type="text" value={this.state.newTaskTitle}
             onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.onChangeNewTaskTitle(event)}/>
      <button onClick={() => this.addTask()}>Add</button>

      <ul>
        {this.renderTask()}
      </ul>
    </div>
  }
}

export default Main;