# 项目技术规范

## 🎯 技术栈

- **Node.js**: v18+
- **编程语言**: TypeScript
- **输出格式**: CommonJS (cjs)
- **包管理**: pnpm (禁用 npm/yarn)
- **代码规范**: ESLint + Prettier
- **类型检查**: 严格模式 (strict)

## 📦 项目结构

```
src/
├── index.ts           # 模块入口
├── utils/             # 工具函数
├── services/          # 外部服务封装
├── types/             # 类型定义
```

## 📐 开发原则

- 所有函数模块必须使用明确的类型注解
- 所有模块必须支持 Tree-shaking（尽量使用纯函数）
- 函数/类注释需包含用途说明、参数定义和示例用法
- 严格遵循 ESLint + Prettier 风格
- 使用具名导出，禁止默认导出

## 🚫 严格禁止

- 禁止使用 npm 或 yarn
- 禁止生成无类型注解的函数/类
- 禁止使用默认导出
- 禁止生成无注释、无文档说明的函数/类

## 📄 配置要求

- TypeScript: 目标 ES2020，模块 CommonJS，严格模式
- ESLint: 推荐规则 + TypeScript 支持 + Prettier 集成
- Prettier: 统一代码格式化