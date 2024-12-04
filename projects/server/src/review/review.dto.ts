import { PartialType } from '@nestjs/mapped-types';

export class CreateReviewRequestDto {
  user_id: string;
  hotel_id: string;
  room_id?: string;
  rating: number;
  comment: string;
}

export class UpdateReviewRequestDto extends PartialType(CreateReviewRequestDto) {}
