const TodolocalStorageName = "TodoloList"

/**
 * 任务列表保存到本地
 * @param {*} TodoloList 任务列表
 * @returns 
 */
export function addTodolocalStorage(TodoloList) {
    localStorage.setItem(TodolocalStorageName, JSON.stringify(TodoloList))
}


/**
 * 本地获取任务列表
 * @returns 
 */
export function getTodolocalStorage() {
    const resp = localStorage.getItem(TodolocalStorageName);
    if (resp) {
        return JSON.parse(resp)
    }
    return [];
}

export function getRandomId() {
    return Math.random().toString(36).slice(2, 7) + Date.now()
}