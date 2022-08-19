import BaseLayout from "../../components/common/BaseLayout";
import { getCommonLayout } from "../../components/common/CommonLayout";
import Footer from "../../components/common/Footer";
import HomeNavbar from "../../components/common/HomeNavbar";
import TabHeader from "../../components/common/TabHeader";
import Sidebar from "../../components/Sidebar";

function Avatar() {
    return (
        <div className="flex justify-center items-center text-white p-4" >
            <h1 >Coming soon</h1>
        </div>
    )
}

Avatar.getLayout = page => (
    <BaseLayout>
        <div className='flex flex-row bg-deverse '>
            <Sidebar />
            <section id='section-content' className='flex flex-col justify-between '>
                <span className="flex flex-row justify-between bg-black">
                    <span className="tab-bar flex-grow" >
                        <TabHeader href="/account">Info</TabHeader>
                        <TabHeader href="/account/avatar">Avatar</TabHeader>
                        <TabHeader href="/account/inventory">Inventory</TabHeader>
                    </span>
                </span>
                <div className="grow">
                    {page}
                </div>
                <Footer />
            </section>
        </div>
    </BaseLayout>
)

export default Avatar;