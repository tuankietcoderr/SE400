export type Address = {
  street: string;
  city: string;
  district: string;
  ward: string;
  state: string;
  country: string;
  postal_code: string;
};

export type Coordinates = {
  lat: number;
  lng: number;
};

export type Location = {
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  coordinates: Coordinates;
};
