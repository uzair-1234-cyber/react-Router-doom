

const Button = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold h-[50px] w-[200px] cursor-pointer rounded"
    >
      {text}
    </button>
  )
}

export default Button