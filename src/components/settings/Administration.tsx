import {useRouter} from "next/router";
import {useRecoilValue} from "recoil";
import {administrationExpand} from "../../states/settingsStates";
import SettingsName from "./SettingsName";
import React from "react";

interface AdministrationProps {
}

const Administration: React.FC<AdministrationProps> = ({}) => {
    const router = useRouter();
    const expand = useRecoilValue(administrationExpand);
    return (
        <>
            {/* This component Shows and toggles the dropdown of personal details */}
            <SettingsName
                expand={expand}
                title={`Administration Settings`}
                current="administration"
                svgD={`M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z`}
            />
            {expand && (
                <div className="mt-5 px-12 py-4 rounded-xl border-2 border-gray-500">
                    <div className="py-2">
                        <button
                            onClick={() => router.push("/admin/settings/change-penalty-data")}
                            className="edit-btn"
                        >
                            Change Penalty Data
                        </button>
                    </div>
                    <div className="py-2">
                        <button
                            onClick={() => router.push("/admin/settings/change-interest-rate")}
                            className="edit-btn"
                        >
                            Change Default Interest Rate
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Administration;
