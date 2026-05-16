// services/productService.js — Servicio CRUD simulado con localStorage
// Los productos se precargan desde products.json y se gestionan en localStorage

const STORAGE_KEY = 'cafe_aroma_products'

/**
 * Carga productos desde localStorage.
 * Si no existen aún, los inicializa desde el JSON externo.
 * @returns {Promise<Array>}
 */
export async function getProducts() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    return JSON.parse(stored)
  }
  // Primera vez: cargar desde el JSON y guardar en localStorage
  const res = await fetch('/data/products.json')
  const products = await res.json()
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
  return products
}

/**
 * Guarda un nuevo producto en localStorage.
 * Le asigna un ID único basado en la fecha actual.
 * @param {Object} product
 * @returns {Promise<Array>} lista actualizada
 */
export async function addProduct(product) {
  const products = await getProducts()
  const newProduct = { ...product, id: Date.now() }
  products.push(newProduct)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
  return products
}

/**
 * Edita un producto existente buscándolo por ID.
 * @param {Object} updatedProduct
 * @returns {Promise<Array>} lista actualizada
 */
export async function updateProduct(updatedProduct) {
  const products = await getProducts()
  const index = products.findIndex(p => p.id === updatedProduct.id)
  if (index !== -1) {
    products[index] = updatedProduct
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
  }
  return products
}

/**
 * Elimina un producto por ID.
 * @param {number} id
 * @returns {Promise<Array>} lista actualizada
 */
export async function deleteProduct(id) {
  const products = await getProducts()
  const filtered = products.filter(p => p.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
  return filtered
}
