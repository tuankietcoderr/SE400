import BookingHistoryList from "../components/BookingHistoryList";
import ReviewHistoryList from "../components/ReviewHistoryList";
import UserProfileInformation from "../components/UserProfileInformation";

const UserProfile = () => {
  return (
    <div className="flex gap-4 m-4">
      <div className="max-w-md w-full space-y-4">
        <UserProfileInformation />
        <ReviewHistoryList />
      </div>
      <div className="flex-1">
        <BookingHistoryList />
      </div>
    </div>
  );
};

export default UserProfile;
