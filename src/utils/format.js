export const currency = (v) => {
  if (v == null) return '-' 
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(v)
}
