import axios from "axios";
import { useEffect, useState } from "react";

export const useAddress = () => {
  const [selectedProvince, setSelectedProvince] = useState(undefined);
  const [selectedDistrict, setSelectedDistrict] = useState(undefined);
  const [selectedWard, setSelectedWard] = useState(undefined);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    axios.get("https://provinces.open-api.vn/api/p").then((res) => {
      setProvinces(res.data);
    });
  }, []);

  useEffect(() => {
    if (selectedProvince && selectedProvince.code) {
      axios
        .get(
          `https://provinces.open-api.vn/api/p/${selectedProvince.code}?depth=2`
        )
        .then((res) => {
          setDistricts(res.data.districts);
        });
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict && selectedDistrict.code) {
      axios
        .get(
          `https://provinces.open-api.vn/api/d/${selectedDistrict.code}?depth=2`
        )
        .then((res) => {
          setWards(res.data.wards);
        });
    }
  }, [selectedDistrict]);

  return {
    selectedProvince,
    setSelectedProvince,
    selectedDistrict,
    setSelectedDistrict,
    selectedWard,
    setSelectedWard,
    provinces,
    districts,
    wards,
  };
};
