
const UserCard = ({ cardData }) => {
    const { name, imageUrl } = cardData;
    return (
        <div className="bg-[#2c3a47] p-10 flex items-center justify-center rounded-md">
            <div className="w-[150px] h-[150px] rounded-[100%] border flex items-center justify-center overflow-hidden">
                <img className="h-full w-full object-cover" src={imageUrl} alt="Profile" />
            </div>
        </div>
    );
};

export default UserCard;