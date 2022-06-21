import { useRouter } from "next/router";

function Alpha() {
    const router = useRouter();

    return (<div>
        <button onClick={() => router.push('/mint-nft')}>Test</button>
    </div>)
}

export default Alpha;