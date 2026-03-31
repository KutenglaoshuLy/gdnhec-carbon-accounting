# 公共机构碳排放核算系统 - 部署指南

## 🚀 快速部署到公开服务器

### 方案一：GitHub Pages（推荐）⭐

**优点**：完全免费、永久稳定、支持自定义域名、HTTPS 自动启用

#### 步骤：

1. **创建 GitHub 账号**
   - 访问 https://github.com
   - 注册免费账号

2. **创建新仓库**
   ```bash
   # 在 GitHub 网站上点击 "New" 创建新仓库
   # 仓库名建议：carbon-accounting 或 public-institutions-carbon
   # 设置为 Public（公开）
   ```

3. **上传文件**
   ```bash
   # 方式 1：使用 Git 命令行
   cd d:\文件\0.脚本\公共机构碳排放核算
   
   # 初始化 git 仓库
   git init
   
   # 添加所有文件
   git add .
   
   # 提交
   git commit -m "Initial commit: Carbon accounting system"
   
   # 关联远程仓库（替换 YOUR_USERNAME 和 REPO_NAME）
   git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
   
   # 推送
   git push -u origin main
   ```

4. **启用 GitHub Pages**
   - 进入仓库的 Settings → Pages
   - Source 选择 `main` 分支
   - 点击 Save
   - 等待几分钟，你的网站就会上线！

5. **访问你的网站**
   - 网址格式：`https://YOUR_USERNAME.github.io/REPO_NAME/`
   - 可以直接分享给任何人使用！

---

### 方案二：Netlify（最简单）✨

**优点**：拖拽上传、自动 HTTPS、全球 CDN、完全免费

#### 步骤：

1. **访问 Netlify**
   - 打开 https://app.netlify.com/drop

2. **直接拖拽文件夹**
   - 将整个项目文件夹拖拽到网页上
   - 等待上传完成（几秒钟）

3. **获取在线链接**
   - 上传完成后会生成一个随机域名
   - 格式：`https://random-name-xxxxxx.netlify.app`
   - 可以立即分享使用！

4. **（可选）自定义设置**
   - 注册账号后可以绑定自己的域名
   - 可以修改网站名称

---

### 方案三：Vercel（速度快）⚡

**优点**：全球 CDN、自动部署、性能优秀

#### 步骤：

1. **访问 Vercel**
   - 打开 https://vercel.com/new

2. **导入项目**
   - 可以使用 GitHub 导入
   - 或者使用 CLI 工具上传

3. **一键部署**
   - 点击 Deploy
   - 等待构建完成

4. **获取链接**
   - 格式：`https://your-project.vercel.app`

---

### 方案四：Cloudflare Pages（新兴选择）☁️

**优点**：免费额度高、全球边缘节点、与 Cloudflare 生态集成

#### 步骤：

1. **访问 Cloudflare**
   - 打开 https://pages.cloudflare.com

2. **连接 Git 仓库**
   - 关联 GitHub 账号
   - 选择你的仓库

3. **部署**
   - 设置构建配置（静态网站无需构建）
   - 点击 Deploy

---

## 📊 各方案对比

| 方案 | 难度 | 速度 | 自定义域名 | 推荐度 |
|------|------|------|-----------|--------|
| GitHub Pages | ⭐⭐⭐ | ⭐⭐⭐⭐ | ✅ | ⭐⭐⭐⭐⭐ |
| Netlify | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ✅ | ⭐⭐⭐⭐⭐ |
| Vercel | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ✅ | ⭐⭐⭐⭐ |
| Cloudflare Pages | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ✅ | ⭐⭐⭐⭐ |

---

## 🎯 最佳实践建议

### 推荐使用 GitHub Pages + Netlify 双备份

**理由**：
- GitHub Pages 作为主站点（代码管理更规范）
- Netlify 作为备用站点（部署更快速）
- 两个都可以免费使用
- 可以绑定同一个自定义域名

### 自定义域名（可选）

如果你有自己域名，可以：
1. 在域名服务商处添加 CNAME 记录
2. 在 GitHub Pages/Netlify 中绑定域名
3. 自动启用 HTTPS

---

## 📱 分享和使用

部署完成后，你可以：
- ✅ 将链接发给同事和合作伙伴
- ✅ 嵌入到机构官网中
- ✅ 在社交媒体分享
- ✅ 生成二维码方便扫码访问

---

## 🔧 后续更新

如果需要修改功能：
1. 本地修改代码
2. 重新上传到托管平台
3. 自动更新（GitHub/Vercel）或手动重新上传（Netlify Drop）

---

## 💡 需要帮助？

如果在部署过程中遇到问题，可以：
- 查看各平台的官方文档
- 搜索相关教程
- 联系平台技术支持

---

**设计单位**：广东省南华节能和低碳发展研究院  
**联系电话**：86(0)20-8526 2231
