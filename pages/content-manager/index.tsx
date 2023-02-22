import React, { useContext } from 'react';
import 'react-quill/dist/quill.snow.css';
import { AppContext } from '../../components/contexts/app_context';
import UnauthorizedView from '../../components/UnauthorizedView';
import { Accordion } from 'react-bootstrap';
import { useRouter } from 'next/router';
import LayoutWrapper from '../../components/LayoutWrapper';
import FilterTab from '../../components/FilterTab';
import PolicyEditor from './policy-editor';
import TermOfUseEditor from './term-of-use-editor';

enum CMTabKey {
    TOU = "tou", POLICY = "policy"
}

export default function ContentManager() {
    const { user } = useContext(AppContext);
    const router = useRouter();

    const renderContent = () => {
        if (router.isReady) {
            switch (router.query['subtype']) {
                case CMTabKey.POLICY:
                    return <PolicyEditor />
                case CMTabKey.TOU:
                default:
                    return <TermOfUseEditor />
            }
        }
        return null;
    }

    // if (user == null) {
    //     return <UnauthorizedView />
    // }

    return (
        <LayoutWrapper tab={
            <div className="h-[100%] bg-gray-900 w-[160px]">
                <Accordion defaultActiveKey={CMTabKey.POLICY} className="text-white" flush>
                    <Accordion.Collapse eventKey={CMTabKey.POLICY}>
                        <FilterTab type="cm" data={[
                            { label: "Term Of use" },
                            { label: "Privacy", subType: "policy" },
                        ]} />
                    </Accordion.Collapse>
                </Accordion>
            </div>
        }>
            <div id='section-content'>
                {renderContent()}
            </div>
        </LayoutWrapper>
    )
}