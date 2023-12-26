// 导航栏头像列表
import React from 'react';
import { Avatar, Image, Popover } from 'antd';
import style from './AvatarList.module.css';
import { UserOutlined } from '@ant-design/icons';
import { logout } from '../../store/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AvatarList(props) {

    // 路由
    // const navigate = useNavigate();

    // 仓库
    const dispatch = useDispatch();

    // 处理用户退出
    function handleLogout() {
        // 清除本地token
        localStorage.removeItem('token');
        // 仓库清除用户信息
        dispatch(logout());
        // 回到首页 下面导航栏的navlink高亮会出问题
        // navigate("/");
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