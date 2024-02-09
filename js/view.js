import AddToDo from "./components/add-todo.js";
import Modal from "./components/modal.js";
import Filters from "./components/filters.js";

export default class View {
  constructor() {
    this.model = null;
    this.table = document.getElementById("table");
    this.addToDoForm = new AddToDo();
    this.modal = new Modal();
    this.filters = new Filters();
    this.addToDoForm.onClick((title, desciption) =>
      this.addToDo(title, desciption)
    );
    this.modal.onClick((id, values) => this.editToDo(id, values));
    this.filters.onClick((filters) => this.filter(filters));
  }

  setModel(model) {
    this.model = model;
  }

  render() {
    const toDos = this.model.getToDos();
    toDos.forEach((toDo) => this.createRow(toDo));
  }

  filter(filters) {
    const { type, words } = filters;
    const [, ...rows] = this.table.getElementsByTagName("tr");
    for (const row of rows) {
      const [title, description, completed] = row.children;
      let shouldHide = false;

      if (words) {
        shouldHide =
          !title.innerText.includes(words) &&
          !description.innerText.includes(words);
      }

      const shouldBeCompleted = type === "completed";
      const isCompleted = completed.children[0].checked;

      if (type !== "all" && shouldBeCompleted !== isCompleted) {
        shouldHide = true;
      }

      if (shouldHide) {
        row.classList.add("d-none");
      } else row.classList.remove("d-none");
    }
  }

  toggleCompleted(id) {
    this.model.toggleCompleted(id);
  }

  editToDo(id, values) {
    this.model.editToDo(id, values);
    const row = document.getElementById(id);
    row.children[0].innerText = values.title;
    row.children[1].innerText = values.description;
    row.children[2].children[0].checked = values.completed;
  }

  addToDo(title, desciption) {
    const toDo = this.model.addToDo(title, desciption);
    this.createRow(toDo);
  }

  removeToDo(id) {
    this.model.removeToDo(id);
    document.getElementById(id).remove();
  }

  createRow(toDo) {
    const row = table.insertRow();
    row.setAttribute("id", toDo.id);
    row.innerHTML = `<td>${toDo.title}</td>
    <td>${toDo.desciption}</td>
    <td class="text-center">
                  
                </td>
                <td class="text-right">
               
              
                </td>`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = toDo.completed;
    checkbox.onclick = () => this.toggleCompleted(toDo.id);
    row.children[2].appendChild(checkbox);

    const editBtn = document.createElement("button");
    editBtn.classList.add("btn", "btn-primary", "mb-1");
    editBtn.innerHTML = '<i class="fa fa-pencil"></i>';
    editBtn.setAttribute("data-toggle", "modal");
    editBtn.setAttribute("data-target", "#modal");
    editBtn.onclick = () =>
      this.modal.setValues({
        id: toDo.id,
        title: row.children[0].innerText,
        description: row.children[1].innerText,
        completed: row.children[2].children[0].checked,
      });
    row.children[3].appendChild(editBtn);

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("btn", "btn-danger", "mb-1", "ml-1");
    removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
    removeBtn.onclick = () => {
      this.removeToDo(toDo.id);
    };
    row.children[3].appendChild(removeBtn);
  }
}
