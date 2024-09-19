
const UserCard = ({ cardData }) => {
    const { name, imageUrl } = cardData;
    return (
        <div className="bg-[#2c3a47] p-3 flex items-center justify-center rounded-md">
            <div className="w-[125px] h-[160px] rounded-[100%] border object-cover flex items-center justify-center">
                <img className="" src={imageUrl} alt="Profile" />
            </div>
        </div>
    );
};

export default UserCard;