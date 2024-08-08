import { useState, useEffect } from "react";
import Cordinate from "../model/Cordinate";

export const getCurrentCoordinates = async (): Promise<Cordinate> => {
  return await new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const coords: Cordinate = {
            lat: latitude.toString(),
            lng: longitude.toString(),
          };
          resolve(coords);
        },
        (error) => {
          reject(error);
        }
      );
    }
  });
};

export const saveToLocalStorage = (key: any, value: any) => {
  try {
    const serializedValue = value;
    localStorage.setItem(key, serializedValue);
  } catch (err) {
    console.error("Error saving to localStorage", err);
  }
};

export const getFromLocalStorage = (key: any) => {
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) {
      return "";
    }
    return serializedValue;
  } catch (err) {
    console.error("Error getting data from localStorage", err);
    return "";
  }
};

export const useGeolocation = () => {
  const [coordinates, setCoordinates] = useState<Cordinate | null>(null);

  const updateCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newCordinate = {
          lat: position.coords.latitude.toString(),
          lng: position.coords.longitude.toString(),
        };
        setCoordinates(newCordinate);
        // console.log("Update Cordinate called", coordinates, newCordinate);
      },
      (error) => {
        console.error("Error getting geolocation: ", error);
      }
    );
  };

  const getCurrentCoordinates = () => coordinates;

  useEffect(() => {
    // Update coordinates initially
    updateCoordinates();

    // Set interval to update coordinates every 2 seconds
    const intervalId = setInterval(updateCoordinates, 2000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return getCurrentCoordinates;
};
