/*
 * @Author: shenjianfei
 * @Date: 2021-03-11 09:34:59
 * @LastEditors: shenjianfei
 * @LastEditTime: 2021-03-11 14:14:51
 */
module.exports = {
    title:'前端笔记',
    description:'前端笔记',
    base: '/webnote/',
    
    themeConfig:{
        displayAllHeaders:true,
        nav: [
            
          ],

          sidebar:[
            {
                title: 'html',   // 必要的
                path: '/html/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                sidebarDepth:2,
                children: [
                   {title:'标签',path:'/html/label'}
                ]
            },
        ]
     
    }
}