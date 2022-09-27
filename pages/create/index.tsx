import { useContext, useEffect, useState } from "react";
import { FormControl, InputGroup, Modal } from "react-bootstrap";
import { AppContext, ViewState } from "../../components/contexts/app_context";
import AvatarService from "../../data/services/AvatarService";
import { getCreateLayout } from "../../components/CreateLayout";


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
        setShowAvatarForm(false);
        setViewState(ViewState.LOADING);

        AvatarService.getAvatars(user?.id).then(avaRes => {
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
        <>
            <iframe allow="camera *; microphone *"
                title="Ready Player Me"
                className='rpo'
                src='https://deverse.readyplayer.me/avatar?frameApi' />
            {showAvatarForm &&
                <Modal centered show={true}
                    contentClassName="bg-black" dialogClassName="deverse-dialog">
                    <Modal.Header className="flex flex-row">
                        <h3 className="text-white text-center">Save your Avatar</h3>
                    </Modal.Header>
                    <Modal.Body className="text-white text-lg break-words flex flex-col gap-4 items-center">
                        <InputGroup>
                            <FormControl id="input-user-name"
                                required
                                placeholder="A sexy duck"
                                aria-label="Name"
                                onChange={(e) => {
                                    setCreatingAvatarName(e.target.value)
                                }}
                            />
                        </InputGroup>
                        <button className="bg-deverse-gradient px-4 py-1 rounded-xl" onClick={onSaveAvatar}>Save</button>
                    </Modal.Body>
                </Modal>
            }
        </>
    )
}

Avatar.getLayout = getCreateLayout

export default Avatar;