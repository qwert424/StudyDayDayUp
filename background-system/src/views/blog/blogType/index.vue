<template>
  <div class="blogType-container">
    <!-- 添加文章分类 -->
    <div class="input-container">
      <el-input
        placeholder="请输入要添加文章分类的名称，并选择权重值"
        v-model="inputValue"
        class="input-with-select"
      >
        <el-select
          v-model="select"
          slot="prepend"
          placeholder="权重"
          class="select-container"
        >
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="4" value="4"></el-option>
          <el-option label="5" value="5"></el-option>
        </el-select>
      </el-input>
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
    </div>
    <!-- 文章分类表 -->
    <template>
      <el-table
        :data="data"
        style="width: 100%"
        stripe
        border
        v-loading="isloading"
      >
        <el-table-column
          type="index"
          :index="1 + (currentPage - 1) * pageSize"
          label="序号"
          width="80"
          fixed
          align="center"
        ></el-table-column>
        <el-table-column fixed prop="name" label="博客类别" align="center">
        </el-table-column>
        <el-table-column
          fixed
          prop="articleCount"
          label="文章数量"
          align="center"
        >
        </el-table-column>
        <el-table-column fixed prop="order" label="文章权重" align="center">
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
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              :hide-after="1000"
              placement="top"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                size="mini"
                @click="handelDelectClick(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 分页容器 -->
    <div class="page-container">
      <el-pagination
        background
        layout="  prev, pager, next, ->,jumper,sizes,total"
        :total="totalBlog"
        :page-count="AllPageSize"
        :page-size="pageSize"
        :pager-count="9"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :hide-on-single-page="AllPageSize === 1 ? true : false"
        @size-change="handelSizeChange"
        @current-change="handelCurrentChange"
        @prev-click="handelPrevClick"
        @next-click="handelNextClick"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import {
  getBlogType,
  addBlogType,
  deleteBlogType,
  changeBlogType,
} from "@/api/blog";
export default {
  data() {
    return {
      inputValue: "", //输入框内容
      select: "", //多选框内容
      isloading: false, //加载数据中
      data: [], //数据
      totalBlog: 0, //总分类数
      currentPage: 1, //当前页
      pageSize: 5, //每页显示多少条
      centerDialogVisible: false, //控制弹框
    };
  },
  computed: {
    AllPageSize() {
      //总页数
      return Math.ceil(+this.totalBlog / this.pageSize);
    },
  },
  methods: {
    //  获取数据
    async fetchData() {
      this.data = [];
      this.isloading = true;
      const resp = await getBlogType();
      this.totalBlog = resp.data.length;
      this.data = resp.data.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
      this.isloading = false;
      // 删除文章分类时可能出现下面情况
      if (this.currentPage > this.AllPageSize) {
        this.currentPage = this.AllPageSize;
      }
    },
    // 分页相关操作
    handelSizeChange(pageSize) {
      this.pageSize = parseInt(pageSize);
      this.currentPage = 1;
      this.fetchData();
    },
    handelCurrentChange(pageNum) {
      this.currentPage = parseInt(pageNum);
      this.fetchData();
    },
    handelPrevClick() {
      this.currentPage--;
    },
    handelNextClick() {
      this.currentPage++;
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style>
.el-select-dropdown {
  text-align: center;
}
</style>
<style lang="scss" scoped>
.blogType-container {
  padding: 30px;
  .input-container {
    width: 50%;
    display: flex;
    gap: 5px;
    margin-bottom: 20px;
    .select-container {
      width: 80px;
    }
  }
  .page-container {
    margin: 10px 0;
  }
}
</style>