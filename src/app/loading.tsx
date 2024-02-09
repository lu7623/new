import Loader from './catalog/components/loader';

export default function Loading() {
  return (
    <div className="w-full flex justify-center">
      <Loader size={50} />
    </div>
  );
}
