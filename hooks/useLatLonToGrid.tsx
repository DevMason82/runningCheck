"use client";

import { useState, useEffect } from "react";

// 격자 좌표 타입 정의
interface GridCoordinates {
  x: number | null;
  y: number | null;
}

// 위도/경도를 기상청 격자 좌표로 변환하는 함수
function latLonToGrid(lat: number, lon: number): GridCoordinates {
  const RE = 6371.00877; // 지구 반경 (km)
  const GRID = 5.0; // 격자 간격 (km)
  const SLAT1 = 30.0; // 투영 위도 1 (degree)
  const SLAT2 = 60.0; // 투영 위도 2 (degree)
  const OLON = 126.0; // 기준 경도 (degree)
  const OLAT = 38.0; // 기준 위도 (degree)
  const XO = 43; // 기준점 X좌표 (격자)
  const YO = 136; // 기준점 Y좌표 (격자)

  const DEGRAD = Math.PI / 180.0;

  const re = RE / GRID;
  const slat1 = SLAT1 * DEGRAD;
  const slat2 = SLAT2 * DEGRAD;
  const olon = OLON * DEGRAD;
  const olat = OLAT * DEGRAD;

  const sn =
    Math.tan(Math.PI * 0.25 + slat2 * 0.5) /
    Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  const sf =
    (Math.pow(Math.tan(Math.PI * 0.25 + slat1 * 0.5), sn) * Math.cos(slat1)) /
    sn;
  const ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
  const roLat = (re * sf) / Math.pow(ro, sn);

  const theta = lon * DEGRAD - olon;
  const ra =
    (re * sf) / Math.pow(Math.tan(Math.PI * 0.25 + lat * DEGRAD * 0.5), sn);

  const x = Math.floor(ra * Math.sin(theta * sn) + XO + 0.5);
  const y = Math.floor(roLat - ra * Math.cos(theta * sn) + YO + 0.5);

  return { x, y };
}

// 커스텀 훅 정의 (타입스크립트 적용)
export function useLatLonToGrid(lat: any, lon: any): GridCoordinates {
  const [gridCoords, setGridCoords] = useState<GridCoordinates>({
    x: null,
    y: null,
  });

  useEffect(() => {
    if (lat && lon) {
      const coords = latLonToGrid(lat, lon);
      setGridCoords(coords);
    }
  }, [lat, lon]);

  return gridCoords;
}
