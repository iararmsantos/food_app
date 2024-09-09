import React from "react";
import { fetchMeals } from "../../http";
import MealItem from "../MealItem";
import { useFetch } from "../../hooks/useFetch";
import useHttp from "../../hooks/useHttp";
import Error from "../UI/Error";

const requestConfig = {};

const Meals = () => {
  // const { isFetching, fetchedData: meals } = useFetch(fetchMeals, []);
  const {
    data: meals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  if (isLoading) {
    return <p className="center">Fetching meals...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }

  return (
    <ul id="meals">
      {!isLoading &&
        meals.map((meal, index) => {
          return <MealItem meal={meal} key={index} />;
        })}
    </ul>
  );
};

export default Meals;
