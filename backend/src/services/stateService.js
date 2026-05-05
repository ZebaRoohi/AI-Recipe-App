import * as stateModel from '../models/stateModels.js'

export async function getAllStates() {
  return stateModel.getStates()
}

export async function addState(name) {
  return stateModel.createState(name)
}