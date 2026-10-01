#!/usr/bin/env node

/**
 * Standalone Model Context Protocol (MCP) Server for SIH-26122 Execution Bridge
 * Communicates over Standard I/O (JSON-RPC 2.0)
 */

import readline from 'readline';
import { MCP_TOOLS, handleMcpToolCall } from './lib/mcp.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

function sendResponse(id, result, error = null) {
  const response = {
    jsonrpc: '2.0',
    id,
    ...(error ? { error } : { result }),
  };
  process.stdout.write(JSON.stringify(response) + '\n');
}

rl.on('line', async (line) => {
  if (!line.trim()) return;

  try {
    const request = JSON.parse(line.trim());
    const { id, method, params } = request;

    if (method === 'initialize') {
      return sendResponse(id, {
        protocolVersion: '2024-11-05',
        capabilities: {
          tools: {},
        },
        serverInfo: {
          name: 'sih-execution-bridge-mcp',
          version: '1.0.0',
        },
      });
    }

    if (method === 'tools/list') {
      return sendResponse(id, {
        tools: MCP_TOOLS,
      });
    }

    if (method === 'tools/call') {
      const { name, arguments: args } = params || {};
      try {
        const result = await handleMcpToolCall(name, args || {});
        return sendResponse(id, result);
      } catch (callErr) {
        return sendResponse(id, null, {
          code: -32603,
          message: callErr.message,
        });
      }
    }

    return sendResponse(id, null, {
      code: -32601,
      message: `Method '${method}' not found`,
    });
  } catch (err) {
    sendResponse(null, null, {
      code: -32700,
      message: 'Parse error: ' + err.message,
    });
  }
});
