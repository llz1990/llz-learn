<template>
  <el-dialog :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <!-- 名称 -->
      <el-form-item
        label="视频标题"
        label-width="120px"
      >
        <el-input
          v-model="form.videoTitle"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <!-- 上传视频文件 -->
      <el-form-item
        label="上传视频文件"
        label-width="120px"
      >
        <input
          type="file"
          id="file"
          accept="video/*"
          @change="uploadVideo($event)"
        >
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button
        type="primary"
        @click="onSubmitFormData"
      >确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addVideo, addVideoEx } from "@/api/list";
export default {
  name: "add-video",
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialogFormVisible: this.isShow,
      videoFile: "",
      form: {
        videoTitle: "",
        videoBase64: "",
      },
    };
  },
  methods: {
    /**
     * 上传视频文件
     */
    uploadVideo(event) {
      const files = event.target.files;
      const file = files[0];
      this.videoFile = files[0];
      const reader = new FileReader();
      const self = this;
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        const fileBase64 = e.target.result;
        console.log("base64编码 =============================>", fileBase64);
        const fileStr = fileBase64.split(";base64,")[1];
        self.form.videoBase64 = fileStr;
      };
    },

    /**
     * 提交表单，增加相册合集(通过base64作为请求参数上传)
     */
    onSubmit() {
      this.dialogFormVisible = false;
      const params = this.form;
      addVideo(params)
        .then(({ code, data }) => {
          if (code === 200) {
            this.$message({
              message: "添加视频文件成功",
              type: "success",
              duration: 3 * 1000,
            });
            this.$emit("refreshVideo"); // 添加完成后重新拉取数据
          }
        })
        .catch((error) => {
          this.$message({
            message: error,
            type: "error",
            duration: 3 * 1000,
          });
        });
    },

    /**
     * 通过formdata上传：
     */
    onSubmitFormData() {
      this.dialogFormVisible = false;
      const paramsFormData = new FormData();
      paramsFormData.append("videoTitle", this.form.videoTitle);
      paramsFormData.append("videoFileBlob", this.videoFile);
      addVideoEx(paramsFormData)
        .then(({ code, data }) => {
          if (code === 200) {
            this.$message({
              message: "添加视频文件成功",
              type: "success",
              duration: 3 * 1000,
            });
            this.$emit("refreshVideo"); // 添加完成后重新拉取数据
          }
        })
        .catch((error) => {
          this.$message({
            message: error,
            type: "error",
            duration: 3 * 1000,
          });
        });
    },
  },
};
</script>


<style lang="less" scoped>
.input-item {
  border: 0px;
}
</style>;
