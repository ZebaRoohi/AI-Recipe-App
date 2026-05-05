import * as stateService from '../services/stateService.js'


export async function getStates(req, res) {
    const states=await stateService.getAllStates()
    res.json(states)
}

export async function createState(req, res){
    const{name}=req.body
    if(!name) return res.status(400).json({error:'Missing name'})
    try{
        const state=await stateService.addState(name)
        res.status(201).json(state)
    }catch(err){
        if(err.code==='ALREADY_EXISTS') return res.status(409).json({error:'State already exists'})
        console.error(err)
        res.status(500).json({error:'Server error'})
    }
}