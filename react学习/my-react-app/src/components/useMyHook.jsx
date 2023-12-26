import { useState } from "react";

function useMyhook(props) {
    const [myHook, setMyHook] = useState(0);//useState is a hook

    return [
        myHook, setMyHook
    ]
}

export default useMyhook;