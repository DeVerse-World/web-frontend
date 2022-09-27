import { ReactNode } from "react";
import Footer from "./common/Footer";
import TabHeader from "./common/TabHeader";
import CommonLayout from "./common/CommonLayout";

type Props = {
    children: ReactNode
}

const CreateLayout = (props: Props) => (
    <CommonLayout>
        <section id='section-content' className='flex flex-col justify-between '>
            <span className="tab-bar" >
                <TabHeader href="/create">Avatar</TabHeader>
                <TabHeader href="/create/ig-editor">Ingame Editor</TabHeader>
                <TabHeader href="/create/ue-sdk">Unreal Engine SDK</TabHeader>
            </span>
            {props.children}
            <Footer />
        </section>
    </CommonLayout>
);

export const getCreateLayout = page => <CreateLayout>{page}</CreateLayout>;

export default CreateLayout;