export default class Model {
  constructor() {
    this.view = null;
    this.toDos = JSON.parse(localStorage.getItem("toDos"));
    if (!this.toDos || this.toDos.length < 1) {
      this.toDos = [
        {
          id: 0,
          title: "Lear JS",
          desciption: "Whatch JS Tutorials",
          completed: false,
        },
      ];
      this.currentId = 1;
    } else {
      this.currentId = this.toDos[this.toDos.length - 1].id + 1;
    }
  }

  setView(view) {
    this.view = view;
  }

  save() {
    localStorage.setItem("toDos", JSON.stringify(this.toDos));
  }

  getToDos() {
    return this.toDos.map((toDo) => ({ ...toDo }));
  }

  toggleCompleted(id) {
    const index = this.findToDo(id);
    const toDo = this.toDos[index];
    toDo.completed = !toDo.completed;
    this.save();
  }

  findToDo(id) {
    return this.toDos.findIndex((toDo) => toDo.id === id);
  }

  editToDo(id, values) {
    const index = this.findToDo(id);
    Object.assign(this.toDos[index], values);
    this.save();
  }

  addToDo(title, desciption) {
    const toDo = {
      id: this.currentId++,
      title,
      desciption,
      completed: false,
    };

    this.toDos.push(toDo);
    console.log(this.toDos);
    this.save();
    return { ...toDo };
  }

  removeToDo(id) {
    const index = this.findToDo(id);
    this.toDos.splice(index, 1);
    this.save();
  }
}
