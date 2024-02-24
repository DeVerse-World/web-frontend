import { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/app_context";
import AccountService from "../../data/services/AccountService";
import Link from 'next/link'

const EditNamActionPanel = () => {
    // Conditions to show:
    // 1. user.name is empty
    // 2. user's world > 0
    // 3. user da login
    const { user } = useContext(AppContext);
    const [hasWorlds, setHasWorlds] = useState(false);

    useEffect(() => {
        AccountService.getUserInfo().then(res => {
            if (
                res.isSuccess
                && res.value
                && (
                    res.value.created_root_subworld_templates.length > 0
                    || res.value.created_deriv_subworld_templates.length > 0
                )
             ) {
                setHasWorlds(true);
            }
        });
    }, [])

    if (!user || !hasWorlds) return null;
    if (user.name || user.name.trim() !== '') return null;

    return (
        <div className="bg-yellow-950">
            <div className="px-4 py-3">
                <h3 className="text-base font-semibold text-lightest">Missing name</h3>
                <div className="mt-2 max-w-fit text-sm text-lighter">
                    <p>
                        An account name is required to show as the author of your created worlds. Please add your name in the{' '}
                        <Link href="/account/settings" className="font-semibold text-indigo-400 hover:text-indigo-300">
                            Settings page
                        </Link>.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default EditNamActionPanel;