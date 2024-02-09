import Loader from '../catalog/components/loader';

export default function Loading() {
  return (
    <div className="w-full flex items-center flex-col">
      <h2 className="text-center uppercase text-2xl font-serif  my-5 font-bold text-emerald-900">Cart</h2>
      <Loader size={90} />
    </div>
  );
}
