# 🚀 GitHub Pages 部署指南 - 广东南华碳排放核算系统

## 📋 快速部署步骤（无需安装任何软件）

### 第一步：创建 GitHub 账号（如果已有请跳过）

1. 访问 https://github.com
2. 点击 "Sign up"
3. 输入邮箱地址注册
4. 验证邮箱
5. 设置用户名和密码

---

### 第二步：创建新仓库

**重要：仓库名要包含 gdnhec**

1. 登录 GitHub 后，点击右上角 **"+"** → **"New repository"**
2. 填写以下信息：
   - **Repository name**: `gdnhec-carbon-accounting` （或其他包含 gdnhec 的名字）
   - **Description**: `公共机构碳排放核算系统 - 广东省南华节能和低碳发展研究院`
   - **Public**: ✅ 选中（必须公开才能使用 Pages）
   - **Initialize this repository with a README**: ❌ 不要勾选
3. 点击 **"Create repository"**

---

### 第三步：上传文件

#### 方法 1：直接拖拽（推荐）⭐

1. 在创建的仓库页面，找到 **"uploading an existing file"** 链接并点击
2. 打开文件资源管理器，进入文件夹：`d:\文件\0.脚本\公共机构碳排放核算`
3. **选择所有文件**（Ctrl+A），但**不要**选择 `.gitignore` 文件
4. 将选中的文件**直接拖拽**到浏览器的上传区域
5. 等待上传完成（约 1-2 分钟，取决于网络速度）
6. 在 "Commit changes" 框中输入：`Initial commit - Add carbon accounting system`
7. 点击绿色按钮 **"Commit changes"**

#### 方法 2：逐个上传

如果文件太大无法一次上传，可以：
1. 先上传主要文件：`index.html`, `style.css`, `app.js`
2. 再上传其他文件：`README.md`, `DEPLOYMENT.md` 等
3. 每次上传后点击 "Commit changes"

---

### 第四步：启用 GitHub Pages

1. 在仓库页面，点击 **"Settings"**（设置）标签
2. 在左侧边栏，找到并点击 **"Pages"**
3. 在 **Source** 下拉菜单中：
   - 第一行选择：**main**
   - 第二行保持：**/(root)**
4. 点击 **"Save"** 按钮
5. 等待约 **2-5 分钟**（页面会自动刷新）

---

### 第五步：获取你的网站链接！🎉

页面刷新后，在顶部会显示：

```
Your site is live at 🎉
https://你的用户名.github.io/gdnhec-carbon-accounting/
```

**恭喜！你的网站已经上线了！**

---

## 📱 分享和使用

### 网站链接格式
```
https://YOUR_GITHUB_USERNAME.github.io/gdnhec-carbon-accounting/
```

例如：
- 如果你的 GitHub 用户名是 `nanhua-institute`
- 网址就是：`https://nanhua-institute.github.io/gdnhec-carbon-accounting/`

### 可以做的事情
✅ 将链接发送给同事和合作伙伴  
✅ 在微信群、QQ 群分享  
✅ 嵌入到机构官方网站  
✅ 生成二维码方便扫码访问  
✅ 在手机、平板、电脑上使用  

---

## 🔧 后续更新

如果需要修改内容：

### 小改动（推荐）
1. 在 GitHub 仓库中找到要修改的文件
2. 点击文件名
3. 点击右上角的铅笔图标 ✏️
4. 直接在线编辑
5. 点击 "Commit changes"
6. 等待 1-2 分钟自动更新

### 大改动
1. 本地修改文件
2. 在仓库页面点击 "Add file" → "Upload files"
3. 上传修改后的文件
4. 覆盖原文件
5. Commit changes

---

## 🎨 自定义域名（可选）

如果你想让网址更专业，比如：
- `carbon.gdnhec.com`
- `www.nanhua-carbon.org`

### 步骤：
1. 购买域名（如在阿里云、腾讯云等）
2. 在域名管理后台添加 CNAME 记录：
   ```
   主机记录：carbon (或 www)
   记录类型：CNAME
   记录值：YOUR_USERNAME.github.io
   ```
3. 在 GitHub 仓库 Settings → Pages → Custom domain
4. 输入你的域名
5. 保存后自动启用 HTTPS

---

## ⚠️ 常见问题

### Q1: 上传后为什么看不到网站？
**A**: 等待 2-5 分钟，GitHub 需要时间构建。刷新 Pages 设置页面查看状态。

### Q2: 网站链接打不开怎么办？
**A**: 
- 检查仓库是否是 Public（公开）
- 检查 Pages 是否正确配置 main 分支
- 清除浏览器缓存后重试

### Q3: 文件太多传不上去？
**A**: 分批上传，或者压缩图片等大文件。

### Q4: 可以删除重新上传吗？
**A**: 可以！直接在 GitHub 上删除文件，然后重新上传即可。

---

## 📞 技术支持

设计单位：广东省南华节能和低碳发展研究院  
联系电话：86(0)20-8526 2231

---

## 🎯 下一步

网站上线后，你可以：
1. 测试所有功能是否正常
2. 分享给同事试用
3. 收集反馈意见
4. 根据需要优化改进

**祝你部署顺利！** 🎉
