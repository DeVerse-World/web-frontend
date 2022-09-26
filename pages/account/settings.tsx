import { getAccountWrapperLayout } from "../../components/common/AccountWrapperLayout";

function Settings() {
    return (
        <section>
            <div className="flex flex-row justify-between">
                <h3 className="text-blue-300 text-3xl font-bold pl-4">Settings</h3>
            </div>
        </section>
    )
}

Settings.getLayout = getAccountWrapperLayout;

export default Settings;