import * as categoryService from '../services/categoryService.js'

export async function getCategories(req,res){
    const categories=await categoryService.getAllCategories()
    res.json(categories)
}