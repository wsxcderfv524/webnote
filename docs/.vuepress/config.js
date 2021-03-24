/*
 * @Author: shenjianfei
 * @Date: 2021-03-11 09:34:59
 * @LastEditors: shenjianfei
 * @LastEditTime: 2021-03-22 13:45:08
 */
module.exports = {
    title:'前端笔记',
    description:'前端笔记',
    base: '/webnote/',
    themeConfig:{
        displayAllHeaders:true,
        nav: [],

        sidebar:[
            {
                title: 'html',   // 必要的
                path: '/html/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                sidebarDepth:2,
                children: [
                   {title:'标签',path:'/html/label'}
                ]
            },
            {
                title:'js',
                path:'/js/',
                sidebarDepth:2,
                children:[
                    {title:'基本类型',path:'/js/type'},
                    {title:'常用方法',path:'/js/common'},

                ]
            },
            {
                title: 'react',   // 必要的
                path: '/react/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                sidebarDepth:2,
                children: [
                   {title:'组件',path:'/react/zujian'}
                ]
            },
            {
                title: 'vue',   // 必要的
                path: '/vue/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                sidebarDepth:2,
                children: [
                  
                ]
            },
            {
                title: '浏览器',   // 必要的
                path: '/browser/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                sidebarDepth:2,
                children: [
                   {title:'http',path:'/browser/http'}
                ]
            },
        ]
     
    }
}