# S1 项目页接入说明

目标仓库：https://github.com/Yuexuan9/Yuexuan9.github.io
目标页面：https://yuexuan9.github.io/s1-mobile-manipulation/

## 包内文件

- `s1-mobile-manipulation/index.html`：独立项目页，包含所有 CSS、交互脚本和中英文文案，不需要 npm 或构建步骤。
- `index.html`：以本次读取的官网 main 分支首页为基础，仅为 S1 区域添加点击入口和局部样式。
- `s1-project.patch`：相同修改的 Git 补丁；可在仓库根目录先执行 `git apply --check s1-project.patch`，通过后再执行 `git apply s1-project.patch`。

## 网页上传方式

1. 解压后，将包内的 `s1-mobile-manipulation` 文件夹放入仓库根目录。
2. 将根目录 `index.html` 更新为包内版本。该版本保留本次读取时的其余主页内容。
3. 提交后等待现有 GitHub Pages 发布完成。
4. 点击首页 S1 项目的标题、视频缩略图或简介区域，即可进入新项目页。

如果首页在本次交付后又有其他修改，请使用补丁方式，并先运行检查，避免覆盖后续内容。

## 页面功能

- 英文默认，支持中文切换；`?lang=zh` 可直接进入中文版。
- SE(2) 互动示意：调整车身朝向、前向/侧向位移和相对 yaw，观察 ODOM 目标变化。
- 训练/推理链路切换、公式展开、技术问答、返回主页及阅读进度。
- 响应式布局、键盘焦点、减少动态效果偏好和打印样式。

视频直接引用官网已存在的 S1 视频，未复制或新增媒体。Google Fonts 加载失败时会回退至系统字体；几何交互无第三方依赖。

## 内容与证据

工程内容依据用户提供的开发记录；展示 10,000 步训练与记录的 loss 0.019795。
30 Hz / 250 Hz 标注为客户端配置。页面没有将它们写成实测性能，也未编造任务成功率。
UMI 被标注为相对轨迹表示的相关方法；Mobile ALOHA 的速度动作与本项目的相对位姿动作明确区分。

当前 GitHub 连接仅有读取权限，因此本包尚未写入 main 分支；官网点击入口需要上传本包或应用补丁后生效。
