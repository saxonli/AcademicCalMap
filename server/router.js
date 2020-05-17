const express = require('express')
const router = express.Router()
const services = require('./services.js')
// router.get('/',services.start)



// 登录功能
router.post('/src/components/login_register/Login',services.login)
// 注册功能
router.post('/src/components/login_register/Register',services.register)
// 搜索_删除功能
router.get('/src/components/search/SearchKey',services.searchkey)
router.post('/src/components/search/SearchKey',services.deleteMeeting)

//日历界面
router.post('/src/components/calendar_map/Calendar',services.showlist)
//增录会议
router.post('/src/components/insert/Insert',services.insert)

//给自己添加会议
router.post('/src/components/calendar_map/addM',services.add)
//给自己删除会议
router.post('/src/components/calendar_map/delM',services.del)

module.exports = router