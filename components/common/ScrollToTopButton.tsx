import { IconButton } from '@material-ui/core';
import ArrowUpward from '@material-ui/icons/ArrowUpward';

function ScrollToTopButton(props) {
    return (
        <IconButton className="z-10 deverse-gradient" onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }} style={{
            
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