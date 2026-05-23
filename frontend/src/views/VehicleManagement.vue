<template>
  <div class="vehicle-management">
    <el-card>
      <div class="toolbar">
        <el-input v-model="keyword" placeholder="搜索车牌号" style="width: 200px; margin-right: 10px" clearable />
        <el-button type="primary" @click="handleSearch"><el-icon><Search /></el-icon>搜索</el-button>
        <el-button type="primary" @click="handleAdd"><el-icon><Plus /></el-icon>新增车辆</el-button>
      </div>
      <el-table :data="vehicleList" stripe>
        <el-table-column prop="plateNumber" label="车牌号" width="120" />
        <el-table-column prop="vin" label="VIN码" width="180" />
        <el-table-column prop="brand" label="品牌" width="120" />
        <el-table-column prop="model" label="车型" width="150" />
        <el-table-column prop="owner" label="车主" width="100" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 'online' ? 'success' : 'info'">{{ row.status === 'online' ? '在线' : '离线' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
const keyword = ref('')
const vehicleList = ref([
  { id: 1, plateNumber: '京A12345', vin: 'LSVAA2189E2123456', brand: '大众', model: '帕萨特', owner: '张三', status: 'online' },
  { id: 2, plateNumber: '沪B67890', vin: 'LFV3A23C8K3123456', brand: '奥迪', model: 'A6L', owner: '李四', status: 'offline' }
])
const handleSearch = () => ElMessage.success('搜索完成')
const handleAdd = () => ElMessage.info('新增车辆')
const handleEdit = (row) => ElMessage.info(`编辑: ${row.plateNumber}`)
const handleDelete = (row) => ElMessage.success(`删除: ${row.plateNumber}`)
</script>

<style scoped>
.toolbar { margin-bottom: 20px; display: flex; gap: 10px; }
</style>

