import React, { useState } from 'react';
import './CalculatorCalories.css'; 

const CalculatorCalories = () => {
  const [image, setImage] = useState(null);
  const [foodDatabase, setFoodDatabase] = useState([
    { name: 'Pizza', calories: 266, protein: 11, fat: 10, carbs: 33 },
    { name: 'Burger', calories: 295, protein: 17, fat: 12, carbs: 30 },
    { name: 'Sushi', calories: 200, protein: 8, fat: 5, carbs: 28 },
  ]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [newDish, setNewDish] = useState({ name: '', calories: '', protein: '', fat: '', carbs: '' });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      setSelectedFood(null);
    };
    reader.readAsDataURL(file);
  };

  const handleSelect = (food) => {
    setSelectedFood(food);
  };

  const handleNewDishChange = (e) => {
    const { name, value } = e.target;
    setNewDish({ ...newDish, [name]: value });
  };

  const handleAddDish = () => {
    if (!newDish.name || !newDish.calories) return;
    const newFood = {
      name: newDish.name,
      calories: parseFloat(newDish.calories),
      protein: parseFloat(newDish.protein) || 0,
      fat: parseFloat(newDish.fat) || 0,
      carbs: parseFloat(newDish.carbs) || 0,
    };
    setFoodDatabase([...foodDatabase, newFood]);
    setNewDish({ name: '', calories: '', protein: '', fat: '', carbs: '' });
  };

  const reset = () => {
    setImage(null);
    setSelectedFood(null);
  };

  return (
    <div className="page">
      <div className="card">
        <h2 className="title">Upload Your Meal</h2>

        {!image && (
          <label className="upload-label">
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden-input" />
            📸 Click to upload meal photo
          </label>
        )}

        {image && (
          <>
            <img src={image} alt="Meal" className="meal-image" />
            <p className="subtitle">What dish is this?</p>
            <div className="food-buttons">
              {foodDatabase.map((food, idx) => (
                <button key={idx} onClick={() => handleSelect(food)} className="food-button">
                  {food.name}
                </button>
              ))}
            </div>
          </>
        )}

        {selectedFood && (
          <div className="nutrition-box">
            <h3>{selectedFood.name}</h3>
            <p>Calories: <strong>{selectedFood.calories}</strong> kcal</p>
            <p>Protein: <strong>{selectedFood.protein}</strong> g</p>
            <p>Fat: <strong>{selectedFood.fat}</strong> g</p>
            <p>Carbs: <strong>{selectedFood.carbs}</strong> g</p>
          </div>
        )}

        <div className="form-section">
          <h4>Add a New Dish</h4>
          <div className="form-grid">
            <input name="name" placeholder="Name" value={newDish.name} onChange={handleNewDishChange} />
            <input name="calories" placeholder="kcal" type="number" value={newDish.calories} onChange={handleNewDishChange} />
            <input name="protein" placeholder="Protein (g)" type="number" value={newDish.protein} onChange={handleNewDishChange} />
            <input name="fat" placeholder="Fat (g)" type="number" value={newDish.fat} onChange={handleNewDishChange} />
            <input name="carbs" placeholder="Carbs (g)" type="number" value={newDish.carbs} onChange={handleNewDishChange} />
          </div>
          <button onClick={handleAddDish} className="add-button">Add Dish</button>
        </div>

        {(image || selectedFood) && (
          <button onClick={reset} className="reset-button">Upload Another</button>
        )}
      </div>
    </div>
  );
};

export default CalculatorCalories;
