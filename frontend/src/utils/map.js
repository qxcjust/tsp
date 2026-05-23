import AMapLoader from '@amap/amap-jsapi-loader'

let AMap = null
let mapInstance = null

/**
 * 初始化高德地图
 * @param {string} containerId - 地图容器ID
 * @param {Object} options - 地图配置选项
 * @returns {Promise} 返回地图实例
 */
export async function initMap(containerId, options = {}) {
  const defaultOptions = {
    zoom: 12,
    center: [116.397428, 39.90923], // 北京中心点
    viewMode: '2D',
    ...options
  }

  try {
    if (!AMap) {
      AMap = await AMapLoader.load({
        key: '您的高德地图Key', // 需要替换为真实的高德地图Key
        version: '2.0',
        plugins: ['AMap.Marker', 'AMap.Polyline', 'AMap.InfoWindow', 'AMap.Geocoder']
      })
    }

    if (mapInstance) {
      mapInstance.destroy()
    }

    mapInstance = new AMap.Map(containerId, defaultOptions)
    return mapInstance
  } catch (error) {
    console.error('地图加载失败:', error)
    throw error
  }
}

/**
 * 添加标记点
 * @param {Array} position - 经纬度坐标 [lng, lat]
 * @param {Object} options - 标记配置
 * @returns {Object} 标记实例
 */
export function addMarker(position, options = {}) {
  if (!mapInstance || !AMap) return null

  const marker = new AMap.Marker({
    position: position,
    title: options.title || '',
    ...options
  })

  mapInstance.add(marker)
  return marker
}

/**
 * 添加信息窗口
 * @param {Array} position - 经纬度坐标
 * @param {string} content - 窗口内容
 * @returns {Object} 信息窗口实例
 */
export function addInfoWindow(position, content) {
  if (!mapInstance || !AMap) return null

  const infoWindow = new AMap.InfoWindow({
    content: content,
    offset: new AMap.Pixel(0, -30)
  })

  infoWindow.open(mapInstance, position)
  return infoWindow
}

/**
 * 绘制轨迹线
 * @param {Array} path - 路径点数组 [[lng, lat], [lng, lat], ...]
 * @param {Object} options - 线条配置
 * @returns {Object} 折线实例
 */
export function drawPolyline(path, options = {}) {
  if (!mapInstance || !AMap) return null

  const polyline = new AMap.Polyline({
    path: path,
    strokeColor: options.strokeColor || '#3366FF',
    strokeWeight: options.strokeWeight || 5,
    strokeOpacity: options.strokeOpacity || 0.8,
    ...options
  })

  mapInstance.add(polyline)
  return polyline
}

/**
 * 设置地图中心点
 * @param {Array} position - 经纬度坐标
 * @param {number} zoom - 缩放级别
 */
export function setCenter(position, zoom) {
  if (!mapInstance) return

  if (position) {
    mapInstance.setCenter(position)
  }
  if (zoom) {
    mapInstance.setZoom(zoom)
  }
}

/**
 * 清除所有覆盖物
 */
export function clearMap() {
  if (!mapInstance) return
  mapInstance.clearMap()
}

/**
 * 销毁地图实例
 */
export function destroyMap() {
  if (mapInstance) {
    mapInstance.destroy()
    mapInstance = null
  }
}

/**
 * 获取地图实例
 */
export function getMapInstance() {
  return mapInstance
}
