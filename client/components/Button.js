const Button = ({ children, onClick }) => {
  return (
    <button
      className="bg-[#6666ff] hover:bg-[#5e17eb] text-white font-bold py-2 px-4 rounded-full"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
