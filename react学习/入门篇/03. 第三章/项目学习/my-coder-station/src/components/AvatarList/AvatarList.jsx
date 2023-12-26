// 导航栏头像列表
import React from 'react';
import { Avatar, Image, Popover } from 'antd';
import style from './AvatarList.module.css';
import { UserOutlined } from '@ant-design/icons';
import { logout } from '../../store/userSlice';
import { useDispatch } from 'react-redux';




function AvatarList(props) {

    // 仓库
    const dispatch = useDispatch();

    // 处理用户退出
    function handleLogout() {
        dispatch(logout());
    }

    // 列表内容
    const content = (
        <div className={style["Content-Container"]}>
            <p className={style["Content-Item"]}>用 户 中 心</p>
            <p className={style["Content-Item"]} onClick={handleLogout}>退 出</p>
        </div>
    );

    return (
        <div>
            <Popover content={content} placement="bottom" trigger="hover" >
                <Avatar
                    size='large'
                    draggable={false}
                    icon={<UserOutlined />}
                    src={props.avatar ? <Image
                        preview={false}
                        src={props.avatar}
                        className={style["Image-Container"]}
                    /> : null}
                />
            </Popover>

        </div>
    );
}

export default AvatarList;