'use client';

import { useState } from 'react';
import { Server, Database, ArrowRightLeft, BookOpen, Zap, Layers } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/ui/card';
import { RestDemo } from '@/src/modules/demo/components/RestDemo';
import { GraphqlDemo } from '@/src/modules/demo/components/GraphqlDemo';

type Tab = 'rest' | 'graphql';

const comparisonPoints = [
  {
    icon: <Database className="w-5 h-5 text-blue-500" />,
    title: 'Data Fetching',
    rest: 'Fixed endpoints per resource. Need multiple requests for nested data.',
    graphql: 'Single endpoint. Request exactly the fields you need.',
    winner: 'graphql',
  },
  {
    icon: <Layers className="w-5 h-5 text-purple-500" />,
    title: 'Nested Data',
    rest: 'Multiple round trips (e.g., /developers then /developers/:id/projects).',
    graphql: 'Nested queries in one request (e.g., developer { projects { name } }).',
    winner: 'graphql',
  },
  {
    icon: <Zap className="w-5 h-5 text-amber-500" />,
    title: 'Caching',
    rest: 'Manual caching required. No built-in cache.',
    graphql: 'Automatic in-memory caching with Apollo Client. Cache normalization.',
    winner: 'graphql',
  },
  {
    icon: <ArrowRightLeft className="w-5 h-5 text-green-500" />,
    title: 'Schema & Types',
    rest: 'No built-in schema. Types defined separately (TypeScript).',
    graphql: 'Strongly-typed schema as source of truth. Auto-generated types.',
    winner: 'graphql',
  },
  {
    icon: <Server className="w-5 h-5 text-pink-500" />,
    title: 'Real-time',
    rest: 'Polling or WebSocket setup required manually.',
    graphql: 'Subscriptions built-in for real-time updates.',
    winner: 'graphql',
  },
  {
    icon: <BookOpen className="w-5 h-5 text-indigo-500" />,
    title: 'Learning Curve',
    rest: 'Easier to start. Familiar HTTP concepts.',
    graphql: 'Steeper learning curve. New query language (SDL).',
    winner: 'rest',
  },
];

const bestPractices = [
  'REST: Use consistent URL patterns (/resources, /resources/:id)',
  'REST: Proper HTTP methods (GET, POST, PUT, PATCH, DELETE)',
  'REST: Status codes for error handling (400, 401, 404, 500)',
  'REST: Query parameters for filtering, sorting, pagination',
  'GraphQL: Request only the fields you need (no over-fetching)',
  'GraphQL: Use fragments for reusable field selections',
  'GraphQL: Client-side cache with proper normalization',
  'GraphQL: Optimistic UI updates with rollback on error',
  'Both: Error boundaries, loading states, retry logic',
  'Both: AbortController for request cancellation',
  'Both: Token-based authentication in headers',
];

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState<Tab>('rest');

  return (
    <div className="max-w-[1400px] mx-auto p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">REST &amp; GraphQL API Demo</h1>
        <p className="text-muted-foreground">
          Hands-on comparison of REST and GraphQL API integration with React, TypeScript, and Apollo Client.
        </p>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="flex border-b">
            <button
              className={`flex-1 flex items-center justify-center gap-2 py-4 font-medium transition-colors ${
                activeTab === 'rest'
                  ? 'bg-blue-500/10 text-blue-600 border-b-2 border-blue-500'
                  : 'hover:bg-muted/50 text-muted-foreground'
              }`}
              onClick={() => setActiveTab('rest')}
            >
              <Server className="w-4 h-4" />
              REST API Demo
            </button>
            <button
              className={`flex-1 flex items-center justify-center gap-2 py-4 font-medium transition-colors ${
                activeTab === 'graphql'
                  ? 'bg-pink-500/10 text-pink-600 border-b-2 border-pink-500'
                  : 'hover:bg-muted/50 text-muted-foreground'
              }`}
              onClick={() => setActiveTab('graphql')}
            >
              <Database className="w-4 h-4" />
              GraphQL Demo
            </button>
          </div>
        </CardContent>
      </Card>

      {activeTab === 'rest' ? <RestDemo /> : <GraphqlDemo />}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowRightLeft className="w-5 h-5 text-indigo-500" />
              REST vs GraphQL: Key Differences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {comparisonPoints.map((point) => (
              <div
                key={point.title}
                className="p-4 border rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  {point.icon}
                  <span className="font-medium">{point.title}</span>
                  <Badge variant={point.winner === 'rest' ? 'default' : 'secondary'} className="ml-auto text-xs">
                    {point.winner === 'rest' ? 'REST' : 'GraphQL'} advantage
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-blue-600 font-medium">REST:</span>{' '}
                    <span className="text-muted-foreground">{point.rest}</span>
                  </div>
                  <div>
                    <span className="text-pink-600 font-medium">GraphQL:</span>{' '}
                    <span className="text-muted-foreground">{point.graphql}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-500" />
              Interview Best Practices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {bestPractices.map((practice, index) => (
                <li key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-sm">{practice}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-500" />
            Architecture Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 border rounded-lg bg-muted/30">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                REST Architecture
              </h3>
              <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
                <code>{`Component
  |
  v
useRestDevelopers() hook
  |
  v
restClient (fetch wrapper)
  |
  v
GET /api/developers?page=1&pageSize=10
POST /api/developers
PUT /api/developers/:id
DELETE /api/developers/:id
  |
  v
Server → Database`}</code>
              </pre>
            </div>

            <div className="p-4 border rounded-lg bg-muted/30">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-pink-500" />
                GraphQL Architecture
              </h3>
              <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
                <code>{`Component
  |
  v
useGraphqlDevelopers() hook
  |
  v
Apollo Client (useQuery / useMutation)
  |
  v
Apollo Cache (InMemoryCache)
  |
  v
GraphQL Endpoint (/graphql)
  |
  v
GraphQL Server → Resolvers → Database`}</code>
              </pre>
            </div>

            <div className="p-4 border rounded-lg bg-muted/30">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                State Management
              </h3>
              <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
                <code>{`App (Root)
  |
  +-- ApolloProvider (GraphQL cache)
  |     |
  |     v
  |   useQuery / useMutation
  |     |
  |     v
  |   Automatic cache updates
  |
  +-- AppProvider (Context API)
  |     |
  |     v
  |   useAppStore()
  |     |
  |     v
  |   Global state (user, theme, etc.)
  |
  +-- Component-local state
        useState / useReducer`}</code>
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}