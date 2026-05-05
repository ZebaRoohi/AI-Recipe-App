import * as dishService from '../services/dishService.js';

export async function getDishes(req, res) {
    const { stateId, categoryId } = req.query
    const dishes = await dishService.getFilteredDishes(stateId, categoryId)
    res.json(dishes)
}