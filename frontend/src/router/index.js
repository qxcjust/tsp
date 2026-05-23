import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/',
    component: () => import('@/layout/Index.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
        meta: { title: '首页', icon: 'Odometer' }
      },
      {
        path: 'vehicles',
        name: 'Vehicles',
        component: () => import('@/views/VehicleManagement.vue'),
        meta: { title: '车辆管理', icon: 'Van' }
      },
      {
        path: 'monitor',
        name: 'Monitor',
        component: () => import('@/views/RealtimeMonitor.vue'),
        meta: { title: '实时监控', icon: 'MapLocation' }
      },
      {
        path: 'trajectory',
        name: 'Trajectory',
        component: () => import('@/views/TrajectoryQuery.vue'),
        meta: { title: '轨迹查询', icon: 'Guide' }
      },
      {
        path: 'alerts',
        name: 'Alerts',
        component: () => import('@/views/AlertManagement.vue'),
        meta: { title: '告警管理', icon: 'Bell' }
      },
      {
        path: 'statistics',
        name: 'Statistics',
        component: () => import('@/views/DataStatistics.vue'),
        meta: { title: '数据统计', icon: 'TrendCharts' }
      },
      {
        path: 'devices',
        name: 'Devices',
        component: () => import('@/views/DeviceManagement.vue'),
        meta: { title: '设备管理', icon: 'Connection' }
      },
      {
        path: 'users',
        name: 'Users',
        component: () => import('@/views/UserManagement.vue'),
        meta: { title: '用户管理', icon: 'User' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} - 车联网平台` : '车联网平台'
  const token = localStorage.getItem('token')
  if (to.path !== '/login' && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router
