'use client';

import {ERoomType} from '@/lib/enums/ERoom';
import {useCreateRoomMutation, useUpdateRoomMutation} from '@/services/room';
import {useUploadSingleMutation} from '@/services/upload';
import {
  Button,
  Form,
  Input,
  Select,
  SelectItem,
  Textarea,
} from '@nextui-org/react';
import {useParams, useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {toast} from 'sonner';

type CreateOrEditHotelRoomFormProps = {
  room?: any;
};

const CreateOrEditHotelRoomForm = ({room}: CreateOrEditHotelRoomFormProps) => {
  const isEdit = !!room;

  const [hotelType, setHotelType] = useState<string>(ERoomType.APARTMENT);

  const uploadMutation = useUploadSingleMutation();
  const createHotelMutation = useCreateRoomMutation();
  const updateHotelMutation = useUpdateRoomMutation(room?._id);
  const router = useRouter();
  const {id: hotel_id} = useParams();

  useEffect(() => {
    if (room) {
      setHotelType(room.type);
    }
  }, [room]);

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
    const capacity = formData.get('capacity') as string;

    const data = {
      name,
      price: Number(price),
      description,
      type: hotelType,
      capacity: Number(capacity),
      hotel_id,
    };

    console.log(data);

    if (isEdit) {
      updateHotelMutation.mutate(data, {
        onSuccess: data => {
          if (data.success) {
            toast.success('Cập nhật phòng khách sạn thành công');
            router.push(`/hotel/${data.data.hotel_id}/room`);
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
          toast.success('Tạo phòng khách sạn thành công');
          router.push(`/hotel/${data.data.hotel_id}/room`);
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
          {isEdit ? 'Cập nhật phòng khách sạn' : 'Tạo phòng khách sạn'}
        </h1>

        <Input
          autoFocus
          isRequired
          errorMessage="Vui lòng nhập tên"
          label="Tên"
          name="name"
          placeholder="Nhập tên"
          type="text"
          defaultValue={room?.name}
        />
        <Input
          isRequired
          errorMessage="Vui lòng nhập giá"
          label="Giá"
          name="price"
          placeholder="Nhập giá"
          type="number"
          min={0}
          defaultValue={room?.price}
        />
        <Input
          isRequired
          errorMessage="Vui lòng nhập sức chứa"
          label="Sức chứa"
          name="capacity"
          placeholder="Nhập sức chứa"
          type="number"
          min={1}
          defaultValue={room?.capacity}
        />
        <Select
          label="Loại phòng khách sạn"
          name="type"
          placeholder="Chọn loại phòng khách sạn"
          selectionMode="single"
          onChange={e => {
            setHotelType(e.target.value);
          }}
          selectedKeys={[hotelType]}>
          {Object.values(ERoomType).map(hotelType => (
            <SelectItem key={hotelType} value={hotelType}>
              {hotelType.replace(/_/g, ' ')}
            </SelectItem>
          ))}
        </Select>

        <Textarea
          label="Mô tả"
          name="description"
          placeholder="Nhập mô tả"
          type="text"
          defaultValue={room?.description}
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

export default CreateOrEditHotelRoomForm;
