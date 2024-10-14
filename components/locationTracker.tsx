"use client";
import React from "react";
import { useWatchPosition } from "@/hooks/useWatchPosition";

export default function LocationTracker() {
  const { location, error } = useWatchPosition();

  return (
    <div className="text-default-500">
      <h1>Real-time Location Tracking</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          {location.lat && location.lon ? (
            <p>
              Latitude: {location.lat}, Longitude: {location.lon}
            </p>
          ) : (
            <p>Getting location...</p>
          )}
        </>
      )}
    </div>
  );
}
