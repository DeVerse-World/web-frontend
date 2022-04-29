import { IconButton } from '@material-ui/core';
import ArrowUpward from '@material-ui/icons/ArrowUpward';

function ScrollToTopButton(props) {
    return (
        <IconButton className="z-10" onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }} style={{
            background: "#0197f6",
            color: "white",
            position: "fixed",
            bottom: 16,
            right: 16
        }}>
            <ArrowUpward />
        </IconButton>
    )
}

export default ScrollToTopButton;