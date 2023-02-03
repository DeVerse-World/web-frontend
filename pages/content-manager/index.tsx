import React, { useContext, useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { AppContext } from '../../components/contexts/app_context';
import UnauthorizedView from '../../components/UnauthorizedView';
import BaseLayout from '../../components/common/BaseLayout';
import Footer from '../../components/common/Footer';
import Sidebar from '../../components/Sidebar';
import { Accordion } from 'react-bootstrap';
import ListingTabComponent from '../../components/ListingTab';
import { SecondaryTab } from '../../components/marketplace_tab';
import { useRouter } from 'next/router';
import PolicyEditor from './policy-editor';
import TermOfUseEditor from './term-of-use-editor';

function ContentManager() {
    const { user } = useContext(AppContext);
    const router = useRouter();
    const [visibleTab, setVisibleTab] = useState<SecondaryTab>(SecondaryTab.WORLD_ALL);

    const onSelectTab = (tab: SecondaryTab) => {
        router.push({
            pathname: router.pathname,
            query: {
                tab: tab
            }
        }, undefined, { shallow: true });
        setVisibleTab(tab);
    }

    const renderContent = () => {
        switch (visibleTab) {
            case SecondaryTab.CM_PRIVACY:
                return <PolicyEditor />
            case SecondaryTab.CM_TERM:
                return <TermOfUseEditor />
        }
        return null;
    }

    if (user == null) {
        return <UnauthorizedView />
    }

    return (
        <div className='flex flex-row bg-deverse' >
            <Sidebar >
                <div className="h-[100%] bg-gray-900 w-[160px]">
                    <Accordion defaultActiveKey="nft_type" className="text-white" flush>
                        <div className="flex flex-col">
                            <ListingTabComponent label="Privacy" tab={SecondaryTab.CM_PRIVACY} isSelected={visibleTab} onSelect={onSelectTab} />
                            <ListingTabComponent label="Term" tab={SecondaryTab.CM_TERM} isSelected={visibleTab} onSelect={onSelectTab} />
                        </div>
                    </Accordion>
                </div>
            </Sidebar>
            <section id='section-content' className='bg-deverse flex flex-col text-white' >
                {renderContent()}
                <Footer />
            </section>
        </div>
    )
}

ContentManager.getLayout = page => (
    <BaseLayout>
        {page}
    </BaseLayout>
);

export default ContentManager;