export class TasksLoadError extends Error {
  constructor(options?: ErrorOptions) {
    super('Impossible de charger les tâches pour le moment.', options)
    this.name = 'TasksLoadError'
  }
}
