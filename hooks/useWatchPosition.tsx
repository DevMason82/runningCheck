"use client";
import { useState, useEffect } from "react";

export function useWatchPosition() {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    // 위치 업데이트 콜백 함수
    const successCallback = (position) => {
      setLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    };

    const errorCallback = (err) => {
      setError(err.message);
    };

    // 위치 변경을 지속적으로 추적
    const watchId = navigator.geolocation.watchPosition(
      successCallback,
      errorCallback,
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );

    // 컴포넌트 언마운트 시 watchPosition 해제
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return { location, error };
}
