"use client";

import { useEffect, useState } from "react";

const PropertyMap = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [viewport, setViewPort] = useState({
    lattitude: 0,
    longitude: 0,
    zoom: 12,
    width: "100%",
    height: "500px",
  });

  const [loading, setLoading] = useState(true); // by default
  const [geoCodeError, setGeoCodeError] = useState(false);

  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING,
    language: "en",
    region: "us",
  });

  useEffect(() => {
    const fetcCords = async () => {
      try {
        const res = await fromAddress()
      } catch (error) {
        console.log(error);
        setGeoCodeError(true);
      } finally {
        setLoading(false);
      }
    };
  }, []);

  return <div>PropertyMap</div>;
};

export default PropertyMap;
