import { ReactChild, ReactFragment, ReactPortal, Key } from "react";

const PersonCard = ({ thumbnail, name, title, education, linkedinLink }) => {
    return (
        <div className="relative bg-deverse-secondary">
            {linkedinLink &&
            <a href={linkedinLink} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold leading-6 text-brand">
                <div className="absolute top-0 left-0 w-6 h-6 text-blue-500 m-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-linkedin" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                    <path d="M8 11l0 5"></path>
                    <path d="M8 8l0 .01"></path>
                    <path d="M12 16l0 -5"></path>
                    <path d="M16 16v-3a2 2 0 0 0 -4 0"></path>
                </svg>
                </div>
            </a>
            }
            <img className="aspect-[14/13] w-full object-cover" src={thumbnail} alt="" />
            <div className="m-2">
                <div className="mt-1 text-lg font-semibold leading-8 tracking-tight text-white">{name}</div>
                <div className="text-base leading-7 text-gray-300">{title}</div>
                {/* <div className="text-sm leading-6 text-gray-500">
                    {Array.isArray(education) ? (
                        education.map((individualEdu, index) => (
                            <div key={index}>{individualEdu}</div>            
                        ))
                    ) : 
                            <div>{education}</div>
                    }
                </div> */}
            </div>
        </div>
    );
}

export default PersonCard;