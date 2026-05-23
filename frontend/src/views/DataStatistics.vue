<template>
  <div class="data-statistics">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <template #header><span>行驶里程</span></template>
          <div ref="chart1" style="height: 350px"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header><span>车辆使用率</span></template>
          <div ref="chart2" style="height: 350px"></div>
        </el-card>
      </el-col>
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

const statsData = ref([
  { plateNumber: '京A12345', totalMileage: 25680, avgSpeed: 45 },
  { plateNumber: '沪B67890', totalMileage: 18920, avgSpeed: 52 },
  { plateNumber: '粤C11111', totalMileage: 32450, avgSpeed: 38 },
  { plateNumber: '浙D22222', totalMileage: 15670, avgSpeed: 60 },
  { plateNumber: '苏E33333', totalMileage: 28340, avgSpeed: 42 }
])

onMounted(() => {
  // 初始化行驶里程图表
  if (chart1.value) {
    const c1 = echarts.init(chart1.value)
    c1.setOption({
      title: {
        text: '本周行驶里程统计',
        left: 'center',
        textStyle: {
          fontSize: 14,
          fontWeight: 'normal'
        }
      },
      tooltip: {
        trigger: 'axis',
        formatter: '{b}: {c} km'
      },
      xAxis: {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        axisLabel: {
          interval: 0
        }
      },
      yAxis: {
        type: 'value',
        name: '公里(km)',
        axisLabel: {
          formatter: '{value}'
        }
      },
      series: [{
        name: '行驶里程',
        data: [320, 302, 341, 280, 390, 450, 380],
        type: 'bar',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ])
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2378f7' },
              { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: '#83bff6' }
            ])
          }
        }
      }],
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      }
    })
    
    // 响应式调整
    window.addEventListener('resize', () => c1.resize())
  }
  
  // 初始化车辆使用率图表
  if (chart2.value) {
    const c2 = echarts.init(chart2.value)
    c2.setOption({
      title: {
        text: '车辆使用率分布',
        left: 'center',
        textStyle: {
          fontSize: 14,
          fontWeight: 'normal'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}% ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        top: 'middle',
        data: ['高频使用', '中频使用', '低频使用', '未使用']
      },
      series: [{
        name: '使用率',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['60%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          formatter: '{b}\n{c}%'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: true
        },
        data: [
          { value: 35, name: '高频使用', itemStyle: { color: '#5470c6' } },
          { value: 40, name: '中频使用', itemStyle: { color: '#91cc75' } },
          { value: 20, name: '低频使用', itemStyle: { color: '#fac858' } },
          { value: 5, name: '未使用', itemStyle: { color: '#ee6666' } }
        ]
      }],
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      }
    })
    
    // 响应式调整
    window.addEventListener('resize', () => c2.resize())
  }
})
</script>
