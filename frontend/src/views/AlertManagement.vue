<template>
  <div class="alert-management">
    <el-card>
      <el-form :inline="true">
        <el-form-item label="类型"><el-select v-model="type" placeholder="请选择" clearable><el-option label="超速告警" value="1" /></el-select></el-form-item>
        <el-form-item label="级别"><el-select v-model="level" placeholder="请选择" clearable><el-option label="严重" value="1" /></el-select></el-form-item>
        <el-form-item><el-button type="primary" @click="handleSearch">搜索</el-button></el-form-item>
      </el-form>
      <el-table :data="alertList" stripe>
        <el-table-column prop="time" label="时间" width="180" />
        <el-table-column prop="vehicleNo" label="车牌号" width="120" />
        <el-table-column prop="type" label="类型" width="150" />
        <el-table-column prop="level" label="级别" width="100">
          <template #default="{ row }"><el-tag :type="row.level === '严重' ? 'danger' : 'warning'">{{ row.level }}</el-tag></template>
        </el-table-column>
        <el-table-column prop="content" label="内容" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }"><el-tag :type="row.status === '已处理' ? 'success' : 'warning'">{{ row.status }}</el-tag></template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template #default="{ row }"><el-button v-if="row.status === '未处理'" type="primary" size="small" @click="handleProcess(row)">处理</el-button></template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const type = ref('')
const level = ref('')
const alertList = ref([
  { time: '2024-01-15 14:30:25', vehicleNo: '京A12345', type: '超速告警', level: '严重', content: '当前速度120km/h', status: '未处理' },
  { time: '2024-01-15 13:20:10', vehicleNo: '沪B67890', type: '疲劳驾驶', level: '警告', content: '连续驾驶4小时', status: '已处理' }
])
const handleSearch = () => {}
const handleProcess = (row) => { row.status = '已处理' }
</script>
