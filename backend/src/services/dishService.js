import * as dishModel from '../models/dishModels.js'

export async function getFilteredDishes(stateId, categoryId) {
  return dishModel.getDishes(stateId, categoryId)
}

export async function addDish(name, stateId, categoryId) {
  return dishModel.createDish(name, stateId, categoryId)
}