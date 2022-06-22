import { BsFillArrowUpCircleFill } from 'react-icons/bs';
function ScrollToTopButton(props) {
    return (
        <BsFillArrowUpCircleFill className="z-10 bottom-4 right-8 fixed" fontSize="2rem" color='rgb(97 198 208)'
            onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
        />
    )
}

export default ScrollToTopButton;