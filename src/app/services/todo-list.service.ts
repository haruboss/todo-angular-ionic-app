import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { StorageService } from './storage.service';

  const todoListStorageKey = 'Todo_List';
  const defaultList= ['party time']

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  todoList:string[];

  constructor(private storageService: StorageService) {
     this.todoList = storageService.getData(todoListStorageKey) || defaultList;
  }
  todoChanges = new Subject<string[]>();

  saveList() {
    this.storageService.setData(todoListStorageKey, this.todoList);
    this.todoChanges.next(this.todoList)
  }

  addTodo(name:string) {
    this.todoList.push(name);
    this.saveList();
    this.todoChanges.next(this.todoList)
  }

  removeTodo(name: string){
    const index = this.todoList.indexOf(name);
    this.todoList.splice(index, 1);
    this.saveList();
    this.todoChanges.next(this.todoList)
  }
}

