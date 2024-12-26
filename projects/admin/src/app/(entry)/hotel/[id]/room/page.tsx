import {ChevronLeft, ChevronRight} from 'lucide-react';
import Link from 'next/link';
import HotelRoomListData from './_components/HotelRoomListData';

const page = async ({params}: any) => {
  const {id} = await params;

  return (
    <div>
      <div className="sticky top-0 mb-4 flex items-center justify-between">
        <Link
          href="/hotel"
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
      <HotelRoomListData hotelId={id} />
    </div>
  );
};

export default page;
