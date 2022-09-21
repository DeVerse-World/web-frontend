import { useContext, useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { AppContext } from "../../components/contexts/app_context";
import { DerivSubworldTemplate, SubworldTemplate } from "../../data/model/SubworldTemplate";
import SubWorldTemplateService from "../../data/services/SubWorldTemplateService";

export default function DC() {
    const { user } = useContext(AppContext);
    const [rootTemplate, setRootTemplate] = useState<SubworldTemplate>({
        file_name: "",
        display_name: "",
        level_ipfs_uri: "",
        level_centralized_uri: "",
        thumbnail_centralized_uri: ""
    });

    const [derivTemplate, setDerivTemplate] = useState<DerivSubworldTemplate>({
        file_name: "",
        display_name: "",
        thumbnail_centralized_uri: "",
        parent_subworld_template_id: 1
    })


    const onCreateRootTemplate = (event) => {
        event.preventDefault();
        SubWorldTemplateService.createRootTemplate(rootTemplate.file_name, rootTemplate.display_name,
            rootTemplate.level_ipfs_uri,
            rootTemplate.level_centralized_uri, rootTemplate.thumbnail_centralized_uri).then(res => {
                if (res.isSuccess()) {
                    alert(`Template created successfully with id: ${res.value?.subworld_template?.id}`)
                }
            }).catch(e => {
                console.log(e)
            })
    }

    const onCreateDerivTemplate = (event) => {
        event.preventDefault();
        SubWorldTemplateService.createDerivTemplate(derivTemplate.file_name, derivTemplate.display_name,
            derivTemplate.thumbnail_centralized_uri, derivTemplate.parent_subworld_template_id.toString()).then(res => {
                if (res.isSuccess()) {
                    alert(`Deriv Template created successfully with id: ${res.value?.subworld_template?.id}`)
                } else {
                    console.log(res.error)
                }
            }).catch(e => {
                console.log(e)
            })
    }

    if (user == null) {
        return (
            <div className="text-white">
                <h1>Login first please</h1>
            </div>
        )
    }
    return (
        <div id='section-content' className="flex flex-col items-center">
            <Form className="flex flex-col items-center text-white my-8 space-y-2 min-w-[300px] w-[40vw]"
                // validated={formValidated}
                onSubmit={onCreateRootTemplate}>
                <h2>Create Root Template</h2>
                <InputGroup>
                    <FormControl id="input-nft-name" required
                        placeholder="File Name (*)"
                        value={rootTemplate?.file_name}
                        onChange={e => setRootTemplate({ ...rootTemplate, file_name: e.target.value })}
                    />
                </InputGroup>
                <InputGroup>
                    <FormControl id="display_name" required
                        placeholder="Display Name (*)"
                        value={rootTemplate?.display_name}
                        onChange={e => setRootTemplate({ ...rootTemplate, display_name: e.target.value })}
                    />
                </InputGroup>
                <InputGroup>
                    <FormControl id="level_ipfs_uri"
                        placeholder="Level ipfs uri"
                        value={rootTemplate?.level_ipfs_uri}
                        onChange={e => setRootTemplate({ ...rootTemplate, level_ipfs_uri: e.target.value })}
                    />
                </InputGroup>
                <InputGroup>
                    <FormControl id="level_centralized_uri"
                        placeholder="Level centralized url"
                        value={rootTemplate?.level_centralized_uri}
                        onChange={e => setRootTemplate({ ...rootTemplate, level_centralized_uri: e.target.value })}
                    />
                </InputGroup>
                <InputGroup>
                    <FormControl id="thumbnail_centralized_uri" required
                        placeholder="Thumbnail centralized uri"
                        value={rootTemplate?.thumbnail_centralized_uri}
                        onChange={e => setRootTemplate({ ...rootTemplate, thumbnail_centralized_uri: e.target.value })}
                    />
                </InputGroup>
                <Button id="btn-mint-nft"
                    type="submit"
                    className="font-bold bg-deverse-gradient rounded-[16px] py-2" >
                    Create
                </Button>
            </Form>
            <Form className="flex flex-col items-center text-white my-8 space-y-2 min-w-[300px] w-[40vw]"
                // validated={formValidated}
                onSubmit={onCreateDerivTemplate}>
                <h2>Create Deriv Template</h2>
                <InputGroup>
                    <FormControl id="1" required
                        placeholder="File Name (*)"
                        value={derivTemplate?.file_name}
                        onChange={e => setDerivTemplate({ ...derivTemplate, file_name: e.target.value })}
                    />
                </InputGroup>
                <InputGroup>
                    <FormControl id="2" required
                        placeholder="Display Name (*)"
                        value={derivTemplate?.display_name}
                        onChange={e => setDerivTemplate({ ...derivTemplate, display_name: e.target.value })}
                    />
                </InputGroup>
                <InputGroup>
                    <FormControl id="3" required
                        placeholder="Thumbnail uri"
                        value={derivTemplate?.thumbnail_centralized_uri}
                        onChange={e => setDerivTemplate({ ...derivTemplate, thumbnail_centralized_uri: e.target.value })}
                    />
                </InputGroup>
                <InputGroup>
                    <FormControl id="4"
                        inputMode="numeric"
                        placeholder="Root template id (*)" required
                        value={derivTemplate?.parent_subworld_template_id}
                        onChange={e => setDerivTemplate({ ...derivTemplate, parent_subworld_template_id: parseInt(e.target.value) })}
                    />
                </InputGroup>
                <Button id="btn-mint-nft"
                    type="submit"
                    className="font-bold bg-deverse-gradient rounded-[16px] py-2" >
                    Create
                </Button>
            </Form>
        </div>
    )
}