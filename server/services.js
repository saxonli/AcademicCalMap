const db = require('./dbAxios.js')
exports.start = (req, res) => {}

// 登录处理
exports.login = (req, res) => {
	let username = req.body.username
	let pwd = req.body.password
		// 查询语句
	let sql = 'select * from users where username = ?'
	db.base(sql, username, (result) => {
		if(!result.length) {
			return res.json({
				status: 1,
				msg: '登录失败'
			})
		} else {
			if(result[0].password == pwd) {
				return res.json({
					status: 1,
					msg: '登录成功'
				})
			}
			return res.json({
				status: 1,
				msg: '密码错误'
			})
		}
	})
}

//注册处理
exports.register = (req, res) => {
	let username = req.body.username
	let pwd = req.body.password
		//插入语句
	let sql = 'insert into users(username, password) values (?, ?)'
	db.base(sql, [username, pwd], (result) => {
		return res.json(result)
	})
}

//搜索_展示处理
exports.searchkey = (req, res) => {
	let sql = 'select * from meeting'
		//	console.log(sql)
	db.base(sql, {}, (result) => {
		//		console.log(result)
		return res.json(result)
	})
}

//获取所有信息
exports.searchdate = (req, res) => {
	let sql = 'select distinct time from meeting'
		//	console.log(sql)
	db.base(sql, {}, (result) => {
		//		console.log(result)
		return res.json(result)
	})
}

//查看日程
exports.searchmeeting = (req, res) => {
	let day = req.body.c_date
	let sql = 'select meetingName from meeting where time=?'
		//	console.log(sql)
	db.base(sql, day, (result) => {
		//		console.log(result);
		return res.json(result);
	})
}

//人工增录会议
exports.insert = (req, res) => {
	//console.log('000')
	let meetingName = req.body.meetingName
	let address = req.body.address
	let time = req.body.time

	//插入语句
	let sql = 'insert into meeting(meetingName, address, time) values (?, ?, ?)'
	db.base(sql, [meetingName, address, time], (result) => {
		res.send('echo')
		return res.json(result)
	})
}