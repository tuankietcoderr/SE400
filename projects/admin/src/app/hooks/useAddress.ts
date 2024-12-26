import {useEffect, useState} from 'react';

export const useAddress = () => {
  type CodeAndName = {
    code: string;
    name: string;
  };
  const [selectedProvince, setSelectedProvince] = useState<
    CodeAndName | undefined
  >(undefined);
  const [selectedDistrict, setSelectedDistrict] = useState<
    CodeAndName | undefined
  >(undefined);
  const [selectedWard, setSelectedWard] = useState<CodeAndName | undefined>(
    undefined,
  );
  const [provinces, setProvinces] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);

  useEffect(() => {
    fetch('https://provinces.open-api.vn/api/p')
      .then(res => {
        return res.json();
      })
      .then(data => {
        setProvinces(data);
      })
      .catch(err => {});
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      fetch(
        `https://provinces.open-api.vn/api/p/${selectedProvince.code}?depth=2`,
      )
        .then(res => res.json())
        .then(data => {
          setDistricts(data.districts);
        })
        .catch(err => {});
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      fetch(
        `https://provinces.open-api.vn/api/d/${selectedDistrict.code}?depth=2`,
      )
        .then(res => res.json())
        .then(data => {
          setWards(data.wards);
        })
        .catch(err => {});
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
