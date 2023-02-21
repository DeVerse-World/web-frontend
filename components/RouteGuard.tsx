import { useRouter } from "next/router";
import { JSXElementConstructor, ReactElement, useContext, useEffect, useState } from "react";
import { AppContext, ViewState } from "./contexts/app_context";
import LoadingScreen from "./LoadingScreen";

const privatePaths = ['content-manager', 'create', 'account']

export default function RouteGuard({ children }) {
    const { user, setViewState } = useContext(AppContext);
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    const authCheck = () => {
        if (!user && privatePaths.includes(router.pathname.split('/')[1])) {
            setIsAuthorized(false);
            router.push({
                pathname: '/login',
            });
        } else {
            setIsAuthorized(true);
        }
    };

    const preventAccess = () => {
        setIsAuthorized(false);
    }

    useEffect(() => {
        authCheck();
        router.events.on('routeChangeStart', preventAccess);
        router.events.on('routeChangeComplete', authCheck);

        return () => {
            router.events.off('routeChangeStart', preventAccess);
            router.events.off('routeChangeComplete', authCheck);
        };
    }, [router, router.events, user]);

    return isAuthorized ? children : (<div></div>);
};
