import {getHotelByIdAction} from '@/services/hotel';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import Link from 'next/link';
import CreateOrEditHotelForm from '../../_components/CreateOrEditHotelForm';

const page = async ({params}: any) => {
  const {id} = await params;
  const res = await getHotelByIdAction(id);

  return (
    <div>
      <div className="sticky top-0 flex items-center justify-between">
        <Link
          href="/hotel"
          className="inline-flex items-center gap-1 transition-opacity hover:opacity-50">
          <ChevronLeft size={20} />
          Trở lại
        </Link>
        <Link
          href={`/hotel/${id}/room`}
          className="inline-flex items-center gap-1 transition-opacity hover:opacity-50">
          Quản lý phòng
          <ChevronRight size={20} />
        </Link>
      </div>
      {res.success && res.data ? (
        <CreateOrEditHotelForm hotel={res.data} />
      ) : (
        <p className="text-center">{res.message}</p>
      )}
    </div>
  );
};

export default page;
