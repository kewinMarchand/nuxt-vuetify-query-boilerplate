const PRICE_FORMAT = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })

export const formatPrice = (cents: number) => PRICE_FORMAT.format(cents / 100)
