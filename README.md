# MyTodo - 待办事项应用

一个现代化的全栈待办事项应用，使用 React + Vite + TypeScript + Tailwind CSS 构建前端，Node.js + Express + TypeScript 构建后端。

## 功能特性

- 创建、编辑、删除待办事项
- 标记待办事项为完成/未完成
- 支持待办事项描述
- 实时进度显示
- 现代化 UI 设计
- 响应式布局

## 技术栈

### 前端
- React 18
- Vite 5
- TypeScript
- Tailwind CSS

### 后端
- Node.js
- Express
- TypeScript
- UUID (用于生成唯一ID)

## 项目结构

```
mytodo/
├── backend/                 # 后端代码
│   ├── src/
│   │   ├── controllers/    # 控制器
│   │   ├── middleware/     # 中间件
│   │   ├── models/         # 数据模型
│   │   ├── routes/         # 路由
│   │   ├── utils/          # 工具函数
│   │   └── index.ts        # 入口文件
│   ├── package.json
│   └── tsconfig.json
├── frontend/                # 前端代码
│   ├── src/
│   │   ├── api/            # API 调用
│   │   ├── components/     # React 组件
│   │   ├── types/          # TypeScript 类型
│   │   ├── App.tsx         # 主组件
│   │   ├── main.tsx        # 入口文件
│   │   └── index.css       # 样式
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
├── package.json             # 根目录配置
└── README.md
```

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖

```bash
# 安装所有依赖
npm run install:all
```

或者分别安装：

```bash
# 安装根目录依赖
npm install

# 安装后端依赖
cd backend && npm install

# 安装前端依赖
cd frontend && npm install
```

### 启动开发服务器

```bash
# 同时启动前端和后端开发服务器
npm run dev
```

或者分别启动：

```bash
# 启动后端服务器 (端口 8080)
npm run dev:backend

# 启动前端服务器 (端口 3000)
npm run dev:frontend
```

### 访问应用

- 前端: http://localhost:3000
- 后端 API: http://localhost:8080/api/todos
- 健康检查: http://localhost:8080/health

## API 接口

### 待办事项 API

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | /api/todos | 获取所有待办事项 |
| GET | /api/todos/:id | 获取单个待办事项 |
| POST | /api/todos | 创建待办事项 |
| PUT | /api/todos/:id | 更新待办事项 |
| PATCH | /api/todos/:id/toggle | 切换完成状态 |
| DELETE | /api/todos/:id | 删除待办事项 |

### 请求/响应示例

#### 创建待办事项

```bash
POST /api/todos
Content-Type: application/json

{
  "title": "完成项目报告",
  "description": "准备下周一的项目汇报材料"
}
```

响应：

```json
{
  "success": true,
  "message": "Todo created successfully",
  "data": {
    "id": "uuid-string",
    "title": "完成项目报告",
    "description": "准备下周一的项目汇报材料",
    "completed": false,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

## 构建生产版本

```bash
# 构建前端和后端
npm run build
```

## 开发脚本

- `npm run dev` - 同时启动前端和后端开发服务器
- `npm run dev:backend` - 仅启动后端
- `npm run dev:frontend` - 仅启动前端
- `npm run build` - 构建生产版本
- `npm run start` - 启动生产服务器
- `npm run lint` - 运行代码检查
- `npm run install:all` - 安装所有依赖

## 许可证

MIT
