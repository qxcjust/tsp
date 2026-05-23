<template>
  <div class="data-statistics">
    <el-row :gutter="20">
      <el-col :span="12"><el-card><template #header><span>行驶里程</span></template><div ref="chart1" style="height: 300px"></div></el-card></el-col>
      <el-col :span="12"><el-card><template #header><span>车辆使用率</span></template><div ref="chart2" style="height: 300px"></div></el-card></el-col>
    </el-row>
    <el-row style="margin-top: 20px"><el-col :span="24"><el-card><template #header><span>统计数据</span></template>
      <el-table :data="statsData" stripe>
        <el-table-column prop="plateNumber" label="车牌号" width="120" />
        <el-table-column prop="totalMileage" label="总里程(km)" width="120" />
        <el-table-column prop="avgSpeed" label="平均速度" width="120" />
      </el-table>
    </el-card></el-col></el-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
const chart1 = ref(null)
const chart2 = ref(null)
const statsData = ref([{ plateNumber: '京A12345', totalMileage: 25680, avgSpeed: 45 }])
onMounted(() => {
  if (chart1.value) {
    const c = echarts.init(chart1.value)
    c.setOption({ xAxis: { type: 'category', data: ['周一','周二','周三'] }, yAxis: { type: 'value' }, series: [{ data: [320, 302, 341], type: 'bar' }] })
  }
})
</script>
