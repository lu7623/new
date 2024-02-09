'use client';

import { useState } from 'react';
import PersonCard from './components/personCard';
import PersonDetailes from './components/personDetailes';
import BigPopup from '../account/components/passwordChange/popup/passwordChangePopup';
import Border from '../account/components/border/border';
import Image from 'next/image';

export type PersonInfo = {
  name: string;
  role: string;
  photoUrl: string;
  githubUrl: string;
  description: string;
  contributions: string[];
};

export default function Page() {
  const persons: PersonInfo[] = [
    {
      name: 'Roman Shevyakov',
      role: 'Team Lead',
      photoUrl: '/Shevyakov.jpg',
      githubUrl: 'https://github.com/ramzes-84',
      description:
        'Was born in 1984 in Tula`s region. Owns a binoculars. Worked as a lawyer for a long time but after moving to another country faced with a necessity to make some changes in profession. The RSSchool learning is the first attempt to enter the IT world.',
      contributions: [
        'repository setup and development environment configuration;',
        'Product`s Page development;',
        'Cart`s Page development;',
        'searching and integration of additional components and modules (sliders and others);',
        'testing.',
      ],
    },
    {
      name: 'Lyubov Agulova',
      role: 'Developer',
      photoUrl: '/Agulova.jpg',
      githubUrl: 'https://github.com/lu7623',
      description:
        'Was born in Voronezh, Russia in 1992, now I live in Saint Petersburg . Graduated as a Bachelor of radiophysics from Voronezh State University in 2013. Currently working as a stained glass crafter in my small home workshop. I’m a self-taught glass artist and I think self education is a strong point of my personality. Also running business gave me skills such as flexibility, resourcefulness, and persistence in achieving goals.',
      contributions: [
        'Catalog page with pagination, sorting, search and filtering options;',
        'Header and routing;',
        'App design solutions;',
        'Content maker and owner.',
      ],
    },
    {
      name: 'Kseniya Merkulova',
      role: 'Developer',
      photoUrl: '/Merkulova.jpg',
      githubUrl: 'https://github.com/mksenni',
      description:
        'Born in Petropavlovsk, Kazakhstan, in 1992 and soon my family moved to Russia. Received an economic education and worked for 6 years as a financial consultant in a bank. But I always wanted to change my profession and see the result of my work. Then I became a mother, went to live in Tyumen, Russia, and while on maternity leave began my way into IT. I was HR in an IT company, then took a short course on basics of front-end development. Studying at RS School is first serious training in the IT world.',
      contributions: [
        'Development and validation of forms for Registration Page and Login Page;',
        'Development of display and editing of User Profile Page;',
        'Implementation of use of promocodes;',
        'Creating an About Us page.',
      ],
    },
  ];
  const [isOpen, setIsOpen] = useState<number | null>(null);
  const handleOpenPersonCard = (index: number | null) => {
    index === isOpen ? setIsOpen(null) : setIsOpen(index);
  };
  return (
    <>
      <div className="fixed top-[70px] right-0 h-screen sm:w-20 flex flex-col justify-start hover:cursor-pointer hover:-translate-y-1 z-50">
        <a href="https://rs.school/" target="_blanck">
          <Image className="mb-5 mr-5" width={80} height={80} src="/label.png" alt="logo_RSSchool" />
        </a>
      </div>
      <h1 className="text-center uppercase text-2xl font-serif my-5 font-bold text-emerald-900">About US</h1>
      <div className="flex flex-col justify-evenly xl:flex-row items-center xl:columns-3">
        {persons.map((person, index) => (
          <PersonCard
            key={index}
            name={person.name}
            role={person.role}
            photoUrl={person.photoUrl}
            githubUrl={person.githubUrl}
            onClick={() => {
              handleOpenPersonCard(index);
            }}
          />
        ))}
      </div>
      <div className="sm:mx-10">
        <Border title="Our collaboration">
          <p className=" font-serif md:text-xl text-lg block max-[392px]:pt-5 pb-2">
            The Ostara Glass Shop as a result of the development was made thanks to the numerous efforts of each team
            member. Upon completion of the project, we can confidently say that the team united and accurately completed
            all the assigned tasks. The development process was accompanied by mutual understanding and supporting to
            each other.
            <span className=" font-bold text-emerald-900 block">Technology stack:</span>
            <p>The application was built using modern web technologies such as Next.js, React, Typescript and Jest.</p>
            <span className=" font-bold text-emerald-900">Work coordination:</span>
            <p>
              To distribute tasks, set intermediate deadlines, ensure everyone understands the progress of development
              and avoid duplication we have used task tracking with Jira Kanban board. Communication in team took place
              in Telegram group chat. Skype meetings with mentor helped us in solving problems that have arisen in the
              development process.
            </p>
            <span className=" font-bold text-emerald-900">Code quality control:</span>
            <p>
              For automatic code formatting and linting checks during the commit process we used Husky with ESlint and
              Prettier. Each PR should have gotten 2 approves before being merged in the sprint branch. In the
              repository we organized CI/CD workflow with GitHub Actions for testing and Vercel Deployment for
              continuous application build and deploy.
            </p>
          </p>
        </Border>
      </div>
      {isOpen !== null && (
        <BigPopup
          onClose={(event) => {
            event.preventDefault();
            setIsOpen(null);
          }}
        >
          <PersonDetailes
            name={persons[isOpen].name}
            role={persons[isOpen].role}
            photoUrl={persons[isOpen].photoUrl}
            githubUrl={persons[isOpen].githubUrl}
            description={persons[isOpen].description}
            contributions={persons[isOpen].contributions}
          />
        </BigPopup>
      )}
    </>
  );
}
