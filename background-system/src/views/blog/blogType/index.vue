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
      <el-button type="primary" @click="handleAddBlogType">添加</el-button>
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
        <el-table-column fixed prop="order" label="分类权重" align="center">
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
                @click="handleEditClick(scope.row)"
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
                @click="handleDelectClick(scope.row)"
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
    <!-- 编辑页面 -->
    <el-dialog title="编辑文章分类" :visible.sync="centerDialogVisible">
      <el-form :model="form">
        <el-form-item label="博客类别">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="order权重">
          <el-select v-model="form.order" placeholder="请选择分类权重">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getBlogType,
  addBlogType,
  deleteBlogType,
  changeBlogType,
} from "@/api/blog";
import getPage from "@/mixins/pageData.js";
export default {
  mixins: [getPage([])],
  data() {
    return {
      inputValue: "", //输入框内容
      select: "", //多选框内容
      pageSize: 5, //每页显示多少条
      form: {}, // 编辑页面数据
    };
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
    // 添加文章分类
    async handleAddBlogType() {
      for (const item of this.data) {
        if (this.inputValue === item.name) {
          this.$message.error("分类名称已存在!不能重复添加");
          this.inputValue = "";
          this.select = "";
          return;
        }
      }
      if (this.inputValue && this.select) {
        const resp = await addBlogType({
          name: this.inputValue,
          order: this.select,
        });
        if (typeof resp !== "string") {
          this.fetchData();
          this.inputValue = "";
          this.select = "";
          this.$message({
            message: "文章分类添加成功！",
            type: "success",
          });
        } else {
          this.$message({
            message: "文章分类添加失败！",
            type: "error",
          });
        }
      } else if (this.inputValue && !this.select) {
        this.$message({
          message: "请选择文章分类权重值！",
          type: "warning",
        });
      } else if (!this.inputValue && this.select) {
        this.$message({
          message: "请填写文章分类名称",
          type: "warning",
        });
      } else {
        this.$message({
          message: "文章分类名称和权重值不能为空！",
          type: "error",
        });
      }
    },
    // 删除文章分类
    async handleDelectClick(data) {
      this.$confirm(
        "此操作将永久删除文章分类，该文章分类下的所有文章将会变成未分类, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(async () => {
          const resp = await deleteBlogType(data.id);
          if (resp.code === 0) {
            this.fetchData();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 编辑文章分类
    handleEditClick(resp) {
      this.form = { ...resp };
      return (this.centerDialogVisible = !this.centerDialogVisible);
    },
    // 编辑文章分类
    async handleEditConfirm() {
      for (const item of this.data) {
        if (this.form.name === item.name && +this.form.order === item.order) {
          this.$message.error("分类名称和排序已存在!不能重复添加");
          return;
        }
      }
      const resp = await changeBlogType(this.form);
      if (typeof resp !== "string") {
        this.fetchData();
        this.centerDialogVisible = false;
        this.$message({
          message: "文章分类修改成功",
          type: "success",
        });
      } else {
        this.fetchData();
        this.centerDialogVisible = false;
        this.$message({
          message: "文章分类修改失败",
          type: "error",
        });
      }
    },
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