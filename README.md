# Gamma MCP Pro

A professional TypeScript-based MCP (Model Context Protocol) server for generating presentations, documents, and social content using the Gamma API.

## 🚀 Features

- **Gamma Content Generation**: Create presentations, documents, and social media content
- **Comprehensive API Support**: Full support for Gamma API v0.2 parameters
- **Multiple Output Formats**: Presentations, documents, and social media content
- **Theme Customization**: Support for various Gamma themes including custom themes
- **Export Options**: PDF and PPTX export functionality
- **Advanced Configuration**: Text options, image options, card layouts, and sharing settings
- **Multi-language Support**: 50+ languages supported for content generation
- **Flexible Content Input**: Support for brief topics to detailed content with manual card splitting

## 📦 Tech Stack

- **Node.js** v18+
- **TypeScript** 5.x with strict mode
- **MCP SDK** 1.17.x for Model Context Protocol
- **Gamma API** v0.2 for content generation
- **Zod** for runtime type validation
- **ESLint** + **Prettier** for code quality
- **pnpm** for package management

## 🛠️ Installation & Setup

### Prerequisites

- Node.js v18 or higher
- pnpm package manager
- Gamma API key

### Clone and Install

```bash
# Clone the repository
git clone https://github.com/akira-cn/gamma-mcp-pro.git
cd gamma-mcp-pro

# Install dependencies
pnpm install

# Build the project
pnpm build
```

### 🔑 Configuration

#### Environment Variables

Set your Gamma API key as an environment variable:

```bash
export GAMMA_API_KEY="sk-gamma-your-api-key-here"
```

### Development Mode

```bash
pnpm dev
```

### Production Mode

```bash
pnpm build
pnpm start
```

## 🔧 MCP Client Configuration

Configure this server in your MCP client (e.g., Claude Desktop):

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

Or run locally:

```json
{
  "mcpServers": {
    "gamma-mcp-pro": {
      "command": "node",
      "args": ["dist/index.js"],
      "cwd": "/path/to/gamma-mcp-pro",
      "env": {
        "GAMMA_API_KEY": "sk-gamma-your-api-key-here"
      }
    }
  }
}
```

## 🎯 Usage

### Configuration in Cursor IDE

To use this MCP server in Cursor IDE, you need to configure it in your Cursor settings:

1. **Open Cursor Settings**: Go to `Cursor > Settings` (or `Cmd/Ctrl + ,`)

2. **Navigate to Features**: Click on "Features" in the left sidebar

3. **Find Model Context Protocol**: Look for the "Model Context Protocol" section

4. **Add Server Configuration**: Click "Edit Config" and add the following configuration:

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

**Alternative: Local Installation**

If you prefer to run the server locally:

```json
{
  "mcpServers": {
    "gamma-mcp-pro": {
      "command": "node",
      "args": ["dist/index.js"],
      "cwd": "/absolute/path/to/gamma-mcp-pro",
      "env": {
        "GAMMA_API_KEY": "sk-gamma-your-api-key-here"
      }
    }
  }
}
```

5. **Save and Restart**: Save the configuration and restart Cursor for changes to take effect

6. **Verify Connection**: Open a new chat and you should see the Gamma MCP Pro server available with the `generate` tool

### Basic Usage

The server provides a single `generate` tool that accepts comprehensive parameters for content generation:

```typescript
// Example: Generate a presentation about AI productivity
{
  "inputText": "Ways to use AI for productivity in the workplace",
  "format": "presentation",
  "themeName": "Corporate",
  "numCards": 8,
  "textOptions": {
    "tone": "professional",
    "audience": "business executives",
    "amount": "detailed"
  }
}
```

### Advanced Features

#### Manual Card Splitting

```typescript
{
  "inputText": "# Introduction\nOverview of AI tools\n---\n# Benefits\nKey advantages\n---\n# Implementation\nStep-by-step guide",
  "cardSplit": "inputTextBreaks"
}
```

#### Custom Image Generation

```typescript
{
  "imageOptions": {
    "source": "aiGenerated",
    "model": "imagen-4-pro",
    "style": "photorealistic"
  }
}
```

#### Export Options

```typescript
{
  "exportAs": "pdf", // or "pptx"
  "cardOptions": {
    "dimensions": "16x9"
  }
}
```

## 📋 API Parameters

### Core Parameters

- **inputText** (required): Content to generate from (1-750,000 characters)
- **format**: `presentation` | `document` | `social` (default: `presentation`)
- **textMode**: `generate` | `condense` | `preserve` (default: `generate`)
- **themeName**: Theme name (default: `Oasis`)
- **numCards**: Number of cards 1-60 (default: 10)
- **cardSplit**: `auto` | `inputTextBreaks` (default: `auto`)

### Advanced Options

- **textOptions**: Control tone, audience, language, and content amount
- **imageOptions**: Configure AI image generation
- **cardOptions**: Set dimensions and layout
- **sharingOptions**: Control access permissions
- **exportAs**: Export format (`pdf` | `pptx`)
- **additionalInstructions**: Custom generation instructions

### Supported Languages

Supports 50+ languages including:
- English (en, en-gb, en-in)
- Spanish (es, es-es, es-mx, es-419)
- Chinese (zh-cn, zh-tw)
- Japanese (ja, ja-da)
- And many more...

## 🧹 Development

### Code Quality

```bash
# Lint code
pnpm lint
pnpm lint:fix

# Format code
pnpm format
pnpm format:check
```

### Project Structure

```
src/
├── index.ts           # Main MCP server implementation
└── utils/
    └── logger.ts      # Structured logging utility
dist/                  # Compiled output
tests/                 # Test files (if any)
.trae/
├── project_rules.md   # Project technical specifications
└── memory_bank/       # Project development context
```

## 📄 Scripts

- `pnpm build`: Compile TypeScript to JavaScript
- `pnpm dev`: Run in development mode with ts-node
- `pnpm start`: Run compiled JavaScript
- `pnpm lint`: Check code with ESLint
- `pnpm lint:fix`: Auto-fix ESLint issues
- `pnpm format`: Format code with Prettier
- `pnpm format:check`: Check code formatting
- `pnpm clean`: Remove dist directory

## 🔒 Security

- API keys are handled through environment variables
- No sensitive data is logged or exposed
- Strict TypeScript configuration for type safety
- Input validation using Zod schemas

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes following the project's coding standards
4. Run tests and linting
5. Submit a pull request

## 📝 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Repository](https://github.com/akira-cn/gamma-mcp-pro)
- [Issues](https://github.com/akira-cn/gamma-mcp-pro/issues)
- [Gamma API Documentation](https://gamma.app/docs)
- [Model Context Protocol](https://modelcontextprotocol.io/)

## 📊 Status

- ✅ Core MCP server implementation
- ✅ Full Gamma API v0.2 integration
- ✅ Comprehensive parameter validation
- ✅ Error handling and logging
- ✅ TypeScript strict mode
- ✅ ESLint + Prettier configuration
- ✅ Production-ready build system

---

**Built with ❤️ using TypeScript and the Model Context Protocol**