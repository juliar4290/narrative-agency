# Narrative Agency: 5-Layer Digital Identity System

A system for reclaiming agency over digital identity through structured data gathering, narrative analysis, and strategic implementation.

## System Architecture

### 1. Data-gathering / Audit Layer
**Function**: Crawls and aggregates public presence across platforms
- Social media, personal sites, resumes, news mentions, GitHub
- Outputs structured dataset: name, role, keywords, topics, sentiment, visibility metrics
- **LLM Role**: General LLM summarizes patterns via prompt engineering

### 2. Narrative Analysis + Coaching Layer  
**Function**: Interactive dialogue for identity exploration
- User explores what's authentic vs outdated
- Identifies what to emphasize
- **LLM Role**: Acts as coach through system prompts - reflective questions, highlights inconsistencies, proposes reframings

### 3. Redirection Strategy Engine
**Function**: Maps current identity → desired identity
- Decides where to push new data
- Generates recommended updates (LinkedIn headline, bio, article topics, SEO keywords)
- **LLM Role**: Drafts or critiques content, produces optimized text for user publication

### 4. Implementation Layer
**Function**: Pushes changes through platform APIs
- Updates schema metadata, posts articles, edits bios
- **LLM Role**: None - uses scripts and APIs

### 5. Monitoring / Feedback Loop
**Function**: Periodically re-audits search results and platform data
- Tracks narrative shifts over time
- **LLM Role**: Interprets reports, explains if old narratives are re-emerging
  

## Algorithmic Redirection Framework Documentation

This project includes documentation for the Algorithmic Redirection Framework:

- **[Algorithmic Redirection Framework Paper](docs/system-architecture-academic.md)** - Complete research paper documenting the five-layer algorithmic redirection framework, LLM integration patterns, and theoretical foundations
- **[Technical Specifications](docs/technical-specifications.md)** - Detailed technical requirements, API specifications, database schema, and performance metrics
- **[Implementation Guide](docs/implementation-guide.md)** - Step-by-step implementation instructions, code examples, and deployment procedures

## Project Structure

```
narrative-agency/
├── src/
│   ├── data-gathering/     # Layer 1: Audit and data collection
│   ├── narrative-analysis/ # Layer 2: Coaching and dialogue
│   ├── strategy-engine/    # Layer 3: Redirection planning
│   ├── implementation/     # Layer 4: Platform updates
│   └── monitoring/         # Layer 5: Feedback and tracking
├── docs/                  # Academic and technical documentation
│   ├── system-architecture-academic.md
│   ├── technical-specifications.md
│   └── implementation-guide.md
├── prompts/               # LLM system prompts
└── examples/              # Usage examples
```

## Research Applications

This framework is designed for:

- **Academic Research**: Digital identity studies, narrative analysis, human-AI interaction research
- **Professional Development**: Personal branding, career transition support, digital presence optimization
- **Organizational Use**: Employee digital identity management, brand consistency, thought leadership development


MIT License
