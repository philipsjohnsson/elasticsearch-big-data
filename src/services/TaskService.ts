import { TaskRepository } from "../repositories/TaskRepository"
import { ITaskRepository } from "../repositories/ITaskRepository"
import { ITaskService } from "./ITaskService"

export class TaskService implements ITaskService {
  constructor(private ITaskRepository: ITaskRepository) {
    this.ITaskRepository = ITaskRepository
  }
  test() {
    this.ITaskRepository.test()
    console.log('TESTTEST')
  }
}