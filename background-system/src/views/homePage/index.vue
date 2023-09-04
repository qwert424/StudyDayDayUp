<template>
  <div class="homePage-container">
    <div class="data-container">
      <template>
        <el-table :data="data" style="width: 100%" stripe border>
          <el-table-column
            type="index"
            :index="1"
            label="序号"
            width="50"
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
          <el-table-column prop="description" label="描述" width="350">
          </el-table-column>
          <el-table-column label="中图预览" width="200" align="center">
            <template slot-scope="scope">
              <el-image
                style="width: 100px; height: 100px"
                :src="scope.row.initMidImg"
                fit="contain"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column label="大图预览" width="200" align="center">
            <template slot-scope="scope">
              <el-image
                style="width: 100px; height: 100px"
                :src="scope.row.initBigImg"
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
              ></el-button>
            </el-tooltip>
          </el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("banner", ["data"]),
  },
  methods: {
    ...mapActions("banner", ["asyncGetBanner"]),
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
</style>