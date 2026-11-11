
package com.example.ToDoList_backend.repository;

import com.example.ToDoList_backend.model.Todo;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TodoRepository extends MongoRepository<Todo, String> {

}
