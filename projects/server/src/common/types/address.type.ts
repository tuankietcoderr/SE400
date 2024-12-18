export type AddressCodeAndName = {
  code: string;
  name: string;
};

export type Address = {
  province: AddressCodeAndName;
  district: AddressCodeAndName;
  ward: AddressCodeAndName;
  address: string;
};

export type Coordinates = {
  lat: number;
  lng: number;
};

export type Location = Address & {
  coordinates: Coordinates;
};
