import Spinner from './Spinner';

const ScreenLoader = () => {
  return (
    <div className="fixed inset-0 z-[100000] flex h-screen flex-col items-center justify-center bg-black/70">
      <Spinner />
    </div>
  );
};

export default ScreenLoader;
