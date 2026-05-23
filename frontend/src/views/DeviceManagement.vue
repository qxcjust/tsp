<template>
  <div class="device-management">
    <el-card>
      <el-button type="primary" @click="handleAdd"><el-icon><Plus /></el-icon>新增设备</el-button>
      <el-table :data="deviceList" stripe style="margin-top: 20px">
        <el-table-column prop="deviceNo" label="设备编号" width="180" />
        <el-table-column prop="type" label="类型" width="120" />
        <el-table-column prop="plateNumber" label="绑定车辆" width="120" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }"><el-tag :type="row.status === 'online' ? 'success' : 'info'">{{ row.status === 'online' ? '在线' : '离线' }}</el-tag></template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="{ row }"><el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button></template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const deviceList = ref([{ deviceNo: 'DEV001', type: 'OBD', plateNumber: '京A12345', status: 'online' }])
const handleAdd = () => {}
const handleEdit = (row) => {}
</script>
