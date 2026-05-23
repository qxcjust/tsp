<template>
  <div class="realtime-monitor">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <template #header><span>车辆列表 (在线: {{ onlineCount }})</span></template>
          <el-input v-model="searchKeyword" placeholder="搜索车辆" prefix-icon="Search" clearable style="margin-bottom: 10px" />
          <div v-for="v in filteredVehicles" :key="v.id" class="vehicle-item" @click="selectVehicle(v)">
            <div>{{ v.plateNumber }}</div>
            <el-tag size="small" :type="v.status === 'online' ? 'success' : 'info'">{{ v.status === 'online' ? '在线' : '离线' }}</el-tag>
          </div>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card>
          <template #header><span>实时监控地图</span></template>
          <div id="monitorMap" class="map-container"></div>
        </el-card>
        <el-card v-if="selectedVehicle" style="margin-top: 20px">
          <template #header><span>车辆详情 - {{ selectedVehicle.plateNumber }}</span></template>
          <el-descriptions :column="3" border>
            <el-descriptions-item label="车牌号">{{ selectedVehicle.plateNumber }}</el-descriptions-item>
            <el-descriptions-item label="速度">{{ selectedVehicle.speed }} km/h</el-descriptions-item>
            <el-descriptions-item label="状态">
              <el-tag :type="selectedVehicle.status === 'online' ? 'success' : 'info'">{{ selectedVehicle.status === 'online' ? '在线' : '离线' }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="经度">{{ selectedVehicle.longitude }}</el-descriptions-item>
            <el-descriptions-item label="纬度">{{ selectedVehicle.latitude }}</el-descriptions-item>
            <el-descriptions-item label="更新时间">{{ selectedVehicle.updateTime }}</el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { initMap, addMarker, addInfoWindow, setCenter, clearMap } from '@/utils/map'

const searchKeyword = ref('')
const selectedVehicle = ref(null)
let map = null
let markers = []

// 模拟车辆数据（包含位置信息）
const vehicles = ref([
  { id: 1, plateNumber: '京A12345', status: 'online', speed: 60, longitude: 116.397428, latitude: 39.90923, updateTime: '2024-01-15 14:30:25' },
  { id: 2, plateNumber: '沪B67890', status: 'online', speed: 80, longitude: 121.473701, latitude: 31.230416, updateTime: '2024-01-15 14:30:20' },
  { id: 3, plateNumber: '粤C11111', status: 'offline', speed: 0, longitude: 113.264434, latitude: 23.129162, updateTime: '2024-01-15 13:20:10' },
  { id: 4, plateNumber: '浙D22222', status: 'online', speed: 45, longitude: 120.153576, latitude: 30.287459, updateTime: '2024-01-15 14:29:50' },
  { id: 5, plateNumber: '苏E33333', status: 'online', speed: 70, longitude: 118.796877, latitude: 32.060255, updateTime: '2024-01-15 14:30:15' }
])

const onlineCount = computed(() => vehicles.value.filter(v => v.status === 'online').length)

const filteredVehicles = computed(() => {
  if (!searchKeyword.value) return vehicles.value
  return vehicles.value.filter(v => 
    v.plateNumber.toLowerCase().includes(searchKeyword.value.toLowerCase())
  )
})

// 初始化地图
const initMonitorMap = async () => {
  try {
    map = await initMap('monitorMap', {
      zoom: 5,
      center: [116.397428, 39.90923]
    })
    
    // 添加所有在线车辆的标记
    renderMarkers()
  } catch (error) {
    console.error('地图初始化失败:', error)
  }
}

// 渲染车辆标记
const renderMarkers = () => {
  clearMap()
  markers = []
  
  vehicles.value.forEach(vehicle => {
    if (vehicle.status === 'online') {
      const marker = addMarker(
        [vehicle.longitude, vehicle.latitude],
        {
          title: vehicle.plateNumber,
          extData: vehicle
        }
      )
      
      if (marker) {
        // 点击标记显示信息窗口
        marker.on('click', () => {
          const content = `
            <div style="padding: 10px;">
              <h4>${vehicle.plateNumber}</h4>
              <p>速度: ${vehicle.speed} km/h</p>
              <p>状态: ${vehicle.status === 'online' ? '在线' : '离线'}</p>
            </div>
          `
          addInfoWindow([vehicle.longitude, vehicle.latitude], content)
          selectVehicle(vehicle)
        })
        
        markers.push(marker)
      }
    }
  })
}

// 选择车辆
const selectVehicle = (v) => {
  selectedVehicle.value = v
  if (map && v.status === 'online') {
    setCenter([v.longitude, v.latitude], 15)
  }
}

onMounted(() => {
  initMonitorMap()
})

onUnmounted(() => {
  if (map) {
    map.destroy()
  }
})
</script>

<style scoped>
.vehicle-item { 
  padding: 10px; 
  border-bottom: 1px solid #f0f0f0; 
  cursor: pointer; 
  display: flex; 
  justify-content: space-between;
  align-items: center;
}
.vehicle-item:hover { 
  background: #f5f7fa; 
}
.map-container { 
  height: 500px; 
  width: 100%;
}
</style>
