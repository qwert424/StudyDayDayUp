import request from '@/utils/request'
//项目API

// 项目列表获取
export function getProject() {
    return request({
        url: '/api/project',
        method: 'get',
    })
}

// 项目列表添加
export function addProject(data) {
    return request({
        url: '/api/project',
        method: 'post',
        data
    })
}

// 项目列表删除
export function deleteProject(id) {
    return request({
        url: `/api/project/${id}`,
        method: 'delete',
    })
}

// 项目列表修改
export function putProject(data) {
    return request({
        url: `/api/project/${data.id}`,
        method: 'put',
        data: data.data
    })
}