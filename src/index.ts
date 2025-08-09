#!/usr/bin/env node

/*
 * Gamma MCP Server - Generate presentations, documents, and social content using Gamma API
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { createLogger } from './utils/logger';
import { setTimeout } from 'timers/promises';

const logger = createLogger('GammaMCPServer');

// Gamma API configuration
const GAMMA_API_URL = 'https://public-api.gamma.app/v0.2/generations';
const GAMMA_API_KEY = process.env.GAMMA_API_KEY;

if (!GAMMA_API_KEY) {
  logger.error('GAMMA_API_KEY environment variable is required');
  process.exit(1);
}

/* Configuration
{
  "mcpServers": {
    "gamma-mcp-pro": {
      "command": "npx",
      "args": ["-y", "gamma-mcp-pro"],
      "cwd": "${workspaceFolder}",
      "env": {
        "GAMMA_API_KEY": "sk-gamma-mqNa**********Z078"
      }
    },
  }
}
*/

// Create an MCP server
const server = new McpServer({
  name: 'Gamma MCP Server',
  version: '0.1.0',
});

server.tool(
  'generate',
  'Generate a new Gamma creation (presentation, document, or social content) with comprehensive options.',
  {
    inputText: z.string().min(1).max(750000)
      .describe(`Text used to generate your gamma content.

      CONTENT FLEXIBILITY:
      - Brief topics: "Best hikes in the United States" or "Ways to use AI for productivity"
      - Detailed content: Pages of messy notes, structured outlines, or comprehensive text
      - Mixed formats: Bullet points, headings, paragraphs, or any combination
      
      CARD SPLITTING CONTROL:
      - Use \n---\n to manually control where cards are split
      - One \n---\n = one break (creates two cards)
      - Two \n---\n = two breaks (creates three cards)
      
      CHARACTER LIMITS: 1-750,000 characters
      
      EXAMPLE WITH BREAKS:
      "# Topic 1\nContent for first card\n---\n# Topic 2\nContent for second card"
      `),
    textMode: z
      .enum(['generate', 'condense', 'preserve'])
      .optional()
      .default('generate').describe(`Determines how your inputText is modified:
      
      - "generate": Using inputText as starting point, Gamma rewrites and expands content. Best for brief text you want to elaborate on.
      - "condense": Gamma summarizes inputText to fit desired content length. Best for large amounts of text you want to summarize.
      - "preserve": Retains exact text from inputText, sometimes adding structure (headings, formatting). Use additionalInstructions to prevent any modifications.
      `),
    format: z
      .enum(['presentation', 'document', 'social'])
      .optional()
      .default('presentation')
      .describe(`Determines the artifact Gamma will create:
      
      - "presentation": Slide-based format optimized for presentations
      - "document": Long-form document format for detailed content
      - "social": Social media optimized format for sharing
      
      Use cardOptions.dimensions to further specify the output shape.
      `),
    themeName: z.string().optional().default('Oasis')
      .describe(`Defines which theme from Gamma will be used for the output.
      
      THEME TYPES:
      - Standard themes: "Oasis", "Night Sky", "Minimal", "Corporate", etc.
      - Custom themes: If you have custom themes with the same name, they take priority
      
      Themes determine the look and feel including colors, fonts, and overall design aesthetic.
      `),
    numCards: z.number().int().min(1).max(60).optional().default(10)
      .describe(`Determines how many cards are created when cardSplit is set to "auto".
      
      RANGE: 1-60 cards
      BEHAVIOR: Only applies when cardSplit is "auto" - ignored when using "inputTextBreaks"
      
      Gamma will automatically divide your content to fit the specified number of cards.
      `),
    cardSplit: z.enum(['auto', 'inputTextBreaks']).optional().default('auto')
      .describe(`Determines how your content will be divided into cards:
      
      - "auto": Gamma looks at numCards field and divides content accordingly. Ignores \n---\n breaks in inputText.
      - "inputTextBreaks": Gamma looks for \n---\n breaks in inputText and divides based on these. Ignores numCards field.
      
      SCENARIOS:
      - No \n---\n + auto + numCards=10 → 10 cards
      - Has \n---\n + auto → ignores breaks, uses numCards
      - Has \n---\n + inputTextBreaks → respects breaks, ignores numCards
      `),
    additionalInstructions: z.string().optional()
      .describe(`Additional specifications to steer content, layouts, and other aspects of the output.
      
      EXAMPLES:
      - "Make the titles catchy and engaging"
      - "Use a professional tone throughout"
      - "Include more visual elements"
      - "Focus on actionable insights"
      - "Keep text minimal and use bullet points"
      
      This field helps you fine-tune the output beyond the standard parameters.
      `),
    exportAs: z.enum(['pdf', 'pptx']).optional()
      .describe(`Export format for the generated content:
      
      - "pdf": Portable Document Format - universal compatibility, good for sharing and printing
      - "pptx": PowerPoint format - editable in Microsoft PowerPoint and compatible applications
      
      If not specified, content remains in Gamma's native format for online viewing and editing.
      `),
    textOptions: z
      .object({
        amount: z
          .enum(['brief', 'detailed'])
          .optional()
          .default('detailed')
          .describe(
            'Content length: "brief" for concise text, "detailed" for comprehensive content'
          ),
        tone: z
          .string()
          .optional()
          .default('professional')
          .describe(
            'Writing tone (e.g., "professional", "casual", "inspiring", "technical", "friendly")'
          ),
        audience: z
          .string()
          .optional()
          .describe(
            'Target audience (e.g., "business executives", "students", "general public", "technical experts")'
          ),
        language: z
          .enum([
            'en',
            'en-gb',
            'en-in',
            'es',
            'es-es',
            'es-mx',
            'es-419',
            'ca',
            'fr',
            'zh-cn',
            'zh-tw',
            'ko',
            'ja',
            'ja-da',
            'pt-br',
            'pt-pt',
            'de',
            'it',
            'ru',
            'pl',
            'uk',
            'ro',
            'hu',
            'cs',
            'el',
            'tr',
            'ar',
            'ar-sa',
            'he',
            'fa',
            'nl',
            'sv',
            'da',
            'nb',
            'fi',
            'id',
            'vi',
            'hi',
            'gu',
            'mr',
            'te',
            'bn',
            'ta',
            'ur',
            'kn',
            'ml',
            'th',
            'sr',
            'hr',
            'sq',
            'bg',
            'sl',
            'bs',
            'mk',
            'sw',
            'ha',
            'yo',
            'tl',
            'ms',
            'kk',
            'uz',
            'af',
            'lv',
            'lt',
            'et',
            'is',
            'cy',
          ])
          .optional()
          .default('en')
          .describe(
            'Content language code. Supported languages: en (English), en-gb (British English), en-in (Indian English), es (Spanish), es-es (Spain Spanish), es-mx (Mexican Spanish), es-419 (Latin American Spanish), ca (Catalan), fr (French), zh-cn (Simplified Chinese), zh-tw (Traditional Chinese), ko (Korean), ja (Japanese), ja-da (Japanese Dakuten), pt-br (Brazilian Portuguese), pt-pt (European Portuguese), de (German), it (Italian), ru (Russian), pl (Polish), uk (Ukrainian), ro (Romanian), hu (Hungarian), cs (Czech), el (Greek), tr (Turkish), ar (Arabic), ar-sa (Saudi Arabic), he (Hebrew), fa (Persian), nl (Dutch), sv (Swedish), da (Danish), nb (Norwegian), fi (Finnish), id (Indonesian), vi (Vietnamese), hi (Hindi), gu (Gujarati), mr (Marathi), te (Telugu), bn (Bengali), ta (Tamil), ur (Urdu), kn (Kannada), ml (Malayalam), th (Thai), sr (Serbian), hr (Croatian), sq (Albanian), bg (Bulgarian), sl (Slovenian), bs (Bosnian), mk (Macedonian), sw (Swahili), ha (Hausa), yo (Yoruba), tl (Tagalog), ms (Malay), kk (Kazakh), uz (Uzbek), af (Afrikaans), lv (Latvian), lt (Lithuanian), et (Estonian), is (Icelandic), cy (Welsh)'
          ),
      })
      .optional()
      .describe(`Text generation options to control content style and presentation:
      
      EXAMPLE: { "amount": "detailed", "tone": "professional, inspiring", "audience": "outdoors enthusiasts, adventure seekers", "language": "en" }
      `),
    imageOptions: z
      .object({
        source: z
          .enum(['aiGenerated', 'stock', 'none'])
          .optional()
          .default('aiGenerated')
          .describe(
            'Image source: "aiGenerated" for AI-created images, "stock" for stock photos, "none" for text-only'
          ),
        model: z
          .enum(['imagen-4-pro', 'dall-e-3'])
          .optional()
          .default('imagen-4-pro')
          .describe(
            'AI model for image generation: "imagen-4-pro" (Google) or "dall-e-3" (OpenAI)'
          ),
        style: z
          .enum(['photorealistic', 'artistic', 'minimal'])
          .optional()
          .default('photorealistic')
          .describe(
            'Image style: "photorealistic" for realistic images, "artistic" for creative styles, "minimal" for simple graphics'
          ),
      })
      .optional().describe(`Image generation and styling options:
      
      EXAMPLE: { "source": "aiGenerated", "model": "imagen-4-pro", "style": "photorealistic" }
      `),
    cardOptions: z
      .object({
        dimensions: z
          .enum([
            'fluid',
            '16x9',
            '4x3',
            'pageless',
            'letter',
            'a4',
            '1x1',
            '4x5',
            '9x16',
          ])
          .optional()
          .default('fluid')
          .describe(
            'Card aspect ratio and format: "fluid" for adaptive sizing, "16x9" for widescreen (16:9), "4x3" for standard presentation, "pageless" for continuous scroll, "letter" for US letter size, "a4" for A4 paper size, "1x1" for square format, "4x5" for portrait ratio, "9x16" for vertical/mobile format'
          ),
      })
      .optional().describe(`Card layout and formatting options:
      
      DIMENSIONS:
      - "fluid": Adaptive sizing based on content
      - "16x9": Widescreen format (16:9 ratio, common for presentations)
      - "4x3": Traditional presentation format (4:3 ratio)
      - "pageless": Continuous scroll format without page breaks
      - "letter": US letter paper size (8.5x11 inches)
      - "a4": A4 paper size (210x297mm)
      - "1x1": Square format (good for social media)
      - "4x5": Portrait ratio (4:5, good for Instagram posts)
      - "9x16": Vertical/mobile format (9:16, good for stories)
      `),
    sharingOptions: z
      .object({
        workspaceAccess: z
          .enum(['view', 'edit', 'comment'])
          .optional()
          .default('view')
          .describe(
            'Workspace member access level: "view" (read-only), "edit" (full editing), "comment" (can add comments)'
          ),
        externalAccess: z
          .enum(['noAccess', 'view', 'edit'])
          .optional()
          .default('noAccess')
          .describe(
            'External user access level: "noAccess" (private), "view" (public viewing), "edit" (public editing)'
          ),
      })
      .optional().describe(`Sharing and access control options:
      
      WORKSPACE ACCESS: Controls what workspace members can do
      EXTERNAL ACCESS: Controls public access to the content
      
      EXAMPLE: { "workspaceAccess": "view", "externalAccess": "noAccess" } for private workspace viewing
      `),
  },
  async params => {
    try {
      logger.info('Generating Gamma content', {
        inputLength: params.inputText.length,
        format: params.format,
      });

      // Prepare the API request payload
      const payload = {
        inputText: params.inputText,
        textMode: params.textMode || 'generate',
        format: params.format || 'presentation',
        themeName: params.themeName || 'Oasis',
        numCards: params.numCards || 10,
        cardSplit: params.cardSplit || 'auto',
        ...(params.additionalInstructions && {
          additionalInstructions: params.additionalInstructions,
        }),
        ...(params.exportAs && { exportAs: params.exportAs }),
        ...(params.textOptions && { textOptions: params.textOptions }),
        ...(params.imageOptions && { imageOptions: params.imageOptions }),
        ...(params.cardOptions && { cardOptions: params.cardOptions }),
        ...(params.sharingOptions && { sharingOptions: params.sharingOptions }),
      };

      logger.debug('API request payload', payload);

      // Make the API request
      const response = await fetch(GAMMA_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': GAMMA_API_KEY,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        logger.error('Gamma API error', {
          status: response.status,
          error: errorText,
        });
        throw new Error(`Gamma API error (${response.status}): ${errorText}`);
      }

      let result = await response.json();
      const { generationId } = result;
      if (!generationId) {
        throw new Error('Gamma API response missing generationId');
      }
      logger.info('Gamma generation completed', { id: generationId });

      // Poll for completion
      const maxRetries = 1000;
      const retryInterval = 500; // 0.5 seconds
      let statusData: any = {};
      for (let attempt = 0; attempt < maxRetries; attempt++) {
        await setTimeout(retryInterval);
        const statusResponse = await fetch(`${GAMMA_API_URL}/${generationId}`, {
          method: 'GET',
          headers: {
            'X-API-KEY': GAMMA_API_KEY,
          },
        });
        statusData = await statusResponse.json();
        if (statusData.status === 'completed') {
          logger.info('Gamma generation completed successfully', {
            id: generationId,
          });
          break;
        }
      }

      result = {
        ...result,
        ...statusData,
      };

      return {
        content: [
          {
            type: 'text',
            text:
              `✅ Gamma generation completed successfully!\n\n` +
              `📋 **Generation Details:**\n` +
              `- ID: ${result.generationId || 'N/A'}\n` +
              `- Format: ${params.format || 'presentation'}\n` +
              `- Theme: ${params.themeName || 'Oasis'}\n` +
              `- Cards: ${params.numCards || 10}\n` +
              `- Text Mode: ${params.textMode || 'generate'}\n\n` +
              `🔗 **Access:**\n` +
              `${result.gammaUrl ? `- Web URL: ${result.gammaUrl}\n` : ''}` +
              `${result.exportUrl ? `- Export URL: ${result.exportUrl}\n` : ''}\n` +
              `📊 **Status:** ${result.status || 'Processing'}\n` +
              `⏱️ **Created:** ${new Date().toISOString()}`,
          },
        ],
      };
    } catch (error) {
      logger.error('Failed to generate Gamma content', error);
      return {
        content: [
          {
            type: 'text',
            text:
              `❌ **Error generating Gamma content:**\n\n${error instanceof Error ? error.message : 'Unknown error occurred'}\n\n` +
              `Please check your API key and try again. Make sure GAMMA_API_KEY environment variable is set correctly.`,
          },
        ],
        isError: true,
      };
    }
  }
);

async function main(): Promise<void> {
  // Start receiving messages on stdin and sending messages on stdout
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log('Server started');
}
main();
