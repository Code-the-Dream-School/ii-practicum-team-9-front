// categoryIcons.jsx
import React from "react";
import {
  GiClothes,
  GiSmartphone,
  GiCarKey,
  GiGardeningShears,
  GiPresent,
  GiGuitar,
  GiLipstick,
  GiDogBowl,
  GiBabyBottle,
  GiFruitBowl,
  GiBookPile,
} from "react-icons/gi";

const categoryIcons = {
  fashion: <GiClothes size={20} />,
  electronics: <GiSmartphone size={20} />,
  cars: <GiCarKey size={20} />,
  homeGarden: <GiGardeningShears size={20} />,
  gifts: <GiPresent size={20} />,
  music: <GiGuitar size={20} />,
  healthBeauty: <GiLipstick size={20} />,
  pets: <GiDogBowl size={20} />,
  babyToys: <GiBabyBottle size={20} />,
  groceries: <GiFruitBowl size={20} />,
  books: <GiBookPile size={20} />,
};

export default categoryIcons;