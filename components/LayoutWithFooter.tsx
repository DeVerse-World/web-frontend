import { ReactNode } from "react";
import Footer from "./common/Footer";
import CommonLayout from "./common/CommonLayout";

type Props = {
    children: ReactNode
}

const LayoutWithFooter = (props: Props) => (
    <CommonLayout>
        <section id='section-content' className='flex flex-col justify-between '>
            {props.children}
            <Footer />
        </section>
    </CommonLayout>
);

export const getLayoutWithFooter = page => <LayoutWithFooter>{page}</LayoutWithFooter>;

export default LayoutWithFooter;