import { useEffect } from "react";
import {useRouter} from 'next/router'
import StorageService from "../../data/services/storage_service";

export default function LoginLink() {
    const router = useRouter();
    console.log(router.query.key)
    if ('key' in router.query) {
        StorageService.setMetamaskSessionKey(router.query.key.toString())
    }

    return (
        <div>
            Click on Connect Wallet above
        </div>
    )
}