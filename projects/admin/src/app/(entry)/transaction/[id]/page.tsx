import {getPaymentDetailAction} from '@/services/payment';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import Link from 'next/link';
import TransactionDetail from '../_components/TransactionDetail';

const page = async ({params}: any) => {
  const {id} = await params;
  const res = await getPaymentDetailAction(id);
  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <Link
          href="/transaction"
          className="sticky top-0 inline-flex items-center gap-1 transition-opacity hover:opacity-50">
          <ChevronLeft size={20} />
          Trở lại
        </Link>
        {res.data && (
          <Link
            href={`/booking/${res.data.booking_id._id}`}
            className="sticky top-0 inline-flex items-center gap-1 transition-opacity hover:opacity-50">
            Xem thông tin đặt phòng
            <ChevronRight size={20} />
          </Link>
        )}
      </div>
      {res.success && res.data ? (
        <TransactionDetail transaction={res.data} />
      ) : (
        <p className="text-center">{res.message}</p>
      )}
    </div>
  );
};

export default page;
