import {getRecoilExternalLoadable} from "../SpecialComponents/RecoilExternalStatePortal";
import {authenticatedUserData} from "../states/userStates";

export const getAuthData = () => {
    const data = getRecoilExternalLoadable(authenticatedUserData)
    return data ? data.contents : null;
};

