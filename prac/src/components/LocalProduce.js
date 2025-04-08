import React, { useState } from "react";
import style from "../mystyle.css"; // Import CSS for styling

const LocalProduce = () => {
  // List of categories with information
  const categories = [
    {
      name: "CEREALS",
      info: `India is the world's second-largest producer of rice, wheat, and other cereals.
      The global demand for cereals has created an excellent opportunity for the export of high-quality Indian cereal products.
      
      India cultivates a diverse range of cereals, including rice, wheat, maize, barley, and millets (such as pearl millet, finger millet, and sorghum), which are renowned for their exceptional quality and nutritional value.
      
      Growing Conditions:
      - Rice: Warm, humid conditions (20–35°C) with ample water.
      - Wheat: Cool climates (14–18°C during sowing, 20–25°C at harvest), fertile soil.
      - Maize: Moderate temperatures (21–27°C), well-distributed rainfall (600–1000 mm).
      - Barley: Cooler climates, grows in poor soils with low water availability.
      - Millets: Drought-resistant, suited for arid/semi-arid regions with low rainfall (400–600 mm).
      
      Key Producing Regions:
      - Indo-Gangetic Plains (Punjab, Haryana, Uttar Pradesh, Bihar) - Major producers of rice, wheat, and maize.
      - Madhya Pradesh & Rajasthan - Large-scale wheat, maize, and millet production.
      - Karnataka - Produces multiple millet varieties like finger millet (Ragi), pearl millet (Bajra), and sorghum (Jowar).`,
    },
    {
      name: "FRESH FRUITS & VEGETABLES",
      info: `India's diverse climate supports a variety of fruits and vegetables:
      
      - Mangoes: Require tropical climate, well-drained soil, moderate rainfall. (Top producers: Uttar Pradesh, Andhra Pradesh, Maharashtra).
      - Bananas: Thrive in rich, loamy soil, high humidity (Top producers: Tamil Nadu, Gujarat, Maharashtra).
      - Grapes: Grown in sandy loam soil, warm days, cool nights (Top producer: Maharashtra - Nasik, Sangli).
      - Tomatoes: Grow in fertile, well-drained soil, need consistent moisture (Top producers: Andhra Pradesh, Karnataka, Madhya Pradesh).`,
    },
    {
      name: "PROCESSED FOOD",
      info: `India's processed food industry includes packaged snacks, ready-to-eat meals, and dairy products. 

      - Mangoes: India is the world's largest producer; major cultivation in Maharashtra (Ratnagiri, Devgad), Uttar Pradesh, Andhra Pradesh.
      - Basmati Rice: Grown in Punjab, Haryana, and Western Uttar Pradesh.
      - Spices (Black Pepper, Cardamom, Turmeric): Predominantly cultivated in Kerala, Karnataka, and Tamil Nadu.
      
      Key factors: Proper preservation, quality sourcing, and adherence to FSSAI regulations.`,
    },
    {
      name: "ANIMAL PRODUCTS",
      info: `India is a leading producer of dairy, poultry, and meat products. Proper animal husbandry, quality feed, and hygiene practices ensure high production.

      - Dairy Farming: Requires temperate to tropical climates, ample green fodder (alfalfa, maize), and clean water.
      - Poultry Farming: Needs controlled temperatures (18–26°C), proper ventilation, and high-protein feed (soybean, fishmeal).
      - Goat & Sheep Rearing: Thrives in arid/semi-arid regions with drought-resistant fodder.
      
      Key Regions:
      - Punjab & Haryana: High-yielding dairy breeds, poultry, and processed meat.
      - Maharashtra & Gujarat: Hubs for milk, cheese, eggs, and goat meat.
      - Andhra Pradesh & Telangana: Lead in poultry and sheep/goat farming.`,
    },
    {
      name: "ORGANIC PRODUCTS",
      info: `Organic farming is growing in India, emphasizing chemical-free fertilizers and sustainable agriculture.
      
      Growing Conditions:
      - Fertile, well-drained soil rich in organic matter.
      - Adequate sunlight and clean water sources.
      - Crop rotation and intercropping to maintain soil fertility.
      
      Key Regions:
      - Sikkim & Uttarakhand: Fully organic farming states.
      
      Major Organic Products:
      - Basmati Rice, Turmeric & Ginger, Apples & Kiwis, Millets, Honey, Tea & Coffee, Spices, Pulses, Medicinal Herbs.`,
    },
    {
      name: "MILLETS",
      info: `Millets are drought-resistant crops ideal for dry and semi-arid regions. They grow well in low-fertility soils and require minimal water.
      
      Key Millets:
      - Jowar (Sorghum), Bajra (Pearl Millet), Ragi (Finger Millet), Foxtail Millet, Little Millet, Kodo Millet, Proso Millet, Barnyard Millet, Browntop Millet.
      
      Key Regions:
      - Odisha: Major millet-growing state (Koraput, Rayagada, Kalahandi).
      - Karnataka: Produces multiple millet varieties.
      - Madhya Pradesh & Rajasthan: Major producers of jowar and bajra.`,
    },
    {
      name: "ALCOHOLIC BEVERAGES",
      info: `India produces whiskey, rum, beer, and wine, each requiring specific climatic conditions.

      - Whiskey: Made from barley, maize, or rye (Punjab, Haryana, Goa).
      - Rum: Produced from sugarcane molasses (Goa, Karnataka, Uttar Pradesh).
      - Beer: Brewed from barley and hops (Maharashtra, Karnataka, Telangana).
      - Wine: Made from grapes (Nashik, Maharashtra, Bengaluru, Karnataka).
      
      Traditional Liquors:
      - Feni (Goa) – Made from cashew apples or coconut.
      - Toddy (Kerala, Tamil Nadu) – Fermented palm sap beverage.`,
    },
    {
      name: "FLORICULTURE, SEEDS, NUTS",
      info: `India cultivates high-quality flowers, seeds, and nuts.

      Floriculture: Roses, marigolds, jasmine, orchids, lilies, gladiolus, carnations.
      - Key Regions: Karnataka, Tamil Nadu, West Bengal, Maharashtra.
      
      Seeds: Vegetable seeds, oilseeds (mustard, sunflower), hybrid crop seeds.
      - Key Regions: Andhra Pradesh, Telangana, Rajasthan, Gujarat, Punjab, Haryana.
      
      Nuts: Cashews, groundnuts (peanuts), walnuts, almonds, pistachios, coconuts.
      - Key Regions:
        - Cashew: Kerala, Maharashtra, Goa, Karnataka, Andhra Pradesh.
        - Groundnut: Gujarat, Andhra Pradesh, Tamil Nadu, Karnataka.
        - Walnuts & Almonds: Jammu & Kashmir, Himachal Pradesh.`,
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="local-produce-container">
      <h2>Local Produce Categories</h2>

      {/* Category List */}
      <div className="category-list">
        {categories.map((category, index) => (
          <button
            key={index}
            className="category-button"
            onClick={() => setSelectedCategory(category)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Information Section */}
      {selectedCategory && (
        <div className="category-info">
          <h3>{selectedCategory.name}</h3>
          <p>{selectedCategory.info}</p>
        </div>
      )}
    </div>
  );
};

export default LocalProduce;
