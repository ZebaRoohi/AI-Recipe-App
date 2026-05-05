import * as categoryModel from '../models/categoryModels.js'

export async function getAllCategories() {
  return categoryModel.getCategories()
}

export async function addCategory(name) {
  return categoryModel.createCategory(name)
}