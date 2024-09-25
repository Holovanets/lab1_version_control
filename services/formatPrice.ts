export const formatPrice = (coins: number) => {
  const hryvnia = coins / 100
  const formattedPrice = hryvnia.toFixed(2)
  return formattedPrice.replace('.', ',') + ' ₴'
}