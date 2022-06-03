// 'marketing' reference to "name" property in marketing webpack
// 'MarketingApp' reference to property in the "exposes" object in marketing webpack
import { mount } from "marketing/MarketingApp";
import React, { useRef, useEffect } from "react";

export default () => {
    const ref = useRef(null);

    console.log(ref)

    useEffect(() => {
        mount(ref.current);
    }, []);

    return <div ref={ref} />
};
