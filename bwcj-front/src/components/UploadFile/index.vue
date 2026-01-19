<template>
  <div class="upload-excel">
    <el-upload
      class="upload-demo"
      drag
      :auto-upload="false"  
      :before-upload="beforeUpload"
      :on-progress="handleProgress"
      :file-list="fileList"
      :limit="3"  
      :on-exceed="handleExceed"
      accept=".xlsx,.xls"
      ref="uploadRef"  
      :on-change="handleChange"
      :multiple="true"
      name="files"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        将文件拖到此处，或<em>点击上传</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          只能上传 xlsx/xls 文件，且不超过 50MB，最多可选择3个文件
        </div>
      </template>
    </el-upload>

    <!-- 添加手动上传按钮 -->
    <div class="upload-button" >
      <el-button type="primary" @click="submitUpload" :loading="uploading">开始上传</el-button>
      <el-button @click="clearFiles">清空文件</el-button>
    </div>

    <!-- 上传进度对话框 -->
    <el-dialog
      v-model="progressVisible"
      title="上传进度"
      width="30%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <el-progress :percentage="uploadPercentage" :text-inside="true" :stroke-width="20" />
      <p>{{ uploadStatus }}</p>
    </el-dialog>
    
    <!-- 显示返回的Excel文件 -->
    <div class="output-file" v-if="downloadUrl">
      <h3>处理结果文件：</h3>
      <el-button type="success" plain @click="downloadFile">
        <el-icon><Download /></el-icon>
        下载处理后的Excel文件
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import request from '@/utils/request'

const uploadRef = ref(null) 
const files = ref([])
const progressVisible = ref(false)
const uploadPercentage = ref(0)
const uploading = ref(false)
const uploadStatus = ref('准备上传...')
const downloadUrl = ref('')


// 文件状态改变时的钩子
const handleChange = (file, fileList) => {
  files.value = fileList
}

// 上传前验证
const beforeUpload = (file) => {
  const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
                  file.type === 'application/vnd.ms-excel'
  const isLt10M = file.size / 1024 / 1024 < 50

  if (!isExcel) {
    ElMessage.error('只能上传 Excel 文件!')
    return false
  }
  if (!isLt10M) {
    ElMessage.error('上传文件大小不能超过 50MB!')
    return false
  }
  return true
}

// 上传成功回调
const handleSuccess = (response, file, fileList) => {
  ElMessage.success(`${file.name} 上传成功`)
  progressVisible.value = false
  uploadPercentage.value = 0
  // 更新文件列表
  fileList.value = fileList
}


// 上传进度回调
const handleProgress = (event, file, fileList) => {
  console.log('handleProgress');
  
  progressVisible.value = true
  uploadPercentage.value = Math.floor(event.percent)
}

// 文件超出限制回调
const handleExceed = (files, fileList) => {
  ElMessage.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
}

// 手动上传 - 修改为一次性上传所有文件
const submitUpload = async () => {
  if (files.value.length === 0) {
    ElMessage.warning('请先选择文件')
    return
  }

  // 检查所有文件是否都通过了验证
  for (let fileObj of files.value) {
    if (!beforeUpload(fileObj.raw)) {
      return
    }
  }

  uploading.value = true
  progressVisible.value = true
  uploadPercentage.value = 0
  uploadStatus.value = '正在上传...'

  const formData = new FormData()
  
  // 将所有文件添加到formData中
  files.value.forEach((fileObj, index) => {
    formData.append('files', fileObj.raw)
  })

  try {
    // 发送POST请求，确保responseType为blob以便接收文件流
    const response = await request.post('/file/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'blob', // 重要：指定响应类型为blob
      onUploadProgress: (progressEvent) => {
        // 计算整体上传进度
        const totalPercent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        )
        uploadPercentage.value = totalPercent
        uploadStatus.value = `已上传: ${totalPercent}%`
      }
    })

    // 检查响应是否为错误状态
    if (response.data && response.data.type === 'application/json') {
      // 如果后端返回的是JSON错误信息
      const reader = new FileReader();
      reader.onload = () => {
        const errorMsg = JSON.parse(reader.result);
        ElMessage.error(errorMsg.message || '服务器返回错误');
      };
      reader.readAsText(response.data);
      return;
    }

    // 创建下载链接
    const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    downloadUrl.value = window.URL.createObjectURL(blob);
    
    // 上传成功
    ElMessage.success(`批量上传成功，共上传 ${files.value.length} 个文件`)
    uploadStatus.value = '上传完成！'
    
    // 延迟关闭进度条显示
    setTimeout(() => {
      progressVisible.value = false
      uploadPercentage.value = 0
      uploading.value = false
    }, 1000)

  } catch (error) {
    console.error('上传失败:', error)
    ElMessage.error('上传失败，请重试')
    uploading.value = false
    uploadStatus.value = '上传失败'
  }
}

// 下载处理后的文件
const downloadFile = () => {
  if (downloadUrl.value) {
    const a = document.createElement('a');
    a.href = downloadUrl.value;
    a.download = '使用过期物料订单.xlsx'; // 设置默认下载文件名
    a.style.display = 'none'; // 隐藏链接
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(downloadUrl.value); // 释放内存
  }
}

// 清空文件列表
const clearFiles = () => {
  uploadRef.value.clearFiles()
  downloadUrl.value = ''
}
</script>

<style scoped>
.upload-excel {
  padding: 20px;
}

.el-upload {
  width: 100%;
}

.el-upload-dragger {
  width: 100%;
}

.upload-button {
  margin-top: 20px;
  text-align: center;
}

.upload-button .el-button {
  margin: 0 10px;
}
</style>