import { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AppContext, ViewState } from "../../components/contexts/app_context";
import { TabHeaderBar } from "../../components/common/TabHeader";
import AvatarService from "../../data/services/AvatarService";

const AvatarForm = dynamic(() => import("../../components/create/AvatarForm"));

function Avatar() {
    const { setViewState, user } = useContext(AppContext);
    const [showAvatarForm, setShowAvatarForm] = useState(false);
    const [createdModelUri, setCreatedModelUri] = useState('');
    const [creatingAvatarName, setCreatingAvatarName] = useState('');
    const handleRPMEvent = (e: MessageEvent) => {
        if (!e.origin.includes('readyplayer.me') || !e.data.includes('.glb')) {
            return;
        }
        setCreatedModelUri(e.data)
        setCreatingAvatarName('');
        setShowAvatarForm(true);
    }

    const onSaveAvatar = () => {
        if (!user) {
            return;
        }
        setShowAvatarForm(false);
        setViewState(ViewState.LOADING);
        AvatarService.getAvatars(user.id).then(avaRes => {
            if (avaRes.isSuccess()) {
                const existingAvatar = avaRes.value.avatars.find(e => e.preprocess_url == createdModelUri);
                AvatarService.get2DAvatarRPM(createdModelUri).then(twoDAvarRes => {
                    if (existingAvatar) {
                        AvatarService.updateAvatar(existingAvatar, creatingAvatarName, createdModelUri, twoDAvarRes).finally(() => {
                            setViewState(ViewState.SUCCESS);
                        })
                    } else {
                        AvatarService.createAvatar(creatingAvatarName, createdModelUri, twoDAvarRes)
                            .catch((e) => {
                                console.log(e)
                            })
                            .finally(() => {
                                setViewState(ViewState.SUCCESS);
                            });
                    }
                }).catch(e => {
                    console.log(e)
                    setViewState(ViewState.ERROR);
                });
            }
        }).catch((e) => {
            setViewState(ViewState.ERROR);
        });
    }

    useEffect(() => {
        window.addEventListener('message', handleRPMEvent);
        return () => {
            window.removeEventListener('keydown', handleRPMEvent);
        }
    }, [])

    return (
        <div className="h-full">
            <TabHeaderBar data={[
                { href: '/create', label: 'Avatar' },
                // { href: '/create/mint', label: 'Mint' },
                { href: '/create/ig-editor', label: 'World Builder' },
                // { href: '/create/ue-sdk', label: 'Unreal Engine SDK' },
            ]} />
            <iframe allow="camera *; microphone *"
                title="Ready Player Me"
                className='w-full h-full min-w-[600px]'
                src='https://deverse.readyplayer.me/avatar?frameApi' />
            {showAvatarForm &&
                <AvatarForm
                    header="Save your Avatar"
                    onChangeAvatarName={setCreatingAvatarName}
                    onSaveAvatar={onSaveAvatar}
                />
            }
        </div>
    )
}

export default Avatar;