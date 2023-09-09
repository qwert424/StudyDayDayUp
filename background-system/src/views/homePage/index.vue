<template>
  <div class="homePage-container">
    <div class="data-container">
      <template>
        <el-table :data="data" style="width: 100%" stripe border>
          <el-table-column
            type="index"
            :index="1"
            label="序号"
            width="80"
            fixed
            align="center"
          ></el-table-column>
          <el-table-column
            fixed
            prop="title"
            label="标题"
            width="200"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="description" label="描述" width="400">
          </el-table-column>
          <el-table-column label="中图预览" width="230" align="center">
            <template slot-scope="scope">
              <el-image
                style="width: 150px"
                :src="scope.row.midImg"
                fit="contain"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column label="大图预览" width="230" align="center">
            <template slot-scope="scope">
              <el-image
                style="width: 150px"
                :src="scope.row.bigImg"
                fit="contain"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="150"
          >
            <template slot-scope="scope">
              <el-tooltip
                class="item"
                effect="dark"
                content="编辑"
                :hide-after="1000"
                placement="top"
              >
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  size="mini"
                  @click="handelEditClick(scope.row)"
                ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <el-dialog
        title="首页 标语"
        :visible.sync="centerDialogVisible"
        width="45%"
        center
      >
        <el-form :model="form">
          <el-form-item label="标题">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label=" 描述">
            <el-input
              type="textarea"
              v-model="form.description"
              resize="none"
              :rows="4"
            ></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="首页中图">
                <uploadComp v-model="form.midImg"></uploadComp> </el-form-item
            ></el-col>
            <el-col :span="12"
              ><el-form-item label="首页大图">
                <uploadComp v-model="form.bigImg"></uploadComp> </el-form-item
            ></el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false" class="PopUpBtn"
            >取 消</el-button
          >
          <el-button type="primary" @click="handleEditConfirm" class="PopUpBtn"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import uploadComp from "@/components/uploadComp/";
import { mapState, mapActions } from "vuex";
import { setBanner } from "@/api/banner";
export default {
  data() {
    return {
      centerDialogVisible: false,
      form: {
        title: "",
        description: "",
      },
    };
  },
  components: {
    uploadComp,
  },
  computed: {
    ...mapState("banner", ["data"]),
  },
  methods: {
    ...mapActions("banner", ["asyncGetBanner"]),
    handelEditClick(resp) {
      this.form = { ...resp };
      return (this.centerDialogVisible = !this.centerDialogVisible);
    },
    async handleEditConfirm() {
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].id == this.form.id) {
          this.data[i] = this.form;
        }
      }
      const resp = await setBanner(this.data);
      this.asyncGetBanner();
      this.centerDialogVisible = false;
      this.$message({
        message: "修改成功",
        type: "success",
      });
    },
  },
  created() {
    this.asyncGetBanner();
  },
};
</script>

<style lang="scss" scoped>
.data-container {
  padding: 30px;
}
.el-input input {
  height: 300px;
}
.PopUpBtn {
  margin: 0 10%;
}
</style>