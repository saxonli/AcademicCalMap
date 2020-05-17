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
				if(result[0].power == "Y") {
					return res.json({
						status: 1,
						msg: '登录成功',
						power: 'Y'
					})
				} else {
					return res.json({
						status: 1,
						msg: '登录成功',
						power: ''
					})
				}
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
	let sql1 = 'select * from users where username = ?'
	db.base(sql1, username, (result) => {
		if(result.length) {
			return res.json({
				status: 1,
				msg: '用户名已存在'
			})
		} else {
			let pwd = req.body.password
				//插入语句
			let sql = 'insert into users(username, password) values (?, ?)'
			db.base(sql, [username, pwd], (result) => {
				if(result.length) {
					return res.json({
						status: 1,
						msg: '注册失败'
					})
				} else {
					return res.json({
						status: 1,
						msg: '注册成功'
					})
				}
			})
		}
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

//删除处理
exports.deleteMeeting = (req, res) => {
	let meetingName = req.body.meetingName
	console.log(meetingName)
		// 查询语句
	let sql = 'select * from meeting where meetingName = ?'
	db.base(sql, meetingName, (result) => {
		if(!result.length) {
			return res.json({
				status: 1,
				msg: '删除失败，查无此会议'
			})
		} else {
			let sql0 = 'delete from meeting where meetingName = ?'
			db.base(sql0, meetingName, (result) => {
				if(result.length) {
					return res.json({
						status: 1,
						msg: '删除失败'
					})
				}
				return res.json({
					status: 1,
					msg: '删除成功'
				})
			})
		}
	})
}

//日历操作
exports.showlist = (req, res) => {
	if(req.body.c_date) {
		let day = req.body.c_date
		let name = req.body.name
		let sql = 'select meetingName from meeting,plan where time=? and meetingnum=num and username=?'
			//	console.log(sql)
		db.base(sql, [day, name], (result) => {
//			console.log(result);
			return res.json(result);
		})
	} 
	else if(req.body.c_name){
		let cname = req.body.c_name.trim();
		let sql = 'select address from meeting where meetingName=?'
		db.base(sql, cname, (result) => {
			return res.json(result);
		})
	}
	else {		
		let name = req.body.name
		let sql = 'select distinct time from meeting,plan where num=meetingnum and username=?'
			//				console.log(sql)
		db.base(sql, name, (result) => {
			//				console.log(result)
			return res.json(result)
		})
	}

}

//人工增录会议
exports.insert = (req, res) => {
	let meetingName = req.body.meetingName
	let address = req.body.address
	let time = req.body.time

	//查重
	let sql0 = 'select * from meeting where meetingName = ? and address = ? and time = ?'
	db.base(sql0, [meetingName, address, time], (result) => {
		if(result.length) {
			return res.json({
				status: 1,
				msg: '会议已存在'
			})
		} else {
			//会议编号处理
			let sql1 = 'select * from meeting'
			db.base(sql1, {}, (result) => {
				let num = result.length + 1
					//插入语句
				let sql2 = 'insert into meeting(num,meetingName, address, time) values (?,?, ?, ?)'
				db.base(sql2, [num, meetingName, address, time], (result) => {
					if(result.length) {
						return res.json({
							status: 1,
							msg: '添加失败'
						})
					} else {
						return res.json({
							status: 1,
							msg: '添加成功'
						})
					}
				})
			})
		}
	})
}

//给自己加会议
exports.add = (req, res) => {
	if(req.body.num)
	{
		let num = req.body.num
		let name = req.body.name
		//插入语句
		let sql = 'insert into plan(username, meetingnum) values (?, ?)'
		db.base(sql, [name,num], (result) => {
			if(result["affectedRows"]){
				return res.json({
					status: 1,
					msg: '添加成功'
				})
			}
				
			else{
				return res.json({
					status: 0,
					msg: '添加失败'
				})
			}	
		})
	}
	else
	{
		let name = req.body.name
		let sql = 'select * from meeting where num not in(select meetingnum from plan where username=?)'
		db.base(sql, name, (result) => {
			return res.json(result)
		})
	}
	
}

//给自己删除会议
exports.del = (req, res) => {
	if(req.body.num){
		let num = req.body.num
		let name = req.body.name
		//插入语句
		let sql = 'delete from plan where username=? and meetingnum=?'
		db.base(sql, [name,num], (result) => {
			if(result["affectedRows"]){
				return res.json({
					status: 1,
					msg: '删除成功'
				})
			}
				
			else{
				return res.json({
					status: 0,
					msg: '删除失败'
				})
			}
		})
	}
	else{
		let name = req.body.name
		let sql = 'select * from plan,meeting where num=meetingnum and username=?'
		db.base(sql, name, (result) => {
			return res.json(result)
		})
	}
	
}