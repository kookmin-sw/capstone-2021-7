import React, { useState } from 'react';

import { UserLocationContext } from './userlocationcontext';

const UserLocationProvider = ({ children }) => {
    const [userLocation, setUserLocation] = useState("위치정보를 입력해주세요");

    return (
        <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
            {children}
        </UserLocationContext.Provider>
    )
};

export default UserLocationProvider;