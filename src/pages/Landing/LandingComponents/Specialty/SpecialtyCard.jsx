
const SpecialtyCard = ({ cardDataInfo }) => {

    const { image, tittle, desc } = cardDataInfo;

    return (
        <div className="border rounded-3xl hover:border-2 hover:border-transparent hover:bg-clip-border hover:bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300">
            <div className="bg-white p-8 md:p-10 rounded-3xl m-[2px] flex flex-col gap-5">
                <div className="w-full flex items-center justify-center">
                    <img className="h-10 w-10" src={image} alt={tittle} />
                </div>
                <h4 className="text-center font-bold md:text-xl text-gray-950">{tittle}</h4>
                <p className="text-center font-semibold text-gray-800">{desc}</p>
            </div>
        </div>
    );
};

export default SpecialtyCard;