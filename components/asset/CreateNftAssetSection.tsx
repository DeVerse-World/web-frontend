import AssetService from "../../data/services/asset_service";
import React, { HTMLAttributes, useContext, useEffect, useRef, useState } from "react";
import { Button, ButtonGroup, Dropdown, DropdownButton, Form, FormControl, Image, InputGroup, Modal, ProgressBar } from 'react-bootstrap'
import { NFTAsset } from "../../data/model/nft_asset";
import { AssetType } from '../../data/enum/asset_type';
import { AppContext, ViewState } from "../contexts/app_context";

// 2dImg, race, skin, gameplay, bot

type CreateNftAssetSectionProps = {
    isSelected?: boolean;
    fileUri?: string;
    onNftCreated: (assetUri: string) => void;
}

export default function CreateNftAssetSection(props: CreateNftAssetSectionProps) {
    const { setViewState } = useContext(AppContext);

    const [assetName, setAssetName] = useState('');
    const [assetDescription, setAssetDescription] = useState('');
    const [assetType, setAssetType] = useState<AssetType>(undefined);
    const [assetSupply, setAssetSupply] = useState<number>(0);
    const [uploadProgress, setUploadProgress] = useState(-1);
    const [fileAssetUri, setfileAssetUri] = useState(props.fileUri);
    const [file2dUri, setfile2dUri] = useState("")
    const [file3dUri, setfile3dUri] = useState("")
    const [assetOnlinePath, setAssetOnlinePath] = useState('');
    const [formValidated, setFormValidated] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const uploadFileAssetRef = useRef(null);
    const uploadFile2dRef = useRef(null);
    const uploadFile3dRef = useRef(null);

    useEffect(() => {
        if (uploadProgress >= 100)
            setUploadProgress(-1);
    }, [uploadProgress])

    const onUploadAsset = async (e) => {
        const file: File = e.target.files[0];
        try {
            setUploadProgress(0);
            let uploadPath = await AssetService.uploadAsset(file, setUploadProgress);
            switch (e.target.name) {
                case "2dUpload":
                    setfile2dUri(uploadPath);
                    break;
                case "3dUpload":
                    setfile3dUri(uploadPath);
                    break;
                case "assetUpload":
                    setfileAssetUri(uploadPath);
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.log('Error uploading file: ', error);
            setUploadProgress(-1);
        }
    }

    const createItem = async (event) => {
        setFormValidated(true);
        event.preventDefault();
        if (!(assetName && assetType && assetSupply > 0 && fileAssetUri)) {
            return;
        }
        let data: NFTAsset = {
            name: assetName,
            description: assetDescription,
            supply: assetSupply,
            assetType: assetType,
            fileAssetUri: fileAssetUri,
            file2dUri: file2dUri,
            file3dUri: file3dUri,
        };
        try {
            setViewState(ViewState.LOADING);
            const addedPath = await AssetService.createAsset(data);
            setAssetOnlinePath(addedPath);
            setShowModal(true);
            setViewState(ViewState.SUCCESS);
        } catch (error) {
            console.log('Error uploading file: ', error)
            setViewState(ViewState.ERROR);
        }
    }

    const resetForm = () => {
        setShowModal(false);
        setFormValidated(false);
        setAssetName('');
        setAssetDescription('');
        setAssetType(null);
        setAssetSupply(0);
        setfileAssetUri('');
        setfile2dUri('');
        setfile3dUri('');
        setAssetOnlinePath('');
    }

    const renderUploadProgress = () => {
        if (uploadProgress < 0 || uploadProgress > 100)
            return null;
        return (<ProgressBar className='w-[80%]' now={uploadProgress} label={`${uploadProgress}%`} />)
    }

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return props.isSelected && (
        <div className="flex justify-center">
            <Form className="flex flex-col items-center text-white my-8 space-y-2 min-w-[300px] w-[40vw]"
                validated={formValidated}
                onSubmit={createItem}>
                <InputGroup>
                    <FormControl required={true}
                        placeholder="Asset Name (*)"
                        aria-label="Asset Name"
                        value={assetName}
                        onChange={e => setAssetName(e.target.value)}
                    />
                </InputGroup>
                <InputGroup>
                    <FormControl className='h-[100px]'
                        placeholder="Description"
                        aria-label="Description"
                        value={assetDescription}
                        onChange={e => setAssetDescription(e.target.value)}
                    />
                </InputGroup>
                <InputGroup>
                    <FormControl required={true}
                        type='number'
                        placeholder="Number of supply (between 1 and 999) (*)"
                        inputMode='numeric'
                        aria-label="Supply"
                        value={assetSupply != 0 ? assetSupply : ''}
                        onChange={e => setAssetSupply(e.target.value)}
                    />
                </InputGroup>
                <InputGroup>
                    <FormControl required={true}
                        placeholder="Asset Type (*)"
                        aria-label="Asset Type"
                        contentEditable={false}
                        value={assetType ? assetType : ''}
                    />
                    <Dropdown as={ButtonGroup}>
                        <Dropdown.Toggle id="dropdown-custom-2" style={{
                            backgroundImage: "linear-gradient(to bottom, rgb(97 198 208), rgb(64 175 217))"
                        }} />
                        <Dropdown.Menu className="super-colors">
                            <Dropdown.Item onClick={(e) => setAssetType(AssetType.IMAGE_2D)}>2D Image</Dropdown.Item>
                            <Dropdown.Item onClick={(e) => setAssetType(AssetType.RACE)}>Character Race</Dropdown.Item>
                            <Dropdown.Item onClick={(e) => setAssetType(AssetType.SKIN)}>Character Skin</Dropdown.Item>
                            <Dropdown.Item onClick={(e) => setAssetType(AssetType.GAME_MODE)}>New Gameplay mode</Dropdown.Item>
                            <Dropdown.Item onClick={(e) => setAssetType(AssetType.BOT_LOGIC)}>New Bot Logic</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </InputGroup>
                <InputGroup>
                    <FormControl
                        required
                        placeholder="Asset URL (e.g .png/ .pak) (*)"
                        aria-label="Asset URL (e.g .png/ .pak)"
                        contentEditable={false}
                        value={fileAssetUri || ""}
                    />
                    <Button className='deverse-gradient'
                        onClick={e => {
                            uploadFileAssetRef.current.click();
                        }}>Choose File</Button>
                </InputGroup>
                {(assetType != AssetType.IMAGE_2D) && <InputGroup>
                    <FormControl
                        placeholder="Asset 2D URL (e.g .png)"
                        aria-label="Asset 2D URL (e.g .png)"
                        disabled={true}
                        value={file2dUri || ""}
                    />
                    <Button className='deverse-gradient'
                        onClick={e => {
                            uploadFile2dRef.current.click();
                        }}>Choose File</Button>
                </InputGroup>}
                {(assetType != AssetType.IMAGE_2D) && <InputGroup>
                    <FormControl
                        placeholder="Asset 3D URL (e.g .gltf)"
                        aria-label="Asset 3D URL (e.g .gltf)"
                        disabled={true}
                        value={file3dUri || ""}
                    />
                    <Button className='deverse-gradient'
                        onClick={e => {
                            uploadFile3dRef.current.click();
                        }}>Choose File</Button>
                </InputGroup>}
                {renderUploadProgress()}
                <input
                    ref={uploadFileAssetRef}
                    accept=".png,.pak,.jpg,.jpeg"
                    hidden={true}
                    type="file"
                    name="assetUpload"
                    onChange={onUploadAsset}
                />
                {
                    (assetType == AssetType.IMAGE_2D) && fileAssetUri && (
                        <Image className="rounded mt-4 max-w-[80vw]" width={250} height={250} src={fileAssetUri} />
                    )
                }
                <input
                    ref={uploadFile2dRef}
                    hidden={true}
                    accept=".png,.jpg,.jpeg"
                    type="file"
                    name="2dUpload"
                    onChange={onUploadAsset}
                />
                {
                    (assetType != AssetType.IMAGE_2D) && file2dUri && (
                        <Image className="rounded mt-4 max-w-[80vw]" width={250} height={250} src={file2dUri} />
                    )
                }
                <input
                    ref={uploadFile3dRef}
                    hidden={true}
                    accept=".gltf"
                    type="file"
                    name="3dUpload"
                    onChange={onUploadAsset}
                />
                {
                }
                <Button type="submit" className="font-bold deverse-gradient rounded-[16px] py-3 px-8"
                    onClick={createItem} >
                    Create Digital Asset
                </Button>
            </Form>
            <Modal centered show={showModal}
                onHide={() => {
                    props.onNftCreated(assetOnlinePath);
                    resetForm();

                }}
                contentClassName="deverse-gradient" dialogClassName="deverse-dialog">
                <Modal.Body className="text-white text-lg break-words">
                    Mint successfully!<br />
                    Asset generated at: <a target="_blank" href={AssetService.getFullAssetUrl(assetOnlinePath)}>{AssetService.getFullAssetUrl(assetOnlinePath)}</a>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{
                        background: "linear-gradient(to bottom, rgb(65, 117, 230), rgb(18, 54, 173))",
                        width: 80
                    }} onClick={() => {
                        props.onNftCreated(assetOnlinePath);
                        resetForm();
                    }} >
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
