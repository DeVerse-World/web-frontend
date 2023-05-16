import { useContext, useEffect, useRef, useState } from "react";
import { Button, ButtonGroup, Dropdown, Form, FormControl, Image, InputGroup, Modal, ProgressBar } from "react-bootstrap";
import { useRouter } from "next/router";
import AssetService from "../../data/services/AssetService";
import { NFTAsset } from "../../data/model/nft_asset";
import { AssetType } from "../../data/enum/asset_type";
import { AppContext, ViewState } from "../../components/contexts/app_context";
import Link from "next/link";
import LayoutWrapper from "../../components/LayoutWrapper";
import { TabHeaderBar } from "../../components/common/TabHeader";

function Mint() {
    const { user, setViewState } = useContext(AppContext);
    const router = useRouter();

    const [assetName, setAssetName] = useState('');
    const [assetDescription, setAssetDescription] = useState('');
    const [assetType, setAssetType] = useState<AssetType>(AssetType.IMAGE_2D);
    const [assetSupply, setAssetSupply] = useState<number>(0);
    const [uploadProgress, setUploadProgress] = useState(-1);
    const [fileAssetUri, setfileAssetUri] = useState('');
    const [fileAssetName, setfileAssetName] = useState("");
    const [fileAssetUriFromCentralized, setfileAssetUriFromCentralized] = useState("");
    const [file2dUri, setfile2dUri] = useState("")
    const [file3dUri, setfile3dUri] = useState("")
    const [assetOnlinePath, setAssetOnlinePath] = useState('');
    const [formValidated, setFormValidated] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const uploadFileAssetRef = useRef(null);
    const uploadFile2dRef = useRef(null);
    const uploadFile3dRef = useRef(null);
    const [tempInput, setTempInput] = useState('');

    useEffect(() => {
        if (!router.isReady) return;
        let query = router.query;
        if (query['fileUri']) {
            setfileAssetUri(AssetService.getFullAssetUrl(query['fileUri'] as string));
        }
    }, [router.isReady])

    useEffect(() => {
        if (uploadProgress >= 100)
            setUploadProgress(-1);
    }, [uploadProgress])

    const onUploadAsset = async (e) => {
        const file: File = e.target.files[0];
        try {
            setUploadProgress(0);
            let uploadPath = await AssetService.uploadAsset(file, setUploadProgress);
            console.log(file);
            switch (e.target.name) {
                case "2dUpload":
                    setfile2dUri(uploadPath);
                    break;
                case "3dUpload":
                    setfile3dUri(uploadPath);
                    break;
                case "assetUpload":
                    setfileAssetName(file.name);
                    setfileAssetUri(uploadPath);
                    break;
                case "assetCentralizedUpload":
                    setfileAssetUriFromCentralized(uploadPath);
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
        // const isValidName = await validateName();
        // if (!isValidName) {
        //     alert("invalid name, either locked or used by others")
        //     return;
        // }
        if (!(assetName && assetType && assetSupply > 0 && fileAssetUri)) {
            return;
        }
        console.log("File Asset URI " + fileAssetUri);
        let data: NFTAsset = {
            name: assetName,
            description: assetDescription,
            supply: assetSupply,
            assetType: assetType,
            fileAssetUri: fileAssetUri,
            fileAssetName: fileAssetName,
            fileAssetUriFromCentralized: fileAssetUriFromCentralized,
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

    const validateName = async () => {
        const checkNameRes = await AssetService.checkName(assetName);
        console.log(checkNameRes.status);
        console.log(checkNameRes.data);
        if (checkNameRes.status == 200 && checkNameRes.data["data"]["exist"] == false) {
            return true;
        }
        return false;
    }

    const renderUploadProgress = () => {
        if (uploadProgress < 0 || uploadProgress > 100)
            return null;
        return (<ProgressBar className='w-[80%]' now={uploadProgress} label={`${uploadProgress}%`} />)
    }

    // if (!user) {
    //     return <UnauthorizedView />
    // }

    return (
        <LayoutWrapper>
            <TabHeaderBar data={[
                { href: '/create', label: 'Avatar' },
                { href: '/create/mint', label: 'Mint' },
                { href: '/create/ig-editor', label: 'World Builder' },
                { href: '/create/ue-sdk', label: 'Unreal Engine SDK' }
            ]} />
            <div id="section-content" className="flex justify-center">
                <Form className="flex flex-col items-center text-white my-8 space-y-2 min-w-[300px] w-[40vw]"
                    validated={formValidated}
                    onSubmit={createItem}>
                    <h2>Create your own NFT</h2>
                    <InputGroup>
                        <FormControl id="input-nft-name" required={true}
                            placeholder="Asset Name (*)"
                            aria-label="Asset Name"
                            value={assetName}
                            onChange={e => setAssetName(e.target.value)}
                        />
                    </InputGroup>
                    <InputGroup>
                        <FormControl id="input-nft-description" as="textarea" className='h-[80px]'
                            placeholder="Description"
                            aria-label="Description"
                            value={assetDescription}
                            onChange={e => setAssetDescription(e.target.value)}
                        />
                    </InputGroup>
                    <InputGroup>
                        <FormControl
                            id="input-nft-supply"
                            required={true}
                            type='number'
                            placeholder="Number of supply (between 1 and 999) (*)"
                            inputMode='numeric'
                            aria-label="Supply"
                            value={assetSupply != 0 ? assetSupply : ''}
                            onChange={e => setAssetSupply(e.target.value)}
                        />
                    </InputGroup>
                    <InputGroup>
                        <FormControl
                            id="input-nft-type"
                            required={true}
                            placeholder="Asset Type (*)"
                            aria-label="Asset Type"
                            readOnly
                            value={assetType ? assetType : ''}
                        />
                        <Dropdown as={ButtonGroup}>
                            <Dropdown.Toggle id="dropdown-custom-2" style={{
                                backgroundImage: "linear-gradient(to bottom, rgb(97 198 208), rgb(64 175 217))"
                            }} />
                            <Dropdown.Menu variant="dark">
                                <Dropdown.Item onClick={(e) => setAssetType(AssetType.IMAGE_2D)}>2D Image</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => setAssetType(AssetType.RACE)}>Character Race</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => setAssetType(AssetType.AVATAR)}>Character Avatar</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => setAssetType(AssetType.GAME_MODE)}>New Gameplay mode</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => setAssetType(AssetType.BOT_LOGIC)}>New Bot Logic</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </InputGroup>
                    <InputGroup>
                        <FormControl
                            id="input-nft-storage-link"
                            placeholder="Asset Centralized Storage Link"
                            aria-label="Asset Centralized Storage Link"
                            value={fileAssetUriFromCentralized}
                            onChange={e => setfileAssetUriFromCentralized(e.target.value)}
                        />
                    </InputGroup>
                    <InputGroup>
                        <FormControl
                            id="input-nft-asset-url"
                            required
                            placeholder="Asset URL (e.g .webp/ .pak) (*)"
                            aria-label="Asset URL (e.g .webp/ .pak)"
                            value={fileAssetUri || tempInput}
                            onBlur={(e) => {
                                setfileAssetUri(e.target.value)
                                setTempInput('')
                            }}
                            onChange={e => {
                                if (fileAssetUri) {
                                    setfileAssetUri(null)
                                }
                                setTempInput(e.target.value)
                            }}
                        />
                        <Button className='bg-deverse-gradient'
                            onClick={e => {
                                uploadFileAssetRef.current.click();
                            }}>Choose File</Button>
                    </InputGroup>
                    {(assetType != AssetType.IMAGE_2D) && <InputGroup>
                        <FormControl
                            id="input-nft-2d-url"
                            className="pointer-events-none"
                            placeholder="Asset 2D URL (e.g .webp)"
                            aria-label="Asset 2D URL (e.g .webp)"
                            value={file2dUri || ""}
                        />
                        <Button className='bg-deverse-gradient'
                            onClick={e => {
                                uploadFile2dRef.current.click();
                            }}>Choose File</Button>
                    </InputGroup>}
                    {(assetType != AssetType.IMAGE_2D) && <InputGroup>
                        <FormControl
                            id="input-nft-3d-url"
                            className="pointer-events-none"
                            required
                            placeholder="Asset 3D URL (e.g .glb)"
                            aria-label="Asset 3D URL (e.g .gltf)"
                            value={file3dUri || ""}
                        />
                        <Button className='bg-deverse-gradient'
                            onClick={e => {
                                uploadFile3dRef.current.click();
                            }}>Choose File</Button>
                    </InputGroup>}
                    {renderUploadProgress()}
                    <input
                        ref={uploadFileAssetRef}
                        accept=".webp,.pak,.webp,.jpeg"
                        hidden={true}
                        type="file"
                        name="assetUpload"
                        onChange={onUploadAsset}
                    />
                    {
                        (assetType == AssetType.IMAGE_2D) && fileAssetUri && (
                            <Image className="rounded mt-4 max-w-[80vw]"
                                width={250}
                                height={250}
                                src={fileAssetUri}
                                alt="Image" />
                        )
                    }
                    <input
                        ref={uploadFile2dRef}
                        hidden={true}
                        accept=".webp,.webp,.jpeg"
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
                        accept=".glb"
                        type="file"
                        name="3dUpload"
                        onChange={onUploadAsset}
                    />
                    <Button id="btn-mint-nft"
                        type="submit"
                        className="font-bold bg-deverse-gradient rounded-[16px] py-2">
                        Create Digital Asset
                    </Button>
                </Form>
            </div>
            <Modal centered show={showModal}
                onHide={() => {
                    router.push({
                        pathname: '/marketplace',
                        // query: {
                        //     tab: tab
                        // }
                    });
                    // props.onNftCreated(assetType, assetOnlinePath);
                }}
                contentClassName="bg-deverse-gradient" dialogClassName="deverse-dialog">
                <Modal.Body className="text-white text-lg break-words">
                    Mint successfully!<br />
                    Asset generated at: <Link href={AssetService.getFullAssetUrl(assetOnlinePath)}>{AssetService.getFullAssetUrl(assetOnlinePath)}</Link>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{
                        background: "linear-gradient(to bottom, rgb(65, 117, 230), rgb(18, 54, 173))",
                        width: 80
                    }} onClick={() => {
                        router.push({
                            pathname: '/marketplace',
                            // query: {
                            //     tab: tab
                            // }
                        });
                    }} >
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </LayoutWrapper>
    )
}

export default Mint;