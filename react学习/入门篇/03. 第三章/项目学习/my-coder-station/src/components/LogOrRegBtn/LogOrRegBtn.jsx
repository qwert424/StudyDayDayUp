// 登录注册组件按钮|头像
import React from 'react';
import { Button } from 'antd';
import AvatarList from '../AvatarList/AvatarList';


function LogOrRegBtn(props) {

    let ele = null;

    // 情况判断
    if (!props.isLogined) {
        ele = (
            <Button type="primary" ghost onClick={props.showModal}>
                注册 登录
            </Button>
        )
    } else {
        ele = (
            <AvatarList avatar={props.userInfo.avatar} />
        )
    }

    return (
        <>
            {ele}
        </>
    );
}

export default LogOrRegBtn;