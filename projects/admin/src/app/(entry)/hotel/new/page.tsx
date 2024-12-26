import {ChevronLeft} from 'lucide-react';
import Link from 'next/link';
import CreateOrEditHotelForm from '../_components/CreateOrEditHotelForm';

const page = () => {
  return (
    <div>
      <Link
        href="/hotel"
        className="sticky top-0 inline-flex items-center gap-1 transition-opacity hover:opacity-50">
        <ChevronLeft size={20} />
        Trở lại
      </Link>
      <CreateOrEditHotelForm />
    </div>
  );
};

export default page;
