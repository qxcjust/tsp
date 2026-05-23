<template>
  <div class="user-management">
    <el-card>
      <el-button type="primary" @click="handleAdd"><el-icon><Plus /></el-icon>新增用户</el-button>
      <el-table :data="userList" stripe style="margin-top: 20px">
        <el-table-column prop="username" label="用户名" width="150" />
        <el-table-column prop="realName" label="姓名" width="120" />
        <el-table-column prop="role" label="角色" width="120">
          <template #default="{ row }"><el-tag :type="row.role === 'admin' ? 'danger' : 'primary'">{{ row.role === 'admin' ? '管理员' : '用户' }}</el-tag></template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="130" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }"><el-tag :type="row.status === 'active' ? 'success' : 'info'">{{ row.status === 'active' ? '启用' : '禁用' }}</el-tag></template>
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
const userList = ref([{ username: 'admin', realName: '管理员', role: 'admin', phone: '13800138000', status: 'active' }])
const handleAdd = () => {}
const handleEdit = (row) => {}
</script>
