import Image from 'next/image';

export default function Loader({ size }: { size: number }) {
  return (
    <>
      <Image src="/spinner.gif" width={size} height={size} alt="loading" className="inline-block" />
    </>
  );
}
