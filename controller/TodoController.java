
package com.example.ToDoList_backend.controller;

import com.example.ToDoList_backend.model.Todo;
import com.example.ToDoList_backend.repository.TodoRepository;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "http://localhost:5173")
public class TodoController {

    private final TodoRepository todoRepository;

    public TodoController(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    // Get all tasks
    @GetMapping
    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    // Add a task
    @PostMapping
    public Todo createTodo(@RequestBody Todo todo) {
        return todoRepository.save(todo);
    }

    // Update a task
    @PutMapping("/{id}")
    public Todo updateTodo(
            @PathVariable String id,
            @RequestBody Todo todo) {

        todo.setId(id);
        return todoRepository.save(todo);
    }

    // Delete a task
    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable String id) {
        todoRepository.deleteById(id);
    }
}
