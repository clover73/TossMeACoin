import Router, { useRouter } from 'next/router';
import { useState } from 'react';

import { FaCalendar } from 'react-icons/fa';
import Button from './Button';

const EditProfile = ({ creator, publicKey }) => {
  const date = new Date(creator.createdAt);
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [link, setLink] = useState('');
  const [error, setError] = useState('');

  const handleSave = async () => {
    router.reload(window.location.pathname);
  };

  return (
    <>
      <div className="my-2">
        <div className="w-36 h-36 mx-auto">
          <img
            className="rounded-full shadow-sm"
            src={creator.avatarURL ? creator.avatarURL : 'Avatar.png'}
            alt="User avatar"
          />
        </div>
        <div className="my-4">
          <div className="m-2">
            <label className="block mb-2 text-xl font-medium text-[#262626]">
              Your name
            </label>
            <input
              type="text"
              className="shadow-sm bg-[#6666ff] border border-[#6666ff] text-[#ffffff] placeholder-gray-200 text-sm rounded-lg focus:ring-[#5e17eb] focus:border-[#5e17eb] block w-full p-2.5"
              placeholder={creator.name ? creator.name : 'Username'}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="m-2">
            <label className="block mb-2 text-xl font-medium text-[#262626]">
              Your Bio
            </label>
            <textarea
              rows="3"
              cols="25"
              maxLength="256"
              className="shadow-sm bg-[#6666ff] border border-[#6666ff] text-[#ffffff] placeholder-gray-200 text-sm rounded-lg focus:ring-[#5e17eb] focus:border-[#5e17eb] block w-full p-2.5"
              placeholder={creator.bio ? creator.bio : 'Bio'}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <div className="m-2">
            <label className="block mb-2 text-xl font-medium text-[#262626]">
              Custom link
            </label>
            <input
              type="text"
              className="shadow-sm bg-[#6666ff] border border-[#6666ff] text-[#ffffff] placeholder-gray-200 text-sm rounded-lg focus:ring-[#5e17eb] focus:border-[#5e17eb] block w-full p-2.5"
              placeholder={creator.customLink ? creator.customLink : 'Link'}
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
        </div>
        <p className="text-xs md:text-sm shadow-sm text-[#c9e2a6] break-all py-2 px-4 rounded-full bg-[#262626] md:text-md font-bold">
          {publicKey}
        </p>
        <p className="my-4">
          Joined at {date.toLocaleDateString()}{' '}
          <FaCalendar className="inline align-text-top" />
        </p>
      </div>
      <Button onClick={handleSave}>Save</Button>
      {error && <p className="text-md font-medium text-red-800">{error}</p>}
    </>
  );
};

export default EditProfile;
