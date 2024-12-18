import Addresses from "../components/Addresses";
import UserProfileInformation from "../components/UserProfileInformation";

const UserProfile = () => {
  return (
    <div className="flex gap-4 m-4">
      <div className="max-w-md w-full space-y-4">
        <UserProfileInformation />
        <Addresses />
      </div>
      <div className="flex-1">Booking History List</div>
    </div>
  );
};

export default UserProfile;
