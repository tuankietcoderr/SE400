import {ChevronLeft} from 'lucide-react';
import Link from 'next/link';
import CreateOrEditAmenityForm from '../_components/CreateOrEditAmenityForm';

const page = () => {
  return (
    <div>
      <Link
        href="/amenity"
        className="sticky top-0 inline-flex items-center gap-1 transition-opacity hover:opacity-50">
        <ChevronLeft size={20} />
        Trở lại
      </Link>
      <CreateOrEditAmenityForm />
    </div>
  );
};

export default page;
