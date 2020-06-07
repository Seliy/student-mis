/**
 * 获取url参数对象
 */
export const getQueryParameters = (options) => {
    const url = options.url
    
    //分隔url，获取参数
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    
    //将参数转换成对象
    return JSON.parse('{"' + decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') + '"}')
}