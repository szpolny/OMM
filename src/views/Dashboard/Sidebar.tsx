import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Plus, Rocket } from 'lucide-react';
import ProfileCard from './ProfileCard';
import { useState } from 'react';

type ProfileType = {
  id: number;
  name: string;
  location: string;
  locked: boolean;
};

const Sidebar = () => {
  // Mock data
  const profiles: ProfileType[] = [
    {
      id: 0,
      name: 'Default (Vanilla)',
      location:
        'C:/Program Files (x86)/Steam/steamapps/common/Kerbal Space Program',
      locked: true,
    },
    {
      id: 1,
      name: 'Modded',
      location: 'dasdas',
      locked: false,
    },
  ];

  const [selectedProfile] = useState(0);

  return (
    <div className="flex w-52 flex-col border-r">
      <div className="flex h-16 items-center justify-center gap-2 border-b">
        <div>
          <Rocket className="h-4 w-4 text-blue-500" />
        </div>
        <h1 className="text-base font-bold">Orbital Mod Manager</h1>
      </div>
      <div>
        <div className="flex h-10 w-full items-center justify-between px-2">
          <h2 className="text-sm font-semibold text-muted-foreground">
            PROFILES
          </h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-white"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Create new profile</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {profiles.map((profile) => (
          <div key={profile.name} className="w-full px-2">
            <ProfileCard
              selected={profile.id === selectedProfile}
              locked={profile.locked}
              name={profile.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
