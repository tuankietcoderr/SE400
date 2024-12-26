'use client';

import {
  useCreateAmenityMutation,
  useUpdateAmenityMutation,
} from '@/services/amenity';
import {Button, Form, Input, Textarea} from '@nextui-org/react';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';
import {toast} from 'sonner';

type CreateOrEditAmenityFormProps = {
  amenity?: any;
};

const CreateOrEditAmenityForm = ({amenity}: CreateOrEditAmenityFormProps) => {
  const isEdit = !!amenity;

  const createHotelMutation = useCreateAmenityMutation();
  const updateHotelMutation = useUpdateAmenityMutation(amenity?._id);
  const router = useRouter();

  useEffect(() => {
    if (amenity) {
    }
  }, [amenity]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;

    const data = {
      name,
      description,
    };

    if (isEdit) {
      updateHotelMutation.mutate(data, {
        onSuccess: data => {
          if (data.success) {
            toast.success('Cập nhật tiện ích thành công');
            router.push('/amenity');
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
          toast.success('Tạo tiện ích thành công');
          router.push('/amenity');
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
          {isEdit ? 'Cập nhật tiện ích' : 'Tạo tiện ích'}
        </h1>
        <Input
          autoFocus
          isRequired
          errorMessage="Vui lòng nhập tên"
          label="Tên"
          name="name"
          placeholder="Nhập tên"
          type="text"
          defaultValue={amenity?.name}
        />

        <Textarea
          errorMessage="Vui lòng nhập mô tả"
          label="Mô tả"
          name="description"
          placeholder="Nhập mô tả"
          type="text"
          defaultValue={amenity?.description}
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

export default CreateOrEditAmenityForm;
