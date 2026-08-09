import { useGitHubProfile } from '../../hooks/useGitHub';
import { useApp } from '../../context/AppContext';
import Card from '../ui/Card';
import { MapPin, Link as LinkIcon } from 'lucide-react';

export default function ProfileInfo() {
  const { username } = useApp();
  const { profile, loading } = useGitHubProfile(username);

  if (loading) return <Card><p>Loading...</p></Card>;

  return (
    <Card>
      <div className="flex flex-col items-center text-center">
        <img src={profile.avatarUrl} className="w-24 h-24 rounded-full mb-4" />
        <h2 className="text-xl font-semibold">{profile.name}</h2>
        <p className="text-soft">@{profile.login}</p>
        {profile.bio && <p className="mt-2 text-sm max-w-md">{profile.bio}</p>}
        <div className="flex gap-6 mt-4 text-sm">
          <span><strong>{profile.followers.totalCount}</strong> followers</span>
          <span><strong>{profile.following.totalCount}</strong> following</span>
        </div>
      </div>
    </Card>
  );
}