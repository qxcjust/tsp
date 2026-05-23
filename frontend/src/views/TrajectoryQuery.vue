<template>
  <div class="trajectory-query">
    <el-card>
      <el-form :inline="true">
        <el-form-item label="车辆"><el-select v-model="vehicleId" placeholder="请选择" style="width: 200px"><el-option label="京A12345" value="1" /></el-select></el-form-item>
        <el-form-item label="时间"><el-date-picker v-model="timeRange" type="datetimerange" range-separator="至" /></el-form-item>
        <el-form-item><el-button type="primary" @click="handleQuery">查询</el-button></el-form-item>
      </el-form>
      <div class="map-placeholder"><el-icon :size="80" color="#409EFF"><Guide /></el-icon><p>轨迹地图展示区域</p></div>
      <el-table :data="trajectoryData" stripe style="margin-top: 20px">
        <el-table-column prop="time" label="时间" width="180" />
        <el-table-column prop="latitude" label="纬度" width="120" />
        <el-table-column prop="longitude" label="经度" width="120" />
        <el-table-column prop="speed" label="速度(km/h)" width="120" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const vehicleId = ref('')
const timeRange = ref([])
const trajectoryData = ref([{ time: '2024-01-15 14:30:25', latitude: 39.9042, longitude: 116.4074, speed: 60 }])
const handleQuery = () => {}
</script>

<style scoped>
.map-placeholder { height: 400px; display: flex; align-items: center; justify-content: center; background: #f0f2f5; }
</style>
