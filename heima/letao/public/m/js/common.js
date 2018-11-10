window.CT = {};
CT.getParamsbyUrl = function () {
    // 对象存储
    let params = {};
    let search = location.search;
    if (search){
        search = search.replace('?','');
        /* 如果有多个键值对 */
        const arr = search.split('&');
        arr.forEach(function (item, i) {
            const itemArr = item.split('=');
            params[itemArr[0]] = itemArr[1];
        });
    }
    console.log(params);
    return params;
};