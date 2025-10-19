/**
 * Narrative Agency: 5-Layer Digital Identity System
 * Main orchestrator for the complete system
 */

const { DataGatheringLayer } = require('./data-gathering');
const { NarrativeAnalysisLayer } = require('./narrative-analysis');
const { StrategyEngine } = require('./strategy-engine');
const { ImplementationLayer } = require('./implementation');
const { MonitoringLayer } = require('./monitoring');

class NarrativeAgency {
  constructor() {
    this.dataGathering = new DataGatheringLayer();
    this.narrativeAnalysis = new NarrativeAnalysisLayer();
    this.strategyEngine = new StrategyEngine();
    this.implementation = new ImplementationLayer();
    this.monitoring = new MonitoringLayer();
  }

  async run(userProfile) {
    console.log('🚀 Starting Narrative Agency system...\n');
    
    try {
      // Layer 1: Data Gathering
      console.log('📊 Layer 1: Data Gathering');
      const userData = await this.dataGathering.gatherData(userProfile);
      
      // Layer 2: Narrative Analysis
      console.log('💬 Layer 2: Narrative Analysis');
      const coachingSession = await this.narrativeAnalysis.startCoachingSession(userData);
      const narrativeAnalysis = await this.narrativeAnalysis.analyzeNarrative(userData);
      
      // Layer 3: Strategy Engine
      console.log('🎯 Layer 3: Strategy Engine');
      const strategy = await this.strategyEngine.generateStrategy(
        narrativeAnalysis.patterns,
        userProfile.desiredIdentity
      );
      
      // Layer 4: Implementation
      console.log('🚀 Layer 4: Implementation');
      const implementationResults = await this.implementation.implementChanges(strategy);
      
      // Layer 5: Monitoring
      console.log('📊 Layer 5: Monitoring');
      const monitoringResults = await this.monitoring.monitorNarrative(userData);
      
      return {
        success: true,
        results: {
          dataGathering: userData,
          narrativeAnalysis,
          strategy,
          implementation: implementationResults,
          monitoring: monitoringResults
        }
      };
      
    } catch (error) {
      console.error('❌ System error:', error.message);
      return { success: false, error: error.message };
    }
  }
}

// CLI execution
if (require.main === module) {
  const agency = new NarrativeAgency();
  
  const userProfile = {
    name: 'Example User',
    desiredIdentity: 'tech professional'
  };
  
  agency.run(userProfile)
    .then(result => {
      console.log('\n✅ System completed:', result.success);
      process.exit(0);
    })
    .catch(error => {
      console.error('System failed:', error);
      process.exit(1);
    });
}

module.exports = { NarrativeAgency };
