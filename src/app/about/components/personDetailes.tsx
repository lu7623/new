import { lineItems } from '@/app/basket/components/drawListItems.test';
import Image from 'next/image';

export type PersonDetailesProps = {
  name: string;
  role: string;
  photoUrl: string;
  githubUrl: string;
  description: string;
  contributions: string[];
};

export default function PersonDetailes({
  name,
  role,
  photoUrl,
  githubUrl,
  description,
  contributions,
}: PersonDetailesProps) {
  return (
    <>
      <div className="my-12 mx-8 text-center text-lg">
        <div className="inline-block w-36 h-36 rounded-[50%] p-3 bg-green-50">
          <div className="overflow-hidden w-[100%] h-[100%] rounded-[50%]">
            <Image width={144} height={144} src={photoUrl} alt="photo" />
          </div>
        </div>
        <div className="font-serif bg-green-50 -mt-16 p-[70px_30px_30px] rounded-md">
          <h2 className="uppercase">{name}</h2>
          <span className=" font-bold  text-emerald-900">{role}</span>
          <p className="text-left">{description}</p>
          <p className="text-left font-bold text-emerald-900">Contributions to eCommerce Application project:</p>
          <ul className="list-disc ml-4 text-left">
            {contributions.map((c) => {
              return <li key={c}>{c}</li>;
            })}
          </ul>
          <div className="flex flex-wrap items-center justify-center gap-1">
            <span>My GitHub</span>
            <a href={githubUrl} target="_blank">
              <Image width={45} height={45} className="inline-block" src="/icons8-github.svg" alt="GitHubLogo" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
