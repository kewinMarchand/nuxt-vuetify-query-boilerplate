export class CatalogLoadError extends Error {
  constructor(options?: ErrorOptions) {
    super('Impossible de charger les produits pour le moment.', options)
    this.name = 'CatalogLoadError'
  }
}
