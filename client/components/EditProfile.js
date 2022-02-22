import { isWebUri } from 'valid-url';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useContext } from 'react';
import { TMACContext } from '../context/TossMeACoinContext';
import { FaCalendar } from 'react-icons/fa';
import Button from './Button';

const EditProfile = ({ creator, publicKey }) => {
  const { saveToDB } = useContext(TMACContext);
  const date = new Date(creator.createdAt);
  const router = useRouter();

  const [username, setUsername] = useState(creator.name ? creator.name : '');
  const [bio, setBio] = useState(creator.bio ? creator.bio : '');
  const [link, setLink] = useState(
    creator.customLink ? creator.customLink : ''
  );
  const [error, setError] = useState('');

  const handleSave = async () => {
    if (link && !isWebUri(link)) {
      setError('Please enter a valid url');
      return;
    }
    saveToDB({
      publicKey,
      name: username,
      bio,
      customLink: link,
    });
    router.reload();
  };

  return (
    <>
      <div className="my-2">
        <div className="w-36 h-36 mx-auto">
          <div className="rounded-full shadow-sm">
            <Image
              src={creator.avatarURL ? creator.avatarURL : '/Avatar.png'}
              width={128}
              height={128}
              alt="User avatar"
              className="rounded-full shadow-sm"
            ></Image>
          </div>
        </div>
        <div className="my-4">
          <div className="m-2">
            <label className="block mb-2 text-xl font-medium text-[#262626]">
              Your name
            </label>
            <input
              type="text"
              className="shadow-sm bg-[#6666ff] border border-[#6666ff] text-[#ffffff] placeholder-gray-200 text-sm rounded-lg focus:ring-[#5e17eb] focus:border-[#5e17eb] block w-full p-2.5"
              placeholder={!creator.name ? 'Username' : undefined}
              maxLength="32"
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
              placeholder={!creator.bio ? 'Bio' : undefined}
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
              placeholder={!creator.customLink ? 'Link' : undefined}
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
