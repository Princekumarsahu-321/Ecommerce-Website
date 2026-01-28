const express=require('express');
const router=express.Router();
const MenuItem = require('../module/menuItems');

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newMenuItem = new MenuItem(data);
        const response = await newMenuItem.save();
        console.log('menu item saved');
        res.status(201).json(response);

    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
});



router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log('menu items fetched');
        res.status(200).json(data);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports=router