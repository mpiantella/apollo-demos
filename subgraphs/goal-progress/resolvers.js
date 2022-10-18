const goalProgresses = require('./goalProgresses.json');

const resolvers = {
  Query: {
    goalProgresses: (root, args, context, info) => {
      return goalProgresses;
    },
    goalProgress: (root, { goalId }, context, info) => {
      return goalProgresses.filter(gp => gp.goal.id === goalId)[0];
    },
    
  },
  Goal: {
    latestGoalProgress(parent) {
      const foundGoal = goalProgresses.find((gp) => gp.goal.id === parent.id);
  
      if (!foundGoal) {
        return undefined;
      }
  
      let latestGoalProgress = undefined;
      const latestProgress = goalProgresses.filter(
        gp =>
          (gp.progresses[0] || {}).confidenceLevel === 0.9 &&
          (gp.progresses[0] || {}).asOfDate
      );
  
      if (latestProgress && latestProgress.length > 0) {
        latestProgress.sort((g2, g1) => new Date(
          g1.progresses[0].asOfDate).getTime() - new Date(g2.progresses[0].asOfDate).getTime()
        );
        latestGoalProgress = latestProgress[0].progresses[0];
      }
  
      return latestGoalProgress;
    }
  },
};

module.exports = resolvers;
