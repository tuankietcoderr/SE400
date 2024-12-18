import axios from "axios";
import { createResource, createSignal } from "solid-js";

export const useAddress = () => {
  const [selectedProvince, setSelectedProvince] = createSignal(undefined);
  const [selectedDistrict, setSelectedDistrict] = createSignal(undefined);
  const [selectedWard, setSelectedWard] = createSignal(undefined);
  const [provinces] = createResource(
    async () => {
      const res = await axios.get("https://provinces.open-api.vn/api/p");
      return res.data;
    },
    {
      initialValue: [],
    }
  );
  const [districts] = createResource(
    selectedProvince,
    async (p) => {
      const res = await axios.get(
        `https://provinces.open-api.vn/api/p/${p.code}?depth=2`
      );
      return res.data.districts;
    },
    {
      initialValue: [],
    }
  );

  const [wards] = createResource(
    selectedDistrict,
    async (d) => {
      const res = await axios.get(
        `https://provinces.open-api.vn/api/d/${d.code}?depth=2`
      );
      return res.data.wards;
    },
    {
      initialValue: [],
    }
  );

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
