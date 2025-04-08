const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// In-memory mock database (use a real DB in production)
let equipmentList = [
  { id: 1, equipmentName: 'Tractor', features: 'Powerful', condition: 'Good', price: 300 },
  { id: 2, equipmentName: 'Plow', features: 'Heavy Duty', condition: 'Excellent', price: 350 },
];

// Get all equipment
app.get('/equipments', (req, res) => {
  res.json(equipmentList);
});

// Add new equipment
app.post('/equipments', (req, res) => {
  const { equipmentName, features, condition, price } = req.body;
  const newEquipment = { 
    id: equipmentList.length + 1, 
    equipmentName, 
    features, 
    condition, 
    price 
  };
  equipmentList.push(newEquipment);
  res.status(201).json(newEquipment);
});

// Update equipment price
app.put('/equipments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedPrice = req.body.price;
  
  const equipment = equipmentList.find(equip => equip.id === id);
  if (equipment) {
    equipment.price = updatedPrice;
    res.json(equipment);
  } else {
    res.status(404).json({ message: 'Equipment not found' });
  }
});

// Delete equipment
app.delete('/equipments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  equipmentList = equipmentList.filter(equip => equip.id !== id);
  res.status(200).json({ message: 'Equipment deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
