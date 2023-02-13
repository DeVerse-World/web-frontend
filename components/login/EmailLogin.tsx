import { useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";

function EmailSignin() {
    const [formValidated, setFormValidated] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onCreateEmail = () => {

    }

    return (
        <Form className="flex flex-col items-center text-white my-8 space-y-2 min-w-[150px] w-[30vw]"
            validated={formValidated}
            onSubmit={onCreateEmail}>
            <h2>Sign in</h2>
            <InputGroup>
                <FormControl id="input-email" required={true}
                    placeholder="Email (*)"
                    aria-label="Email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </InputGroup>
            <InputGroup>
                <FormControl id="input-password" 
                    placeholder="Password"
                    type="password"
                    aria-label="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </InputGroup>

            <Button id="btn-login"
                type="submit"
                className="font-bold bg-deverse-gradient rounded-[16px] py-2">
                Signin
            </Button>
        </Form>
    )
}

export default EmailSignin;