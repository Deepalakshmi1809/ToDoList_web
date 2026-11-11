package com.example.ToDoList.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.ToDoList.model.Task;

@Repository
public interface TaskRepository extends MongoRepository<Task, String> {

}

