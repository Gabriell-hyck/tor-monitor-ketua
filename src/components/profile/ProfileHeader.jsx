import Card from '../ui/Card';
import { MapPin, Calendar } from 'lucide-react';
import { formatDate } from '../../utils/date';
import { quotes } from '../../utils/constants';

const BANNER = '/images/banner.gif';

function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)].text;
}

export default function ProfileHeader({ user }) {
  if (!user) return null;

  return (
    <div>
      {/* Banner GIF */}
      <div className="h-44 rounded-2xl overflow-hidden shadow-card mb-[-50px]">
        <img
          src={BANNER}
          className="w-full h-full object-cover"
          alt="Profile banner"
        />
      </div>

      {/* Profile Info Card */}
      <Card className="relative pt-16 pb-6 flex flex-col items-center">
        {/* Avatar */}
        <img
          src={user.avatar_url}
          alt={user.login}
          className="w-24 h-24 rounded-full border-4 border-white shadow absolute -top-12"
        />

        {/* Name & Username */}
        <h2 className="text-xl font-bold mt-2 text-dark">
          {user.name || user.login}
        </h2>
        <p className="text-soft">@{user.login}</p>

        {/* Bio */}
        {user.bio && (
          <p className="mt-2 text-center text-sm max-w-md text-soft">
            {user.bio}
          </p>
        )}

        {/* Location & Join Date */}
        <div className="flex gap-4 mt-3 text-sm text-soft">
          {user.location && (
            <span className="flex items-center gap-1">
              <MapPin size={14} />
              {user.location}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            Joined {formatDate(user.created_at)}
          </span>
        </div>

        {/* Random Quote as Motto */}
        <div className="mt-4 italic text-soft text-sm">
              &ldquo;{getRandomQuote()}&rdquo;
        </div>
      </Card>
    </div>
  );
}