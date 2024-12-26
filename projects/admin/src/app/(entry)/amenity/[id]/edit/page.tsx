import {getAmenityByIdAction} from '@/services/amenity';
import {ChevronLeft} from 'lucide-react';
import Link from 'next/link';
import CreateOrEditAmenityForm from '../../_components/CreateOrEditAmenityForm';

const page = async ({params}: any) => {
  const {id} = await params;
  const res = await getAmenityByIdAction(id);

  return (
    <div>
      <div className="sticky top-0 flex items-center justify-between">
        <Link
          href="/amenity"
          className="inline-flex items-center gap-1 transition-opacity hover:opacity-50">
          <ChevronLeft size={20} />
          Trở lại
        </Link>
      </div>
      {res.success && res.data ? (
        <CreateOrEditAmenityForm amenity={res.data} />
      ) : (
        <p className="text-center">{res.message}</p>
      )}
    </div>
  );
};

export default page;
