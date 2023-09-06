<template>
  <div class="projectList-container">
    <template>
      <el-table :data="data" style="width: 100%" stripe border>
        <el-table-column
          type="index"
          :index="1"
          label="序号"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="title"
          label="项目名称"
          width="200"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="description" label="项目描述" width="400">
        </el-table-column>
        <el-table-column label="预览图" width="230" align="center">
          <template slot-scope="scope">
            <el-image
              style="width: 150px"
              :src="scope.row.initMidImg"
              fit="contain"
            ></el-image>
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" align="center" width="150">
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
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.projectList-container {
  padding: 30px;
}
</style>