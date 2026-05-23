<template>
  <div class="realtime-monitor">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <template #header><span>车辆列表 (在线: {{ onlineCount }})</span></template>
          <el-input v-model="searchKeyword" placeholder="搜索车辆" prefix-icon="Search" clearable style="margin-bottom: 10px" />
          <div v-for="v in vehicles" :key="v.id" class="vehicle-item" @click="selectVehicle(v)">
            <div>{{ v.plateNumber }}</div>
            <el-tag size="small" :type="v.status === 'online' ? 'success' : 'info'">{{ v.status === 'online' ? '在线' : '离线' }}</el-tag>
          </div>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card>
          <template #header><span>实时监控地图</span></template>
          <div class="map-placeholder">
            <el-icon :size="100" color="#409EFF"><MapLocation /></el-icon>
            <p>地图区域（需配置高德地图API）</p>
          </div>
        </el-card>
        <el-card v-if="selectedVehicle" style="margin-top: 20px">
          <template #header><span>车辆详情 - {{ selectedVehicle.plateNumber }}</span></template>
          <el-descriptions :column="3" border>
            <el-descriptions-item label="车牌号">{{ selectedVehicle.plateNumber }}</el-descriptions-item>
            <el-descriptions-item label="速度">{{ selectedVehicle.speed }} km/h</el-descriptions-item>
            <el-descriptions-item label="状态">
              <el-tag :type="selectedVehicle.status === 'online' ? 'success' : 'info'">{{ selectedVehicle.status === 'online' ? '在线' : '离线' }}</el-tag>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const searchKeyword = ref('')
const selectedVehicle = ref(null)
const vehicles = ref([
  { id: 1, plateNumber: '京A12345', status: 'online', speed: 60 },
  { id: 2, plateNumber: '沪B67890', status: 'online', speed: 80 },
  { id: 3, plateNumber: '粤C11111', status: 'offline', speed: 0 }
])
const onlineCount = computed(() => vehicles.value.filter(v => v.status === 'online').length)
const selectVehicle = (v) => { selectedVehicle.value = v }
</script>

<style scoped>
.vehicle-item { padding: 10px; border-bottom: 1px solid #f0f0f0; cursor: pointer; display: flex; justify-content: space-between; }
.vehicle-item:hover { background: #f5f7fa; }
.map-placeholder { height: 400px; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #f0f2f5; }
</style>
