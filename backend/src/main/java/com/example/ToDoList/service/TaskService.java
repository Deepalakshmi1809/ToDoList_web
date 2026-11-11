package com.example.ToDoList.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.ToDoList.model.Task;
import com.example.ToDoList.repository.TaskRepository;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    // Add new task
    public Task createTask(Task task) {
        task.setCompleted(false);
        return taskRepository.save(task);
    }

    // Get all tasks
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // Get task by ID
    public Task getTaskById(String id) {
        return taskRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Task not found with ID: " + id));
    }

    // Update task
    public Task updateTask(String id, Task updatedTask) {
        Task existingTask = getTaskById(id);

        existingTask.setTitle(updatedTask.getTitle());
        existingTask.setDescription(updatedTask.getDescription());
        existingTask.setDueDate(updatedTask.getDueDate());

        return taskRepository.save(existingTask);
    }

    // Complete or uncomplete task
    public Task toggleTask(String id) {
        Task task = getTaskById(id);

        task.setCompleted(!task.isCompleted());

        return taskRepository.save(task);
    }

    // Delete task
    public void deleteTask(String id) {
        Task task = getTaskById(id);
        taskRepository.delete(task);
    }
}

