const DonationCard = ({ donation, address }) => {
  return (
    <div
      key={donation.timestamp}
      className="text-left p-4 break-all text-white bg-[#6666ff] shadow-xl m-4 rounded-xl"
    >
      {address == donation.addressTo.toLowerCase() ? (
        <>
          <h3 className="text-xl font-bold pb-2">Received from:</h3>
          <p className="pb-4">{donation.addressFrom}</p>{' '}
        </>
      ) : (
        <>
          <h3 className="text-xl font-bold pb-2">Sent to:</h3>
          <p className="pb-4">{donation.addressTo}</p>
        </>
      )}
      <h3 className="text-xl font-bold pb-2">Amount:</h3>
      <p className="pb-4">{donation.amount} ETH</p>
      <h3 className="text-xl font-bold pb-2">Name:</h3>
      <p className="pb-4">{donation.name}</p>
      <h3 className="text-xl font-bold pb-2">Message:</h3>
      <p className="pb-4">{donation.message}</p>
      <p className="text-center font-bold">{donation.timestamp}</p>
    </div>
  );
};

export default DonationCard;
