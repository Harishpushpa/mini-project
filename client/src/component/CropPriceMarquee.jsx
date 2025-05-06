import React from 'react';

const CropPriceMarquee = () => {
  const crops = [
    { name: "Rice", min: 1800, max: 2500 },
    { name: "Wheat", min: 1600, max: 2300 },
    { name: "Cotton", min: 5000, max: 7000 },
    { name: "Tomato", min: 800, max: 2000 },
    { name: "Sugarcane", min: 2800, max: 3500 }
  ];

  const marqueeText = crops.map(
    (crop) => `${crop.name} → Min: ₹${crop.min} | Max: ₹${crop.max}`
  ).join(" ⚡ ");

  return (
    <marquee behavior="scroll" direction="left" scrollamount="6" style={{ background: "#f9f9f9", padding: "10px", fontWeight: "bold", color: "#2c3e50" }}>
      {marqueeText}
    </marquee>
  );
};

export default CropPriceMarquee;
