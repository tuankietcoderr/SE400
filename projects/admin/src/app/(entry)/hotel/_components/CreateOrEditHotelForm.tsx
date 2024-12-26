'use client';

import {useAddress} from '@/app/hooks/useAddress';
import {HotelType} from '@/lib/enums/EHotel';
import {useGetAllAmenitiesQuery} from '@/services/amenity';
import {useCreateHotelMutation, useUpdateHotelMutation} from '@/services/hotel';
import {useUploadSingleMutation} from '@/services/upload';
import {
  Button,
  Form,
  Input,
  Select,
  SelectItem,
  Textarea,
} from '@nextui-org/react';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {toast} from 'sonner';

type CreateOrEditHotelFormProps = {
  hotel?: any;
};

const CreateOrEditHotelForm = ({hotel}: CreateOrEditHotelFormProps) => {
  const {
    districts,
    provinces,
    selectedDistrict,
    selectedProvince,
    selectedWard,
    setSelectedDistrict,
    setSelectedProvince,
    setSelectedWard,
    wards,
  } = useAddress();
  const isEdit = !!hotel;

  const getAllAmennitiesQuery = useGetAllAmenitiesQuery();
  const amenities = getAllAmennitiesQuery.data?.data || [];
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  const [selectedAmenities, setSelectedAmenities] = useState<Set<string>>(
    new Set([]),
  );
  const [hotelType, setHotelType] = useState<string>(HotelType.RESORT);

  const uploadMutation = useUploadSingleMutation();
  const createHotelMutation = useCreateHotelMutation();
  const updateHotelMutation = useUpdateHotelMutation(hotel?._id);
  const router = useRouter();

  useEffect(() => {
    if (hotel) {
      setThumbnail(hotel.thumbnail);
      setHotelType(hotel.type);
      setSelectedAmenities(new Set(hotel.amenities));
      setSelectedProvince(hotel.location.province);
      setSelectedDistrict(hotel.location.district);
      setSelectedWard(hotel.location.ward);
    }
  }, [hotel]);

  const handleThumbnailChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      toast.loading('Đang tải ảnh lên...', {
        duration: 0,
      });
      uploadMutation.mutate(file, {
        onSuccess: data => {
          if (data.success) {
            toast.success('Tải ảnh lên thành công');
            setThumbnail(data.data.url);
          } else {
            toast.error(data.message);
          }
        },
        onSettled: () => {
          toast.dismiss();
        },
      });
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name') as string;
    const price = formData.get('price') as string;
    const description = formData.get('description') as string;
    const address = formData.get('address') as string;

    if (!thumbnail) {
      toast.error('Vui lòng chọn ảnh đại diện');
      return;
    }

    if (!selectedProvince) {
      toast.error('Vui lòng chọn tỉnh/thành phố');
      return;
    }

    if (!selectedDistrict) {
      toast.error('Vui lòng chọn quận/huyện');
      return;
    }

    if (!selectedWard) {
      toast.error('Vui lòng chọn phường/xã');
      return;
    }

    const data = {
      name,
      price,
      description,
      thumbnail,
      amenities: Array.from(selectedAmenities),
      type: hotelType,
      location: {
        province: selectedProvince,
        district: selectedDistrict,
        ward: selectedWard,
        address,
      },
    };

    if (isEdit) {
      updateHotelMutation.mutate(data, {
        onSuccess: data => {
          if (data.success) {
            toast.success('Cập nhật khách sạn thành công');
            router.push('/hotel');
          } else {
            toast.error(data.message);
          }
        },
        onError: error => {
          toast.error(error.message);
        },
      });
      return;
    }
    createHotelMutation.mutate(data, {
      onSuccess: data => {
        if (data.success) {
          toast.success('Tạo khách sạn thành công');
          router.push('/hotel');
        } else {
          toast.error(data.message);
        }
      },
      onError: error => {
        toast.error(error.message);
      },
    });
  };

  return (
    <div className="p-4">
      <Form
        validationBehavior="native"
        className="mx-auto max-w-lg space-y-3"
        onSubmit={handleSubmit}>
        <h1 className="mb-4 text-xl font-semibold">
          {isEdit ? 'Cập nhật khách sạn' : 'Tạo khách sạn'}
        </h1>
        <Input
          errorMessage="Vui lòng chọn ảnh đại diện"
          type="file"
          accept=".jpg, .jpeg, .png"
          label="Ảnh đại diện"
          name="avatar"
          placeholder="Chọn ảnh đại diện"
          onChange={handleThumbnailChange}
        />
        {thumbnail && (
          <img
            src={thumbnail}
            alt="thumbnail"
            className="h-48 w-full rounded-lg object-cover"
          />
        )}
        <Input
          autoFocus
          isRequired
          errorMessage="Vui lòng nhập tên"
          label="Tên"
          name="name"
          placeholder="Nhập tên"
          type="text"
          defaultValue={hotel?.name}
        />
        <Input
          isRequired
          errorMessage="Vui lòng nhập giá"
          label="Giá"
          name="price"
          placeholder="Nhập giá"
          type="number"
          min={0}
          defaultValue={hotel?.price}
        />
        <Select
          label="Loại khách sạn"
          name="type"
          placeholder="Chọn loại khách sạn"
          selectionMode="single"
          onChange={e => {
            setHotelType(e.target.value);
          }}
          selectedKeys={[hotelType]}>
          {Object.values(HotelType).map(hotelType => (
            <SelectItem key={hotelType} value={hotelType}>
              {hotelType.replace(/_/g, ' ')}
            </SelectItem>
          ))}
        </Select>
        <Select
          label="Tiện ích"
          name="amenities"
          placeholder="Chọn tiện ích"
          selectionMode="multiple"
          onSelectionChange={k => {
            setSelectedAmenities(k as Set<string>);
          }}
          selectedKeys={selectedAmenities}>
          {amenities.map((amenity: any) => (
            <SelectItem key={amenity._id} value={amenity._id}>
              {amenity.name}
            </SelectItem>
          ))}
        </Select>

        <Select
          label="Tỉnh/Thành phố"
          name="province"
          placeholder="Chọn tỉnh/thành phố"
          selectionMode="single"
          onChange={e => {
            setSelectedProvince({
              code: e.target.value,
              name: provinces.find(p => p.code?.toString() === e.target.value)
                ?.name,
            });
          }}
          value={selectedProvince?.code}
          //@ts-ignore
          selectedKeys={[selectedProvince?.code]}>
          {provinces?.map(province => (
            <SelectItem key={province.code} value={province.code}>
              {province.name}
            </SelectItem>
          ))}
        </Select>
        <Select
          label="Quận/Huyện"
          name="district"
          placeholder="Chọn quận/huyện"
          selectionMode="single"
          onChange={e => {
            setSelectedDistrict({
              code: e.target.value,
              name: districts.find(p => p.code?.toString() === e.target.value)
                ?.name,
            });
          }}
          value={selectedDistrict?.code}
          //@ts-ignore
          selectedKeys={[selectedDistrict?.code]}>
          {districts?.map(province => (
            <SelectItem key={province.code} value={province.code}>
              {province.name}
            </SelectItem>
          ))}
        </Select>
        <Select
          label="Phường/Xã"
          name="ward"
          placeholder="Chọn phường/xã"
          selectionMode="single"
          onChange={e => {
            setSelectedWard({
              code: e.target.value,
              name: wards.find(p => p.code?.toString() === e.target.value)
                ?.name,
            });
          }}
          value={selectedWard?.code}
          //@ts-ignore
          selectedKeys={[selectedWard?.code]}>
          {wards?.map(province => (
            <SelectItem key={province.code} value={province.code}>
              {province.name}
            </SelectItem>
          ))}
        </Select>
        <Input
          isRequired
          errorMessage="Vui lòng nhập địa chỉ chi tiết"
          label="Địa chỉ chi tiết"
          name="address"
          placeholder="Nhập địa chỉ chi tiết"
          type="text"
          defaultValue={hotel?.location?.address}
        />
        <Textarea
          isRequired
          errorMessage="Vui lòng nhập mô tả"
          label="Mô tả"
          name="description"
          placeholder="Nhập mô tả"
          type="text"
          defaultValue={hotel?.description}
        />
        <Button
          type="submit"
          color="primary"
          isDisabled={
            createHotelMutation.isPending || updateHotelMutation.isPending
          }>
          {isEdit
            ? updateHotelMutation.isPending
              ? 'Đang cập nhật...'
              : 'Cập nhật'
            : createHotelMutation.isPending
              ? 'Đang tạo...'
              : 'Tạo'}
        </Button>
      </Form>
    </div>
  );
};

export default CreateOrEditHotelForm;
