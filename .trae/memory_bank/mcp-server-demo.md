# Gamma MCP Server 项目记忆

## 📋 项目概述

- **项目名称**: Gamma MCP Server
- **项目类型**: TypeScript MCP Server 实现
- **开发状态**: 完成阶段
- **主要功能**: 通过 Gamma API 生成演示文稿、文档和社交内容

## 🎯 功能目标

- 实现一个专业的 Gamma MCP (Model Context Protocol) 服务器
- 集成完整的 Gamma API v0.2 功能
- 支持多种内容格式生成（演示文稿、文档、社交内容）
- 提供完善的参数验证和错误处理

## 🏗️ 架构设计

### 核心模块

1. **Server**: MCP 服务器主体 (src/index.ts)
2. **Logger**: 结构化日志系统 (src/utils/logger.ts)
3. **Validation**: Zod 参数验证
4. **API Integration**: Gamma API 集成

### API 设计

- 支持 stdio 传输
- 实现标准 MCP 协议方法
- 完整的 Gamma API v0.2 支持
- 环境变量配置 (GAMMA_API_KEY)

## 📦 依赖包

### 核心依赖
- `@modelcontextprotocol/sdk`: MCP SDK
- `zod`: 运行时类型验证

### 开发依赖
- `typescript`: TypeScript 编译器
- `ts-node`: TypeScript 运行时
- `@typescript-eslint/eslint-plugin`: TypeScript ESLint 插件
- `@typescript-eslint/parser`: TypeScript ESLint 解析器
- `eslint`: 代码检查 (v9.x)
- `prettier`: 代码格式化
- `@types/node`: Node.js 类型定义

## 🔄 开发进度

- [x] 项目初始化和配置
- [x] 依赖安装和管理
- [x] TypeScript 配置 (ESNext 模块)
- [x] ESLint 9.x 配置
- [x] Prettier 配置
- [x] Gamma MCP Server 核心实现
- [x] Zod 参数验证集成
- [x] 结构化日志系统
- [x] 完整的 Gamma API 集成
- [x] 错误处理和用户反馈
- [x] 代码质量检查通过
- [x] 项目构建成功
- [x] 完整文档编写

## 📋 实现的功能

### 主要工具

#### **generate**: Gamma 内容生成工具

**核心参数**:
- `inputText` (必需): 生成内容的文本 (1-750,000 字符)
- `format`: presentation | document | social
- `textMode`: generate | condense | preserve
- `themeName`: 主题名称 (默认: Oasis)
- `numCards`: 卡片数量 (1-60)
- `exportAs`: pdf | pptx

**高级选项**:
- `textOptions`: 文本生成选项 (数量、语调、受众、语言)
- `imageOptions`: 图像选项 (来源、模型、样式)
- `cardOptions`: 卡片布局选项
- `sharingOptions`: 共享和访问控制
- `additionalInstructions`: 额外说明

### 技术实现

#### **API 集成**
- **端点**: https://public-api.gamma.app/v0.2/generations
- **认证**: X-API-KEY 头部认证
- **方法**: POST 请求
- **响应处理**: 完整的成功和错误处理

#### **参数验证**
- 使用 Zod 进行运行时类型检查
- 详细的验证错误消息
- 类型安全的参数处理

#### **错误处理**
- HTTP 状态码处理
- API 错误消息解析
- 用户友好的错误反馈
- 详细的调试日志

#### **日志系统**
- 结构化日志记录
- 不同级别的日志 (info, error, debug)
- API 调用跟踪
- 性能监控

### 配置要求

#### **环境变量**
- `GAMMA_API_KEY`: Gamma API 密钥 (必需)

#### **MCP 客户端配置示例**
```json
{
  "mcpServers": {
    "gamma-mcp-pro": {
      "command": "npx",
      "args": ["-y", "gamma-mcp-pro"],
      "env": {
        "GAMMA_API_KEY": "sk-gamma-your-api-key-here"
      }
    }
  }
}
```

### 技术规格
- **MCP SDK 版本**: 最新版本
- **TypeScript**: 严格模式，ESNext 模块
- **代码质量**: ESLint 9.x + Prettier
- **运行时验证**: Zod 集成
- **HTTP 客户端**: 原生 fetch API
- **错误处理**: 全面的异常捕获和处理