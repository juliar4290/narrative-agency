# Implementation Guide: Five-Layer Digital Identity System

## Quick Start

### Prerequisites
1. Node.js 18.0.0+ installed
2. PostgreSQL 13.0+ or SQLite 3.35.0+
3. API keys for required services (see Technical Specifications)

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd narrative-agency

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys and configuration

# Initialize database
npm run db:setup

# Start the application
npm start
```

## Layer-by-Layer Implementation

### Layer 1: Data Gathering and Audit

#### Configuration
```javascript
// src/data-gathering/config.js
module.exports = {
  platforms: {
    linkedin: {
      enabled: true,
      apiVersion: '2023-01-01',
      rateLimit: 100 // requests per hour
    },
    github: {
      enabled: true,
      rateLimit: 5000 // requests per hour
    },
    personalWebsite: {
      enabled: true,
      maxDepth: 3,
      respectRobotsTxt: true
    }
  },
  outputFormat: 'json',
  compression: true
};
```

#### Usage Example
```javascript
// src/data-gathering/index.js
const DataGatherer = require('./DataGatherer');
const LLMAnalyzer = require('./LLMAnalyzer');

async function performAudit(userId) {
  const gatherer = new DataGatherer();
  const analyzer = new LLMAnalyzer();
  
  // Gather data from all platforms
  const rawData = await gatherer.collectAll(userId);
  
  // Analyze with LLM
  const insights = await analyzer.analyzePatterns(rawData);
  
  return {
    rawData,
    insights,
    timestamp: new Date()
  };
}
```

### Layer 2: Narrative Analysis and Coaching

#### System Prompts
```javascript
// src/narrative-analysis/prompts/coaching.js
const COACHING_SYSTEM_PROMPT = `
You are an expert digital identity coach. Your role is to help users explore their authentic professional identity through reflective questioning and evidence-based insights.

Guidelines:
1. Ask open-ended questions that encourage self-reflection
2. Use the audit data to ground your questions in reality
3. Identify inconsistencies between stated goals and current presence
4. Suggest authentic reframings rather than artificial optimization
5. Maintain a supportive, non-judgmental tone

Available data: {auditData}
User goals: {userGoals}
Current session: {sessionContext}
`;
```

#### Coaching Session Implementation
```javascript
// src/narrative-analysis/CoachingSession.js
class CoachingSession {
  constructor(userId, auditData) {
    this.userId = userId;
    this.auditData = auditData;
    this.sessionHistory = [];
    this.insights = [];
  }
  
  async processUserInput(userInput) {
    const prompt = this.buildPrompt(userInput);
    const response = await this.llm.generate(prompt);
    
    // Extract insights from response
    const insights = this.extractInsights(response);
    this.insights.push(...insights);
    
    return {
      response,
      insights,
      nextQuestions: this.generateFollowUpQuestions(insights)
    };
  }
  
  buildPrompt(userInput) {
    return `
      ${COACHING_SYSTEM_PROMPT}
      
      Previous conversation:
      ${this.sessionHistory.map(h => `${h.role}: ${h.content}`).join('\n')}
      
      User input: ${userInput}
      
      Provide coaching response and identify any insights.
    `;
  }
}
```

### Layer 3: Redirection Strategy Engine

#### Strategy Generation
```javascript
// src/strategy-engine/StrategyGenerator.js
class StrategyGenerator {
  constructor(currentState, desiredState, userGoals) {
    this.currentState = currentState;
    this.desiredState = desiredState;
    this.userGoals = userGoals;
  }
  
  async generateStrategy() {
    const gaps = this.identifyGaps();
    const opportunities = this.identifyOpportunities();
    
    const strategy = {
      priorityActions: await this.generatePriorityActions(gaps),
      contentRecommendations: await this.generateContentRecommendations(opportunities),
      platformStrategy: this.generatePlatformStrategy(),
      timeline: this.generateTimeline()
    };
    
    return strategy;
  }
  
  async generatePriorityActions(gaps) {
    const prompt = `
      Based on the following gaps between current and desired digital identity:
      ${JSON.stringify(gaps)}
      
      Generate 5 priority actions with:
      - Specific, actionable steps
      - Expected impact score (1-10)
      - Required effort (low/medium/high)
      - Platform recommendations
    `;
    
    return await this.llm.generate(prompt);
  }
}
```

### Layer 4: Implementation Layer

#### Platform Integration
```javascript
// src/implementation/platforms/LinkedInUpdater.js
class LinkedInUpdater {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }
  
  async updateProfile(updates) {
    const results = [];
    
    for (const update of updates) {
      try {
        switch (update.type) {
          case 'headline':
            await this.updateHeadline(update.content);
            break;
          case 'summary':
            await this.updateSummary(update.content);
            break;
          case 'experience':
            await this.updateExperience(update.content);
            break;
        }
        results.push({ success: true, type: update.type });
      } catch (error) {
        results.push({ success: false, type: update.type, error: error.message });
      }
    }
    
    return results;
  }
  
  async updateHeadline(headline) {
    return await this.apiClient.updateProfile({
      headline: headline,
      visibility: 'public'
    });
  }
}
```

### Layer 5: Monitoring and Feedback Loop

#### Monitoring System
```javascript
// src/monitoring/MonitoringSystem.js
class MonitoringSystem {
  constructor() {
    this.baselines = new Map();
    this.metrics = new Map();
  }
  
