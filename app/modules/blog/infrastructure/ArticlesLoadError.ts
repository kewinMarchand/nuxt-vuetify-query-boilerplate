export class ArticlesLoadError extends Error {
  constructor(options?: ErrorOptions) {
    super('Impossible de charger les derniers articles pour le moment.', options)
    this.name = 'ArticlesLoadError'
  }
}
