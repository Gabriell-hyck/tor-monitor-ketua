import { motion } from 'framer-motion';
import { useGitHubContext } from '../context/GitHubContext';
import ProfileHeader from '../components/profile/ProfileHeader';
import SocialLinks from '../components/profile/SocialLinks';
import StatsRow from '../components/profile/StatsRow';
import ContributionGraph from '../components/profile/ContributionGraph';
import TechStackRadar from '../components/profile/TechStackRadar';
import Achievements from '../components/profile/Achievements';
import SpotifySection from '../components/profile/SpotifySection';
import CodingDiary from '../components/profile/CodingDiary';

export default function ProfilePage() {
  const { user, repos, loading } = useGitHubContext();

  if (loading) return (
    <div className="animate-pulse space-y-6">
      <div className="h-44 bg-gray-100 dark:bg-gray-700 rounded-2xl" />
      <div className="h-32 bg-gray-100 dark:bg-gray-700 rounded-2xl" />
    </div>
  );

  const totalStars = repos?.reduce((acc, r) => acc + r.stargazers_count, 0) ?? 0;
  const totalForks = repos?.reduce((acc, r) => acc + r.forks_count, 0) ?? 0;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <ProfileHeader user={user} />
      <SocialLinks />
      <StatsRow user={user} totalStars={totalStars} totalForks={totalForks} />
      <ContributionGraph />
      <TechStackRadar />
      <SpotifySection />
      <Achievements user={user} totalStars={totalStars} />
      <CodingDiary />
    </motion.div>
  );
}