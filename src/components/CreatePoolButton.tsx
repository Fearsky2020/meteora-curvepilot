import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/button';

type CreatePoolButtonProps = { className?: string };

export const CreatePoolButton = ({ className }: CreatePoolButtonProps) => (
  <Link href="/curvepilot" className={cn(buttonVariants({ variant: 'outline' }), className)}>
    <span className="iconify ph--chart-line-up-bold h-4 w-4" />
    <span className="hidden sm:inline">CurvePilot</span>
    <span className="sm:hidden">Pilot</span>
  </Link>
);
