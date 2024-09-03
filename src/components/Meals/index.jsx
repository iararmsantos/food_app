import React from "react";
import { fetchMeals } from "../../http";
import MealItem from "../MealItem";
import { useFetch } from "../../hooks/useFetch";

const Meals = () => {
  const {
    isFetching,
    error,
    fetchedData: meals,
    setFetchedData: setMeals,
  } = useFetch(fetchMeals, []);

  return (
    <ul id="meals">
      {!isFetching &&
        meals.map((meal, index) => {
          return <MealItem meal={meal} key={index} />;
        })}
    </ul>
  );
};

export default Meals;
