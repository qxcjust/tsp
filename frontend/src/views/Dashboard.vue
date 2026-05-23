<template>
  <div class="dashboard">
    <el-row :gutter="20" class="stats-row">
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon vehicle"><el-icon><Van /></el-icon></div>
            <div class="stat-info">
              <div class="stat-value">{{ stats.totalVehicles }}</div>
              <div class="stat-label">车辆总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon online"><el-icon><Connection /></el-icon></div>
            <div class="stat-info">
              <div class="stat-value">{{ stats.onlineVehicles }}</div>
              <div class="stat-label">在线车辆</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon alert"><el-icon><Bell /></el-icon></div>
            <div class="stat-info">
              <div class="stat-value">{{ stats.todayAlerts }}</div>
              <div class="stat-label">今日告警</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon mileage"><el-icon><Odometer /></el-icon></div>
            <div class="stat-info">
              <div class="stat-value">{{ stats.todayMileage }}km</div>
              <div class="stat-label">今日里程</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card>
          <template #header><span>最近告警</span></template>
          <el-table :data="recentAlerts" stripe>
            <el-table-column prop="time" label="时间" width="180" />
            <el-table-column prop="vehicleNo" label="车牌号" width="120" />
            <el-table-column prop="type" label="告警类型" width="150" />
            <el-table-column prop="content" label="告警内容" />
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const stats = ref({ totalVehicles: 1256, onlineVehicles: 892, todayAlerts: 23, todayMileage: 45678 })
const recentAlerts = ref([
  { time: '2024-01-15 14:30:25', vehicleNo: '京A12345', type: '超速告警', content: '当前速度120km/h' },
  { time: '2024-01-15 13:20:10', vehicleNo: '沪B67890', type: '疲劳驾驶', content: '连续驾驶超过4小时' }
])
</script>

<style scoped>
.stats-row { margin-bottom: 20px; }
.stat-card .stat-content { display: flex; align-items: center; gap: 20px; }
.stat-icon { width: 60px; height: 60px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 28px; color: white; }
.vehicle { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
.online { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
.alert { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
.mileage { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); }
.stat-value { font-size: 28px; font-weight: bold; color: #333; }
.stat-label { font-size: 14px; color: #999; }
</style>