  async performMonitoringCheck(userId) {
    // Re-audit current state
    const currentState = await this.reAudit(userId);
    
    // Compare with baseline
    const baseline = this.baselines.get(userId);
    const changes = this.compareStates(baseline, currentState);
    
    // Generate insights
    const insights = await this.generateInsights(changes);
    
    // Update metrics
    this.updateMetrics(userId, changes, insights);
    
    return {
      currentState,
      changes,
      insights,
      recommendations: await this.generateRecommendations(changes)
    };
  }
  
  async generateInsights(changes) {
    const prompt = `
      Analyze the following changes in digital presence:
      ${JSON.stringify(changes)}
      
      Provide insights on:
      1. Narrative evolution trends
      2. Alignment with strategic goals
      3. Areas requiring attention
      4. Positive developments to reinforce
    `;
    
    return await this.llm.generate(prompt);
  }
}
```

## API Endpoints

### REST API Structure

#### Authentication
```javascript
// POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password"
}

// Response
{
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

#### Data Gathering
```javascript
// POST /api/audit/start
{
  "userId": 1,
  "platforms": ["linkedin", "github", "personal_website"]
}

// Response
{
  "auditId": "audit_123",
  "status": "started",
  "estimatedCompletion": "2024-01-01T12:00:00Z"
}

// GET /api/audit/{auditId}/status
{
  "auditId": "audit_123",
  "status": "completed",
  "progress": 100,
  "results": {
    "linkedin": { /* LinkedIn data */ },
    "github": { /* GitHub data */ }
  }
}
```

#### Coaching Sessions
```javascript
// POST /api/coaching/session
{
  "userId": 1,
  "auditData": { /* audit results */ },
  "userInput": "I want to transition from marketing to product management"
}

// Response
{
  "sessionId": "session_456",
  "response": "That's an exciting transition! Let me ask you about...",
  "insights": ["transition_opportunity", "skill_gap_identified"],
  "nextQuestions": ["What aspects of product management appeal to you most?"]
}
```

## Error Handling

### Common Error Scenarios

#### API Rate Limiting
```javascript
// src/utils/RateLimitHandler.js
class RateLimitHandler {
  async handleRateLimit(platform, retryAfter) {
    console.log(`Rate limited on ${platform}, retrying after ${retryAfter}s`);
    
    // Store request in queue for later processing
    await this.queueRequest(platform);
    
    // Schedule retry
    setTimeout(() => {
      this.processQueuedRequests(platform);
    }, retryAfter * 1000);
  }
}
```

#### Data Validation
```javascript
// src/utils/DataValidator.js
class DataValidator {
  validateAuditData(data) {
    const errors = [];
    
    if (!data.userId) errors.push('Missing userId');
    if (!data.platforms || data.platforms.length === 0) {
      errors.push('No platforms specified');
    }
    
    if (errors.length > 0) {
      throw new ValidationError('Invalid audit data', errors);
    }
  }
}
```

## Testing

### Unit Tests
```javascript
// tests/DataGatherer.test.js
describe('DataGatherer', () => {
  test('should collect LinkedIn data successfully', async () => {
    const gatherer = new DataGatherer();
    const mockApiClient = createMockLinkedInClient();
    
    const result = await gatherer.collectLinkedInData('user123');
    
    expect(result).toHaveProperty('profile');
    expect(result).toHaveProperty('posts');
    expect(result).toHaveProperty('connections');
  });
});
```

### Integration Tests
```javascript
// tests/integration/CoachingSession.test.js
describe('Coaching Session Integration', () => {
  test('should complete full coaching session', async () => {
    const session = new CoachingSession('user123', mockAuditData);
    
    const response1 = await session.processUserInput('I want to be a UX designer');
    expect(response1.response).toBeDefined();
    
    const response2 = await session.processUserInput('But I have no design experience');
    expect(response2.insights).toContain('experience_gap');
  });
});
```

## Deployment

### Docker Configuration
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

### Docker Compose
```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/narrative_agency
    depends_on:
      - db

  db:
    image: postgres:13
    environment:
      - POSTGRES_DB=narrative_agency
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

This implementation guide provides the foundation for building and deploying the five-layer digital identity system. Each layer can be implemented incrementally, allowing for iterative development and testing.
