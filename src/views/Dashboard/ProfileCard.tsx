import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Lock, Trash2 } from 'lucide-react';

const ProfileCard = (props: {
  name: string;
  locked: boolean;
  selected: boolean;
}) => {
  return (
    <Button
      className={cn(
        'my-0.5 w-full justify-between gap-0 bg-transparent px-2',
        props.selected ? 'bg-accent' : 'bg-transparent',
      )}
      variant={!props.selected ? 'outline' : 'secondary'}
    >
      {props.name}
      {props.locked ? (
        <Lock size={8} className="text-muted-foreground h-2 w-2" />
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="text-muted-foreground hover:text-red-400">
                <Trash2 className="h-2 w-2" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </Button>
  );
};

export default ProfileCard;
