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
router.get('/src/components/calendar_map/Calendar',services.searchdate)
router.post('/src/components/calendar_map/Calendar',services.searchmeeting)

//增录会议
router.post('/src/components/insert/Insert',services.insert)

module.exports = router