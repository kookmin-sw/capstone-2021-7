import React, { useState } from 'react';

import {OrderContext} from './ordercontext';

const OrderProvider = ({ children }) => {
    const [orderList, setOrderList] = useState([]);

    return (
        <OrderContext.Provider value={{ orderList, setOrderList }}>
            {children}
        </OrderContext.Provider>
    )
};

export default OrderProvider;