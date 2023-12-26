// 顶部导航栏
import style from './NavHeader.module.css';
import { useState } from 'react';
import { Menu, Col, Row, Input, Space, Select } from 'antd';
import { FireTwoTone } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import LogOrRegBtn from '../LogOrRegBtn/LogOrRegBtn';
import { useSelector } from 'react-redux'

// 菜单项目
const items = [
    {
        label: (
            <NavLink to='/issues'>问 答</NavLink>
        ),
        key: 'issues',
    },
    {
        label: (
            <NavLink to='/books'>书 籍</NavLink>
        ),
        key: 'books',
    },
    {
        label: (
            <NavLink to='/interviews'>面 试 题</NavLink>
        ),
        key: 'interview',
    },
    {
        label: (
            <a href="https://www.bilibili.com/video/BV1cp4y1Q7yn/?share_source=copy_web&vd_source=28ab3c37e8b1756e8c95335bc1ec594e" target="_blank" rel="noopener noreferrer">
                视 频 教 程
            </a>
        ),
        key: 'Video',
        icon: <FireTwoTone twoToneColor="#ed5a65" />
    },
];

// 搜索框选项
const options = [
    {
        value: 'issues',
        label: '问 答',
    },
    {
        value: 'books',
        label: '书 籍',
    },
];


function NavHeader(props) {
    // 当前nav选中状态
    const [current, setCurrent] = useState('issues');
    // const [searchVal, setSearchVal] = useState('issues');

    // 仓库信息
    const userInfo = useSelector(state => state.user);

    const onClick = (e) => {
        setCurrent(e.key);
    };

    return (
        <Row className={style['NavHeader-Container']}>
            <Col xs={6} sm={6} md={4} lg={4} xl={4} className={style['Col-Container']}>
                <div className={style["demo-logo"]}></div>
            </Col>
            <Col xs={14} sm={14} md={7} lg={9} xl={9} className={style['Col-Container']}>
                <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} theme='dark' />
            </Col>
            <Col xs={0} sm={0} md={10} lg={9} xl={8} className={style['Col-Container']}>
                <Space.Compact style={{ marginRight: "10px" }}>
                    <Select defaultValue="问 答" options={options} size='middle' />
                    <Input.Search
                        placeholder="请输入你要搜索的内容..."
                        allowClear
                        maxLength={20}
                        enterButton="搜 索"
                        size="middle"
                    />
                </Space.Compact>
            </Col>
            <Col xs={4} sm={4} md={3} lg={2} xl={2} className={[style['Col-Container'], style['flex-Container']]}>
                <LogOrRegBtn showModal={props.showModal} isLogined={userInfo.isLogined} userInfo={userInfo.userInfo} />
            </Col>
        </Row >
    );
}

export default NavHeader;