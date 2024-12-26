import {getBookingDetailAction} from '@/services/booking';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import Link from 'next/link';
import BookingDetail from '../_components/BookingDetail';

const page = async ({params}: any) => {
  const {id} = await params;
  const res = await getBookingDetailAction(id);
  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <Link
          href="/booking"
          className="sticky top-0 inline-flex items-center gap-1 transition-opacity hover:opacity-50">
          <ChevronLeft size={20} />
          Trở lại
        </Link>
        {res.data && res.data?.payment_id?._id && (
          <Link
            href={`/transaction/${res.data.payment_id._id}`}
            className="sticky top-0 inline-flex items-center gap-1 transition-opacity hover:opacity-50">
            Xem thông tin giao dịch
            <ChevronRight size={20} />
          </Link>
        )}
      </div>
      {res.success && res.data ? (
        <BookingDetail booking={res.data} />
      ) : (
        <p className="text-center">{res.message}</p>
      )}
    </div>
  );
};

export default page;
