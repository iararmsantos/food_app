import React from "react";
import { useFetch } from "../hooks/useFetch";
import { fetchMeals } from "../../http";
import MealItem from "../MealItem";

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
        meals.map((meal) => {
          return <MealItem meal={meal} />;
        })}
    </ul>
  );
};

export default Meals;
