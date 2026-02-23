import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  size?: number;
  filledClassName?: string;
  emptyClassName?: string;
}

export function RatingStars({
  rating,
  size = 18,
  filledClassName = "fill-yellow-400 text-yellow-400",
  emptyClassName = "text-border",
}: RatingStarsProps) {
  const filledCount = Math.floor(rating);

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < filledCount ? filledClassName : emptyClassName}
        />
      ))}
    </div>
  );
}
