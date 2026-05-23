<template>
  <div class="trajectory-query">
    <el-card>
      <el-form :inline="true">
        <el-form-item label="车辆">
          <el-select v-model="vehicleId" placeholder="请选择" style="width: 200px">
            <el-option label="京A12345" value="1" />
            <el-option label="沪B67890" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker 
            v-model="timeRange" 
            type="datetimerange" 
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            style="width: 360px"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery" :loading="queryLoading">查询</el-button>
          <el-button @click="clearTrajectory">清除</el-button>
        </el-form-item>
      </el-form>
      <div id="trajectoryMap" class="map-container"></div>
      <el-table :data="trajectoryData" stripe style="margin-top: 20px" max-height="400">
        <el-table-column prop="time" label="时间" width="180" />
        <el-table-column prop="latitude" label="纬度" width="120" />
        <el-table-column prop="longitude" label="经度" width="120" />
        <el-table-column prop="speed" label="速度(km/h)" width="120" />
        <el-table-column prop="address" label="位置" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'
import { initMap, addMarker, drawPolyline, setCenter, clearMap } from '@/utils/map'

const vehicleId = ref('')
const timeRange = ref([])
const queryLoading = ref(false)
const trajectoryData = ref([])
let map = null
let polyline = null
let markers = []

// 模拟轨迹数据
const mockTrajectoryData = [
  { time: '2024-01-15 14:00:00', latitude: 39.9042, longitude: 116.4074, speed: 0, address: '北京市东城区天安门' },
  { time: '2024-01-15 14:05:00', latitude: 39.9087, longitude: 116.3975, speed: 45, address: '北京市西城区西单' },
  { time: '2024-01-15 14:10:00', latitude: 39.9150, longitude: 116.4040, speed: 60, address: '北京市东城区王府井' },
  { time: '2024-01-15 14:15:00', latitude: 39.9219, longitude: 116.4131, speed: 55, address: '北京市东城区东直门' },
  { time: '2024-01-15 14:20:00', latitude: 39.9334, longitude: 116.4074, speed: 70, address: '北京市朝阳区亚运村' },
  { time: '2024-01-15 14:25:00', latitude: 39.9450, longitude: 116.4200, speed: 65, address: '北京市朝阳区望京' },
  { time: '2024-01-15 14:30:00', latitude: 39.9580, longitude: 116.4350, speed: 50, address: '北京市朝阳区酒仙桥' }
]

// 初始化地图
const initTrajectoryMap = async () => {
  try {
    map = await initMap('trajectoryMap', {
      zoom: 12,
      center: [116.4074, 39.9042]
    })
  } catch (error) {
    console.error('地图初始化失败:', error)
  }
}

// 查询轨迹
const handleQuery = async () => {
  if (!vehicleId.value) {
    ElMessage.warning('请选择车辆')
    return
  }
  
  queryLoading.value = true
  
  // 模拟API请求延迟
  setTimeout(() => {
    trajectoryData.value = mockTrajectoryData
    renderTrajectory()
    queryLoading.value = false
    ElMessage.success('轨迹查询成功')
  }, 1000)
}

// 渲染轨迹
const renderTrajectory = () => {
  clearMap()
  markers = []
  
  if (trajectoryData.value.length === 0) return
  
  // 准备路径点
  const path = trajectoryData.value.map(item => [item.longitude, item.latitude])
  
  // 绘制轨迹线
  polyline = drawPolyline(path, {
    strokeColor: '#3366FF',
    strokeWeight: 5,
    strokeOpacity: 0.8
  })
  
  // 添加起点和终点标记
  if (trajectoryData.value.length > 0) {
    const first = trajectoryData.value[0]
    const last = trajectoryData.value[trajectoryData.value.length - 1]
    
    const startMarker = addMarker([first.longitude, first.latitude], {
      title: '起点',
      icon: new AMap.Icon({
        size: new AMap.Size(25, 34),
        image: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
        imageSize: new AMap.Size(25, 34)
      })
    })
    
    const endMarker = addMarker([last.longitude, last.latitude], {
      title: '终点',
      icon: new AMap.Icon({
        size: new AMap.Size(25, 34),
        image: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png',
        imageSize: new AMap.Size(25, 34)
      })
    })
    
    if (startMarker) markers.push(startMarker)
    if (endMarker) markers.push(endMarker)
  }
  
  // 自动调整地图视野以显示完整轨迹
  if (path.length > 0 && map) {
    map.setFitView()
  }
}

// 清除轨迹
const clearTrajectory = () => {
  clearMap()
  trajectoryData.value = []
  polyline = null
  markers = []
  ElMessage.info('已清除轨迹')
}

onMounted(() => {
  initTrajectoryMap()
})

onUnmounted(() => {
  if (map) {
    map.destroy()
  }
})
</script>

<style scoped>
.map-container { 
  height: 500px; 
  width: 100%;
  margin-top: 20px;
}
</style>
