import {cn} from '@nextui-org/react';
import {LucideProps, Star} from 'lucide-react';

type RatingStarProps = {
  rating: number;
  className?: string;
  starProps?: LucideProps;
};
const RatingStar = ({rating, starProps, className}: RatingStarProps) => {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      {Array.from({length: 5}, (_, index) => {
        const star = index + 1;
        const color = star <= rating ? 'orange' : 'gray';
        return (
          <Star
            key={star}
            size={20}
            fill={color}
            stroke={color}
            {...starProps}
          />
        );
      })}
    </div>
  );
};

export default RatingStar;
