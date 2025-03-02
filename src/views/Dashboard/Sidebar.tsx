import { Rocket } from 'lucide-react';
import ProfileCard from './ProfileCard';
import { useState } from 'react';
import CreateProfileDialog from './CreateProfileDialog';

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

  const handleCreateProfile = () => {
    // TODO: Implement profile creation
  };

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
          <CreateProfileDialog onCreateProfile={handleCreateProfile} />
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
