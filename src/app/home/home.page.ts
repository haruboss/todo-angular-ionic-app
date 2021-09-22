import { TodoListService } from './../services/todo-list.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  todoName = '';
  todoList: string[];

  constructor(private todoService: TodoListService) {}

  ionViewWillEnter() {
    this.todoList = this.todoService.todoList;
    this.todoService.todoChanges.subscribe(todo => {
      this.todoList = todo;
    });
  }

  onAdd() {
    this.todoService.addTodo(this.todoName);
    this.todoName= '';
  }

  onRemove(name:string) {
    this.todoService.removeTodo(name)
  }
}
