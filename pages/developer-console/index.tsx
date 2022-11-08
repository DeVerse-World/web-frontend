import { useContext, useState } from "react";
import { Button, Dropdown, DropdownButton, Form, FormControl, InputGroup } from "react-bootstrap";
import { AppContext } from "../../components/contexts/app_context";
import UnauthorizedView from "../../components/UnauthorizedView";
import deverseClient from "../../data/api/deverse_client";

export default function DC() {
    const { user } = useContext(AppContext);
    const [requestType, setRequestType] = useState('GET');
    const [response, setResponse] = useState();
    const [requestBody, setRequestBody] = useState('');
    const [useCredential, setUseCredential] = useState(false);
    const [url, setUrl] = useState('');

    if (user == null) {
        return <UnauthorizedView/>
    }

    const onSendRequest = (e) => {
        e.preventDefault();
        try {
            switch (requestType) {
                case 'GET':
                    deverseClient.get(url).then(res => {
                        setResponse(JSON.stringify(res.data, null, "\t"))
                    })
                    break;
                case 'POST':
                    deverseClient.post(url, JSON.parse(requestBody), {
                        withCredentials: useCredential
                    }).then(res => {
                        setResponse(JSON.stringify(res.data, null, "\t"))
                    })
                    break;
                case 'PUT':
                    deverseClient.put(url, JSON.parse(requestBody), {
                        withCredentials: useCredential
                    }).then(res => {
                        setResponse(JSON.stringify(res.data, null, "\t"))
                    })
                    break;
                case 'PATCH':
                    deverseClient.patch(url, JSON.parse(requestBody), {
                        withCredentials: useCredential
                    }).then(res => {
                        setResponse(JSON.stringify(res.data, null, "\t"))
                    })
                    break;
                case 'DELETE':
                    deverseClient.delete(url).then(res => {
                        setResponse(JSON.stringify(res.data, null, "\t"))
                    })
                    break;
                default:
                    break;
            }
        } catch (e) {
            setResponse(e)
        }
    }

    return (
        <div id='section-content' className="flex flex-col items-center p-4 text-white">
            <div>
                <h3>Your User Id: {user.id}</h3>
            </div>

            <Form className="flex flex-col items-center text-white my-8 space-y-2 min-w-[300px] w-[40vw]"
                // validated={formValidated}
                onSubmit={onSendRequest}>
                <h2>On the flight postman</h2>
                <InputGroup>
                    <Dropdown>
                        <DropdownButton variant="dark" menuVariant="dark" title={requestType} style={{
                            backgroundImage: "linear-gradient(to bottom, rgb(97 198 208), rgb(64 175 217))"
                        }}>
                            <Dropdown.Item onClick={(e) => setRequestType('GET')}>GET</Dropdown.Item>
                            <Dropdown.Item onClick={(e) => setRequestType('POST')}>POST</Dropdown.Item>
                            <Dropdown.Item onClick={(e) => setRequestType('PATCH')}>PATCH</Dropdown.Item>
                            <Dropdown.Item onClick={(e) => setRequestType('PUT')}>PUT</Dropdown.Item>
                            <Dropdown.Item onClick={(e) => setRequestType('DELETE')}>DELETE</Dropdown.Item>
                        </DropdownButton>
                    </Dropdown>

                    <Form.Control
                        id="request-link"
                        required
                        placeholder="wallet/profile"
                        aria-label="Asset Type"
                        value={url}
                        onChange={(e) => setUrl(e.currentTarget.value)}
                    />
                </InputGroup>
                <InputGroup>
                    <FormControl id="request-body" as="textarea" className='h-60'
                        placeholder="Body"
                        aria-label="Description"
                        value={requestBody}
                        onChange={(e) => setRequestBody(e.currentTarget.value)}
                    />
                </InputGroup>
                <Form.Check
                    type='checkbox'
                    id='checkbox'
                    label={`Use Credential = true`}
                    checked={useCredential}
                    onChange={(e) => setUseCredential(!useCredential)}
                // value={useCredential}
                // onChange={(e) => console.log(e.currentTarget.value)}
                />
                <Button id="btn-send-request"
                    type="submit"
                    className="font-bold bg-deverse-gradient rounded-[16px] py-2 px-4" >
                    Invoke
                </Button>
                <InputGroup>
                    <FormControl id="request-body" as="textarea" className='h-60'
                        placeholder="Response will be shown here"
                        aria-label="Description"
                        readOnly
                        value={response}
                    />
                </InputGroup>
            </Form>
        </div>
    )
}