import Image from 'next/image';
import { FaCalendar } from 'react-icons/fa';

const ProfileInfo = ({ creator, publicKey }) => {
  const date = new Date(creator.createdAt);

  return (
    <div className="my-2">
      <div className="w-36 h-36 mx-auto">
        <div>
          <Image
            src={creator.avatarURL ? creator.avatarURL : '/Avatar.png'}
            width={128}
            height={128}
            alt="User avatar"
            className="rounded-full shadow-sm"
          ></Image>
        </div>
      </div>
      <h1 className="font-bold text-4xl md:text-5xl my-4">
        {creator.name ? creator.name : 'Username'}
      </h1>
      <p className="text-md md:text-xl m-2">
        {creator.bio ? creator.bio : 'User has not entered his bio'}
      </p>
      {creator.customLink && (
        <a
          href={creator.customLink}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 hover:text-blue-900"
        >
          {creator.customLink}
        </a>
      )}
      <p className="text-xs md:text-sm shadow-sm text-[#c9e2a6] break-all mt-4 py-2 px-4 rounded-full bg-[#262626] md:text-md font-bold">
        {publicKey}
      </p>
      <p className="my-4">
        Joined at {date.toLocaleDateString()}{' '}
        <FaCalendar className="inline align-text-top" />
      </p>
    </div>
  );
};

export default ProfileInfo;
