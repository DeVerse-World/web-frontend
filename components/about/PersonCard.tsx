const PersonCard = ({ thumbnail, name, title, education, linkedinLink }) => {
    return (
        <div>
            <img className="aspect-[14/13] w-full rounded-2xl object-cover" src={thumbnail} alt="" />
            <div className="mt-4 text-lg font-semibold leading-8 tracking-tight text-white">{name}</div>
            <div  className="text-base leading-7 text-gray-300">{title}</div>
            <div className="text-sm leading-6 text-gray-500">{education}</div>
            <a href={linkedinLink} className="text-sm font-semibold leading-6 text-brand">
                Profile<span aria-hidden="true">&rarr;</span>
            </a>
        </div>
    );
}

export default PersonCard;