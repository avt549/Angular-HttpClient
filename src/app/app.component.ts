import {Component, OnInit} from '@angular/core'
import {HttpClient} from "@angular/common/http";

export interface Todo{
  completed: boolean
  title:string
  id?:number
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

 public todos: Todo[] = []

  todoTitle = ''
  constructor(private http: HttpClient) {
  }
  ngOnInit() {
    // Выполнение get запроса и вывод отовета в сонсоли
    this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=2')
      .subscribe(todos=>{console.log('Response :', todos)
        this.todos=todos

      })


  }

  addTodo() {
   // Валидация на пустую строку
   if(!this.todoTitle.trim()){
     return
   }
// Если данные есть то мы кладём их в переменную newTodo
   const newTodo: Todo = {
     title: this.todoTitle,
     completed: false
   }

//Выполняем метод пост который принимает в себя как минимум url и body
    this.http.post<Todo>('https://jsonplaceholder.typicode.com/todos',newTodo)
      .subscribe(todo=>{
        console.log('todo :', todo)
        //Добавляемм новый объект в массив todos
        this.todos.push(todo)

        //Присваиваем переменной пустую строку для тогочтобы очистить input
        this.todoTitle=''
    })


  }
}

