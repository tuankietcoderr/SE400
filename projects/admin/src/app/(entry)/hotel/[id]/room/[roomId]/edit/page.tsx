import {getRoomDetailAction} from '@/services/room';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import Link from 'next/link';
import CreateOrEditHotelRoomForm from '../../_components/CreateOrEditHotelRoomForm';

const page = async ({params}: any) => {
  const {id, roomId} = await params;
  const res = await getRoomDetailAction(roomId);
  return (
    <div>
      <div className="sticky top-0 mb-4 flex items-center justify-between">
        <Link
          href={`/hotel/${id}/room`}
          className="inline-flex items-center gap-1 transition-opacity hover:opacity-50">
          <ChevronLeft size={20} />
          Trở lại
        </Link>
        <Link
          href={`/hotel/${id}/edit`}
          className="inline-flex items-center gap-1 transition-opacity hover:opacity-50">
          Chỉnh sửa khách sạn
          <ChevronRight size={20} />
        </Link>
      </div>
      {res.success && res.data ? (
        <CreateOrEditHotelRoomForm room={res.data} />
      ) : (
        <p className="text-center">{res.message}</p>
      )}
    </div>
  );
};

export default page;
