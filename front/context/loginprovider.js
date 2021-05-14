import React, { useState } from 'react';

import { IsLoginContext } from './logincontext';

const LoginProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);

    return (
        <IsLoginContext.Provider value={{ isLogin, setIsLogin }}>
            {children}
        </IsLoginContext.Provider>
    )
};

export default LoginProvider;