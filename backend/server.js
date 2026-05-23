require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

const app = express()
const PORT = process.env.PORT || 8080

// 中间件
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// JWT密钥
const JWT_SECRET = process.env.JWT_SECRET || 'iov-platform-secret-key-2024'

// 模拟数据库
const users = [
  {
    id: 1,
    username: 'admin',
    password: '$2a$10$YourHashedPasswordHere',
    role: 'admin',
    createTime: '2024-01-01 00:00:00'
  }
]

const vehicles = [
  {
    id: 1,
    plateNumber: '京A12345',
    vin: 'LSVAA2189E2123456',
    brand: '大众',
    model: '帕萨特 2023款',
    color: '黑色',
    owner: '张三',
    phone: '13800138000',
    status: 'online',
    mileage: 25680,
    latitude: 39.9042,
    longitude: 116.4074,
    speed: 0,
    direction: 0,
    lastUpdateTime: '2024-01-15 14:30:25'
  },
  {
    id: 2,
    plateNumber: '沪B67890',
    vin: 'LFV3A23C8K3123456',
    brand: '奥迪',
    model: 'A6L 2023款',
    color: '白色',
    owner: '李四',
    phone: '13900139000',
    status: 'offline',
    mileage: 18920,
    latitude: 31.2304,
    longitude: 121.4737,
    speed: 0,
    direction: 0,
    lastUpdateTime: '2024-01-15 13:20:10'
  }
]

// JWT验证中间件
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  
  if (!token) {
    return res.status(401).json({ code: 401, message: '未授权访问' })
  }
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ code: 403, message: '令牌无效' })
    }
    req.user = user
    next()
  })
}

// 路由
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body
  
  // 简单验证（实际应该查询数据库并验证密码哈希）
  if (username === 'admin' && password === 'Admin@123') {
    const user = { id: 1, username: 'admin', role: 'admin' }
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '24h' })
    
    res.json({
      code: 200,
      message: '登录成功',
      data: {
        token,
        userInfo: user
      }
    })
  } else {
    res.status(401).json({
      code: 401,
      message: '用户名或密码错误'
    })
  }
})

// 获取车辆列表
app.get('/api/vehicles', authenticateToken, (req, res) => {
  const { page = 1, pageSize = 10, keyword = '', status = '' } = req.query
  
  let filtered = vehicles
  
  if (keyword) {
    filtered = filtered.filter(v => 
      v.plateNumber.includes(keyword) || v.vin.includes(keyword)
    )
  }
  
  if (status) {
    filtered = filtered.filter(v => v.status === status)
  }
  
  const total = filtered.length
  const start = (page - 1) * pageSize
  const end = start + parseInt(pageSize)
  const list = filtered.slice(start, end)
  
  res.json({
    code: 200,
    data: {
      list,
      total,
      page: parseInt(page),
      pageSize: parseInt(pageSize)
    }
  })
})

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ code: 200, message: '服务运行正常' })
})

// 启动服务器
app.listen(PORT, () => {
  console.log(`车联网平台后端服务运行在 http://localhost:${PORT}`)
})
