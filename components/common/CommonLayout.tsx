import { ReactNode } from "react";
import Sidebar from "../Sidebar";
import BaseLayout from "./BaseLayout";

type Props = {
    children: ReactNode
}

const CommonLayout = (props: Props) => (
    <BaseLayout>
        <div className='flex flex-row bg-deverse'>
            <Sidebar />
            {props.children}
        </div>
    </BaseLayout>
);

export const getCommonLayout = page => <CommonLayout>{page}</CommonLayout>;

export default CommonLayout;
